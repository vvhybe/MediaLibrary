import { useSelector } from "react-redux";
import useActivePage from "../hooks/landing";

export default function Hero() {
  const { hero } = useSelector(state => state.translate);  
  const page = useActivePage();

  if(hero){
    return (
      <main className={"hero "+page}>
          <h1>{hero.title}</h1>
          <p>{hero.motivation}</p>
          <div className="oliveicon"></div>
      </main>
    )
  }
}
