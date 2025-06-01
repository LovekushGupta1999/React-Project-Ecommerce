import React, { useState } from 'react';
import productsData from './productsData';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';

function AllProducts() {
  const [filters, setFilters] = useState({
    gender: [],
    category: [],
    brand: [],
    price: 200,
  });

  const filterProducts = (products) => {
    return products.filter(product => {
      const matchGender = filters.gender.length ? filters.gender.includes(product.gender) : true;
      const matchCategory = filters.category.length ? filters.category.includes(product.category) : true;
      const matchBrand = filters.brand.length ? filters.brand.includes(product.brand) : true;
      const matchPrice = product.price <= filters.price;
      return matchGender && matchCategory && matchBrand && matchPrice;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4 w-full">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>
        <div className="lg:w-3/4 w-full">
          <ProductList products={filterProducts(productsData)} />
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
