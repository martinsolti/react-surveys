import { selectAuthenticated } from "./authSlice";
import { useSelector } from "react-redux";

export function Authenticated({children}) {
    const authenticated = useSelector(selectAuthenticated)
    return authenticated ? <>{children}</> : <></>
}

export function Unauthenticated({children}) {
    const authenticated = useSelector(selectAuthenticated)
    return authenticated ? <></> : <>{children}</>
}