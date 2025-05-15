import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const Cart = ({ setCurrentPage }) => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </button>

          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        </div>

        {items.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="hidden md:grid md:grid-cols-7 text-gray-500 bg-gray-50 p-4">
                <div className="col-span-3">Product</div>
                <div className="col-span-1 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-1 text-center">Total</div>
              </div>

              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-7 border-b border-gray-200 p-4 items-center"
                >
                  {/* Mobile: Product Title & Remove */}
                  <div className="flex justify-between items-start mb-3 md:hidden">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Product */}
                  <div className="flex items-center col-span-3">
                    <div className="w-16 h-16 overflow-hidden rounded-md flex-shrink-0 mr-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="hidden md:block">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.product.category.charAt(0).toUpperCase() + item.product.category.slice(1)}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center md:justify-center col-span-1 mb-3 md:mb-0">
                    <span className="md:hidden text-gray-500">Price:</span>
                    <span className="font-medium">${item.product.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-between items-center md:justify-center col-span-2 mb-3 md:mb-0">
                    <span className="md:hidden text-gray-500">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        className="px-3 py-1 text-gray-500 hover:text-gray-700"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        className="px-3 py-1 text-gray-500 hover:text-gray-700"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove Button */}
                  <div className="flex justify-between items-center md:justify-center col-span-1">
                    <span className="md:hidden text-gray-500">Total:</span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="hidden md:block text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="md:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h2>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    placeholder="Add any special instructions or notes about your order..."
                  ></textarea>
                </div>
              </div>

              <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">{totalPrice >= 50 ? 'Free' : '$4.99'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${(totalPrice * 0.07).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(totalPrice + (totalPrice >= 50 ? 0 : 4.99) + totalPrice * 0.07).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mb-3">Proceed to Checkout</Button>

                  <button
                    onClick={clearCart}
                    className="w-full text-center text-gray-500 hover:text-red-500 transition-colors text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <ShoppingBag size={64} className="mx-auto text-gray-300" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={() => setCurrentPage('home')}>Start Shopping</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
