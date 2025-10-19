import ProductDetail from "@/app/_components/products/productDetail/productDetail";
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/products?page=1"
          className="flex items-center gap-2 mb-4 cursor-pointer text-black"
        >
          <ChevronsLeft size={20} />
          <span>Retour</span>
        </Link>
        <ProductDetail productId={productId} />
      </div>
    </section>
  );
};
export default ProductPage;
