import { ResponsiveLine } from "@nivo/line";
import { useRef } from "react";
import { Button, Container } from "react-bootstrap";
import "./LineChart.scss";
import downloadPdf from "../../../hooks/downloadPdf";
import RadioInput from "../../atoms/RadioInput/RadioInput";
import { useForm } from "react-hook-form";

// const datax = [
//   {
//     id: "NORMALNY TRYB",
//     data: [
//       { x: "2019-01-06", y: 10 },
//       { x: "2019-01-07", y: 4 },
//       { x: "2019-01-08", y: 5 },
//       { x: "2019-01-09", y: 10 },
//     ],
//   },

//   {
//     id: "PILNY TRYB",
//     data: [
//       { x: "2019-01-06", y: 15 },
//       { x: "2019-01-07", y: 4 },
//       { x: "2019-01-08", y: 2 },
//       { x: "2019-01-09", y: 20 },
//     ],
//   },
// ];

const CustomSymbol = ({ color }) => {
  return (
    <g>
      <rect x="-31" y="-16" width="62" height="32" rx="15" fill={color} />
    </g>
  );
};

const LineChart = ({ data, queue }) => {
  const printRef = useRef();

  const { register, watch } = useForm({
    defaultValues: {
      displayBy: "1",
    },
  });

  const groupBy = require("lodash/groupBy");
  const moment = require("moment");

  const testObj = groupBy(data, (dt) =>
    watch("displayBy") === "1" && data.length > 14
      ? moment(dt.date).week()
      : watch("displayBy") === "2" && data.length > 14
      ? moment(dt.date).month()
      : data
  );

  const stats = Object.values(testObj)?.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [data.length > 14
        ? `${currentValue[0].date} - ${
            currentValue[currentValue.length - 1].date
          }`
        : `${currentValue[0].date}`]: {
        avgDaysUntilExamination: currentValue.reduce(
          (innerAccumulator, innerCurrentValue) =>
            innerAccumulator +
            Math.round(
              Number(
                innerCurrentValue.avgDaysUntilExamination / currentValue.length
              )
            ),
          0
        ),
        avgDaysToResult: currentValue.reduce(
          (innerAccumulator, innerCurrentValue) =>
            innerAccumulator +
            Math.round(
              Number(innerCurrentValue.avgDaysToResult / currentValue.length)
            ),
          0
        ),
      },
    }),
    []
  );

  console.log(stats);

  const statsArr = Object.keys(stats)?.map((key) => ({
    date: key,
    avgDaysUntilExamination: stats[key].avgDaysUntilExamination,
    avgDaysToResult: stats[key].avgDaysToResult,
    id: queue,
  }));

  console.log(statsArr);

  const chartDataxxx = {
    id: "TRYB NORMALNY",
    data: statsArr?.map((item) => ({
      x: item.date,
      y: item.avgDaysUntilExamination,
    })),
  };

  const chartDataCito = {
    id: "CZAS OCZEKIWANIA",
    data: statsArr?.map((item) => ({
      x: item.date,
      y: item.avgDaysToResult,
    })),
  };

  const chartData = [chartDataxxx, chartDataCito];

  const statsByData = [
    { name: "tygodni", value: "1" },
    { name: "miesięcy", value: "2" },
  ];

  return (
    <>
      {!!data?.length ? (
        <div ref={printRef} style={{ height: 700, width: "100%" }}>
          {data?.length > 14 ? (
            <div className="pe-5 pt-4" style={{ maxWidth: "300px" }}>
              <p className="results-title fw-normal-500 ">Wyświetl względem:</p>
              <Container className="p-0 d-inline-flex gap-3 row">
                {statsByData.map((item) => (
                  <RadioInput
                    key={item.value}
                    register={register("displayBy", {
                      required: true,
                    })}
                    label={item.name}
                    value={item.value}
                  />
                ))}
              </Container>
            </div>
          ) : null}
          <ResponsiveLine
            data={data && chartData}
            margin={{ top: 50, right: 70, bottom: 250, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            theme={{
              dots: {
                text: {
                  fill: "#ffffff",
                  fontSize: 12,
                },
              },
            }}
            axisTop={null}
            axisRight={{
              orient: "right",
              tickSize: 20,
              tickPadding: 20,
              tickRotation: 0,
              legend: "",
              legendOffset: -28,
            }}
            axisBottom={{
              orient: "bottom",
              tickSize: 0,
              tickPadding: 20,
              tickRotation: statsArr.length > 14 ? -90 : 0,
              legend: "",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 20,
              tickPadding: 20,
              tickRotation: 0,
              legend: "",
              legendOffset: -22,
              legendPosition: "middle",
            }}
            enableGridX={false}
            colors={["#11C0F2", "#ED2369", "#003B50"]}
            pointSymbol={CustomSymbol}
            pointSize={20}
            pointBorderWidth={1}
            textColor="red"
            pointBorderColor={{
              from: "color",
              modifiers: [["darker", 0.3]],
            }}
            enablePointLabel={true}
            pointLabel={function (t) {
              return `${t.y} dni`;
            }}
            pointLabelYOffset={4}
            areaOpacity={0}
            useMesh={true}
            legends={[]}
            enableSlices="x"
            sliceTooltip={({ slice }) => {
              return (
                <div
                  style={{
                    background: "white",
                    padding: "9px 12px",
                    border: "1px solid #ccc",
                  }}
                >
                  {slice.points.map((point) => {
                    return (
                      <div
                        key={point.id}
                        className="chartTooltip"
                        style={{
                          color: point.serieColor,
                          padding: "2px 0",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {point.serieId}
                        <div
                          className="chartTooltip"
                          style={{
                            color: point.serieColor,
                            paddingLeft: "15px",
                          }}
                        >
                          <strong> {` ${point.data.y}`}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          />
        </div>
      ) : (
        <div
          className="d-flex justify-content-center my-5"
          style={{ height: 500, width: "100%" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="my-4 w-100 p-0 d-flex  justify-content-between ">
        <div className="d-flex gap-5 align-items-center">
          <p className="results-title fw-normal-500 m-0">Legenda</p>
          <div className="information">NORMALNY TRYB</div>
          <div className="information" data-pink={true}>
            TRYB PILNY
          </div>
        </div>

        <Button
          onClick={() => downloadPdf(printRef)}
          className="btn-outline-pink"
        >
          POBIERZ RAPORT XLSX/CSV
        </Button>
      </div>
    </>
  );
};

export default LineChart;
