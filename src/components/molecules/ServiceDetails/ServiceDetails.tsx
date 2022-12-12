import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import "./ServiceDetails.scss";

interface ServiceDetailsProps {
  name: string;
  daysToExamination?: number;
}

const ServiceDetails = ({ name, daysToExamination }: ServiceDetailsProps) => {
  return (
    <Container className="d-flex flex-column align-items-center m-0">
      <Container className="d-flex justify-content-center align-items-center m-0">
        <h6 className="fw-bold-600">{name}</h6>

        <Container className="d-flex justify-content-center align-items-center gap-2">
          <p className="m-0">Najbliższa wizyta za</p>
          <h4 className="m-0">
            <Badge bg="info" className="m-0">
              {daysToExamination ? `${daysToExamination} dni` : "N/A"}
            </Badge>
          </h4>
        </Container>

        <Container className="d-flex justify-content-center align-items-center gap-2">
          <p className="m-0">Oczekiwanie na opis badania</p>
          <h4 className="m-0">
            <Badge bg="info" className="m-0">
              {daysToExamination ? `${daysToExamination} dni` : "N/A"}
            </Badge>
          </h4>
        </Container>

        <Container className="d-flex flex-column justify-content-center align-items-center px-5 gap-1">
          <Button className="btn-pink w-100">UMÓW SIĘ</Button>
          <p className="fs-14 booking-link fw-normal-500">
            Dostałeś inny termin?
          </p>
        </Container>
      </Container>
    </Container>
  );
};

export default ServiceDetails;
