"use client";

import {
  CirclePlus,
  List,
  PackageCheck,
  PackagePlus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import CreateNewProduct from "./createNewProduct";
import axiosClient from "@/app/_lib/axiosClient";
import Image from "next/image";

export interface Category {
  id: number;
  title: string;
}

export interface SimpleProduct {
  id: string;
  title: string;
  averageRating: number;
  startingPrice: number;
  mainImage: string;
  categories: Category[];
  discount: boolean;
  createdDate: string;
  sellingCount: number;
}

const ProductsSection = () => {
  const [createProductSection, setCreateProductSection] =
    useState<boolean>(false);
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/guest/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [success]); // refresh list after product creation/deletion

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Handle delete
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await axiosClient.delete(`/seller/products/${id}`);
      setSuccess("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="p-4 relative">
      <h2 className="relative flex items-center gap-2 text-xl font-light mb-8 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-12 before:h-0.5 before:bg-yellow">
        <PackagePlus size={24} />
        <span>Products Section</span>
      </h2>

      {success && (
        <p className="absolute left-1/2 -translate-x-1/2 top-24 flex items-center gap-2 p-4 rounded-sm border border-green bg-green-200 text-green">
          <PackageCheck size={20} />
          <span className="text-lg">{success}</span>
        </p>
      )}

      <ul className="flex gap-4">
        <li
          className={`${
            createProductSection ? "w-3/4" : "w-1/4"
          } p-4 duration-200 rounded-sm border border-zinc-300 bg-zinc-100`}
        >
          {createProductSection ? (
            <CreateNewProduct setSuccess={setSuccess} />
          ) : (
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCreateProductSection(true)}
            >
              <CirclePlus size={24} className="text-yellow" />
              <span className="text-green">Create New Product</span>
            </button>
          )}
        </li>

        <li
          className={`${
            createProductSection ? "w-1/4" : "w-3/4"
          } p-4 duration-200 rounded-sm border border-zinc-300 bg-zinc-100`}
        >
          {createProductSection ? (
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCreateProductSection(false)}
            >
              <List size={24} className="text-yellow" />
              <span className="text-green">Show Products List</span>
            </button>
          ) : loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex flex-col gap-2 p-3 border border-zinc-200 rounded-sm bg-white shadow-sm relative"
                >
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-sm"
                  />
                  <h3 className="text-lg font-medium">{product.title}</h3>
                  <p className="text-sm text-zinc-600">
                    Price:{" "}
                    <span className="text-green-700 font-semibold">
                      {product.startingPrice} MAD
                    </span>
                  </p>
                  <p className="text-sm text-zinc-600">
                    Categories:{" "}
                    {product.categories.map((c) => c.title).join(", ") || "—"}
                  </p>
                  {product.discount && (
                    <span className="text-xs text-red-500 font-semibold">
                      Discount available
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className={`flex items-center justify-center gap-2 mt-2 p-2 rounded-sm text-white bg-red-600 hover:bg-red-700 transition-all ${
                      deletingId === product.id
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {deletingId === product.id ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </section>
  );
};

export default ProductsSection;
