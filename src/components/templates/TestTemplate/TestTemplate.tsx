import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFacilities } from "../../../services/api/facilitiesApi";
import SearchResult from "../../atoms/SearchResult/SearchResult";
import "./TestTemplate.css";
import ErrorInfo from "../../atoms/ErrorInfo";
import CriteriaModal from "../../organisms/Modals/CriteriaModal/CriteriaModal";

const TestTemplate = () => {
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isError, data } = useQuery<FacilityDataTypes[]>(
    getFacilities({
      offset: "0",
      limit: "5",
      provinceId: searchParams.get("provinceId"),
      serviceId: searchParams.get("serviceId"),
      queueId: searchParams.get("queueId"),
    })
  );

  if (isError) {
    return <ErrorInfo redirectTo="http://dev.onkoskaner.pl/" />;
  }

  console.log("data", data);
  console.log("results/searchParams", searchParams);

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-center align-items-center gap-3">
        <h1 className="fw-bold results-title">Wyniki dla:</h1>
        {data && (
          <p className="results-title">{`Nazwa badania / ${data[0].facility.province?.name
            ?.charAt(0)
            .toUpperCase()}${data[0].facility.province?.name.slice(1)}`}</p>
        )}
        <Button
          className="btn-pink"
          onClick={() => setShowCriteriaModal((prevState) => !prevState)}
        >
          ZMIEŃ KRYTERIA
        </Button>
        <CriteriaModal
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
            return (
              <SearchResult facility={facility} key={facility.facility.id} />
            );
          })}
      </Container>
    </Container>
  );
};

export default TestTemplate;
