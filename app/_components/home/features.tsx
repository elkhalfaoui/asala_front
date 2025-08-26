import { CreditCard, Headset, Truck } from "lucide-react";

const Features = () => {
  return (
    <section className="py-12">
      <ul className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 justify-between gap-y-4">
        <li className="flex flex-col items-center">
          <div className="relative after:content-[''] after:absolute after:w-8 after:h-8 after:rounded-full after:top-1 after:left-0 after:-z-10 after:bg-yellow">
            <Truck size={48} strokeWidth={2} className="text-green" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h4 className="text-lg text-green">Free Shipping</h4>
            <p className="text-sm text-zinc-600">
              free shipping all across morocco
            </p>
          </div>
        </li>
        <li className="flex flex-col items-center">
          <div className="relative after:content-[''] after:absolute after:w-8 after:h-8 after:rounded-full after:top-1 after:right-0 after:-z-10 after:bg-yellow">
            <CreditCard size={48} strokeWidth={2} className="text-green" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h4 className="text-lg text-green">Flexible Payment</h4>
            <p className="text-sm text-zinc-600">
              pay with credit card or on delivery
            </p>
          </div>
        </li>
        <li className="flex flex-col items-center">
          <div className="relative after:content-[''] after:absolute after:w-8 after:h-8 after:rounded-full after:bottom-1 after:left-0 after:-z-10 after:bg-yellow">
            <Headset size={48} strokeWidth={2} className="text-green" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h4 className="text-lg text-green">24/7 Support</h4>
            <p className="text-sm text-zinc-600">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};
export default Features;
