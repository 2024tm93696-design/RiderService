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
  updateAccountSettings,
  requestTrip,
  cancelTrip
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
  .route("/:id/payment-instrument")
  .get(getPaymentInstruments)
  .post(addPaymentInstrument);

router
  .route("/:id/payment-instrument/:pid")
  .put(updatePaymentInstrument)
  .delete(deletePaymentInstrument);

// Account Settings
router
  .route("/:id/settings")
  .get(getAccountSettings)
  .patch(updateAccountSettings);

// Rider Trip Request Endpoint
router.post("/request-trip", requestTrip);
// Cancel Trip route
router.get("/cancel-trip/:rider_id", cancelTrip);


module.exports = router;
