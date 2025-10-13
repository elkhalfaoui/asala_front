"use client";

import axiosClient from "@/app/_lib/axiosClient";
import { OrderInfo } from "@/app/_store/reducer";
import Image from "next/image";
import { SetStateAction, useRef } from "react";

interface CheckoutData {
  fullName: string;
  phone: string;
  address: string;
  orders: {
    productId: string;
    optionId: number;
    quantity: number;
    cadreType: string;
  }[];
}

const Order = ({
  ordersInfo,
  setPassOrder,
}: {
  ordersInfo: OrderInfo[];
  setPassOrder: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare checkout data
      const checkoutData: CheckoutData = {
        fullName: fullNameRef.current?.value ?? "",
        phone: phoneRef.current?.value ?? "",
        address: addressRef.current?.value ?? "",
        orders: ordersInfo.map((order) => ({
          productId: order.product_id,
          optionId: order.option_id,
          quantity: order.quantity,
          cadreType: order.cadreType.toUpperCase(), // Convert to match enum: SANS, NOIRE, DORE
        })),
      };

      // Submit order
      const response = await axiosClient.post("/guest/checkout", checkoutData);

      if (response.status === 200) {
        // setSuccess(true);
        setTimeout(() => {
          setPassOrder(false);
          //   if (onOrderSuccess) {
          //     onOrderSuccess();
          //   }
        }, 1000);
      }
    } catch (err: unknown) {
        console.log(err)
      //   setError(err.response?.data?.message || "Une erreur s'est produite lors de la commande");
    } finally {
      //   setIsLoading(false);
    }
  };

  return (
    <article className="fixed w-full h-full z-[100] top-0 left-0 flex items-center justify-center bg-black/20">
      <form
        onSubmit={handleSubmit}
        className="w-xs md:w-sm flex flex-col gap-2 p-8 rounded-md bg-white"
      >
        <Image
          src="/ASALA DESIGN 1.png"
          alt="ASALA DESIGN"
          width={120}
          height={32}
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm">
            Nom*
          </label>
          <input
            type="text"
            id="name"
            ref={fullNameRef}
            autoFocus
            placeholder="Entrez votre nom complet"
            className="bg-white border border-zinc-300 outline-none p-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm">
            N° telephone*
          </label>
          <input
            type="text"
            id="phone"
            ref={phoneRef}
            placeholder="+212 *** *** ***"
            className="bg-white border border-zinc-300 outline-none p-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="adress" className="text-sm">
            Adresse*
          </label>
          <input
            type="text"
            id="adress"
            ref={addressRef}
            placeholder="Entrez votre adresse complète"
            className="bg-white border border-zinc-300 outline-none p-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button className="w-3/4 p-2 text-center rounded-sm cursor-pointer bg-green text-white">
            Confirm
          </button>
          <button
            onClick={() => setPassOrder(false)}
            className="w-1/4 p-2 text-center rounded-sm cursor-pointer bg-zinc-200 text-zinc-700"
          >
            cancel
          </button>
        </div>
      </form>
    </article>
  );
};

export default Order;