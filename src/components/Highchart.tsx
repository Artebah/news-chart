import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React from "react";
import FacebookIcon from "../assets/icons/facebook.svg";
import TelegramIcon from "../assets/icons/telegram.svg";
import TiktokIcon from "../assets/icons/tiktok.svg";
import ViberIcon from "../assets/icons/viber.svg";
import YoutubeIcon from "../assets/icons/youtube.svg";
import { GeneratedData } from "../types/GeneratedData";

interface HighchartProps {
  groupedData: GeneratedData;
}

const Highchart: React.FC<HighchartProps> = ({ groupedData }) => {
  const chartRef = React.useRef<HighchartsReactRefObject>(null);

  type StyleMapping = { name: string; icon: string; lineColor: string }[];

  const styleMapping: StyleMapping = [
    { name: "Youtube", icon: YoutubeIcon, lineColor: "#E30613" },
    { name: "Telegram", icon: TelegramIcon, lineColor: "#00CCE8" },
    { name: "Viber", icon: ViberIcon, lineColor: "#C944EE" },
    { name: "Tiktok", icon: TiktokIcon, lineColor: "#EE4484" },
    { name: "Facebook", icon: FacebookIcon, lineColor: "#0866FF" },
  ];

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
    series: styleMapping.map((style, i) => ({
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

        const { lineColor, icon } = styleMapping[id];

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
