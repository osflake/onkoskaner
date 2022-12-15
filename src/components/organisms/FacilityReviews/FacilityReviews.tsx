import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import StarsRating from "../../atoms/StarsRating";

interface FacilityReviewsProps {
  rating?: number;
}

const FacilityReviews = ({ rating }: FacilityReviewsProps) => {
  return (
    <Container className="d-flex flex-column align-items-start gap-5 results-title p-0">
      <Container className="d-flex justify-content-center align-items-center">
        <h2 className="fw-bold">Opinie o placówce</h2>

        <Container className="d-flex justify-content-center align-items-center gap-2 w-auto">
          {rating && <StarsRating rating={rating} />}
          <h4 className="m-0">
            <Badge bg="info" className="m-0">
              {rating ? `${rating}/5` : "N/A"}
            </Badge>
          </h4>
          <p className="m-0">{`3 opinii`}</p>
        </Container>

        <Button className="btn-outline-pink">DODAJ SWOJĄ OPINIĘ</Button>
      </Container>

      <Container className="d-flex flex-column align-items-start gap-3">
        <p className="fw-normal-500 fs-14 m-0">Filtruj</p>
        <Container className="d-flex align-items-start p-0 gap-3">
          <Button className="btn-sm btn-pill-outline-primary">Wszystkie</Button>
          <Button className="btn-sm btn-pill-outline-primary">Pozytywne</Button>
          <Button className="btn-sm btn-pill-outline-primary">Negatywne</Button>
        </Container>
      </Container>
    </Container>
  );
};

export default FacilityReviews;
