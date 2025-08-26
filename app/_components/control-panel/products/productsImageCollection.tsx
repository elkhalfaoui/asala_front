"use client";

import { CircleAlert, CloudUpload, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { ImageItem } from "./createNewProduct";

const ProductsImageCollection = ({
  imageCollection,
  setImageCollection,
}: {
  imageCollection: ImageItem[];
  setImageCollection: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const { name } = e.target;
      const file = e.target.files[0];

      setImageCollection((cur) =>
        cur.map((img) =>
          img.name === name
            ? { ...img, image: file, preview: URL.createObjectURL(file) }
            : img
        )
      );
    }
  };

  // Cleanup blob URLs on unmount or when image changes
  useEffect(() => {
    return () => {
      imageCollection.forEach((item) => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, [imageCollection]);

  return (
    <div>
      <label htmlFor="categories" className="font-light">
        *Upload Product Image Collection
      </label>
      <p className="flex items-center gap-1 text-sm mb-2 text-zinc-600">
        <CircleAlert size={14} />
        <span>each product requires 4 images</span>
      </p>
      <ul className="grid grid-cols-4 gap-4">
        {imageCollection.map((item, index) => (
          <li key={index} className="flex flex-col items-center gap-2">
            {item.image ? (
              <div className="relative w-full h-full overflow-hidden group">
                <Image
                  src={item.preview!}
                  alt={`Preview of ${item.name}`}
                  width={80}
                  height={120}
                  className="w-full h-full object-cover"
                />
                <label
                  htmlFor={item.name}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1 p-2 cursor-pointer text-sm rounded-md bg-green-700 text-white"
                >
                  <RotateCcw size={14} />
                  <span>Change&nbsp;Image</span>
                  <input
                    type="file"
                    id={item.name}
                    name={item.name}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label
                htmlFor={item.name}
                className="flex flex-col justify-center items-center w-full h-full aspect-3/4 text-center text-sm font-light p-2 cursor-pointer rounded-sm border border-dashed border-zinc-600"
              >
                <CloudUpload size={48} className="text-zinc-300" />
                <span>Upload {item.name.replace("Image", " Image")}</span>
                <input
                  type="file"
                  id={item.name}
                  name={item.name}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
            {!item.exist && (
              <span className="text-sm text-center text-red-600">
                *image is required
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsImageCollection;
