import { configureStore } from "@reduxjs/toolkit"
import TrackerReducer from "./Tracker"
import { converterApi } from './api';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, TrackerReducer)

export const store = configureStore({
    reducer: {
        persistedReducer,
        [converterApi.reducerPath]: converterApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(converterApi.middleware)
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch