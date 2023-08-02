import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    survey: { name: "", pages: [{ questions: [] }] },
    currentPage: 0,
    upcomingPage: 0,
    pageCount: 1,
    canSubmit: false,
};

const surveyFillSlice = createSlice({
    name: "surveyFill",
    initialState,
    reducers: {
        startFill: (state, { payload }) => {
            let { survey } = payload;
            survey.pages = survey.pages.map((e) => ({ title: e.title, questions: e.questions.map((e) => ({ question: e, answer: "" })) }));
            state.survey = survey;
            state.currentPage = 0;
            state.upcomingPage = 0;
            state.pageCount = survey.pages.length;
        },
        setAnswer: (state, { payload }) => {
            const { questionId, answer } = payload;
            state.survey.pages[state.currentPage].questions[questionId].answer = answer;
            for (let i = 0; i < state.pageCount; i++) {
                const page = state.survey.pages[i];
                const done = page.questions.reduce((p, c) => p && c.answer !== "", true);
                if (!done) {
                    state.upcomingPage = i;
                    state.canSubmit = false;
                    break;
                }
                state.upcomingPage = state.pageCount;
                state.canSubmit = true;
            }
        },
        nextPage: (state) => {
            if (state.currentPage < state.upcomingPage && state.currentPage < state.pageCount - 1) {
                state.currentPage++;
            }
        },
        prevPage: (state) => {
            if (state.currentPage > 0) {
                state.currentPage--;
            }
        },
        goToPage: (state, { payload }) => {
            if (payload <= state.upcomingPage) {
                state.currentPage = payload;
            }
        },
    },
});

export const surveyFillReducer = surveyFillSlice.reducer;

export const { startFill, setAnswer, nextPage, prevPage, goToPage } = surveyFillSlice.actions;

export const selectSurvey = (state) => state.surveyFill.survey;
export const selectCurrentPage = (state) => state.surveyFill.currentPage;
export const selectUpcomingPage = (state) => state.surveyFill.upcomingPage;
export const selectPageCount = (state) => state.surveyFill.pageCount;
export const selectNextPageEnabled = (state) => state.surveyFill.currentPage < state.surveyFill.upcomingPage && state.surveyFill.currentPage < state.surveyFill.pageCount - 1;
export const selectPrevPageEnabled = (state) => state.surveyFill.currentPage > 0;
export const selectCanSubmit = (state) => state.surveyFill.canSubmit;
export const selectAnswers = (state) => state.surveyFill.survey.pages.map(page => page.questions.map(question => question.answer))
