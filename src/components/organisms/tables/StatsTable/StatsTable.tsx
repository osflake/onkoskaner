import { Container, Table } from "react-bootstrap";
import "./StatsTable.scss";
import sortArrow from "../../../../assets/Icons/SortResults/SortArrow.svg";
import { useState } from "react";
import TableRowWithCollapse from "./TableRowWithCollapse";
import RadioInput from "../../../atoms/RadioInput/RadioInput";
import { useSearchParams } from "react-router-dom";

interface FormValues {
  province: {
    name: string;
    id: number;
  };
  results: {
    minDaysUntilExamination: number;
    avgDaysUntilExaminationDaysUntilExamination: number;
    maxDaysUntilExamination: number;
  };
}

const RaportTable = ({
  data,
  adminRole,
  register,
  watch,
}: {
  data: any;
  adminRole: boolean;
  register: any;
  watch: any;
}) => {
  const [sort, setSort] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (sortBy: string) => {
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
    setSort(sortBy);
  };

  const statsByData = [
    { name: "względem województw", value: "1" },
    { name: "względem miast", value: "2" },
    { name: "względem placówek", value: "3" },
  ];

  const queueData = [
    { name: "Normalny", value: "1" },
    { name: "Pilny", value: "2" },
  ];

  return (
    <div className="w-100 my-5">
      <div className="d-flex row">
        {adminRole ? (
          <div className="pt-4 col-12 col-sm-7">
            <p className="results-title fw-normal-500">
              Szczegółowe statystyki względem:
            </p>
            <Container className=" d-inline-flex gap-2 row ">
              {statsByData.map((item: { name: string; value: string }) => (
                <RadioInput
                  key={item.value}
                  register={register("statsBy", {
                    required: true,
                  })}
                  label={item.name}
                  value={item.value}
                />
              ))}
            </Container>
          </div>
        ) : null}{" "}
        <div className="pt-4 col-12 col-sm-5">
          <p className="results-title fw-normal-500">Tryb świadczenia:</p>
          <Container className="d-inline-flex gap-2 row w-50">
            {queueData.map((item: { name: string; value: string }) => (
              <RadioInput
                key={item.value}
                register={register("queueId", {
                  required: true,
                })}
                label={item.name}
                value={item.value}
              />
            ))}
          </Container>
        </div>
      </div>
      {!!data ? (
        <Table className="mt-5">
          <thead>
            <tr>
              <th className="pb-3">Czas oczekiwania:</th>
              <th className="pb-4">
                <button
                  className="stats__sortButton"
                  data-asc={sort === "minDaysUntilExamination,ASC"}
                  onClick={() =>
                    sort === "minDaysUntilExamination,ASC"
                      ? handleSort(`minDaysUntilExamination,DESC`)
                      : handleSort(`minDaysUntilExamination,ASC`)
                  }
                >
                  <span>Najszybciej</span> <img src={sortArrow} alt="" />
                </button>
              </th>
              <th className="pb-4">
                <button
                  className="stats__sortButton"
                  data-asc={sort === "avgDaysUntilExamination,ASC"}
                  onClick={() =>
                    sort === "avgDaysUntilExamination,ASC"
                      ? handleSort(`avgDaysUntilExamination,DESC`)
                      : handleSort(`avgDaysUntilExamination,ASC`)
                  }
                >
                  <span>Średnio</span>
                  <img src={sortArrow} alt="" />
                </button>
              </th>
              <th className="pb-4">
                <button
                  className="stats__sortButton"
                  data-asc={sort === "maxDaysUntilExamination,ASC"}
                  onClick={() =>
                    sort === "maxDaysUntilExamination,ASC"
                      ? handleSort(`maxDaysUntilExamination,DESC`)
                      : handleSort(`maxDaysUntilExamination,ASC`)
                  }
                >
                  <span>Najdłużej</span>
                  <img src={sortArrow} alt="" />
                </button>
              </th>
              <th className="pb-4"></th>
            </tr>
          </thead>

          <tbody className="tableBody">
            <tr>
              <th>Cała polska</th>
              <th>
                {Math.round(
                  data?.reduce(
                    (accumulator: number, currentValue: any) =>
                      accumulator +
                      Number(currentValue.results.minDaysUntilExamination),
                    0
                  ) / 16
                )}{" "}
                dni
              </th>
              <th>
                {Math.round(
                  data.reduce(
                    (accumulator: number, currentValue: any) =>
                      accumulator +
                      Number(currentValue.results.avgDaysUntilExamination),
                    0
                  ) / 16
                )}{" "}
                dni
              </th>
              <th>
                {Math.round(
                  data.reduce(
                    (accumulator: number, currentValue: any) =>
                      accumulator +
                      currentValue.results.maxDaysUntilExamination,
                    0
                  ) / 16
                )}{" "}
                dni
              </th>
              <th></th>
            </tr>

            {data.map((item: any) => {
              return (
                <TableRowWithCollapse
                  item={item}
                  key={item.province.id}
                  statsBy={watch("statsBy")}
                />
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaportTable;
