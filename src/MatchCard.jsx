import { useState } from "react";

function MatchCard(props) {
  const [showTips, setShowTip] = useState(false);

  const dateObj = new Date(props.match.utcDate);
  const date = dateObj.toLocaleDateString("sv-SE");
  const time = dateObj.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li
      onClick={() => setShowTip(!showTips)}
      className="flex flex-col justify-center border border-[#2a2a2a] bg-[#1a1a1a] w-full rounded-lg px-4 py-8"
    >
      <p className="flex justify-center text-sm text-gray-500">
        {date} {time}
      </p>
      <div className="grid grid-cols-3 place-items-center w-full">
        {" "}
        {/* Hemma lag */}
        <div className="flex justify-center">
          <p className="font-semibold">{props.match.homeTeam.name}</p>
        </div>
        {/* {Resultat kolumnen} */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div>
            <p>Live</p>
          </div>
          <div className=" flex-1 flex items-center justify-center text-3xl gap-6">
            <p>
              {props.match.score.fullTime.home
                ? props.match.score.fullTime.home
                : "-"}
            </p>
            <p>-</p>
            <p>
              {props.match.score.fullTime.away
                ? props.match.score.fullTime.away
                : "-"}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="">94:10</p>
          </div>
        </div>
        {/* Borta lag */}
        <div className="flex justify-center">
          <p className="font-semibold">{props.match.awayTeam.name}</p>
        </div>
      </div>
      {showTips && (
        <div>
          <ol className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {props.players.map((player) => (
              <li
                key={player.id}
                className={`${
                  props.match.score.fullTime.home === null
                    ? "border-[#3a3a3a]"
                    : props.match.score.fullTime.home >
                          props.match.score.fullTime.away &&
                        props.match.tips[player.name].home >
                          props.match.tips[player.name].away
                      ? "border-green-500"
                      : props.match.score.fullTime.home <
                            props.match.score.fullTime.away &&
                          props.match.tips[player.name].home <
                            props.match.tips[player.name].away
                        ? "border-green-500"
                        : props.match.score.fullTime.home ===
                              props.match.score.fullTime.away &&
                            props.match.tips[player.name].home ===
                              props.match.tips[player.name].away
                          ? "border-green-500"
                          : "border-red-500"
                } flex flex-col items-center justify-center py-1 w-25 border border-[#3a3a3a] bg-[#2a2a2a] rounded-lg`}
              >
                <p className="text-sm">{player.name}</p>
                <p className="text-xs">
                  {props.match.tips[player.name].home} -{" "}
                  {props.match.tips[player.name].away}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </li>
  );
}

export default MatchCard;
