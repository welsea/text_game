"use client";
export default function Home() {
  return (
    <main className="w-full h-screen pt-[10%] bg-[#aac0c0]">
      <div className="w-fit h-fit m-[auto] bg-white px-10 py-3 flex flex-col rounded-sm">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-3 mt-2"
          placeholder="Enter a room code"
        />
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-3 mt-2"
          placeholder="Enter your name"
        />
        <button className="border border-green-600 text-green-800 block mt-2 px-2 py-1 rounded-md">
          Confirm
        </button>
      </div>
    </main>
  );
}
