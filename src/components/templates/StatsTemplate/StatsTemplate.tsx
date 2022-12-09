import { Button, Container } from "react-bootstrap";
// import { useParams } from "react-router-dom";

import "./StatsTemplate.scss";
import StatsForm from "../../organisms/StatsForm/StatsForm";
import LineChart from "../../molecules/LineChart/LineChart";
import { Map } from "../../molecules/Map/Map";
import StatsTable from "../../organisms/tables/StatsTable/StatsTable";
import OtherStats from "../../organisms/OtherRaports/OtherStats";
import downloadPdf from "../../../hooks/downloadPdf";
import { useRef } from "react";

const StatsTemplate = () => {
  // const linkParams = useParams();
  const printRef = useRef<HTMLInputElement>(null);

  return (
    <Container className="d-flex flex-column  justify-content-center align-items-center p-0">
      <div
        ref={printRef}
        className="w-100 d-flex flex-column justify-content-center align-items-center px-5 py-5"
      >
        <Container
          className="d-flex pb-5 flex-column justify-content-center align-items-center"
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
            Średni czas oczekiwania w całej poslsce na świadczenie a w przeciągu
            ostatnich 30 dni (stan na 23.10.2022)
          </p>
        </Container>
        <LineChart />
        <Container className="my-5" style={{ maxWidth: "738px" }}>
          <p className="results-title mt-3 mb-0 text-center">
            Czas oczekiwania na świadczenie A w poszczególnych wojewódzctwach w
            okresie
            <br />
            (stan na 23.10.2022)
          </p>
        </Container>
        <div className="mt-4">
          <Map />
        </div>
        <StatsTable />
      </div>
      <div className="px-5 w-100">
        <div className="d-flex justify-content-end w-100 mb-5">
          <Button
            onClick={() => downloadPdf(printRef)}
            className="btn-outline-pink"
          >
            Pobierz raport pdf
          </Button>
        </div>
        <OtherStats />
      </div>
    </Container>
  );
};

export default StatsTemplate;
