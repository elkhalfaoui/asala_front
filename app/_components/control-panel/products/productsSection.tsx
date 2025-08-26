"use client";

import { CirclePlus, List, PackageCheck, PackagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import CreateNewProduct from "./createNewProduct";

const ProductsSection = () => {
  const [createProductSection, setCreateProductSection] =
    useState<boolean>(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (success) {
        setSuccess("");
      }
    }, 3000);
  }, [success]);

  return (
    <section className="p-4">
      <h2 className="relative flex items-center gap-2 text-xl font-light mb-8 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-12 before:h-0.5 before:bg-yellow">
        <PackagePlus size={24} />
        <span>Products Section</span>
      </h2>
      {success && (
        <p className="absolute left-1/2 -translate-x-1/2 top-24 flex items-center gap-2 p-4 rounded-sm border border-green bg-green-200 text-green">
          <PackageCheck size={20} />
          <span className="text-lg">{success}</span>
        </p>
      )}
      <ul className="flex gap-4">
        <li
          className={`${
            createProductSection ? "w-3/4" : "w-1/4"
          } p-4 duration-200 rounded-sm border border-zinc-300 bg-zinc-100`}
        >
          {createProductSection ? (
            <CreateNewProduct setSuccess={setSuccess} />
          ) : (
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCreateProductSection(true)}
            >
              <CirclePlus size={24} className="text-yellow" />
              <span className="text-green">Create New Product</span>
            </button>
          )}
        </li>
        <li
          className={`${
            createProductSection ? "w-1/4" : "w-3/4"
          } p-4 duration-200 rounded-sm border border-zinc-300 bg-zinc-100`}
        >
          {createProductSection ? (
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCreateProductSection(false)}
            >
              <List size={24} className="text-yellow" />
              <span className="text-green">Show Products List</span>
            </button>
          ) : (
            <>List of Products</>
          )}
        </li>
      </ul>
    </section>
  );
};

export default ProductsSection;
