import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asala Design",
  description:
    "Découvrez ASALA DESIGN, votre boutique en ligne spécialisée dans les tableaux décoratifs imprimés. Des créations uniques et modernes pour sublimer vos murs et apporter une touche d’élégance à votre intérieur.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} antialiased`}>{children}</body>
    </html>
  );
}
