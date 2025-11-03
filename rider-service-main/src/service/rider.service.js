const Rider = require("../models/rider.model");
const dotenv = require("dotenv");
dotenv.config();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// RIDER PROFILE LOGIC
// ~~~~~~~~~~~~~~~~~~~~~~~~~~
exports.createRider = async (data) => {
  const { rider_id, createdAt, ...safeData } = data;

  const lastRider = await Rider.findOne().sort({ rider_id: -1 }).limit(1);

  // Convert lastRider.rider_id to number before adding 1
  const newRiderId = lastRider ? String(Number(lastRider.rider_id) + 1) : "1";

  return await Rider.create({
    ...safeData,
    rider_id: newRiderId,       // keep as string in DB
    createdAt: new Date(),
  });
};

exports.getAllRiders = async () => {
  return await Rider.find();
};

exports.getRiderById = async (id) => {
  return await Rider.findOne({rider_id:id});
};

exports.updateRider = async (id, data) => {
  return await Rider.findOneAndUpdate({rider_id:id}, data, { new: true });
};

exports.deleteRider = async (id) => {
  return await Rider.findOneAndDelete({rider_id:id});
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// PAYMENT INSTRUMENTS LOGIC
// ~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.addPaymentInstrument = async (id, instrumentData) => {
  const rider = await Rider.findOne({rider_id:id});
  if (!rider) return null;

  rider.paymentInstruments.push(instrumentData);
  await rider.save();
  return rider;
};

exports.getPaymentInstruments = async (id) => {
  const rider = await Rider.findOne({rider_id:id});
  return rider ? rider.paymentInstruments : null;
};

exports.updatePaymentInstrument = async (id, paymentId, updateData) => {
  const rider = await Rider.findOne({rider_id:id});
  if (!rider) return null;

  const instrument = rider.paymentInstruments.id(paymentId);
  if (!instrument) return "not_found";

  Object.assign(instrument, updateData);
  await rider.save();
  return instrument;
};

exports.deletePaymentInstrument = async (id, paymentId) => {
  const rider = await Rider.findOne({rider_id:id});
  if (!rider) return null;

  const instrument = rider.paymentInstruments.id(paymentId);
  if (!instrument) return "not_found";

  instrument.deleteOne();
  await rider.save();
  return true;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ACCOUNT SETTINGS LOGIC
// ~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.getAccountSettings = async (id) => {
  const rider = await Rider.findOne({rider_id:id});
  return rider ? rider.accountSettings : null;
};

exports.updateAccountSettings = async (id, updateData) => {
    const rider = await Rider.findOne({ rider_id: id });
    if (!rider) return null;

    // Merge only provided fields into accountSettings
    Object.assign(rider.accountSettings, updateData);

    await rider.save();
    return rider.accountSettings;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Request and cancel Trip
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const axios = require("axios");

/**
 * Request a trip for a rider by calling the Trip Service API.
 */
exports.requestTrip = async (req, res, next) => {
  try {
    const { rider_id, pickup, drop } = req.body;

    // Input validation
    if (!rider_id || !pickup || !drop) {
      return res.status(400).json({ message: "rider_id, pickup, and drop are required" });
    }

    // Prepare request payload
    const tripRequestData = {
      rider_id,
      pickup,
      drop
    };

    // Trip Service base URL
    // Call Trip Service via Axios
    const tripResponse = await axios.post(process.env.TRIP_SERVICE_URL, tripRequestData, {
      headers: { "Content-Type": "application/json" }
    });

    // If Trip Service responds successfully
    res.status(201).json({
      message: "Trip request sent successfully",
      trip: tripResponse.data
    });
  } catch (error) {
    console.error("Error requesting trip:", error.message);

    if (error.response) {
      // The Trip Service responded with an error (like 400 or 500)
      return res.status(error.response.status).json({
        message: "Trip Service Error",
        error: error.response.data
      });
    }

    // Other errors (network, timeout, etc.)
    res.status(500).json({
      message: "Failed to request trip",
      error: error.message
    });
  }
};


exports.cancelTrip = async (req, res, next) => {
   //logic for calling trips api for cancelling trip
};
