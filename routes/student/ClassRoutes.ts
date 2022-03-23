import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

router.use(loginStatus);

router.post('/get-class-id-by-student-id', async (req, res) => {
    const studentId = req.userId;
    // const classId = 1;
    
    const query = `SELECT * FROM test_schema.students_table WHERE id = ${studentId}`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send(result[0])
        } catch (error) {
            console.log(`In get-class-id-by-student-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

module.exports = router;