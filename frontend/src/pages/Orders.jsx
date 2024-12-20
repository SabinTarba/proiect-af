import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Orders = () => {
    const { token } = useSelector(state => state.global);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/order/list`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const json = await response.json();
            
            if (json?.data?.orders){
                setOrders(json.data.orders);
            }
        }

        getOrders();
    }, [token])

    return (
        <section className="bg-gray-50 dark:bg-gray-900 md:h-screen">
            <div className="relative overflow-x-auto p-20 w-100">
                {orders.length === 0 ? <span className="text-white text-lg">No orders!</span> :
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Created date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Paid date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Number of products
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Order lines
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (
                            <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    {order.status === "PAID" ? new Date(order.updatedAt).toLocaleString() : "Not paid"}
                                </td>
                                <td className="px-6 py-4">
                                    {order.productNo}
                                </td>
                                <td className="px-6 py-4">
                                    {order.totalPrice} {order.currencyId}
                                </td>
                                <td className="px-6 py-4">
                                    {order.status === "WAITING_PAY" ? "WAITING FOR PAYMENT" : order.status}
                                </td>
                                <td className="px-6 py-4">
                                    {order.orderLines?.map((orderLine) => (
                                        <>
                                            <span>{orderLine.productTitle} ({orderLine.quantity} qty, unit price: {orderLine.unitPrice} {orderLine.currencyId}) 
                                                | Subtotal: {orderLine.unitPrice * orderLine.quantity} {orderLine.currencyId}</span>
                                            <br></br>
                                        </>
                                    ))}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </section>
    )
}

export default Orders