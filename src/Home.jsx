import { useState, useEffect } from "react";
import gyokeres from "./assets/gyökeres2.png";
import {
  HouseIcon,
  Trophy,
  SoccerBallIcon,
  UsersIcon,
  ChatsCircleIcon,
} from "@phosphor-icons/react";

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
            vi 24 tippare som ska göra upp om skryträtt, ära men framförallt
            prispotten.
          </p>

          <p>1:a plats: 2200kr</p>
          <p>2:a plats: 1000kr</p>
          <p className="mb-4">3:e plats: 400kr</p>

          <div className="flex justify-center pb-4">
            <button className="border border-gray-500 py-1 px-4 rounded-lg">
              Poängräkning
            </button>
          </div>

          <p className="mb-4">Här på hemsidan kommer du att hitta följande:</p>

          <p className="mb-4">
            <strong className="flex items-center gap-2">
              - TOPPLISTAN <Trophy size={18} />
            </strong>{" "}
            - Följ kampen om förstaplatsen men även sistaplatsen.
          </p>

          <p className="mb-4">
            <strong className="flex items-center gap-2">
              - MATCHERNA <SoccerBallIcon size={18} />
            </strong>{" "}
            - Live, kommande och spelade matcher. Klicka dig in på matchen och
            se vad alla har tippat för resultat.
          </p>

          <p className="mb-4">
            <strong className="flex items-center gap-2">
              - GÄSTBOKEN <ChatsCircleIcon size={18} />
            </strong>{" "}
            - Stället där diskussionerna förs. Berätta hur duktig du är på att
            tippa eller hitta på dåliga bortförklaringar eller varför inte en
            rolig kommentar? Här är stället du skriver för att nå alla.
          </p>
          <p className="mb-4">
            <strong className="flex items-center gap-2">
              - DELTAGARNA <UsersIcon size={18} />
            </strong>{" "}
            - Här kan du få tillgång till allas tippningar. Gå in och kika på
            någon och förbättra ditt eget självförtroende
          </p>
        </div>
        <div className="flex flex-col items-start px-10 text-gray-300 leading-relaxed">
          <p className="text-lg mb-4 font-bold">
            Den officiella poängräkningen
          </p>
          <p className="mb-4 font-semibold">Samtliga matcher i gruppen</p>
          <ol>
            <li>- Rätt antal mål per lag, 2 poäng</li>
            <li>- Rätt tecken (1X2), 3 poäng</li>
            <li>- 7 poäng kan delas ut i samtliga matcher</li>
          </ol>

          <p className="my-4 font-semibold">Slutspel:</p>
          <ol className="">
            <li>• Rätt lag i sextondel, 1 poäng per lag</li>
            <li>• Rätt lag i åttondelsfinal, 2 poäng per lag</li>
            <li>• Rätt lag i kvartsfinal, 4 poäng per lag</li>
            <li>• Rätt lag i semifinal, 6 poäng per lag</li>
            <li>• Rätt lag I final, 8 poäng per lag </li>
          </ol>

          <p className="my-4 font-semibold">Bonusfrågor</p>

          <ol className="list-decimal pl-4">
            <li>Skyttekung, 20 poäng</li>
            <li>Världsmästare, 20 poäng</li>
            <li>Vinnare bronsmatch, 20 poäng</li>
            <li>Lag som gör mest mål i gruppspelet, 10 poäng</li>
            <li>Lag som släpper in flest mål i gruppspelet, 10 poäng</li>
            <li>
              Hur många mål gör Sverige i VM (självmål räknas ej), 10 poäng
            </li>
            <li>Vilket land gör snabbaste målet i omgång 1, 10 poäng</li>
          </ol>
          <p className="py-4 font-semibold">
            Går du för full pott på det här tipset så kommer du få följande
            poäng:
          </p>
          <ol className="list-decimal pl-4">
            <li>Gruppspelet 504 poäng</li>
            <li>Sextondelsfinal 32 poäng</li>
            <li>Åttondelsfinal 32 poäng</li>
            <li>Kvartsfinal 32 poäng</li>
            <li>Semifinal 24 poäng</li>
            <li>Final 16 poäng</li>
            <li>Bonusfrågor 100 poäng</li>
          </ol>
          <p className="py-4">
            <strong>Totalt: </strong>740 poäng
          </p>
        </div>
      </div>
      <p className="text-center text-xs text-gray-600">© Kitte Spel & Dobbel</p>
    </div>
  );
}

export default Home;
