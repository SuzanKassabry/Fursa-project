import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

// router.use(loginStatus);

router.post('/get-updates-by-class-id', async (req, res) => {
    const {classId} = req.body
    // const classId = 1;
    
    const query = `SELECT test_schema.updates.update FROM test_schema.updates WHERE classID = ${classId}
    ORDER BY id DESC`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(`In get-updates-by-class-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

router.post('/get-updates-by-course-id', async (req, res) => {
    const {courseId} = req.body
    // const classId = 1;
    
    const query = `SELECT test_schema.updates.update FROM test_schema.updates WHERE courseID = ${courseId}
    ORDER BY id DESC`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(`In get-updates-by-course-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

module.exports = router;