import React from 'react';
import { Leaf, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Leaf className="text-green-500 mr-2" size={24} />
              <h2 className="font-bold text-lg text-gray-800">Fresh Harvest</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Bringing farm-fresh dairy and vegetables directly to your doorstep. Quality products from sustainable sources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors text-sm">Dairy Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors text-sm">Fresh Vegetables</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors text-sm">Featured Items</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors text-sm">New Arrivals</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors text-sm">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button className="bg-green-500 text-white px-3 py-2 rounded-r-md hover:bg-green-600 transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Fresh Harvest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
