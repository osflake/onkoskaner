import { Col, Container, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CheckboxInput from "../../atoms/CheckboxInput/CheckboxInput";
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

      <Row className="w-100">
        <Col md="auto" className="me-5">
          <p className="results-title fw-normal-500 mb-4">
            Wybierz świadczenie
          </p>
          <Container className="p-0 d-inline-flex ">
            <RadioInput label="Świadczenie A" />
            <RadioInput label="Świadczenie B" />
            <RadioInput label="Świadczenie C" />
            <RadioInput label="Świadczenie D" />
          </Container>
        </Col>
        <Col md="auto">
          <p className="results-title fw-normal-500 mb-4 ">
            Wybierz świadczenie
          </p>
          <Container className="p-0 w-auto d-inline-flex">
            <CheckboxInput label="Normalny" id={"1"} />
            <CheckboxInput label="Pilny" id={"2"} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default RaportsTemplate;
