import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        id: null,
        token: null,
        pin: null
    },
    reducers: {
        submitToken: (prevState, action) => {
            return {
                ...prevState,
                token: action.payload,
            };
        },
        submitId: (prevState, action) => {
            return {
                ...prevState,
                id: action.payload,
            };
        },
        submitPin: (prevState, action) => {
            return {
                ...prevState,
                pin: action.payload,
            };
        },
        clearData: (prevState) => {
            return {
                ...prevState,
                id: null,
                token: null,
                pin: null
            }
        }
    }
})

export const userDataAction = userDataSlice.actions
export default userDataSlice.reducer