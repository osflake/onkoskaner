import Container from "react-bootstrap/Container";
import { openingHoursArray } from "./OpeningHoursMock.consts";

interface OpeningHoursProps {
  title?: string;
  openHours?: { day: string; hours: string }[];
}

const OpeningHours = ({
  title = "Godziny otwarcia rejestracji",
  openHours = openingHoursArray
}: OpeningHoursProps) => {
  return (
    <Container className="d-flex flex-column align-items-start py-4 ps-3 pe-4 gap-4 border-end">
      <p className="m-0 fw-bold-600">{title}</p>
      {openHours &&
        openHours.map((day, i) => (
          <Container
            key={i}
            className="d-flex align-items-center p-0 justify-content-between"
          >
            <p className="m-0">{day.day}</p>
            <p className="m-0 fw-bold-600">{day.hours}</p>
          </Container>
        ))}
    </Container>
  );
};

export default OpeningHours;
