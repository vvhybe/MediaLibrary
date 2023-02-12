import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/Fetch';

export default function Login() {
  const lang = useSelector(state=>state.lang);
  const [, translate] = useFetch(`http://localhost:8080/lang?lang=${lang}&page=form`);

  console.log(translate);

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));
  if(user){ window.location.href = "/" };

  const handelSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8080/login",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({lang, email, password})
    })
    .then(res => res.json())
    .then(msg =>{
      if(msg.ok){
        sessionStorage.setItem("user", JSON.stringify(msg.user));
        window.location.href = "/";
      }else{
        setError(msg.error);
      }
    })
    .catch(console.error);
  }

  const storeEmail = e => { 
    setEmail(e.target.value);
    setError(null);
  };
  const storePassword = e => { 
    setPassword(e.target.value);
    setError(null);
  };

  if(translate){
      return (
        <div className="authontification">
          <ul className={`formerror ${error? "active": "hidden"}`}>
              <li>{error}</li>
          </ul>
          <form onSubmit={handelSubmit}>
              <h2>{translate.login}</h2>
              <input type={"email"} onChange={storeEmail} placeholder={"Email"} dir="ltr" />
              <input type={"password"} onChange={storePassword} placeholder={"Password"} dir="ltr" />
              <div className='btns'>
                <Link type='reset' to={"/"}>{translate.return}</Link>
                <button type="sbmit">{translate.login}</button>
              </div>
              <p>{translate.logAccount.split(",")[0]},  <Link to={"/regester"}>{translate.logAccount.split(",")[1]}</Link></p>
          </form>
        </div>
      )
  }
}
