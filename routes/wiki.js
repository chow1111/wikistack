const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const { db, Page, User } = require("../models/index");

router.get("/", (req, res, next) => {
  res.send("It's the GET wiki");
});

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      slug: req.body.title.replace(/\s+/g, "_").replace(/\W/g, ""),
      content: req.body.content,
      status: req.body.status,
    });

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.json(req.body);
  } catch (error) {
    console.log("We had an error! ", error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
