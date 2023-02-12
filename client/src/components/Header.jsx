import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFetchLang } from "../hooks/Fetch";
import useActivePage from "../hooks/landing";
import Auth from "./Auth";
import Lang from "./Lang";
import Welcome from "./Welcome";

export default function Header() {
  const [burgerMenu, setBurgerMenu] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isLogout = useSelector(state => state.logout);
  const PAGE = useActivePage();

  const { header } = useFetchLang(PAGE);
  
  const activePage = page => window.location.pathname === page ? "active" : "";

  const showBurgerMenu = ()=> setBurgerMenu(true);
  const closeBurgerMenu = ()=> setBurgerMenu(false);

  return (
    <header>
      <div className="logo"></div>
      <div className={`navbar ${burgerMenu ? "show":''}`}>
        <nav>
          <ul>
            <li><Link to={"/"} onClick={closeBurgerMenu} className={activePage("/")}>{header.nav[0]}</Link></li>
            <li><Link to={"/books"} onClick={closeBurgerMenu} className={activePage("/books")}>{header.nav[1]}</Link></li>
            <li><Link to={"/music"} onClick={closeBurgerMenu} className={activePage("/music")}>{header.nav[2]}</Link></li>
            <li><Link to={"/videos"} onClick={closeBurgerMenu} className={activePage("/videos")}>{header.nav[3]}</Link></li>
            {user?.role === "librarian" ? <li><Link to={"/content"} onClick={closeBurgerMenu}  className={activePage("/content")}>{header.nav[4]}</Link></li> : null}
          </ul>
        </nav>
        <div className="config">
          {!user ? <Auth transLogin={header.login} transRegester={header.regester} closeBurgerMenu={closeBurgerMenu}/> : <Welcome email={user.email} transLogout={header.logout} logout={isLogout} closeBurgerMenu={closeBurgerMenu}/>}
          <Lang closeBurgerMenu={closeBurgerMenu}/>
        </div>

        <div onClick={closeBurgerMenu} className="closeburgermenu">
          <div></div>
          <div></div>
        </div>

      </div>
      <div onClick={showBurgerMenu} className={`burgermenu`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  )
}
