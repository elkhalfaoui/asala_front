"use client";

import { CircleAlert, CircleCheckBig, CirclePlus } from "lucide-react";
import { useEffect, useRef } from "react";
import { Category } from "./createNewProduct";

const List: Category[] = [
  {
    id: 1,
    title: "Islamic",
    selected: false,
  },
  {
    id: 2,
    title: "Traditional",
    selected: false,
  },
  {
    id: 3,
    title: "Moroccan",
    selected: false,
  },
  {
    id: 4,
    title: "Abstract",
    selected: false,
  },
];

const ProductsCategories = ({
  categoriesList,
  setCategoriesList,
  categoryExist,
}: {
  categoriesList: Category[];
  setCategoriesList: React.Dispatch<React.SetStateAction<Category[]>>;
  categoryExist: boolean
}) => {
  const newCategoryRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     categories: categoriesList
  //       .filter((category) => {
  //         if (category.selected) {
  //           return category.title;
  //         }
  //       })
  //       .map((category) => category.title),
  //   }));
  // }, [categoriesList, setFormData]);

  useEffect(() => {
    setCategoriesList([...List]);
  }, [, setCategoriesList]);

  return (
    <div>
      <label htmlFor="categories" className="font-light">
        *Select Product Categories
      </label>
      <p className="flex items-center gap-1 text-sm mb-2 text-zinc-600">
        <CircleAlert size={14} />
        <span>
          each product require at least one category, the categories help the
          client finding your product
        </span>
      </p>
      <ul className="grid grid-cols-6 gap-2">
        {categoriesList &&
          categoriesList.map((category) => (
            <li
              key={category.id}
              className={`flex items-center justify-between p-2 cursor-pointer rounded-md border ${
                category.selected
                  ? "border-green-600 bg-green-100 text-green"
                  : "border-zinc-200 bg-zinc-50"
              }`}
              onClick={() =>
                setCategoriesList((cur) =>
                  cur.map((cat) =>
                    cat.id == category.id
                      ? { ...cat, selected: !cat.selected }
                      : cat
                  )
                )
              }
            >
              <span>{category?.title}</span>
              {category.selected ? (
                <CircleCheckBig size={16} className="w-4" />
              ) : (
                <CirclePlus size={16} className="w-4" />
              )}
            </li>
          ))}
        <li className="col-span-2 flex items-center justify-between p-2 cursor-pointer rounded-md border border-zinc-200 bg-zinc-50">
          <input
            type="text"
            ref={newCategoryRef}
            placeholder="Add Category"
            className="px-1 outline-none border border-zinc-200"
          />
          <CirclePlus
            size={16}
            onClick={() =>
              setCategoriesList([
                ...categoriesList,
                {
                  id: categoriesList.length + 1,
                  title: newCategoryRef.current?.value ?? "",
                  selected: true,
                },
              ])
            }
          />
        </li>
      </ul>
      {!categoryExist && (
        <span className="text-sm text-red-600">
          *each product require one option at least
        </span>
      )}
    </div>
  );
};

export default ProductsCategories;
