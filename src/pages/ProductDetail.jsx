import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { products } from '../data/products';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import Product3DViewer from '../components/3d/Product3DViewer';

const ProductDetail = ({ productId, setCurrentPage }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <p>Product not found</p>
        <Button onClick={() => setCurrentPage('home')}>Back to Home</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => setCurrentPage(product.category === 'dairy' ? 'dairy' : 'vegetables')}
          className="flex items-center text-gray-600 hover:text-green-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </button>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image/3D Model */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              {product.model3d ? (
                <Product3DViewer modelPath={product.model3d} />
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>

            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-green-600 mr-4">${product.price.toFixed(2)}</span>
              {product.inStock ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Out of Stock</span>
              )}
            </div>

            <p className="text-gray-700 mb-6">
              {product.description}
            </p>

            {/* Nutritional Info */}
            {product.nutritionalInfo && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Nutritional Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-gray-600 text-sm">Calories</p>
                    <p className="font-semibold text-gray-900">{product.nutritionalInfo.calories}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-gray-600 text-sm">Protein</p>
                    <p className="font-semibold text-gray-900">{product.nutritionalInfo.protein}g</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-gray-600 text-sm">Fat</p>
                    <p className="font-semibold text-gray-900">{product.nutritionalInfo.fat}g</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-gray-600 text-sm">Carbs</p>
                    <p className="font-semibold text-gray-900">{product.nutritionalInfo.carbs}g</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-4">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-3 py-1 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-3 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="lg"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            {/* Product Benefits */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <Truck className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <p className="text-gray-600 text-sm">100% satisfaction guarantee</p>
              </div>
              <div className="flex items-start">
                <Leaf className="text-green-500 mr-3 flex-shrink-0" size={20} />
                <p className="text-gray-600 text-sm">Sustainably sourced from local farms</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <motion.div
                  key={similarProduct.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => {
                    setCurrentPage('product-detail');
                    window.scrollTo(0, 0);
                    // This is a simulation, in a real app you would change the URL/route
                    setTimeout(() => {
                      window.location.reload();
                    }, 100);
                  }}
                >
                  <img
                    src={similarProduct.image}
                    alt={similarProduct.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{similarProduct.name}</h3>
                    <p className="text-green-600 font-semibold mt-1">${similarProduct.price.toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
