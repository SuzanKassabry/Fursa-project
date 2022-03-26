import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectedCourseId, selectedCourseName, selectedTeacherName } from "../../../../app/reducers/student/CourseCardSlice";
import StudentResponsiveAppBar from "../../components/header/StudentAppBar";
import MaterialSection from "../../components/materialSection/MaterialSection";
import UpdatesList from "../../components/updatesList/UpdatesList";
import axios from 'axios';
import './Course.scss';
import { courseMaterial, courseUpdates, getMaterialAsync, getUpdatesAsync } from "../../../../app/reducers/student/CourseDataSlice";

// const materials = [
//     { title: 'material title1', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { title: 'material title2', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { title: 'material title3', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { title: 'material title4', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { title: 'material title5', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
// ]

// const updates = [
//     { update: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { update: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { update: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { update: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
//     { update: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
// ]

export default function StudentCourse() {
    const courseName = useAppSelector(selectedCourseName);
    const teacherName = useAppSelector(selectedTeacherName);
    const courseId = useAppSelector(selectedCourseId)

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getMaterialAsync(courseId));
        dispatch(getUpdatesAsync(courseId));
    }, []);
    const materials = useAppSelector(courseMaterial);
    const updates = useAppSelector(courseUpdates);

    return (
        <div>
            <div className="bar">
                <StudentResponsiveAppBar></StudentResponsiveAppBar>
            </div>

            <div className="studentCoursePageContent">



                <div className="title">
                    <Typography variant='h3' align='center'>{courseName}</Typography>
                    <Typography variant='h5' align='center'>{teacherName}</Typography>

                </div>

                <div className="course">
                    <div className="course__material">
                        <Divider >
                            <Typography variant='h5' >COURSE MATERIAL</Typography>
                        </Divider>

                        {
                            materials.map((material, i) => {
                                const { title, description } = material;
                                return (
                                    <MaterialSection key={i} title={title} description={description} />
                                );
                            })
                        }
                    </div>

                    <span>
                        <Divider className='divider' orientation="vertical" variant="middle" flexItem></Divider>
                    </span>




                    <div className="course__recentUpdates">
                        <Typography className='title' variant='subtitle2' align='center'>COURSE RECENT UPDATES</Typography>
                        <UpdatesList updates={updates} />
                    </div>
                </div>

            </div>

        </div>
    );
}