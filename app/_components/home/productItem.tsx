import { Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductItem = ({bgImg}: {bgImg: string}) => {
  return (
    <li>
      <Link
        href="/products/1"
        className="flex flex-col justify-between items-center h-full"
      >
        {/* Image container */}
        <div className="w-full aspect-3/4 overflow-hidden rounded-sm relative group">
          <Image
            src={`/${bgImg}`}
            alt="image"
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay with content */}
          <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
            <h3 className="text-lg font-semibold">Product Title</h3>
            <div className="flex gap-0.5 text-yellow-400 mt-1">
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
              <Star size={16} />
              <StarHalf size={16} />
            </div>
            <h4 className="mt-1">
              <span className="text-sm text-zinc-300">starting from</span> 299
              DH
            </h4>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default ProductItem;