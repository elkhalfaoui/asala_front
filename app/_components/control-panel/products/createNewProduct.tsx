"use client";

import { CirclePlus, Plus } from "lucide-react";
import ProductsOptions from "./productsOptions";
import ProductsCategories from "./productsCategories";
import ProductsImageCollection from "./productsImageCollection";
import { useRef, useState } from "react";
import axiosClient from "@/app/_lib/axiosClient";
import axios from "axios";

export enum OptionType {
  PACK = "PACK",
  SOLO = "SOLO",
}

export interface Option {
  id: number;
  title: string;
  dimension: string;
  withoutCadrePrice: number;
  withCadrePrice: number;
  type: OptionType;
  selected: boolean;
}

export interface Category {
  id: number;
  title: string;
  selected: boolean;
}

export type ImageItem = {
  name: string;
  image: File | null;
  preview?: string;
  exist: boolean;
};

const CreateNewProduct = ({
  setSuccess,
}: {
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [exist, setExist] = useState({
    title: true,
    description: true,
    options: true,
    categories: true,
    mainImage: true,
    firstImage: true,
    secondImage: true,
    thirdImage: true,
  });
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [discount, setDiscount] = useState<boolean>(false); // ADD THIS STATE
  const [optionsList, setOptionsList] = useState<Option[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [imageCollection, setImageCollection] = useState<ImageItem[]>([
    { name: "mainImage", image: null, exist: true },
    { name: "firstImage", image: null, exist: true },
    { name: "secondImage", image: null, exist: true },
    { name: "thirdImage", image: null, exist: true },
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    let hasError = false;

    // Validate and append basic product information
    if (!titleRef.current?.value?.trim()) {
      setExist((prev) => ({ ...prev, title: false }));
      hasError = true;
    } else {
      formData.append("title", titleRef.current.value.trim());
    }

    if (!descriptionRef.current?.value?.trim()) {
      setExist((prev) => ({ ...prev, description: false }));
      hasError = true;
    } else {
      formData.append("description", descriptionRef.current.value.trim());
    }

    // ADD DISCOUNT FIELD - THIS WAS MISSING!
    formData.append("discount", discount.toString());

    // Validate and append product options
    const selectedOptions = optionsList.filter((option) => option.selected);
    if (selectedOptions.length === 0) {
      setExist((prev) => ({ ...prev, options: false }));
      hasError = true;
    } else {
      selectedOptions.forEach((option, index) => {
        formData.append(`options[${index}].title`, option.title);
        formData.append(`options[${index}].dimension`, option.dimension);
        formData.append(`options[${index}].withoutCadrePrice`, option.withoutCadrePrice.toString());
        formData.append(`options[${index}].withCadrePrice`, option.withCadrePrice.toString());
        formData.append(`options[${index}].type`, option.type);
      });
      setExist((prev) => ({ ...prev, options: true }));
    }

    // Validate and append product categories
    const selectedCategories = categoriesList.filter(
      (category) => category.selected
    );
    if (selectedCategories.length === 0) {
      setExist((prev) => ({ ...prev, categories: false }));
      hasError = true;
    } else {
      selectedCategories.forEach((category, index) => {
        formData.append(`categories[${index}]`, category.title);
      });
      setExist((prev) => ({ ...prev, categories: true }));
    }

    // Validate and append image files
    const updatedImageCollection = imageCollection.map((img) => {
      if (!img.image) {
        hasError = true;
        return { ...img, exist: false };
      } else {
        formData.append(img.name, img.image);
        return { ...img, exist: true };
      }
    });

    setImageCollection(updatedImageCollection);

    if (!hasError) {
      try {
        console.log("Sending product creation request...");

        const response = await axiosClient.post("/seller/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setSuccess(`Product ${response.data?.title} created successfully`);
        console.log("Product created successfully:", response.data);

        // Reset form
        if (titleRef.current) titleRef.current.value = "";
        if (descriptionRef.current) descriptionRef.current.value = "";
        setDiscount(false); // RESET DISCOUNT
        setOptionsList([]);
        setCategoriesList([]);
        setImageCollection([
          { name: "mainImage", image: null, exist: true },
          { name: "firstImage", image: null, exist: true },
          { name: "secondImage", image: null, exist: true },
          { name: "thirdImage", image: null, exist: true },
        ]);

        setExist({
          title: true,
          description: true,
          options: true,
          categories: true,
          mainImage: true,
          firstImage: true,
          secondImage: true,
          thirdImage: true,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error creating product:", error.message);
        }

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            console.error("Access denied: Only sellers can create products");
          } else if (error.response?.status === 400) {
            console.error("Invalid data: Please check all required fields");
          } else if (error.response?.status === 401) {
            console.error("Authentication required: Please log in");
          } else {
            console.error("Server error: Please try again later");
          }
        }
      }
    } else {
      console.log("Form validation failed - please fix errors and try again");
    }
  };

  return (
    <>
      <h3 className="flex items-center gap-2 cursor-pointer mb-8">
        <CirclePlus size={24} className="text-yellow" />
        <span className="text-green">New Product</span>
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-light">
            *Product title
          </label>
          <input
            type="text"
            name="title"
            ref={titleRef}
            placeholder="Enter the product title"
            className="p-1 outline-none border border-zinc-200 bg-white"
          />
          {!exist.title && (
            <span className="text-sm text-red-600">*title is required</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-light">
            *Product description
          </label>
          <textarea
            name="description"
            rows={4}
            ref={descriptionRef}
            placeholder="Enter the product description"
            className="p-1 outline-none border border-zinc-200 bg-white"
          ></textarea>
          {!exist.description && (
            <span className="text-sm text-red-600">*description is required</span>
          )}
        </div>
        
        {/* ADD THIS DISCOUNT CHECKBOX */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="discount"
            checked={discount}
            onChange={(e) => setDiscount(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="discount" className="font-light cursor-pointer">
            Product has discount
          </label>
        </div>

        <ProductsOptions
          optionsList={optionsList}
          setOptionsList={setOptionsList}
          optionExist={exist.options}
        />
        <ProductsCategories
          categoriesList={categoriesList}
          setCategoriesList={setCategoriesList}
          categoryExist={exist.categories}
        />
        <ProductsImageCollection
          imageCollection={imageCollection}
          setImageCollection={setImageCollection}
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 p-2 cursor-pointer rounded-sm border border-zinc-200 bg-green-800 text-white"
        >
          <Plus size={20} />
          <span>Create Product</span>
        </button>
      </form>
    </>
  );
};

export default CreateNewProduct;