function Participants(props) {
  return (
    <ol className="flex flex-col px-4 gap-4">
      {props.players.map((player, index) => (
        <li
          key={player.id}
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
          <div className="flex justify-around items-center">
            <div className="flex flex-col items-center">
              <p className="text-lg">1</p>
              <p className="text-xs text-gray-400">Rätt tecken</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg">1</p>
              <p className="text-xs text-gray-400">Rätt mål</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg">1</p>
              <p className="text-xs text-gray-400">Exakta</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Participants;
