"use client";
import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TextHoverEffect } from "./ui/text-hover-effect";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "@/lib/features/search/searchSlice";

const Navbar = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const [searchTerm, setSearchTermInput] = useState("");
  const dispatch = useDispatch();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTermInput(value);
    dispatch(setSearchTerm(value));
  };

  return (
    <div className="flex justify-around h-[50px] border-b border-1 items-center px-5 lg:px-20">
      <div className="hidden md:block">
        <Link href="/">
          <TextHoverEffect text="Punkscope" />
        </Link>
      </div>
      <div className="md:hidden">
        <Link href="/">
          <span className="uppercase text-[#dd1818] font-black text-3xl">
            ps
          </span>
        </Link>
      </div>
      <div className="w-[50%] md:w-[60%] flex justify-center">
        <Input
          type="search"
          className="rounded-full h-8 md:w-full border border-red-800 focus-visible:ring-0 !outline-none"
          placeholder="search bid nfts by address..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="flex ml-4 space-x-4 items-center justify-end">
        {connected && (
          <Link href="/dashboard">
            <span>Dashboard</span>
          </Link>
        )}
        {!connected && (
          <Button
            variant="secondary"
            className="uppercase outline-none bg-gradient-to-l from-[#333333] to-[#dd1818]"
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
