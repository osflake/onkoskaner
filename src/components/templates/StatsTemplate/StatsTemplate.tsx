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

const StatsTemplate = () => {
  const printRef = useRef<HTMLInputElement>(null);
  const [queryParams, setQueryParams] = useState({});
  const { data: provinceStatsData } = useQuery(getStatsByProvince());

  // const { data: dateStatsData } = useQuery(getStatsByDate({ queryParams }));

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setQueryParams({
      service: searchParams.get("service"),
      normal: searchParams.get("normal"),
      urgent: searchParams.get("urgent"),
      province: searchParams.get("province"),
      city: searchParams.get("city"),
      days: searchParams.get("days"),
      dateTo: searchParams.get("dateTo"),
    });
  }, [searchParams]);

  return (
    <Container className="d-flex flex-column  justify-content-center align-items-center p-0">
      <div
        ref={printRef}
        className="w-100 d-flex flex-column justify-content-center align-items-center px-5 py-5"
      >
        <Container
          className="d-flex pb-4 flex-column justify-content-center align-items-center"
          style={{ maxWidth: "738px" }}
        >
          <h1 className="fw-bold results-title mb-5 ">Dla eksperta</h1>
          <p className="results-title mt-3">
            Na tej podstronie będziesz mieć możliwość podejrzeć szczegółówe
            statystyki dotyczące terminów poszczególnych badań. Za zbieranie
            statystyk odpowiedzialny jest nasz zespół który codzienie
            aktualizuje statystyki aby mieć jak najlepszy obraz tego jak
            wyglądają czasy oczekiwania.
          </p>
        </Container>
        <StatsForm />
        <Container style={{ maxWidth: "738px" }}>
          <p className="results-title mt-3 mb-0 text-center">
            Średni czas oczekiwania w całej Polsce na świadczenie a w przeciągu
            ostatnich 30 dni (stan na{" "}
            {new Date()
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join(".")}
            )
          </p>
        </Container>
        <LineChart />
        <Container className="my-4" style={{ maxWidth: "738px" }}>
          <p className="results-title mt-3 mb-0 text-center">
            Czas oczekiwania na świadczenie A w poszczególnych wojewódzctwach w
            okresie
            <br />
            (stan na{" "}
            {new Date()
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join(".")}
            )
          </p>
        </Container>
        <Map data={provinceStatsData?.data} />
        <StatsTable data={provinceStatsData?.data} />
      </div>
      <div className="px-5 w-100">
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
