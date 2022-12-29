import { Container, Table } from "react-bootstrap";
import "./StatsTable.scss";
import { ReactComponent as SortArrow } from "../../../../assets/Icons/SortResults/SortArrow.svg";
import { useState } from "react";
import TableRowWithCollapse from "./TableRowWithCollapse";
import RadioInput from "../../../atoms/RadioInput/RadioInput";
import { useSearchParams } from "react-router-dom";

const RaportTable = ({
  data,
  adminRole,
  register,
  watch,
  pdf,
}: {
  data: any;
  adminRole: boolean;
  register: any;
  watch: any;
  pdf?: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState(searchParams.get("sortBy"));

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

  return (
    <div className="w-100 my-5">
      <div className="d-flex row">
        {!pdf && adminRole ? (
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
      </div>
      {!!data ? (
        <Table className="mt-5 reportTable">
          <thead>
            <tr>
              <th className="pb-3">Czas oczekiwania:</th>
              <th className="pb-4">
                <button
                  className="stats__sortButton"
                  data-desc={sort === "minDaysUntilExamination,DESC"}
                  onClick={() =>
                    sort === "minDaysUntilExamination,ASC"
                      ? handleSort(`minDaysUntilExamination,DESC`)
                      : handleSort(`minDaysUntilExamination,ASC`)
                  }
                >
                  <span>Najszybciej</span>{" "}
                  <SortArrow
                    data-active={sort?.includes("minDaysUntilExamination")}
                    className="sortArrow"
                  />
                </button>
              </th>
              <th className="pb-4">
                <button
                  className="stats__sortButton"
                  data-desc={sort === "avgDaysUntilExamination,DESC"}
                  onClick={() =>
                    sort === "avgDaysUntilExamination,ASC"
                      ? handleSort(`avgDaysUntilExamination,DESC`)
                      : handleSort(`avgDaysUntilExamination,ASC`)
                  }
                >
                  <span>Średnio</span>
                  <SortArrow
                    data-active={sort?.includes("avgDaysUntilExamination")}
                    className="sortArrow"
                  />
                </button>
              </th>
              <th className="pb-4">
                <button
                  className="stats__sortButton"
                  data-desc={sort === "maxDaysUntilExamination,DESC"}
                  onClick={() =>
                    sort === "maxDaysUntilExamination,ASC"
                      ? handleSort(`maxDaysUntilExamination,DESC`)
                      : handleSort(`maxDaysUntilExamination,ASC`)
                  }
                >
                  <span>Najdłużej</span>
                  <SortArrow
                    data-active={sort?.includes("maxDaysUntilExamination")}
                    className="sortArrow"
                  />
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
                  adminRole={adminRole}
                  pdf={pdf}
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
