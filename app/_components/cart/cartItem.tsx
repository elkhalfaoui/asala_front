"use client";

import { remove_order } from "@/app/_store/actions";
import { OrderInfo } from "@/app/_store/reducer";
import { ChevronLeft, ChevronRight, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { connect } from "react-redux";

const CartItem = ({
  order,
  remove_order,
}: {
  order: OrderInfo;
  remove_order: (payload: { product_id: string; option_id: number }) => void;
}) => {
  return (
    <ul className="grid grid-cols-5 md:grid-cols-13 items-center gap-y-4 py-4 text-sm my-4 p-4 lg:p-2">
      <li className="col-span-5 lg:col-span-4 flex items-center gap-4 px-2">
        <Image
          src={order.image}
          alt="product"
          width={48}
          height={60}
          className="aspect-4/5 rounded-xs"
          priority
        />
        <Link
          href={`/products/${order.product_id}`}
          className="flex flex-col gap-2 hover:text-green"
        >
          <span>{order.title}</span>
          <div className="flex items-center gap-[1px]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} />
            ))}
          </div>
        </Link>
      </li>
      <li className="col-span-2 px-2">{order.dimension}</li>
      <li className="col-span-2 px-2">{order.price}.00 DH</li>
      <li className="col-span-2 flex gap-2 items-center px-2">
        <ChevronLeft size={16} className="cursor-pointer" />
        <p className="w-10 py-1 text-center border border-zinc-200">
          {order.quantity}
        </p>
        <ChevronRight size={16} className="cursor-pointer" />
      </li>
      <li className="col-span-2 px-2">{order.price * order.quantity}.00 DH</li>
      <li className="col-span-1 px-2">
        <button
          className="flex items-center gap-2 text-sm p-2 cursor-pointer text-red-400 border border-transparent hover:border-red-200 hover:bg-red-100 rounded-sm"
          onClick={() =>
            remove_order({
              product_id: order.product_id,
              option_id: order.option_id,
            })
          }
        >
          <Trash2 size={16} />
        </button>
      </li>
    </ul>
  );
};

const mapDispatchToProps = {
  remove_order,
};

export default connect(null, mapDispatchToProps)(CartItem);
