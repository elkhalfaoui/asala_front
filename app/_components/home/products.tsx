'use client';

import ProductItem from './productItem';
import { CalendarClock, Heart, Star } from 'lucide-react';
import { useState } from 'react';

const Products = () => {
  const [filter, setFilter] = useState('latest');

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="relative text-xl font-light w-fit mx-auto mb-4 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-8 before:h-0.5 before:bg-yellow">
          Products
        </h2>
        <h3 className="text-2xl text-center font-medium mb-4 text-green">
          Our Products Collections
        </h3>
        <ul className="flex items-center justify-start sm:justify-center gap-2 mb-8 overflow-x-scroll scrollbar-hide">
          <li
            className={`flex items-center gap-1 py-1 px-2 rounded-full cursor-pointer border ${
              filter == 'latest'
                ? ' border-green bg-green text-white'
                : 'border-zinc-200'
            }`}
            onClick={() => setFilter('latest')}
          >
            <CalendarClock size={16} />
            <span>Latests</span>
          </li>
          <li
            className={`flex items-center gap-1 py-1 px-2 rounded-full cursor-pointer border ${
              filter == 'best'
                ? ' border-green bg-green text-white'
                : 'border-zinc-200'
            }`}
            onClick={() => setFilter('best')}
          >
            <Star size={16} />
            <span>Best&nbsp;Sellers</span>
          </li>
          <li
            className={`flex items-center gap-1 py-1 px-2 rounded-full cursor-pointer border ${
              filter == 'featured'
                ? ' border-green bg-green text-white'
                : 'border-zinc-200'
            }`}
            onClick={() => setFilter('featured')}
          >
            <Heart size={16} />
            <span>Featured&nbsp;Products</span>
          </li>
        </ul>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          <ProductItem bgImg={'jr-korpa-baiXRjt912U-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-ctjoCkk7Dig-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-F2O333CR7YE-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-iigYfkARKzQ-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-m3KY4ixMWbM-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-P6y5rADKkgk-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-qLkLRF7xdt4-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-u3yyYID6eP4-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-uoPg1i1cDvY-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-wAXD_Its-48-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-wZcnZPheJbw-unsplash.jpg'} />
          <ProductItem bgImg={'jr-korpa-H_BJWThZRok-unsplash.jpg'} />
        </ul>
      </div>
    </section>
  );
};
export default Products;