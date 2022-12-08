import { Container } from "react-bootstrap";
// import { useParams } from "react-router-dom";

import "./RaportsTemplate.scss";
import RaportsForm from "../../organisms/RaportsForm/RaportsForm";
import LineChart from "../../molecules/LineChart/LineChart";
import { Map } from "../../molecules/Map/Map";
import RaportTable from "../../organisms/tables/RaportTable/RaportTable";

const RaportsTemplate = () => {
  // const linkParams = useParams();

  return (
    <Container className="d-flex flex-column p-5  justify-content-center align-items-center">
      <Container
        className="d-flex pb-5 flex-column justify-content-center align-items-center"
        style={{ maxWidth: "738px" }}
      >
        <h1 className="fw-bold results-title mb-5 ">Dla eksperta</h1>
        <p className="results-title mt-3">
          Na tej podstronie będziesz mieć możliwość podejrzeć szczegółówe
          statystyki dotyczące terminów poszczególnych badań. Za zbieranie
          statystyk odpowiedzialny jest nasz zespół który codzienie aktualizuje
          statystyki aby mieć jak najlepszy obraz tego jak wyglądają czasy
          oczekiwania.
        </p>
      </Container>
      <RaportsForm />
      <Container style={{ maxWidth: "738px" }}>
        <p className="results-title mt-3 mb-0 text-center">
          Średni czas oczekiwania w całej poslsce na świadczenie a w przeciągu
          ostatnich 30 dni (stan na 23.10.2022)
        </p>
      </Container>
      <LineChart />
      <Container className="my-5" style={{ maxWidth: "738px" }}>
        <p className="results-title mt-3 mb-0 text-center">
          Czas oczekiwania na świadczenie A w poszczególnych wojewódzctwach
          <br />
          (stan na 23.10.2022)
        </p>
      </Container>
      <Map />
      <RaportTable />
    </Container>
  );
};

export default RaportsTemplate;
