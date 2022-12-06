import { Col, Container, Dropdown, Row } from "react-bootstrap";
import CheckboxInput from "../../atoms/CheckboxInput/CheckboxInput";
// import { useParams } from "react-router-dom";
import RadioInput from "../../atoms/RadioInput/RadioInput";
import { useProvincesQuery } from "../../../hooks/useProvincesQuery";

import "./RaportsTemplate.scss";

const RaportsTemplate = () => {
  // const linkParams = useParams();
  const { data } = useProvincesQuery();

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

      <Row className="w-100 gap-5">
        <Col md="auto" className="p-0 pe-5">
          <p className="results-title fw-normal-500">Wybierz świadczenie</p>
          <Container className="p-0 d-inline-flex gap-3 ">
            <RadioInput label="Świadczenie A" />
            <RadioInput label="Świadczenie B" />
            <RadioInput label="Świadczenie C" />
            <RadioInput label="Świadczenie D" />
          </Container>
        </Col>
        <Col md="auto" className="p-0">
          <p className="results-title fw-normal-500 mb-4 ">Tryb świadczenia</p>
          <Container className="p-0 w-auto d-inline-flex">
            <CheckboxInput label="Normalny" id={"1"} />
            <CheckboxInput label="Pilny" id={"2"} />
          </Container>
        </Col>
      </Row>
      {data && (
        <Container className="p-0 d-flex w-100 justify-content-between gap-4">
          <Dropdown className="w-100">
            <p className="dropDownLabel">Województwo</p>
            <Dropdown.Toggle
              className="d-flex justify-content-between align-items-center fs-13 criteria-modal-btn"
              variant="outline-success"
              id="dropdown-basic"
            >
              {data[0].name}
            </Dropdown.Toggle>

            <Dropdown.Menu className="criteria-modal-btn">
              {data.map((province) => (
                <Dropdown.Item className="results-title" key={province.id}>
                  {province.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="w-100">
            <p className="dropDownLabel">Miasto</p>
            <Dropdown.Toggle
              className="d-flex justify-content-between align-items-center fs-13 criteria-modal-btn"
              variant="outline-success"
              id="dropdown-basic"
              disabled
            >
              {data[0].name}
            </Dropdown.Toggle>

            <Dropdown.Menu className="criteria-modal-btn">
              {data.map((province) => (
                <Dropdown.Item className="results-title" key={province.id}>
                  {province.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="w-100">
            <p className="dropDownLabel">Okres czasowy</p>
            <Dropdown.Toggle
              className="d-flex justify-content-between align-items-center fs-13 criteria-modal-btn"
              variant="outline-success"
              id="dropdown-basic"
            >
              {data[0].name}
            </Dropdown.Toggle>

            <Dropdown.Menu className="criteria-modal-btn">
              {data.map((province) => (
                <Dropdown.Item className="results-title" key={province.id}>
                  {province.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      )}
    </Container>
  );
};

export default RaportsTemplate;
