// components
import Widget from "@components/Widget";
import WidgetHeader from "@components/Widget/WidgetHeader";
import WidgetBody from "@components/Widget/WidgetBody";
import ChartLegend from "@components/OverallAppointmentChart/ChartLegend";
import ChartBars from "@components/OverallAppointmentChart/ChartBars";
import ScrollContainer from "react-indiana-drag-scroll";

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
const DailyAppointmentChart = () => {
  const data = [
    {
      label: "9am",
      values: {
        consultation: 10,
        test: 25,
        checkup: 10,
        sick: 20,
      },
    },
    {
      label: "10am",
      values: {
        consultation: 5,
        test: 41,
        sick: 12,
      },
    },
    {
      label: "11am",
      values: {
        consultation: 45,
        test: 18,
      },
    },
    {
      label: "12am",
      values: {
        consultation: 22,
        checkup: 42,
      },
    },
    {
      label: "1pm",
      values: {
        consultation: 5,
        checkup: 35,
      },
    },
    {
      label: "2pm",
      values: {
        consultation: 10,
        test: 20,
        checkup: 25,
      },
    },
    {
      label: "3pm",
      values: {
        consultation: 25,
        sick: 40,
      },
    },
    {
      label: "4pm",
      values: {
        consultation: 20,
        test: 30,
        sick: 5,
      },
    },
    {
      label: "5pm",
      values: {
        consultation: 15,
        checkup: 50,
        sick: 10,
      },
    },
  ];

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Order",
        data: [
          2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Monthly Total Orders",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  });

  return (
    <Widget name="DailyAppointmentChart" shadow={true} style={{height:'460px',width:'66rem'  }}>
      <WidgetHeader title="Provider Growth" />
      <WidgetBody style={{ justifyContent: "space-between" }}>
        {/* <ChartLegend />
        <ChartBars data={data} as={ScrollContainer} /> */}
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
      </WidgetBody>
    </Widget>
  );
};

export default DailyAppointmentChart;
