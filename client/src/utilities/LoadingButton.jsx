import { Button, Spinner } from "react-bootstrap"

export default function LoadingButton({ isLoading, disabled = false, children, ...rest }) {
    return (
        <Button {...rest} disabled={isLoading || disabled}>
            {isLoading ? (
                <>
                    <Spinner animation="border" size="sm" />{" "}
                </>
            ) : (
                <></>
            )}
            {children}
        </Button>
    );
}
