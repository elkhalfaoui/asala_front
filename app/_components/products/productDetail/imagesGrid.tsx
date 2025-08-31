import { ImageIcon } from "lucide-react";
import { Product } from "../../home/products";
import Image from "next/image";

const ImagesGrid = ({ product }: { product: Product | undefined }) => {
  return (
    <li className="col-span-1 grid grid-cols-4 grid-rows-3 md:grid-cols-3 md:grid-rows-4 lg:grid-cols-4 lg:grid-rows-3 gap-2 h-fit">
      <div className="relative col-span1 row-span-1 col-start-1 row-start-1 md:row-start-4 lg:col-start-1 lg:row-start-1 rounded-sm overflow-hidden bg-zinc-200">
        {product?.imageCollection.firstImage ? (
          <Image
            src={product.imageCollection.firstImage}
            alt="firstImage"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon
            size={32}
            strokeWidth={1}
            className="absolute top-1/2 left-1/2 -translate-1/2 animate-pulse text-zinc-400"
          />
        )}
      </div>
      <div className="relative col-span1 row-span-1 col-start-1 row-start-2 md:col-start-2 md:row-start-4 lg:col-start-1 lg:row-start-2 rounded-sm overflow-hidden bg-zinc-200">
        {product?.imageCollection.secondImage ? (
          <Image
            src={product.imageCollection.secondImage}
            alt="firstImage"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon
            size={32}
            strokeWidth={1}
            className="absolute top-1/2 left-1/2 -translate-1/2 animate-pulse text-zinc-400"
          />
        )}
      </div>
      <div className="relative col-span1 row-span-1 col-start-1 row-start-3 md:col-start-3 md:row-start-4 lg:col-start-1 lg:row-start-3 rounded-sm overflow-hidden bg-zinc-200">
        {product?.imageCollection.thirdImage ? (
          <Image
            src={product.imageCollection.thirdImage}
            alt="firstImage"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon
            size={32}
            strokeWidth={1}
            className="absolute top-1/2 left-1/2 -translate-1/2 animate-pulse text-zinc-400"
          />
        )}
      </div>
      <div className="relative col-span-3 row-span-3 aspect-square lg:aspect-4/5 xl:aspect-square rounded-sm overflow-hidden bg-zinc-200">
        {product?.imageCollection.mainImage ? (
          <Image
            src={product.imageCollection.mainImage}
            alt="main"
            width={400}
            height={400}
            priority
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon
            size={72}
            strokeWidth={1}
            className="absolute top-1/2 left-1/2 -translate-1/2 animate-pulse text-zinc-400"
          />
        )}
      </div>
    </li>
  );
};
export default ImagesGrid;
