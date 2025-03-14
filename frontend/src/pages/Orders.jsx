import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('https://marketplace-app-fj91.onrender.com/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      padding: window.innerWidth > 2560 ? '30px 40px' :
              window.innerWidth > 1440 ? '25px 30px' :
              window.innerWidth > 768 ? '20px 25px' : '15px',
      backgroundColor: '#f8f9fa',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontSize: window.innerWidth > 1440 ? '36px' :
                 window.innerWidth > 768 ? '32px' : '24px',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: window.innerWidth > 768 ? '25px' : '20px'
      }}>Order History</h2>

      {isLoading ? (
        <div style={{ 
          padding: window.innerWidth > 768 ? '40px 0' : '30px 0', 
          textAlign: 'center', 
          width: '100%',
          fontSize: window.innerWidth > 768 ? '16px' : '14px'
        }}>Loading orders...</div>
      ) : error ? (
        <div style={{ 
          padding: window.innerWidth > 768 ? '40px 0' : '30px 0', 
          textAlign: 'center', 
          width: '100%', 
          color: 'red',
          fontSize: window.innerWidth > 768 ? '16px' : '14px'
        }}>{error}</div>
      ) : orders.length === 0 ? (
        <div style={{ 
          padding: window.innerWidth > 768 ? '40px 0' : '30px 0', 
          textAlign: 'center', 
          width: '100%',
          fontSize: window.innerWidth > 768 ? '16px' : '14px'
        }}>No orders found</div>
      ) : (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ 
                  padding: window.innerWidth > 1440 ? '20px 25px' :
                           window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                  textAlign: 'left', 
                  borderBottom: '2px solid #e0e0e0',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: window.innerWidth > 768 ? '16px' : '14px',
                  whiteSpace: 'nowrap'
                }}>Order ID</th>
                <th style={{ 
                  padding: window.innerWidth > 1440 ? '20px 25px' :
                           window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                  textAlign: 'left', 
                  borderBottom: '2px solid #e0e0e0',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: window.innerWidth > 768 ? '16px' : '14px'
                }}>Product</th>
                <th style={{ 
                  padding: window.innerWidth > 1440 ? '20px 25px' :
                           window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                  textAlign: 'left', 
                  borderBottom: '2px solid #e0e0e0',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: window.innerWidth > 768 ? '16px' : '14px'
                }}>Buyer Details</th>
                <th style={{ 
                  padding: window.innerWidth > 1440 ? '20px 25px' :
                           window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                  textAlign: 'center', 
                  borderBottom: '2px solid #e0e0e0',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: window.innerWidth > 768 ? '16px' : '14px',
                  whiteSpace: 'nowrap'
                }}>Quantity</th>
                <th style={{ 
                  padding: window.innerWidth > 1440 ? '20px 25px' :
                           window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                  textAlign: 'left', 
                  borderBottom: '2px solid #e0e0e0',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: window.innerWidth > 768 ? '16px' : '14px',
                  whiteSpace: 'nowrap'
                }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ 
                  transition: 'background-color 0.2s ease',
                  ':hover': { backgroundColor: '#f8f9fa' }
                }}>
                  <td style={{ 
                    padding: window.innerWidth > 1440 ? '20px 25px' :
                             window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                    borderBottom: '1px solid #e0e0e0',
                    color: '#2c3e50',
                    fontSize: window.innerWidth > 768 ? '16px' : '14px',
                    whiteSpace: 'nowrap'
                  }}>{order.orderId}</td>
                  <td style={{ 
                    padding: window.innerWidth > 1440 ? '20px 25px' :
                             window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                    borderBottom: '1px solid #e0e0e0',
                    color: '#2c3e50',
                    fontSize: window.innerWidth > 768 ? '16px' : '14px',
                    fontWeight: '500'
                  }}>{order.product?.name || 'N/A'}</td>
                  <td style={{ 
                    padding: window.innerWidth > 1440 ? '20px 25px' :
                             window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                    borderBottom: '1px solid #e0e0e0',
                    color: '#2c3e50',
                    fontSize: window.innerWidth > 768 ? '16px' : '14px'
                  }}>{order.buyerDetails || 'N/A'}</td>
                  <td style={{ 
                    padding: window.innerWidth > 1440 ? '20px 25px' :
                             window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                    borderBottom: '1px solid #e0e0e0',
                    color: '#2c3e50',
                    fontSize: window.innerWidth > 768 ? '16px' : '14px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}>{order.quantity}</td>
                  <td style={{ 
                    padding: window.innerWidth > 1440 ? '20px 25px' :
                             window.innerWidth > 768 ? '15px 20px' : '12px 15px',
                    borderBottom: '1px solid #e0e0e0',
                    color: order.status === 'Pending' ? '#f39c12' : 
                           order.status === 'Shipped' ? '#3498db' : 
                           order.status === 'Delivered' ? '#2ecc71' : '#2c3e50',
                    fontWeight: '600',
                    fontSize: window.innerWidth > 768 ? '16px' : '14px',
                    whiteSpace: 'nowrap'
                  }}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders; 