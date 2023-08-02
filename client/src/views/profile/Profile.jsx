import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectAuthenticated, selectUser } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function Profile() {
    if (!useSelector(selectAuthenticated)) {
        return <Navigate to="/login" />;
    }
    
    const { email, fullname } = useSelector(selectUser);
    return (
        <div className="text-dark m-5">
            <p className="text-center">
                <FontAwesomeIcon icon={faUser} fontSize={50} />{" "}
            </p>
            <h3 className="fw-bold text-center m-1">{fullname}</h3>
            <p className="text-center">{email}</p>
        </div>
    );
}
