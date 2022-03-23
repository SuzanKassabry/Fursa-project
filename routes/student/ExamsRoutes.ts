import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

// router.use(loginStatus);

router.post('/get-exams-by-class-id', async (req, res) => {
    const {classId} = req.body
    
    const query = `SELECT * 
    FROM test_schema.exams INNER JOIN test_schema.courses_table
    ON test_schema.exams.courseID = test_schema.courses_table.id 
    WHERE test_schema.exams.classID = ${classId}`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(`In get-exams-by-class-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

module.exports = router;