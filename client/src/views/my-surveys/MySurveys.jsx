import { selectAuthenticated } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAllSurveyQuery, useDeleteSurveyMutation } from "../../features/surveys/surveyApiSlice";
import { selectUser } from "../../features/auth/authSlice";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Alert, Modal, Button, Container, Row, Col, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../utilities/Loading";
import SurveysList from "./SurveysList";

const surveysPerPage = 5;

export default function MySurveys() {
    if (!useSelector(selectAuthenticated)) {
        return <Navigate to="/login" />;
    }

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page") ?? 1);
    const [maxPage, setMaxPage] = useState(1);
    const userId = useSelector(selectUser).id;
    const { data, error, isLoading, refetch: refetchSurveys } = useGetAllSurveyQuery({ filters: { userId, $skip: (currentPage - 1) * surveysPerPage, $limit: surveysPerPage, "$sort[createdAt]": -1 } }, { refetchOnMountOrArgChange: true });
    const [surveys, setSurveys] = useState([]);
    const [deleteSurvey, {}] = useDeleteSurveyMutation();
    const [toDelete, setToDelete] = useState(null);

    const handleDelete = async () => {
        if (toDelete === null) return;
        await deleteSurvey(toDelete.id);
        setToDelete(null);
        toast.success("Survey deleted successfully!")
        refetchSurveys();
    };

    useEffect(() => {
        if (data) {
            setSurveys(data.data);
            setMaxPage(Math.ceil(data.total / surveysPerPage));
        }
    }, [data]);

    if (error) {
        toast.error("An error occured while fetching data!");
        return <Navigate to="/" />;
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={8} className="mx-auto">
                        <h1 className="py-1 text-center">My surveys</h1>
                        <div className="d-flex">
                            <Link to="/new-survey" className="ms-auto my-2">
                                <Button variant="primary">
                                    <FontAwesomeIcon icon={faPlus} /> New survey
                                </Button>
                            </Link>
                        </div>
                        <Loading isLoading={isLoading}>
                            {surveys.length > 0 ? (
                                <SurveysList surveys={surveys} setToDelete={setToDelete} />
                            ) : (
                                <Alert variant="secondary" className="pb-0">
                                    <p>No survey to show.</p>
                                </Alert>
                            )}
                        </Loading>
                        {maxPage > 1 ? (
                            <div className="d-flex justify-content-center">
                                {[...Array(maxPage).keys()].map((_, i) => (
                                    <Link key={i} to={`/my-surveys?page=${i + 1}`}>
                                        <Button className="me-1" variant={currentPage === i + 1 ? "primary" : "outline-primary"}>{i + 1}</Button>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}
                    </Col>
                </Row>
            </Container>
            <Modal show={toDelete !== null} onHide={() => setToDelete(null)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete survey</Modal.Title>
                </Modal.Header>
                <Modal.Body>{toDelete !== null ? `Are you sure you want to survey "${toDelete.name}"?` : ""}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setToDelete(null)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
