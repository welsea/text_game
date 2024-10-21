export default function Playerinfo({ player }: { player: any }) {
  return (
    <div className="flex justify-between w-3/5 m-[auto] pt-5 ">
      <div>Player: {player.name}</div>
      <div>Score: {player.score ? player.score : 0}</div>
      <div>Played: {player.played?.length ? player.played.length : 0}</div>
    </div>
  );
}
