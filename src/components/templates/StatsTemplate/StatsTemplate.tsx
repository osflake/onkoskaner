import { Button, Container } from "react-bootstrap";
import "./StatsTemplate.scss";
import StatsForm from "../../organisms/StatsForm/StatsForm";
import LineChart from "../../molecules/LineChart/LineChart";
import { Map } from "../../molecules/Map/Map";
import StatsTable from "../../organisms/tables/StatsTable/StatsTable";
import OtherStats from "../../organisms/OtherRaports/OtherStats";
import downloadPdf from "../../../hooks/downloadPdf";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getStatsByDate,
  getStatsByProvince,
} from "../../../services/api/statsApi";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const StatsTemplate = ({ adminRole }: { adminRole: boolean }) => {
  const { register, watch } = useForm({
    defaultValues: {
      statsBy: "1",
      queueId: "1",
    },
  });
  const printRef = useRef<HTMLInputElement>(null);
  const [queryParams, setQueryParams] = useState({});
  const { data: provinceStatsData } = useQuery(
    [watch("queueId"), queryParams],
    getStatsByProvince({ queryParams, queueId: watch("queueId") })
  );

  const [searchParams] = useSearchParams();
  const { data: dateStatsData } = useQuery({
    queryKey: [queryParams, "normal"],
    queryFn: getStatsByDate({
      queryParams,
      queueId: 1,
    }),
    refetchOnWindowFocus: false,
  });

  const { data: dateStatsDataCito } = useQuery({
    queryKey: [queryParams, "cito"],
    queryFn: getStatsByDate({
      queryParams,
      queueId: 2,
    }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setQueryParams({
      serviceId: searchParams.get("serviceId") || "217",
      provinceId: searchParams.get("provinceId") || "",
      cityId: searchParams.get("cityId") || "",
      days: searchParams.get("days") || "30",
      dateTo:
        searchParams.get("dateTo") || new Date().toISOString().split("T")[0],
    });
  }, [searchParams]);

  return (
    <Container className="d-flex flex-column  justify-content-center align-items-center p-0">
      <div
        ref={printRef}
        className="w-100 d-flex flex-column justify-content-center align-items-center px-3 py-5"
      >
        <Container
          className="d-flex pb-4 flex-column justify-content-center align-items-center"
          style={{ maxWidth: "738px" }}
        >
          <h1 className="fw-bold results-title mb-5 ">Dla eksperta</h1>
          <p className="results-title mt-3">
            Na tej podstronie będziesz mieć możliwość zobaczyć szczegółowe
            statystyki dotyczące terminów wybranych badań. Za zbieranie
            statystyk odpowiedzialny jest nasz zespół, który codziennie
            weryfikuje dostępność terminów badań, aby mieć jak najlepszy obraz
            tego, jak wyglądają czasy oczekiwania na badania w placówkach na
            terenie Polski
          </p>
        </Container>
        <StatsForm />
        <Container style={{ maxWidth: "738px" }}>
          <p className="results-title mt-3 mb-0 text-center">
            Średni czas oczekiwania w{" "}
            {(dateStatsData?.data?.province && !dateStatsData?.data?.city) ||
            (dateStatsDataCito?.data?.province &&
              !dateStatsDataCito?.data?.city) ? (
              <span className="fw-bolder">
                {dateStatsData?.data?.province.name}{" "}
              </span>
            ) : null}
            {(dateStatsData?.data?.province && dateStatsData?.data?.city) ||
            (dateStatsDataCito?.data?.province &&
              !dateStatsDataCito?.data?.city) ? (
              <span className="fw-bolder">
                {dateStatsData?.data?.city?.name}{" "}
              </span>
            ) : null}
            {(!dateStatsData?.data?.province && !dateStatsData?.data?.city) ||
            (dateStatsDataCito?.data?.province &&
              !dateStatsDataCito?.data?.city) ? (
              <span className="fw-bolder"> całej Polsce </span>
            ) : null}
            na świadczenie{" "}
            <span className="fw-bolder">
              {` ${
                dateStatsData?.data.service.name ||
                dateStatsDataCito?.data.service.name ||
                ""
              } `}
            </span>{" "}
            w przeciągu ostatnich{" "}
            <span className="fw-bolder">
              {dateStatsData?.data?.days || dateStatsDataCito?.data?.days}
            </span>{" "}
            dni stan na{" "}
            <span className="fw-bolder">
              {dateStatsData?.data?.dateTo ||
                dateStatsDataCito?.data?.dateTo ||
                "2022-00-00"}
            </span>
          </p>
        </Container>
        <LineChart
          nomralData={dateStatsData?.data?.stats}
          citoData={dateStatsDataCito?.data?.stats}
          queue={dateStatsData?.data?.queue}
        />
        <Container className="my-4" style={{ maxWidth: "738px" }}>
          <p className="results-title mt-3 mb-0 text-center">
            Czas oczekiwania na świadczenie
            <span className="fw-bolder">
              {` ${
                dateStatsData?.data.service.name ||
                dateStatsDataCito?.data.service.name
              } `}
            </span>
            w poszczególnych wojewódzctwach w okresie
            <span className="fw-bolder"> {dateStatsData?.data?.days} </span> dni
            <br />
            <span className="fw-bolder">
              stan na{" "}
              {dateStatsData?.data?.dateTo ||
                dateStatsDataCito?.data?.dateTo ||
                "2022-00-00"}
            </span>
          </p>
        </Container>
        <Map data={provinceStatsData?.data} />
        <StatsTable
          data={provinceStatsData?.data}
          adminRole={adminRole}
          register={register}
          watch={watch}
        />
      </div>
      <div className="px-3 w-100">
        <div className="d-flex justify-content-end w-100 mb-5">
          <Button
            onClick={() => downloadPdf(printRef)}
            className="btn-outline-pink"
          >
            POBIERZ RAPORT PDF
          </Button>
        </div>
        <OtherStats />
      </div>
    </Container>
  );
};

export default StatsTemplate;
