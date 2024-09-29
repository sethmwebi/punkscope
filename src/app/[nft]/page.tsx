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
    <div className="flex justify-center mt-20">
      <table>
        <tbody>
          <tr>
            <th className="text-left">ID</th>
            <td className="text-right">{punkBidEntered.id}</td>
          </tr>
          <tr>
            <th className="text-left">Block Number</th>
            <td className="text-right">{punkBidEntered.blockNumber}</td>
          </tr>
          <tr>
            <th className="text-left">Block Timestamp</th>
            <td className="text-right">
              {format(
                new Date(punkBidEntered.blockTimestamp * 1000),
                "MMMM dd, yyyy HH:mm:ss",
              )}
            </td>
          </tr>
          <tr>
            <th className="text-left">From Address</th>
            <td className="text-right">{punkBidEntered.fromAddress}</td>
          </tr>
          <tr>
            <th className="text-left">Value</th>
            <td className="text-right">{punkBidEntered.value}</td>
          </tr>
          <tr>
            <th className="text-left">Transaction Hash</th>
            <td className="text-right">{punkBidEntered.transactionHash}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Nft;
