"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import layout from "./layout";

export interface Billionaire {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

export default function Home() {
  const [billionaires, setBillionaires] = useState<Billionaire[]>([]);

  useEffect(() => {
    const fetchBillionaires = async () => {
      const response = await fetch("/api/billionaire");
      const data = await response.json();
      setBillionaires(data.data);
    };
    fetchBillionaires();
  }, []);

  return (
    <main className="grid grid-cols-4 mx-36 mt-8 gap-4">
      {billionaires.map((billionaire) => (
        <div key={billionaire.id} className="bg-neutral-100 w-full h-auto">
          <img src={billionaire.squareImage} />
          <div>{billionaire.name}</div>
        </div>
      ))}
    </main>
  );
}
