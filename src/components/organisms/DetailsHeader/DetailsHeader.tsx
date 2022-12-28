import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import "./DetailsHeader.scss";

import StarsRating from "../../atoms/StarsRating";

interface DetailsHeaderProps {
  rating?: number;
  facility: FacilityDataTypes["facility"];
  scrollClick: () => void;
}

const DetailsHeader = ({
  facility,
  rating,
  scrollClick = () => {},
}: DetailsHeaderProps) => {
  return (
    <Container className="d-flex flex-column gap-5 p-0 align-items-center mb-5">
      <div className="w-100 col-12">
        <div className="google-map-container grid-container">
          <Container
            style={{ zIndex: "1002" }}
            className="d-flex flex-column grid-item gap-5 p-0 py-3"
          >
            <h1 className="m-0 fw-bold rwd-width results-title">
              {facility.name}
            </h1>
            <p className="p-0">
              {`ul. ${facility.street}, ${facility.zipCode} ${facility.city?.name}`}
            </p>
            <Container className="d-flex flex-column justify-content-center align-items-start px-0 m-0 gap-5">
              <Container className="d-flex justify-content-start align-items-center p-0 gap-3">
                {<StarsRating rating={rating} />}
                <h4 className="m-0">
                  <Badge bg="info" className="m-0">
                    {rating
                      ? `${(Math.round(rating * 10) / 10).toFixed(1)}/5`
                      : "-/5"}
                  </Badge>
                </h4>
              </Container>
              <Button className="btn-outline-pink" onClick={scrollClick}>
                ZOBACZ OPINIE
              </Button>
            </Container>
          </Container>
          <iframe
            className="grid-item"
            title="Alivia"
            id="placowka_mapa"
            width="100%"
            height="100%"
            style={{
              border: "0",
              borderRadius: "0px 48px 48px 0px",
              zIndex: "1000",
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCnQEweM-kYWe0sHmlryq_IViRQMUZuwDU
									&q=${encodeURI(facility.name ? facility.name : "")}${
              facility.street ? `+${facility.street}` : ""
            }${facility.city ? `+${facility.city.name}` : ""}`}
          ></iframe>

          <div
            style={{ zIndex: "1001" }}
            className="google-map-cover grid-item"
          ></div>
        </div>
      </div>
    </Container>
  );
};

export default DetailsHeader;
