import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = ({ setCurrentPage, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Dairy', id: 'dairy' },
    { name: 'Vegetables', id: 'vegetables' },
    { name: 'Featured', id: 'featured' },
  ];

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage('home')}
            whileHover={{ scale: 1.05 }}
          >
            <Leaf className="text-green-500 mr-2" size={28} />
            <h1 className={`font-bold text-xl ${isScrolled ? 'text-gray-800' : 'text-green-600'}`}>
              Fresh Harvest
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`font-medium ${
                  currentPage === item.id
                    ? 'text-green-600'
                    : isScrolled
                    ? 'text-gray-700 hover:text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                } transition-colors`}
                onClick={() => setCurrentPage(item.id)}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Cart Icon */}
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('cart')}
          >
            <ShoppingCart className={isScrolled ? 'text-gray-700' : 'text-gray-700'} size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`font-medium ${
                    currentPage === item.id
                      ? 'text-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  } transition-colors text-left py-2`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
