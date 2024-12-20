const express = require('express');
const Cart = require('../database/models/Cart');

const router = express.Router();

router.get("/", async (req, res) => {
    const userId = req.userId;

    const cart = await Cart.findAll({ 
        where: { 
            userId: userId 
        }
    });

    res.status(200).json({ data: { cartLines: cart} });
})

router.post("/update", async (req, res) => {
    const userId = req.userId;

    const cartLines = req.body.cartLines;

    await Cart.destroy({ where: { userId: userId }})

    for (const cartLine of cartLines) {
        await Cart.create({
            userId: userId,
            productId: cartLine.productId,
            productTitle: cartLine.productTitle,
            productDescription: cartLine.productDescription,
            unitPrice: cartLine.unitPrice,
            quantity: cartLine.quantity,
        });
    }

    const cart = await Cart.findAll({ 
        where: { 
            userId: userId 
        }
    });

    res.status(201).json({ data: { cartLines: cart} });
})

module.exports = router;