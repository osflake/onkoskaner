import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

import StarsRating from "../StarsRating";

interface FacilityReviewProps {
  review: ReviewsDataTypes;
}

const FacilityReview = ({ review }: FacilityReviewProps) => {
  const reviewDate = Date.parse(review.createdAt);

  return (
    <Container className="d-flex border p-0 m-0">
      <Container className="d-flex flex-column justify-content-start w-auto py-4 ps-2 pe-5 border-end">
        <p className="mb-1 fw-bold-600 text-nowrap">{review.name}</p>
        <p className="m-0">{review.createdAt ? review.createdAt : null}</p>
      </Container>
      <Container className="d-flex flex-column justify-content-start w-auto  align-items-center gap-3 py-4 px-5 border-end">
        <StarsRating rating={parseInt(review.rating)} />
        <h4 className="m-0">
          <Badge bg="info" className="m-0">
            {`${parseInt(review.rating)}/5`}
          </Badge>
        </h4>
      </Container>
      <Container className="d-flex flex-column justify-content-start align-items-start p-4">
        <p className="m-0">{review.content}</p>
      </Container>
    </Container>
  );
};

export default FacilityReview;
