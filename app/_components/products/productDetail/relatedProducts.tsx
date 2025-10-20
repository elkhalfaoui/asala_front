"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { SimpleProduct } from "../../home/products";
import axiosClient from "@/app/_lib/axiosClient";
import ProductItem from "../../home/productItem";

// Type for category
interface Category {
  id: number;
  title: string;
}

// Default product for filling empty slots
const createDefaultProduct = (index: number): SimpleProduct => ({
  id: `default-${index}`,
  title: "Product Coming Soon",
  mainImage: "/placeholder-product.jpg",
  averageRating: 0,
  startingPrice: 0,
  discount: false,
  categories: [],
  createdDate: new Date().toISOString(),
  sellingCount: 0,
});

interface CarouselItem {
  id: number;
  pos: number;
  product: SimpleProduct;
}

const RelatedProducts = ({
  id,
  categories,
}: {
  id: string | undefined;
  categories: { id: number; title: string }[] | undefined;
}) => {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  const CartsCount = 12;

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

  // Filter and prepare products for carousel
  const filteredProducts = useMemo(() => {
    if (!products.length || !categories?.length) return [];

    const categoryIds = categories.map((cat) => cat.id);

    // Filter products by categories and exclude current product
    const filtered = products.filter((product) => {
      // Exclude current product
      if (product.id === id) return false;

      // Check if product has any matching category
      return product.categories?.some((cat: Category) =>
        categoryIds.includes(cat.id)
      );
    });

    // Take first 12 or fill with defaults
    const result: SimpleProduct[] = [];
    for (let i = 0; i < CartsCount; i++) {
      if (i < filtered.length) {
        result.push(filtered[i]);
      } else {
        result.push(createDefaultProduct(i));
      }
    }

    return result;
  }, [products, categories, id]);

  // Initialize carousel items when filtered products change
  useEffect(() => {
    if (filteredProducts.length > 0) {
      setCarouselItems(
        filteredProducts.map((product, index) => ({
          id: index,
          pos: index,
          product,
        }))
      );
    }
  }, [filteredProducts]);

  const toRight = () => {
    setCarouselItems((items: CarouselItem[]) =>
      items.map((item) => ({
        ...item,
        pos: item.pos === 0 ? CartsCount - 1 : item.pos - 1,
      }))
    );
  };

  const toLeft = () => {
    setCarouselItems((items: CarouselItem[]) =>
      items.map((item) => ({
        ...item,
        pos: item.pos === CartsCount - 1 ? 0 : item.pos + 1,
      }))
    );
  };

  useEffect(() => {
    if (touchStart > touchEnd && touchEnd !== 0) {
      toRight();
    }
    if (touchStart < touchEnd && touchEnd !== 0) {
      toLeft();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchEnd]);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 md:px-2">
        <div className="flex justify-between mb-4 mx-4">
          <button
            className="py-2 px-4 rounded-full bg-zinc-200"
            onClick={toLeft}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="py-2 px-4 rounded-full bg-zinc-200"
            onClick={toRight}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div
          className="w-full overflow-hidden"
          onTouchStart={(e) => {
            setTouchStart(e.changedTouches[0].screenX);
            console.log(e.changedTouches[0].screenX);
          }}
          onTouchEnd={(e) => {
            setTouchEnd(e.changedTouches[0].screenX);
            console.log(e.changedTouches[0].screenX);
          }}
        >
          <ul className="relative w-[600%] md:w-[400%] lg:w-[240%] -translate-x-6/12 md:-translate-x-5/12 lg:-translate-x-4/12 h-16 -z-10 bg-red-300">
            {carouselItems.map((item) => (
              <li
                key={item.id}
                className="absolute h-full w-1/12 bg-yellow-400 duration-500"
                style={{
                  left: `${(item.pos / CartsCount) * 100}%`,
                  zIndex:
                    item.pos === 0 ? -1 : item.pos === CartsCount - 1 ? -1 : 10,
                }}
              >
                <ProductItem product={item.product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;