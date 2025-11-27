const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
  },
  items: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // pending, paid, shipped
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);