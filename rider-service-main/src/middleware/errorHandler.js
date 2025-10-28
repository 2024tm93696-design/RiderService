module.exports = (err, req, res, next) => {
  console.error("Some Error Occured:", err.message);
  res.status(500).json({ error: err.message });
};
