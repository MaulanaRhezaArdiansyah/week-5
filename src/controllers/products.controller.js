const formResponse = require("../helpers/form-response");
const productModel = require("../models/products.model");

const productController = {
  get: (req, res) => {
    return productModel
      .get(req.query)
      .then((result) => {
        return formResponse(200, result, "Get all data products success", res);
      })
      .catch((error, result) => {
        // ini belum berjalan
        return formResponse(500, result, "Data invalid", res);
      });
  },

  getDetail: (req, res) => {
    const id = req.params.id;
    return productModel
      .getDetail(id)
      .then((result) => {
        // return res.status(200).send({ data: result });
        return formResponse(200, result, "Get data product by id success", res);
      })
      .catch((error, result) => {
        // ini belum berjalan
        return formResponse(500, result, error, res);
        // return res.status(500).send({ message: error });
      });
  },

  add: (req, res) => {
    return productModel
      .add(req.body)
      .then((result) => {
        // return res.status(201).send({ message: "Add data products success", data: result });
        return formResponse(201, result, "Adding data products success", res);
      })
      .catch((error) => {
        // ini belum berjalan
        // return formResponse(500, result, error, res);
        return res.status(500).send({ message: error });
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
        // return res.status(200).send({message: "Updating data products by patch success",data: result});
        return formResponse(
          200,
          result,
          "Updating data products by patch successfull",
          res
        );
      })
      .catch((error, result) => {
        return formResponse(500, result, error, res);
        // return res.status(500).send({ message: error });
      });
  },

  remove: (req, res) => {
    const id = req.params.id;
    return productModel
      .remove(id)
      .then(() => {
        // ini belum sempurna
        // return formResponse(
        //   200,
        //   result,
        //   `Deleting data products ${id} successfull`,
        //   res
        // );
        return res.status(200).send(`Deleting data products ${id}  success`);
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = productController;
