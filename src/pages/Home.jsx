import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Leaf, Truck, Award, Clock } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';
import Button from '../components/ui/Button';
import ScrollScene from '../components/3d/ScrollScene';

function Home({ setCurrentPage, setSelectedProduct }) {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="flex flex-col min-h-screen relative">
      <ScrollScene />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-br from-green-50/80 to-blue-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="w-full md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Fresh Dairy & Vegetables <span className="text-green-500">Delivered</span> to Your Door
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Farm-to-table products from local producers. Fresh, nutritious, and sustainably sourced for your family.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => setCurrentPage('dairy')}
                >
                  Shop Dairy
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setCurrentPage('vegetables')}
                >
                  Shop Vegetables
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/6608618/pexels-photo-6608618.jpeg" 
                  alt="Fresh produce" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
                <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="text-green-500 font-semibold">100% Organic</p>
                  <p className="text-gray-600 text-sm">From selected farms</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'Farm Fresh', desc: 'Sourced directly from local farms and dairies' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Same-day delivery for orders placed before 2pm' },
              { icon: Award, title: 'Premium Quality', desc: 'Only the highest quality products make it to your table' },
              { icon: Clock, title: 'Always Fresh', desc: 'Maximum freshness guaranteed or your money back' }
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-lg flex items-start"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <feature.icon className="text-green-500 mr-4" size={28} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular dairy and vegetable products, selected for their exceptional quality and taste.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
          
          <div className="text-center mt-12">
            <Button onClick={() => setCurrentPage('featured')}>
              View All Featured
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600/90 backdrop-blur-sm text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Subscription Program</h2>
            <p className="text-green-100 max-w-2xl mx-auto mb-8">
              Get regular deliveries of your favorite dairy and vegetable products. Save time and never run out of fresh food!
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100"
              onClick={() => {}}
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

Home.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  setSelectedProduct: PropTypes.func.isRequired
};

export default Home;