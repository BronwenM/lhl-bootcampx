SELECT students.name AS student_name, AVG(assignment_submissions.duration) AS average_assignment_duration
FROM students
JOIN assignment_submissions ON assignment_submissions.student_id = students.id
WHERE students.end_date IS NULL
GROUP BY student_name
ORDER BY average_assignment_duration DESC;