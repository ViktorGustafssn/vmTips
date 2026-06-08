import { useState } from "react";
import { CaretDoubleDownIcon } from "@phosphor-icons/react";

function MatchCard(props) {
  const [showTips, setShowTip] = useState(false);

  const dateObj = new Date(props.match.utcDate);
  const date = dateObj.toLocaleDateString("sv-SE");
  const time = dateObj.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusLabel = {
    TIMED: null,
    SCHEDULED: null,
    LIVE: "Live",
    IN_PLAY: "Live",
    FINISHED: "Slutresultat",
    PAUSED: "Paus",
    POSTPONED: "Uppskjuten",
    SUSPENDED: "Avbruten",
    CANCELLED: "Inställd",
  }[props.match.status];

  const isLive =
    props.match.status === "LIVE" ||
    props.match.status === "IN_PLAY" ||
    props.match.status === "PAUSED";

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
        <div className="flex flex-col justify-center items-center gap-1">
          <img
            src={props.match.homeTeam.crest}
            alt={props.match.homeTeam.name}
            className="w-8 h-8"
          />
          <p className="font-semibold">{props.match.homeTeam.name}</p>
        </div>
        {/* {Resultat kolumnen} */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div>
            {statusLabel && (
              <p className="text-xs text-gray-400">{statusLabel}</p>
            )}
          </div>
          <div className=" flex-1 flex items-center justify-center text-3xl gap-4">
            <p>{props.match.score.fullTime?.home ?? "-"}</p>
            <p>-</p>
            <p>{props.match.score.fullTime?.away ?? "-"}</p>
          </div>
          <div className="flex items-center justify-center">
            {isLive && <p className="text-xs">{props.match.minute}</p>}
          </div>
        </div>
        {/* Borta lag */}
        <div className="flex flex-col justify-center items-center gap-1">
          <img
            src={props.match.awayTeam.crest}
            alt={props.match.awayTeam.name}
            className="w-8 h-8"
          />
          <p className="font-semibold">{props.match.awayTeam.name}</p>
        </div>
      </div>
      <div className="flex flex-col items-center pt-3">
        <p className="text-xs text-gray-400">
          {showTips ? "Klicka för att stänga" : "Klicka för att se allas tips"}
        </p>

        <CaretDoubleDownIcon
          size={20}
          className="pt-1"
          style={{
            transform: showTips ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        />
      </div>
      {showTips && (
        <div>
          <ol className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {props.players.map((player) => {
              const [firstName, lastName] = player.name
                ? player.name.split(" ")
                : [];

              const homeScore = props.match.score.fullTime?.home;
              const awayScore = props.match.score.fullTime?.away;

              const actualSign =
                homeScore > awayScore ? "1" : homeScore < awayScore ? "2" : "X";

              return (
                <li
                  key={player.id}
                  className={`${
                    homeScore === null
                      ? "border-[#3a3a3a]"
                      : homeScore === props.match.tips?.[player.name]?.home &&
                          awayScore === props.match.tips?.[player.name]?.away &&
                          actualSign === props.match.tips?.[player.name]?.sign
                        ? "border-green-500"
                        : "border-gray-400"
                  } flex flex-col items-center justify-center py-1 w-23 border border-[#3a3a3a] bg-[#2a2a2a] rounded-lg`}
                >
                  <p className="font-semibold text-sm">
                    {firstName} {lastName?.slice(0, 1)}
                  </p>
                  <div className="flex gap-1">
                    <div className="flex text-sm gap-[2px] font-semibold">
                      <p
                        className={
                          homeScore === props.match.tips?.[player.name]?.home
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {props.match.tips?.[player.name]?.home}{" "}
                      </p>
                      <p>-</p>
                      <p
                        className={
                          awayScore === props.match.tips?.[player.name]?.away
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {props.match.tips?.[player.name]?.away}{" "}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="text-[10px] text-gray-400">•</p>
                      <p
                        className={`text-sm ${
                          homeScore === null
                            ? "text-gray-400"
                            : actualSign ===
                                props.match.tips?.[player.name]?.sign
                              ? "text-green-500"
                              : "text-red-500"
                        }`}
                      >
                        {props.match.tips?.[player.name]?.sign}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </li>
  );
}

export default MatchCard;
