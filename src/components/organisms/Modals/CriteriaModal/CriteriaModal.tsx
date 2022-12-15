import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

// import "./ChangeCriteriaModal.css";

import { getProvinces } from "../../../../services/api/provincesApi";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../../services/api/servicesApi";
import SelectInput from "../../../atoms/SelectInput/SelectInput";
import { getCities } from "../../../../services/api/citiesApi";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

interface ModalContainerProps {
  show: boolean;
  title?: string;
  handleClose?: () => void;
}

const CriteriaModal = ({
  show = true,
  handleClose = () => {},
}: ModalContainerProps) => {
  const [search, setSearch] = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      serviceId: search.get("serviceId"),
      provinceId: search.get("provinceId") || "all",
      queueId: search.get("queueId"),
      cityId: search.get("cityId") || "all",
    },
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
              console.log(data);
              setSearch({
                ...(data.serviceId && { serviceId: data.serviceId }),
                ...(data.provinceId && { provinceId: data.provinceId }),
                ...(data.queueId && { queueId: data.queueId }),
                ...(data.cityId && { cityId: data.cityId }),
              });
            })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Zmień kryteria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container className="p-0">
                <SelectInput
                  dropdownData={servicesData.data}
                  defaultValue={servicesData.data[0].id}
                  register={register("serviceId")}
                  // onChange={() => setValue("city", "all")}
                  label="Świadczenie"
                />

                <div className="form-check form-switch">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      {...register("queueId")}
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      style={{ transform: "scale(1.3)" }}
                      defaultValue={"true"}
                    />
                    Pilne badania
                  </label>
                </div>
                <SelectInput
                  // dropdownData={citiesData?.data}
                  dropdownData={provincesData}
                  register={register("provinceId")}
                  // disabled={watch("province") === "all"}
                  label="Województwo"
                  onChange={() => setValue("cityId", "all")}
                />
                <SelectInput
                  dropdownData={citiesData?.data}
                  register={register("cityId")}
                  disabled={watch("provinceId") === "all"}
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
