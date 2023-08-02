import { Spinner } from "react-bootstrap";

export default function Loading({ isLoading, children }) {
    return (
        <>
            {isLoading ? (
                <div className="d-flex my-3">
                    <Spinner className="mx-auto" variant="secondary"/>
                </div>
            ) : (
                <>{children}</>
            )}
        </>
    );
}
