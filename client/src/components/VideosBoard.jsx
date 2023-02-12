import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function VideosBoard({transBoard}) {
    const [errors, setErrors] = useState([]);

    const lang = useSelector(state=>state.lang);
    const [video, setVideo] = useState({title:"",author:"",platform:"",thumbnail:null, link:"",thumbnailPrev:null, file:null});  
    const thumbRef = useRef();
  
    const handelSubmit = e=>{
      e.preventDefault();
      const {thumbnailPrev, ...videoData} = video;

      const formData = new FormData();
      formData.append("lang", lang);
      Object.keys(videoData).forEach(entry => formData.append(entry, videoData[entry]));

      console.log("video FDATA:",...formData);

      fetch(`${process.env.REACT_APP_SERVER}/uploadvideo`,{
          method: "POST",
          body: formData
      })
      .then(res => res.json())
      .then(setErrors)
      .catch();
  }
  
  
  const handelThumbnail = e=>{
    setVideo({...video, thumbnail:e.target.files[0], thumbnailPrev:URL.createObjectURL(e.target.files[0])})
  }

  const loadThumbnail = ()=>{
    thumbRef.current.click();
}
    
  const handelTitle = e=>{
    setVideo({...video, title: e.target.value});
    setErrors([]);
  }
  const handelAuthor = e=>{
    setVideo({...video, author: e.target.value});
    setErrors([]);
  }
  const handelPlatform = e=>{
    setVideo({...video, platform: e.target.value});
    setErrors([]);
  }
  const handelLink = e=>{
    setVideo({...video, link: e.target.value});
    setErrors([]);
  }
  const handelFile = e=>{
    setVideo({...video, file: e.target.files[0]});
    setErrors([]);
  }

  return (
    <div className="dashboard videos">
    <ul className={`formerror ${errors.length > 0? "active": "hidden"} `}>
      {errors.map(error => <li>{error}</li>)}
    </ul>
    <form onSubmit={handelSubmit}>
      <h2>{transBoard}</h2>
      <div className="split videos">
          <input ref={thumbRef} hidden type="file" name="thumbnail" onChange={handelThumbnail} accept="image/*"/>
          <div onClick={loadThumbnail} className="coverpreview videos">
            <img src={video.thumbnailPrev} alt="coverpreview" onerror="this.style.display='none'"/>
          </div>
      </div>
      <input type={"text"} placeholder={"Title"} onChange={handelTitle} dir="ltr"/>
      <input type={"text"} placeholder={"Author"} onChange={handelAuthor} dir="ltr"/>
      <input type={"text"} placeholder={"Platform"} onChange={handelPlatform} dir="ltr"/>
      <input type={"text"} placeholder={"Link"} onChange={handelLink} dir="ltr"/>
      <input type="file" onChange={handelFile} accept=".mp4,video/*" dir="ltr"/>
      <button type="sbmit">{transBoard.split(" ")[0]}</button>
    </form>
    </div>
  )
}
