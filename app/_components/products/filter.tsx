"use client";

import { ArrowDownNarrowWide, ChevronDown } from "lucide-react";

const Filter = ({ categories }: { categories: string[] }) => {
  return (
    <section className="container mx-auto px-4">
      <ul className="flex items-center justify-between py-4 text-sm">
        <li className="flex items-center gap-2 overflow-scroll scrollbar-hide">
          <div className="flex items-center gap-4 px-4 py-1 cursor-pointer rounded-full font-light bg-green text-white">
            All&nbsp;Categories
          </div>

          {categories &&
            categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-4 py-1 cursor-pointer rounded-full bg-zinc-100"
              >
                {category}
              </div>
            ))}
        </li>
        <li className="relative flex items-center gap-4 pl-4 ml-8 after:content-[''] after:absolute after:w-[3px] after:h-5/6 after:top-1/12 after:left-0 after:bg-yellow">
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
