import { useQuery } from "@tanstack/react-query";

interface EthToken {
  name: string;
  address: string;
  symbol: string;
  chainId: number;
  decimals: number;
  logoURI: string;
}

interface CoingeckoToken {
  id: string;
  symbol: string;
  name: string;
}

export interface Token extends EthToken {
  coinGeckoId: string;
}

//Fetching the list of tokens from the popular.json file and the coingecko API, as we need token address, decimals and coingecko id to get price data

export const useTokensList = () => {
  const getETHTokensList = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/SmolDapp/tokenLists/main/lists/popular.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonList = await response.json();
    const tokensList = jsonList?.tokens.filter((token: EthToken) => {
      return token.chainId === 1;
    });
    return tokensList;
  };
  const getCoingeckoTokensList = async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const tokensList = await response.json();

    return tokensList;
  };

  const getTokensList = async () => {
    const [ethTokensList, coingeckoTokensList] = await Promise.all([
      getETHTokensList(),
      getCoingeckoTokensList(),
    ]);
    const tokensList = ethTokensList
      .map((tokenData: EthToken) => {
        const coingeckoToken = coingeckoTokensList.find(
          (coingeckoToken: CoingeckoToken) => {
            return (
              coingeckoToken.symbol.toLowerCase() ===
              tokenData.symbol.toLowerCase()
            );
          }
        );
        if (coingeckoToken) {
          return {
            ...tokenData,
            coinGeckoId: coingeckoToken.id,
          };
        }
        return tokenData;
      })
      .filter((token: Token) => token.coinGeckoId);
    return tokensList;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-tokens-list"],
    queryFn: getTokensList,
    staleTime: 1000 * 60 * 10, // 10 minutes,
  });

  return { data, isError, isLoading, error, refetch };
};
