import express from 'express';
const app = express();
const port = 4000;
const mysql = require('mysql');

require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(express.static('./client/build'));
app.use(express.json());
app.use(cookieParser());

// app.get('/get-user' , (req, res) => {
//   console.log('user-request')
//   res.status(202).send({name:'suzan', id:12345})
// })

//MYSQL

export const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456789"
});

connection.connect( (err) => {
  if (err) throw err;
  console.log("connected to SQL");
})

//mongoose
const mongoose = require("mongoose");

async function main() {
  const password = process.env.MONGODB_PASSWORD;
  await mongoose.connect(
    `mongodb+srv://Suzan:${password}@cluster0.skxqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );
}

main().catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to DB!");
});

//Routes
const userRoute = require('./routes/user/UserRoutes')
app.use('/user', userRoute);

//school routes
const classesRoute_school = require('./routes/school/ClassesRoutes')
app.use('/school', classesRoute_school);

const teachersRoute_school = require('./routes/school/TeachersRoutes')
app.use('/school', teachersRoute_school);

const studentsRoute_school = require('./routes/school/StudentsRoutes')
app.use('/school', studentsRoute_school);

const coursesRoute_school = require('./routes/school/CoursesRoutes')
app.use('/school', coursesRoute_school);

//student routes
const classRoute_student = require('./routes/student/ClassRoutes')
app.use('/student', classRoute_student);

const coursesRoute_student = require('./routes/student/CoursesRoutes')
app.use('/student', coursesRoute_student);

const updatesRoute_student = require('./routes/student/UpdatesRoutes')
app.use('/student', updatesRoute_student);

const homeworksRoute_student = require('./routes/student/HomeworksRoutes')
app.use('/student', homeworksRoute_student);

const examsRoute_student = require('./routes/student/ExamsRoutes')
app.use('/student', examsRoute_student);

const materialRoute_student = require('./routes/student/MaterialRoutes')
app.use('/student', materialRoute_student);

//teacher routes
const coursesRoute_teacher = require('./routes/teacher/CoursesRoutes')
app.use('/teacher', coursesRoute_teacher);

const materialRoute_teacher = require('./routes/teacher/MaterialRoutes')
app.use('/teacher', materialRoute_teacher);

const updatesRoute_teacher = require('./routes/teacher/UpdatesRoutes')
app.use('/teacher', updatesRoute_teacher);

const homeworksRoute_teacher = require('./routes/teacher/HomeworksRoutes')
app.use('/teacher', homeworksRoute_teacher);

const examsRoute_teacher = require('./routes/teacher/ExamsRoutes')
app.use('/teacher', examsRoute_teacher);

const classesRoute_teacher = require('./routes/teacher/ClassesRoutes')
app.use('/teacher', classesRoute_teacher);

//server listening
app.listen(process.env.PORT || port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
