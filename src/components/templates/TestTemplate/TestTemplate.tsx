import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFacilities } from "../../../services/api/facilitiesApi";
import { getProvinces } from "../../../services/api/provincesApi";
import SearchResult from "../../atoms/SearchResult/SearchResult";
import ChangeCriteriaModal from "../../organisms/Modals/ChangeCriteriaModal";

import "./TestTemplate.css";

const TestTemplate = () => {
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const linkParams = useParams();

  const { data: provincesData } = useQuery(getProvinces(linkParams.provinceId));
  const { isLoading, error, data } = useQuery<SearchResultsProps["facility"][]>(
    getFacilities({
      offset: "0",
      limit: "5",
      provinceId: linkParams.provinceId
    })
  );

  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  console.log("data", data);
  console.log("link params", linkParams);

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-center align-items-center gap-3">
        <h1 className="fw-bold results-title">Wyniki dla:</h1>
        {provincesData && (
          <p className="results-title">{`${provincesData[0].name} / ${linkParams.cityId}`}</p>
        )}
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
          data.map((facility) => {
            return <SearchResult facility={facility} key={facility.id} />;
          })}
      </Container>
    </Container>
  );
};

export default TestTemplate;
