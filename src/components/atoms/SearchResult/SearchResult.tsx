import { useState } from "react";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./SearchResult.scss";

import StarsRating from "../StarsRating/StarsRating";
import PercentageProgress from "../PercentageProgress";
import MapModal from "../../organisms/Modals/MapModal";
import { getTotalReviewsDesc } from "../../../services/helpers/getTotalReviewsDesc";

interface SearchResultProps {
  facility: FacilityDataTypes;
  avgSuccessfulCallsPercents?: number;
  ratingCount?: number;
  latestSurveys?: LatestSurveyTypes[];
  totalReviews?: number;
}

const SearchResult = ({
  facility,
  avgSuccessfulCallsPercents,
  ratingCount,
  latestSurveys,
  totalReviews = 0
}: SearchResultProps) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <Container className="d-flex flex-column fc-main border rounded-1 p-0">
      <Container className="row m-0 p-0 result-top-row-bg">
        <Container className="col-12 col-md-4 d-flex justify-content-start align-items-center results-rwd-border py-4 ps-4">
          <p className="fw-bold-600 m-0">
            <Link
              className="fw-bold-600 m-0 results-title results-link"
              to={`/details/${facility.facility.id}`}
            >
              {facility.facility.name}
            </Link>
          </p>
        </Container>

        <Container className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center results-rwd-border py-4">
          <p>Najbliższa wizyta za</p>
          <h4>
            <Badge bg="info">
              {" "}
              {latestSurveys
                ? latestSurveys.length
                  ? latestSurveys[0].daysToResults
                    ? `${latestSurveys[0].daysToResults} DNI`
                    : "brak danych"
                  : "brak danych"
                : "brak danych"}
            </Badge>
          </h4>
        </Container>

        <Container className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center py-4">
          <p>Oczekiwanie na opis badania</p>
          <h4>
            <Badge bg="info">
              {latestSurveys?.length
                ? latestSurveys[0].daysUntilExamination
                  ? `${latestSurveys[0].daysUntilExamination} DNI`
                  : "brak danych"
                : "brak danych"}
            </Badge>
          </h4>
        </Container>
      </Container>

      <Container className="row m-0 p-0 border-top">
        <Container className="col-12 col-md-3 d-flex flex-column align-items-start results-rwd-border gap-2 pt-4 pb-4 px-4">
          <p className="m-0">{`ul. ${facility.facility.street}, ${facility.facility.zipCode} ${facility.facility.city?.name}`}</p>
          <Button
            onClick={() => setShowMap((prev) => !prev)}
            className="btn-outline-pink results-rwd-button"
          >
            POKAŻ NA MAPIE
          </Button>
          <MapModal
            show={showMap}
            handleClose={() => setShowMap((prev) => !prev)}
            facility={facility}
          />
        </Container>

        <Container className="col-12 col-md-3 d-flex flex-column justify-content-center align-items-center results-rwd-border gap-3 py-3">
          <StarsRating rating={facility.rating} />
          <Container className="d-flex flex-row justify-content-center align-items-center gap-2">
            <h4 className="m-0">
              <Badge bg="info" className="m-0">
                {facility.rating ? `${facility.rating.toFixed(1)}/5` : "-/5"}
              </Badge>
            </h4>
            <p className="m-0 align-self-center fs-13">{`(${totalReviews} ${getTotalReviewsDesc(
              totalReviews
            )})`}</p>
          </Container>
        </Container>

        <Container className="col-12 col-md-3 d-flex flex-column justify-content-center align-items-center results-rwd-border py-3 gap-2">
          <PercentageProgress
            percentage={
              avgSuccessfulCallsPercents
                ? Math.floor(avgSuccessfulCallsPercents)
                : 0
            }
          />
          <p className="text-center m-0 fs-13">
            udanych połączeń telefonicznych do placówki
          </p>
        </Container>

        <Container className="col-12 col-md-3 d-flex flex-column justify-content-center align-items-center p-4">
          <Link
            className="results-rwd-button"
            to={`/details/${facility.facility.id}`}
          >
            <Button className="btn-pink results-rwd-button">UMÓW SIĘ</Button>
          </Link>
        </Container>
      </Container>
    </Container>
  );
};

export default SearchResult;
