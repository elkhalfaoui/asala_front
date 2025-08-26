"use client";

import {
  Circle,
  CircleAlert,
  CircleCheckBig,
  CircleDollarSign,
  CirclePlus,
  Ruler,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Option, OptionType } from "./createNewProduct";

const ProductsOptions = ({
  optionsList,
  setOptionsList,
  optionExist,
}: {
  optionsList: Option[];
  setOptionsList: React.Dispatch<React.SetStateAction<Option[]>>;
  optionExist: boolean;
}) => {
  const [optionType, setOptionType] = useState<boolean>(true);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const dimensionRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  const List: Option[] = [
    {
      id: 1,
      title: "pack 2-XS",
      dimension: "40 x 30",
      price: 249,
      type: OptionType.PACK,
      selected: false,
    },
    {
      id: 2,
      title: "pack XS",
      dimension: "50 x 35",
      price: 299,
      type: OptionType.PACK,
      selected: false,
    },
    {
      id: 3,
      title: "pack SM",
      dimension: "60 x 43",
      price: 349,
      type: OptionType.PACK,
      selected: false,
    },
    {
      id: 4,
      title: "pack MD",
      dimension: "70 x 50",
      price: 399,
      type: OptionType.PACK,
      selected: false,
    },
    {
      id: 5,
      title: "pack LG",
      dimension: "80 x 55",
      price: 449,
      type: OptionType.PACK,
      selected: false,
    },
    {
      id: 6,
      title: "pack XL",
      dimension: "100 x 60",
      price: 499,
      type: OptionType.PACK,
      selected: false,
    },
    {
      id: 7,
      title: "pack 2-XL",
      dimension: "120 x 70",
      price: 549,
      type: OptionType.PACK,
      selected: false,
    },
    {
      id: 8,
      title: "solo SM",
      dimension: "80 x 55",
      price: 249,
      type: OptionType.SOLO,
      selected: false,
    },
    {
      id: 9,
      title: "solo MD",
      dimension: "100 x 60",
      price: 299,
      type: OptionType.SOLO,
      selected: false,
    },
    {
      id: 10,
      title: "solo LG",
      dimension: "120 x 70",
      price: 349,
      type: OptionType.SOLO,
      selected: false,
    },
    {
      id: 11,
      title: "Sara",
      dimension: "Himara",
      price: 2.04,
      type: OptionType.SOLO,
      selected: false,
    },
  ];

  const handleOptions = (option: Option) => {
    setOptionsList((cur) =>
      cur.map((opt) => {
        if (opt.id === option.id) {
          return { ...opt, selected: !opt.selected };
        }

        if (option.type === OptionType.PACK && opt.type === OptionType.SOLO) {
          return { ...opt, selected: false };
        }

        if (option.type === OptionType.SOLO && opt.type === OptionType.PACK) {
          return { ...opt, selected: false };
        }

        return opt;
      })
    );
  };

  useEffect(() => {
    setOptionsList([...List]);
  }, [, setOptionsList]);

  return (
    <div>
      <label htmlFor="categories" className="font-light">
        *Select Product Categories
      </label>
      <p className="flex items-center gap-1 text-sm mb-2 text-zinc-600">
        <CircleAlert size={14} />
        <span>
          each product require at least one Option, you can only select from one
          options type (solo/pack)
        </span>
      </p>
      <ul className="relative w-fit h-9 flex z-10 mb-4 bg-zinc-200">
        <li
          className={`w-1/2 h-full flex items-center gap-2 px-2 z-10 cursor-pointer ${
            optionType ? "text-green" : ""
          }`}
          onClick={() => setOptionType(true)}
        >
          {optionType ? <CircleCheckBig size={24} /> : <Circle size={24} />}
          <span>Pack</span>
          <span className="text-sm text-zinc-600">x3&nbsp;tableaux</span>
        </li>
        <li
          className={`w-1/2 h-full flex items-center gap-2 px-2 z-10 cursor-pointer ${
            optionType ? "" : "text-green"
          }`}
          onClick={() => setOptionType(false)}
        >
          {optionType ? <Circle size={14} /> : <CircleCheckBig size={14} />}
          <span>Solo</span>
          <span className="text-sm text-zinc-600">x1&nbsp;tableau</span>
        </li>
        <li
          className={`absolute w-1/2 h-full top-0 ${
            optionType ? "left-0" : "left-1/2"
          } z-0 duration-200 border-b-2 border-green-700 bg-green-100`}
        ></li>
      </ul>
      <ul className="grid grid-cols-6 gap-2">
        {optionsList &&
          optionsList
            .filter(
              (option) =>
                option.type === (optionType ? OptionType.PACK : OptionType.SOLO)
            )
            .map((option) => (
              <li
                key={option.id}
                className={`flex flex-col gap-1 p-2 cursor-pointer rounded-md border ${
                  option.selected
                    ? "border-green-600 bg-green-100 text-green"
                    : "border-zinc-200 bg-zinc-50"
                }`}
                onClick={() => handleOptions(option)}
              >
                <h5 className="flex items-center justify-between">
                  <span>{option?.title}</span>
                  {option.selected ? (
                    <CircleCheckBig size={16} />
                  ) : (
                    <CirclePlus size={16} />
                  )}
                </h5>
                <p className="flex items-center gap-1 text-sm text-zinc-600">
                  <span>{option?.dimension}</span>
                  <Ruler size={14} />
                </p>
                <p className="flex items-center gap-1 text-sm text-zinc-600">
                  <span>{option?.price}</span>
                  <CircleDollarSign size={14} />
                </p>
              </li>
            ))}
        <li className="col-span-2 flex flex-col gap-1 p-2 rounded-md border border-zinc-200 bg-zinc-50">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="title"
              ref={titleRef}
              className="w-3/4 px-1 outline-none border border-zinc-200"
            />
            <CirclePlus
              size={16}
              className="cursor-pointer"
              onClick={() =>
                setOptionsList([
                  ...optionsList,
                  {
                    id: optionsList.length + 1,
                    title: titleRef.current?.value ?? "",
                    dimension: dimensionRef.current?.value ?? "",
                    price: Number(priceRef.current?.value) ?? 0,
                    type: optionType ? OptionType.PACK : OptionType.SOLO,
                    selected: true,
                  },
                ])
              }
            />
          </div>
          <input
            type="text"
            placeholder="dimension"
            ref={dimensionRef}
            className="w-3/4 px-1 outline-none border border-zinc-200"
          />
          <input
            type="number"
            placeholder="price"
            ref={priceRef}
            className="w-3/4 px-1 outline-none border border-zinc-200"
          />
        </li>
      </ul>
      {!optionExist && (
        <span className="text-sm text-red-600">
          *each product require one option at least
        </span>
      )}
    </div>
  );
};

export default ProductsOptions;
