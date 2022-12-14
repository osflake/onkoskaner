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
      service: search.get("service") || "217",
      province: "all",
      city: "all",
      interval: "all",
      normal: true,
      urgent: false,
    },
  });

  const { data: citiesData } = useQuery(
    [watch("province")],
    getCities({ provinceId: watch("province") })
  );

  if (watch("province") === "all") {
    setValue("city", "all");
  }

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

  // const today = new Date();
  // const quarter = Math.floor(today.getMonth() / 3);

  // const startFullQuarterxxx = new Date(today.getFullYear(), quarter * 3 - 3, 1)
  //   .toISOString()
  //   .split("T")[0];

  // const startFullQuarter = new Date(today.getFullYear(), quarter * 3 - 3, 1);
  // const endFullQuarter = new Date(
  //   startFullQuarter.getFullYear(),
  //   startFullQuarter.getMonth() + 3,
  //   0
  // )
  //   .toISOString()
  //   .split("T")[0];

  // let last30days = new Date(today.setDate(today.getDate() - 30))
  //   .toISOString()
  //   .split("T")[0];
  // let last60days = new Date(today.setDate(today.getDate() - 60))
  //   .toISOString()
  //   .split("T")[0];

  // console.log(last30days, last60days);

  console.log(search.toString());

  return (
    <form
      className="w-100 pb-5"
      onSubmit={handleSubmit((data) => {
        console.log(data);

        setSearch({
          ...(data.service && { service: data.service }),
          ...(data.province && { province: data.province }),
          ...(data.city && { city: data.city }),
          ...(data.interval && { interval: data.interval }),
          ...(data.service && { service: data.service }),
        });
      })}
    >
      <Container className="p-0 d-flex flex-row ">
        <div className="pe-5">
          <p className="results-title fw-normal-500">Wybierz świadczenie</p>
          <Container className="p-0 d-inline-flex gap-3 ">
            {servicesData?.data.map((item: { name: string; id: string }) => (
              <RadioInput
                key={item.id}
                register={register("service", {
                  required: true,
                })}
                label={item.name}
                value={item.id}
              />
            ))}
          </Container>
        </div>
        <div className="p-0 ps-5 d-flex flex-column  align-items-center justify-content-center">
          <div>
            <p className="results-title fw-normal-500">Tryb świadczenia</p>
            <Container className="p-0 w-auto d-inline-flex position-relative">
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
          </div>
        </div>
      </Container>
      {provincesData && (
        <Container className="p-0 pt-5 d-flex w-100 justify-content-between gap-4">
          <SelectInput
            label="Województwo"
            dropdownData={provincesData}
            register={register("province")}
          />
          <SelectInput
            label="Miasto"
            dropdownData={citiesData?.data}
            register={register("city")}
            disabled={watch("province") === "all"}
          />
          <SelectInput
            label="Okres czasowy"
            dropdownData={interval}
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
