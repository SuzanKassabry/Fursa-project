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
import { getUpdatesAsync } from '../../../../app/reducers/teacher/CourseDataSlice';

interface dialogProps {
    open: any;
    setOpen: any;
}

export default function NewUpdateDialog(props: dialogProps) {
    const { open, setOpen } = props
    const [update, setUpdate] = useState("");
    const courseId = useAppSelector(selectedCourseId);
    const classId = useAppSelector(selectedClassId);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    function handleUpdate(ev: any) {
        setUpdate(ev.target.value);
    }

    async function handleAdd() {
        if (update !== "" ) {
            await axios.post('/teacher/add-new-update', { 'update': update, 'courseId':courseId, 'classId':classId })
                // .then(({ data }) => console.log(data));
            dispatch(getUpdatesAsync(courseId)); 
        }
        handleClose();
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>new update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        update:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="title"
                        type="text"
                        variant="standard"
                        required
                        fullWidth
                        onKeyUp={handleUpdate}
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