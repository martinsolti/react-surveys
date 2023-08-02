import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";

export default function Login () {
    if (useSelector(selectAuthenticated)) {
        return <Navigate to="/" />;
    }
    
    return (
        <Container>
            <Row>
                <Col md={8} lg={6} className="mx-auto">
                    <h1 className="py-1 text-center">Login</h1>
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    )
}