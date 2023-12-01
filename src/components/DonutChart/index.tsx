import React, { FC } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Label,
} from "recharts";

type Props = {
  data: {
    quantitySales: number;
    quantityDeliveredSales: number;
  };
};

const DonutChart: FC<Props> = ({ data }) => {
  const quantityNotDeliveredSales =
    data.quantitySales - data.quantityDeliveredSales;

  const graphData = [
    {
      name: "quantityDeliveredSales",
      value: data.quantityDeliveredSales,
    },
    {
      name: "quantityNotDeliveredSales",
      value: quantityNotDeliveredSales,
    },
  ];

  const deliveredPercentage = (
    (data.quantityDeliveredSales / data.quantitySales) *
    100
  ).toFixed(2);

  return (
    <ResponsiveContainer width={"100%"} height={"100%"} className="p-2">
      <PieChart width={300} height={300}>
        <Pie
          data={graphData}
          dataKey="value"
          innerRadius={60}
          outerRadius={80}
        >
          {graphData.map((entry, index) => {
            if (index === 1) {
              return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
            }
            return <Cell key={`cell-${index}`} fill="#B71FD0" />;
          })}
          <Label
            value={`${deliveredPercentage} %`}
            position="center"
            className="text-2xl"
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
