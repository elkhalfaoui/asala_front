import Link from "next/link";
import {
  Clock,
  Facebook,
  Github,
  Instagram,
  LocationEdit,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer id="#" className="mt-8 pt-12 bg-zinc-100">
      <ul className="md:container mx-auto p-4 grid grid-cols-1 gap-8 text-center lg:text-start  lg:grid-cols-3 lg:gap-4">
        <li className="flex flex-col gap-4">
          <Link href="/">
            <Image
              src="/ASALA DESIGN 1.png"
              alt="logo"
              width={260}
              height={56}
              className="w-[160px] object-cover"
            />
          </Link>
          <p className="text-zinc-600">
            Suivez-nous sur les réseaux sociaux pour être informé de nos
            derniers produits
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <a
              href="https://www.facebook.com/share/1AkbCLSwLt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-600"
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com/chic_tableau/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-rose-500"
            >
              <Instagram />
            </a>
          </div>
        </li>
        <li className="flex flex-col gap-4">
          <h4 className="font-medium text-green">Entreprise</h4>
          <Link href="/" className="text-zinc-600">
            Accueil
          </Link>
          <Link href="/#about" className="text-zinc-600">
            À propos
          </Link>
          <Link href="/#contact" className="text-zinc-600">
            Contact
          </Link>
          <Link href="#" className="text-zinc-600">
            Politique de confidentialité
          </Link>
        </li>
        <li className="flex flex-col items-center lg:items-start gap-6">
          <h4 className="font-medium text-green">Entrer en contact</h4>
          <p className="flex flex-col items-center md:flex-row gap-2 text-zinc-600">
            <Clock />
            <span>Disponible de 9h00 à 20h00</span>
          </p>
          <p className="flex flex-col items-center md:flex-row gap-2 text-zinc-600">
            <Phone />
            <span>+212 766 903 663</span>
          </p>
          <p className="flex flex-col items-center md:flex-row gap-2 text-zinc-600">
            <Mail />
            <span>contact@chictableau.com</span>
          </p>
          <p className="flex flex-col items-center md:flex-row gap-2 text-zinc-600">
            <LocationEdit />
            <span>Maroc, Marrakech, Azzouzia</span>
          </p>
        </li>
      </ul>
      <p className="px-4 py-8 mt-8 border-t text-center text-sm bg-zinc-200 border-zinc-300">
        Copyrights 2025 &copy;&nbsp;
        <a
          href="https://github.com/elkhalfaoui"
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex items-center gap-1 underline text-green"
        >
          <span>elkhalfaoui</span>
          <Github size={20} />
        </a>
        &nbsp;Tous droits réservés
      </p>
    </footer>
  );
};
export default Footer;
