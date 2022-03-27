import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

router.use(loginStatus);

router.get('/get-courses-by-teacher-id', async (req, res) => {
    const teacherId = req.userId

    const query = `SELECT test_schema.courses_table.id, test_schema.courses_table.name, test_schema.classes_table.name AS class_name, test_schema.courses_table.classId AS class_id
    FROM test_schema.courses_table INNER JOIN test_schema.classes_table
    ON test_schema.courses_table.classID = test_schema.classes_table.id
    WHERE test_schema.courses_table.teacherID = ${teacherId}`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(`In get-courses-by-teacher-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

module.exports = router;