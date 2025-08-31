import { remove_order } from "@/app/_store/actions";
import { OrderInfo } from "@/app/_store/reducer";
import { RootState } from "@/app/_store/store";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { connect } from "react-redux";

const SmallCart = ({
  orders,
  remove_order,
  smallCart,
  setSmallCart,
}: {
  orders: OrderInfo[];
  remove_order: (payload: { product_id: string; option_id: number }) => void;
  smallCart: boolean;
  setSmallCart: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <section
      className={`fixed top-16 h-[calc(100dvh-64px)] w-full md:w-md z-20 py-4 px-8 flex flex-col rounded-xl md:rounded-none md:rounded-tl-xl md:rounded-bl-xl duration-300 border border-zinc-200 bg-white ${
        smallCart ? "right-0" : "-right-full"
      }`}
    >
      <div className="flex justify-between items-center mb-8 text-zinc-700">
        <h2 className="text-2xl">
          <span className="text-green">Cart</span> Items{" "}
          <span className="px-2 rounded-md bg-yellow text-white">
            {orders.length}
          </span>
        </h2>
        <X
          size={32}
          className="cursor-pointer"
          onClick={() => setSmallCart(false)}
        />
      </div>
      <ul className="flex flex-col gap-2 mb-8 overflow-y-auto scrollbar-hide">
        {orders &&
          orders.map((order, index) => (
            <li
              key={index}
              className="grid grid-cols-5 p-2 rounded-md bg-zinc-100"
            >
              <Image
                src={order.image}
                alt="productImage"
                width={60}
                height={120}
                className="col-span-1 w-full h-full aspect-3/4 object-cover rounded-sm"
              />
              <ul className="col-span-4 flex justify-between pl-4">
                <li className="flex flex-col justify-between text-sm">
                  <h4>{order.title}</h4>
                  <ul className="flex gap-1">
                    <li className="w-1/2 flex flex-col gap-0.5  text-xs text-zinc-600">
                      <span>dimension:</span>
                      <span>unite price:</span>
                      <span>quantity:</span>
                    </li>
                    <li className="w-1/2 flex flex-col gap-0.5 text-xs">
                      <span>{order.dimension}</span>
                      <span>{order.price}</span>
                      <span>{order.quantity}</span>
                    </li>
                  </ul>
                </li>
                <li className="flex flex-col justify-between items-end">
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() =>
                      remove_order({
                        product_id: order.product_id,
                        option_id: order.option_id,
                      })
                    }
                  />
                  <h5 className="p-1 rounded-xs bg-green text-white">
                    Total:&nbsp;{order.price * order.quantity}
                  </h5>
                </li>
              </ul>
            </li>
          ))}
      </ul>
      <Link
        href="/cart"
        className="mt-auto mb-4 p-1 text-center cursor-pointer rounded-xs bg-green text-white"
      >
        Check out
      </Link>
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({
  orders: state.ordersInfo,
});

const mapDispatchToProps = {
  remove_order,
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallCart);
