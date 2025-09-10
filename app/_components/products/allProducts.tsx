"use client";

import { useEffect, useState } from "react";
import Filter from "./filter";
import { SimpleProduct } from "../home/products";
import axiosClient from "@/app/_lib/axiosClient";
import ProductItem from "../home/productItem";
import Pagination from "./pagination";
import { useRouter } from "next/navigation";

const AllProducts = ({ page }: { page: number }) => {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [productsList, setProductsList] = useState<SimpleProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/guest/products");
        console.log(res.data);
        setProducts([...res.data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (page === 0) {
      router.push("/products?page=1");
    } else {
      const tempList = products.slice(+page * 20 - 20, +page * 20);
      setProductsList([...tempList]);
    }
  }, [page, products, router]);

  return (
    <main className="flex flex-col gap-8 py-12">
      <Filter
        categories={Array.from(
          new Set(
            productsList.flatMap((product) =>
              product.categories.map((c) => c.title)
            )
          )
        )}
      />
      <ul className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {productsList &&
          productsList.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </ul>
      <Pagination numPages={Math.ceil(products.length / 20)} page={+page} />
    </main>
  );
};

export default AllProducts;
