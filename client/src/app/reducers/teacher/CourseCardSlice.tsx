import { RootState } from "../../store";
import {createSlice} from '@reduxjs/toolkit';

interface TeacherCourseCardState {
    id:number;
    course_name:string;
    class_id: number;
    class_name:string;
    teacher_id: string;
}

const initialState: TeacherCourseCardState = {
    id: -1,
    course_name:'',
    class_id: -1,
    class_name:'',
    teacher_id:''
}

export const TeacherCourseCardSlice = createSlice({
    name: 'teacherCourseCard',
    initialState,
    reducers: {
        select: (state, action) => {
            state.course_name = action.payload[0];
            state.class_name = action.payload[1];
            state.id = action.payload[2];
            state.class_id = action.payload[3];
            state.teacher_id = action.payload[4];
        }
    }
});

export const {select} = TeacherCourseCardSlice.actions;
export const selectedCourseName = (state: RootState) => state.teacherCourseCard.course_name;
export const selectedClassName = (state: RootState) => state.teacherCourseCard.class_name;
export const selectedCourseId = (state:RootState) => state.teacherCourseCard.id;
export const selectedClassId = (state:RootState) => state.teacherCourseCard.class_id;
export const selectedCourseTeacherId = (state:RootState) => state.teacherCourseCard.teacher_id;
export default TeacherCourseCardSlice.reducer;