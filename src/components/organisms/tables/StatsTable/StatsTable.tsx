import { Container, Table } from "react-bootstrap";
import "./StatsTable.scss";
import sortArrow from "../../../../assets/Icons/SortResults/SortArrow.svg";
import { useState } from "react";
import TableRowWithCollapse from "./TableRowWithCollapse";
import RadioInput from "../../../atoms/RadioInput/RadioInput";
import { useForm } from "react-hook-form";
interface FormValues {
  province: {
    name: string;
    id: number;
  };
  results: {
    minDaysUntilExamination: number;
    avgDaysUntilExamination: number;
    maxDaysUntilExamination: number;
  };
}

const RaportTable = ({
  data,
  adminRole,
}: {
  data: any;
  adminRole: boolean;
}) => {
  const [sort, setSort] = useState("");

  const { register, watch } = useForm({
    defaultValues: {
      statsBy: "1",
    },
  });

  const statsByData = [
    { name: "względem województw", value: "1" },
    { name: "względem miast", value: "2" },
    { name: "względem placówek", value: "3" },
  ];

  return (
    <div className="w-100 my-5">
      {adminRole ? (
        <div className="pt-4">
          <p className="results-title fw-normal-500">
            Szczegółowe statystyki względem:
          </p>
          <Container className="p-0 d-inline-flex gap-3 ">
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
      ) : null}
      {!!data ? (
        <Table className="mt-5 ">
          <thead>
            <tr>
              <th className="pb-3">Czas oczekiwania:</th>
              <th className="pb-4">
                <button
                  className="stats__sortButton"
                  data-asc={sort === "fastest,asc"}
                  onClick={() =>
                    sort === "fastest,asc"
                      ? setSort(`fastest,desc`)
                      : setSort(`fastest,asc`)
                  }
                >
                  <span>Najszybciej</span> <img src={sortArrow} alt="" />
                </button>
              </th>
              <th className="pb-4">
                <button
                  className="stats__sortButton"
                  data-asc={sort === "medium,asc"}
                  onClick={() =>
                    sort === "medium,asc"
                      ? setSort(`medium,desc`)
                      : setSort(`medium,asc`)
                  }
                >
                  <span>Średnio</span>
                  <img src={sortArrow} alt="" />
                </button>
              </th>
              <th className="pb-4">
                <button
                  className="stats__sortButton"
                  data-asc={sort === "longest,asc"}
                  onClick={() =>
                    sort === "longest,asc"
                      ? setSort(`longest,desc`)
                      : setSort(`longest,asc`)
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
                      Number(currentValue.results[0].minDaysUntilExamination),
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
                      Number(currentValue.results[0].avgDaysUntilExamination),
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
                      currentValue.results[0].maxDaysUntilExamination,
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
                  statsBy={watch().statsBy}
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
