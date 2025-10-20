"use client";

import React, { useEffect, useState } from "react";
import ImagesGrid from "./imagesGrid";
import ProductInfo from "./productInfo";
import axiosClient from "@/app/_lib/axiosClient";
import { Product } from "../../home/products";
import RelatedProducts from "./relatedProducts";

const ProductDetail = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get(`/guest/products/${productId}`);
        console.log(res.data);
        setProduct({ ...res.data });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [productId]);

  return (
    <>
      <ul className="relative grid grid-cols-1 md:grid-cols-2 gap-12">
        {product && (
          <ImagesGrid
            imagesCollection={[
              product.imageCollection.mainImage,
              product.imageCollection.firstImage,
              product.imageCollection.secondImage,
              product.imageCollection.thirdImage,
            ]}
          />
        )}
        {product && <ProductInfo product={product} />}
        <RelatedProducts id={product?.id} categories={product?.categories} />
      </ul>
    </>
  );
};

export default ProductDetail;
