import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import axios from 'axios';

interface Material {
    id:number,
    title:string,
    description:string
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

interface Update {
    update: string
}

interface CourseData {
    material:Array<Material>,
    homeworks:Array<Homework>,
    exams:Array<Exam>,
    updates:Array<Update>,
    status: 'idle' | 'loading' | 'failed'
}

const initialState:CourseData = {
    material:[],
    homeworks: [],
    exams: [],
    updates: [],
    status: 'idle'
}

export const getMaterialAsync = createAsyncThunk (
    'courseData/fetchMaterial',
    async(courseId:any, thunkAPI) => {
        try{
            const response = await axios.post('/teacher/get-material-by-course-id', {courseId:courseId});
            const data = response.data;
            return data;
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }    
);

export const getHomeworksAsync = createAsyncThunk (
    'courseData/fetchHomeworks',
    async(courseId:any, thunkAPI) => {
        try{
            const response = await axios.post('/teacher/get-homeworks-by-course-id', {courseId:courseId});
            const data = response.data;
            return data;
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }    
);

export const getExamsAsync = createAsyncThunk (
    'courseData/fetchExams',
    async(params:any, thunkAPI) => {
        try{
            const {courseId, date} = params;
            const response = await axios.post('/teacher/get-exams-by-course-id', {courseId:courseId, date:date});
            const data = response.data;
            console.log(data)
            return data;
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }    
);

export const getUpdatesAsync = createAsyncThunk(
    'courseData/fetchUpdates',
    async (courseId:any, thunkAPI) => {
        try {
            const response = await axios.post('/teacher/get-updates-by-course-id', {courseId:courseId});
            const data = response.data;
            return data;
        } catch (error: any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const courseReducer = createSlice ({
    name: 'courseData',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getMaterialAsync.pending, (state:any) => {
            state.status = 'loading'
        })
        .addCase(getMaterialAsync.fulfilled, (state:any, action:any) => {
            state.status = 'idle';
            state.material = action.payload;
        })
        .addCase(getMaterialAsync.rejected, (state:any) => {
            state.status = 'failed'
        })
        .addCase(getHomeworksAsync.pending, (state:any) => {
            state.status = 'loading'
        })
        .addCase(getHomeworksAsync.fulfilled, (state:any, action:any) => {
            state.status = 'idle';
            state.homeworks = action.payload;
        })
        .addCase(getHomeworksAsync.rejected, (state:any) => {
            state.status = 'failed'
        })
        .addCase(getExamsAsync.pending, (state:any) => {
            state.status = 'loading'
        })
        .addCase(getExamsAsync.fulfilled, (state:any, action:any) => {
            state.status = 'idle';
            state.exams = action.payload;
        })
        .addCase(getExamsAsync.rejected, (state:any) => {
            state.status = 'failed'
        })
        .addCase(getUpdatesAsync.pending, (state:any) => {
            state.status = 'loading'
        })
        .addCase(getUpdatesAsync.fulfilled, (state:any, action:any) => {
            state.status = 'idle';
            state.updates = action.payload;
        })
        .addCase(getUpdatesAsync.rejected, (state:any) => {
            state.status = 'failed'
        })
    }
})

export const courseMaterial = (state:RootState) => state.courseData.material;
export const courseHomeworks = (state:RootState) => state.courseData.homeworks;
export const courseExams = (state:RootState) => state.courseData.exams;
export const courseUpdates = (state:RootState) => state.courseData.updates;
export default courseReducer.reducer;