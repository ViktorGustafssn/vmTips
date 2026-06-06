import { useState, useEffect } from "react";
import gyokeres from "./assets/gyökeres2.png";

function Home() {
  const [timeLeft, setTimeLeft] = useState({});
  const [countdownLabel, setCountdownLabel] = useState("Första matchen om");

  const swedenMatches = [
    { date: new Date("2026-06-15T04:00:00Z"), label: "Sverige - Tunisien" },
    {
      date: new Date("2026-06-20T19:00:00Z"),
      label: "Nederländerna - Sverige",
    },
    { date: new Date("2026-06-26T01:00:00Z"), label: "Japan - Sverige" },
  ];

  useEffect(() => {
    const firstMatch = new Date("2026-06-11T15:00:00Z");

    const interval = setInterval(() => {
      const now = new Date();

      const nextSwedenMatch = swedenMatches.find((m) => now < m.date);
      const target = now < firstMatch ? firstMatch : nextSwedenMatch?.date;

      if (!target) {
        clearInterval(interval);
        return;
      }

      const label =
        now < firstMatch ? "Första matchen om" : nextSwedenMatch?.label;

      const diff = target - now;

      setCountdownLabel(label);
      setTimeLeft({
        dagar: Math.floor(diff / (1000 * 60 * 60 * 24)),
        timmar: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minuter: Math.floor((diff / (1000 * 60)) % 60),
        sekunder: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div>
        <img
          src={gyokeres}
          alt="gyokeres"
          className="relative inset-0 w-full h-86 object-cover object-top"
        />
        <div className="flex flex-col top-0 left-0 absolute w-full bg-black/10 items-center">
          <p className="px-4 pt-3">{countdownLabel}</p>
          <div className="flex gap-2 px-4 sticky">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="flex flex-col items-center rounded-lg p-1 flex-1"
              >
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-gray-400">{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1
          style={{ fontFamily: "Quicksand, sans-serif" }}
          className="font-bold text-3xl w-full text-center"
        >
          Välkommen till Bergöns VM-tips 2026
        </h1>
        <div className="px-10 leading-relaxed text-gray-300">
          <p className="mb-4 text-center">
            Efter 8 års väntan är Sverige äntligen tillbaka i VM, och nu är det
            dags för oss att följa mästerskapet tillsammans! I årets upplaga är
            vi 21 tippare som ska göra upp om skryträtt, ära men framförallt
            prispotten. Här på hemsidan kommer du att hitta följande:
          </p>

          <p className="mb-4">
            <strong>- TOPPLISTAN</strong> - Följ kampen om förstaplatsen men
            även sistaplatsen.
          </p>

          <p className="mb-4">
            <strong>- MATCHERNA</strong> - Live, kommande och spelade matcher.
            Klicka dig in på matchen och se vad alla har tippat för resultat.
          </p>

          <p className="mb-4">
            <strong>- GÄSTBOKEN</strong> - Stället där diskussionerna förs.
            Berätta hur duktig du är på att tippa eller hitta på dåliga
            bortförklaringar eller varför inte en rolig kommentar? Här är
            stället du skriver för att nå alla.
          </p>
          <p className="mb-4">
            <strong>- DELTAGARNA</strong> - Här kan du få tillgång till allas
            tippningar. Gå in och kika på någon och förbättra ditt eget
            självförtroende
          </p>
        </div>
      </div>
      <p className="text-center text-xs text-gray-600">© Kitte Spel & Dobbel</p>
    </div>
  );
}

export default Home;
