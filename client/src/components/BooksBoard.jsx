import { useRef, useState } from "react";
import { useSelector } from 'react-redux';

export default function BooksBoard({transBoard}) {
  const lang = useSelector(state=>state.lang);

  const [errors, setErrors] = useState([]);
  const [book, setBook] = useState({title:"",author:"",pages:"",year:"",thumbnail:null,thumbnailPrev:null,language:"",link:"",file:null});
  const thumbRef = useRef();

  const handelSubmit = async e=>{
    e.preventDefault();

    const {thumbnailPrev, ...bookData} = book;

    const formData = new FormData();
    formData.append("lang", lang);
    Object.keys(bookData).forEach(entry => formData.append(entry, bookData[entry]));

    console.log("SONG FDATA:",...formData);

    fetch(`${process.env.REACT_APP_SERVER}/uploadbook`,{
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(setErrors)
    .catch();
  }

  const handelThumbnail = e=>{
    setBook({...book, thumbnail:e.target.files[0], thumbnailPrev:URL.createObjectURL(e.target.files[0])})
  }

  const loadThumbnail = ()=>{
    thumbRef.current.click();
  }

  const handelTitle = e=>{
    setBook({...book, title:e.target.value});
    setErrors([]);
  }
  const handelAuthor = e=>{
    setBook({...book, author:e.target.value});
    setErrors([]);
  }
  const handelPages = e=>{
    setBook({...book, pages:e.target.value});
    setErrors([]);
  }
  const handelYear = e=>{
    setBook({...book, year:e.target.value});
    setErrors([]);
  }
  const handelLanguage = e=>{
    setBook({...book, language:e.target.value});
    setErrors([]);
  }
  const handelLink = e=>{
    setBook({...book, link:e.target.value});
    setErrors([]);
  }
  const handelFile = e=>{
    setBook({...book, file:e.target.files[0]});
    setErrors([]);
  }
  

  return (
    <div className="dashboard books">
    <ul className={`formerror ${errors.length > 0? "active": "hidden"} `}>
      {errors.map(error => <li>{error}</li>)}
    </ul>
    <form onSubmit={handelSubmit}>
      <h2>{transBoard}</h2>
      <div className="split books">
          <input ref={thumbRef} hidden type="file" name="thumbnail" onChange={handelThumbnail} accept="image/*"/>
          <div onClick={loadThumbnail} className="coverpreview books">
            <img src={book.thumbnailPrev} alt="coverpreview" onError={e=>e.target.style.display = "none"}/>
          </div>
          <div className="right">
            <input type={"text"} placeholder={"Title"} onChange={handelTitle} dir="ltr"/>
            <input type={"text"} placeholder={"Author"} onChange={handelAuthor} dir="ltr"/>
            <input type={"number"} placeholder={"Pages"} onChange={handelPages} dir="ltr"/>
            <input type={"number"} placeholder={"Year"} onChange={handelYear} dir="ltr"/>
          </div>
      </div>
      <input type={"text"} placeholder={"Language"} onChange={handelLanguage} dir="ltr"/>
      <input type={"text"} placeholder={"Link"} onChange={handelLink} dir="ltr"/>
      <input type="file"  accept=".pdf" onChange={handelFile} dir="ltr"/>
      <button type="sbmit">{transBoard.split(" ")[0]}</button>
    </form>
    </div>
  )
}
