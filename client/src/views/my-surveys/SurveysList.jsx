import { Table } from "react-bootstrap";
import { faMessage, faCopy, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import IconButton from "../../utilities/IconButton";

export default function SurveysList({ surveys, setToDelete }) {
    return (
        <Table bordered hover>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex">
                            <span>Name</span>
                            <span className="ms-auto">Actions</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {surveys.map(({ id, name, hash }, i) => (
                    <tr key={i}>
                        <td>
                            <div className="d-flex">
                                <span>{name}</span>
                                <div className="ms-auto d-flex">
                                    <Link to={`/results/${id}`}>
                                        <IconButton variant="primary" icon={faMessage} />
                                    </Link>
                                    <CopyToClipboard text={hash} onCopy={() => toast.success("Copied to clipboard")}>
                                        <IconButton variant="primary" icon={faCopy} />
                                    </CopyToClipboard>
                                    <Link to={`/edit-survey/${id}`}>
                                        <IconButton variant="secondary" icon={faPen} />
                                    </Link>
                                    <IconButton variant="danger" icon={faTrash} onClick={() => setToDelete({ id, name })} />
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
