import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.price) {
      setError('Price is required');
      return false;
    }
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      setError('Price must be a positive number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Log the data being sent
      console.log('Sending product data:', formData);
      
      const response = await axios.post('https://marketplace-app-fj91.onrender.com/api/products', formData);
      console.log('Response:', response.data);
      
      alert('Product added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
      
      // Set a more specific error message
      if (error.response) {
        setError(error.response.data.message || 'Failed to add product. Server error.');
      } else if (error.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Failed to add product. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      padding: window.innerWidth > 2560 ? '30px 200px' :
               window.innerWidth > 1440 ? '25px 150px' :
               window.innerWidth > 768 ? '20px 100px' : '15px 50px',
      backgroundColor: '#f8f9fa',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '100%',
        backgroundColor: '#ffffff',
        padding: window.innerWidth > 1440 ? '30px 40px' :
                window.innerWidth > 768 ? '25px 30px' : '20px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '30px',
          fontSize: window.innerWidth > 1440 ? '28px' :
                   window.innerWidth > 768 ? '24px' : '22px',
          fontWeight: '600',
          textAlign: 'center'
        }}>Add New Product</h2>
        
        {error && (
          <div style={{
            backgroundColor: '#fff2f0',
            color: '#dc3545',
            padding: '12px 20px',
            borderRadius: '6px',
            marginBottom: '24px',
            fontSize: '14px',
            textAlign: 'center',
            border: '1px solid #ffccc7'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '20px',
          width: '100%'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            gap: '20px'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: '#2c3e50', 
                fontWeight: '500',
                fontSize: '14px'
              }}>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete='off'
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  transition: 'border-color 0.2s ease',
                  outline: 'none',
                  color: 'black', 
                  backgroundColor: 'white',
                 
                }}
                
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: '#2c3e50', 
                fontWeight: '500',
                fontSize: '14px'
              }}>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                autoComplete='off'
                                step="0.01"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  transition: 'border-color 0.2s ease',
                  outline: 'none',
                  color: 'black', 
                  backgroundColor: 'white'
                }}
                placeholder="Enter price"
              />
            </div>
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#2c3e50', 
              fontWeight: '500',
              fontSize: '14px'
            }}>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              autoComplete='off'
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                transition: 'border-color 0.2s ease',
                outline: 'none',
                color: 'black', 
                backgroundColor: 'white',
              }}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#2c3e50', 
              fontWeight: '500',
              fontSize: '14px'
            }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              autoComplete='off'
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '14px',
                transition: 'border-color 0.2s ease',
                outline: 'none',
                color:'black',
                backgroundColor:'white',
                resize: 'vertical',
                minHeight: '100px',
                lineHeight: '1.5'
              }}
              placeholder="Enter product description"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease',
              opacity: isSubmitting ? 0.7 : 1,
              marginTop: '10px'
            }}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm; 