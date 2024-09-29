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
            <td className="line-clamp-1 overflow-hidden">
              {punkBidEntered.id}
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
                "MMMM dd, yyyy HH:mm:ss",
              )}
            </td>
          </tr>
          <tr className="flex w-full flex-col lg:flex-row lg:justify-between items-center">
            <th>From Address</th>
            <td>{punkBidEntered.fromAddress}</td>
          </tr>
          <tr className="flex w-full flex-col lg:flex-row lg:justify-between items-center">
            <th>Value</th>
            <td>{punkBidEntered.value}</td>
          </tr>
          <tr className="flex w-full flex-col lg:flex-row lg:justify-between items-center">
            <th>Transaction Hash</th>
            <td>{punkBidEntered.transactionHash}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Nft;
