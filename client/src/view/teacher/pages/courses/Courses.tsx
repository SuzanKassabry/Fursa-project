import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getCoursesAsync, teacherCourses } from "../../../../app/reducers/teacher/TeacherSlice";
import CourseCard from "../../components/courseCard/CourseCard";
import TeacherResponsiveAppBar from "../../components/header/TeacherAppBar";
import './Courses.scss';

export default function Courses() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCoursesAsync());
        
    }, []);
    const courses = useAppSelector(teacherCourses);
    
    return (
        <div>

            <div className="bar">
                <TeacherResponsiveAppBar />
            </div>

            <div className="teacherCoursesPageContent">
                <Divider className='divider'>
                    <Typography variant='h5' align='center'>MY COURSES</Typography>
                </Divider>

                <div className="coursesContainer__courses">

                    {
                        courses.map((course, i) => {
                            const { name, class_name } = course;
                            return (
                                <Link to="../teacherUser/coursePage">
                                    <CourseCard key={i} info={course} />
                                </Link>
                                
                            );
                        })
                    }
                </div>
            </div>



        </div>
    );
}