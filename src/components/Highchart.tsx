import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React from "react";
import { SOCIALS_STYLE } from "../constants/socials-style";
import { GeneratedData } from "../types/GeneratedData";

interface HighchartProps {
  groupedData: GeneratedData;
}

const Highchart: React.FC<HighchartProps> = ({ groupedData }) => {
  const chartRef = React.useRef<HighchartsReactRefObject>(null);

  const options: Highcharts.Options = {
    accessibility: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    scrollbar: {
      barBackgroundColor: "#5C646D",
      buttonsEnabled: true,
      buttonArrowColor: "#fff",
      buttonBorderWidth: 0,
      barBorderWidth: 0,
      buttonBackgroundColor: "#7E848B",
      margin: 5,
      height: 20,
    },
    navigator: {
      enabled: true,
      maskFill: "rgba(85, 93, 103, .6)",
    },
    chart: {
      type: "line",
      height: 400,
      spacingBottom: 0,
      backgroundColor: "transparent",
    },
    xAxis: {
      labels: {
        style: {
          color: "#fff",
        },
      },
    },

    yAxis: {
      gridLineColor: "#636d78",
      allowDecimals: false,
      labels: {
        style: {
          color: "#fff",
        },
      },
    },

    rangeSelector: {
      enabled: true,

      inputStyle: {
        color: "#fff",
      },

      buttons: [],
    },
    series: SOCIALS_STYLE.map((style, i) => ({
      data: groupedData[i],
      name: style.name,
      color: style.lineColor,
      type: "line",
    })),

    legend: {
      enabled: true,
      layout: "horizontal",
      align: "center",
      labelFormatter: function () {
        const id = this.index;

        if (!groupedData[id].length) return ``;

        const { lineColor, icon } = SOCIALS_STYLE[id];

        return `
          <div class="highchart-legend-item">
            <div class="highchart-legend-item-content">
              <span class="highchart-legend-item-content-icon" style="background: url(${icon}) no-repeat;"></span>
              <span class="highchart-legend-item-content-name">${this.name}</span>
            </div>
            <div class="legend-icon" style="border: 3px solid ${lineColor};  border-radius: 10px;"></div>
          </div>
        `;
      },
      useHTML: true,
    },
  };

  React.useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;

      chart.xAxis[0].setExtremes(1, 1);
    }
  }, [groupedData]);

  return (
    <div className="highchart panel">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

export { Highchart };
