import { ResponsiveLine } from "@nivo/line";
import "./LineChart.scss";

const data = [
  {
    id: "NORMALNY TRYB",
    data: [
      { x: "2019-01-06", y: 10 },
      { x: "2019-01-07", y: 4 },
      { x: "2019-01-08", y: 5 },
      { x: "2019-01-09", y: 10 },
    ],
  },

  {
    id: "PILNY TRYB",
    data: [
      { x: "2019-01-06", y: 15 },
      { x: "2019-01-07", y: 4 },
      { x: "2019-01-08", y: 2 },
      { x: "2019-01-09", y: 20 },
    ],
  },
];

const CustomSymbol = ({ color }) => {
  return (
    <g>
      <rect x="-31" y="-16" width="62" height="32" rx="15" fill={color} />
    </g>
  );
};

const LineChart = () => (
  <>
    <div style={{ height: 250, width: "100%" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 70, bottom: 50, left: 70 }}
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
          tickRotation: 0,
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
    <div className="my-5 w-100 p-0 d-flex align-items-center justify-items-center gap-5">
      <p className="results-title fw-normal-500 m-0">Wybierz świadczenie</p>
      <div className="information">NORMALNY TRYB</div>
      <div className="information" data-pink={true}>
        TRYB PILNY
      </div>
    </div>
  </>
);

export default LineChart;
