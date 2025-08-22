const Categories = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 ">
        <h2 className="relative text-xl font-light w-fit mx-auto mb-8 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-8 before:h-0.5 before:bg-yellow">Categories</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="col-span-1 row-span-2 aspect-4/2 rounded-xl bg-zinc-200"></li>
          <li className="col-span-1 row-span-3 aspect-4/3 rounded-xl bg-zinc-200"></li>
          <li className="col-span-1 row-span-3 aspect-4/3 rounded-xl bg-zinc-200"></li>
          <li className="col-span-1 row-span-2 aspect-4/2 rounded-xl bg-zinc-200"></li>
        </ul>
      </div>
    </section>
  );
};
export default Categories;