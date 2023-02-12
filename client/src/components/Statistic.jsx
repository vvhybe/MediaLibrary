import useFetch from "../hooks/Fetch"

export default function Statistic({ setBoard, transBadge}) {
    const [error, statistics] = useFetch(`${process.env.REACT_APP_SERVER}/statistics`);
    
    if(error){ console.error(error) }

    if(statistics){
        return (
          <ul className="statistics">
                {Object.keys(statistics).map((badge, i) =>            
                <li key={badge} onClick={()=> setBoard(badge)}>
                  <div className="sepicon"></div>
                  <h1>{statistics[badge]}</h1>
                  <h4>{transBadge[i+1]}</h4>
                </li>
                )}
          </ul>
        )
    }
}
