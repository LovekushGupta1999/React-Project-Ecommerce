import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import productsData from './productsData';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Cart/Cartslice';
import { addToWishlist, removeFromWishlist } from '../../Cart/WishlistSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState('M');

  const dispatch = useDispatch();

  // Check if product is in wishlist
  const wishlist = useSelector(state => state.wishlist);
  const isWishlisted = wishlist.some(item => item.id === product?.id);

  if (!product) return <div className="text-center py-10">Product not found</div>;

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, size: selectedSize }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[500px] object-cover rounded"
      />
      

      {/* Product Info */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-2">{product.gender} / {product.category} / {product.brand}</p>

        {/* Wishlist Toggle Button */}
        <button
          onClick={handleWishlistToggle}
          className="text-lg mb-4 flex items-center gap-2 text-pink-600"
        >
          {isWishlisted ? '💔 Remove from Wishlist' : '❤️ Add to Wishlist'}
        </button>

        <p className="text-xl font-semibold mb-4">${product.price}</p>

        {/* Size Selector */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Select Size:</h2>
          <div className="flex gap-3">
            {['L', 'M', 'XL'].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-400 text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded mt-6 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
