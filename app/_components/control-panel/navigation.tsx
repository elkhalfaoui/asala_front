"use client";

import {
  LayoutDashboard,
  Menu,
  PackagePlus,
  Tags,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const Navigation = ({
  menu,
  setMenu,
}: {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav
      className={`w-full h-16 fixed bottom-0 md:w-16 md:h-full md:static duration-200 z-50 ${
        menu ? "lg:w-1/6 overflow-hidden" : "lg:w-16"
      } border-t md:border-t-0 md:border-r border-zinc-300 bg-zinc-100`}
    >
      <button className="hidden h-14 w-18 lg:flex justify-start items-center px-4 mb-8 cursor-pointer">
        <Menu size={24} onClick={() => setMenu(!menu)} />
      </button>
      <ul className="flex md:flex-col justify-around gap-y-5 p-4 md:mt-22 lg:mt-0 text-lg">
        <li className="">
          <Link
            href="/control-panel/dashboard"
            className={`relative flex items-center justify-start gap-2 group`}
          >
            <LayoutDashboard size={24} className="h-6.5" />
            <span
              className={`hidden group-hover:block absolute left-16 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-100 ${
                menu
                  ? "lg:block lg:static lg:left-0 lg:border-transparent lg:px-0 lg:py-0"
                  : ""
              }`}
            >
              Dashboard
            </span>
          </Link>
        </li>
        <li className="">
          <Link
            href="/control-panel/sellers"
            className={`relative flex items-center justify-start gap-2 group`}
          >
            <UsersRound size={24} className="h-6.5" />
            <span
              className={`hidden group-hover:block absolute left-16 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-100 ${
                menu
                  ? "lg:block lg:static lg:left-0 lg:border-transparent lg:px-0 lg:py-0"
                  : ""
              }`}
            >
              Sellers
            </span>
          </Link>
        </li>
        <li className="">
          <Link
            href="/control-panel/products"
            className={`relative flex items-center justify-start gap-2 group`}
          >
            <PackagePlus size={24} className="h-6.5" />
            <span
              className={`hidden group-hover:block absolute left-16 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-100 ${
                menu
                  ? "lg:block lg:static lg:left-0 lg:border-transparent lg:px-0 lg:py-0"
                  : ""
              }`}
            >
              Products
            </span>
          </Link>
        </li>
        <li className="">
          <Link
            href="/control-panel/orders"
            className={`relative flex items-center justify-start gap-2 group`}
          >
            <Tags size={24} className="h-6.5" />
            <span
              className={`hidden group-hover:block absolute left-16 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-100 ${
                menu
                  ? "lg:block lg:static lg:left-0 lg:border-transparent lg:px-0 lg:py-0"
                  : ""
              }`}
            >
              Orders
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
