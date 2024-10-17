const { Pool } = require("pg");

const clArgs = process.argv.slice(2);

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
    SELECT students.id, students.name AS name, cohorts.name AS cohort
    FROM students
    JOIN cohorts ON students.cohort_id = cohorts.id
    WHERE cohorts.name LIKE '%${clArgs[0]}%'
    LIMIT ${clArgs[1] || 5};
    `
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));