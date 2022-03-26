import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CourseResponsiveAppBar from "../../components/courseHeader/CourseAppBar";
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import './TeacherHomeworks.scss';
import { courseHomeworks, getHomeworksAsync } from "../../../../app/reducers/teacher/CourseDataSlice";
import { selectedCourseId } from "../../../../app/reducers/teacher/CourseCardSlice";

export default function TeacherHomeworks() {
    const courseId = useAppSelector(selectedCourseId);
    console.log(courseId);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getHomeworksAsync(courseId));
    }, []);
    const homeworks = useAppSelector(courseHomeworks);

    return (
        <div>
            <div className="bar">
                <CourseResponsiveAppBar></CourseResponsiveAppBar>
            </div>

            <div className="teacherHomeworksPageContent">
                <div className="homeworksTable">

                    <Divider className='divider'>
                        <Typography variant='h5' >HOMEWORKS</Typography>
                    </Divider>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Course</TableCell>
                                    <TableCell align="center">description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    homeworks.map((homework, i) => {
                                        const { date, name, description } = homework;
                                        return (
                                            <TableRow
                                                key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center" component="th" scope="row">
                                                    {date}
                                                </TableCell>
                                                <TableCell align="center">{name}</TableCell>
                                                <TableCell align="center">{description}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}