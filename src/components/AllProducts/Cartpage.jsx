import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from '../../Cart/Cartslice';

const CartPage = () => {
  const cartItems = useSelector(state => state.carts);
  const dispatch = useDispatch();

  const total = cartItems.carts.reduce((sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.carts.map((item) => (
              <div
                key={item.id}
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
                    <strong>Size:</strong> {item.size}
                    <br />
                    <strong>Price:</strong> ${item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded bg-white dark:bg-slate-800 dark:text-white"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded bg-white dark:bg-slate-800 dark:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
               <p className="text-sm mt-2">
             <strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}
              </p>
                <button
                  onClick={() =>dispatch(removeFromCart(item.id))}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
            <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
              Checkout
            </button>
          </div>

                    <button
            onClick={() => dispatch(clearCart())}
            className="mt-2 bg-red-600 hover:bg-red-300 text-white px-6 py-2 rounded"
            >
            Clear Cart
            </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
