import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

// router.use(loginStatus);

router.post('/get-homeworks-by-class-id', async (req, res) => {
    const {classId} = req.body
    
    const query = `SELECT * 
    FROM test_schema.homeworks INNER JOIN test_schema.courses_table
    ON test_schema.homeworks.courseID = test_schema.courses_table.id 
    WHERE test_schema.homeworks.classID = ${classId}
    ORDER BY date DESC`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(`In get-homeworks-by-class-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

module.exports = router;