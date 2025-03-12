import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductForm from './pages/ProductForm';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <div style={{ 
        backgroundColor: '#f5f7fa',
        minHeight: '100vh'
      }}>
        <Navbar />
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '30px 20px'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
