import type { Metadata } from "next";
import App from "./app";

export const metadata: Metadata = {
  title: "ASALA DESIGN",
  description:
    "Découvrez ASALA DESIGN, votre boutique en ligne spécialisée dans les tableaux décoratifs imprimés. Des créations uniques et modernes pour sublimer vos murs et apporter une touche d’élégance à votre intérieur.",
  icons: {
    icon: "/favicon.ico",
  },
};

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <App>{children}</App>;
};

export default HomeLayout;
