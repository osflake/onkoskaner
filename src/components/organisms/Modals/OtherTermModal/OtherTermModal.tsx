import { useState } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { postOtherTerm } from "../../../../services/api/otherTermApi";

interface OtherTermModalProps {
  show: boolean;
  handleClose?: () => void;
  facilityId: number;
  serviceId: number;
  queueId: number;
}

const OtherTermModal = ({
  show,
  handleClose = () => {},
  facilityId,
  serviceId,
  queueId
}: OtherTermModalProps) => {
  const [formDesc, setFormDesc] = useState("");
  const { isLoading, isError, isSuccess, error, mutate } = useMutation(
    postOtherTerm()
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    mutate({
      facilityId: facilityId,
      serviceId: serviceId,
      queueId: queueId,
      respondentType: 3,
      content: formDesc
    });

    setFormDesc("");

    isLoading && console.log("loading...");
    isSuccess && console.log("successfully posted data");
    setTimeout(handleClose, 1000);
  };

  return (
    <Modal className="results-title" show={show} onHide={handleClose} centered>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Inny termin?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="p-0 d-flex flex-column gap-4">
            <Container className="p-0 d-flex flex-column">
              <label className="form-label">Podziel się z nami detalami</label>
              <textarea
                style={{ height: "140px" }}
                className="form-control"
                aria-describedby="desc"
                placeholder="Tu napisz szczegóły nowego terminu"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
              />
            </Container>
            {isLoading ? <p>Wysyłam informacje...</p> : null}
            {isSuccess ? <p>Pomyślnie wysłano informacje!</p> : null}
            {isError ? <p>{`${error}`}</p> : null}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container className="p-0 d-flex w-100 gap-3 justify-content-end">
            <Button
              variant="danger btn-outline-pink"
              size="lg"
              onClick={handleClose}
            >
              ANULUJ
            </Button>
            <Button
              variant="danger btn-pink"
              value="Submit"
              size="lg"
              type="submit"
            >
              WYŚLIJ
            </Button>
          </Container>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default OtherTermModal;
