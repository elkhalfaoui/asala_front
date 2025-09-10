import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImagesGrid = ({ imagesCollection }: { imagesCollection: string[] }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages([...imagesCollection]);
  }, [imagesCollection]);

  const handleImageChange = (pos: number) => {
    const newImages = [...images];
    // Swap the clicked image with the first (main) image
    [newImages[0], newImages[pos]] = [newImages[pos], newImages[0]];
    setImages(newImages);
  };

  return (
    <li className="col-span-1 grid grid-cols-4 grid-rows-3 md:grid-cols-3 md:grid-rows-4 lg:grid-cols-4 lg:grid-rows-3 gap-2 h-fit">
      {/* Small Image 1 */}
      <div
        className="relative col-span1 row-span-1 col-start-1 row-start-1 md:row-start-4 lg:col-start-1 lg:row-start-1 rounded-sm overflow-hidden bg-zinc-200 cursor-pointer"
        onClick={() => handleImageChange(1)}
      >
        {images?.[1] ? (
          <Image
            src={images?.[1]}
            alt="small-1"
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

      {/* Small Image 2 */}
      <div
        className="relative col-span1 row-span-1 col-start-1 row-start-2 md:col-start-2 md:row-start-4 lg:col-start-1 lg:row-start-2 rounded-sm overflow-hidden bg-zinc-200 cursor-pointer"
        onClick={() => handleImageChange(2)}
      >
        {images?.[2] ? (
          <Image
            src={images?.[2]}
            alt="small-2"
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

      {/* Small Image 3 */}
      <div
        className="relative col-span1 row-span-1 col-start-1 row-start-3 md:col-start-3 md:row-start-4 lg:col-start-1 lg:row-start-3 rounded-sm overflow-hidden bg-zinc-200 cursor-pointer"
        onClick={() => handleImageChange(3)}
      >
        {images?.[3] ? (
          <Image
            src={images?.[3]}
            alt="small-3"
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

      {/* Main Image */}
      <div className="relative col-span-3 row-span-3 aspect-square lg:aspect-4/5 xl:aspect-square rounded-sm overflow-hidden bg-zinc-200">
        {images?.[0] ? (
          <Image
            src={images?.[0]}
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
