import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../constants';
import { clearCart } from '../store/slices/cartSlice';

export const Cart = () => {
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.global);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderPaid, setOrderPaid] = useState(false);
  const [orderId, setOrderId] = useState();

  const totalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const createOrder = async () => {
    const response = await fetch(`${API_URL}/order/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            orderLines: cart
        })
    })  

    const json = await response.json();

    if(json.data.order){
      setOrderCreated(true);
      dispatch(clearCart());
      setOrderId(json.data.order.id);
    }
  }

  const payOrder = async () => {
    const response = await fetch(`${API_URL}/order/pay/${orderId}`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
  })  

  const json = await response.json();

    if(json.data.order){
      setOrderPaid(true);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 md:h-screen">
      
      <div className="relative overflow-x-auto p-20 w-100">
        {orderCreated && !orderPaid &&
          <span className="text-green-500 text-lg mr-10">
            Order created! You can pay using "Pay now" button.
          </span>
        }
        {orderPaid && 
          <span className="text-green-500 text-lg">
            Order paid! Thank you and happy shopping!
          </span>
        }
        {(!cart || cart.length === 0) && !orderCreated && 
          <span className="text-white text-lg">
            No products in the cart!
          </span>
        }

        {!orderPaid && !orderCreated && (!cart || cart.length > 0) && 
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Product title
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Product description
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Unit Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Subtotal per line
                      </th>
                  </tr>
              </thead>
              <tbody>
                {cart?.map((cartLine) => (
                  <tr key={cartLine.lineNo} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {cartLine.productTitle}
                    </th>
                    <td className="px-6 py-4">
                        {cartLine.productDescription}
                    </td>
                    <td className="px-6 py-4">
                        {cartLine.unitPrice}$
                    </td>
                    <td className="px-6 py-4">
                        {cartLine.quantity}
                    </td>
                    <td className="px-6 py-4">
                        {cartLine.unitPrice * cartLine.quantity}$
                    </td>
                </tr>
                ))}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                        Total: {totalPrice.toFixed(2)}$
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
              </tbody>
          </table>
        }
        {!orderPaid && !orderCreated && cart.length > 0 &&
        <button onClick={() => createOrder()} className="mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
          Checkout                
        </button>
        }
        {!orderPaid && orderCreated &&
        <button onClick={() => payOrder()} className="mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Pay now             
        </button>
        }
      </div>
    </section>
  )
}
