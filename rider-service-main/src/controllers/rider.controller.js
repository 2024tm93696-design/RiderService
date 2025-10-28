const riderService = require("../service/rider.service");

// ~~~~~~~~~~~~~~~~~~~~~~~~~
// RIDER PROFILE CONTROLLERS
// ~~~~~~~~~~~~~~~~~~~~~~~~~

exports.createRider = async (req, res, next) => {
  try {
    const rider = await riderService.createRider(req.body);
    res.status(201).json(rider);
  } catch (err) {
    next(err);
  }
};

exports.getAllRiders = async (req, res, next) => {
  try {
    const riders = await riderService.getAllRiders();
    res.json(riders);
  } catch (err) {
    next(err);
  }
};

exports.getRiderById = async (req, res, next) => {
  try {
    const rider = await riderService.getRiderById(req.params.id);
    if (!rider) return res.status(404).json({ message: "Rider not found" });
    res.json(rider);
  } catch (err) {
    next(err);
  }
};

exports.updateRider = async (req, res, next) => {
  try {
    const rider = await riderService.updateRider(req.params.id, req.body);
    if (!rider) return res.status(404).json({ message: "Rider not found" });
    res.json(rider);
  } catch (err) {
    next(err);
  }
};

exports.deleteRider = async (req, res, next) => {
  try {
    const rider = await riderService.deleteRider(req.params.id);
    if (!rider) return res.status(404).json({ message: "Rider not found" });
    res.json({ message: "Rider deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PAYMENT INSTRUMENT CONTROLLERS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.addPaymentInstrument = async (req, res, next) => {
  try {
    const rider = await riderService.addPaymentInstrument(req.params.id, req.body);
    if (!rider) return res.status(404).json({ message: "Rider not found" });
    res.status(201).json({ message: "Payment method added", rider });
  } catch (err) {
    next(err);
  }
};

exports.getPaymentInstruments = async (req, res, next) => {
  try {
    const instruments = await riderService.getPaymentInstruments(req.params.id);
    if (!instruments) return res.status(404).json({ message: "Rider not found" });
    res.json(instruments);
  } catch (err) {
    next(err);
  }
};

exports.updatePaymentInstrument = async (req, res, next) => {
  try {
    const result = await riderService.updatePaymentInstrument(
      req.params.id,
      req.params.pid,
      req.body
    );

    if (result === null) return res.status(404).json({ message: "Rider not found" });
    if (result === "not_found")
      return res.status(404).json({ message: "Payment instrument not found" });

    res.json({ message: "Payment instrument updated", result });
  } catch (err) {
    next(err);
  }
};

exports.deletePaymentInstrument = async (req, res, next) => {
  try {
    const result = await riderService.deletePaymentInstrument(
      req.params.id,
      req.params.pid
    );

    if (result === null) return res.status(404).json({ message: "Rider not found" });
    if (result === "not_found")
      return res.status(404).json({ message: "Payment instrument not found" });

    res.json({ message: "Payment instrument deleted" });
  } catch (err) {
    next(err);
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ACCOUNT SETTINGS CONTROLLERS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.getAccountSettings = async (req, res, next) => {
  try {
    const settings = await riderService.getAccountSettings(req.params.id);
    if (!settings) return res.status(404).json({ message: "Rider not found" });
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

exports.updateAccountSettings = async (req, res, next) => {
  try {
    const settings = await riderService.updateAccountSettings(req.params.id, req.body);
    if (!settings) return res.status(404).json({ message: "Rider not found" });
    res.json({ message: "Account settings updated", settings });
  } catch (err) {
    next(err);
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Request and cancel Trip
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.requestTrip = async (req, res, next) => {
  try {
   //logic for calling trips api
  } catch (err) {
    next(err);
  }
};

exports.cancelTrip = async (req, res, next) => {
  try {
   //logic for calling trips api for cancelling trip
  } catch (err) {
    next(err);
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Get Riders Payments
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.getMyPayments = async (req, res, next) => {
  try {
   //logic for calling payments api to get all payments of a rider
  } catch (err) {
    next(err);
  }
};