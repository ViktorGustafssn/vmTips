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
    <div className="relative h-96 w-full">
      <img
        src={gyokeres}
        alt="gyokeres"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <h1
        style={{ fontFamily: "Quicksand, sans-serif" }}
        className="absolute font-bold text-5xl -bottom-3 w-full text-center"
      >
        VM-Tips 2026
      </h1>
      <p className="absolute -bottom-34 px-14 text-center leading-relaxed text-gray-300">
        Här tävlar vi om vem som kan förutspå VM bäst. Följ matcherna live,
        kolla topplistan och se hur dina tips håller sig!
      </p>
      <div className="flex flex-col absolute w-full bg-black/10 items-center">
        <p className="px-4 pt-3">{countdownLabel}</p>
        <div className="flex gap-2 px-4">
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
  );
}

export default Home;
