const express = require("express");
const cron = require("node-cron");

const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../../_middleware/validateRequest");
const studentService = require("../services/student.service");
const { Router } = require("express");
const fileUploadHandler = require("../../_middleware/fileUploadHandler");
const fs = require("fs");
const { student } = require("../../_helper/db");
const readXlsxFile = require("read-excel-file/node");

/**Routes */

/**add student*/
router.post("/add", addStudentSchema, addStudent);
router.get("/:id/result", getResult);
router.get("/", getResults);
router.post("/upload", fileUploadHandler.single("file"), upload);
module.exports = router;
/**Add student schema */
function addStudentSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    mark1: Joi.number().required(),
    mark2: Joi.number().required(),
    mark3: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

/**Add student */
function addStudent(req, res, next) {
  studentService
    .addStudent(req.body)
    .then(() => res.json({ message: "student successfully added." }))
    .catch(next);
}
function getResult(req, res, next) {
  studentService
    .getResult(req.params)
    .then((result) => res.json(result))
    .catch(next);
}
function getResults(req, res, next) {
  studentService
    .getResults(req)
    .then((results) => res.json(results))
    .catch(next);
}

function upload(req, res, next) {
  (async () => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
      let path =
        __basedir + "/api/resources/static/assets/uploads/" + req.file.filename;
      readXlsxFile(path).then((rows) => {
        let students = [];
        rows.forEach((row) => {
          let student = {
            name: row[0],
            age: row[1],
            mark1: row[2],
            mark2: row[3],
            mark3: row[4],
          };
          students.push(student);
        });
        studentService
          .addStudent(students)
          .then(() => res.json({ message: "All student successfully added." }))
          .catch(next);
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  })();
}
