import { Trophy, SoccerBallIcon, UsersIcon } from "@phosphor-icons/react";

function Navbar(props) {
  return (
    <ol className="flex justify-center w-full gap-2 p-4">
      <li
        onClick={() => props.setActiveTab("topplista")}
        className="flex items-center justify-center gap-1 border border-[#2a2a2a] py-2 px-4 rounded-lg flex-wrap"
      >
        <Trophy size={24} />
        <p>Topplista</p>
      </li>
      <li
        onClick={() => props.setActiveTab("matcher")}
        className="flex items-center justify-center gap-1 border border-[#2a2a2a] py-2 px-4 rounded-lg flex-wrap"
      >
        <SoccerBallIcon size={24} />
        <p>Matcher</p>
      </li>
      <li
        onClick={() => props.setActiveTab("deltagare")}
        className="flex items-center justify-center gap-1 border border-[#2a2a2a] py-2  px-4 rounded-lg flex-wrap"
      >
        <UsersIcon size={24} />
        <p>Deltagare</p>
      </li>
    </ol>
  );
}

export default Navbar;
