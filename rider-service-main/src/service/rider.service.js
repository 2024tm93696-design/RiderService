const Rider = require("../models/rider.model");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// RIDER PROFILE LOGIC
// ~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.createRider = async (data) => {
  return await Rider.create(data);
};

exports.getAllRiders = async () => {
  return await Rider.find();
};

exports.getRiderById = async (id) => {
  return await Rider.findById(id);
};

exports.updateRider = async (id, data) => {
  return await Rider.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteRider = async (id) => {
  return await Rider.findByIdAndDelete(id);
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// PAYMENT INSTRUMENTS LOGIC
// ~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.addPaymentInstrument = async (riderId, instrumentData) => {
  const rider = await Rider.findById(riderId);
  if (!rider) return null;

  rider.paymentInstruments.push(instrumentData);
  await rider.save();
  return rider;
};

exports.getPaymentInstruments = async (riderId) => {
  const rider = await Rider.findById(riderId);
  return rider ? rider.paymentInstruments : null;
};

exports.updatePaymentInstrument = async (riderId, paymentId, updateData) => {
  const rider = await Rider.findById(riderId);
  if (!rider) return null;

  const instrument = rider.paymentInstruments.id(paymentId);
  if (!instrument) return "not_found";

  Object.assign(instrument, updateData);
  await rider.save();
  return instrument;
};

exports.deletePaymentInstrument = async (riderId, paymentId) => {
  const rider = await Rider.findById(riderId);
  if (!rider) return null;

  const instrument = rider.paymentInstruments.id(paymentId);
  if (!instrument) return "not_found";

  instrument.remove();
  await rider.save();
  return true;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ACCOUNT SETTINGS LOGIC
// ~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.getAccountSettings = async (riderId) => {
  const rider = await Rider.findById(riderId);
  return rider ? rider.accountSettings : null;
};

exports.updateAccountSettings = async (riderId, updateData) => {
  const rider = await Rider.findById(riderId);
  if (!rider) return null;

  rider.accountSettings = { ...rider.accountSettings, ...updateData };
  await rider.save();
  return rider.accountSettings;
};
