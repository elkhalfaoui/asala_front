"use client";

import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ShoppingCart,
  Star,
} from "lucide-react";
import SmallCart from "./smallCart";
import { useEffect, useState } from "react";
import { Product } from "../../home/products";
import { add_order } from "@/app/_store/actions";
import { connect, ConnectedProps } from "react-redux";
import Image from "next/image";
import Link from "next/link";

const mapDispatchToProps = {
  add_order,
};

const connector = connect(null, mapDispatchToProps);

// Redux-injected props type
type ReduxProps = ConnectedProps<typeof connector>;

type ProductInfoProps = ReduxProps & {
  product: Product;
};

const ProductInfo = ({ product, add_order }: ProductInfoProps) => {
  const [smallCart, setSmallCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<
    Product["options"][number] | null
  >(null);
  const [cadre, setCadre] = useState<string>("sans");

  // Pick smallest price option by default
  useEffect(() => {
    if (product?.options?.length) {
      const minOption = [...product.options].reduce((prev, curr) =>
        prev.withCadrePrice < curr.withCadrePrice ? prev : curr
      );
      setSelectedOption(minOption);
    }
  }, [product]);

  // Calculate current price based on dimension and cadre
  const getCurrentPrice = () => {
    if (!selectedOption) return 0;
    return cadre === "sans"
      ? selectedOption.withoutCadrePrice
      : selectedOption.withCadrePrice;
  };

  // Calculate original price for strikethrough
  const getOriginalPrice = () => {
    if (!selectedOption) return 0;
    return cadre === "sans"
      ? selectedOption.withoutCadrePrice + 50
      : selectedOption.withCadrePrice + 50;
  };

  return (
    <>
      <SmallCart smallCart={smallCart} setSmallCart={setSmallCart} />
      <li className="col-span-1 flex flex-col">
        <h2 className="text-2xl mb-0.5 text-green">{product?.title}</h2>
        <div className="flex items-center gap-1 mb-2">
          <Star size={16} strokeWidth={3} className="text-yellow" />
          <Star size={16} strokeWidth={3} className="text-yellow" />
          <Star size={16} strokeWidth={3} className="text-yellow" />
          <Star size={16} strokeWidth={3} className="text-yellow" />
          <Star size={16} strokeWidth={3} className="text-yellow" />
          <span className="pl-2 text-zinc-600">{`${product.averageRating} (${product.totalRatings})`}</span>
        </div>
        <p className="mb-2">{product?.description}</p>

        {/* Dimension Options */}
        <div className="mb-4">
          <h5 className="mb-2">Dimensions</h5>
          <ul className="flex flex-wrap gap-2">
            {product?.options
              .slice()
              .sort((a, b) => {
                const [aw, ah] = a.dimension
                  .split("x")
                  .map((n) => parseInt(n.trim(), 10));
                const [bw, bh] = b.dimension
                  .split("x")
                  .map((n) => parseInt(n.trim(), 10));

                if (aw !== bw) return aw - bw;
                return ah - bh;
              })
              .map((option) => (
                <li
                  key={option.id}
                  onClick={() => setSelectedOption(option)}
                  className={`w-fit p-2 border cursor-pointer text-sm text-center rounded-md 
                    ${
                      selectedOption?.id === option.id
                        ? "border-baack bg-green-100 text-black"
                        : "border-zinc-300 text-zinc-700"
                    }`}
                >
                  {option.dimension}
                </li>
              ))}
          </ul>
        </div>

        <ul className="flex items-center gap-4 mb-4">
          <li
            className={`w-10 h-10 p-1 cursor-pointer border ${
              cadre == "sans" ? "border-zinc-800" : "border-transparent"
            }`}
            onClick={() => setCadre("sans")}
          >
            <Image
              src="/sans_cadre.jpeg"
              alt="sans_cadre"
              width={40}
              height={40}
            />
          </li>
          <li
            className={`w-10 h-10 p-1 cursor-pointer border ${
              cadre == "noire" ? "border-zinc-800" : "border-transparent"
            }`}
            onClick={() => setCadre("noire")}
          >
            <Image
              src="/cadre_noire.jpeg"
              alt="cadre_noire"
              width={40}
              height={40}
            />
          </li>
          <li
            className={`w-10 h-10 p-1 cursor-pointer border ${
              cadre == "dore" ? "border-zinc-800" : "border-transparent"
            }`}
            onClick={() => setCadre("dore")}
          >
            <Image
              src="/cadre_dore.jpeg"
              alt="cadre_dore"
              width={40}
              height={40}
            />
          </li>
        </ul>

        {/* Pricing */}
        <div className="flex flex-wrap items-baseline gap-4 mb-4">
          <div className="col-span-1 flex items-center px-2">
            <ChevronLeft
              size={18}
              onClick={() =>
                setQuantity(quantity > 1 ? quantity - 1 : quantity)
              }
              className="cursor-pointer text-zinc-600"
            />
            <p className="w-10 py-1 text-center rounded-sm border border-zinc-200">
              {quantity}
            </p>
            <ChevronRight
              size={18}
              onClick={() =>
                setQuantity(quantity < 99 ? quantity + 1 : quantity)
              }
              className="cursor-pointer text-zinc-600"
            />
          </div>

          {selectedOption && (
            <>
              <h3 className="w-fit text-2xl font-medium p-2 rounded-sm bg-black text-white">
                {getCurrentPrice() * quantity}.00 DH
              </h3>
              <p className="line-through text-zinc-600">
                {getOriginalPrice() * quantity}.00 DH
              </p>
            </>
          )}
        </div>

        <div className="h-px bg-zinc-300 my-4"></div>

        <table className="w-fit mb-4">
          <tbody>
            <tr>
              <td>Categories</td>
              <td className="pl-12 text-zinc-600">
                {product?.categories.map((category) => (
                  <span key={category.id}>{category.title}, </span>
                ))}
              </td>
            </tr>
            <tr>
              <td>dimension</td>
              <td className="pl-12 text-zinc-600">
                {selectedOption?.dimension}
              </td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td className="pl-12 text-zinc-600">Free</td>
            </tr>
          </tbody>
        </table>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <Link href="/cart" className="w-full flex items-center justify-center gap-2 py-2 text-center rounded-xs cursor-pointer text-black bg-zinc-300 hover:scale-105 duration-300">
            <CreditCard size={24} />
            <span>Achat</span>
          </Link>
          <button
            className="w-full flex items-center justify-center gap-2 py-2 text-center rounded-xs cursor-pointer text-white bg-black hover:scale-105 duration-300"
            onClick={() => {
              if (selectedOption) {
                add_order({
                  product_id: product.id,
                  option_id: selectedOption.id,
                  title: product.title,
                  image: product.imageCollection.firstImage,
                  rating: product.averageRating,
                  dimension: selectedOption.dimension,
                  price: getCurrentPrice(),
                  quantity: quantity,
                  total: quantity * getCurrentPrice(),
                  cadreType: cadre,
                });
              }
              setSmallCart(true);
            }}
          >
            <ShoppingCart size={24} />
            <span>Ajouter au panier</span>
          </button>
        </div>
      </li>
    </>
  );
};

export default connector(ProductInfo);
