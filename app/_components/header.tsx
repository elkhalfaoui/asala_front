"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, UserRound } from "lucide-react";
import BurgerMenu from "./home/burgerMenu";
import Image from "next/image";
import { RootState } from "../_store/store";
import { connect } from "react-redux";

const Header = ({ order_count }: { order_count: number }) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        if (!menu) {
          setShowHeader(false);
        } else {
          setMenu(false);
        }
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menu]);

  return (
    <header
      className={`sticky top-0 left-0 h-16 text-zinc-800 bg-white transition-transform duration-300 z-50 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="md:container mx-auto h-full md:px-4 flex justify-between items-center md:grid md:grid-cols-3">
        <menu className="col-span-1 w-full h-full flex md:flex-row justify-between items-center px-4 md:p-0 bg-white">
          <BurgerMenu menu={menu} setMenu={setMenu} />
          <Link href="/">
            <Image
              src="/ASALA DESIGN 1.png"
              alt="ASALA DESIGN"
              width={120}
              height={32}
            />
          </Link>
          <div className="flex md:hidden items-center justify-center gap-2">
            <Link href="/cart">
              <ShoppingCart strokeWidth={1.5} />
            </Link>
            {/* <Link href="/login">
              <UserRound strokeWidth={1.5} />
            </Link> */}
          </div>
        </menu>
        <nav
          className={`md:col-span-2 flex justify-between items-center flex-col md:flex-row h-[calc(100dvh-64px)] py-16 md:py-0 absolute left-0 w-full md:h-fit md:translate-0 md:top-0 md:relative duration-500 -z-10 md:z-0 bg-white ${
            menu ? "top-16" : "-top-[100dvh]"
          }`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-2">
            <li onClick={() => setMenu(false)}>
              <Link href="/" className="p-2">
                Accueil
              </Link>
            </li>
            <li onClick={() => setMenu(false)}>
              <Link href="/products?page=1" className="p-2">
                Boutique
              </Link>
            </li>
            <li onClick={() => setMenu(false)}>
              <Link href="#" className="p-2">
                À propos
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
            <li onClick={() => setMenu(false)}>
              <Link href="/cart" className="flex items-center gap-0.5">
                <ShoppingCart strokeWidth={1.5} />
                {order_count > 0 && (
                  <span className="w-7.5 p-[1px] text-center text-sm font-medium rounded-full bg-green text-white">
                    {order_count}
                  </span>
                )}
              </Link>
            </li>
            {/* <li>
              <Link href="/login">
                <UserRound strokeWidth={1.5} />
              </Link>
            </li> */}
            {/* <li className="flex items-center gap-1 md:pl-3 md:border-l border-zinc-300">
              <Globe strokeWidth={1.5} />
              <span>En</span>
              <ChevronDown strokeWidth={1.5} />
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({
  order_count: state.ordersInfo.length,
});

export default connect(mapStateToProps)(Header);
