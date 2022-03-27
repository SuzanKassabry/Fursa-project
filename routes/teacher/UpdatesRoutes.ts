import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

// router.use(loginStatus);

router.post('/get-updates-by-course-id', async (req, res) => {
    const {courseId} = req.body
    
    const query = `SELECT test_schema.updates.update FROM test_schema.updates WHERE courseID = ${courseId}`;

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

router.post('/add-new-update', async (req, res) => {
    const {update, courseId, classId} = req.body;

    const query = `INSERT INTO test_schema.updates (test_schema.updates.update, classID, courseID) 
    VALUES ('${update}', ${classId}, ${courseId})`

    connection.query(query, (err, result) => {
        try {
            if (err)  throw err;
            res.send(result)
        } catch (error) {
            console.log(`In add-new-update error: ${error.message}`);
            res.status(500).send({error: error.message});
        }
    })
})

module.exports = router;