import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./SearchResult.css";

import StarsRating from "../StarsRating/StarsRating";
import PercentageProgress from "../PercentageProgress";

interface SearchResultProps {
  facility: FacilityDataTypes;
}

const SearchResult = ({ facility }: SearchResultProps) => {
  return (
    <Container className="d-flex flex-column fc-main border rounded-1 p-0">
      <Container className="row m-0 p-0 result-top-row-bg">
        <Container className="col-12 col-md-4 d-flex justify-content-start align-items-center border-end border-bottom py-4 ps-4">
          <p className="fw-bold-600 m-0">
            <Link
              className="fw-bold-600 m-0 results-title results-link"
              to={`/details/${facility.facility.id}`}
            >
              {facility.facility.name}
            </Link>
          </p>
        </Container>

        <Container className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center border-end border-bottom py-4">
          <p>Najbliższa wizyta za</p>
          <h4>
            <Badge bg="info">{`10 DNI`}</Badge>
          </h4>
        </Container>

        <Container className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center py-4">
          <p>Oczekiwanie na opis badania</p>
          <h4>
            <Badge bg="info">{`10 DNI`}</Badge>
          </h4>
        </Container>
      </Container>

      <Container className="row m-0 p-0 border-top">
        <Container className="col-12 col-md-3 d-flex flex-column align-items-start border-end border-bottom gap-2 pt-4 pb-4 ps-4 pe-5">
          <p className="m-0">{`ul. ${facility.facility.street}, ${facility.facility.zipCode} ${facility.facility.city?.name}`}</p>
          <Button className="btn-outline-pink">POKAŻ NA MAPIE</Button>
        </Container>

        <Container className="col-12 col-md-3 d-flex flex-column justify-content-center align-items-center border-end border-bottom gap-3 py-3">
          <StarsRating rating={facility.rating} />
          <Container className="d-flex flex-row justify-content-center align-items-center gap-2">
            <h4 className="m-0">
              <Badge bg="info" className="m-0">
                {facility.rating ? `${facility.rating.toFixed(1)}/5` : "N/A"}
              </Badge>
            </h4>
            <p className="m-0 align-self-center fs-13">{`(${
              facility.totalCalls ? facility.totalCalls : "brak"
            } opinii)`}</p>
          </Container>
        </Container>

        <Container className="col-12 col-md-3 d-flex flex-column justify-content-center align-items-center border-end border-bottom py-3 gap-2">
          <PercentageProgress percentage={facility.avgTotalCallsPercents} />
          <p className="text-center m-0 fs-13">
            udanych połączeń telefonicznych do placówki
          </p>
        </Container>

        <Container className="col-12 col-md-3 d-flex flex-column justify-content-center align-items-center py-3">
          <Button className="btn-pink">UMÓW SIĘ</Button>
        </Container>
      </Container>
    </Container>
  );
};

export default SearchResult;
