import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import textReducer from '../features/text/textSlice';
import courseCardReducer from './reducers/student/CourseCardSlice';
import teacherCourseCardReducer from './reducers/teacher/CourseCardSlice';
import schoolClassCardReducer from './reducers/school/ClassCardSlice';
import classReducer from './reducers/school/ClassDetailsSlice';
import schoolReducer from './reducers/school/SchoolSlice';
import courseReducer from './reducers/teacher/CourseDataSlice';
import studentCourseReducer from './reducers/student/CourseDataSlice';
import classDataReducer from './reducers/student/ClassDataSlice';
import teacherReducer from './reducers/teacher/TeacherSlice';
import teacherClassDataReducer from './reducers/teacher/ClassDataSlice';
import ClassCardSlice from './reducers/teacher/ClassCardSlice';

export const store = configureStore({
  reducer: {
    courseCard: courseCardReducer, 
    teacherCourseCard: teacherCourseCardReducer,
    schoolClassCard: schoolClassCardReducer,
    classDetails: classReducer,
    schoolData: schoolReducer,
    courseData: courseReducer,
    studentCourseData: studentCourseReducer,
    classData: classDataReducer,
    teacherData: teacherReducer,
    teacherClassData: teacherClassDataReducer,
    classCard: ClassCardSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
