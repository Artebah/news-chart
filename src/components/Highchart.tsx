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
    accessibility: {
      enabled: false,
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
        name: "Кількість постів",
        data: data,
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
