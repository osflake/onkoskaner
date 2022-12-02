import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFacilities } from "../../api/facilitiesApi";
import SearchResult from "../../components/SearchResult";
import ChangeCriteriaModal from "../../components/Modals/ChangeCriteriaModal";

import "./TestView.css";

const TestView = () => {
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const { isLoading, error, data } = useQuery(
    getFacilities({ active: 1, offset: 1, limit: 10 })
  );

  const linkParams = useParams();

  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-center align-items-center gap-3">
        <h1 className="fw-bold results-title">Wyniki dla:</h1>
        <p className="results-title">{`${linkParams.examId} / ${linkParams.city}`}</p>
        <Button
          className="btn-pink"
          onClick={() => setShowCriteriaModal((prevState) => !prevState)}
        >
          ZMIEŃ KRYTERIA
        </Button>
        <ChangeCriteriaModal
          show={showCriteriaModal}
          handleClose={() => setShowCriteriaModal((prevState) => !prevState)}
        />
      </Container>
      <Container className="d-flex flex-column gap-5">
        <Container className="d-flex justify-content-between p-0">
          <Container className="d-flex p-0 gap-5 justify-content-start align-items-center breadcrumbs-font-size">
            <p className="results-title fw-normal-500">Sortowanie:</p>
            <p className="text-secondary">czas oczekiwania na wizytę</p>
            <p className="text-secondary">czas oczekiwania na opis badania</p>
            <p className="text-secondary">ocena ośrodka</p>
          </Container>
          <Button className="btn-outline-pink">FILTROWANIE</Button>
        </Container>

        {data &&
          data.data.map((place: { id: string }) => {
            return <SearchResult place={place} key={place.id} />;
          })}
      </Container>
    </Container>
  );
};

export default TestView;
