import React from 'react'
import { PlayFill } from 'react-bootstrap-icons';
import useActivePage from '../hooks/landing'

export default function Video({cover, title, author, platform, link}) {
    const Page = useActivePage();

    const PlayVideo = ()=>{
        window.open(link, "_blank");
    }

  return (
      <li className={`media ${Page}`}>
          <div className="cover">
              <img src={`${process.env.REACT_APP_SERVER}${cover}`} alt={title}/>
              <button onClick={PlayVideo} ><PlayFill/></button>
          </div>
          <div className="info">
              <h3><a href={link} target={"_blank"} rel="noreferrer">{title}</a></h3>
              <p>{author}, {platform}</p>
          </div>
      </li>
  )
}
