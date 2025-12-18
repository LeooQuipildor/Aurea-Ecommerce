const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerData: {
      nombre: { type: String, required: true },
      apellido: { type: String, required: true },
      whatsapp: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
      direccion: { type: String, required: true },
      referencia: { type: String, required: true },
      departamento: { type: String, required: true },
      ciudad: { type: String, required: true },
    },
    cart: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
        category: { type: String },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "transfer", "other"],
      default: "cash_on_delivery",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

// Índices para búsquedas rápidas
orderSchema.index({ orderId: 1 });
orderSchema.index({ "customerData.email": 1 });
orderSchema.index({ "customerData.whatsapp": 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);