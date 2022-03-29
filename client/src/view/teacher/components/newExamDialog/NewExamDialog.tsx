import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../../../app/hooks';
import { selectedCourseId, selectedClassId } from '../../../../app/reducers/teacher/CourseCardSlice';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from "@mui/lab/AdapterDateFns";

interface dialogProps {
    open: any;
    setOpen: any;
}

export default function NewExamDialog(props: dialogProps) {
    const { open, setOpen } = props
    const [examMaterial, setExamMaterial] = useState("");
    const courseId = useAppSelector(selectedCourseId);
    const classId = useAppSelector(selectedClassId);

    const [selectedDate, setSelectedDate] = useState<Date | null>(
        new Date(),
    );


    const handleClose = () => {
        setOpen(false);
        setSelectedDate(new Date());
    };

    const handleDateSelection = (newValue: Date | null) => {
        setSelectedDate(newValue);
    };

    function handleExamMaterial(ev: any) {
        // console.log(ev.target.value)
        setExamMaterial(ev.target.value);
    }

    async function handleAdd() {
        if (examMaterial !== "") {
            await axios.post('/teacher/add-new-exam',
                {
                    'examMaterial': examMaterial,
                    'date':selectedDate ? selectedDate.toISOString().slice(0,10): selectedDate,
                    'courseId': courseId,
                    'classId': classId
                });
        }
        handleClose();
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>new material</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        select exam's due date:
                    </DialogContentText>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            inputFormat="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateSelection}
                            disablePast
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogContent>
                    <DialogContentText>
                        the exam's material:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        type="text"
                        variant="standard"
                        required
                        fullWidth
                        multiline
                        rows={2}
                        onKeyUp={handleExamMaterial}
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