import { useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./FacilityDetailsTemplate.scss";

import { getFacilityDetails } from "../../../services/api/facilityDetailsApi";
import DetailsHeader from "../../organisms/DetailsHeader";
import ResultFilters from "../../molecules/ResultFilters";
import ServiceDetails from "../../organisms/ServiceDetails";
import FacilityReviews from "../../organisms/FacilityReviews";
import ErrorInfo from "../../atoms/ErrorInfo";
import ListOfFacilities from "../../molecules/ListOfFacilities/ListOfFacilities";
import FilterPill from "../../atoms/FilterPill";

const FacilityDetailsTemplate = () => {
  const linkParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const reviewsRef = useRef<null | HTMLDivElement>(null);

  const { data, isLoading, isError } = useQuery<FacilityDataTypes>(
    getFacilityDetails(linkParams.facilityId)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (!data?.facility) {
    return (
      <ErrorInfo
        title="Taka placówka nie istnieje"
        redirectTo="http://dev.onkoskaner.pl/"
      />
    );
  }

  const filteredDetails = (data: FacilityDataTypes) => {
    if (
      searchParams.getAll("service").length < 1 &&
      searchParams.getAll("queue").length < 1
    ) {
      return data.latestSurveys;
    }

    if (
      searchParams.getAll("service").length &&
      searchParams.getAll("queue").length
    ) {
      return data.latestSurveys?.filter(
        ({ service, queue }) =>
          searchParams.getAll("service").includes(service.id.toString()) &&
          searchParams.getAll("queue").includes(queue.id.toString())
      );
    }

    if (
      searchParams.getAll("service").length < 1 &&
      searchParams.getAll("queue").length
    ) {
      return data.latestSurveys?.filter(({ service, queue }) =>
        searchParams.getAll("queue").includes(queue.id.toString())
      );
    }

    if (
      searchParams.getAll("service").length &&
      searchParams.getAll("queue").length < 1
    ) {
      return data.latestSurveys?.filter(({ service, queue }) =>
        searchParams.getAll("service").includes(service.id.toString())
      );
    }
  };

  // console.log(data);

  return (
    <Container className="d-flex flex-column py-5 gap-5 justify-content-center align-items-center">
      {data && (
        <DetailsHeader
          facility={data.facility}
          scrollClick={() =>
            reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          rating={data.rating}
        />
      )}
      <Container className="p-0 d-flex flex-column align-items-start gap-2 pb-3">
        <p className="fw-bold-600">Lista udogodnień:</p>
        <ListOfFacilities data={data?.facility} />
      </Container>
      <Container className="d-flex flex-column align-items-start gap-5 results-title p-0 pb-5">
        <Container className="d-flex justify-content-between align-items-baseline p-0">
          <h2 className="fw-bold">Terminarz</h2>
        </Container>

        <ResultFilters
          filterAll
          filterBy="service"
          itemsList={data?.latestSurveys}
        />
        <Container className="d-flex flex-column align-items-start gap-3 p-0">
          <p className="fw-normal-500 fs-14 m-0">Filtruj po rodzaju kolejki</p>
          <Container className="d-flex align-items-start p-0 gap-3 pills-overflow">
            <FilterPill filterByName="queue" title="Normalna" filterId={1} />
            <FilterPill filterByName="queue" title="CITO" filterId={2} />
          </Container>
        </Container>
        {data &&
          filteredDetails(data)?.map((survey) => (
            <ServiceDetails
              facility={data.facility}
              key={survey.id}
              name={survey.service.name}
              serviceId={survey.service.id}
              avgTotalCallsPercents={data.avgTotalCallsPercents}
              surveyId={survey.id}
              queueId={survey.queue.id}
              updatedAt={survey.updatedAt}
              daysToResults={survey.daysToResults}
              daysUntilExamination={survey.daysUntilExamination}
            />
          ))}
      </Container>
      <div className="w-100 border-top pb-5"></div>
      <div ref={reviewsRef} className="w-100 p-0 m-0">
        {data && (
          <FacilityReviews
            totalReviews={data.totalReviews}
            rating={data.rating}
          />
        )}
      </div>
    </Container>
  );
};

export default FacilityDetailsTemplate;
