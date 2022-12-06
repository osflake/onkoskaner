import React from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { useProvincesQuery } from "../../../hooks/useProvincesQuery";
import CheckboxInput from "../../atoms/CheckboxInput/CheckboxInput";
import RadioInput from "../../atoms/RadioInput/RadioInput";
import { useForm } from "react-hook-form";

const RaportsForm = () => {
  const { data } = useProvincesQuery();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <form
      className="w-100"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Container className="p-0 d-flex flex-row ">
        <div className=" ">
          <p className="results-title fw-normal-500">Wybierz świadczenie</p>
          <Container className="p-0 d-inline-flex gap-3 ">
            <RadioInput
              register={register("benefit", {
                required: true,
              })}
              label="Świadczenie A"
              value="1"
            />
            <RadioInput
              register={register("benefit", {
                required: true,
              })}
              label="Świadczenie B"
              value="2"
            />
            <RadioInput
              register={register("benefit", {
                required: true,
              })}
              label="Świadczenie C"
              value="3"
            />
            <RadioInput
              register={register("benefit", {
                required: true,
              })}
              label="Świadczenie D"
              value="4"
            />
          </Container>
        </div>
        <Container className="p-0 d-flex flex-column  align-items-center">
          <div>
            <p className="results-title fw-normal-500 mb-4 ">
              Tryb świadczenia
            </p>
            <Container className="p-0 w-auto d-inline-flex">
              <CheckboxInput
                register={register("normal")}
                label="Normalny"
                id={"1"}
              />
              <CheckboxInput
                register={register("urgent")}
                label="Pilny"
                id={"2"}
              />
            </Container>
          </div>
        </Container>
      </Container>
      {data && (
        <Container className="p-0 pt-5 d-flex w-100 justify-content-between gap-4">
          <Dropdown className="w-100">
            <p className="dropDownLabel">Województwo</p>
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
          <Dropdown className="w-100">
            <p className="dropDownLabel">Miasto</p>
            <Dropdown.Toggle
              className="d-flex justify-content-between align-items-center fs-13 criteria-modal-btn"
              variant="outline-success"
              id="dropdown-basic"
              disabled
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
          <Dropdown className="w-100">
            <p className="dropDownLabel">Okres czasowy</p>
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
      )}
      <button value="Submit" />
    </form>
  );
};

export default RaportsForm;
