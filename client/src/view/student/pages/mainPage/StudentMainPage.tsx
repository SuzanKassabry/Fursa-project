import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CourseCard from "../../components/courseCard/CourseCard";
import StudentResponsiveAppBar from "../../components/header/StudentAppBar";
import UpdatesList from "../../components/updatesList/UpdatesList";
import { Link } from 'react-router-dom';
import './StudentMainPage.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { classCourses, classUpdates, getCoursesAsync, getUpdatesAsync } from "../../../../app/reducers/student/ClassDataSlice";

const class_name = 'Class 1A';

export default function StudentMainPage() {
    const [classId, setClassId] = useState(-1);
    const dispatch = useAppDispatch();
    useEffect(() => {
        axios.post('/student/get-class-id-by-student-id').then(({data}) => {
            setClassId(data.id)
            dispatch(getUpdatesAsync(data.id));
            dispatch(getCoursesAsync(data.id));
        });
        
        
        //     axios.get('http://localhost:3004/studentCourses').then(({data})=>{
        //         console.log(data);
        //         setCourses(data);
        // })
    }, []);
    const courses = useAppSelector(classCourses);
    const updates = useAppSelector(classUpdates);

    return (
        <div>
            <div className="bar">
                <StudentResponsiveAppBar />
            </div>

            <div className="studentClassPageContent">
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
                                        <Link to="../studentUser/coursePage" key={i}>
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