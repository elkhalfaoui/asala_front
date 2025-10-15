import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SimpleProduct } from "./products";

const ProductItem = ({ product }: { product: SimpleProduct }) => {
  return (
    <li>
      <Link
        href={`/products/${product.id}`}
        className="relative flex flex-col gap-2 w-full group"
      >
        {/* Product Image */}
        <Image
          src={`${product.mainImage}`}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
        />

        {/* Bookmark Discount Badge */}
        {product.discount && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-bl-md shadow-md">
            -16%
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-red-800"></div>
          </div>
        )}

        {/* Product Info */}
        <div className="flex flex-col mt-2">
          <h3 className="text-lg font-medium">{product.title}</h3>

          {/* Stars */}
          <div className="flex gap-0.5 text-yellow-400 mt-1">
            {Array.from(
              { length: Math.floor(product.averageRating) },
              (_, i) => (
                <Star key={i} size={16} />
              )
            )}
            {product.averageRating % 1 >= 0.4 && <StarHalf size={16} />}
          </div>

          {/* Price */}
          <h4 className="mt-1">
            <span className="text-sm text-zinc-600">à partir de</span>{" "}
            <span className="font-semibold">{product.startingPrice} DH</span>
          </h4>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
