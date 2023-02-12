import { Download } from "react-bootstrap-icons"
import useActivePage from "../hooks/landing"

export default function Book({title, author, year, language, pages, wikilink}) {
  const Page = useActivePage();
  
  const download = ()=>{
    const a = document.createElement("a");
    a.download = title;
    a.href = `${process.env.REACT_APP_SERVER}/download?page=${Page}&file=${title.toLowerCase().split(" ").join("")}`;
    a.click();
  }

  return (
    <li className={"media "+Page}>
        <img src={`${process.env.REACT_APP_SERVER}/thumbnail/books/${title.split(" ").join("")}`} alt={title} />
        <div className="info">
          <h3><a href={wikilink} target="_blank" rel="noopener noreferrer">{title}</a></h3>
          <p>{author}, {year}</p>
          <h6>Lang: {language}, Pages:{pages}</h6>
          <button onClick={download}><Download/></button>
        </div>
    </li>
  )
}
