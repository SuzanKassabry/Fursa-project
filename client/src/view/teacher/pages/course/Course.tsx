import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { selectedClassName, selectedCourseId, selectedCourseName, selectedCourseTeacherId } from "../../../../app/reducers/teacher/CourseCardSlice";
import CourseResponsiveAppBar from "../../components/courseHeader/CourseAppBar";
import MaterialSection from "../../components/materialSection/MaterialSection";
import UpdatesList from "../../components/updatesList/UpdatesList";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import './Course.scss';
import { courseMaterial, courseUpdates, getMaterialAsync, getUpdatesAsync } from "../../../../app/reducers/teacher/CourseDataSlice";
import Button from "@mui/material/Button";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import NewMaterialDialog from "../../components/newMaterialDialog/NewMaterialDialog";
import NewHomeworkDialog from "../../components/newHomeworkDialog/NewHomeworkDialog";
import NewExamDialog from "../../components/newExamDialog/NewExamDialog";
import NewUpdateDialog from "../../components/newUpdateDialog/NewUpdateDialog";

export default function Course() {
    const courseName = useAppSelector(selectedCourseName);
    const className = useAppSelector(selectedClassName);
    const courseId = useAppSelector(selectedCourseId);
    const teacherId = useAppSelector(selectedCourseTeacherId);

    const [currentUserId, setCurrentUserId] = useState('');
    const [openMaterialDialog, setOpenMaterialDialog] = useState(false);
    const [openHomeworkDialog, setOpenHomeworkDialog] = useState(false);
    const [openExamDialog, setOpenExamDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [showButtons, setShowButtons] = useState(true);

    useEffect(() => {
        if (currentUserId === teacherId) {
            setShowButtons(true)
        } else {
            setShowButtons(false)
        }
    }, [currentUserId]);


    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getMaterialAsync(courseId));
        dispatch(getUpdatesAsync(courseId));
        getCurrentUSerID();
    }, []);
    const materials = useAppSelector(courseMaterial);
    const updates = useAppSelector(courseUpdates);

    async function getCurrentUSerID() {
        const response = await axios.get('/user/get-current-user-id');
        setCurrentUserId(response.data.currentUserId)
    }

    function handleOpenMaterialDialog() {
        setOpenMaterialDialog(true)
    }

    function handleOpenHomeworkDialog() {
        setOpenHomeworkDialog(true)
    }

    function handleOpenExamDialog() {
        setOpenExamDialog(true)
    }

    function handleOpenUpdateDialog() {
        setOpenUpdateDialog(true)
    }

    return (
        <div>
            <div className="bar">
                <CourseResponsiveAppBar></CourseResponsiveAppBar>
            </div>

            <div className="teacherCoursePageContent">

                <div className="title">
                    <Typography variant='h3' align='center'>{courseName}</Typography>
                    <Typography variant='h5' align='center'>{className}</Typography>
                </div>

                <>
                    {
                        showButtons &&
                        <div className="buttons">
                            <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={handleOpenMaterialDialog}>Material</Button>
                            <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={handleOpenHomeworkDialog}>Homework</Button>
                            <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={handleOpenExamDialog}>Exam</Button>
                            <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={handleOpenUpdateDialog}>Update</Button>

                            <NewMaterialDialog open={openMaterialDialog} setOpen={setOpenMaterialDialog} />
                            <NewHomeworkDialog open={openHomeworkDialog} setOpen={setOpenHomeworkDialog} />
                            <NewExamDialog open={openExamDialog} setOpen={setOpenExamDialog} />
                            <NewUpdateDialog open={openUpdateDialog} setOpen={setOpenUpdateDialog} />

                        </div>
                    }
                </>


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