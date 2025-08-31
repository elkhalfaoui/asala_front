"use client";

import { ArrowLeft, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import CartItem from "./cartItem";
import { connect } from "react-redux";
import { RootState } from "@/app/_store/store";
import { OrderInfo } from "@/app/_store/reducer";
import { useState } from "react";
import Order from "./order";

const Cart = ({ ordersInfo }: { ordersInfo: OrderInfo[] }) => {
  const [passOrder, setPassOrder] = useState(false);

  return (
    <section className="my-16">
      <ul className="md:container mx-auto px-4 grid grid-cols-1 lg:grid-cols-7 gap-8">
        <li className="col-span-1 lg:col-span-5">
          <div className="flex justify-between items-center pb-5 border-b border-zinc-200">
            <h2 className="text-2xl text-zinc-700">
              Votre <span className="text-emerald-800">Panier</span>
            </h2>
            <p className="text-xl text-zinc-600">
              {ordersInfo.length} Articles
            </p>
          </div>
          <ul className="hidden lg:grid lg:grid-cols-13 py-4">
            <li className="col-span-4 font-medium px-2">Produit</li>
            <li className="col-span-2 font-medium px-2">Dimension</li>
            <li className="col-span-2 font-medium px-2">Prix</li>
            <li className="col-span-2 font-medium px-2">Quantité</li>
            <li className="col-span-2 font-medium px-2">Subtotal</li>
            <li className="col-span-1 px-2"></li>
          </ul>
          {ordersInfo &&
            ordersInfo.map((order, index) => (
              <CartItem key={index} order={order} />
            ))}
          <Link
            href="/products?page=1"
            className="w-fit flex items-center gap-2 p-2 text-emerald-800"
          >
            <ArrowLeft size={16} />
            <span>Continuer les achats</span>
          </Link>
        </li>
        <li className="col-span-1 lg:col-span-2 p-4 bg-zinc-100">
          <h4 className="text-xl text-zinc-700 pb-2 border-b border-zinc-300">
            Résumé de la commande
          </h4>

          <ul className="flex flex-col gap-2 py-4 px-2">
            <li className="flex justify-between">
              <p>
                Articles <span>4</span>
              </p>
              <p>88.00 DH</p>
            </li>
            <li className="flex justify-between">
              <p className="text-zinc-600">Frais d&apos;expédition</p>
              <p>Gratuite</p>
            </li>
            <li className="flex justify-between py-2">
              <p className="font-medium">Totale</p>
              <p className="font-medium">999.00 DH</p>
            </li>
          </ul>
          <button
            className="w-full flex items-center justify-center gap-2 p-2 cursor-pointer bg-emerald hover:scale-105 duration-200 bg-green text-white"
            onClick={() => setPassOrder(true)}
          >
            <ShoppingBag size={20} />
            <span>Passer une commande</span>
          </button>
        </li>
      </ul>
      {passOrder && ordersInfo.length ? (
        
        <Order ordersInfo={ordersInfo} setPassOrder={setPassOrder} />

      ) : passOrder && !ordersInfo.length ? (
        <article className="fixed w-full h-full z-[100] top-0 left-0 flex flex-col gap-2 items-center justify-center bg-black/20">
          <p className="flex items-center gap-2 text-4xl text-green">
            <span>Your cart is empty</span>
            <ShoppingCart size={32} />
          </p>
          <Link href="/products?page=1" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span>Start Shopping</span>
          </Link>
        </article>
      ) : (
        <></>
      )}
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({
  ordersInfo: state.ordersInfo,
});

export default connect(mapStateToProps)(Cart);
