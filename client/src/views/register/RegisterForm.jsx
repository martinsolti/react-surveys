import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "../../utilities/LoadingButton";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [register, { data, error, isLoading }] = useRegisterMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        register({ email, password, fullname: name });
    };

    useEffect(() => {
        if (error) {
            toast.error("Registration failed!");
        }
    }, [error]);

    if (data) {
        toast.success("Registration successful!");
        return <Navigate to="/login" />;
    }

    return (
        <Form className="my-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div className="d-flex justify-content-center">
                <LoadingButton type="submit" variant="primary" isLoading={isLoading}>Register</LoadingButton>
            </div>
        </Form>
    );
}
