const riderService = require("../service/rider.service");
const winston = require("winston");

// 🧱 Setup Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~
// RIDER PROFILE CONTROLLERS
// ~~~~~~~~~~~~~~~~~~~~~~~~~

exports.createRider = async (req, res, next) => {
  try {
    logger.info({
      message: "Creating new rider",
      correlationId: req.correlationId,
      body: req.body,
    });

    const rider = await riderService.createRider(req.body);

    logger.info({
      message: "Rider created successfully",
      correlationId: req.correlationId,
      riderId: rider._id,
    });

    res.status(201).json(rider);
  } catch (err) {
    logger.error({
      message: "Error creating rider",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

exports.getAllRiders = async (req, res, next) => {
  try {
    logger.info({
      message: "Fetching all riders",
      correlationId: req.correlationId,
    });

    const riders = await riderService.getAllRiders();
    res.json(riders);
  } catch (err) {
    logger.error({
      message: "Error fetching riders",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

exports.getRiderById = async (req, res, next) => {
  try {
    logger.info({
      message: "Fetching rider by ID",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    const rider = await riderService.getRiderById(req.params.id);
    if (!rider) {
      logger.warn({
        message: "Rider not found",
        correlationId: req.correlationId,
        riderId: req.params.id,
      });
      return res.status(404).json({ message: "Rider not found" });
    }
    res.json(rider);
  } catch (err) {
    logger.error({
      message: "Error fetching rider by ID",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

exports.updateRider = async (req, res, next) => {
  try {
    logger.info({
      message: "Updating rider",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    const rider = await riderService.updateRider(req.params.id, req.body);
    if (!rider) {
      logger.warn({
        message: "Rider not found for update",
        correlationId: req.correlationId,
        riderId: req.params.id,
      });
      return res.status(404).json({ message: "Rider not found" });
    }

    logger.info({
      message: "Rider updated successfully",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });
    res.json(rider);
  } catch (err) {
    logger.error({
      message: "Error updating rider",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

exports.deleteRider = async (req, res, next) => {
  try {
    logger.info({
      message: "Deleting rider",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    const rider = await riderService.deleteRider(req.params.id);
    if (!rider) {
      logger.warn({
        message: "Rider not found for deletion",
        correlationId: req.correlationId,
        riderId: req.params.id,
      });
      return res.status(404).json({ message: "Rider not found" });
    }

    logger.info({
      message: "Rider deleted successfully",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    res.json({ message: "Rider deleted successfully" });
  } catch (err) {
    logger.error({
      message: "Error deleting rider",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PAYMENT INSTRUMENT CONTROLLERS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.addPaymentInstrument = async (req, res, next) => {
  try {
    logger.info({
      message: "Adding payment instrument",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    const rider = await riderService.addPaymentInstrument(req.params.id, req.body);
    if (!rider) {
      logger.warn({
        message: "Rider not found when adding payment instrument",
        correlationId: req.correlationId,
      });
      return res.status(404).json({ message: "Rider not found" });
    }

    logger.info({
      message: "Payment instrument added",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    res.status(201).json({ message: "Payment method added", rider });
  } catch (err) {
    logger.error({
      message: "Error adding payment instrument",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

exports.getPaymentInstruments = async (req, res, next) => {
  try {
    logger.info({
      message: "Fetching payment instruments",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    const instruments = await riderService.getPaymentInstruments(req.params.id);
    if (!instruments)
      return res.status(404).json({ message: "Rider not found" });

    res.json(instruments);
  } catch (err) {
    logger.error({
      message: "Error fetching payment instruments",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

exports.updatePaymentInstrument = async (req, res, next) => {
  try {
    logger.info({
      message: "Updating payment instrument",
      correlationId: req.correlationId,
      riderId: req.params.id,
      paymentId: req.params.pid,
    });

    const result = await riderService.updatePaymentInstrument(
      req.params.id,
      req.params.pid,
      req.body
    );

    if (result === null)
      return res.status(404).json({ message: "Rider not found" });
    if (result === "not_found")
      return res.status(404).json({ message: "Payment instrument not found" });

    logger.info({
      message: "Payment instrument updated",
      correlationId: req.correlationId,
      riderId: req.params.id,
      paymentId: req.params.pid,
    });

    res.json({ message: "Payment instrument updated", result });
  } catch (err) {
    logger.error({
      message: "Error updating payment instrument",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

exports.deletePaymentInstrument = async (req, res, next) => {
  try {
    logger.info({
      message: "Deleting payment instrument",
      correlationId: req.correlationId,
      riderId: req.params.id,
      paymentId: req.params.pid,
    });

    const result = await riderService.deletePaymentInstrument(
      req.params.id,
      req.params.pid
    );

    if (result === null)
      return res.status(404).json({ message: "Rider not found" });
    if (result === "not_found")
      return res.status(404).json({ message: "Payment instrument not found" });

    logger.info({
      message: "Payment instrument deleted",
      correlationId: req.correlationId,
      riderId: req.params.id,
      paymentId: req.params.pid,
    });

    res.json({ message: "Payment instrument deleted" });
  } catch (err) {
    logger.error({
      message: "Error deleting payment instrument",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ACCOUNT SETTINGS CONTROLLERS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.getAccountSettings = async (req, res, next) => {
  try {
    logger.info({
      message: "Fetching account settings",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    const settings = await riderService.getAccountSettings(req.params.id);
    if (!settings)
      return res.status(404).json({ message: "Rider not found" });

    res.json(settings);
  } catch (err) {
    logger.error({
      message: "Error fetching account settings",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

exports.updateAccountSettings = async (req, res, next) => {
  try {
    logger.info({
      message: "Updating account settings",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    const settings = await riderService.updateAccountSettings(req.params.id, req.body);
    if (!settings)
      return res.status(404).json({ message: "Rider not found" });

    logger.info({
      message: "Account settings updated successfully",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    res.json({ message: "Account settings updated", settings });
  } catch (err) {
    logger.error({
      message: "Error updating account settings",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Request and cancel Trip
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.requestTrip = async (req, res, next) => {
  try {
    logger.info({
      message: "Trip request initiated",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    // TODO: logic for calling trips API

    res.status(201).json({ message: "Trip requested successfully" });
  } catch (err) {
    logger.error({
      message: "Error requesting trip",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

exports.cancelTrip = async (req, res, next) => {
  try {
    logger.info({
      message: "Trip cancellation initiated",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    // TODO: logic for calling trips API for cancelling trip

    res.json({ message: "Trip cancelled successfully" });
  } catch (err) {
    logger.error({
      message: "Error cancelling trip",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Get Riders Payments
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.getMyPayments = async (req, res, next) => {
  try {
    logger.info({
      message: "Fetching rider payments",
      correlationId: req.correlationId,
      riderId: req.params.id,
    });

    // TODO: logic for calling payments API

    res.json({ message: "Payments retrieved successfully" });
  } catch (err) {
    logger.error({
      message: "Error fetching rider payments",
      correlationId: req.correlationId,
      error: err.message,
    });
    next(err);
  }
};
