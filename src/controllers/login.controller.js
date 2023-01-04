const formResponse = require("../helpers/form-response");
const loginModel = require("../models/login.model");

const loginController = {
  get: (req, res) => {
    return loginModel
      .get()
      .then((result) => {
        return formResponse(200, result, "Get all data login success", res);
      })
      .catch((error) => {
        // ini belum berjalan
        // return formResponse(500, error, res);
        return res.status(500).send({ message: error });
      });
  },

  getDetail: (req, res) => {
    const id = req.params.id;
    return loginModel
      .getDetail(id)
      .then((result) => {
        // return res.status(200).send({ data: result });
        return formResponse(200, result, "Get data login by id success", res);
      })
      .catch((error) => {
        // ini belum berjalan
        // return formResponse(500, result, error, res);
        return res.status(500).send({ message: error });
      });
  },

  add: (req, res) => {
    return loginModel
      .add(req.body)
      .then((result) => {
        // return res.status(201).send({ message: "Add data products success", data: result });
        return formResponse(201, result, "Adding data login success", res);
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
    return loginModel
      .updateByPut(request)
      .then((result) => {
        return formResponse(
          200,
          result,
          "Updating data login by put successfull",
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
    return loginModel
      .updateByPatch(request)
      .then((result) => {
        // return res.status(200).send({message: "Updating data products by patch success",data: result});
        return formResponse(
          200,
          result,
          "Updating data login by patch successfull",
          res
        );
      })
      .catch((error) => {
        // return formResponse(500, result, error, res);
        return res.status(500).send({ message: error });
      });
  },

  remove: (req, res) => {
    const id = req.params.id;
    return loginModel
      .remove(id)
      .then(() => {
        // ini belum sempurna
        // return formResponse(
        //   200,
        //   result,
        //   `Deleting data products ${id} successfull`,
        //   res
        // );
        return res.status(200).send(`Deleting data login ${id}  success`);
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = loginController;
