import { combineReducers } from "@reduxjs/toolkit";

import userDataSlice from "./userData"

const reducers = combineReducers({
    userData: userDataSlice,
})

export default reducers