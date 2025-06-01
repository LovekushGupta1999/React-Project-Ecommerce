import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromWishlist,
  moveToCart,
} from '../../Cart/WishlistSlice';

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-6">
          {wishlist.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {item.gender} - {item.category}
                  <br />
                  <strong>Brand:</strong> {item.brand}
                  <br />
                  <strong>Price:</strong> ${item.price}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => dispatch(moveToCart(item))}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
