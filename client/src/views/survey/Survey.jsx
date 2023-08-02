import { Navigate, useParams } from "react-router-dom";
import { useGetAllSurveyQuery } from "../../features/surveys/surveyApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../utilities/Loading";
import { Form, Button, ProgressBar, ButtonGroup, Container, Row, Col, Alert } from "react-bootstrap";
import { goToPage, nextPage, prevPage, selectAnswers, selectCanSubmit, selectCurrentPage, selectNextPageEnabled, selectPageCount, selectPrevPageEnabled, selectSurvey, selectUpcomingPage, setAnswer, startFill } from "../../features/surveys/surveyFillSlice";
import { useCreateResultMutation } from "../../features/results/resultApiSlice";
import { toast } from "react-toastify";
import LoadingButton from "../../utilities/LoadingButton";
import { current } from "@reduxjs/toolkit";

export default function Survey() {
    const dispatch = useDispatch();
    const { hash } = useParams();
    const { data: queryData, error: queryError, isLoading: isQueryLoading } = useGetAllSurveyQuery({ filters: { hash } }, { refetchOnMountOrArgChange: true });
    const [submitForm, { data: mutationData, error: mutationError, isLoading: isMutationLoading }] = useCreateResultMutation();
    const survey = useSelector(selectSurvey);
    const currentPage = useSelector(selectCurrentPage);
    const upcomingPage = useSelector(selectUpcomingPage);
    const pageCount = useSelector(selectPageCount);
    const nextPageEnabled = useSelector(selectNextPageEnabled);
    const prevPageEnabled = useSelector(selectPrevPageEnabled);
    const canSubmit = useSelector(selectCanSubmit);
    const answers = useSelector(selectAnswers);

    const handleSubmit = async () => {
        submitForm({ content: JSON.stringify(answers), surveyId: survey.id });
    };

    useEffect(() => {
        if (queryData) {
            if (queryData.total !== 1) {
                return;
            }
            const { data } = queryData;
            const survey = { id: data[0].id, name: data[0].name, pages: JSON.parse(data[0].content) };
            dispatch(startFill({ survey }));
        }
    }, [queryData]);

    useEffect(() => {
        if (mutationError) {
            toast.error("An error occured while sending the reply!");
        }
    }, [mutationError]);

    const NavButtons = () => {
        const components = [];
        for (let i = 0; i < pageCount; i++) {
            components.push(
                <Button key={i} variant={i === currentPage ? "primary" : i < upcomingPage ? "success" : "secondary"} disabled={i > upcomingPage} onClick={() => dispatch(goToPage(i))}>
                    {i + 1}
                </Button>
            );
        }
        return <ButtonGroup>{components}</ButtonGroup>;
    };

    if (queryError) {
        toast.error("An error occured while fetching data!");
        return <Navigate to="/" />;
    }
    if (queryData && queryData.total !== 1) {
        toast.error("The requested survey does not exist!");
        return <Navigate to="/" />;
    }
    if (mutationData) {
        toast.success("Reply sent successfully!");
        return <Navigate to="/" />;
    }
    return (
        <Container>
            <Row>
                <Col className="mx-auto" md={8} lg={6}>
                    <Loading isLoading={isQueryLoading}>
                        <h1 className="text-center">{survey.name}</h1>
                        {/* <NavButtons /> */}
                        <div className="my-3">
                            <Alert variant="light" className="mb-0 pb-0">
                                <h3 className="text-center">{survey.pages[currentPage].title}</h3>
                                {survey.pages[currentPage].questions.map((e, i) => (
                                    <Form.Group key={i} className="mb-3">
                                        <Form.Label>{e.question}</Form.Label>
                                        <Form.Control type="text" value={e.answer} onChange={(e) => dispatch(setAnswer({ questionId: i, answer: e.target.value }))} />
                                    </Form.Group>
                                ))}
                                <div className="d-flex justify-content-center">
                                    <Button variant="secondary" onClick={() => dispatch(prevPage())} disabled={!prevPageEnabled} className="me-1">
                                        Prev
                                    </Button>
                                    {currentPage < pageCount - 1 ? (
                                        <Button variant="secondary" onClick={() => dispatch(nextPage())} disabled={!nextPageEnabled}>
                                            Next
                                        </Button>
                                    ) : (
                                        <>
                                            <LoadingButton isLoading={isMutationLoading} onClick={handleSubmit} variant="primary" disabled={!canSubmit}>
                                                Submit
                                            </LoadingButton>
                                        </>
                                    )}
                                </div>
                                <div className="d-flex">
                                    <span className="mx-auto mt-3 mb-1">
                                        {currentPage + 1}/{pageCount}
                                    </span>
                                </div>
                            </Alert>
                            <ProgressBar animated now={(currentPage / (pageCount - 1)) * 100} style={{ height: "0.2em" }} />
                        </div>
                    </Loading>
                </Col>
            </Row>
        </Container>
    );
}
