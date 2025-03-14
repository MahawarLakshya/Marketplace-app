import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://marketplace-app-fj91.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrder = async (product) => {
    try {
      const buyerDetails = prompt('Please enter your location:');
      if (!buyerDetails) return;
      
      setIsLoading(true);
      
      // Log the product details for debugging
      console.log('Placing order for product:', product);
      
      await axios.post('https://marketplace-app-fj91.onrender.com/api/orders', {
        productId: product._id, // Use the Airtable record ID
        quantity: 1,
        buyerDetails
      });
      
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert(`Failed to place order: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      padding: window.innerWidth > 2560 ? '30px 20px' :
              window.innerWidth > 1440 ? '25px 15px' :
              window.innerWidth > 768 ? '20px 12px' : '15px 10px',
      backgroundColor: '#f8f9fa',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        width: '100%',
        margin: '0 0 25px 0',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '800px',
            padding: window.innerWidth > 768 ? '15px 20px' : '12px 15px',
            fontSize: window.innerWidth > 768 ? '16px' : '14px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {isLoading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', width: '100%' }}>Loading products...</div>
      ) : error ? (
        <div style={{ padding: '40px 0', textAlign: 'center', width: '100%', color: 'red' }}>{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center', width: '100%' }}>No products found</div>
      ) : (
        <div style={{
          width: '100%',
          maxWidth: '2400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 2560 ? 'repeat(7, 1fr)' :
                              window.innerWidth > 1920 ? 'repeat(6, 1fr)' :
                              window.innerWidth > 1440 ? 'repeat(5, 1fr)' :
                              window.innerWidth > 1024 ? 'repeat(4, 1fr)' :
                              window.innerWidth > 768 ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)',
          gap: '15px',
          padding: '0',
          boxSizing: 'border-box'
        }}>
          {filteredProducts.map((product) => (
            <div key={product._id} style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              height: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ 
                marginBottom: '8px', 
                color: '#666',
                fontSize: '14px'
              }}>
                
              </div>
              <div style={{ 
                height: '220px',
                overflow: 'hidden',
                marginBottom: '12px',
                borderRadius: '8px'
              }}>
                <img
                  src={product.imageUrl }
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                color: '#2c3e50', 
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>{product.name}</h3>
              <p style={{ 
                color: '#666', 
                marginBottom: '12px', 
                lineHeight: '1.4',
                fontSize: '14px',
                flex: '1'
              }}>{product.description}</p>
              <div style={{ marginTop: 'auto' }}>
                <p style={{ 
                  fontSize: '22px',
                  fontWeight: 'bold', 
                  marginBottom: '12px', 
                  color: '#2c3e50' 
                }}>
                  ${product.price}
                </p>
                <button
                  onClick={() => handleOrder(product)}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    opacity: isLoading ? 0.7 : 1,
                    ':hover': {
                      backgroundColor: '#2980b9'
                    }
                  }}
                >
                  {isLoading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 