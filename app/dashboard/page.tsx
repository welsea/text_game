export default function Page() {
  const players = [1, 2, 3, 4];
  return (
    <div>
      <div>
        <button>Generate a room</button>
        <div>display code</div>
      </div>
      <div>{players.map((item: any, index: number) => {
        return <div>
            player.name
            <span>status: creating, finish, score</span>
            <button className="border-none bg-gray-200">x</button>
        </div>
      })}</div>
    </div>
  );
}
