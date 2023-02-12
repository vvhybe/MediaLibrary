import useActivePage from "../hooks/landing";
import Book from "./Book";
import Song from "./Song";
import Video from "./Video";
// import Frame from "./Book";

export default function Rack({content}) {
  const Page = useActivePage();
  return (
    <>
    <div className="sepicon"></div>
    <ul className="bunker">
        {Page === "books"? content.map((frame, i)=> <Book key={i} title={frame.title} author={frame.author} year={frame.year} language={frame.language} pages={frame.pages} wikilink={frame.link} />) : null}
        {Page === "music"? content.map((frame, i)=> <Song key={i} cover={frame.picture} title={frame.title} trackLink={frame.trackLink} artist={frame.artist} artistLink={frame.trackLink} album={frame.album} albumLink={frame.albumLink} preview={frame.preview}/>) : null}
        {Page === "videos"? content.map((frame, i)=> <Video key={i} cover={frame.thumbnail} title={frame.title} author={frame.author} link={frame.link} platform={frame.platform}/>) : null}
    </ul>
    </>
  )
}
