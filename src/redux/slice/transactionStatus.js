import { createSlice } from "@reduxjs/toolkit";

const transactionStatusSlice = createSlice({
    name: 'transactionStatus',
    initialState: {
        transactionInfo: {}
    },
    reducers: {
        submitData: (prevState, action) => {
            return {
                ...prevState,
                transactionInfo: action.payload
            }
        },
        clearData: (prevState) => {
            return {
                ...prevState,
                transactionInfo: {}
            }
        }
    }
})

export const transactionStatusAction = transactionStatusSlice.actions
export default transactionStatusSlice.reducer