import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface ClassCardState {
    id: number;
    className:string;
}

const initialState: ClassCardState = {
    id: -1,
    className:'',
};

export const ClassCardSlice = createSlice({
    name: 'classCard',
    initialState,
    reducers: {
        select: (state, action) => {
            state.className = action.payload[0];
            state.id = action.payload[1];
        }
    }
});

export const {select} = ClassCardSlice.actions;
export const selectedClassName = (state: RootState) => state.classCard.className;
export const selectedClassId = (state:RootState) => state.classCard.id;
export default ClassCardSlice.reducer;