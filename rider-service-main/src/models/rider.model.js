const mongoose = require("mongoose");

const paymentInstrumentSchema = new mongoose.Schema({
  type: { type: String, enum: ["CARD", "WALLET", "UPI"], required: true },
  cardNumber: { type: String },
  expiry: { type: String },
  upiId: { type: String }
});

const accountSettingsSchema = new mongoose.Schema({
  language: { type: String, default: "en" },
  notificationPreference: {
    type: String,
    enum: ["email", "sms", "push"],
    default: "email"
  },
  darkMode: { type: Boolean, default: false }
});

const riderSchema = new mongoose.Schema(
  {
    rider_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    paymentInstruments: [paymentInstrumentSchema],
    accountSettings: accountSettingsSchema,
    created_at: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model("Rider", riderSchema);
