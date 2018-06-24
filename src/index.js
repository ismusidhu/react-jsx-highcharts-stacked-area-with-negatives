import React, { Component } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts/highstock";
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  AreaSeries,
  SplineSeries,
  Legend,
  Tooltip,
  Loading
} from "react-jsx-highcharts";
import applyExporting from "highcharts/modules/exporting";
import applyOffline from "highcharts/modules/offline-exporting";
import { data } from "./data";

applyExporting(Highcharts);
applyOffline(Highcharts);

const opts = {
  chart: {
    type: "area",
    zoomType: "x",
    spacingBottom: 15,
    spacingTop: 15,
    spacingLeft: 15,
    spacingRight: 15,
    height: 580
  },
  title: {
    text: "Reproducing Stacked Area Chart issue of Highcharts"
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: {
      hour: "%l %p",
      day: "%b %e '%y",
      week: "%b %e '%y",
      month: "%b '%y",
      year: "%y"
    },
    tickmarkPlacement: "on"
  },
  yAxis: {
    title: {
      text: "some series"
    }
  },
  tooltip: {
    shared: true
  },
  plotOptions: {
    area: {
      stacking: "normal",
      lineColor: "#666666",
      lineWidth: 1
    }
  },
  series: [
    {
      stack: "positive",
      color: "#D7987D",
      name: "Buy",
      data: data.buysell.filter(a => a[1] >= 0)
    },
    {
      stack: "positive",
      color: "#7DBAD7",
      name: "Use",
      data: data.storeuse.filter(a => a[1] >= 0)
    },
    {
      stack: "positive",
      color: "#51A578",
      name: "Con",
      data: data.con.filter(a => a[1] >= 0)
    },
    {
      stack: "positive",
      color: "#E2EA81",
      name: "Gen",
      data: data.gen.filter(a => a[1] >= 0)
    },
    {
      stack: "negative",
      color: "#D7987D",
      name: "Sell",
      data: data.buysell.filter(a => a[1] < 0)
    },
    {
      stack: "negative",
      color: "#7DBAD7",
      name: "Store",
      data: data.storeuse.filter(a => a[1] < 0)
    },
    {
      stack: "negative",
      color: "#51A578",
      name: "Con",
      data: data.con.filter(a => a[1] < 0)
    }
  ]
};
class myChart extends Component {
  render() {
    return (
      <HighchartsChart plotOptions={opts.plotOptions}>
        <Chart {...opts.chart} />
        <XAxis {...opts.xAxis} />
        <Legend />
        <Tooltip {...opts.tooltip} />
        <YAxis>
          <YAxis.Title> some unit</YAxis.Title>
          {opts.series.map(serry => {
            return <AreaSeries {...serry} />;
          })}
        </YAxis>
      </HighchartsChart>
    );
  }
}

const App = withHighcharts(myChart, Highcharts);

render(React.createElement(App), document.getElementById("root"));
