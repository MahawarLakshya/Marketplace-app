const base = require("../models/airtableConfig");

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const records = await base("Products").select().all();
    const products = records.map(record => ({
      _id: record.id,
      productId: record.fields.Product_Id,
      name: record.fields.Name || '',
      description: record.fields.Description || '',
      price: record.fields.Price || 0,
      imageUrl: record.fields.Image || ''
    }));
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

// Add a product
const addProduct = async (req, res) => {
  try {
    console.log("Received product data:", req.body);
    const { name, description, price, imageUrl } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }
    
    // Create the product with proper field names matching Airtable
    const createdProduct = await base("Products").create([
      {
        fields: {
          Name: name,
          Description: description || '',
          Price: parseFloat(price) || 0,
          Image: imageUrl || ''
        }
      }
    ]);
    
    console.log("Product created successfully:", createdProduct);
    
    res.status(201).json({
      message: "Product created successfully",
      _id: createdProduct[0].id,
      productId: createdProduct[0].fields.Product_Id,
      name: createdProduct[0].fields.Name,
      description: createdProduct[0].fields.Description || '',
      price: createdProduct[0].fields.Price || 0,
      imageUrl: createdProduct[0].fields.Image || ''
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;

    const updatedProduct = await base("Products").update([
      {
        id,
        fields: {
          Name: name || '',
          Description: description || '',
          Price: parseFloat(price) || 0,
          Image: imageUrl || ''
        }
      }
    ]);

    res.status(200).json({
      message: "Product updated successfully",
      _id: updatedProduct[0].id,
      productId: updatedProduct[0].fields.Product_Id,
      name: updatedProduct[0].fields.Name,
      description: updatedProduct[0].fields.Description,
      price: updatedProduct[0].fields.Price,
      imageUrl: updatedProduct[0].fields.Image
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await base("Products").destroy(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

module.exports = { getProducts, addProduct, deleteProduct, updateProduct };