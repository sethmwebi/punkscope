"use client";
import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import React from "react";
import { HashLoader } from "react-spinners";

const GET_NFT = gql`
  query punkBidEntered($id: String!) {
    punkBidEntered(id: $id) {
      blockNumber
      blockTimestamp
      fromAddress
      id
      punkIndex
      transactionHash
      value
    }
  }
`;

export const dynamic = "force-dynamic";

const truncateString = (str: string, maxLength = 12) => {
  if (str.length <= maxLength) return str;
  const start = str.slice(0, 8);
  const end = str.slice(-8);
  return `${start}...${end}`;
};

const Nft = () => {
  const { nft } = useParams();

  const { loading, data, error } = useQuery(GET_NFT, {
    variables: { id: nft },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#dd1818" size={20} />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        uh-oh an error occured
      </div>
    );

  const { punkBidEntered } = data;

  return (
    <div className="flex items-center mt-20 px-20">
      <table className="w-full">
        <tbody className="flex w-full flex-col">
          <tr className="flex flex-col lg:flex-row max-w-full lg:justify-between items-center">
            <th className="">ID</th>
            <td className="line-clamp-1 overflow-hidden md:whitespace-nowrap">
              <span className="block md:hidden">
                {truncateString(punkBidEntered.id)}
              </span>
              <span className="hidden md:block">{punkBidEntered.id}</span>
            </td>
          </tr>
          <tr className="flex flex-col lg:flex-row w-full lg:justify-between items-center">
            <th>Block Number</th>
            <td>{punkBidEntered.blockNumber}</td>
          </tr>
          <tr className="flex w-full flex-col lg:flex-row lg:justify-between items-center">
            <th>Block Timestamp</th>
            <td>
              {format(
                new Date(punkBidEntered.blockTimestamp * 1000),
                "MM dd, yyyy HH:mm:ss",
              )}
            </td>
          </tr>
          <tr className="flex w-full flex-col lg:flex-row lg:justify-between items-center">
            <th>From Address</th>
            <td className="line-clamp-1 overflow-hidden md:whitespace-nowrap">
              <span className="block md:hidden">
                {truncateString(punkBidEntered.fromAddress)}
              </span>
              <span className="hidden md:block">
                {punkBidEntered.fromAddress}
              </span>
            </td>
          </tr>
          <tr className="flex w-full flex-col lg:flex-row lg:justify-between items-center">
            <th>Value</th>
            <td>{punkBidEntered.value}</td>
          </tr>
          <tr className="flex w-full flex-col lg:flex-row lg:justify-between items-center">
            <th>Transaction Hash</th>
            <td className="line-clamp-1 overflow-hidden md:whitespace-nowrap">
              <span className="block md:hidden">
                {truncateString(punkBidEntered.transactionHash)}
              </span>
              <span className="hidden md:block">
                {punkBidEntered.transactionHash}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Nft;
