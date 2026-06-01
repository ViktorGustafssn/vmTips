import { useState, useEffect } from "react";
import "./App.css";
import Toplist from "./Toplist.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Matches from "./Matches.jsx";
import Participants from "./Participants.jsx";
import Comments from "./Comment.jsx";
import { players, matches, predictions } from "./data.js";
import { bonusResults } from "./results.js";

function App() {
  const [activeTab, setActiveTab] = useState("hem");
  const [liveMatches, setLiveMatches] = useState([]);
  const [playersWithPoints, setPlayersWithPoints] = useState([]);

  function calculatePoints(playerName, matchesToUse) {
    let points = 0;

    matchesToUse.forEach((match) => {
      if (match.score?.fullTime?.home !== null && match.tips?.[playerName]) {
        const result = match.score.fullTime;
        const tip = match.tips[playerName];

        if (result.home === tip.home) points += 2;
        if (result.away === tip.away) points += 2;

        if (result.home > result.away && tip.home > tip.away) points += 3;
        else if (result.home < result.away && tip.home < tip.away) points += 3;
        else if (result.home === result.away && tip.home === tip.away)
          points += 3;
      }
    });

    return points;
  }

  function calculatePredictionPoints(playerName, matchesToUse) {
    let points = 0;
    const pred = predictions[playerName];
    if (!pred) return 0;

    const stageMap = [
      { stage: "LAST_32", predKey: "roundOf32", points: 1 },
      { stage: "LAST_16", predKey: "roundOf16", points: 2 },
      { stage: "QUARTER_FINALS", predKey: "quarterFinals", points: 4 },
      { stage: "SEMI_FINALS", predKey: "semiFinals", points: 6 },
      { stage: "FINAL", predKey: "finals", points: 8 },
    ];

    stageMap.forEach(({ stage, predKey, points: pts }) => {
      const stageMatches = matchesToUse.filter((m) => m.stage === stage);
      const actualTeams = stageMatches.flatMap((m) => [
        m.homeTeam.name,
        m.awayTeam.name,
      ]);
      pred[predKey].forEach((team) => {
        if (actualTeams.includes(team)) points += pts;
      });
    });

    // Bronsmatch
    const bronzeMatch = matchesToUse.find((m) => m.stage === "THIRD_PLACE");
    if (bronzeMatch && bronzeMatch.score?.fullTime?.home !== null) {
      const bronzeWinner =
        bronzeMatch.score.fullTime.home > bronzeMatch.score.fullTime.away
          ? bronzeMatch.homeTeam.name
          : bronzeMatch.awayTeam.name;
      if (pred.bronzeWinner === bronzeWinner) points += 20;
    }

    // Världsmästare
    const final = matchesToUse.find((m) => m.stage === "FINAL");
    if (final && final.score?.fullTime?.home !== null) {
      const champion =
        final.score.fullTime.home > final.score.fullTime.away
          ? final.homeTeam.name
          : final.awayTeam.name;
      if (pred.worldChampion === champion) points += 20;
    }

    return points;
  }

  function calculateBonusPoints(playerName) {
    let points = 0;
    const pred = predictions[playerName];
    if (!pred) return 0;

    if (pred.topScorer === bonusResults.topScorer) points += 20;
    if (pred.mostGoalsTeam === bonusResults.mostGoalsTeam) points += 10;
    if (pred.mostConcededTeam === bonusResults.mostConcededTeam) points += 10;
    if (pred.swedenGoals === bonusResults.swedenGoals) points += 10;
    if (pred.fastestGoal === bonusResults.fastestGoal) points += 10;

    return points;
  }

  useEffect(() => {
    fetch("/api/v4/competitions/WC/matches", {
      headers: {
        "X-Auth-Token": import.meta.env.VITE_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const matchesWithTips = data.matches.map((apiMatch) => {
          const localMatch = matches.find(
            (m) =>
              m.home === apiMatch.homeTeam.name &&
              m.away === apiMatch.awayTeam.name,
          );
          return { ...apiMatch, tips: localMatch ? localMatch.tips : {} };
        });

        setLiveMatches(matchesWithTips);

        // Räkna poäng här, när matchesWithTips är klar
        const calculated = players
          .map((player) => ({
            ...player,
            points:
              calculatePoints(player.name, matchesWithTips) +
              calculatePredictionPoints(player.name, matchesWithTips) +
              calculateBonusPoints(player.name),
          }))
          .sort((a, b) => b.points - a.points);

        setPlayersWithPoints(calculated);
      });
  }, []);

  return (
    <>
      <div className="">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "hem" ? <Home /> : null}
        {activeTab === "topplista" ? (
          <div className="pt-1">
            <Toplist players={playersWithPoints} />
          </div>
        ) : null}
        {activeTab === "matcher" ? (
          <div className="pt-4">
            <Matches players={playersWithPoints} matches={liveMatches} />
          </div>
        ) : null}
        {activeTab === "deltagare" ? (
          <div className="pt-4">
            <Participants players={playersWithPoints} matches={liveMatches} />
          </div>
        ) : null}
        <div className="pt-4">
          {activeTab === "comments" ? <Comments /> : null}
        </div>
      </div>
    </>
  );
}

export default App;
