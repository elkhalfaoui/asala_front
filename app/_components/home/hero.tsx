"use client";

import {
  ArrowLeft,
  ArrowRight,
  Medal,
  Plus,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const Hero = () => {
  const [hero, setHero] = useState<boolean>(true);

  return (
    <section className="py-8 md:py-12 bg-zinc-100">
      <ul className="container mx-auto  px-4 grid grid-cols-1 md:grid-cols-2 items-center md:gap-x-8 lg:gap-x-24 gap-y-6">
        <li className="col-span-1 order-2 md:order-1 flex flex-col justify-center gap-8">
          <h4 className="flex items-center gap-2 w-fit mx-auto md:mx-0 rounded-full px-2 py-0.5 text-sm bg-white text-green">
            <Medal size={24} strokeWidth={1.5} />
            <span>La meilleure boutique Tableau en ligne</span>
          </h4>
          <h1 className="text-3xl md:text-4xl text-center md:text-start font-medium leading-12 text-green">
            DESIGN YOUR SPACE WITH INSPIRATION
          </h1>
          <p className="text-center text-sm md:text-start md:text-base">
            Transformez vos murs en reflets de votre personnalité. Nos tableaux
            décoratifs soigneusement conçus apportent élégance, originalité et
            inspiration à chaque recoin de votre maison ou de votre bureau.
          </p>
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-6">
            <Link
              href="/products?page=1"
              className="w-full md:w-fit flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-green text-white"
            >
              <ShoppingBasket size={24} strokeWidth={1.5} />
              <span>Achetez maintenant</span>
            </Link>
            <Link
              href="/products?page=1"
              className="flex gap-1 font-medium border-b-2 text-green"
            >
              Tous les produits
            </Link>
          </div>
          <ul className="flex flex-wrap md:flex-nowrap justify-center md:justify-start items-center">
            <li className="w-10 h-10 rounded-full translate-x-6 md:translate-x-0 border-2 border-zinc-100 overflow-hidden z-1">
              <Image
                src="/daniel-sessler-IyhdFcaRYqE-unsplash.jpg"
                alt="hero"
                height={40}
                width={40}
                className="object-cover w-full h-full"
              />
            </li>
            <li className="w-10 h-10 rounded-full translate-x-3 md:-translate-x-3 border-2 border-zinc-100 overflow-hidden z-2">
              <Image
                src="/aynaz-shahtale-bKgn2QUgr44-unsplash.jpg"
                alt="hero"
                height={40}
                width={40}
                className="object-cover w-full h-full"
              />
            </li>
            <li className="w-10 h-10 rounded-full md:-translate-x-6 border-2 border-zinc-100 overflow-hidden z-3">
              <Image
                src="/jeremy-bishop-8xznAGy4HcY-unsplash.jpg"
                alt="hero"
                height={40}
                width={40}
                className="object-cover w-full h-full"
              />
            </li>
            <li className="w-10 h-10 rounded-full -translate-x-3 md:-translate-x-9 border-2 border-zinc-100 overflow-hidden z-4">
              <Image
                src="/peter-olexa-ZO4rHqkCat4-unsplash.jpg"
                alt="hero"
                height={40}
                width={40}
                className="object-cover w-full h-full"
              />
            </li>
            <li className="w-10 h-10 flex items-center justify-center rounded-full -translate-x-6 md:-translate-x-12 border-2 cursor-pointer border-zinc-100 bg-yellow text-dark-green overflow-hidden z-5">
              <Plus size={20} strokeWidth={3} />
            </li>
            <li className="w-full md:w-fit flex flex-col justify-center md:-translate-x-10">
              <h4 className="text-center md:text-start font-medium">
                4,9 évaluations+
              </h4>
              <p className="text-center md:text-start text-sm text-zinc-600">
                Approuvé&nbsp;par&nbsp;les&nbsp;clients
              </p>
            </li>
          </ul>
        </li>
        <li className="relative col-span-1 order-1 md:order-2 flex gap-4 aspect-6/5 md:aspect-square lg:aspect-3/2">
          <div
            className={`${
              hero ? "w-4/5" : "w-1/5"
            } overflow-hidden rounded-xl duration-500 bg-zinc-200`}
          >
            <Image
              src="/heroOne.jpg"
              alt="hero"
              height={800}
              width={800}
              priority
              className="object-cover w-full h-full"
            />
          </div>
          <div
            className={`${
              hero ? "w-1/5" : "w-4/5"
            } overflow-hidden rounded-xl duration-500 bg-zinc-200`}
          >
            <Image
              src="/heroTwo.jpeg"
              alt="hero"
              height={800}
              width={800}
              priority
              className="object-cover w-full h-full"
            />
          </div>
          <div
            className={`absolute flex justify-center bottom-4 bg-yellow text-green p-1 sm:p-2 rounded-full transition-all cursor-pointer ${
              hero ? "move-right-animation" : "move-left-animation"
            }`}
            onClick={() => setHero(!hero)}
          >
            {hero ? (
              <ArrowRight
                size={20}
                strokeWidth={3}
                className="rotate-arrow-back-animation"
              />
            ) : (
              <ArrowLeft
                size={20}
                strokeWidth={3}
                className="rotate-arrow-animation"
              />
            )}
          </div>
        </li>
      </ul>
    </section>
  );
};
export default Hero;
