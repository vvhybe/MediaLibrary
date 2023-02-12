import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer() {
  const { header } = useSelector(state => state.translate);
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <footer>
      <div className="oliveico"></div>
      <nav>
        <ul>
          <li><Link to={"/"} >{header.nav[0]}</Link></li>
          <li><Link to={"/books"} >{header.nav[1]}</Link></li>
          <li><Link to={"/musics"} >{header.nav[2]}</Link></li>
          <li><Link to={"/videos"} >{header.nav[3]}</Link></li>
          {user?.role === "librarian" ? <li><Link to={"/contentmanagement"}>{header.nav[4]}</Link></li> : null}
        </ul>
      </nav>

      <h5>Copyright &copy; 2023 - BMV-Library</h5>
    </footer>
  )
}
