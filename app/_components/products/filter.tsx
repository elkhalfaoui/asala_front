"use client";

import { ArrowDownNarrowWide, ChevronDown } from "lucide-react";

const Filter = ({
  categories,
  filter,
  setFilter,
}: {
  categories: string[];
  filter: string[];
  setFilter: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const toggleCategory = (category: string) => {
    setFilter((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // remove if already selected
        : [...prev, category] // add if not selected
    );
  };

  return (
    <section className="container mx-auto px-4">
      <ul className="flex flex-wrap items-center justify-between gap-4 py-4 text-sm">
        <li className="w-full md:w-fit flex items-center gap-2 overflow-scroll scrollbar-hide">
          {/* All Categories Button */}
          <div
            className={`flex items-center gap-4 px-4 py-1 cursor-pointer rounded-full font-light ${
              filter.length === 0
                ? "bg-black text-white"
                : "bg-zinc-100 text-black"
            }`}
            onClick={() => setFilter([])}
          >
            All&nbsp;Categories
          </div>

          {/* Category Buttons */}
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 px-4 py-1 cursor-pointer rounded-full ${
                filter.includes(category)
                  ? "bg-black text-white"
                  : "bg-zinc-100 text-black"
              }`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </div>
          ))}
        </li>

        {/* Sort Section */}
        <li className="w-full md:w-fit relative flex items-center justify-between gap-4 md:pl-4 md:ml-8 after:content-[''] after:absolute after:md:w-[3px] after:h-5/6 after:top-1/12 after:left-0 after:bg-yellow">
          <p className="flex items-center gap-2">
            <ArrowDownNarrowWide size={20} />
            <span>Sort&nbsp;by</span>
          </p>
          <div className="flex items-center gap-4 px-4 py-1 cursor-pointer rounded-full bg-zinc-100">
            <span className="w-24">All products</span>
            <ChevronDown size={16} />
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Filter;
