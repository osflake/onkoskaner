import { Container, Stack } from "react-bootstrap";
// import { useParams } from "react-router-dom";
import RadioInput from "../../atoms/RadioInput/RadioInput";

import "./RaportsTemplate.scss";

const RaportsTemplate = () => {
  // const linkParams = useParams();

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="w-75 d-flex flex-column justify-content-center align-items-center">
        <h1 className="fw-bold results-title mb-5 ">Dla eksperta</h1>
        <p className="results-title mt-3">
          Na tej podstronie będziesz mieć możliwość podejrzeć szczegółówe
          statystyki dotyczące terminów poszczególnych badań. Za zbieranie
          statystyk odpowiedzialny jest nasz zespół który codzienie aktualizuje
          statystyki aby mieć jak najlepszy obraz tego jak wyglądają czasy
          oczekiwania.
        </p>
      </Container>

      <Container className="d-flex p-0 breadcrumbs-font-size">
        <Container className="flex-column me-auto d-inline-flex pe-4">
          <p className="results-title fw-normal-500 mb-4">
            Wybierz świadczenie
          </p>
          <Container className="p-0  d-inline-flex">
            <RadioInput label="Świadczenie A" />
            <RadioInput label="Świadczenie B" />
            <RadioInput label="Świadczenie C" />
            <RadioInput label="Świadczenie D" />
          </Container>
        </Container>
        <Container className="flex-column ">
          <p className="results-title fw-normal-500 mb-4">
            Wybierz świadczenie
          </p>
          <Container className="p-0 ">
            <RadioInput label="Normalny" />
            <RadioInput label="Pilny" />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default RaportsTemplate;
