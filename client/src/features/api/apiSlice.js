import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { logOut, setCredentials } from "../auth/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3030",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers

    }
})

export const apiSlice = createApi({
    baseQuery,
    endpoints: builder => ({})
})