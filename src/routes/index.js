const express = require("express");
const router = express();
const productRoute = require("./products.route");
const loginRoute = require("./login.route");
const usersProfileRoute = require("./usersProfile.route");
const authRoute = require("./auth.route");

router.get("/", (req, res) => {
  res.send("backend for coffee shop");
});

router.use("/products", productRoute);
// productRoute adalah callback cmiiw
router.use("/login", loginRoute);
router.use("/users_profile", usersProfileRoute);
router.use("/auth", authRoute);

module.exports = router;
