function Toplist(props) {
  return (
    <ol className="flex flex-col gap-2 py-4 font-sans">
      {props.players.map((player, index) => (
        <li
          key={player.id}
          className="flex justify-between items-center border border-[#2a2a2a] rounded-lg h-16 px-2 mx-4 bg-[#1a1a1a]"
        >
          <div className="flex items-center gap-2">
            <p
              className={`w-8 text-center text-gray-400 ${index < 3 ? "text-xl" : "text-base"}`}
            >
              {index === 0
                ? "🥇"
                : index === 1
                  ? "🥈"
                  : index === 2
                    ? "🥉"
                    : index + 1}
            </p>
            <p className="font-semibold">{player.name}</p>
          </div>
          <p className="flex gap-1 items-center">
            <span className="text-base font-semibold">{player.points}</span>
            <span className="text-sm text-gray-400">poäng</span>
          </p>
        </li>
      ))}
    </ol>
  );
}

export default Toplist;
