// src/services/productService.ts

import axiosInstance from "./axiosInstance";  // Import the Axios instance
import { Product } from "../types";            // Import the Product type
import axios from "axios";

export const fetchProducts = async (signal: AbortSignal): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<Product[]>("/products", { signal });
    return response.data;  // Return the fetched data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else if (error.name === "AbortError") {
      console.log("Request was aborted.");
    } else {
      console.error("Error fetching data:", error);
    }
    throw error;  // Rethrow error for potential handling in component
  }
};

