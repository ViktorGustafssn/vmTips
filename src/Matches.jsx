import MatchCard from "./MatchCard";

function Matches(props) {
  return (
    <ol className="flex flex-col justify-center items-center m-4 gap-4">
      {props.matches.map((match) => (
        <MatchCard key={match.id} match={match} players={props.players} />
      ))}
    </ol>
  );
}

export default Matches;
