const db = require("../helpers/db-connection");
const { v4: uuidv4 } = require("uuid");

const productModel = {
  query: (queryParams, sortType = "ASC", limit = 10, page = 1) => {
    const { title, cat } = queryParams;
    if (title && cat) {
      return `WHERE title ILIKE '%${title}%' AND category ILIKE '%${cat}%' ORDER BY title ${sortType} LIMIT ${limit}`;
    } else if (title || cat) {
      return `WHERE title ILIKE '%${title}%' OR category ILIKE '%${cat}%' ORDER BY title ${sortType} LIMIT ${limit} `;
    } else {
      // return `ORDER BY CAST (price AS FLOAT) ${sortType} LIMIT ${limit} OFFSET ${
      //   (page - 1) * limit
      // }`;
      return `ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`;
    }
  },
  // get: function (queryParams) {
  get: (queryParams) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM products ${productModel.query(
          // `SELECT * FROM products ${this.query(
          queryParams,
          queryParams.sortBy,
          queryParams.limit,
          queryParams.page
        )}`,
        (error, result) => {
          if (error) {
            return reject(error.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },

  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },

  add: ({ title, img, price, category, description }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO productss (id, title, img, price, category, description) VALUES ('${uuidv4()}', '${title}', '${img}','${price}', '${category}', '${description}')`,
        (error) => {
          if (error) {
            return reject(error.message);
          } else {
            return resolve({ title, img, price, category, description });
          }
        }
      );
    });
  },

  updateByPut: ({ id, title, img, price, category }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE products SET title = '${title}', img = '${img}', price = '${price}', category = '${category}' WHERE id = '${id}'`,
        (error) => {
          if (error) {
            return reject(error.message);
          } else {
            return resolve({ id, title, img, price, category });
          }
        }
      );
    });
  },

  updateByPatch: ({ id, title, img, price, category, description }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          db.query(
            `UPDATE products SET title='${
              title || result.rows[0].title
            }', img='${img || result.rows[0].img}',price='${
              price || result.rows[0].price
            }', category='${
              category || result.rows[0].category
            }', description = '${
              description || result.rows[0].description
            }' WHERE id='${id}'`,
            (error) => {
              if (error) {
                return reject(error.message);
              } else {
                return resolve({
                  id,
                  title,
                  img,
                  price,
                  category,
                  description,
                });
              }
            }
          );
        }
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM products WHERE id = '${id}'`, (error) => {
        if (error) {
          return reject(error.message);
        } else {
          return resolve("Deleting data successfully");
        }
      });
    });
  },
};

module.exports = productModel;
