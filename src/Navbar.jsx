import {
  HouseIcon,
  Trophy,
  SoccerBallIcon,
  UsersIcon,
  ChatsCircleIcon,
} from "@phosphor-icons/react";

function Navbar(props) {
  return (
    <ol className="flex justify-center w-full gap-2 px-4 py-6 fixed bottom-0 bg-black/80 backdrop-blur-md">
      <li
        onClick={() => props.setActiveTab("hem")}
        className="flex-1 flex flex-col items-center justify-center gap-1"
      >
        <HouseIcon size={36} />
      </li>
      <li
        onClick={() => props.setActiveTab("topplista")}
        className="flex-1 flex flex-col items-center justify-center gap-1"
      >
        <Trophy size={36} />
      </li>
      <li
        onClick={() => props.setActiveTab("matcher")}
        className="flex-1 flex flex-col items-center justify-center gap-1"
      >
        <SoccerBallIcon size={36} />
      </li>
      <li
        onClick={() => props.setActiveTab("comments")}
        className="flex-1 flex flex-col items-center justify-center gap-1"
      >
        <ChatsCircleIcon size={36} />
      </li>
      <li
        onClick={() => props.setActiveTab("deltagare")}
        className="flex-1 flex flex-col items-center justify-center gap-1"
      >
        <UsersIcon size={36} />
      </li>
    </ol>
  );
}

export default Navbar;
