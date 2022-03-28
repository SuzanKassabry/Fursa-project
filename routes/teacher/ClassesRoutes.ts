import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

router.use(loginStatus);

router.get('/get-classes-by-teacher-id', async (req, res) => {
    const teacherId = req.userId

    const query = `SELECT test_schema.classes_table.id, test_schema.classes_table.name AS class_name
    FROM test_schema.classes_table 
    WHERE test_schema.classes_table.teacherID = ${teacherId}`;

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