"use client";
import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";

import { Button } from "./ui/button";
// import { Input } from "./ui/input";
import { TextHoverEffect } from "./ui/text-hover-effect";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  return (
    <div className="flex justify-around h-[50px] border-b border-1 items-center px-5 lg:px-20">
      <div className="">
        <Link href="/">
          <TextHoverEffect text="Punkscope" />
        </Link>
      </div>
      {/* <div className="flex-1"> */}
      {/*   <form onSubmit={handleSearch}> */}
      {/*     <Input */}
      {/*       type="search" */}
      {/*       className="rounded-full h-8 w-full border border-red-800 focus-visible:ring-0 !outline-none " */}
      {/*       placeholder="search bid nfts by address..." */}
      {/*       value={searchTerm} */}
      {/*       onChange={(e) => setSearchTerm(e.target.value)} */}
      {/*     /> */}
      {/*   </form> */}
      {/* </div> */}
      <div className="flex flex-1 space-x-4 items-center justify-end">
        {connected && (
          <Link href="/dashboard">
            <span>Dashboard</span>
          </Link>
        )}
        {!connected && (
          <Button
            variant="secondary"
            className="uppercase outline-none bg-gradient-to-l from-[#333333] to-[#dd1818] "
            onClick={connect}
          >
            connect
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
