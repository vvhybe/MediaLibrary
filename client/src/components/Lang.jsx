import { useSelector, useDispatch } from "react-redux";

export default function Lang({closeBurgerMenu}) {
  const lang = useSelector(state => state.lang);
  const dispatch = useDispatch();

  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
  
  const switchLang = e=>{
    document.documentElement.lang = e.target.value;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", e.target.value);
    dispatch({type: "SWITCH_LANG", lang: e.target.value});
    closeBurgerMenu()
  }
  
  return (
    <select onChange={switchLang} value={lang} className='langconfig'>
        <option value="en">English</option>
        <option value="fr">Francais</option>
        <option value="ar">العربية</option>
    </select>
  )
}
