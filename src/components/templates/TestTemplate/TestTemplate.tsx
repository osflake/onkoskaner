import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFacilities } from "../../../services/api/facilitiesApi";
import SearchResult from "../../atoms/SearchResult/SearchResult";
import "./TestTemplate.scss";
import ErrorInfo from "../../atoms/ErrorInfo";
import CriteriaModal from "../../organisms/Modals/CriteriaModal/CriteriaModal";
import CustomPagination from "../../molecules/CustomPagination/CustomPagination";

const TestTemplate = () => {
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState(1);

  // currPage <= 0 ? "0" : ((currPage - 1) * 10).toString()

  const { isError, data } = useQuery<FacilityDataApiTypes>(
    getFacilities({
      offset: searchParams.get("page")
        ? Number(searchParams.get("page")) <= 0
          ? "0"
          : ((Number(searchParams.get("page")) - 1) * 10)?.toString()
        : "0",
      limit: "10",
      provinceId: searchParams.get("provinceId"),
      serviceId: searchParams.get("serviceId"),
      queueId: searchParams.get("queueId")
    })
  );

  const getQueueName = (queueId: any) => {
    if (queueId === "1") {
      return "Kolejka Normalna";
    }
    if (queueId === "2") {
      return "Kolejka CITO";
    }
    if (queueId === "4") {
      return "Leczenie Onkol.";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (searchParams.get("page")) {
      setCurrPage(Number(searchParams.get("page")));
    }

    if (!searchParams.get("page")) {
      setCurrPage(1);
    }

    if (data && data.data.length <= 0) {
      searchParams.set(
        "page",
        (Math.floor(data.meta.totalResults / 10) + 1).toString()
      );
      setSearchParams(searchParams);

      return;
    }
  }, [data, currPage, searchParams, setSearchParams]);

  // searchParams.set("page", currPage.toString());
  // setSearchParams(searchParams);

  const handlePageChange = (e: any) => {
    searchParams.set("page", e.toString());
    setSearchParams(searchParams);
    setCurrPage(e);
  };

  if (isError) {
    return <ErrorInfo redirectTo="http://dev.onkoskaner.pl/" />;
  }

  if (data && data.data.length <= 0) {
    return <div>Pusta lista</div>;
  }

  // console.log(data);

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-center align-items-center gap-3">
        <h1 className="fw-bold results-title">Wyniki dla:</h1>
        {data && (
          <div className="results-breadcrumbs">
            <p>
              {searchParams.get("serviceId")
                ? data.data[0].latestSurveys
                  ? data.data[0].latestSurveys.length
                    ? data.data[0].latestSurveys[0].service.name
                    : "Wszystkie badania"
                  : "Wszystkie badania"
                : "Wszystkie badania"}
            </p>
            <p className="results-breadcrumbs-divider">/</p>
            <p>
              {searchParams.get("provinceId")
                ? ` ${data.data[0].facility.province?.name
                    ?.charAt(0)
                    .toUpperCase()}${data.data[0].facility.province?.name.slice(
                    1
                  )}`
                : "Cała Polska"}
            </p>
            <p className="results-breadcrumbs-divider">/</p>
            <p>
              {searchParams.get("queueId")
                ? getQueueName(searchParams.get("queueId"))
                : "Nie zdefiniowano rodzaju kolejki"}
            </p>
          </div>
        )}
      </Container>
      <Container className="d-flex flex-column align-items-center gap-3">
        <Button
          className="btn-pink results-rwd-button"
          onClick={() => setShowCriteriaModal((prevState) => !prevState)}
        >
          ZMIEŃ KRYTERIA
        </Button>
        <CriteriaModal
          show={showCriteriaModal}
          handleClose={() => setShowCriteriaModal((prevState) => !prevState)}
        />
        {/* <Button className="btn-outline-pink results-sort-button">
          SORTOWANIE
        </Button> */}
      </Container>

      <Container className="d-flex flex-column gap-5">
        <Container className="p-0 results-sort-section">
          {/* <Container className="d-flex p-0 gap-5 justify-content-start align-items-center breadcrumbs-font-size">
            <p className="results-title fw-normal-500">Sortowanie:</p>
            <p className="text-secondary">czas oczekiwania na wizytę</p>
            <p className="text-secondary">czas oczekiwania na opis badania</p>
            <p className="text-secondary">ocena ośrodka</p>
          </Container> */}
        </Container>

        {data &&
          data.data.map((facility) => {
            return (
              <SearchResult
                facility={facility}
                key={facility.facility.id}
                avgSuccessfulCallsPercents={facility.avgSuccessfulCallsPercents}
                ratingCount={facility.ratingCount}
                latestSurveys={facility.latestSurveys}
                totalReviews={facility.totalReviews}
              />
            );
          })}
      </Container>
      <CustomPagination
        totalCount={data?.meta.totalResults || 0}
        pageSize={10}
        currentPage={currPage ? currPage : 1}
        onPageChange={(e: any) => handlePageChange(e)}
      />
    </Container>
  );
};

export default TestTemplate;
