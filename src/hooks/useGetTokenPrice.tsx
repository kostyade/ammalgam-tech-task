import { useQuery } from "@tanstack/react-query";

export const useGetTokenPrice = (tokenId?: string) => {
  const getTokenPriceData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?${new URLSearchParams(
      {
        vs_currency: "usd",
        days: "30",
      }
    )}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-token-price", tokenId],
    queryFn: getTokenPriceData,
    enabled: !!tokenId,
  });

  return { data, isError, isLoading, error, refetch };
};
