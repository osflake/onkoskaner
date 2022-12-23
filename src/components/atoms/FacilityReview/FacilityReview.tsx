import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

import "./FacilityReview.scss";

import StarsRating from "../StarsRating";

interface FacilityReviewProps {
  review: ReviewsDataTypes;
}

const FacilityReview = ({ review }: FacilityReviewProps) => {
  return (
    <Container className="row border p-0 m-0">
      <Container className="col-12 col-lg-3 d-flex flex-column justify-content-start py-4 ps-2 pe-5 rwd-review-borders">
        <p className="mb-1 fw-bold-600 text-nowrap">{review.name}</p>
        <p className="m-0">{review.createdAt ? review.createdAt : null}</p>
      </Container>
      <Container className="col-12 col-lg-2 d-flex flex-column justify-content-start align-items-center gap-3 py-4 px-5 rwd-review-borders">
        <StarsRating rating={parseInt(review.rating)} />
        <h4 className="m-0">
          <Badge bg="info" className="m-0">
            {`${parseInt(review.rating)}/5`}
          </Badge>
        </h4>
      </Container>
      <Container className="col-12 col-lg-7 d-flex flex-column justify-content-start align-items-start p-4">
        <p className="m-0">{review.content}</p>
      </Container>
    </Container>
  );
};

export default FacilityReview;
