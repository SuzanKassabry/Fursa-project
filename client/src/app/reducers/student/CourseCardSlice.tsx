import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface CourseCardState {
    id: number;
    courseName:string;
    teacherName:string;
}

const initialState: CourseCardState = {
    id: -1,
    courseName:'',
    teacherName:''
};

export const CourseCardSlice = createSlice({
    name: 'courseCard',
    initialState,
    reducers: {
        select: (state, action) => {
            state.courseName = action.payload[0];
            state.teacherName = action.payload[1];
            state.id = action.payload[2];
        }
    }
});

export const {select} = CourseCardSlice.actions;
export const selectedCourseName = (state: RootState) => state.courseCard.courseName;
export const selectedTeacherName = (state:RootState) => state.courseCard.teacherName;
export const selectedCourseId = (state:RootState) => state.courseCard.id;
export default CourseCardSlice.reducer;