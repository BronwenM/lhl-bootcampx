const { Pool } = require("pg");

// const clArgs = process.argv.slice(2);

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];
const queryString = `
    SELECT students.id, students.name AS name, cohorts.name AS cohort
    FROM students
    JOIN cohorts ON students.cohort_id = cohorts.id
    WHERE cohorts.name LIKE $1
    LIMIT $2;
    `;

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));