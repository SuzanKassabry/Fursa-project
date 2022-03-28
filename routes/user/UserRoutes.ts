import { connection } from "../../server";
import jwt from "jwt-simple";
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password, type } = req.body;
        let table;
        switch (type) {
            case 'school': {
                table = 'schoolusers';
                break;
            }
            case 'teacher': {
                table = 'teachers_table';
                break;
            }
            case 'student': {
                table = 'students_table';
                break;
            }
        }

        const query = `SELECT id, username FROM test_schema.${table} WHERE username='${username}' AND password='${password}'`;
        connection.query(query, (err, result) => {
            try {
                if (err) throw err;
                if (result.length > 0) {
                    const JWT_SECRET = process.env.JWT_SECRET;
                    const encodedJWT = jwt.encode({
                        userId: result[0].id,
                        username: username,
                        type: type
                    },
                        JWT_SECRET);
                    res.cookie("userInfo", encodedJWT, { httpOnly: true, maxAge: 60 * 60 * 1000, });
                    res.send({ loginStatus: true });
                } else {
                    res.send({ loginStatus: false });
                }
            } catch (error) {
                console.log(`In login error: ${error.message}`);
                res.status(500).send({ error: error.message });
            }
        })

    } catch (error) {
        console.error(error.message);
        res.send({ error: error.message, loginStatus: false })
    }
})

router.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    const query = `INSERT INTO test_schema.schoolusers (name, username, password)
    VALUES ('${name}', '${username}', '${password}')`

    connection.query(query, (err, result) => {
        try {
            if (err) throw err;
            res.send({ registerStatus: true })
        } catch (error) {
            console.error(`In register error: ${error.message}`);
            res.send({ error: error.message, registerStatus: false })
        }
    })
})

router.get('/get-current-user-id', async (req, res) => {
    const { userInfo } = req.cookies;
    if (userInfo) {
        const JWT_SECRET = process.env.JWT_SECRET;
        const decodedJWT = jwt.decode(userInfo, JWT_SECRET);
        const { userId } = decodedJWT;
        if (userId) {
            res.send({'currentUserId': userId})
        }
    } else {
        console.log('in get-current-user-id error: no userInfo found in cookies');
        res.send({'currentUserId': undefined})
    }
})

module.exports = router;