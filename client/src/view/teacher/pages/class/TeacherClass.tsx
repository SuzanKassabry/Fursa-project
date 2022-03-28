import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { classCourses, classUpdates, getCoursesAsync, getUpdatesAsync } from "../../../../app/reducers/teacher/ClassDataSlice";
import TeacherResponsiveAppBar from "../../components/header/TeacherAppBar";
import { selectedClassId } from "../../../../app/reducers/teacher/ClassCardSlice";
import CourseCard from "../../components/courseCard/CourseCard";
import UpdatesList from "../../components/updatesList/UpdatesList";
import './TeacherClass.scss';

const class_name = 'Class 1A';

export default function TeacherClass() {
    // const [classId, setClassId] = useState(-1);
    const classId = useAppSelector(selectedClassId)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUpdatesAsync(classId));
        dispatch(getCoursesAsync(classId));
    }, []);
    const courses = useAppSelector(classCourses);
    const updates = useAppSelector(classUpdates);

    return (
        <div>
            <div className="bar">
                <TeacherResponsiveAppBar />
            </div>

            <div className="teacherClassPageContent">
                <div className="title">
                    <Typography variant='h3' align='center'>{class_name}</Typography>
                </div>

                <div className="coursesAndRecentUpdates">

                    <div className="coursesAndRecentUpdates__left">
                        <Divider >
                            <Typography variant='h5' >COURSES</Typography>
                        </Divider>

                        <div className="courses">
                            {
                                courses.map((course, i) => {
                                    const { name, firstName, lastName } = course;
                                    return (
                                        <Link to="../teacherUser/coursePage" key={i}>
                                            <CourseCard key={i} info={course} />
                                        </Link>

                                    );
                                })
                            }
                        </div>

                    </div>

                    <span>
                        <Divider className='divider' orientation="vertical" variant="middle" flexItem></Divider>
                    </span>

                    <div className="coursesAndRecentUpdates__right">
                        <Typography className='title' variant='subtitle2' align='center'>CLASS RECENT UPDATES</Typography>
                        <UpdatesList updates={updates}></UpdatesList>
                    </div>
                </div>
            </div>


        </div>
    );
}