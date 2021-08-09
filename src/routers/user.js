const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
// router.get("/user", async (req, res) => {
//   try {
//     const user = await User.find({});
//     res.send(user);
//   } catch (error) {
//     res.status(401).send(e);
//   }
// });
router.get("/user", (req, res) => {
  res.send("Hello");
});
router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthTokens();
    console.log(token);

    res.send({ user, token });
  } catch (e) {
    res.status(401).send(e);
  }
});

// router.get("/user", (req, res) => {
//   res.send("user is created successfully");
// });

router.get("/user/me", auth, (req, res) => {
  res.status(200).send(req.user);
});
module.exports = router;

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthTokens();
    res.send({ user, token });
  } catch (error) {
    res.status(401).send(error);
  }
});
