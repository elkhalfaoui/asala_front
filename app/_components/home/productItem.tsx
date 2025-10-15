import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SimpleProduct } from "./products";

const ProductItem = ({ product }: { product: SimpleProduct }) => {
  return (
    <li>
      <Link
        href={`/products/${product.id}`}
        className="relative flex flex-col gap-2 w-full"
      >
        <Image
          src={`${product.mainImage}`}
          alt="image"
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-0 right-4 w-4 h-8 bg-red-600 text-white">
          <span>-16%</span>
          <div className="absolute top-4 right-4 w-4 h-4 bg-transparent rotate-45"></div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg">{product.title}</h3>
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
            <span className="text-sm text-zinc-600">à partir de</span>{" "}
            {product.startingPrice}
            DH
          </h4>
        </div>
      </Link>
    </li>
  );
};
export default ProductItem;
