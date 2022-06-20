const db = require("../../_helper/db");
const { Sequelize } = require("sequelize");
const { date, custom } = require("joi");
const { query } = require("express");
const Op = Sequelize.Op;
module.exports = {
  addStudent,
  getResult,
  getResults,
};
async function addStudent(params) {
  await db.student.create(params);
}
async function addStudent(params) {
  await db.student.bulkCreate(params);
}
async function getResult(params) {
  return await getStudent(params.id);
}
async function getResults(params) {
  if (params.query != undefined) {
    switch (params.query.resultStatus) {
      case "passed":
        return await db.student.findAll({
          where: {
            [Op.and]: [
              {
                mark1: {
                  [Op.gte]: 33,
                },
              },
              {
                mark2: {
                  [Op.gte]: 33,
                },
              },
              {
                mark3: {
                  [Op.gte]: 33,
                },
              },
            ],
          },
        });
        break;
      case "failed":
        return (results = await db.student.findAll({
          where: {
            [Op.or]: [
              {
                mark1: {
                  [Op.lt]: 33,
                },
              },
              {
                mark2: {
                  [Op.lt]: 33,
                },
              },
              {
                mark3: {
                  [Op.lt]: 33,
                },
              },
            ],
          },
        }));
        break;
      default:
        throw "query not found";
    }
    console.log("resultStatus", resultStatus);
  }
}

async function getStudent(id) {
  const student = await db.student.findByPk(id);
  if (!student) throw "Not found";
  return student;
}
