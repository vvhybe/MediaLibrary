import { useState } from 'react';
import useActivePage from '../hooks/landing';
import useFetch from "../hooks/Fetch";
import Book from "./Book";
import Song from "./Song";
import Video from "./Video";

export default function Search({placeholder}) {
    const [query, setQuery] = useState("");
    const page = useActivePage();
    const [, result] = useFetch(`${process.env.REACT_APP_SERVER}/search?page=${page}&query=${query}`);
    
    const search = e=>{
        if(e.key === "Enter"){
            setQuery(e.target.value);
        };
    }

    return (
        <>
        <div className={`search ${page}`} dir="ltr">
            <input type="search" onKeyDown={search}  placeholder={placeholder} dir="ltr"/>
        </div>
        <div className={`top ${page}`}>
            <div className="searchresult">
            {page === "books" && result ? <Book title={result.title} author={result.author} year={result.year} language={result.language} pages={result.pages} wikilink={result.link} /> : null}
            {page === "music" && result ? <Song cover={result.picture} title={result.title} trackLink={result.trackLink} artist={result.artist} artistLink={result.trackLink} album={result.album} albumLink={result.albumLink} preview={result.preview}/> : null}
            {page === "videos" && result ? <Video cover={result.thumbnail} title={result.title} author={result.author} link={result.link} platform={result.platform}/> : null}
            </div>
        </div>
        </>
    )
}
