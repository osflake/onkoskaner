import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

import "./FacilityReviews.scss";

import StarsRating from "../../atoms/StarsRating";
import ReviewAddModal from "../Modals/ReviewAddModal";
import { getReviews } from "../../../services/api/reviewsApi";
import FacilityReview from "../../atoms/FacilityReview";
import CustomPagination from "../../molecules/CustomPagination/CustomPagination";
import { getTotalReviewsDesc } from "../../../services/helpers/getTotalReviewsDesc";

interface FacilityReviewsProps {
  rating?: number;
  totalReviews?: number;
}

const FacilityReviews = ({
  rating,
  totalReviews = 0
}: FacilityReviewsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [context, setContext] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const linkParams = useParams();

  const { data } = useQuery<ReviewsApiTypes>(
    getReviews({
      offset: currPage ? ((currPage - 1) * 1).toString() : "0",
      limit: "10",
      facilityId: linkParams.facilityId,
      ...(searchParams.get("positive") && {
        context:
          searchParams.get("positive") === "true"
            ? "POSITIVE"
            : searchParams.get("positive") === "false"
            ? "NEGATIVE"
            : ""
      })
    })
  );

  const handlePageChange = (e: any) => {
    searchParams.set("page", e.toString());
    setSearchParams(searchParams);
    setCurrPage(e);
  };

  return (
    <Container className="d-flex flex-column align-items-start gap-5 results-title p-0">
      <Container className="row d-flex justify-content-center align-items-center p-0">
        <h2 className="rwd-reviews-title p-0 m-0 py-3 col-12 col-lg-4 fw-bold">
          Opinie o placówce
        </h2>

        <Container className="col-12 col-lg-4 d-flex justify-content-start align-items-center gap-2 w-auto py-3">
          {rating && <StarsRating rating={rating} />}
          <h4 className="m-0">
            <Badge bg="info" className="m-0">
              {rating
                ? `${(Math.round(rating * 10) / 10).toFixed(1)}/5`
                : "-/5"}
            </Badge>
          </h4>
          <p className="m-0">{`${totalReviews} ${getTotalReviewsDesc(
            totalReviews
          )}`}</p>
        </Container>
        <Button
          className="col-12 col-lg-4 btn-outline-pink w-auto my-3"
          onClick={() => setShowModal((prev) => !prev)}
        >
          DODAJ SWOJĄ OPINIĘ
        </Button>
        {linkParams.facilityId && (
          <ReviewAddModal
            show={showModal}
            handleClose={() => setShowModal((prev) => !prev)}
            facilityId={parseInt(linkParams.facilityId)}
          />
        )}
      </Container>

      <Container className="d-flex flex-column align-items-start gap-3 p-0">
        <p className="fw-normal-500 fs-14 m-0">Filtruj</p>
        <Container className="d-flex align-items-start p-0 gap-3">
          <Button
            className={`btn-sm ${
              searchParams.getAll("positive").length
                ? "btn-pill-outline-primary"
                : "btn-pill-outline-primary-active"
            }`}
            onClick={() => {
              searchParams.delete("positive");
              setSearchParams(searchParams);
              setContext((prev) => (prev = ""));
            }}
          >
            Wszystkie
          </Button>
          <Button
            className={`btn-sm ${
              searchParams.get("positive") !== "true"
                ? "btn-pill-outline-primary"
                : "btn-pill-outline-primary-active"
            }`}
            onClick={() => {
              searchParams.set("positive", "true");
              setSearchParams(searchParams);
              setContext((prev) => (prev = "POSITIVE"));
            }}
          >
            Pozytywne
          </Button>
          <Button
            className={`btn-sm ${
              searchParams.get("positive") !== "false"
                ? "btn-pill-outline-primary"
                : "btn-pill-outline-primary-active"
            }`}
            onClick={() => {
              searchParams.set("positive", "false");
              setSearchParams(searchParams);
              setContext((prev) => (prev = "NEGATIVE"));
            }}
          >
            Negatywne
          </Button>
        </Container>
      </Container>

      <Container className="d-flex flex-column m-0 p-0 gap-4">
        {data &&
          data.data.map((review) => {
            return <FacilityReview key={review.id} review={review} />;
          })}
      </Container>
      <CustomPagination
        totalCount={data?.meta.totalResults || 0}
        pageSize={5}
        currentPage={currPage}
        onPageChange={(e: any) => handlePageChange(e)}
      />
    </Container>
  );
};

export default FacilityReviews;
