import { useRef } from "react";
import { Link } from "react-router-dom";
import useIntersectView from "../hooks/IntersectView";


export default function Section({cover, desc, btn}) {
  const intersectRef = useRef();
  const isIntersected = useIntersectView(intersectRef);

  return (
    <>
    <div className="sepicon"></div>
    <div ref={intersectRef} className={`sec ${cover} ${isIntersected ? "intersect" : ''}`}>
        <div className={`cover`}></div>
        <div className="summry">
            <p>{desc}</p>
            <Link to={`/${cover}`}>{btn}</Link>
        </div>
    </div>
    </>
  )
}
