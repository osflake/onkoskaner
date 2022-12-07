import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";

import { getFacilityDetails } from "../../../services/api/facilityDetailsApi";

import "./FacilityDetailsTemplate.scss";

const FacilityDetailsTemplate = () => {
  const linkParams = useParams();
  const { data, isLoading } = useQuery<FacilityDataTypes>(
    getFacilityDetails(linkParams.facilityId)
  );

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <Container className="d-flex flex-column p-5 gap-5 justify-content-center align-items-center">
      <Container className="d-flex flex-column gap-4 p-0 align-items-center">
        <h1 className="fw-bold results-title text-center">
          {data && data.facility.name}
        </h1>
        <Container className="d-flex justify-content-center align-items-end border-top">
          <Container className="d-flex flex-column justify-content-center align-items-center py-4 px-0 m-0 gap-1 border-end">
            <p>
              {data &&
                `ul. ${data.facility.street}, ${data.facility.zipCode} ${data.facility.city}`}
            </p>
            <Button className="btn-outline-pink">POKAŻ NA MAPIE</Button>
          </Container>
          <Container className="d-flex flex-column justify-content-center align-items-center py-4 px-0 m-0 gap-1">
            <p>
              {data &&
                `ul. ${data.facility.street}, ${data.facility.zipCode} ${data.facility.city}`}
            </p>
            <Button className="btn-outline-pink">ZOBACZ OPINIE</Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default FacilityDetailsTemplate;
