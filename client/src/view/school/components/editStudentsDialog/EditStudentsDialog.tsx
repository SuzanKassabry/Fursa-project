import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAppSelector } from '../../../../app/hooks';
import { classStudents } from '../../../../app/reducers/school/ClassDetailsSlice';
import { schoolStudents } from '../../../../app/reducers/school/SchoolSlice';
import { useEffect, useState } from 'react';

interface dialogProps {
    open: any;
    setOpen: any;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function NewCourseDialog(props: dialogProps) {
    const { open, setOpen } = props

    const allStudents = useAppSelector(schoolStudents); //all school students
    const studentsOfClass = useAppSelector(classStudents); //only class students
    let students = studentsOfClass;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function checkStudent(student: any) {
        let i;
        for (i = 0; i < studentsOfClass.length; i++) {
            if (studentsOfClass[i].id === student.id) {
                return true;
            }
        }
        return false;
    };

    function handleClick(ev: any, value: any) {
        console.log(value)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>new Course</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        select/unselect student:
                    </DialogContentText>
                    <Autocomplete
                        multiple
                        // value={students}
                        id="checkboxes-tags-demo"
                        options={allStudents}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.firstName.concat('', option.lastName)}
                        renderOption={(props, option, { selected }) => (
                            <li {...props} >
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                    // checked={checkStudent(option)}
                                />
                                {option.firstName.concat('', option.lastName)}
                            </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} label="select or search students" placeholder="Favorites" />
                        )}
                        size="small"
                        className='inputField'
                        isOptionEqualToValue={(option, value) => option.studentID === value.studentID}
                        onChange={handleClick}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
