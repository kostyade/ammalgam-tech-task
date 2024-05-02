import { Token, useTokensList } from "@/hooks/useGetTokensList";
import { TokenInput } from "../TokenInput/TokenInput";
import React from "react";
import TokenBalance from "../TokenBalance/TokenBalance";
import PriceChart from "../Chart/Chart";

const Main = () => {
  const [selectedToken, setSelectedToken] = React.useState<Token | undefined>(
    undefined
  );

  const { data: TokensList } = useTokensList();

  return (
    <div className="flex flex-col p-10 m-x-10">
      {" "}
      <TokenInput tokenList={TokensList} setSelectedToken={setSelectedToken} />
      <div className="flex flex-col items-center gap-10">
        <TokenBalance token={selectedToken} />
        <PriceChart token={selectedToken} />
      </div>
    </div>
  );
};

export default Main;
