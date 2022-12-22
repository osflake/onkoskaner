import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { getProvinces } from "../../../../services/api/provincesApi";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../../services/api/servicesApi";
import SelectInput from "../../../atoms/SelectInput/SelectInput";
import { getCities } from "../../../../services/api/citiesApi";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import SwitchButton from "../../../atoms/SwitchButton/SwitchButton";

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

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      serviceId: search.get("serviceId"),
      provinceId: search.get("provinceId") || "",
      queueId: search.get("queueId") === "1" ? false : true,
      cityId: search.get("cityId") || ""
    }
  });
  const { data: provincesData } = useQuery(getProvinces());
  const { data: servicesData, isLoading } = useQuery(
    getServices({ active: 1 })
  );

  const { data: citiesData } = useQuery(
    [watch("provinceId")],
    getCities({ provinceId: watch("provinceId") })
  );

  return (
    <>
      {provincesData && !isLoading && (
        <Modal
          className="results-title "
          show={show}
          onHide={handleClose}
          centered
        >
          <form
            onSubmit={handleSubmit((data) => {
              setSearch({
                ...(data.serviceId && { serviceId: data.serviceId }),
                provinceId: data.provinceId,
                queueId: data.queueId ? "2" : "1",
                cityId: data.cityId
              });
            })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Zmień kryteria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container className="p-0 d-flex flex-column gap-4">
                <SelectInput
                  dropdownData={servicesData.data}
                  defaultValue={servicesData.data[0].id}
                  register={register("serviceId")}
                  label="Świadczenie"
                />
                <SwitchButton
                  label="Pilne badania"
                  register={register("queueId")}
                />
                <SelectInput
                  dropdownData={provincesData}
                  register={register("provinceId")}
                  label="Województwo"
                  onChange={() => setValue("cityId", "")}
                />
                <SelectInput
                  dropdownData={citiesData?.data}
                  register={register("cityId")}
                  disabled={watch("provinceId") === ""}
                  label="Miasto"
                />
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Container className="p-0  d-flex w-100 justify-content-center">
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
      )}
    </>
  );
};

export default CriteriaModal;
