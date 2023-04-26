import { combineReducers } from "@reduxjs/toolkit";

import userDataSlice from "./userData"
import profileSlice from "./profile"
import transferInfoSlice from "./transferInfo"
import transactionStatusSlice from "./transactionStatus";

const reducers = combineReducers({
    userData: userDataSlice,
    profile: profileSlice,
    transferInfo: transferInfoSlice,
    transactionStatus: transactionStatusSlice,
})

export default reducers