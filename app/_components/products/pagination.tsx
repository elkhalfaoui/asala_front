"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Pagination = ({ numPages, page }: { numPages: number; page: number }) => {
  const router = useRouter();

  return (
    <ul className="flex justify-center items-center gap-6 py-8">
      <li
        className="cursor-pointer text-green"
        onClick={() =>
          page > 1 ? router.push(`/products?page=${page - 1}`) : ""
        }
      >
        <ChevronsLeft size={24} />
      </li>
      {Array.from({ length: numPages }, (_, i) => {
        const pageNum = i + 1;
        return (
          <li
            key={pageNum}
            className={`w-6 text-center border-b-2 ${
              pageNum === page
                ? "border-yellow text-green"
                : "border-transparent"
            }`}
          >
            <Link href={`/products?page=${pageNum}`}>{pageNum}</Link>
          </li>
        );
      })}
      <li
        className="cursor-pointer text-green"
        onClick={() =>
          page < numPages ? router.push(`/products?page=${page + 1}`) : ""
        }
      >
        <ChevronsRight size={24} />
      </li>
    </ul>
  );
};
export default Pagination;
