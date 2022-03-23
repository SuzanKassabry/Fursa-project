import react from 'react-router-dom';
import StudentResponsiveAppBar from '../../components/header/StudentAppBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Homeworks.scss';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { classHomeworks, getHomeworksAsync } from '../../../../app/reducers/student/ClassDataSlice';

export default function StudentHomeworks() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        axios.post('/student/get-class-id-by-student-id').then(({data}) => {
            dispatch(getHomeworksAsync(data.id));
        });
    }, []);
    const homeworks = useAppSelector(classHomeworks);
    console.log(homeworks)

    return (
        <div>
            <div className="bar">
                <StudentResponsiveAppBar></StudentResponsiveAppBar>
            </div>

            <div className="studentHomeworksPageContent">


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