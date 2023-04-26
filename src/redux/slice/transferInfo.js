import { createSlice } from "@reduxjs/toolkit";

const transferInfoSlice = createSlice({
    name: 'transferInfo',
    initialState: {
        transferInfo: {}
    },
    reducers: {
        submitTransfer: (prevState, action) => {
            return {
                ...prevState,
                transferInfo: action.payload
            }
        },
        clearData: (prevState) => {
            return {
                ...prevState,
                transferInfo: {}
            }
        }
    }
})

export const transferInfoAction = transferInfoSlice.actions
export default transferInfoSlice.reducer