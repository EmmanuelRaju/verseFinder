import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eng: {
        reference: '',
        verse: ''
    },
    tel: {
        reference: '',
        verse: ''
    },
    book: ''
}

const verseSlice = createSlice({
    name: 'verse',
    initialState,
    reducers: {
        eng: (state, action) => {
            state.eng = action.payload
        },
        tel: (state, action) => {
            state.tel = action.payload
        },
        book: (state, action) => {
            state.book = action.payload
        }
    }
})

export const { eng, tel, book } = verseSlice.actions

export default verseSlice.reducer