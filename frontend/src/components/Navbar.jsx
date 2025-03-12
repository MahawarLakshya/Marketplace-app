import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      backgroundColor: '#ffffff', 
      padding: '0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '15px 20px',
        height: '70px'
      }}>
        <h1 style={{ 
          margin: 0, 
          color: '#2c3e50', 
          fontSize: '28px',
          fontWeight: '600'
        }}>Marketplace</h1>
        <div style={{
          display: 'flex',
          gap: '30px'
        }}>
          <Link to="/" style={{ 
            textDecoration: 'none', 
            color: '#2c3e50', 
            fontWeight: '500',
            fontSize: '16px',
            padding: '10px 0',
            borderBottom: '2px solid transparent',
            transition: 'border-color 0.3s ease'
          }}>Home</Link>
          <Link to="/add-product" style={{ 
            textDecoration: 'none', 
            color: '#2c3e50', 
            fontWeight: '500',
            fontSize: '16px',
            padding: '10px 0',
            borderBottom: '2px solid transparent',
            transition: 'border-color 0.3s ease'
          }}>Add Product</Link>
          <Link to="/orders" style={{ 
            textDecoration: 'none', 
            color: '#2c3e50', 
            fontWeight: '500',
            fontSize: '16px',
            padding: '10px 0',
            borderBottom: '2px solid transparent',
            transition: 'border-color 0.3s ease'
          }}>Orders</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 