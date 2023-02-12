import { useRef, useState } from "react";
import { useSelector } from 'react-redux';

export default function MusicBoard({transBoard}) {
    const lang = useSelector(state=>state.lang);

    const [errors, setErrors] = useState([]);
    const [song, setSong] = useState({title:"",artist:"",artistLink:"",album:"",albumLink:"",platform:"",thumbnail:null,thumbnailPrev:null, file:null});
    const thumbRef = useRef();

    const handelSubmit = e=>{
        e.preventDefault();
        const {thumbnailPrev, ...songData} = song;

        const formData = new FormData();
        formData.append("lang", lang);
        Object.keys(songData).forEach(entry => formData.append(entry, songData[entry]));

        console.log("SONG FDATA:",...formData);

        fetch(`${process.env.REACT_APP_SERVER}/uploadmusic`,{
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(setErrors)
        .catch();
    }

    const handelThumbnail = e=>{
        setSong({...song, thumbnail:e.target.files[0], thumbnailPrev:URL.createObjectURL(e.target.files[0])})
    }
    
    const loadThumbnail = ()=>{
        thumbRef.current.click();
    }

    const handelTitle = e=>{
        setSong({...song, title:e.target.value});
        setErrors([]);
    }
    const handelArtist = e => {
        setSong({...song, artist:e.target.value});
        setErrors([]);
    }
    const handelArtistLink = e => {
        setSong({...song, artistLink:e.target.value});
        setErrors([]);
    }
    const handelAlbum = e => {
        setSong({...song, album:e.target.value});
        setErrors([]);
    }
    const handelAlbumLink = e => {
        setSong({...song, albumLink:e.target.value});
        setErrors([]);
    }
    const handelPlatform = e=>{
        setSong({...song, platform: e.target.value});
        setErrors([]);
    }
    const handelFile = e=>{
        setSong({...song, file:e.target.files[0]});
        setErrors([]);
    }
      
    
    return (
    <div className="dashboard music">
    <ul className={`formerror ${errors.length > 0? "active": "hidden"}`}>
        {errors.map(error => <li>{error}</li>)}
    </ul>
    <form onSubmit={handelSubmit}>
        <h2>{transBoard}</h2>
        <div className="split music">
            <input hidden ref={thumbRef} onChange={handelThumbnail} type="file" accept="image/*"/>
            <div onClick={loadThumbnail} className="coverpreview music">
                <img src={song.thumbnailPrev} alt="" onError="this.style.display='none'"/>
            </div>
            <div className="right">
            <input type={"text"} placeholder={"Title"} onChange={handelTitle} dir="ltr"/>
            <input type={"text"} placeholder={"Artist"} onChange={handelArtist} dir="ltr"/>
            <input type={"text"} placeholder={"Artist link"} onChange={handelArtistLink} dir="ltr"/>
            </div>
        </div>
        <input type={"text"} placeholder={"Album"} onChange={handelAlbum} dir="ltr"/>
        <input type={"text"} placeholder={"Album link"} onChange={handelAlbumLink} dir="ltr"/>
        <input type={"text"} placeholder={"Platform"} onChange={handelPlatform} dir="ltr"/>
        <input type="file"  accept=".mp3,audio/*" onChange={handelFile} dir="ltr"/>
        <button type="sbmit">{transBoard.split(" ")[0]}</button>
    </form>
    </div>
    )
    
}
