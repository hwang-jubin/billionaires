"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number; // 선택적 속성
}

interface Person {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: FinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

export default function BillionaireInfo() {
  const param = useParams();

  const [detail, setDetail] = useState<Person>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/detail/${param.id}`);
      const data = (await response.json()) as Person;
      setDetail(data);
    };

    fetchData();
  }, [param.id]);

  console.log(detail?.squareImage);

  return (
    <div className="gap-7 dark:text-white  my-8">
      <div className="mx-36 dark:bg-gray-700 bg-neutral-100 p-9 box-border flex flex-col gap-3 font-medium ">
        <img src={detail?.squareImage} className="max-w-xs h-auto" />

        <span className="text-2xl font-bold">{detail?.name}</span>
        <span className="text-lg">Country: {detail?.country}</span>
        <span className="text-lg">industry: {detail?.industries}</span>
        <p>{detail?.bio.map((p) => p)}</p>
      </div>
      <div className="mx-36 mt-8 dark:bg-gray-700 bg-neutral-100 p-9 box-border">
        <div className="text-2xl font-bold mb-5">Financial Assets</div>
        <div className="grid grid-cols-4 gap-4">
          {detail?.financialAssets.map((asset, index) => (
            <div key={index + 1} className="border-2 rounded-xl p-2">
              <div>Ticker: {asset.ticker}</div>
              <div>shares: {asset.sharePrice} </div>

              {asset.exerciseOptionPrice && (
                <div>Exercise price: {asset.exerciseOptionPrice}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
