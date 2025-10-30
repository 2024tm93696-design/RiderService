const Rider = require("../models/rider.model");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// RIDER PROFILE LOGIC
// ~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.createRider = async (data) => {
  const { rider_id, createdAt, ...safeData } = data;

  const lastRider = await Rider.findOne().sort({ rider_id: -1 }).limit(1);
  const newRiderId = lastRider ? lastRider.rider_id + 1 : 1;

  return await Rider.create({
    ...safeData,
    rider_id: newRiderId,
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

exports.requestTrip = async (req, res, next) => {
  
   //logic for calling trips api
};

exports.cancelTrip = async (req, res, next) => {
   //logic for calling trips api for cancelling trip
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Get Riders Payments
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.getMyPayments = async (req, res, next) => {
   //logic for calling payments api to get all payments of a rider
};
