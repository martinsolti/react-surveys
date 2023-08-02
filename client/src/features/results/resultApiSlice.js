import { apiSlice } from "../api/apiSlice";

export const resultApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createResult: builder.mutation({
            query: (body) => {
                return {
                    url: "/results",
                    method: "POST",
                    body,
                };
            },
        }),
        getAllResult: builder.query({
            query: ({ filters }) => {
                let query = "";
                Object.keys(filters).forEach((key, i) => {
                    query += `${i === 0 ? "?" : "&"}${key}=${filters[key]}`;
                });
                return { url: `/results${query}` };
            },
        })
    }),
});

export const { useCreateResultMutation, useGetAllResultQuery } = resultApiSlice;
