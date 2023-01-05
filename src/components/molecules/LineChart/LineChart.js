import { ResponsiveLine } from "@nivo/line";
import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import "./LineChart.scss";
import RadioInput from "../../atoms/RadioInput/RadioInput";
import { useSearchParams } from "react-router-dom";
import ExportCSV from "./ExportCSV";
const moment = require("moment");

const CustomSymbol = ({ color }) => {
  return (
    <g>
      <rect x="-31" y="-16" width="62" height="32" rx="15" fill={color} />
    </g>
  );
};

const LineChart = ({
  nomralData,
  citoData,
  queue,
  pdf,
  register,
  watch,
  setValue,
  loading,
}) => {
  const printRef = useRef();

  const [searchParams] = useSearchParams();

  const groupsMonth = (data) => {
    if (data)
      return data.reduce((acc, curr) => {
        const yearWeek = `${moment(curr.date).year()}-${
          moment(curr.date).month() + 1
        }`;
        if (!acc[yearWeek]) {
          acc[yearWeek] = [];
        }
        acc[yearWeek].push(curr);
        return acc;
      }, {});
    else return {};
  };

  const groupsWeeks = (data) => {
    if (data)
      return data?.reduce((acc, curr) => {
        const yearWeek = `${moment(curr.date).year()}-${(
          "0" + (moment(curr.date).month() + 1).toString()
        ).slice(-2)} [${moment(curr.date).week()}]`;
        if (!acc[yearWeek]) {
          acc[yearWeek] = [];
        }
        acc[yearWeek].push(curr);
        return acc;
      }, {});
    else return {};
  };

  const groupsDay = (data) => {
    if (data)
      return data?.reduce((acc, curr) => {
        const yearWeek = `${moment(curr.date).year()}-${
          moment(curr.date).month() + 1
        }-${moment(curr.date).format("DD")}`;
        if (!acc[yearWeek]) {
          acc[yearWeek] = [];
        }
        acc[yearWeek].push(curr);
        return acc;
      }, {});
    else return {};
  };

  const normalObj =
    watch("displayBy") === "1" &&
    (citoData?.stats.length > 14 || nomralData?.stats.length > 14)
      ? groupsWeeks(nomralData?.stats)
      : watch("displayBy") === "2" &&
        (citoData?.stats.length > 14 || nomralData?.stats.length > 14)
      ? groupsMonth(nomralData?.stats)
      : groupsDay(nomralData?.stats);

  const citoObj =
    watch("displayBy") === "1" &&
    (citoData?.stats.length > 14 || nomralData?.stats.length > 14)
      ? groupsWeeks(citoData?.stats)
      : watch("displayBy") === "2" &&
        (citoData?.stats.length > 14 || nomralData?.stats.length > 14)
      ? groupsMonth(citoData?.stats)
      : groupsDay(citoData?.stats);

  const statsCito = Object.values(citoObj)?.reduce(
    (accumulator, currentValue, currentIndex) => ({
      ...accumulator,
      [(citoData?.stats.length > 14 || nomralData?.stats.length > 14) &&
      watch("displayBy") === "1"
        ? `${citoObj && Object.entries(citoObj)[currentIndex][0]}`
        : (citoData?.stats.length > 14 || nomralData?.stats.length > 14) &&
          watch("displayBy") === "2"
        ? `${currentValue[0].date.slice(0, 7)}`
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
    (accumulator, currentValue, currentIndex) => ({
      ...accumulator,

      [(citoData?.stats.length > 14 || nomralData?.stats.length > 14) &&
      watch("displayBy") === "1"
        ? `${normalObj && Object.entries(normalObj)[currentIndex][0]}`
        : (citoData?.stats.length > 14 || nomralData?.stats.length > 14) &&
          watch("displayBy") === "2"
        ? `${currentValue[0].date.slice(0, 7)}`
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
    searchParams.get("urgent") === "2" &&
    !!chartCitoWaitingTime.data.length
  ) {
    chartData.push(chartCitoWaitingTime);
  }

  if (
    searchParams.get("waitingTime") === "true" &&
    searchParams.get("normal") === "1" &&
    !!chartNormalWaitingTime.data.length
  ) {
    chartData.push(chartNormalWaitingTime);
  }

  if (
    (searchParams.get("urgent") === "2" ||
      searchParams.get("urgent") === null) &&
    !!chartDataCito.data.length
  ) {
    chartData.push(chartDataCito);
  }

  if (
    (searchParams.get("normal") === "1" ||
      searchParams.get("normal") === null) &&
    !!chartDataNormal.data.length
  ) {
    chartData.push(chartDataNormal);
  }

  useEffect(() => {
    if (watch("displayBy") === "1" && chartData[0]?.data.length > 14) {
      setValue("displayBy", "2");
    } else if (watch("displayBy") === "2" && chartData[0]?.data.length < 7) {
      setValue("displayBy", "1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nomralData?.stats, citoData?.stats, watch, setValue]);

  const displayByEnums = {
    1: "tygodni",
    2: "miesięcy",
  };

  return (
    <>
      {!loading && !!chartData[0]?.data?.length ? (
        <div
          ref={printRef}
          style={{
            height:
              citoData?.stats.length > 14 || nomralData?.stats.length > 14
                ? 700
                : 500,
            width: "100%",
          }}
        >
          {citoData?.stats.length > 14 || nomralData?.stats.length > 14 ? (
            <div className="pe-5 pt-4" style={{ maxWidth: "300px" }}>
              <p className="results-title fw-normal-500 ">
                Wyświetl względem:{" "}
                {pdf ? displayByEnums[watch("displayBy")] : null}
              </p>
              {!pdf ? (
                <Container className="gap-3 row">
                  {(watch("displayBy") === "1" &&
                    nomralData?.stats.length > 14) ||
                  (watch("displayBy") === "2" &&
                    chartData[0]?.data.length < 11) ? (
                    <RadioInput
                      register={register("displayBy")}
                      label="tygodni"
                      value="1"
                    />
                  ) : null}

                  <RadioInput
                    register={register("displayBy")}
                    label="miesięcy"
                    value="2"
                  />
                </Container>
              ) : null}
            </div>
          ) : null}
          <ResponsiveLine
            data={(nomralData?.stats || citoData?.stats) && chartData}
            margin={{
              top: 50,
              right: 70,
              bottom:
                citoData?.stats.length > 14 || nomralData?.stats.length > 14
                  ? 180
                  : 100,
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
            isInteractive={pdf ? false : true}
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
            colors={({ data }) => data[0]?.color}
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
      {watch("displayBy") === "1" && (
        <p className="w-100 mt-4 m-0">
          [ X ] - numer tygodnia w roku kalendarzowym
        </p>
      )}

      <div className="my-4 w-100 p-0 d-flex flex-column  justify-content-between flex-md-row linechartFooter">
        <div className="d-flex pb-3 gap-3 align-items-center flex-column flex-md-row ">
          <p className="results-title fw-normal-500 m-0">Legenda:</p>
          {chartData?.map((item) =>
            item.data.length ? (
              <div
                style={{ background: item?.data[0]?.color }}
                key={item.id}
                className={`information  d-flex align-items-center justify-content-center text-center `}
              >
                {item.id}
              </div>
            ) : null
          )}
        </div>
        {!pdf ? (
          <ExportCSV
            nomralData={nomralData}
            citoData={citoData}
            fileName="Raport"
          />
        ) : null}
      </div>
    </>
  );
};

export default LineChart;
