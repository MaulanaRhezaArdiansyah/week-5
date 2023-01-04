const db = require("../helpers/db-connection");
const { v4: uuidv4 } = require("uuid");

const authModel = {
  //   query: (sortType = "asc", limit = 5) => {
  query: (sortType = "asc") => {
    // return `ORDER BY email ${sortType} LIMIT ${limit}`;
    return `ORDER BY email ${sortType}`;
  },

  get: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM auth ${authModel.query()}`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM auth WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },

  add: ({ email, password, phone_number }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO auth (id, email, password, phone_number) VALUES ('${uuidv4()}', '${email}', '${password}','${phone_number}')`,
        (error) => {
          if (error) {
            return reject(error.message);
          } else {
            return resolve({ email, password, phone_number });
          }
        }
      );
    });
  },

  //   updateByPut: ({ id, email, password, phone_number }) => {
  //     return new Promise((resolve, reject) => {
  //       db.query(
  //         `UPDATE login SET email = '${email}', password = '${password}', phone_number = '${phone_number}' WHERE id = '${id}'`,
  //         (error) => {
  //           if (error) {
  //             return reject(error.message);
  //           } else {
  //             return resolve({ id, email, password, phone_number });
  //           }
  //         }
  //       );
  //     });
  //   },

  updateByPatch: ({ id, email, password, phone_number }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM auth WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          db.query(
            `UPDATE auth SET email='${
              email || result.rows[0].email
            }', password='${
              password || result.rows[0].password
            }',phone_number='${
              phone_number || result.rows[0].phone_number
            }' WHERE id='${id}'`,
            (error) => {
              if (error) {
                return reject(error.message);
              } else {
                return resolve({ id, email, password, phone_number });
              }
            }
          );
        }
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM auth WHERE id = '${id}'`, (error) => {
        if (error) {
          return reject(error.message);
        } else {
          return resolve("Deleting data successfully");
        }
      });
    });
  },
};

module.exports = authModel;
