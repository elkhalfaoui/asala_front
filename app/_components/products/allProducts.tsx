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
  const [filter, setFilter] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/guest/products");
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (page === 0) {
      router.push("/products?page=1");
    } else {
      const start = (+page - 1) * 20;
      const end = +page * 20;
      setProductsList(products.slice(start, end));
    }
  }, [page, products, router]);

  useEffect(() => {
    let filtered = [...products];

if (filter.length > 0) {
  filtered = products.filter((product) =>
    // keep product only if it has *all* selected categories
    filter.every((selected) =>
      product.categories.some((c) => c.title === selected)
    )
  );
}

    const start = (+page - 1) * 20;
    const end = +page * 20;
    setProductsList(filtered.slice(start, end));
  }, [filter, page, products]);

  return (
    <main className="flex flex-col gap-8 py-12">
      <Filter
        categories={Array.from(
          new Set(
            products.flatMap((product) =>
              product.categories.map((c) => c.title)
            )
          )
        )}
        filter={filter}
        setFilter={setFilter}
      />

      <ul className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {productsList.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>

      <Pagination
        numPages={Math.ceil(
          (filter.length > 0
            ? products.filter((p) =>
                p.categories.some((c) => filter.includes(c.title))
              ).length
            : products.length) / 20
        )}
        page={+page}
      />
    </main>
  );
};

export default AllProducts;
