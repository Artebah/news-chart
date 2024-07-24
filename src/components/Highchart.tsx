import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React from "react";

interface HighchartProps {
  data: [number, number][];
}

const Highchart: React.FC<HighchartProps> = ({ data }) => {
  const options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 300,
      spacingBottom: 0,
      plotBorderColor: "",
      borderColor: "#fff",
    },
    xAxis: {
      gridLineColor: "#4e2173",
      grid: {
        enabled: false,
      },
      labels: {
        style: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      gridLineColor: "#4e2173",
      allowDecimals: false,
    },
    navigator: {
      enabled: true,
    },
    rangeSelector: {
      enabled: true,
    },
    series: [
      {
        name: "Постів",
        data: data,
        //data: [
        //  [new Date("2024-07-10").getTime(), 4],
        //  [new Date("2024-07-11").getTime(), 1],
        //  [new Date("2024-07-12").getTime(), 7],
        //  [new Date("2024-07-13").getTime(), 10],
        //  [new Date("2024-07-14").getTime(), 4],
        //  [new Date("2024-07-15").getTime(), 15],
        //  [new Date("2024-07-16").getTime(), 3],
        //  [new Date("2024-07-17").getTime(), 9],
        //],
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};

export { Highchart };
