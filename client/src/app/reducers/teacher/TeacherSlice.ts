import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import axios from 'axios';

interface Course {
    id: number,
    name: string,
    class_name: string,
    class_id: number,
    teacher_id:string
}

interface Class {
    id: number,
    class_name: string
}

interface TeacherDetails {
    courses: Array<Course>,
    classes: Array<Class>,
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TeacherDetails = {
    courses: [],
    classes: [],
    status: 'idle'
};

export const getCoursesAsync = createAsyncThunk(
    'teacherData/fetchCourses',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/teacher/get-courses-by-teacher-id');
            const data = response.data;
            return data;
        } catch (error: any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const getClassesAsync = createAsyncThunk(
    'teacherData/fetchClasses',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/teacher/get-classes-by-teacher-id');
            const data = response.data;
            return data;
        } catch (error: any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const teacherReducer = createSlice ({
    name: 'teacherData',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getCoursesAsync.pending, (state: any) => {
            state.status = 'loading';
        })
        .addCase(getCoursesAsync.fulfilled, (state: any, action: any) => {
            state.status = 'idle';
            state.courses = action.payload;
        })
        .addCase(getCoursesAsync.rejected, (state: any) => {
            state.status = 'failed';
        })
        .addCase(getClassesAsync.pending, (state: any) => {
            state.status = 'loading';
        })
        .addCase(getClassesAsync.fulfilled, (state: any, action: any) => {
            state.status = 'idle';
            state.classes = action.payload;
        })
        .addCase(getClassesAsync.rejected, (state: any) => {
            state.status = 'failed';
        })
    }
})

export const teacherCourses = (state: RootState) => state.teacherData.courses;
export const teacherClasses = (state: RootState) => state.teacherData.classes;
export default teacherReducer.reducer;