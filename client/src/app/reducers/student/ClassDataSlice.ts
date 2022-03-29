import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import axios from 'axios';

interface Course {
    id: number,
    name: string,
    firstName: string,
    lastName: string
}

interface Update {
    update: string
}

interface Homework {
    id:number,
    date:string,
    name:string,
    description:string
}

interface Exam {
    id:number,
    name:string,
    examMaterial:String
}

interface ClassDetails {
    courses: Array<Course>,
    updates: Array<Update>,
    homeworks: Array<Homework>,
    exams: Array<Exam>,
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ClassDetails = {
    courses: [],
    updates: [],
    homeworks: [],
    exams: [],
    status: 'idle'
};

export const getCoursesAsync = createAsyncThunk(
    'classData/fetchCourses',
    async (classId:any, thunkAPI) => {
        try {
            const response = await axios.post('/student/get-courses-by-class-id', {classId:classId});
            const data = response.data;
            return data;
        } catch (error: any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const getUpdatesAsync = createAsyncThunk(
    'classData/fetchUpdates',
    async (classId:any, thunkAPI) => {
        try {
            const response = await axios.post('/student/get-updates-by-class-id', {classId:classId});
            const data = response.data;
            return data;
        } catch (error: any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const getHomeworksAsync = createAsyncThunk(
    'classData/fetchHomeworks',
    async (classId:any, thunkAPI) => {
        try {
            const response = await axios.post('/student/get-homeworks-by-class-id', {classId:classId});
            const data = response.data;
            return data;
        } catch (error: any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const getExamsAsync = createAsyncThunk (
    'classData/fetchExams',
    async(params:any, thunkAPI) => {
        try{
            const {classId, date} = params;
            const response = await axios.post('/student/get-exams-by-class-id', {classId:classId, date:date});
            const data = response.data;
            return data;
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }    
);

export const classDataReducer = createSlice({
    name: 'classData',
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
            .addCase(getUpdatesAsync.pending, (state: any) => {
                state.status = 'loading';
            })
            .addCase(getUpdatesAsync.fulfilled, (state: any, action: any) => {
                state.status = 'idle';
                state.updates = action.payload;
            })
            .addCase(getUpdatesAsync.rejected, (state: any) => {
                state.status = 'failed';
            })
            .addCase(getHomeworksAsync.pending, (state: any) => {
                state.status = 'loading';
            })
            .addCase(getHomeworksAsync.fulfilled, (state: any, action: any) => {
                state.status = 'idle';
                state.homeworks = action.payload;
            })
            .addCase(getHomeworksAsync.rejected, (state: any) => {
                state.status = 'failed';
            })
            .addCase(getExamsAsync.pending, (state: any) => {
                state.status = 'loading';
            })
            .addCase(getExamsAsync.fulfilled, (state: any, action: any) => {
                state.status = 'idle';
                state.exams = action.payload;
            })
            .addCase(getExamsAsync.rejected, (state: any) => {
                state.status = 'failed';
            })
    }
});

export const classCourses = (state: RootState) => state.classData.courses;
export const classUpdates = (state: RootState) => state.classData.updates;
export const classHomeworks = (state: RootState) => state.classData.homeworks;
export const classExams = (state: RootState) => state.classData.exams;
export default classDataReducer.reducer;