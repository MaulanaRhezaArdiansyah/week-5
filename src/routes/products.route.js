const express = require("express");
const router = express();

const productController = require("../controllers/products.controller");

router.get("/", productController.get);
router.get("/:id", productController.getDetail);
router.post("/", productController.add);
router.put("/:id", productController.updateByPut);
router.patch("/:id", productController.updateByPatch);
router.delete("/:id", productController.remove);

module.exports = router;
