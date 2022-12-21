import { useRef } from "react";
import { Container } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import "./FacilityDetailsTemplate.scss";

import { getFacilityDetails } from "../../../services/api/facilityDetailsApi";
import StarsRating from "../../atoms/StarsRating";
import ResultFilters from "../../molecules/ResultFilters";
import ServiceDetails from "../../organisms/ServiceDetails";
import FacilityReviews from "../../organisms/FacilityReviews";
import { ReactComponent as ToiletIcon } from "../../../assets/Icons/BenefitIcons/ToiletIcon.svg";
import { ReactComponent as ElevatorIcon } from "../../../assets/Icons/BenefitIcons/ElevatorIcon.svg";
import { ReactComponent as ParkingIcon } from "../../../assets/Icons/BenefitIcons/ParkingIcon.svg";
import { ReactComponent as RampIcon } from "../../../assets/Icons/BenefitIcons/RampIcon.svg";
import { ReactComponent as BlocksIcon } from "../../../assets/Icons/BenefitIcons/BlocksIcon.svg";
import { ReactComponent as VirusIcon } from "../../../assets/Icons/BenefitIcons/VirusIcon.svg";

const FacilityDetailsTemplate = () => {
  const linkParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const reviewsRef = useRef<null | HTMLDivElement>(null);

  const { data, isLoading } = useQuery<FacilityDataTypes>(
    getFacilityDetails(linkParams.facilityId)
  );

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  console.log("data", data);

  const filteredDetails = (data: FacilityDataTypes) => {
    if (searchParams.getAll("service").length < 1) {
      return data.latestSurveys;
    } else {
      return data.latestSurveys?.filter(({ service }) =>
        searchParams.getAll("service").includes(service.id.toString())
      );
    }
  };

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="d-flex flex-column gap-5 p-0 align-items-center mb-5">
        <h1 className="fw-bold results-title text-center mb-5">
          {data && data.facility.name}
        </h1>
        <Container className="d-flex justify-content-center align-items-end border-top">
          <Container className="d-flex flex-column justify-content-center align-items-center py-4 px-0 m-0 gap-1 border-end">
            <p>
              {data &&
                `ul. ${data.facility.street}, ${data.facility.zipCode} ${data.facility.city?.name}`}
            </p>
            <Button className="btn-outline-pink">POKAŻ NA MAPIE</Button>
          </Container>
          <Container className="d-flex flex-column justify-content-center align-items-center py-4 px-0 m-0 gap-2">
            <Container className="d-flex justify-content-center align-items-center p-0 gap-2">
              {data && <StarsRating rating={data.rating} />}
              <h4 className="m-0">
                <Badge bg="info" className="m-0">
                  {data?.rating ? `${data?.rating}/5` : "N/A"}
                </Badge>
              </h4>
            </Container>
            <Button
              className="btn-outline-pink"
              onClick={() =>
                reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ZOBACZ OPINIE
            </Button>
          </Container>
        </Container>
      </Container>
      <Container className="p-0 d-flex flex-column align-items-start gap-2 pb-3">
        <p className="fw-bold-600">Lista udogodnień:</p>
        <Container className="p-0 d-flex align-items-center gap-3">
          <ToiletIcon />
          <VirusIcon />
          <ElevatorIcon />
          <ParkingIcon />
          <BlocksIcon />
          <RampIcon />
        </Container>
      </Container>
      <Container className="d-flex flex-column align-items-start gap-5 results-title p-0 pb-5">
        <Container className="d-flex justify-content-between align-items-baseline p-0">
          <h2 className="fw-bold">Terminarz</h2>
          <p>
            Ostatnia aktualizacja:{" "}
            <span className="fw-bold">6 września 2022</span>
          </p>
        </Container>

        <ResultFilters filterAll itemsList={data?.latestSurveys} />
        {data &&
          filteredDetails(data)?.map((survey) => (
            <ServiceDetails
              facility={data.facility}
              key={survey.id}
              name={survey.service.name}
              daysToExamination={survey?.daysToExamination}
              avgTotalCallsPercents={data.avgTotalCallsPercents}
              surveyId={survey.id}
            />
          ))}
      </Container>
      <div ref={reviewsRef} className="w-100 border-top pb-5"></div>
      <FacilityReviews rating={data?.rating} />
    </Container>
  );
};

export default FacilityDetailsTemplate;
