import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";

import "./ResultsFilterModal.scss";

import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import StarsInput from "../../../atoms/StarsInput";

interface ModalContainerProps {
  show: boolean;
  title?: string;
  handleClose?: () => void;
}

const CriteriaModal = ({
  show = true,
  handleClose = () => {}
}: ModalContainerProps) => {
  const [search, setSearch] = useSearchParams();

  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      maxDaysUntilExamination: search.get("maxDaysUntilExamination") || "",
      maxDaysToResults: search.get("maxDaysToResults") || "",
      rating: search.get("rating") || ""
    }
  });

  return (
    <>
      <Modal
        className="results-title"
        show={show}
        onHide={handleClose}
        centered
      >
        <form
          onSubmit={handleSubmit((data) => {
            console.log("filtered by", data);
            data.maxDaysUntilExamination
              ? search.set(
                  "maxDaysUntilExamination",
                  data.maxDaysUntilExamination
                )
              : search.delete("maxDaysUntilExamination");

            data.maxDaysToResults
              ? search.set("maxDaysToResults", data.maxDaysToResults)
              : search.delete("maxDaysToResults");

            data.rating
              ? search.set("rating", data.rating)
              : search.delete("rating");
            search.delete("pageNumber");
            setSearch(search);
          })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Filtrowanie</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-0">
            <Container className="p-0 d-flex flex-column gap-4">
              <h6 className="m-0 px-3">Oczekiwanie na badanie</h6>
              <Container className="m-0 py-2 px-3 pb-3 d-flex justify-content-between align-items-center border-bottom">
                <ButtonGroup>
                  <Button
                    className="results-filter-count-button"
                    variant="info"
                  >
                    -
                  </Button>
                  <input
                    className="text-center"
                    type="number"
                    placeholder="DO 5 DNI"
                    {...register("maxDaysUntilExamination")}
                  />
                  <Button
                    className="results-filter-count-button"
                    variant="info"
                  >
                    +
                  </Button>
                </ButtonGroup>
                <Button
                  onClick={() => setValue("maxDaysUntilExamination", "")}
                  className="text-decoration-none"
                  variant="link"
                >
                  WYCZYŚĆ FILTR
                </Button>
              </Container>
              <h6 className="m-0 px-3">Oczekiwanie na opis badania</h6>
              <Container className="m-0 py-2 px-3 pb-3 d-flex justify-content-between align-items-center border-bottom">
                <ButtonGroup>
                  <Button
                    className="results-filter-count-button"
                    variant="info"
                  >
                    -
                  </Button>
                  <input
                    className="text-center"
                    type="number"
                    placeholder="DO 5 DNI"
                    {...register("maxDaysToResults")}
                  />
                  <Button
                    className="results-filter-count-button"
                    variant="info"
                  >
                    +
                  </Button>
                </ButtonGroup>
                <Button
                  onClick={() => setValue("maxDaysToResults", "")}
                  className="text-decoration-none"
                  variant="link"
                >
                  WYCZYŚĆ FILTR
                </Button>
              </Container>
              <h6 className="m-0 px-3">Ocena ośrodka od</h6>
              <Container className="m-0 py-2 px-3 d-flex justify-content-between align-items-center">
                <div className="m-0 p-0 d-flex justify-content-center align-item-center gap-2">
                  <StarsInput
                    defaultRating={watch("rating")}
                    ratingSetter={(e: any) => {
                      setValue("rating", e.toString());
                    }}
                  />
                  <h5 className="m-0">
                    <Badge bg="info">{`${
                      watch("rating") ? watch("rating") : "-"
                    }/5`}</Badge>
                  </h5>
                </div>
                <Button
                  onClick={() => setValue("rating", "")}
                  className="text-decoration-none"
                  variant="link"
                >
                  WYCZYŚĆ FILTR
                </Button>
              </Container>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Container className="p-0 d-flex w-100 justify-content-center">
              <Button
                variant="danger btn-pink"
                type="submit"
                value="Submit"
                size="lg"
                className="px-5"
                onClick={handleClose}
              >
                Szukaj
              </Button>
            </Container>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default CriteriaModal;
