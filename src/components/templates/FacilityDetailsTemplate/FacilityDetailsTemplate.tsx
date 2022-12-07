import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import "./FacilityDetailsTemplate.scss";

const FacilityDetailsTemplate = () => {
  // const linkParams = useParams();

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="w-75 d-flex flex-column justify-content-center align-items-center gap-3">
        <h1 className="fw-bold results-title">
          Ginekologiczno-Położniczy Szpital Kliniczny UM im. Karola
          Marcinkowskiego w Poznaniu
        </h1>
        <p className="results-title">asdasdasdasda</p>
      </Container>
    </Container>
  );
};

export default FacilityDetailsTemplate;
