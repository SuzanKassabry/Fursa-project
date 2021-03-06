import Button from '@mui/material/Button';
import SchoolResponsiveAppBar from '../../components/header/AppBar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import './NewClass.scss';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { getSchoolClassesAsync, getSchoolStudentsAsync, getSchoolTeachersAsync, schoolClasses, schoolStudents, schoolTeachers } from '../../../../app/reducers/school/SchoolSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function NewClass() {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getSchoolClassesAsync());
        dispatch(getSchoolStudentsAsync());
        dispatch(getSchoolTeachersAsync());
    }, []);
    const students = useAppSelector(schoolStudents);
    const teachers = useAppSelector(schoolTeachers);

    const [className, setClassName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [teacherId, setTeacherId] = useState(-1);
    const [selectedStudents, setSelectedStudents] = useState([]);

    function handleClassName(ev: any) {
        setClassName(ev.target.value)
    }

    function handleTeacherName(ev: any, value: any) {
        setTeacherName(value.firstName.concat(' ', value.lastName))
        setTeacherId(value.id);
        console.log('teacher id:', value.id);
    }

    function handleStudent(ev: any, value: any) {
        setSelectedStudents(value);
    }

    function addNewClass() {
        axios.post('school/add-new-class', { className: className, teacherId: teacherId })
            .then(data => {
                const classId = data.data.insertId;
                //edit students
                selectedStudents.forEach( (student) => {
                    const {id} = student;
                    axios.post('/school/add-students-to-class', {'classId': classId, 'studentId':id})
                })
            }).catch(err => {
                console.error(err)
            })
    }

    return (
        <div>

            <div className="bar">
                <SchoolResponsiveAppBar></SchoolResponsiveAppBar>
            </div>

            <div className="newClassPageContent">
                <Link to='../classes'>
                    <Button className='createClassBtn' variant="contained" size='small' onClick={addNewClass}>
                        Submit
                    </Button>
                </Link>


                <div className="newClass">
                    <div className='newClass__instruction'>
                        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                            Fill in the new class info to add it to your system...
                        </Typography>
                    </div>
                    <div className="newClass__section">
                        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                            Class name:
                        </Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="Class name required"
                            size='small'
                            className='inputField'
                            onKeyUp={handleClassName}
                        />
                    </div>

                    <div className="newClass__section">
                        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                            Teacher:
                        </Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={teachers}
                            getOptionLabel={(option) => option.firstName.concat(' ', option.lastName)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="select or serch for teacher" />}
                            size="small"
                            className='inputField'
                            isOptionEqualToValue={(option, value) => option.teacherID === value.teacherID}
                            onChange={handleTeacherName}
                        />
                    </div>

                    <div className="newClass__section">
                        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                            select the students:
                        </Typography>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={students}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.firstName.concat(' ', option.lastName)}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.firstName.concat(' ', option.lastName)}
                                </li>
                            )}
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} label="select or search students" />
                            )}
                            size="small"
                            className='inputField'
                            isOptionEqualToValue={(option, value) => option.studentID === value.studentID}
                            onChange={handleStudent}
                        />
                    </div>
                </div>

            </div>



        </div>
    );
}