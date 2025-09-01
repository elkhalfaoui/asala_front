import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SimpleProduct } from "./products";

const ProductItem = ({ product }: { product: SimpleProduct }) => {
  return (
    <li>
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col justify-between items-center h-full"
      >
        {/* Image container */}
        <div className="w-full aspect-square overflow-hidden rounded-sm relative group">
          <Image
            src={`${product.mainImage}`}
            alt="image"
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay with content */}
          <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <div className="flex gap-0.5 text-yellow-400 mt-1">
              {Array.from(
                { length: Math.floor(product.averageRating) },
                (_, i) => (
                  <Star key={i} size={16} />
                )
              )}
              {product.averageRating % 1 >= 0.4 && <StarHalf size={16} />}
            </div>
            <h4 className="mt-1">
              <span className="text-sm text-zinc-300">starting from</span>{" "}
              {product.startingPrice}
              DH
            </h4>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default ProductItem;
