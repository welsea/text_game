'use client'

import { useEffect, useState } from "react";
import { Player } from "../lib/utils";
export default function Page({
  searchParams,
}: {
  searchParams: {
    name: string;
  };
}) {

  const name = searchParams.name;
  const [user, setUser] = useState<Player>()
  useEffect(() => {
    const fetchPlayer=async()=>{
      fetchPlayer()
    }
  }, [name])
  
  return <div>
    <div>
      <div>{name}</div>
    </div>
  </div>;
}
