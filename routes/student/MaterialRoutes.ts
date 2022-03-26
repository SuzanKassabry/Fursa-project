import loginStatus from "../../controllers/login";
import { connection } from "../../server";

const express = require('express');
const router = express.Router();

// router.use(loginStatus);

router.post('/get-material-by-course-id', async (req, res) => {
    const {courseId} = req.body
    console.log(courseId)
    
    const query = `SELECT test_schema.materials.title, test_schema.materials.description 
    FROM test_schema.materials WHERE courseID = ${courseId}`;

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send(result)
        } catch (error) {
            console.log(`In get-material-by-course-id error: ${error.message}`);
            res.status(500).send({ error: error.message });
        }
    })
})

module.exports = router;