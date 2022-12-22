import { ResponsiveLine } from "@nivo/line";
import { useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./LineChart.scss";
import downloadPdf from "../../../hooks/downloadPdf";
import RadioInput from "../../atoms/RadioInput/RadioInput";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
const groupBy = require("lodash/groupBy");
const moment = require("moment");

const CustomSymbol = ({ color }) => {
  return (
    <g>
      <rect x="-31" y="-16" width="62" height="32" rx="15" fill={color} />
    </g>
  );
};

const LineChart = ({ nomralData, citoData, queue }) => {
  const printRef = useRef();

  const [searchParams] = useSearchParams();

  const { register, watch, setValue } = useForm({
    defaultValues: {
      displayBy: "1",
    },
  });

  const normalObj = groupBy(nomralData, (dt) =>
    watch("displayBy") === "1" && nomralData.length > 14
      ? moment(dt.date).week()
      : watch("displayBy") === "2" && nomralData.length > 14
      ? moment(dt.date).month()
      : nomralData
  );

  const citoObj = groupBy(citoData, (dt) =>
    watch("displayBy") === "1" && citoData.length > 14
      ? moment(dt.date).week()
      : watch("displayBy") === "2" && citoData.length > 14
      ? moment(dt.date).month()
      : citoData
  );

  const statsCito = Object.values(citoObj)?.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [citoData?.length > 14
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

  const statsNormal = Object.values(normalObj)?.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [nomralData.length > 14
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

  const statsNormalArr = Object.keys(statsNormal)?.map((key) => ({
    date: key,
    avgDaysUntilExamination: statsNormal[key].avgDaysUntilExamination,
    avgDaysToResult: statsNormal[key].avgDaysToResult,
    id: queue,
  }));

  const statsCitoArr = Object.keys(statsCito)?.map((key) => ({
    date: key,
    avgDaysUntilExamination: statsCito[key]?.avgDaysUntilExamination,
    avgDaysToResult: statsCito[key]?.avgDaysToResult,
    id: queue,
  }));

  const chartDataNormal = {
    id: "TRYB NORMALNY",
    data: statsNormalArr?.map((item) => ({
      x: item.date,
      y: item.avgDaysUntilExamination,
      color: "#11C0F2",
    })),
  };

  const chartNormalWaitingTime = {
    id: "CZAS OCZEKIWANIA - TRYB NORMALNY",

    data: statsNormalArr?.map((item) => ({
      x: item.date,
      y: item.avgDaysToResult,
      color: "#808080",
    })),
  };

  const chartDataCito = {
    id: "TRYB PILNY",

    data: statsCitoArr?.map((item) => ({
      x: item.date,
      y: item.avgDaysUntilExamination,
      color: "#ed2369",
    })),
  };

  const chartCitoWaitingTime = {
    id: "CZAS OCZEKIWANIA - TRYB PILNY",

    data: statsCitoArr?.map((item) => ({
      x: item.date,
      y: item.avgDaysToResult,
      color: "#b6b6b6",
    })),
  };

  const chartData = [];

  if (
    searchParams.get("waitingTime") === "true" &&
    searchParams.get("normal") === "1"
  ) {
    chartData.push(chartNormalWaitingTime);
  }

  if (
    searchParams.get("waitingTime") === "true" &&
    searchParams.get("urgent") === "2"
  ) {
    chartData.push(chartCitoWaitingTime);
  }

  if (
    searchParams.get("normal") === "1" ||
    searchParams.get("normal") === null
  ) {
    chartData.push(chartDataNormal);
  }

  if (
    searchParams.get("urgent") === "2" ||
    searchParams.get("urgent") === null
  ) {
    chartData.push(chartDataCito);
  }

  useEffect(() => {
    if (watch("displayBy") === "1" && chartData[0]?.data.length > 13) {
      setValue("displayBy", "2");
    } else if (watch("displayBy") === "2" && chartData[0]?.data.length < 11) {
      setValue("displayBy", "1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nomralData, citoData, watch, setValue]);

  return (
    <>
      {!!chartData[0]?.data?.length ? (
        <div
          ref={printRef}
          style={{
            height: nomralData?.length > 14 ? 700 : 500,
            width: "100%",
          }}
        >
          {nomralData?.length > 14 ? (
            <div className="pe-5 pt-4" style={{ maxWidth: "300px" }}>
              <p className="results-title fw-normal-500 ">Wyświetl względem:</p>
              <Container className="gap-3 row">
                {(watch("displayBy") === "1" &&
                  chartData[0]?.data.length < 14) ||
                (watch("displayBy") === "2" &&
                  chartData[0]?.data.length < 11) ? (
                  <RadioInput
                    register={register("displayBy", {
                      required: true,
                    })}
                    label="tygodni"
                    value="1"
                  />
                ) : null}

                <RadioInput
                  register={register("displayBy", {
                    required: true,
                  })}
                  label="miesięcy"
                  value="2"
                />
              </Container>
            </div>
          ) : null}
          <ResponsiveLine
            data={(nomralData || citoData) && chartData}
            margin={{
              top: 50,
              right: 70,
              bottom: nomralData?.length > 14 ? 250 : 100,
              left: 70,
            }}
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
              tickRotation: -60,

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
            colors={({ id, data }) => data[0]?.color}
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
