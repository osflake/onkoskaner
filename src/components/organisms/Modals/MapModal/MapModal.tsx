import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./MapModal.scss";

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
  return (
    <Modal
      className="results-title map-modal-container"
      show={show}
      onHide={handleClose}
      centered
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{facility.facility.name}</Modal.Title>
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
        <Container className="p-0 d-flex w-100 gap-3 justify-content-end">
          <Button variant="danger btn-pink" size="lg" onClick={handleClose}>
            WRÓĆ
          </Button>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default MapModal;
