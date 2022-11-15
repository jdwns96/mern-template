// module
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { WebSocket, WebSocketServer } = require("ws");
const dotenv = require("dotenv");
const db = require("./models");
// built in module
const path = require("path"); // 경로 설정
// create module
// const routes = require("./routes");
const routes = require("./routes");

// DB
const sqlInitUtils = require("./utils/sql-init-utils");
const userTable = require("./db/user");

dotenv.config();
// express instance
const app = express();
// mysql
// db.then((res) => {
//   res.sequelize
//     .sync()
//     .then(() => {
//       console.log("db 연결 성공");
//     })
//     .catch(console.error);
// });

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("db 연결 성공");
    sqlInitUtils();
  })
  .catch(console.error);

// port
app.set("port", process.env.PORT || 8888);
// cors
app.use(cors());
// body parser
app.use(express.json());
// static path
app.use(express.static(path.join(__dirname, "public")));
// log
app.use(morgan("dev"));
// routes
// app.use(routes);

app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
  // res.status(200).json({
  //   massage: "OK",
  // });
});

// routes
app.use(routes);
// run
app.listen(app.get("port"), () => {
  console.log(app.get("port"), " : server listening !");
});
