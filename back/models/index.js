const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const user = require("./user");

const db = {};
// async function initializion() {
//   try {
//     const db = {};

//     db.User = user;

//     const result = await mysql.createConnection({
//       user: config.username,
//       password: config.password,
//     });
//     await result.query("CREATE DATABASE IF NOT EXISTS template;");

//     const sequelize = new Sequelize(
//       config.database,
//       config.username,
//       config.password,
//       config
//     );
//     Object.keys(db).forEach((modelName) => {
//       db[modelName].init(sequelize);
//     });

//     Object.keys(db).forEach((modelName) => {
//       if (db[modelName].associate) {
//         db[modelName].associate(db);
//       }
//     });

//     db.sequelize = sequelize;
//     db.Sequelize = Sequelize;
//     return db;
//   } catch (e) {}
// }

db.User = user;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// module.exports = initializion();
