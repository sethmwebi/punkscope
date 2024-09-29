"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { HashLoader } from "react-spinners";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const GET_BIDS = gql`
  query MyQuery {
    punkBidEntereds {
      blockNumber
      blockTimestamp
      fromAddress
      id
      value
      punkIndex
      transactionHash
    }
  }
`;
const displayShortened = (str: string) => {
  const start = str.slice(0, 8); // First 8 characters
  const end = str.slice(-8); // Last 6 characters
  return `${start}...${end}`; // Concatenate the parts
};
export const dynamic = "force-dynamic";
const HomePage = () => {
  const { loading, error, data } = useQuery(GET_BIDS);

  const searchTerm = useSelector((state: RootState) => state.search.term);

  if (loading)
    return (
      <div className="mb-20 flex justify-center items-center h-screen">
        <HashLoader color="#dd1818" size={20} />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        uh-oh an error occured
      </div>
    );

  const filteredBids = data.punkBidEntereds.filter((bid: any) =>
    bid.fromAddress.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 lg:mx-20 mt-10">
      {filteredBids?.map((bid: any) => (
        <Link href={bid.id} key={bid.id} className="">
          <CardSpotlight className="cursor-pointer h-32 flex flex-col justify-between">
            <div className="flex justify-between">
              <p>ID: {displayShortened(bid.id)}</p>
              <p>{bid.blockNumber}</p>
            </div>
            <div className="flex justify-center">{bid.value}</div>
            <div className="flex justify-between">
              <p className="hidden lg:block">
                {displayShortened(bid.transactionHash)}
              </p>

              <p className="hidden lg:block">
                {format(
                  new Date(bid.blockTimestamp * 1000),
                  "MMMM dd, yyyy HH:mm:ss",
                )}
              </p>
            </div>
          </CardSpotlight>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
