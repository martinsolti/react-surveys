import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "./menu/Menu";

export default function Layout() {
    return (
        <>
            {<Menu />}
            <Container className="my-2">
                {<Outlet />}
            </Container>
        </>
    );
}
