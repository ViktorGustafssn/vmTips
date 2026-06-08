import { useState } from "react";
import { predictions } from "./data.js";
import { getActualTeamsByStage } from "./utils.js";
import { bonusResults } from "./results.js";
import { CaretDoubleDownIcon } from "@phosphor-icons/react";

function Participants(props) {
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const actualTeams = getActualTeamsByStage(props.matches);
  console.log(actualTeams);

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
    let rightLast32 = 0;
    let rightLast16 = 0;
    let rightQuarter = 0;
    let rightSemi = 0;
    let rightFinal = 0;
    let rightBonus = 0;

    props.matches.forEach((match) => {
      if (match.score?.fullTime?.home !== null && match.tips?.[playerName]) {
        const result = match.score.fullTime;
        const tip = match.tips[playerName];
        const actualSign =
          result.home > result.away
            ? "1"
            : result.home < result.away
              ? "2"
              : "X";

        if (tip.sign === actualSign) rightSign++;

        if (result.home === tip.home) rightGoals++;
        if (result.away === tip.away) rightGoals++;

        if (result.home === tip.home && result.away === tip.away) exact++;
      }
    });

    const pred = predictions[playerName];
    if (pred) {
      pred.roundOf32.forEach((team) => {
        if (actualTeams.roundOf32?.includes(team)) rightLast32++;
      });
      pred.roundOf16.forEach((team) => {
        if (actualTeams.roundOf16?.includes(team)) rightLast16++;
      });
      pred.quarterFinals.forEach((team) => {
        if (actualTeams.quarterFinals.includes(team)) rightQuarter++;
      });
      pred.semiFinals.forEach((team) => {
        if (actualTeams.semiFinals.includes(team)) rightSemi++;
      });
      pred.finals.forEach((team) => {
        if (actualTeams.finals.includes(team)) rightFinal++;
      });

      if (
        pred.worldChampion === bonusResults.worldChampion &&
        bonusResults.worldChampion
      )
        rightBonus++;
      if (
        pred.bronzeWinner === bonusResults.bronzeWinner &&
        bonusResults.bronzeWinner
      )
        rightBonus++;
      if (pred.topScorer === bonusResults.topScorer && bonusResults.topScorer)
        rightBonus++;
      if (
        pred.mostGoalsTeam === bonusResults.mostGoalsTeam &&
        bonusResults.mostGoalsTeam
      )
        rightBonus++;
      if (
        pred.mostConcededTeam === bonusResults.mostConcededTeam &&
        bonusResults.mostConcededTeam
      )
        rightBonus++;
      if (
        pred.swedenGoals === bonusResults.swedenGoals &&
        bonusResults.swedenGoals
      )
        rightBonus++;
      if (
        pred.fastestGoal === bonusResults.fastestGoal &&
        bonusResults.fastestGoal
      )
        rightBonus++;
    }

    return {
      rightSign,
      rightGoals,
      exact,
      rightLast32,
      rightLast16,
      rightQuarter,
      rightSemi,
      rightFinal,
      rightBonus,
    };
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
            <div className="flex flex-col items-center pt-3">
              <p className="text-xs text-gray-400">
                {isExpanded
                  ? "Klicka för att stänga"
                  : "Klicka för att se tips"}
              </p>
              <CaretDoubleDownIcon
                size={20}
                className={`pt-1 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </div>

            {isExpanded && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h1 className="text-center mb-1 text-sm">Gruppspel</h1>
                    <div className="flex justify-around">
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
                        <p className="text-xs text-gray-400">Full pott</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-around">
                    <h1 className="text-center mb-1 text-sm">Slutspel</h1>
                    <div className="flex justify-around">
                      <div className="flex flex-col items-center">
                        <p className="text-lg">{stats.rightLast32}</p>
                        <p className="text-xs text-gray-400">16-del</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-lg">{stats.rightLast16}</p>
                        <p className="text-xs text-gray-400">8-del</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-lg">{stats.rightQuarter}</p>
                        <p className="text-xs text-gray-400">Kvart</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-lg">{stats.rightSemi}</p>
                        <p className="text-xs text-gray-400">Semi</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-lg">{stats.rightFinal}</p>
                        <p className="text-xs text-gray-400">Final</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <h1 className="text-center mb-1 text-sm">Bonus</h1>
                      <div className="flex flex-col items-center">
                        <p className="text-lg">{stats.rightBonus}</p>
                        <p className="text-xs text-gray-400">Bonus</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                          const actualSign =
                            result?.home > result?.away
                              ? "1"
                              : result?.home < result?.away
                                ? "2"
                                : "X";

                          return (
                            <div
                              key={match.id}
                              className="flex justify-between text-base"
                            >
                              <p className="text-gray-400">
                                {match.homeTeam.name.slice(0, 12)} -{" "}
                                {match.awayTeam.name.slice(0, 12)}
                              </p>
                              <div className="flex gap-2 justify-center items-center">
                                <div className="flex items-center justify-center">
                                  <p
                                    className={`flex justify-center w-4  ${
                                      matchPlayed
                                        ? homeCorrect
                                          ? "text-green-500"
                                          : "text-red-500"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {tip?.home ?? "-"}
                                  </p>
                                  <p className="text-gray-400">-</p>
                                  <p
                                    className={`flex justify-center w-4 ${
                                      matchPlayed
                                        ? awayCorrect
                                          ? "text-green-500"
                                          : "text-red-500"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {tip?.away ?? "-"}
                                  </p>
                                </div>
                                <div className="flex gap-2 items-center justify-center">
                                  <span className="text-gray-400">•</span>
                                  <p
                                    className={`flex justify-center w-4  ${
                                      matchPlayed
                                        ? actualSign === tip?.sign
                                          ? "text-green-500"
                                          : "text-red-500"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {tip?.sign ?? "-"}
                                  </p>
                                </div>
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
                            <p
                              key={team}
                              className={
                                actualTeams[key]?.includes(team)
                                  ? "text-green-500"
                                  : "text-gray-400"
                              }
                            >
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
                      <p
                        className={
                          predictions[player.name]?.bronzeWinner ===
                            bonusResults.bronzeWinner &&
                          bonusResults.bronzeWinner
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                      >
                        {predictions[player.name]?.bronzeWinner}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Världsmästare: </p>
                      <p
                        className={
                          predictions[player.name]?.worldChampion ===
                            bonusResults.worldChampion &&
                          bonusResults.worldChampion
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                      >
                        {predictions[player.name]?.worldChampion}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Skyttekung: </p>
                      <p
                        className={
                          predictions[player.name]?.topScorer ===
                            bonusResults.topScorer && bonusResults.topScorer
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                      >
                        {predictions[player.name]?.topScorer}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Flest mål gruppspel: </p>
                      <p
                        className={
                          predictions[player.name]?.mostGoalsTeam ===
                            bonusResults.mostGoalsTeam &&
                          bonusResults.mostGoalsTeam
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                      >
                        {predictions[player.name]?.mostGoalsTeam}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Flest insläppta mål: </p>
                      <p
                        className={
                          predictions[player.name]?.mostConcededTeam ===
                            bonusResults.mostConcededTeam &&
                          bonusResults.mostConcededTeam
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                      >
                        {predictions[player.name]?.mostConcededTeam}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Mål för Sverige: </p>
                      <p
                        className={
                          predictions[player.name]?.swedenGoals ===
                            bonusResults.swedenGoals && bonusResults.swedenGoals
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                      >
                        {predictions[player.name]?.swedenGoals}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold">Snabbaste målet:</p>
                      <p
                        className={
                          predictions[player.name]?.fastestGoal ===
                            bonusResults.fastestGoal && bonusResults.fastestGoal
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                      >
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
