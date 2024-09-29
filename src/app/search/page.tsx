"use client";
import { useSearchParams } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import HashLoader from "react-spinners/HashLoader";
import { format } from "date-fns";

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

const SearchPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("address");

  const { loading, data, error } = useQuery(GET_NFT, {
    variables: { id: search },
    skip: !search,
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
        Uh-oh, an error occurred.
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

export default SearchPage;
