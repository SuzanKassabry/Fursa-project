import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectedCourseId, selectedClassId } from '../../../../app/reducers/teacher/CourseCardSlice';
import { getHomeworksAsync } from '../../../../app/reducers/teacher/CourseDataSlice';

interface dialogProps {
    open: any;
    setOpen: any;
}

export default function NewHomeworkDialog(props: dialogProps) {
    const { open, setOpen } = props
    const [homework, setHomework] = useState("");
    const courseId = useAppSelector(selectedCourseId);
    const classId = useAppSelector(selectedClassId);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    function handleHomework(ev:any){
        // console.log(ev.target.value)
        setHomework(ev.target.value);
    }

    function handleAdd(){
        // const date = new Date();
        if(homework !== "") {
            const date = new Date().toISOString().slice(0, 10)
            axios.post('/teacher/add-new-homework', { 'description': homework, 'date':date, 'courseId':courseId, 'classId':classId })
            // .then(({ data }) => console.log(data));
            // dispatch(getHomeworksAsync(courseId));
        }
        handleClose();
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>new homework</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        insert homework bellow:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="homework"
                        type="text"
                        variant="standard"
                        required
                        fullWidth
                        multiline
                        rows={2}
                        onKeyUp={handleHomework}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}