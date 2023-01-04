const express = require("express");
const router = express();

const loginController = require("../controllers/login.controller");

router.get("/", loginController.get);
router.get("/:id", loginController.getDetail);
router.post("/", loginController.add);
router.put("/:id", loginController.updateByPut);
router.patch("/:id", loginController.updateByPatch);
router.delete("/:id", loginController.remove);

module.exports = router;
