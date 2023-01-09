import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import "./MapModal.scss";
import StarsRating from "../../../atoms/StarsRating";
import ReviewAddModal from "../ReviewAddModal";

interface MapModalProps {
  show: boolean;
  handleClose: () => void;
  facility: FacilityDataTypes;
}

const MapModal = ({
  show,
  handleClose = () => {},
  facility
}: MapModalProps) => {
  const [showReviewAdd, setShowReviewAdd] = useState(false);

  return (
    <Modal
      className="results-title map-modal-container"
      show={show}
      onHide={handleClose}
      centered
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          <Link
            className="fw-bold-600 m-0 results-title results-link"
            to={`/details/${facility.facility.id}`}
          >
            {facility.facility.name}
          </Link>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="p-0 d-flex flex-column gap-4 h-100">
          <iframe
            title="Alivia"
            id="placowka_mapa"
            width="100%"
            height="100%"
            style={{
              border: "0",
              borderRadius: "12px",
              zIndex: "1000"
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCnQEweM-kYWe0sHmlryq_IViRQMUZuwDU
									&q=${encodeURI(facility.facility.name ? facility.facility.name : "")}${
              facility.facility.street ? `+${facility.facility.street}` : ""
            }${
              facility.facility.city ? `+${facility.facility.city.name}` : ""
            }`}
          ></iframe>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Container className="p-0 d-flex w-100 gap-3 justify-content-between">
          <div className="d-flex p-0 m-0 gap-2 flex-wrap justify-content-start align-items-center">
            <StarsRating rating={facility.rating} />
            <h4 className="m-0">
              <Badge bg="info" className="m-0">
                {facility.rating ? `${facility.rating.toFixed(1)}/5` : "-/5"}
              </Badge>
            </h4>
            <Button
              className="btn-outline-pink text-nowrap"
              onClick={() => setShowReviewAdd((prev) => (prev = true))}
            >
              DODAJ OPINIĘ
            </Button>
            <ReviewAddModal
              facilityId={facility.facility.id}
              show={showReviewAdd}
              handleClose={() => setShowReviewAdd(false)}
            />
          </div>
          <Button variant="danger btn-pink" size="lg" onClick={handleClose}>
            WRÓĆ
          </Button>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default MapModal;
