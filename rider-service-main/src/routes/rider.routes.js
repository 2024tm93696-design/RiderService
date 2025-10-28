const express = require("express");
const router = express.Router();
const {
  createRider,
  getAllRiders,
  getRiderById,
  updateRider,
  deleteRider,
  addPaymentInstrument,
  getPaymentInstruments,
  updatePaymentInstrument,
  deletePaymentInstrument,
  getAccountSettings,
  updateAccountSettings
} = require("../controllers/rider.controller");

// Rider CRUD
router.route("/")
    .post(createRider)
    .get(getAllRiders);

router.route("/:id")
    .get(getRiderById)
    .put(updateRider)
    .delete(deleteRider);

// Payment Instruments
router
  .route("/:id/payments")
  .get(getPaymentInstruments)
  .post(addPaymentInstrument);

router
  .route("/:id/payments/:pid")
  .put(updatePaymentInstrument)
  .delete(deletePaymentInstrument);

// Account Settings
router
  .route("/:id/settings")
  .get(getAccountSettings)
  .put(updateAccountSettings);

module.exports = router;
