import { Trophy, SoccerBallIcon, UsersIcon } from "@phosphor-icons/react";

function Navbar(props) {
  return (
    <ol className="flex justify-center w-full gap-2 p-4">
      <li
        onClick={() => props.setActiveTab("hem")}
        className="flex-1 flex flex-col items-center justify-center gap-1 border border-[#2a2a2a] py-2 rounded-lg"
      >
        <Trophy size={24} />
        <p className="text-sm">Hem</p>
      </li>
      <li
        onClick={() => props.setActiveTab("topplista")}
        className="flex-1 flex flex-col items-center justify-center gap-1 border border-[#2a2a2a] py-2 rounded-lg"
      >
        <Trophy size={24} />
        <p className="text-sm">Topplista</p>
      </li>
      <li
        onClick={() => props.setActiveTab("matcher")}
        className="flex-1 flex flex-col items-center justify-center gap-1 border border-[#2a2a2a] py-2 rounded-lg"
      >
        <SoccerBallIcon size={24} />
        <p className="text-sm">Matcher</p>
      </li>
      <li
        onClick={() => props.setActiveTab("deltagare")}
        className="flex-1 flex flex-col items-center justify-center gap-1 border border-[#2a2a2a] py-2 rounded-lg"
      >
        <UsersIcon size={24} />
        <p className="text-sm">Deltagare</p>
      </li>
    </ol>
  );
}

export default Navbar;
