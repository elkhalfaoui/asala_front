"use client";

import axiosClient from "@/app/_lib/axiosClient";
import ProductItem from "./productItem";
import { CalendarClock, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { OptionType } from "../control-panel/products/createNewProduct";

export interface Product {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  averageRating: number;
  totalRatings: number;
  categories: { id: number; title: string }[];
  options: {
    id: number;
    title: string;
    dimension: string;
    price: number;
    type: OptionType;
  }[];
  imageCollection: {
    mainImage: string;
    firstImage: string;
    secondImage: string;
    thirdImage: string;
  };
}

export interface SimpleProduct {
  id: string;
  title: string;
  averageRating: number;
  startingPrice: number;
  mainImage: string;
}

const Products = () => {
  const [filter, setFilter] = useState("latest");
  const [productsList, setProductsList] = useState<SimpleProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/guest/products");
        console.log(res.data);
        setProductsList([...res.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="relative text-xl font-light w-fit mx-auto mb-4 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-8 before:h-0.5 before:bg-yellow">
          Products
        </h2>
        <h3 className="text-2xl text-center font-medium mb-4 text-green">
          Our Products Collections
        </h3>
        <ul className="flex items-center justify-start sm:justify-center gap-2 mb-8 overflow-x-scroll scrollbar-hide">
          <li
            className={`flex items-center gap-1 py-1 px-2 rounded-full cursor-pointer border ${
              filter == "latest"
                ? " border-green bg-green text-white"
                : "border-zinc-200"
            }`}
            onClick={() => setFilter("latest")}
          >
            <CalendarClock size={16} />
            <span>Latests</span>
          </li>
          <li
            className={`flex items-center gap-1 py-1 px-2 rounded-full cursor-pointer border ${
              filter == "best"
                ? " border-green bg-green text-white"
                : "border-zinc-200"
            }`}
            onClick={() => setFilter("best")}
          >
            <Star size={16} />
            <span>Best&nbsp;Sellers</span>
          </li>
          <li
            className={`flex items-center gap-1 py-1 px-2 rounded-full cursor-pointer border ${
              filter == "featured"
                ? " border-green bg-green text-white"
                : "border-zinc-200"
            }`}
            onClick={() => setFilter("featured")}
          >
            <Heart size={16} />
            <span>Featured&nbsp;Products</span>
          </li>
        </ul>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {productsList &&
            productsList.map((product: SimpleProduct) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </ul>
      </div>
    </section>
  );
};
export default Products;
