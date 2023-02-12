import { Link } from "react-router-dom";

export default function Auth({transLogin, transRegester, closeBurgerMenu}) {
  return (
    <div className="auth">
        <Link onClick={closeBurgerMenu} to="/login">{transLogin}</Link>
        <Link onClick={closeBurgerMenu} to="/regester">{transRegester}</Link>
    </div>
  )
}
