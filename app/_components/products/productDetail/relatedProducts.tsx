"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const RelatedProducts = () => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [carts, setCarts] = useState([
    { id: 0, pos: 0, title: "1", color: "#38bdf8" }, // sky
    { id: 1, pos: 1, title: "2", color: "#facc15" }, // yellow
    { id: 2, pos: 2, title: "3", color: "#4ade80" }, // green
    { id: 3, pos: 3, title: "4", color: "#fb7185" }, // rose
    { id: 4, pos: 4, title: "5", color: "#c084fc" }, // purple
    { id: 5, pos: 5, title: "6", color: "#fb923c" }, // orange
    { id: 6, pos: 6, title: "7", color: "#38bdf8" }, // sky
    { id: 7, pos: 7, title: "8", color: "#facc15" }, // yellow
    { id: 8, pos: 8, title: "9", color: "#4ade80" }, // green
    { id: 9, pos: 9, title: "10", color: "#fb7185" }, // rose
    { id: 10, pos: 10, title: "11", color: "#c084fc" }, // purple
    { id: 11, pos: 11, title: "12", color: "#fb923c" }, // orange
  ]);
  const CartsCount = 12;

  const toRight = () => {
    setCarts(
      carts.map((cart) => ({
        ...cart,
        pos: cart.pos == 0 ? CartsCount - 1 : cart.pos - 1,
      }))
    );
  };
  const toLeft = () => {
    setCarts(
      carts.map((cart) => ({
        ...cart,
        pos: cart.pos == CartsCount - 1 ? 0 : cart.pos + 1,
      }))
    );
  };
  useEffect(() => {
    if (touchStart > touchEnd && touchEnd !== 0) {
      toRight();
    }
    if (touchStart < touchEnd && touchEnd !== 0) {
      toLeft();
    }
  }, [touchEnd]);
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 md:px-2">
        <div className="flex justify-between mb-4 mx-4">
          <button
            className="py-2 px-4 rounded-full bg-zinc-200"
            onClick={toLeft}
          >
            <ChevronLeft size={20}/>
          </button>
          <button
            className="py-2 px-4 rounded-full bg-zinc-200"
            onClick={toRight}
          >
            <ChevronRight size={20}/>
          </button>
        </div>
        <div
          className="w-full overflow-hidden"
          onTouchStart={(e) => {
            setTouchStart(e.changedTouches[0].screenX);
            console.log(e.changedTouches[0].screenX);
          }}
          onTouchEnd={(e) => {
            setTouchEnd(e.changedTouches[0].screenX);
            console.log(e.changedTouches[0].screenX);
          }}
        >
          <ul className="relative w-[600%] md:w-[400%] lg:w-[240%] -translate-x-6/12 md:-translate-x-5/12 lg:-translate-x-4/12 h-16 -z-10 bg-red-300">
            {carts.map((cart) => (
              <li
                key={cart.id}
                className={`absolute h-full w-1/12 bg-yellow-400 duration-500`}
                style={{
                  backgroundColor: cart.color,
                  left: `${(cart.pos / CartsCount) * 100}%`,
                  zIndex:
                    cart.pos == 0 ? -1 : cart.pos == CartsCount - 1 ? -1 : 10,
                }}
              >
                {cart.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default RelatedProducts;
