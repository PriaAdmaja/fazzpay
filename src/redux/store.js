import { configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore, PERSIST, REGISTER, REHYDRATE, FLUSH, PAUSE, PURGE} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import reducer from "./slice"

const persistConfig = {
    key: "fazzpay",
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) => {
        return defaultMiddleware({
            serializableCheck: {
                ignoreActions: [PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER ]
            },
            thunk: false
        })
    }
})

export const persistor = persistStore(store)
export default store