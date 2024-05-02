import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useGetTokenPrice } from "@/hooks/useGetTokenPrice";
import { Token } from "@/hooks/useGetTokensList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface PriceChartProps {
  token?: Token;
}

const PriceChart = ({ token }: PriceChartProps) => {
  const { data: TokenPriceData } = useGetTokenPrice(token?.coinGeckoId);

  if (!TokenPriceData || !token) {
    return null;
  }
  const coinChartData = TokenPriceData.prices.map((value: any) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };
  const data = {
    labels: coinChartData.map((value: any) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: `${token.name} (${token.symbol}) Price Chart`,
        data: coinChartData.map((val: any) => val.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="lg:w-10/12 w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default PriceChart;
