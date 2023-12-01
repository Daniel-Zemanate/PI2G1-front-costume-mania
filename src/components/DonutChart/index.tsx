import React, { FC } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  PieLabelRenderProps,
  Tooltip,
  Label,
} from "recharts";

type Props = {
  data: {
    quantitySales: number;
    quantityDeliveredSales: number;
  };
};

const QUANTITIES = ["quantitySales", "quantityDeliveredSales"];

const DonutChart: FC<Props> = ({ data }) => {
  const quantitiesArray = Object.entries(data)
    .filter(([key, value]) => QUANTITIES.includes(key))
    .map(([key, value]) => ({
      name: key,
      value: value,
    }));
  
  const deliveredPercentage = ((data.quantityDeliveredSales / data.quantitySales)*100).toFixed(2)

  return (
    <ResponsiveContainer width={"100%"} height={"100%"} className="p-2">
      <PieChart width={300} height={300}>
        <Pie
          data={quantitiesArray}
          dataKey="value" 
          innerRadius={60}
          outerRadius={80}
        >
          {quantitiesArray.map((entry, index) => {
            if (index === 1) {
              return <Cell key={`cell-${index}`} fill="#f3f6f9" />; // make sure to map the index to the colour you want
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
