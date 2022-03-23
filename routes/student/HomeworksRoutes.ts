import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

// router.use(loginStatus);

router.post('/get-homeworks-by-class-id', async (req, res) => {
    const {classId} = req.body
    // const classId = 1;
    console.log('in get-homeworks-by-class-id')
    console.log(classId)
    
    const query = `SELECT * 
    FROM test_schema.homeworks INNER JOIN test_schema.courses_table
    ON test_schema.homeworks.courseID = test_schema.courses_table.id 
    WHERE test_schema.homeworks.classID = ${classId}`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            console.log(result)
            res.send(result)
        } catch (error) {
            console.log(`In get-homeworks-by-class-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

module.exports = router;