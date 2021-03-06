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
    course:string,
    description:string
}

interface Exam {
    id:number,
    course:string,
    examMaterial:String
}

interface Update {
    update: string
}

interface CourseData {
    material:Array<Material>,
    homeworks:Array<Homework>,
    exams:Array<Exam>,
    updates: Array<Update>,
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
            const response = await axios.post('/student/get-material-by-course-id', {courseId:courseId});
            const data = response.data;
            return data;
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }    
);

export const getHomeworksAsync = createAsyncThunk (
    'courseData/fetchHomeworks',
    async(classId:any, thunkAPI) => {
        try{
            const response = await axios.post('/student/get-homeworks-by-course-id', {classId:classId});
            const data = response.data;
            return data;
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }    
);

export const getExamsAsync = createAsyncThunk (
    'courseData/fetchExams',
    async(_, thunkAPI) => {
        try{
            const response = await axios.get('http://localhost:3004/exams');
            const data = response.data;
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
            const response = await axios.post('/student/get-updates-by-course-id', {courseId:courseId});
            const data = response.data;
            return data;
        } catch (error: any) {
            thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const studentCourseReducer = createSlice ({
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

export const courseMaterial = (state:RootState) => state.studentCourseData.material;
export const courseHomeworks = (state:RootState) => state.studentCourseData.homeworks;
export const courseExams = (state:RootState) => state.studentCourseData.exams;
export const courseUpdates = (state:RootState) => state.studentCourseData.updates;
export default studentCourseReducer.reducer;