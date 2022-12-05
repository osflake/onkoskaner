import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

import "./ChangeCriteriaModal.css";

import { useProvincesQuery } from "../../../../hooks/useProvincesQuery";

interface ModalContainerProps {
  show: boolean;
  title?: string;
  handleClose?: () => void;
}

const ModalContainer = ({
  show = true,
  title = "Zmień kryteria",
  handleClose = () => {},
}: ModalContainerProps) => {
  const { data } = useProvincesQuery();

  return (
    <>
      {data && (
        <Modal
          className="results-title"
          show={show}
          onHide={handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Dropdown>
                <Dropdown.Toggle
                  className="d-flex justify-content-between align-items-center fs-13 criteria-modal-btn"
                  variant="outline-success"
                  id="dropdown-basic"
                >
                  {data[0].name}
                </Dropdown.Toggle>

                <Dropdown.Menu className="criteria-modal-btn">
                  {data.map((province) => (
                    <Dropdown.Item className="results-title" key={province.id}>
                      {province.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalContainer;
