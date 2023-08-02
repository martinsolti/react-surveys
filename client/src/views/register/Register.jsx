import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";


export default function Register () {
    if (useSelector(selectAuthenticated)) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <Row>
                <Col md={8} lg={6} className="mx-auto">
                    <h1 className="py-1 text-center">Register</h1>
                    <RegisterForm />
                </Col>
            </Row>
        </Container>
    )
}