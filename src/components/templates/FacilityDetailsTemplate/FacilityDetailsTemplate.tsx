import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getFacilityDetails } from "../../../services/api/facilityDetailsApi";

import "./FacilityDetailsTemplate.scss";

const FacilityDetailsTemplate = () => {
  const linkParams = useParams();
  const { data, isLoading } = useQuery(
    getFacilityDetails(linkParams.facilityId)
  );

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="w-75 d-flex flex-column justify-content-center align-items-center gap-3">
        <h1 className="fw-bold results-title">{data && data.facility.name}</h1>
        <p className="results-title">asdasdasdasda</p>
      </Container>
    </Container>
  );
};

export default FacilityDetailsTemplate;
