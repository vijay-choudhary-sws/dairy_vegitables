import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProductId} />;
      case 'dairy':
        return <ProductListing category="dairy" setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProductId} />;
      case 'vegetables':
        return <ProductListing category="vegetable" setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProductId} />;
      case 'featured':
        return <ProductListing category="featured" setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProductId} />;
      case 'product-detail':
        return <ProductDetail productId={selectedProductId} setCurrentPage={setCurrentPage} />;
      case 'cart':
        return <Cart setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProductId} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;