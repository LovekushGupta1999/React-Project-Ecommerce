import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Cart/Cartslice';
import { addToWishlist, removeFromWishlist } from '../../Cart/WishlistSlice';
import productsData from './productsData';

const ProductDetail = ({ handleOrderPopup }) => {
  const { id } = useParams();
  const product = productsData.find(p => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState('M');
  const dispatch = useDispatch();

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
    handleOrderPopup?.();
  };

  // Related products by gender and category
  const relatedProducts = productsData.filter(p =>
    p.id !== product.id &&
    (p.gender === product.gender && p.category === product.category)
  ).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto mt-4 p-4">
      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-contain rounded"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.gender} / {product.category} / {product.brand}</p>

          <button
            onClick={handleWishlistToggle}
            className="text-lg mb-4 flex items-center gap-2 text-pink-600"
          >
            {isWishlisted ? '💔 Remove from Wishlist' : '❤️ Add to Wishlist'}
          </button>

          <p className="text-xl font-semibold mb-4">${product.price}</p>

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

          <div className="mb-2">
            <p className="text-gray-600 mb-2">{product.discription}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded mt-6 w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(rp => (
            <Link to={`/product/${rp.id}`} key={rp.id}>
              <div className="border rounded shadow-sm hover:shadow-md transition p-2">
                <img
                  src={rp.image}
                  alt={rp.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-sm font-medium mt-2">{rp.name}</h3>
                <p className="text-xs text-gray-600">{rp.gender} / {rp.category}</p>
                <p className="text-sm font-semibold text-green-600">${rp.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Customer Reviews (Static for now) */}
      <div className="mt-10 ">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded dark:bg-slate-800 dark:text-white">
            <p className="font-semibold">⭐️⭐️⭐️⭐️⭐️ John Doe</p>
            <p>Great quality and fast delivery! Fits perfectly.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded dark:bg-slate-800 dark:text-white">
            <p className="font-semibold">⭐️⭐️⭐️⭐️ Sarah Smith</p>
            <p>Nice material and true to size. Will buy again.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
