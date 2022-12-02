import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import "./SearchResult.css";
import StarsRating from "../StarsRating/StarsRating";
import PercentageProgress from "../PercentageProgress";

const SearchResult: React.FC<PanelItemProps> = ({ place }) => {
  return (
    <Container className="d-flex flex-column fc-main border rounded-1 p-0">
      <Container className="d-flex flex-row m-0 p-0 result-top-row-bg">
        <Container className="d-flex align-items-center border pt-5 pb-5 ps-4">
          <p className="fw-bold-600 m-0">{place.name}</p>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center border">
          <p>Najbliższa wizyta za</p>
          <h4>
            <Badge bg="info">{`${place.earliest_appointment} DNI`}</Badge>
          </h4>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center border">
          <p>Oczekiwanie na opis badania</p>
          <h4>
            <Badge bg="info">{`${place.examination_waiting_time} DNI`}</Badge>
          </h4>
        </Container>
      </Container>

      <Container className="d-flex flex-row m-0 p-0">
        <Container className="d-flex flex-column align-items-start border pt-4 pb-4 ps-4 pe-5">
          <p className="text-nowrap">{`${place.street} ${place.building_number}, ${place.zipCode} ${place.city.name}`}</p>
          <Button className="btn-outline-pink">POKAŻ NA MAPIE</Button>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center border gap-3">
          <StarsRating rating={place.rating} />
          <Container className="d-flex flex-row justify-content-center align-items-center gap-2">
            <h4 className="m-0">
              <Badge bg="info" className="m-0">{`${place.rating}/5`}</Badge>
            </h4>
            <p className="m-0 align-self-center fs-13">{`(${place.rating_amount} opinii)`}</p>
          </Container>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center border gap-2">
          <PercentageProgress percentage={place.successful_phone_calls} />
          <p className="text-center m-0 fs-13">
            udanych połączeń telefonicznych do placówki
          </p>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center border">
          <Button className="btn-pink">UMÓW SIĘ</Button>
        </Container>
      </Container>
    </Container>
  );
};

export default SearchResult;
