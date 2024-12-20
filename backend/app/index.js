const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const expressLogging = require("express-tracking");
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');
const { verifyToken } = require('./utils');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(expressLogging());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", verifyToken, userRoutes);
app.use("/api/v1/order", verifyToken, orderRoutes);
app.use("/api/v1/cart", verifyToken, cartRoutes);

app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}!`)
})