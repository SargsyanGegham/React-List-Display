import React, { useState, useEffect } from "react";
import { fetchProducts } from "./services/";  // Import the fetch function
import { Product } from "./types";                         // Import the Product type
import "./App.css";
import LoadingSpinner from "./components/loadingSpinner";  // Import the Loading Spinner component

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();  // Create an AbortController
    const signal = abortController.signal;          // Get the signal from the controller

    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(signal);  // Pass the signal to fetchProducts
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);  // Set loading to false after fetch completes
      }
    };

    getProducts();  // Call fetch function when component mounts

    return () => {
      abortController.abort();  // Abort the request if the component unmounts
    };
  }, []);

  return (
    <div className="flex">
      {/* Side Navigation */}
      <div className="w-1/4 bg-gray-800 text-white h-screen p-5">
        <h2 className="text-xl mb-5">Menu</h2>
        <ul>
          <li className="mb-3">Home</li>
          <li className="mb-3">About</li>
          <li className="mb-3">Contact</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <h1 className="text-2xl font-bold mb-5">Product List</h1>

        {/* Loading State */}
        {loading ? (
          <LoadingSpinner />  // Display loading spinner while fetching data
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <div key={product.id} className="border p-5 rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-3"
                />
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold mt-2">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
