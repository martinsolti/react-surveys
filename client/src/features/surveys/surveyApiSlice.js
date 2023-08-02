import { apiSlice } from "../api/apiSlice";

export const surveyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSurvey: builder.query({
            query: ({ filters }) => {
                let query = "";
                Object.keys(filters).forEach((key, i) => {
                    query += `${i === 0 ? "?" : "&"}${key}=${filters[key]}`;
                });
                return { url: `/surveys${query}` };
            },
        }),
        getOneSurvey: builder.query({
            query: (id) => {
                return { url: `/surveys/${id}` };
            },
        }),
        modifySurvey: builder.mutation({
            query: ({id, body}) => {
                return {
                    url: `/surveys/${id}`,
                    method: "PATCH",
                    body,
                };
            },
        }),
        createSurvey: builder.mutation({
            query: (body) => ({
                url: "/surveys",
                method: "POST",
                body,
            }),
        }),
        deleteSurvey: builder.mutation({
            query: (id) => ({
                url: `/surveys/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetAllSurveyQuery, useGetOneSurveyQuery, useModifySurveyMutation, useCreateSurveyMutation, useDeleteSurveyMutation } = surveyApiSlice;
