const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("It's the users!");
});

module.exports = router;
