import { combineReducers } from "@reduxjs/toolkit";

import userDataSlice from "./userData"
import profileSlice from "./profile"

const reducers = combineReducers({
    userData: userDataSlice,
    profile: profileSlice,
})

export default reducers