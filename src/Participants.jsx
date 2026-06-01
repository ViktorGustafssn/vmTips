import { useState } from "react";
import { predictions } from "./data.js";

function Participants(props) {
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  const matchesByGroup = props.matches.reduce((acc, match) => {
    const group = match.group?.replace("GROUP_", "") ?? match.stage;

    if (!acc[group]) acc[group] = [];
    acc[group].push(match);
    return acc;
  }, {});

  function getStats(playerName) {
    let rightSign = 0;
    let rightGoals = 0;
    let exact = 0;

    props.matches.forEach((match) => {
      if (match.score?.fullTime?.home !== null && match.tips?.[playerName]) {
        const result = match.score.fullTime;
        const tip = match.tips[playerName];

        if (
          (result.home > result.away && tip.home > tip.away) ||
          (result.home < result.away && tip.home < tip.away) ||
          (result.home === result.away && tip.home === tip.away)
        )
          rightSign++;

        if (result.home === tip.home) rightGoals++;
        if (result.away === tip.away) rightGoals++;

        if (result.home === tip.home && result.away === tip.away) exact++;
      }
    });

    return { rightSign, rightGoals, exact };
  }

  return (
    <ol className="flex flex-col px-4 gap-4">
      <h1 className="text-3xl text-center pb-2">Deltagare</h1>

      {props.players.map((player, index) => {
        const stats = getStats(player.name);
        const isExpanded = expandedPlayer === player.id;
        return (
          <li
            key={player.id}
            onClick={() => setExpandedPlayer(isExpanded ? null : player.id)}
            className="flex flex-col border border-[#2a2a2a] bg-[#1a1a1a] p-4 rounded-lg gap-2"
          >
            <div>
              <p className="font-semibold text-base">{player.name}</p>
              <div className="flex gap-1 text-sm text-gray-400">
                <p>{player.points} poäng</p>
                <p>•</p>
                <p>{index + 1}:a plats</p>
              </div>
            </div>
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center">
                <p className="text-lg">{stats.rightSign}</p>
                <p className="text-xs text-gray-400">Rätt tecken</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg">{stats.rightGoals}</p>
                <p className="text-xs text-gray-400">Rätt mål</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg">{stats.exact}</p>
                <p className="text-xs text-gray-400">Exakta</p>
              </div>
            </div>
            {isExpanded && (
              <div className="flex flex-col gap-2">
                {/* Gruppspel */}
                {[
                  "A",
                  "B",
                  "C",
                  "D",
                  "E",
                  "F",
                  "G",
                  "H",
                  "I",
                  "J",
                  "K",
                  "L",
                ].map(
                  (group) =>
                    matchesByGroup[group] && (
                      <div key={group}>
                        <p className="font-semibold">Grupp {group}</p>
                        {matchesByGroup[group].map((match) => {
                          const result = match.score?.fullTime;
                          const tip = match.tips?.[player.name];
                          const matchPlayed = result?.home !== null && tip;
                          const homeCorrect =
                            matchPlayed && result.home === tip.home;
                          const awayCorrect =
                            matchPlayed && result.away === tip.away;
                          const signCorrect =
                            matchPlayed &&
                            ((result.home > result.away &&
                              tip.home > tip.away) ||
                              (result.home < result.away &&
                                tip.home < tip.away) ||
                              (result.home === result.away &&
                                tip.home === tip.away));

                          return (
                            <div
                              key={match.id}
                              className="flex justify-between text-base"
                            >
                              <p className="text-gray-400">
                                {match.homeTeam.name} - {match.awayTeam.name}
                              </p>
                              <div className="flex gap-1">
                                <p
                                  className={
                                    matchPlayed
                                      ? homeCorrect
                                        ? "text-green-500"
                                        : signCorrect
                                          ? "text-yellow-400"
                                          : "text-red-500"
                                      : "text-gray-400"
                                  }
                                >
                                  {tip?.home ?? "-"}
                                </p>
                                <p className="text-gray-400">-</p>
                                <p
                                  className={
                                    matchPlayed
                                      ? awayCorrect
                                        ? "text-green-500"
                                        : signCorrect
                                          ? "text-yellow-400"
                                          : "text-red-500"
                                      : "text-gray-400"
                                  }
                                >
                                  {tip?.away ?? "-"}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ),
                )}

                {/* Slutspel */}
                {[
                  { key: "roundOf32", label: "Sextondelsfinaler" },
                  { key: "roundOf16", label: "Åttondelsfinaler" },
                  { key: "quarterFinals", label: "Kvartsfinaler" },
                  { key: "semiFinals", label: "Semifinaler" },
                  { key: "finals", label: "Final" },
                ].map(
                  ({ key, label }) =>
                    predictions[player.name]?.[key]?.length > 0 && (
                      <div key={key} className="flex flex-col gap-1">
                        <p className="font-semibold">{label}</p>
                        <div className="flex flex-wrap gap-4 text-base text-gray-400">
                          {predictions[player.name][key].map((team) => (
                            <p key={team} className="">
                              {team}
                            </p>
                          ))}
                        </div>
                      </div>
                    ),
                )}

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <p className="font-semibold">Vinnare bronsmatch:</p>
                      <p className="text-gray-400">
                        {predictions[player.name]?.bronzeWinner}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Världsmästare: </p>
                      <p className="text-gray-400">
                        {predictions[player.name]?.worldChampion}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Skyttekung: </p>
                      <p className="text-gray-400">
                        {predictions[player.name]?.topScorer}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Flest mål gruppspel: </p>
                      <p className="text-gray-400">
                        {predictions[player.name]?.mostGoalsTeam}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Flest insläppta mål: </p>
                      <p className="text-gray-400">
                        {predictions[player.name]?.mostConcededTeam}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Mål för Sverige: </p>
                      <p className="text-gray-400">
                        {predictions[player.name]?.swedenGoals}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Snabbaste målet:</p>
                      <p className="text-gray-400">
                        {predictions[player.name]?.fastestGoal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default Participants;
