import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
    toast: {
        show: boolean,
        message: string
    }
}

const initialState: InitialState = {
    toast: {
        show: false,
        message: ''
    }
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        showToast: (state, action) => {
            state.toast = {
                show: true,
                message: action.payload
            }
        },
        hideToast: (state) => {
            state.toast = {
                show: false,
                message: ''
            }
        }
    }
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer