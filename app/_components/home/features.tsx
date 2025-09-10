import { CreditCard, Headset, Truck } from "lucide-react";

const Features = () => {
  return (
    <section className="py-12">
      <ul className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 justify-between gap-y-4">
        <li className="flex flex-col items-center">
          <div className="relative after:content-[''] after:absolute after:w-8 after:h-8 after:rounded-full after:top-1 after:left-0 after:-z-10 after:bg-brown">
            <Truck size={48} strokeWidth={2} className="text-black" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h4 className="text-lg">Livraison gratuite</h4>
            <p className="text-sm text-zinc-600">
              livraison gratuite dans tout le Maroc
            </p>
          </div>
        </li>
        <li className="flex flex-col items-center">
          <div className="relative after:content-[''] after:absolute after:w-8 after:h-8 after:rounded-full after:top-1 after:right-0 after:-z-10 after:bg-brown">
            <CreditCard size={48} strokeWidth={2} className="text-black" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h4 className="text-lg">Paiement en livraison</h4>
            <p className="text-sm text-zinc-600">
              Profitez d’un achat sécurisé et pratique avec notre option de
              paiement à la livraison, sans stress
            </p>
          </div>
        </li>
        <li className="flex flex-col items-center">
          <div className="relative after:content-[''] after:absolute after:w-8 after:h-8 after:rounded-full after:bottom-1 after:left-0 after:-z-10 after:bg-brown">
            <Headset size={48} strokeWidth={2} className="text-black" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h4 className="text-lg">24/7 Assistance</h4>
            <p className="text-sm text-zinc-600">
              Bénéficiez d’une assistance rapide et disponible 24/7 pour
              répondre à toutes vos questions
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};
export default Features;
