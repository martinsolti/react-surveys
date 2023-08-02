import { Authenticated, Unauthenticated } from "../../../features/auth/Authenticated";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Menu() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className="navbar-brand" to="/">
                    Surveys
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Unauthenticated>
                            <Link className="nav-link" to="/register">
                                Register
                            </Link>
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </Unauthenticated>
                        <Authenticated>
                            <Link className="nav-link" to="/my-surveys">
                                My surveys
                            </Link>
                            {/* <Link className="nav-link" to="/results">
                                Results
                            </Link> */}
                            <Link className="nav-link" to="/profile">
                                Profile
                            </Link>
                            <Link className="nav-link" to="/logout">
                                Logout
                            </Link>
                        </Authenticated>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
