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
import { calculatePredictionPoints } from "./utils.js";

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
        const actualSign =
          result.home > result.away
            ? "1"
            : result.home < result.away
              ? "2"
              : "X";

        if (tip.sign === actualSign) points += 3;

        if (result.home === tip.home) points += 2;
        if (result.away === tip.away) points += 2;
      }
    });

    return points;
  }

  function calculateBonusPoints(playerName) {
    let points = 0;
    const pred = predictions[playerName];
    if (!pred) return 0;

    if (pred.worldChampion === bonusResults.worldChampion) points += 20;
    if (pred.bronzeWinner === bonusResults.bronzeWinner) points += 20;
    if (pred.topScorer === bonusResults.topScorer) points += 20;
    if (pred.mostGoalsTeam === bonusResults.mostGoalsTeam) points += 10;
    if (pred.mostConcededTeam === bonusResults.mostConcededTeam) points += 10;
    if (pred.swedenGoals === bonusResults.swedenGoals) points += 10;
    if (pred.fastestGoal === bonusResults.fastestGoal) points += 10;

    return points;
  }

  useEffect(() => {
    let cancelled = false;

    const fetchData = () => {
      fetch("/api/v4/competitions/WC/matches", {
        headers: { "X-Auth-Token": import.meta.env.VITE_API_KEY },
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;

          const matchesWithTips = data.matches.map((apiMatch) => {
            const localMatch = matches.find(
              (m) =>
                m.home === apiMatch.homeTeam.name &&
                m.away === apiMatch.awayTeam.name,
            );
            return { ...apiMatch, tips: localMatch ? localMatch.tips : {} };
          });

          setLiveMatches(matchesWithTips);

          const calculated = players
            .map((player) => ({
              ...player,
              points:
                calculatePoints(player.name, matchesWithTips) +
                calculatePredictionPoints(
                  player.name,
                  matchesWithTips,
                  predictions,
                ) +
                calculateBonusPoints(player.name),
            }))
            .sort((a, b) => b.points - a.points);

          setPlayersWithPoints(calculated);
        })
        .catch(() => console.error("Kunde inte hämta matchdata"));
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // 30s under live, annars 60s

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="pb-20">
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
        {activeTab === "comments" ? <Comments /> : null}
      </div>
    </>
  );
}

export default App;
