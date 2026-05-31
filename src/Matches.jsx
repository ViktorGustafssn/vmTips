import MatchCard from "./MatchCard";
import { useState } from "react";

function Matches(props) {
  const [activeFilter, setActiveFilter] = useState("kommande");

  const filteredMatches = props.matches.filter((match) => {
    if (activeFilter === "live") return match.status === "IN_PLAY";
    if (activeFilter === "kommande") return match.status === "TIMED";
    if (activeFilter === "spelade") return match.status === "FINISHED";
  });
  return (
    <div>
      <div className="flex gap-2 justify-center items-center">
        <button
          onClick={() => setActiveFilter("live")}
          className="border border-[#2a2a2a] py-1 px-4 rounded-lg"
        >
          Live
        </button>
        <button
          onClick={() => setActiveFilter("kommande")}
          className="border border-[#2a2a2a] py-1 px-4 rounded-lg"
        >
          Kommande
        </button>
        <button
          onClick={() => setActiveFilter("spelade")}
          className="border border-[#2a2a2a] py-1 px-4 rounded-lg"
        >
          Spelade
        </button>
      </div>
      <ol className="flex flex-col justify-center items-center m-4 gap-4">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} players={props.players} />
        ))}
      </ol>
    </div>
  );
}

export default Matches;
