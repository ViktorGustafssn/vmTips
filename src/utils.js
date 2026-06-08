export function calculatePredictionPoints(
  playerName,
  matchesToUse,
  predictions,
) {
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

  return points;
}

export function getActualTeamsByStage(matchesToUse) {
  return {
    roundOf32: matchesToUse
      .filter((m) => m.stage === "LAST_32")
      .flatMap((m) => [m.homeTeam.name, m.awayTeam.name]),
    roundOf16: matchesToUse
      .filter((m) => m.stage === "LAST_16")
      .flatMap((m) => [m.homeTeam.name, m.awayTeam.name]),
    quarterFinals: matchesToUse
      .filter((m) => m.stage === "QUARTER_FINALS")
      .flatMap((m) => [m.homeTeam.name, m.awayTeam.name]),
    semiFinals: matchesToUse
      .filter((m) => m.stage === "SEMI_FINALS")
      .flatMap((m) => [m.homeTeam.name, m.awayTeam.name]),
    finals: matchesToUse
      .filter((m) => m.stage === "FINAL")
      .flatMap((m) => [m.homeTeam.name, m.awayTeam.name]),
  };
}
