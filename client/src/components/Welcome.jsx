import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Welcome({ email, transLogout, closeBurgerMenu}) {
    const dispatch = useDispatch();

    const logOut = () => {
        sessionStorage.removeItem("user");
        dispatch({ type: "LOGOUT", logout: true });
    };

    return (
        <div className="welcome">
            <h5><Link onClick={closeBurgerMenu} to={"/me"}>{email}</Link></h5>
            <button onClick={logOut} className="logout">{transLogout}</button>
        </div>
    )
}
