import { useSelector } from "react-redux";
import useFetch from "../hooks/Fetch";
import Section from "./Section";

export default function Sections() {
  const lang = useSelector(state => state.lang);
  const [error, translate] = useFetch(`${process.env.REACT_APP_SERVER}/lang?lang=${lang}&page=home`);
  if(error){ console.error(error) }

  if(translate){
    const {sections:{summeries, btn}} = translate;
    return (
      <section className="Hsections">
          {Object.keys(summeries).map((section, i) => <Section key={i} cover={section} desc={summeries[section]} btn={btn}/> )}
      </section>
    )
  }
}
