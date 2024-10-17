const { Pool } = require("pg");

const clArgs = process.argv.slice(2);

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

pool.query(
  `
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM assistance_requests
  JOIN teachers ON assistance_requests.teacher_id = teachers.id
  JOIN students ON assistance_requests.student_id = students.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE '%${clArgs[0] || 'JUL02'}%'
  ORDER BY teachers.name ASC;
  `
)
.then((res) => {
  res.rows.forEach((teacher) => {
    console.log(
      `${teacher.cohort}: ${teacher.teacher}`
    );
  });
})
.catch((err) => console.error("query error", err.stack));