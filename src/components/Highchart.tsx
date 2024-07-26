import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React from "react";
import TelegramIcon from "../assets/icons/telegram.svg";
import TiktokIcon from "../assets/icons/tiktok.svg";
import ViberIcon from "../assets/icons/viber.svg";
import YoutubeIcon from "../assets/icons/youtube.svg";

interface HighchartProps {
  data: [number, number][];
}

const Highchart: React.FC<HighchartProps> = ({ data }) => {
  const chartRef = React.useRef<HighchartsReactRefObject>(null);

  type StyleMapping = {
    [key: string]: { icon: string; lineColor: string };
  };
  const styleMapping: StyleMapping = {
    Youtube: { icon: YoutubeIcon, lineColor: "#E30613" },
    Telegram: { icon: TelegramIcon, lineColor: "#00CCE8" },
    Viber: { icon: ViberIcon, lineColor: "#C944EE" },
    TikTok: { icon: TiktokIcon, lineColor: "#EE4484" },
  };

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
    series: [
      {
        name: "Youtube",
        data: data,
        color: styleMapping.Youtube.lineColor,
        type: "line",
      },
      {
        name: "Telegram",
        data: data,
        color: styleMapping.Telegram.lineColor,
        type: "line",
      },
      {
        name: "Viber",
        data: data,
        color: styleMapping.Viber.lineColor,
        type: "line",
      },
      {
        name: "TikTok",
        data: data,
        color: styleMapping.TikTok.lineColor,
        type: "line",
      },
    ],
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "center",
      labelFormatter: function () {
        const { lineColor, icon } = styleMapping[this.name];

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
    if (chartRef.current && data.length > 0) {
      const chart = chartRef.current.chart;

      console.log("chart data", data);
      chart.xAxis[0].setExtremes(data[0][0], data[10][0]);
    }
  }, [data]);

  //const updateRange = (min, max) => {
  //  if (chartRef.current) {
  //    const chart = chartRef.current.chart;
  //    chart.xAxis[0].setExtremes(min, max);
  //  }
  //};

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
