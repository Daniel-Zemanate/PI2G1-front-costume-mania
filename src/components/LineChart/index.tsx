import {
  LineChart as RechartLineGraph,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: string }[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded border">
        <p className="label w-full text-center font-bold">
          {`Período: ${label}`}
        </p>
        <p className="text-center text-black">
          {`Average shipping days: ${Number(payload[0].value).toFixed(2)}`}
        </p>
      </div>
    );
  }

  return null;
};

type Props = {
  data: any[];
};

const LineChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={300} className="p-2">
      <RechartLineGraph
        data={data}
        width={850}
        height={300}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <Line type="monotone" dataKey="averageShippingTime" stroke="#B71FD0" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="period"
          label={{ value: "Period", position: "insideBottom" }}
          height={50}
        />
        <YAxis
          label={{ value: "Days", angle: -90, position: "insideLeft" }}
          width={50}
        />
        <Tooltip content={<CustomTooltip />} />
      </RechartLineGraph>
    </ResponsiveContainer>
  );
};

export default LineChart;
