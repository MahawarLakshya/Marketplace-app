const base = require("../models/airtableConfig");

// Fetch all orders
const getOrders = async (req, res) => {
  try {
    const records = await base("Orders").select({
      sort: [{ field: "Order_Id", direction: "asc" }]
    }).all();
    
    const orders = await Promise.all(records.map(async record => {
      let productData = {};
      
      // Check if Product_Id exists and is not empty
      if (record.fields.Product_Id && record.fields.Product_Id.length > 0) {
        const productId = record.fields.Product_Id[0];
        try {
          const productRecord = await base("Products").find(productId);
          productData = {
            _id: productRecord.id,
            name: productRecord.fields.Name || '',
            description: productRecord.fields.Description || '',
            price: productRecord.fields.Price || 0,
            imageUrl: productRecord.fields.Image || ''
          };
        } catch (err) {
          console.error(`Error fetching product with ID ${productId}:`, err);
        }
      }
      
      return {
        _id: record.id,
        orderId: record.fields.Order_Id,
        product: productData,
        buyerDetails: record.fields.Buyer_Details || '',
        quantity: record.fields.Quantity || 1,
        status: record.fields.Status || 'Pending',
        transactions: record.fields.Transactions || []
      };
    }));

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Place an order
const placeOrder = async (req, res) => {
  try {
    const { productId, quantity, buyerDetails } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    
    // Verify the product exists
    try {
      await base("Products").find(productId);
    } catch (error) {
      return res.status(404).json({ message: "Product not found", error: error.message });
    }
    
    // Create the new order - don't try to set Order_Id since it's computed
    const newOrder = await base("Orders").create([
      {
        fields: {
          Product_Id: [productId], // This must be an array with the product ID
          Buyer_Details: buyerDetails || '',
          Quantity: parseInt(quantity) || 1,
          Status: 'Pending'
        }
      }
    ]);

    // Fetch the created order
    const orderRecord = await base("Orders").find(newOrder[0].id);
    
    // Fetch the product details
    const productRecord = await base("Products").find(productId);
    const productData = {
      _id: productRecord.id,
      name: productRecord.fields.Name || '',
      description: productRecord.fields.Description || '',
      price: productRecord.fields.Price || 0,
      imageUrl: productRecord.fields.Image || ''
    };

    res.status(201).json({
      message: "Order placed successfully",
      _id: orderRecord.id,
      orderId: orderRecord.fields.Order_Id,
      product: productData,
      buyerDetails: orderRecord.fields.Buyer_Details || '',
      quantity: orderRecord.fields.Quantity || 1,
      status: orderRecord.fields.Status || 'Pending',
      transactions: orderRecord.fields.Transactions || []
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({
      message: "Failed to place order",
      error: error.message
    });
  }
};

module.exports = { placeOrder, getOrders };