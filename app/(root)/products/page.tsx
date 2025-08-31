import AllProducts from "@/app/_components/products/allProducts";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) => {
  const page = (await searchParams).page ?? 0;

  return (
    <>
      <AllProducts page={page} />
    </>
  );
};

export default ProductsPage;
