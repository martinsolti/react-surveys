import { Form, Button, Spinner } from "react-bootstrap";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify"
import LoadingButton from "../../utilities/LoadingButton";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { data, error, isLoading }] = useLoginMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    useEffect(() => {
        if (error) {
            toast.error("Login failed!")
        }
    }, [error]);

    if (data) {
        dispatch(setCredentials({ user: data.user, token: data.accessToken }));
        toast.success("Login successful!")
        return <Navigate to="/" />;
    }

    return (
        <Form className="my-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div className="d-flex justify-content-center">
                <LoadingButton variant="primary" isLoading={isLoading} type="submit">Login</LoadingButton>
            </div>
        </Form>
    );
}
