import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import CourseResponsiveAppBar from "../../components/courseHeader/CourseAppBar";
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './TeacherExams.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { courseExams, getExamsAsync } from "../../../../app/reducers/teacher/CourseDataSlice";
import { selectedCourseId } from "../../../../app/reducers/teacher/CourseCardSlice";

export default function TeacherExams() {
    const courseId = useAppSelector(selectedCourseId);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getExamsAsync(courseId));
    }, []);
    const exams = useAppSelector(courseExams);

    const [selectedDate, setSelectedDate] = useState<Date | null>(
        new Date(),
    );

    const handleChange = (newValue: Date | null) => {
        setSelectedDate(newValue);
    };


    return (
        <div>
            <div className="bar">
                <CourseResponsiveAppBar></CourseResponsiveAppBar>
            </div>

            <div className="teacherExamsPageContent">
                <div className="calendar">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            inputFormat="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                <div className="examsTable">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Course</TableCell>
                                    <TableCell align="center">description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    exams.map((exam, i) => {
                                        const { name, examMaterial } = exam;
                                        return (
                                            <TableRow
                                                key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{name}</TableCell>
                                                <TableCell align="center">{examMaterial}</TableCell>
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