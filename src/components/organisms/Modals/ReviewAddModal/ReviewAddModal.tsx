import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { postFacilityReview } from "../../../../services/api/facilityReviewsApi";
import StarsInput from "../../../atoms/StarsInput";
import Badge from "react-bootstrap/Badge";

interface ReviewAddModalProps {
  show: boolean;
  handleClose?: () => void;
  facilityId: number;
}

const ReviewAddModal = ({
  show,
  handleClose = () => {},
  facilityId
}: ReviewAddModalProps) => {
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formRating, setFormRating] = useState(0);

  const mutation = useMutation(postFacilityReview());

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({
      facility: facilityId,
      name: formName,
      rating: 5,
      addedByUser: 1,
      content: formDesc
    });

    setFormName("");
    setFormDesc("");
    setTimeout(handleClose, 1000);
  };

  return (
    <Modal className="results-title" show={show} onHide={handleClose} centered>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Dodaj swoją opinię</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="p-0 d-flex flex-column gap-4">
            <Container className="p-0 d-flex flex-column">
              <label className="form-label">Imię</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="name"
                placeholder="Wpisz swoje imię"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </Container>
            <Container className="p-0 d-flex flex-column">
              <label className="form-label">Treść opinii</label>
              <textarea
                style={{ height: "140px" }}
                className="form-control"
                aria-describedby="desc"
                placeholder="Tu napisz swoją opinię"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
              />
            </Container>
            <Container className="px-0 d-flex justify-content-between align-items-center">
              <p className="m-0">Twoja ocena</p>
              <div className="d-flex justify-content-end align-items-center m-0 p-0 gap-3">
                <StarsInput ratingSetter={setFormRating} />
                <h5 className="m-0 p-0">
                  <Badge bg="info">{`${formRating}/5`}</Badge>
                </h5>
              </div>
            </Container>
            {mutation.isLoading ? <p>Trwa wysyłanie opinii...</p> : null}
            {mutation.isSuccess ? (
              <p>Pomyślnie wysłano opinię do weryfikacji!</p>
            ) : null}
            {mutation.isError ? <p>Coś poszło nie tak...</p> : null}
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

export default ReviewAddModal;
