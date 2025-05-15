import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden h-48 cursor-pointer" onClick={onClick}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 
              className="font-medium text-gray-900 mb-1 cursor-pointer hover:text-green-600 transition-colors" 
              onClick={onClick}
            >
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm mb-2">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
          </div>
          <p className="font-semibold text-green-600">${product.price.toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <Button
            size="sm"
            variant="outline"
            onClick={onClick}
          >
            Details
          </Button>
          
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="flex items-center gap-1"
          >
            <ShoppingCart size={16} />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
