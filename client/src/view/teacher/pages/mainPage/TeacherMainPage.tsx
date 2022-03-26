import ClassCard from "../../components/classCard/ClassCard";
import CourseCard from "../../components/courseCard/CourseCard";
import TeacherResponsiveAppBar from "../../components/header/TeacherAppBar";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './TeacherMainPage.scss';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getCoursesAsync, teacherCourses } from "../../../../app/reducers/teacher/TeacherSlice";

const classes = [{ class_name: 'Class 1A' }];

export default function TeacherMainPage() {
    // const [courses, setCourses] = useState([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        // axios.get('http://localhost:3004/teacherCourses').then(({ data }) => {
        //     // console.log(data);
        //     setCourses(data);
        // })

        // axios.post('/teacher/get-courses-by-teacher-id').then(({data})=>{
        //     console.log(data);
        // });
        dispatch(getCoursesAsync());
        
    }, []);
    const courses = useAppSelector(teacherCourses);

    return (
        <div>

            <div className="bar">
                <TeacherResponsiveAppBar />
            </div>

            <div className="ClassAndCourses">

                <Divider>
                    <Typography variant='h5' align='center'>MY CLASS</Typography>
                </Divider>

                <div className="myClass">
                    {
                        classes.map((myClass, i) => {
                            const { class_name } = myClass
                            return (
                                <ClassCard class_name={class_name} key={i} />
                            );
                        })
                    }
                </div>

                <Divider>
                    <Typography variant='h5' align='center'>MY COURSES</Typography>
                </Divider>

                <div className="myCourses">
                    {
                        courses.map((course, i) => {
                            const { name, class_name } = course;
                            return (
                                <Link to="../teacherUser/coursePage" key={i}>
                                    <CourseCard info={course} />
                                </Link>

                            );
                        })
                    }
                </div>
            </div>

        </div>
    );
}