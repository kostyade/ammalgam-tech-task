import { Token } from "@/hooks/useGetTokensList";
import { useAccount, useBalance } from "wagmi";

interface TokenBalanceProps {
  token?: Token;
}

const TokenBalance = ({ token }: TokenBalanceProps) => {
  const account = useAccount();

  const { data } = useBalance({
    address: account?.address,
    token: token?.address as `0x${string}`,
  });

  if (!account.address && !!token) {
    return <span>Please connect your wallet to see token balance</span>;
  }

  if (!token) {
    return;
  }

  return (
    <div>
      Your Balance of{" "}
      <span className="font-bold">
        {`${token.name} (${token.symbol})`}: {data?.formatted}
      </span>
    </div>
  );
};

export default TokenBalance;
