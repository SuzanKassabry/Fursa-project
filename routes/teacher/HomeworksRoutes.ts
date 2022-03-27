import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

// router.use(loginStatus);

router.post('/get-homeworks-by-course-id', async (req, res) => {
    const {courseId} = req.body
    
    const query = `SELECT * 
    FROM test_schema.homeworks INNER JOIN test_schema.courses_table
    ON test_schema.homeworks.courseID = test_schema.courses_table.id 
    WHERE test_schema.homeworks.courseID = ${courseId}`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(`In get-homeworks-by-course-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

router.post('/add-new-homework', async (req, res) => {
    const {description, date, courseId, classId} = req.body;

    const query = `INSERT INTO test_schema.homeworks (description, courseID, classID)
    VALUES ('${description}', ${courseId}, ${classId})`

    connection.query(query, (err, result) => {
        try {
            if (err)  throw err;
            res.send(result)
        } catch (error) {
            console.log(`In add-new-homework error: ${error.message}`);
            res.status(500).send({error: error.message});
        }
    })
})

module.exports = router;