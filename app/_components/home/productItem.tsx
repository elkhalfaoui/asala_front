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

        {product.discount && (
          <div className="absolute top-2 right-2 p-2 bg-red-600 text-white">-15%</div>
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
