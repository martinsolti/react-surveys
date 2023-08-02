import { Navigate, useParams } from "react-router-dom";
import { useGetOneSurveyQuery, useModifySurveyMutation } from "../../features/surveys/surveyApiSlice";
import { useEffect, useState } from "react";
import { surveyToText, textToSurvey } from "../../utilities/converterTextSurvey";
import { toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap"
import { useGetAllResultQuery } from "../../features/results/resultApiSlice";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../../features/auth/authSlice";
import Loading from "../../utilities/Loading";
import SurveyEditor from "../../features/surveys/SurveyEditor";

export default function EditSurvey() {
    if (!useSelector(selectAuthenticated)) {
        return <Navigate to="/login" />;
    }

    const { id: surveyId } = useParams();
    const { data: surveyData, error: surveyError, isLoading: isSurveyLoading } = useGetOneSurveyQuery(surveyId, {refetchOnMountOrArgChange: true});
    const { data: resultsData, error: resultsError, isLoading: isResultsLoading} = useGetAllResultQuery({filters: {surveyId}})
    const [editSurvey, { data: mutationData, error: mutationError, isLoading: isMutationLoading }] = useModifySurveyMutation();
    const [editor, setEditor] = useState("");
    const [canEdit, setCanEdit] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { survey, error } = textToSurvey(editor);
        if (error) {
            toast.error(error)
            return;
        }
        editSurvey({id: surveyId, body: { name: survey.name, content: JSON.stringify(survey.pages) }})
    };

    useEffect(() => {
        if (surveyData && resultsData) {
            const survey = { name: surveyData.name, pages: JSON.parse(surveyData.content) };
            setEditor(surveyToText(survey));
            setCanEdit(resultsData.total === 0);
        }
    }, [surveyData, resultsData]);

    useEffect(() => {
        if(mutationError){
            toast.error("An error occured while updating the survey!")
        }
    }, [mutationError])

    if (surveyError || resultsError) {
        toast.error("An error occured while fetching data!")
        return <Navigate to="/"/>;
    }
    if (mutationData){
        toast.success("Survey updated successfully!")
        return <Navigate to="/my-surveys"/>;
    }
    return (
        <Container>
            <Row>
                <Col md={8} lg={6} className="mx-auto">
                    <h1 className="text-center py-1">Edit survey</h1>
                    <Loading isLoading={isSurveyLoading || isResultsLoading}>
                        <SurveyEditor editor={editor} setEditor={setEditor} canEdit={canEdit} handleSubmit={handleSubmit} isLoading={isMutationLoading} edit={true} />
                    </Loading>
                </Col>
            </Row>
        </Container>
    );
}
