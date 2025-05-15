import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';

const ProductListing = ({ category, setCurrentPage, setSelectedProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category or featured
    if (category === 'featured') {
      filtered = filtered.filter(product => product.featured);
    } else if (category === 'dairy') {
      filtered = filtered.filter(product => product.category === 'dairy');
    } else if (category === 'vegetable') {
      filtered = filtered.filter(product => product.category === 'vegetable');
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortOption === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredProducts(filtered);
  }, [category, searchTerm, sortOption]);

  const categoryTitle = 
    category === 'featured' ? 'Featured Products' : 
    category === 'dairy' ? 'Dairy Products' : 'Fresh Vegetables';

  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{categoryTitle}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {category === 'featured' 
              ? 'Our hand-picked selection of the highest quality products for you to enjoy.'
              : category === 'dairy'
                ? 'Farm-fresh dairy products sourced from local producers with the highest standards.'
                : 'Organic, locally grown vegetables packed with nutrients and flavor.'}
          </p>
        </motion.div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Filter size={18} className="text-gray-500" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => {
                  setSelectedProduct(product.id);
                  setCurrentPage('product-detail');
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
