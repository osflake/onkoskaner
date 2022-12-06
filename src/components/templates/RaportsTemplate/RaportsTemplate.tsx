import { Container } from "react-bootstrap";
// import { useParams } from "react-router-dom";

import "./RaportsTemplate.scss";
import RaportsForm from "../../organisms/RaportsForm/RaportsForm";

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
      <RaportsForm />
    </Container>
  );
};

export default RaportsTemplate;
