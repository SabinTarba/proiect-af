import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products`, {
          method: 'GET'
        })

    const json = await response.json();

    setProducts(json.products);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <section className="bg-gray-50 dark:bg-gray-900 md:h-full grid grid-cols-5 gap-10 p-10">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))
      }
    </section>
  )
}
