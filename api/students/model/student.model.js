module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    name: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    mark1: {
      type: Sequelize.INTEGER,
    },
    mark2: {
      type: Sequelize.INTEGER,
    },
    mark3: {
      type: Sequelize.INTEGER,
    },
  });
  return Student;
};
