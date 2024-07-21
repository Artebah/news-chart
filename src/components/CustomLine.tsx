import React from "react";
import { Line } from "react-chartjs-2";

interface CustomLineProps {
  labels: string[];
  counts: number[];
}

const CustomLine: React.FC<CustomLineProps> = ({ counts, labels }) => {
  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            data: counts,
            label: "Кількість постів",
            borderColor: "#e4c7fc",
            pointBorderColor: "rgba(148, 51, 204, .3)",
            pointBackgroundColor: "#d096ff",
            pointBorderWidth: 0,
            pointRadius: 6,
            pointHoverBorderWidth: 8,
            pointHoverRadius: 7,
          },
        ],
      }}
      options={{
        scales: {
          x: {
            grid: {
              color: "#4e2173",
            },
          },
          y: {
            grid: {
              color: "#4e2173",
            },
          },
        },
      }}
    />
  );
};

export { CustomLine };
