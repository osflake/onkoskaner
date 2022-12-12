import { Button, Container } from "react-bootstrap";
import { useProvincesQuery } from "../../../hooks/useProvincesQuery";
import CheckboxInput from "../../atoms/CheckboxInput/CheckboxInput";
import RadioInput from "../../atoms/RadioInput/RadioInput";
import { useForm } from "react-hook-form";
import SelectInput from "../../atoms/SelectInput/SelectInput";

const StatsForm = () => {
  const { data } = useProvincesQuery();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      benefit: "1",
      province: "all",
      city: "all",
      interval: "all",
      normal: false,
      urgent: false,
    },
  });

  if (watch("province") === "all") {
    setValue("city", "all");
  }

  return (
    <form
      className="w-100 pb-5"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Container className="p-0 d-flex flex-row ">
        <div className="pe-5">
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
        <div className="p-0 ps-5 d-flex flex-column  align-items-center justify-content-center">
          <div>
            <p className="results-title fw-normal-500">Tryb świadczenia</p>
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
        </div>
      </Container>
      {data && (
        <Container className="p-0 pt-5 d-flex w-100 justify-content-between gap-4">
          <SelectInput
            label="Województwo"
            dropdownData={data}
            register={register("province")}
          />
          <SelectInput
            label="Miasto"
            dropdownData={data}
            register={register("city")}
            disabled={watch("province") === "all"}
          />
          <SelectInput
            label="Okres czasowy"
            dropdownData={data}
            register={register("interval")}
          />
        </Container>
      )}
      <Container className="p-0 pt-4 d-flex w-100 justify-content-center">
        <Button
          variant="danger btn-pink"
          type="submit"
          value="Submit"
          size="lg"
          className="px-5"
        >
          Generuj
        </Button>
      </Container>
    </form>
  );
};

export default StatsForm;
