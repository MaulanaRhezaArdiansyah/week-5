const express = require("express");
const router = express();

const authController = require("../controllers/auth.controller");

router.get("/", authController.get);
router.get("/:id", authController.getDetail);
router.post("/", authController.add);
router.patch("/:id", authController.updateByPatch);
router.delete("/:id", authController.remove);

module.exports = router;
