import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import { authReducer } from '../features/auth/authSlice'
import { surveyFillReducer } from '../features/surveys/surveyFillSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        surveyFill: surveyFillReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})
