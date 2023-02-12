import useActivePage from "../hooks/landing";
import Search from "./Search";

export default function Main({title, motivation, placeholder}) {
  const PAGE = useActivePage();
  return (
    <main className={`searchHero`}>
        <div className={`bg ${PAGE}`}></div>
        <div className="container">
            <h1>{title}</h1>
            <p>{motivation}</p>
            <Search placeholder={placeholder}/>
        </div>
    </main>
  )
}
