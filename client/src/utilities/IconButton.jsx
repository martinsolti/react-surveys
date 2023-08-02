import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton({ icon, ...rest }) {
    return (
        <Button {...rest} size="sm" className="rounded-circle ms-1">
            <FontAwesomeIcon icon={icon} />
        </Button>
    );
}
