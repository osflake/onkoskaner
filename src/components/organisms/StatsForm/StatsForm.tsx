import { Button, Container } from "react-bootstrap";
import CheckboxInput from "../../atoms/CheckboxInput/CheckboxInput";
import RadioInput from "../../atoms/RadioInput/RadioInput";
import { useForm } from "react-hook-form";
import SelectInput from "../../atoms/SelectInput/SelectInput";
import styles from "./StatsForm.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getProvinces } from "../../../services/api/provincesApi";
import { getCities } from "../../../services/api/citiesApi";
import { getServices } from "../../../services/api/servicesApi";
import { useSearchParams } from "react-router-dom";
import { dateTo, days } from "../../../services/helpers/statsDates";

const StatsForm = () => {
  const { data: provincesData } = useQuery(getProvinces());
  const { data: servicesData } = useQuery(getServices({ active: 1 }));
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
      serviceId: search.get("serviceId") || "217",
      provinceId: search.get("provinceId") || "",
      cityId: search.get("cityId") || "",
      interval: search.get("interval") || "1",
      normal: search.get("normal") === "" ? false : true,
      urgent: search.get("urgent") === "" ? false : true,
      waitingTime: search.get("waitingTime") === "true" ? true : false,
    },
  });

  const { data: citiesData } = useQuery(
    [watch("provinceId")],
    getCities({ provinceId: watch("provinceId") })
  );

  const interval = [
    {
      id: "1",
      name: "ostatnie 30 dni",
    },
    {
      id: "2",
      name: "ostatnie 60 dni",
    },
    {
      id: "3",
      name: "ostatni kwartał",
    },
    {
      id: "4",
      name: "ostatni rok",
    },
  ];

  return (
    <form
      className="w-100 pb-5"
      onSubmit={handleSubmit((data) => {
        setSearch({
          ...(data.serviceId && { serviceId: data.serviceId }),
          ...(data.provinceId && { provinceId: data.provinceId }),
          ...(data.cityId && { cityId: data.cityId }),
          ...(data.interval && { interval: data.interval }),
          ...(data.interval && {
            dateTo: dateTo(data.interval),
          }),
          ...(data.interval && {
            days: days(data.interval),
          }),
          ...(data.normal === true ? { normal: "1" } : { normal: "" }),
          ...(data.urgent === true ? { urgent: "2" } : { urgent: "" }),
          ...(data.waitingTime === true
            ? { waitingTime: "true" }
            : { waitingTime: "" }),
        });
      })}
    >
      <Container className="p-0 d-flex flex-row flex-wrap ">
        <div className="pe-5 pt-4" style={{ maxWidth: "890px" }}>
          <p className="results-title fw-normal-500">Wybierz świadczenie</p>
          <Container className="d-inline-flex gap-3 row ">
            {servicesData?.data.map((item: { name: string; id: string }) => (
              <RadioInput
                key={item.id}
                register={register("serviceId", {
                  required: true,
                })}
                label={item.name}
                value={item.id}
              />
            ))}
          </Container>
        </div>
        <div className="p-0 pt-4 h-100 d-flex flex-column  align-items-center justify-content-center">
          <div className="d-flex flex-column">
            <p className="results-title fw-normal-500">Tryb świadczenia</p>
            <Container className="p-0 w-auto d-inline-flex position-relative m-0">
              <CheckboxInput
                register={register("normal", {
                  validate: {
                    positive: () =>
                      !!(!!getValues("urgent") && !!getValues("normal")) ||
                      !!(!getValues("urgent") && !!getValues("normal")) ||
                      !!(!!getValues("urgent") && !getValues("normal")),
                  },
                })}
                label="Normalny"
                id={"1"}
              />
              <CheckboxInput
                register={register("urgent", {
                  validate: {
                    positive: () =>
                      !!(!!getValues("urgent") && !!getValues("normal")) ||
                      !!(!getValues("urgent") && !!getValues("normal")) ||
                      !!(!!getValues("urgent") && !getValues("normal")),
                  },
                })}
                label="Pilny"
                id={"2"}
              />
              {!!errors.normal && !!errors.urgent ? (
                <div className={styles.benefitErrorMessage}>
                  Wybierz tryb świadczenia
                </div>
              ) : null}
            </Container>
            <div className="pt-4">
              <CheckboxInput
                register={register("waitingTime")}
                label="Pokaż czas oczekiwania na wyniki"
              />
            </div>
          </div>
        </div>
      </Container>
      {provincesData && (
        <Container className="p-0 m-0 pt-5 d-flex w-100 justify-content-between gap-4 row">
          <SelectInput
            label="Województwo"
            dropdownData={provincesData}
            register={register("provinceId")}
            onChange={() => setValue("cityId", "")}
          />
          <SelectInput
            label="Miasto"
            dropdownData={citiesData?.data}
            register={register("cityId")}
            disabled={watch("provinceId") === ""}
          />
          <SelectInput
            label="Okres czasowy"
            dropdownData={interval}
            register={register("interval")}
            defaultValue="1"
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
