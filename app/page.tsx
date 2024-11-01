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
          href={`/person/${billionaire.id}`}
          key={billionaire.id}
          className="bg-neutral-100 w-full h-96 dark:bg-gray-700 dark:text-white flex flex-col p-2 "
        >
          <img
            src={
              billionaire.squareImage.includes("undefined")
                ? "https://i.pinimg.com/474x/3e/c0/d4/3ec0d48e3332288604e8d48096296f3e.jpg"
                : billionaire.squareImage
            }
            className="w-auto h-auto"
          />

          <div className="flex flex-col my-auto ml-3">
            <div className="text-xl">{billionaire.name} </div>
            <div className="flex">
              <div>
                {Math.floor(billionaire.netWorth / 1000)} billion /&nbsp;
              </div>

              <div> {billionaire.industries}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
