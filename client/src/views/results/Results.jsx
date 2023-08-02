import { Navigate, useParams } from "react-router-dom";
import { useGetOneSurveyQuery } from "../../features/surveys/surveyApiSlice";
import { useGetAllResultQuery } from "../../features/results/resultApiSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Table, Container, Row, Col, Alert } from "react-bootstrap";
import Loading from "../../utilities/Loading";

export default function Results() {
    const { id: surveyId } = useParams();
    const { data: surveyData, error: surveyError, isLoading: isSurveyLoading } = useGetOneSurveyQuery(surveyId, { refetchOnMountOrArgChange: true });
    const { data: resultsData, error: resultsError, isLoading: isResultsLoading } = useGetAllResultQuery({ filters: { surveyId } }, { refetchOnMountOrArgChange: true });
    const [survey, setSurvey] = useState({ name: "", pages: [{ questions: [] }] });

    useEffect(() => {
        if (surveyData && resultsData) {
            setSurvey({ name: surveyData.name, pages: JSON.parse(surveyData.content) });
        }
    }, [surveyData, resultsData]);

    if (surveyError || resultsError) {
        toast.error("An error occured while fetching data!");
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <Row>
                <Col md={8} className="mx-auto">
                    <Loading isLoading={isSurveyLoading || isResultsLoading}>
                        <h1 className="py-1 text-center">{survey.name}</h1>
                        {!resultsData || resultsData.data.length === 0 ? (
                            <Alert variant="secondary" className="pb-0">
                                <p>No result to show.</p>
                            </Alert>
                        ) : (
                            <Table bordered>
                                <thead></thead>
                                <tbody>
                                    {survey.pages.map((page, i) =>
                                        page.questions.map((question, j) => (
                                            <tr key={j}>
                                                <td>
                                                    <div>
                                                        <p className="fw-bold">{question}</p>
                                                    </div>
                                                    <Table bordered>
                                                        <thead></thead>
                                                        <tbody>
                                                            {resultsData.data.map((result, k) => (
                                                                <tr key={k}>
                                                                    <td>
                                                                        <p className="m-0">{JSON.parse(result.content)[i][j]}</p>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        )}
                    </Loading>
                </Col>
            </Row>
        </Container>
    );
}
