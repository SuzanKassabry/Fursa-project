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
import { selectedCourseId } from '../../../../app/reducers/teacher/CourseCardSlice';
import { getMaterialAsync } from '../../../../app/reducers/teacher/CourseDataSlice';

interface dialogProps {
    open: any;
    setOpen: any;
}

export default function NewMaterialDialog(props: dialogProps) {
    const { open, setOpen } = props
    const [materialTitle, setMaterialTitle] = useState("");
    const [materialDescription, setMaterialDescription] = useState("");
    const courseId = useAppSelector(selectedCourseId);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    function handleMaterialTitle(ev: any) {
        setMaterialTitle(ev.target.value);
    }

    function handleMaterialDescription(ev: any) {
        setMaterialDescription(ev.target.value)
    }

    async function handleAdd() {
        if (materialTitle !== "" && materialDescription !== "") {
            await axios.post('/teacher/add-new-material', 
            { 'title': materialTitle, 'description': materialDescription, 'courseId':courseId })
                // .then(({ data }) => console.log(data));
            dispatch(getMaterialAsync(courseId)); 
        }
        handleClose();
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>new material</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        material's title:
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
                        onKeyUp={handleMaterialTitle}
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText>
                        content:
                    </DialogContentText>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={5}
                        margin="normal"
                        fullWidth
                        onKeyUp={handleMaterialDescription}
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