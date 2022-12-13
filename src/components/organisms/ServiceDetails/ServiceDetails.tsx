import { useState } from "react";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

import "./ServiceDetails.scss";
import PercentageProgress from "../../atoms/PercentageProgress";

interface ServiceDetailsProps {
  name: string;
  daysToExamination?: number;
  facility: FacilityDataTypes["facility"];
  avgTotalCallsPercents?: number;
}

const ServiceDetails = ({
  facility,
  name,
  daysToExamination,
  avgTotalCallsPercents = 40
}: ServiceDetailsProps) => {
  const [isCollapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <Container className="d-flex flex-column align-items-center border p-0 m-0">
      <Container className="d-flex p-0 m-0">
        <Container className="d-flex flex-column justify-content-center align-items-start ps-3 py-5 border-end">
          <h6 className="m-0 fw-bold-600">{name}</h6>
        </Container>

        <Container className="d-flex justify-content-between align-items-center border-end px-4">
          <p className="m-0">Najbliższa wizyta za</p>
          <h4 className="m-0">
            <Badge bg="info" className="m-0">
              {daysToExamination ? `${daysToExamination} dni` : "N/A"}
            </Badge>
          </h4>
        </Container>

        <Container className="d-flex justify-content-between align-items-center border-end px-4">
          <p className="m-0">Oczekiwanie na opis badania</p>
          <h4 className="m-0">
            <Badge bg="info" className="m-0">
              {daysToExamination ? `${daysToExamination} dni` : "N/A"}
            </Badge>
          </h4>
        </Container>

        <Container className="d-flex flex-column justify-content-center align-items-center px-5 gap-2">
          <Button className="btn-pink w-100">UMÓW SIĘ</Button>
          <p className="fs-14 booking-link fw-normal-500 m-0">
            Dostałeś inny termin?
          </p>
        </Container>
      </Container>

      <Accordion className="m-0 p-0 w-100 border-top">
        <Accordion.Body className="border-bottom p-0">
          <Container className="d-flex flex-column m-0 p-0">
            <Container className="d-flex p-0 m-0">
              <Container className="d-flex flex-column align-items-start py-4 ps-3 pe-4 gap-4 border-end">
                <p className="m-0 fw-bold-600">Godziny otwarcia rejestracji</p>
                <Container className="d-flex align-items-center p-0 justify-content-between">
                  <p className="m-0">Poniedziałek</p>
                  <p className="m-0 fw-bold-600">08:00 - 14:00</p>
                </Container>
                <Container className="d-flex align-items-center p-0 justify-content-between">
                  <p className="m-0">Wtorek</p>
                  <p className="m-0 fw-bold-600">08:00 - 14:00</p>
                </Container>
                <Container className="d-flex align-items-center p-0 justify-content-between">
                  <p className="m-0">Środa</p>
                  <p className="m-0 fw-bold-600">08:00 - 14:00</p>
                </Container>
                <Container className="d-flex align-items-center p-0 justify-content-between">
                  <p className="m-0">Czwartek</p>
                  <p className="m-0 fw-bold-600">08:00 - 14:00</p>
                </Container>
                <Container className="d-flex align-items-center p-0 justify-content-between">
                  <p className="m-0">Piątek</p>
                  <p className="m-0 fw-bold-600">08:00 - 14:00</p>
                </Container>
              </Container>

              <Container className="d-flex flex-column gap-4 border-end p-4">
                <p className="m-0 fw-bold-600">Kontakt z placówką</p>
                <Container className="d-flex align-items-center p-0 justify-content-between">
                  <p className="m-0">Numer telefonu</p>
                  <p className="m-0 fw-bold-600">{facility.phoneNumber}</p>
                </Container>
                <Container className="d-flex flex-column justify-content-center align-items-center gap-2">
                  <PercentageProgress percentage={avgTotalCallsPercents} />
                  <p className="text-center m-0 fs-13">
                    udanych połączeń telefonicznych do placówki
                  </p>
                </Container>
              </Container>

              <Container className="d-flex flex-column gap-4 p-4">
                <p className="m-0 fw-bold-600">Dodatkowe informacje</p>
                <p>
                  {facility.description
                    ? facility.description
                    : "Brak dodatkowych informacji"}
                </p>
              </Container>
            </Container>
          </Container>
        </Accordion.Body>
        <Accordion.Header
          onClick={() => handleCollapse()}
          className="w-100 accordion-details-bg"
        >
          {isCollapse ? (
            <p className="m-0 fw-normal-500">MNIEJ INFORMACJI</p>
          ) : (
            <p className="m-0 fw-normal-500">WIĘCEJ INFORMACJI</p>
          )}
        </Accordion.Header>
      </Accordion>
    </Container>
  );
};

export default ServiceDetails;
