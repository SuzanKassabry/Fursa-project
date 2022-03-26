import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

// router.use(loginStatus);

router.post('/get-exams-by-course-id', async (req, res) => {
    const {courseId} = req.body
    
    const query = `SELECT * 
    FROM test_schema.exams INNER JOIN test_schema.courses_table
    ON test_schema.exams.courseID = test_schema.courses_table.id 
    WHERE test_schema.exams.courseID = ${courseId}`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(`In get-exams-by-course-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

module.exports = router;