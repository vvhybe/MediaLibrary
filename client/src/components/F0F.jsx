import { useSelector } from "react-redux";
import useFetch from "../hooks/Fetch";

export default function F0F() {
    const lang = useSelector(state => state.lang);
    const [,translate] = useFetch(`${process.env.REACT_APP_SERVER}/errors/notfound`);
  return (
    <div className="notfound">
        <h1>404</h1>
        <div className="sepicon"></div>
        {translate ? <h1>{translate[lang]}</h1> : <h1>The path to this destination was not found.</h1>}
        <div className="bg"></div>
    </div>
  )
}
