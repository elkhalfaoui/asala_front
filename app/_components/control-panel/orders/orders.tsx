"use client";

import axiosClient from "@/app/_lib/axiosClient";
import { DollarSign, Home, Phone, Star, Tags, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Order {
  id: number;
  productId: string;
  productTitle: string;
  optionId: string;
  optionDimension: string;
  optionPrice: number;
  quantity: number;
  mainImage: string;
  sellerFullName: string;
}

interface ClientWithOrders {
  id: string;
  fullName: string;
  address: string;
  phone: string;
  ordersStatus: string;
  orders: Order[];
}

const Orders = () => {
  const [clientWithOrders, setClientWithOrders] = useState<ClientWithOrders[]>(
    []
  );
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/seller/clients");
        console.log(res.data);
        setClientWithOrders([...res.data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (client: ClientWithOrders, status: string) => {
    const changeOrderStatus = async () => {
      try {
        const res = await axiosClient.post(
          `/seller/clients/ordersStatus/${client.id}?status=${status}`
        );
        console.log(res.data);
        setClientWithOrders([...res.data]);
      } catch (error) {
        console.log(error);
      }
    };

    changeOrderStatus();

    if (status == "order confirmed") {
      const totalGlobal = client.orders.reduce(
        (acc, cur) => acc + cur.optionPrice * cur.quantity,
        0
      );

      const intro = `Bonjour M. *${
        client.fullName
      }*,\nNous avons bien reçu votre ${
        client.orders.length > 1 ? "commandes" : "commande"
      } :\n\n`;

      const orders = client.orders
        .map((order, index) => {
          return (
            `*${index + 1}.*\n` +
            `${`${appUrl}/products/${order.productId}` || ""}\n` +
            `• Produit : ${order.productTitle}\n` +
            `• Dimensions : ${order.optionDimension}\n` +
            `• Prix : ${order.optionPrice} MAD\n` +
            `• Quantité : ${order.quantity}\n` +
            `• Total : ${order.optionPrice * order.quantity} MAD\n`
          );
        })
        .join("\n");

      const totalText = `💰 *Total général:* ${totalGlobal} MAD\n🚚 Livraison gratuite sous 3 jours.\n💵 Paiement à la livraison.`;

      const message = `${intro}${orders}\n${totalText}`;

      const url = `https://wa.me/${client.phone}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
    }
  };

  return (
    <section className="p-4">
      <h2 className="relative flex items-center gap-2 text-xl font-light mb-8 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-12 before:h-0.5 before:bg-yellow">
        <Tags size={24} />
        <span>Orders Section</span>
      </h2>
      <article className="grid grid-cols-1 gap-12">
        {clientWithOrders &&
          clientWithOrders.map((client) => (
            <ul
              className="flex flex-col gap-4 p-4 rounded-lg bg-zinc-100"
              key={client.id}
            >
              {/* Client Info */}
              <li className="grid items-center grid-cols-5 gap-2 p-4 text-sm rounded-lg bg-zinc-200">
                <h4 className="col-span-1 flex items-center gap-2">
                  <span className="min-w-5 p-1 text-center rounded-sm bg-green text-white">
                    {client.orders.length}
                  </span>
                  <User size={20} />
                  <span>{client.fullName}</span>
                </h4>
                <div className="col-span-1 flex items-center gap-2">
                  <Phone size={20} />
                  <span>{client.phone}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Home size={20} />
                  <span>{client.address}</span>
                </div>
                {client.ordersStatus == "order" ||
                client.ordersStatus == "new order" ? (
                  <div className="col-span-1 flex justify-center items-center gap-0.5 p-1 uppercase rounded-md border border-green bg-green-200 text-green">
                    <DollarSign size={14} />
                    <span>{client.ordersStatus}</span>
                  </div>
                ) : client.ordersStatus == "order confirmed" ? (
                  <div className="col-span-1 flex justify-center items-center gap-0.5 p-1 uppercase rounded-md border border-blue-700 bg-blue-200 text-blue-700">
                    <DollarSign size={14} />
                    <span>{client.ordersStatus}</span>
                  </div>
                ) : client.ordersStatus == "order refused" ? (
                  <div className="col-span-1 flex justify-center items-center gap-0.5 p-1 uppercase rounded-md border border-red-700 bg-red-200 text-red-700">
                    <DollarSign size={14} />
                    <span>{client.ordersStatus}</span>
                  </div>
                ) : (
                  <div className="col-span-1 flex justify-center items-center gap-0.5 p-1 uppercase rounded-md border border-zinc-700 bg-zinc-200 text-zinc-700">
                    <DollarSign size={14} />
                    <span>{client.ordersStatus}</span>
                  </div>
                )}
              </li>
              {/* Order Info */}
              {client.orders.map((order) => (
                <li
                  key={order.id}
                  className="grid grid-cols-7 items-center gap-4 px-2"
                >
                  <div className="col-span-3 flex gap-2">
                    <Image
                      src={order.mainImage}
                      alt="product"
                      width={48}
                      height={60}
                      className="aspect-4/5 rounded-xs"
                      priority
                    />
                    <Link
                      href={`/products/${order.id}`}
                      className="flex flex-col gap-2 hover:text-green"
                    >
                      <span>{order.productTitle}</span>
                      <div className="flex items-center gap-[1px]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} />
                        ))}
                      </div>
                    </Link>
                  </div>
                  <p className="col-span-1 px-2">{order.optionDimension}</p>
                  <p className="col-span-1 px-2">{order.optionPrice}.00 DH</p>
                  <p className="col-span-1 w-10 py-1 text-center border border-zinc-200">
                    {order.quantity}
                  </p>
                  <p className="col-span-1 px-2">
                    {order.optionPrice * order.quantity}.00 DH
                  </p>
                </li>
              ))}
              <li className="flex justify-between items-center  gap-2 py-4">
                <h4 className="p-2 rounded-md bg-green text-white">
                  Total:{" "}
                  {client.orders.reduce(
                    (acc, cur) => acc + cur.optionPrice * cur.quantity,
                    0
                  )}
                  .00 DH
                </h4>
                {client.ordersStatus == "order" ||
                client.ordersStatus == "new order" ? (
                  <button
                    className="p-1 rounded-md cursor-pointer border border-blue-600 text-blue-600 bg-blue-100"
                    onClick={() => handleClick(client, "order confirmed")}
                  >
                    Confirm Order
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 rounded-md cursor-pointer border border-zinc-600 text-zinc-600 bg-zinc-100"
                      onClick={() => handleClick(client, "order delivered")}
                    >
                      Delivered Order
                    </button>
                    <button
                      className="p-1 rounded-md cursor-pointer border border-red-600 text-red-600 bg-red-100"
                      onClick={() => handleClick(client, "order refused")}
                    >
                      Refused Order
                    </button>
                  </div>
                )}
              </li>
            </ul>
          ))}
      </article>
    </section>
  );
};

export default Orders;

// {
//   client.orders.reduce(
//     (acc, cur) => (acc = acc + cur.optionPrice * cur.quantity),
//     0
//   );
// }
