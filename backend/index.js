const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv")
dotenv.config()

// Import Routes
const productRoutes = require("./routes/productroutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();

app.use(express.json());
app.use(cors({origin:true}));


// Use Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
