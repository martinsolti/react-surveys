export const textToSurvey = (text) => {
    const lines = text.split("\n");
    const blocks = [];
    let currentBlock = [];

    for (const line of lines) {
        if (line.trim() !== "") {
            currentBlock.push(line.trim());
        } else if (currentBlock.length > 0) {
            blocks.push(currentBlock);
            currentBlock = [];
        }
    }

    if (currentBlock.length > 0) {
        blocks.push(currentBlock);
    }

    const survey = {};

    if (blocks.length < 2) {
        return {survey: null, error: "At least 1 page is required"}
    }

    if (blocks[0].length > 1) {
        return {survey: null, error: "Survey title has to be 1 line"}
    }

    survey.name = blocks[0][0];

    const pages = [];
    for (let i = 1; i < blocks.length; i++) {
        const pageBlock = blocks[i];
        if (pageBlock.length < 2) return {survey: null, error: "Every page has to have at least 1 question"}
        const page = {};
        page.title = pageBlock[0];
        const questions = [];
        for (let j = 1; j < pageBlock.length; j++) {
            questions.push(pageBlock[j]);
        }
        page.questions = questions;
        pages.push(page);
    }
    survey.pages = pages
    return {survey, error: null};
};

export const surveyToText = (survey) => {
    let string = survey.name
    survey.pages.forEach(page => {
        string += `\n\n${page.title}`
        page.questions.forEach(question => {
            string += `\n${question}`
        })
    })
    return string
}