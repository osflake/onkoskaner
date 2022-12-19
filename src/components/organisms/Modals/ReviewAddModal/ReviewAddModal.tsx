import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Prev } from "react-bootstrap/esm/PageItem";

interface ReviewAddModalProps {
  show: boolean;
  handleClose?: () => void;
}

const ReviewAddModal = ({
  show,
  handleClose = () => {}
}: ReviewAddModalProps) => {
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`submitted name: ${formName}`);
    console.log(`submitted review: ${formDesc}`);
    setFormName("");
    setFormDesc("");
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
