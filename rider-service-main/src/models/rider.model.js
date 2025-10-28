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
    rider_id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    paymentInstruments: [paymentInstrumentSchema],
    accountSettings: accountSettingsSchema
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("Rider", riderSchema);
