import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function useFetch(url){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(setData)
    .catch(setError);
  }, [url])
  
  return [error, data];
}

export function useFetchLang(page) {
    const lang = useSelector(state => state.lang);
    const dispatch = useDispatch();

    useEffect(() => {
      const FLang = async ()=>{
        const res = await fetch(`${process.env.REACT_APP_SERVER}/lang?lang=${lang}&page=${page}`);
        const translate = await res.json();
        dispatch({type:"TRANSLATE", translate: translate});
      }
      FLang();
    }, [lang, page, dispatch]);
  return useSelector(state => state.translate);
}