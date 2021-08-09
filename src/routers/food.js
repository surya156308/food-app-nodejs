const express = require("express");
const Food = require("../models/food");
const router = new express.Router();

router.get("/food", async (req, res) => {
  try {
    const food = await Food.find({});
    res.send(food);
  } catch (error) {
    res.status(400).send(e);
  }
});
// router.get("/food", (req, res) => {
//   res.send("Food order is successfull");
// });

router.post("/food", async (req, res) => {
  const food = new Food(req.body);
  try {
    await food.save();

    res.send({ food });
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports = router;
