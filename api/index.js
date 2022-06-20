const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
global.__basedir = __dirname + "/..";
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./_helper/db");
const errorHandler = require("./_middleware/errorHandler");
db.sequelize.sync();

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to student result app." });
// });
app.use("/students", require("./students/controller/student.controller"));
app.use(errorHandler);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
