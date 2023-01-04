const express = require("express");
const app = express();
const port = 3000;
const router = require("./src/routes/index");
const cors = require("cors");
// const bodyParser = require("body-parser");
const { urlencoded, json } = require("body-parser");

// menerima application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

// menerima json
app.use(json());
// app.use(bodyParser.json());

// Parent Route
app.use("/api/v1", router);

// CORS
app.use(cors());

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "Page not found!",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
