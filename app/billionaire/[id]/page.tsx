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
  console.log(param.id);

  const [detail, setDetail] = useState<Person>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/detail/${param.id}`);
      const data = (await response.json()) as Person;
      setDetail(data);
    };

    fetchData();
  }, [param.id]);

  return (
    <div>
      <img src={detail?.thumbnail} />
    </div>
  );
}
