import { useState, useEffect } from "react";
import gyokeres from "./assets/gyökeres2.png";
import {
  Trophy,
  SoccerBallIcon,
  UsersIcon,
  ChatsCircleIcon,
} from "@phosphor-icons/react";

function Home() {
  const [timeLeft, setTimeLeft] = useState({});
  const [countdownLabel, setCountdownLabel] = useState("Första matchen om");

  const swedenMatches = [
    {
      date: new Date("2026-06-15T04:00:00+02:00"),
      label: "Sverige - Tunisien",
    },
    {
      date: new Date("2026-06-20T19:00:00+02:00"),
      label: "Nederländerna - Sverige",
    },
    {
      date: new Date("2026-06-30T23:00:00+02:00"),
      label: "Frankrike - Sverige",
    },
  ];

  useEffect(() => {
    const firstMatch = new Date("2026-06-11T21:00:00+02:00");

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
          Slutvisslan har gått!
        </h1>
        <div className="px-10 leading-relaxed text-gray-300">
          <p className="mb-4 text-center"></p>
          <p>Spanien har lyft pokalen.</p>
          <p>Trumpen har skämt ut sig.</p>
          <p>Mbappé har vunnit skytteligan.</p>
          <p>
            England har vunnit brons och Bergöns VM-tips har nått sitt slut...
          </p>
          <br />
          <p>
            Nu öppnar vi skumpan och gratulerar Bertil till vinsten av tipset
            och vinstsumman av 2200kr, snyggt jobbat!
          </p>
          <p>2:a platsen har vi Petter, 1000kr rikare!</p>
          <p>Sista pallplatsen går till Ida, 400kr kommer in på kontot.</p>
          <br />
          <p>
            Vi på Kitte Spel & Dobbel vill tacka alla deltagare och alla er som
            hållit gästboken levande under mästerskapet!
          </p>
        </div>
      </div>
      <p className="text-center text-xs text-gray-600">© Kitte Spel & Dobbel</p>
    </div>
  );
}

export default Home;
