import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./SearchResult.css";

import StarsRating from "../StarsRating/StarsRating";
import PercentageProgress from "../PercentageProgress";

const SearchResult = ({ facility }: SearchResultsProps) => {
  return (
    <Container className="d-flex flex-column fc-main border rounded-1 p-0">
      <Container className="d-flex flex-row m-0 p-0 result-top-row-bg">
        <Container className="d-flex align-items-center border-end pt-5 pb-5 ps-4">
          <p className="fw-bold-600 m-0">
            <Link
              className="fw-bold-600 m-0 results-title results-link"
              to={`/details/${facility.id}`}
            >
              {facility.name}
            </Link>
          </p>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center border-end">
          <p>Najbliższa wizyta za</p>
          <h4>
            <Badge bg="info">{`${facility.earliest_appointment} DNI`}</Badge>
          </h4>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <p>Oczekiwanie na opis badania</p>
          <h4>
            <Badge bg="info">{`${facility.examination_waiting_time} DNI`}</Badge>
          </h4>
        </Container>
      </Container>

      <Container className="d-flex flex-row m-0 p-0 border-top">
        <Container className="d-flex flex-column align-items-start border-end pt-4 pb-4 ps-4 pe-5">
          <p className="text-nowrap">{`ul. ${facility.street}, ${facility.zipCode} ${facility.city.name}`}</p>
          <Button className="btn-outline-pink">POKAŻ NA MAPIE</Button>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center border-end gap-3">
          <StarsRating rating={facility.rating} />
          <Container className="d-flex flex-row justify-content-center align-items-center gap-2">
            <h4 className="m-0">
              <Badge bg="info" className="m-0">
                {facility.rating ? `${facility.rating}/5` : "N/A"}
              </Badge>
            </h4>
            <p className="m-0 align-self-center fs-13">{`(${
              facility.rating ? facility.rating : "brak"
            } opinii)`}</p>
          </Container>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center border-end gap-2">
          <PercentageProgress percentage={40} />
          <p className="text-center m-0 fs-13">
            udanych połączeń telefonicznych do placówki
          </p>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <Button className="btn-pink">UMÓW SIĘ</Button>
        </Container>
      </Container>
    </Container>
  );
};

export default SearchResult;
