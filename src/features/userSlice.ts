import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser, RelationshipStatus } from "../interfaces/IUser"
import { uiActions } from "./uiSlice"

type InitialState = {
    userList: IUser[],
    userInput: IUser,
    relationshipStatusList: RelationshipStatus[]
}

type ValidationResponse = {
    valid: boolean,
    message: string
}

const initialState: InitialState = {
    userList: [],
    userInput: {
        name: '',
        eKTPNum: '',
        address: '',
        job: '',
        dateOfBirth: null,
        phoneNum: [],
        familyMemberList: []
    },
    relationshipStatusList: ['brother', 'sister', 'parent', 'child']
}

const validateUser = (user: IUser): ValidationResponse => {
    const response = { valid: false, message: '' }
    if (user.name.trim() === '') {
        response.message = 'Please input Name'
        return response
    }
    if (user.address.trim() === '') {
        response.message = 'Please input Address'
        return response
    }
    if (user.eKTPNum.trim() === '') {
        response.message = 'Please input eKTP Number'
        return response
    }
    if (user.job.trim() === '') {
        response.message = 'Please input Job'
        return response
    }
    if (user.dateOfBirth === null) {
        response.message = 'Please input Date of Birth'
        return response
    }
    if (user.phoneNum.length < 1) {
        response.message = 'Please input at least one Phone Number'
        return response
    }
    if (user.familyMemberList.length < 1) {
        response.message = 'Please input at least on Family Member'
        return response
    }
    response.valid = true
    return response
}

export const addUser = createAsyncThunk(
    'user/add',
    (arg, thunkAPI) => {
        const { userInput } = (thunkAPI.getState() as any).user
        const { valid, message } = validateUser(userInput)
        if (valid) {
            return userInput
        }
        thunkAPI.dispatch(uiActions.showToast(message))
        return thunkAPI.rejectWithValue(message)
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        initUser: (state) => {
            state.userInput = {
                name: '',
                eKTPNum: '',
                address: '',
                job: '',
                dateOfBirth: null,
                phoneNum: [],
                familyMemberList: []
            }
        },
        setUserInput: (state, action: PayloadAction<{ key: keyof IUser, value: any }>) => {
            state.userInput[action.payload.key] = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(addUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.userList.push(action.payload)
            }
        })
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer