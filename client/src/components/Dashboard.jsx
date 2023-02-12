import { useState } from "react";
import Statistic from "./Statistic";
import BooksBoard from "./BooksBoard";
import MusicBoard from "./MusicBoard";
import VideosBoard from "./VideosBoard";
import { useSelector } from "react-redux";


export default function Dashboard() {
  const [board, setBoard] = useState("books");
  const { header, dashboard } = useSelector(state => state.translate);

  if(dashboard){
    return (
      <>
      <div className="sepicon"></div>
      <Statistic setBoard={setBoard} transBadge={header.nav}/>
      <div className="sepicon"></div>
      {board === "books" ? <BooksBoard transBoard={dashboard.book}/> : null}
      {board === "music" ? <MusicBoard transBoard={dashboard.music}/> : null}
      {board === "videos" ? <VideosBoard transBoard={dashboard.video}/> : null}
      </>
    )
  }
}
