import { useState, useEffect } from "react";
import gyokeres from "./assets/gyökeres2.png";

function Home() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const firstMatch = new Date("2026-06-11T15:00:00Z");

    const interval = setInterval(() => {
      const now = new Date();
      const diff = firstMatch - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

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
    <div
      className="relative h-64 h-screen"
      style={{
        backgroundImage: `url(${gyokeres})`,
        backgroundPosition: "center 5%",
        backgroundSize: "200%",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}

export default Home;
