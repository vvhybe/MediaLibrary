import { useSelector } from "react-redux";
import Main from "./Main";

export default function MediaSearch() {
  const { hero } = useSelector(state => state.translate);

  if(hero){
    return <Main title={hero.title} motivation={hero.motivation} placeholder={hero.placeholder}/>;
  }
}
