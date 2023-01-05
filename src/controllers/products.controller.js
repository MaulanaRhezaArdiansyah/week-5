const formResponse = require("../helpers/form-response");
const productModel = require("../models/products.model");

const productController = {
  get: (req, res) => {
    return productModel
      .get(req.query)
      .then((result) => {
        // console.log(result.data);
        if (result.data != undefined) {
          return formResponse(
            200,
            result,
            "Get all data products success",
            res
          );
        } else {
          return formResponse(400, result, "Data products not found", res);
        }
      })
      .catch((error, result) => {
        return formResponse(500, { result }, error, res);
      });
  },

  getDetail: (req, res) => {
    const id = req.params.id;
    return productModel
      .getDetail(id)
      .then((result) => {
        if (result != undefined) {
          // if (result != null) {
          return formResponse(
            200,
            result,
            "Get data product by id success",
            res
          );
        } else {
          return formResponse(400, { result }, "Products id not found", res);
        }
      })
      .catch((error, result) => {
        return formResponse(500, { result }, error, res);
      });
  },

  add: (req, res) => {
    return productModel
      .add(req.body)
      .then((result) => {
        if (result.body != undefined) {
          return formResponse(201, result, "Adding data products success", res);
        } else {
          return formResponse(
            400,
            result,
            "Form add product cannot be empty",
            res
          );
        }
      })
      .catch((error, result) => {
        return formResponse(500, result, error, res);
      });
  },

  updateByPut: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return productModel
      .updateByPut(request)
      .then((result) => {
        return formResponse(
          200,
          result,
          "Updating data products by put successfull",
          res
        );
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
        // return formResponse(500, result, error, res);
      });
  },

  updateByPatch: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return productModel
      .updateByPatch(request)
      .then((result) => {
        // console.log(result.id);
        if (result != null) {
          return formResponse(
            200,
            result,
            "Updating data product by id success",
            res
          );
        } else {
          return formResponse(400, { result }, "Products id not found", res);
        }
      })
      .catch((error, result) => {
        return formResponse(500, { result }, error, res);
        // return res.status(500).send({ message: error });
      });
  },

  remove: (req, res) => {
    const id = req.params.id;
    return productModel
      .remove(id)
      .then(() => {
        formResponse(200, {}, `Deleting data products ${id}  success`, res);
      })
      .catch((error) => {
        formResponse(500, {}, error, res);
      });
  },
};

module.exports = productController;
