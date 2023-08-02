import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
    const dispatch = useDispatch();
    dispatch(logOut());
    toast.success("Logout successful!")
    return <Navigate to="/"/>;
}
