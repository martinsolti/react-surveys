import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/authentication",
                method: "POST",
                body: {...body, strategy: "local"},
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
