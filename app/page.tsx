"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

interface Billionaire {
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
    <div className="grid grid-cols-4 mx-36 mt-8 gap-4">
      {billionaires.map((billionaire) => (
        <Link
          href={`/billionaire/${billionaire.id}`}
          key={billionaire.id}
          className="bg-neutral-100 w-full h-auto"
        >
          <img src={billionaire.squareImage} />

          <div>{billionaire.name} </div>
          <div className="flex">
            <div>{billionaire.netWorth} / </div>
            <div> {billionaire.industries}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
