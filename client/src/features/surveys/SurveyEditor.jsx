import { Alert, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"
import LoadingButton from "../../utilities/LoadingButton";

export default function SurveyEditor({ editor, setEditor, handleSubmit, isLoading, canEdit = true, edit }) {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" rows={10} onChange={(e) => setEditor(e.target.value)} defaultValue={editor} />
            </Form.Group>
            {canEdit ? (
                <div className="d-flex justify-content-center">
                    {edit ? (
                        <>
                            <Link to="/my-surveys"><Button variant="secondary" className="me-1">Cancel</Button></Link>
                            <LoadingButton variant="primary" type="submit" disabled={isLoading}>
                                Save
                            </LoadingButton>
                        </>
                    ) : (
                        <LoadingButton variant="primary" type="submit" disabled={isLoading}>
                            Add
                        </LoadingButton>
                    )}
                </div>
            ) : (
                <Alert variant="secondary" className="pb-0">
                    <p>This survey can not be edited - it already has replies</p>
                </Alert>
            )}
        </Form>
    );
}
