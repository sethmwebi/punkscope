"use client";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { ReactNode } from "react";
interface MetaMaskProviderProps {
  children: ReactNode;
}

const MetaMaskProviderWrapper: React.FC<MetaMaskProviderProps> = ({
  children,
}) => {
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Punkscope",
          url: window.location.href,
        },
        infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_API_KEY,
        // Other options.
      }}
    >
      {children}
    </MetaMaskProvider>
  );
};

export default MetaMaskProviderWrapper;
