import Container from "react-bootstrap/Container";
import { PrintMedia } from "./OpeningHoursMock.consts";

interface OpeningHoursProps {
  title?: string;
  openHours?: any;
}

const OpeningHours = ({
  title = "Godziny otwarcia rejestracji",
  openHours,
}: // openHours = openingHoursArray
OpeningHoursProps) => {
  console.log(!!openHours[6][0]);

  return (
    <Container className="col-12 col-md-4 d-flex flex-column align-items-start py-4 ps-3 pe-4 gap-4 border-end">
      <p className="m-0 fw-bold-600">{title}</p>
      {openHours &&
        Object.keys(openHours).map((item, idx): any => {
          return !!openHours[idx][0] ? (
            <Container
              key={item}
              className="d-flex align-items-center p-0 justify-content-between"
            >
              <p className="m-0">{PrintMedia[idx]}</p>
              <p className="m-0 fw-bold-600">{openHours[idx].join(" - ")}</p>
            </Container>
          ) : null;
        })}
    </Container>
  );
};

export default OpeningHours;
