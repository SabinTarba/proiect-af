import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from '../store/slices/cartSlice';
import { API_URL } from '../constants';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.global);
    const [cartProduct, setCartProduct] = useState();

    const addToCard = async () => {

        const cartCopy = structuredClone(cart);
        const newCartItem = { 
            productId: product.id,
            productDescription: product.description,
            productTitle: product.title,
            quantity: 1,
            unitPrice: product.price
        }

        cartCopy.push(newCartItem);

        dispatch(addToCart(newCartItem));
        
        await fetch(`${API_URL}/cart/update`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                cartLines: cartCopy
            })
        })  
    }

    const increase = async () => {
        let cartCopy = structuredClone(cart);
        const cartProduct = cartCopy.find((item) => item.productId === product.id);

        if (cartProduct) {
            cartProduct.quantity += 1;
            cartCopy = cartCopy.map((item) => (item.productId === cartProduct.id ? product : item));

            dispatch(increaseQuantity(cartProduct.productId));

            await fetch(`${API_URL}/cart/update`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    cartLines: cartCopy
                })
            })  
        }
        
    }

    const decrease = async () => {
        let cartCopy = structuredClone(cart);
        const cartProduct = cartCopy.find((item) => item.productId === product.id);

        if (cartProduct) {
            cartProduct.quantity -= 1;

            if (cartProduct.quantity <= 0 ) {
                cartCopy = cartCopy.filter((item) => item.productId !== product.id);
            } else {
                cartCopy = cartCopy.map((item) => (item.productId === cartProduct.id ? product : item)); 
            }

            dispatch(decreaseQuantity(cartProduct.productId));

            await fetch(`${API_URL}/cart/update`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    cartLines: cartCopy
                })
            })  
        }
    }

    useEffect(() => {
        const cartProduct = cart?.find((item) => item.productId === product.id);
        setCartProduct(cartProduct);
    }, [cart, product.id])

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img width={100} height={100} className="rounded-t-lg text-center" src={product.images[0]} alt="" />
            <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">{product.description}</p>
                <p className="mb-3 font-semibold text-md text-green-700 dark:text-green-400">{product.price}$</p>
                
                {cartProduct && 
                <div className="flex flex-col">
                    <span className="font-medium text-white">Quantity: {cartProduct.quantity}</span>
                    <button onClick={() => increase()} className="mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Increase quantity
                    </button>
                    <button onClick={() => decrease()} className="mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Decrease quantity
                    </button>
                </div>
                }

                {!cartProduct && <button onClick={() => addToCard()} className="w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to cart
                </button>
                }
            </div>
        </div>
    )
}

export default ProductCard