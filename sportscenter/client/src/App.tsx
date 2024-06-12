import { useState, useEffect } from "react"

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error('Failed to Fetch Data');
        }
        const data = await response.json();
        setProducts(data.content);
      } catch (error) {
        console.error('Error in fetching Data : ', error);

      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Sports Center App</h1>
        {
          products.map(product => (
            <div key={product.id}>
              <p> Name : {product.name}</p>
              <p>Description : {product.description}</p>
              <p> Price : $ {product.price} </p>
              <p> Brand : {product.brand} </p>
              <p> Type : {product.type} </p>
            </div>
          ))}
      </div>

    </>
  )
}

export default App
