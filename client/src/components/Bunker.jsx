import useFetch from "../hooks/Fetch";
import useActivePage from "../hooks/landing"
import Rack from "./Rack";

export default function Bunker() {
    const PAGE = useActivePage();
    const [error, content] = useFetch(`${process.env.REACT_APP_SERVER}/contents/${PAGE}`);

    if(error){ console.error(error) };

  if(content){
    return  <Rack content={content}/>;
  }
}
