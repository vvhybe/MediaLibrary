import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/Fetch';


export default function Regester() {
  const lang = useSelector(state=>state.lang);
  const [, translate] = useFetch(`http://localhost:8080/lang?lang=${lang}&page=form`);
  const [errors, setErrors] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));
  if(user){ window.location.href = "/" };

  const handelSubmit = e=>{
    e.preventDefault();
    const user = {lang, firstName, lastName, email, password, cpassword};
    fetch("http://localhost:8080/regester",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(msg =>{
      if(msg.ok){
        sessionStorage.setItem("user", JSON.stringify({ firstName, lastName, email, role: "user" }));
        window.location.href = "/";
      }else{
        setErrors(msg.errors);
      }
    })
    .catch(console.error);
  }

  const storeFName = e => { 
    setFirstName(e.target.value);
    setErrors([]);
   };
  const storeLName = e => { 
    setLastName(e.target.value);
    setErrors([]);
   };
  const storeEmail = e => { 
    setEmail(e.target.value);
    setErrors([]);
   };
  const storePassword = e => { 
    setPassword(e.target.value);
    setErrors([]);
   };
  const storeCPassword = e => { 
    setCPassword(e.target.value);
    setErrors([]);
   };
  
  if(translate){
    return (
      <div className="authontification">
        <ul className={`formerror ${errors.length > 0? "active": "hidden"}`}>
          {errors.map(error => <li>{error}</li>)}
        </ul>
        <form onSubmit={handelSubmit}>
          <h2>{translate.regester}</h2>
          <input type={"text"} onChange={storeFName} placeholder={"First Name"} dir="ltr"/>
          <input type={"text"} onChange={storeLName} placeholder={"Last Name"} dir="ltr"/>
          <input type={"email"} onChange={storeEmail} placeholder={"Email"} dir="ltr"/>
          <input type={"password"} onChange={storePassword} placeholder={"Password"} dir="ltr"/>
          <input type={"password"} onChange={storeCPassword} placeholder={"Confirm Password"} dir="ltr"/>
          <div className='btns'>
            <Link type='reset' to={"/"}>{translate.return}</Link>
            <button type="sbmit">{translate.login}</button>
          </div>
          <p>{translate.regAccount.split(",")[0]}, <Link to={"/login"}>{translate.regAccount.split(",")[1]}</Link> </p>
        </form>
      </div>
    )
  }

}
