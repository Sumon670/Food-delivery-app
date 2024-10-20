const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');  // Assuming you have a model for Order

router.post('/orderData', async (req, res) => {
    const { order_data, email, order_date } = req.body;

    // Validate if order_data and email exist
    if (!order_data || !email) {
        return res.status(400).json({ error: "Order data and email are required" });
    }

    try {
        // Add order date to the beginning of the order_data array
        if (Array.isArray(order_data)) {
            order_data.splice(0, 0, { Order_date: order_date });
        } else {
            return res.status(400).json({ error: "Order data must be an array" });
        }

        // Check if the email already exists in the Orders collection
        let existingOrder = await Order.findOne({ email: email });

        if (!existingOrder) {
            // If the user doesn't have any previous orders, create a new order document
            await Order.create({
                email: email,
                order_data: [order_data]  // Wrap in array because we push order data later
            });
            return res.status(200).json({ success: true, message: "Order created successfully" });
        } else {
            // If user already has orders, update the existing document by pushing new data
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: order_data } }
            );
            return res.status(200).json({ success: true, message: "Order updated successfully" });
        }
    } catch (error) {
        console.error("Server Error:", error.message);
        return res.status(500).json({ error: "Server Error", message: error.message });
    }
});

router.post('/myorderData', async(req,res)=>{
    try{
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})

    }catch(error){
        res.send("Server Error:", error.message);
    }
})
module.exports = router;
