import { textToSurvey } from "../../utilities/converterTextSurvey";
import { useEffect, useState } from "react";
import { useCreateSurveyMutation } from "../../features/surveys/surveyApiSlice";
import { toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../../features/auth/authSlice";
import SurveyEditor from "../../features/surveys/SurveyEditor";

export default function NewSurvey() {
    if (!useSelector(selectAuthenticated)) {
        return <Navigate to="/login" />;
    }

    const [editor, setEditor] = useState("");
    const [createSurvey, { data, error, isLoading }] = useCreateSurveyMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { survey, error } = textToSurvey(editor);
        if (error) {
            toast.error(error);
            return;
        }
        createSurvey({ name: survey.name, content: JSON.stringify(survey.pages) });
    };

    useEffect(() => {
        if(error) {
            toast.error("An error occured while creating the survey!")
        }
    }, [error])

    if(data){
        toast.success("Survey created successfuly!")
        return <Navigate to="/my-surveys"/>
    }

    return (
        <Container>
            <Row>
                <Col md={8} lg={6} className="mx-auto">
                    <h1 className="text-center py-1">New survey</h1>
                    <SurveyEditor editor={editor} setEditor={setEditor} handleSubmit={handleSubmit} edit={false} isLoading={isLoading} />
                </Col>
            </Row>
        </Container>
    );
}
