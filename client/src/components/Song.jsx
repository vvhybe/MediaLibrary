import { useRef, useState } from "react";
import useActivePage from "../hooks/landing";
import { PlayFill, PauseFill } from "react-bootstrap-icons";


export default function Song({cover, title, trackLink, album, albumLink, artist, artistLink, preview}) {
    const [isPaused, setIsPaused] = useState(true);
    const ref = useRef();
    const Page = useActivePage();

    const playPreview = ()=>{
        isPaused ? ref.current.play() : ref.current.pause();
        console.log(title, "Pause", ref.current.played);
        setIsPaused(!isPaused);
    }

    const pause = ()=>{
        ref.current.pause();
    }

  return (
    <li className={`media ${Page}`} onBlur={pause}>
        <div className="cover">
            <img src={cover} alt={title} />
            <button onClick={playPreview}>{isPaused? <PlayFill/> : <PauseFill/>}</button>
        </div>
        <div className="info">
          <h3><a href={trackLink} target={"_blank"} rel="noreferrer">{title}</a></h3>
          <p><a href={artistLink} target={"_blank"} rel="noreferrer">{artist}</a>, <a href={albumLink} target={"_blank"} rel="noreferrer">{album}</a></p>
        </div>
        <audio hidden ref={ref} src={preview}></audio>
    </li>
  )
}