import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {}
    },
    reducers: {
        submitProfile: (prevState, action) => {
            return {
                ...prevState,
                profile: action.payload
            }
        },
        editPhone: (prevState, action) => {
            return {
                ...prevState,
                profile: {...prevState.profile, noTelp: action.payload}
            }
        },
        clearData: (prevState) => {
            return {
                ...prevState,
                profile: {}
            }
        }
    }
})

export const profileAction = profileSlice.actions
export default profileSlice.reducer