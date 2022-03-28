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
import { getClassesAsync, getCoursesAsync, teacherClasses, teacherCourses } from "../../../../app/reducers/teacher/TeacherSlice";

// const classes = [{ class_name: 'Class 1A' }];

export default function TeacherMainPage() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCoursesAsync());
        dispatch(getClassesAsync());
        
    }, []);
    const courses = useAppSelector(teacherCourses);
    const classes = useAppSelector(teacherClasses)

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
                            const { class_name, id } = myClass
                            return (
                                <Link to='../teacherUser/classPage' key={i}>
                                    <ClassCard class_name={class_name} id={id} key={i} />
                                </Link>
                                
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
                            const { name, class_name, class_id, teacher_id } = course;
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