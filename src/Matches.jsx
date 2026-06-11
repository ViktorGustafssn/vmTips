import MatchCard from "./MatchCard";
import { useState, useEffect } from "react";

function Matches(props) {
  const [activeFilter, setActiveFilter] = useState("kommande");

  const hasLiveMatches = props.matches.some(
    (m) => m.status === "LIVE" || m.status === "IN_PLAY",
  );

  useEffect(() => {
    if (hasLiveMatches && activeFilter === "kommande") {
      setActiveFilter("live");
    }
  }, [hasLiveMatches, activeFilter]);

  const filteredMatches = props.matches.filter((match) => {
    if (activeFilter === "live")
      return (
        match.status === "LIVE" ||
        match.status === "IN_PLAY" ||
        match.status === "PAUSED"
      );
    if (activeFilter === "kommande")
      return match.status === "TIMED" || match.status === "SCHEDULED";
    if (activeFilter === "spelade") return match.status === "FINISHED";
  });

  return (
    <div>
      <h1 className="text-3xl text-center pb-4">Matcher</h1>

      <div className="flex gap-2 justify-center items-center">
        <button
          onClick={() => setActiveFilter("live")}
          className={`flex items-center gap-2 border border-[#2a2a2a] py-1 px-4 rounded-lg ${activeFilter === "live" ? "bg-white text-black" : "text-white"}`}
        >
          <p>Live</p>
          {hasLiveMatches && (
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
          )}
        </button>
        <button
          onClick={() => setActiveFilter("kommande")}
          className={`border border-[#2a2a2a] py-1 px-4 rounded-lg ${activeFilter === "kommande" ? "bg-white text-black" : "text-white"}`}
        >
          Kommande
        </button>
        <button
          onClick={() => setActiveFilter("spelade")}
          className={`border border-[#2a2a2a] py-1 px-4 rounded-lg ${activeFilter === "spelade" ? "bg-white text-black" : "text-white"}`}
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
