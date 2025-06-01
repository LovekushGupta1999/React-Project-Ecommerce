import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded shadow hover:shadow-lg transition duration-300 flex flex-col">
          <img
            src={product.image}
            alt={product.name}
            className="h-80 object-cover w-full rounded-t"
          />
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1">
              {product.gender} - {product.category}<br />
              <strong>Brand:</strong> {product.brand}<br />
              <strong>Price:</strong> ${product.price}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded mt-4"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
