import { Table } from "react-bootstrap";
import styles from "./MobileReportTable.module.scss";
import { ReactComponent as SortArrow } from "../../../../assets/Icons/SortResults/SortArrow.svg";
import { ReactComponent as EnterIcon } from "../../../../assets/Icons/enterIcon.svg";

import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SelectInput from "../../../atoms/SelectInput/SelectInput";

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

const MobileReportTable = ({
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sortBy"));

  const handleSort = (sortBy: string) => {
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
    setSort(sortBy);
  };

  const statsByData = [
    {
      id: "minDaysUntilExamination",
      name: "Najszybciej",
    },
    {
      id: "avgDaysUntilExamination",
      name: "Średnio",
    },
    {
      id: "maxDaysUntilExamination",
      name: "Najdłużej",
    },
  ];

  const linkTo = new URLSearchParams({
    serviceId: searchParams.get("serviceId") || "217",
    queueId: searchParams.get("normal") ? "1" : "2",
  });

  return (
    <div className="w-100 mb-5">
      <div className="d-flex row">
        {adminRole ? (
          <div className="pt-4 col-12 col-sm-7">
            <p className="results-title fw-normal-500">
              Szczegółowy raport dla Administratora dostępny w widoku min.
              tablet/desktop
            </p>
          </div>
        ) : null}{" "}
      </div>
      {!!data ? (
        <Table className="reportTable">
          <thead>
            <tr>
              <th className="pb-4 p-0">
                <SelectInput
                  label="Czas oczekiwania:"
                  dropdownData={statsByData}
                  defaultValue={"1"}
                  register={register("waitingTime")}
                />
              </th>
              <th className="d-flex justify-content-end ">
                <button
                  className={styles.stats__sortButton}
                  data-desc={sort === `${watch("waitingTime")},DESC`}
                  onClick={() =>
                    sort === `${watch("waitingTime")},ASC`
                      ? handleSort(`${watch("waitingTime")},DESC`)
                      : handleSort(`${watch("waitingTime")},ASC`)
                  }
                >
                  <SortArrow
                    data-active={sort?.includes(watch("waitingTime"))}
                    className={styles.sortArrow}
                  />
                </button>
              </th>
            </tr>
          </thead>

          <tbody className="tableBody">
            <tr>
              <th className="ps-3">Cała polska</th>
              <th className="text-end pe-3">
                {Math.round(
                  data?.reduce(
                    (accumulator: number, currentValue: any) =>
                      accumulator +
                      Number(currentValue.results[watch("waitingTime")]),
                    0
                  ) / 16
                )}{" "}
                dni
              </th>
              <th></th>
            </tr>
            {data.map((item: any) => (
              <tr key={item.province.id}>
                <td className="ps-3">{item.province.name}</td>
                <td className="text-end pe-3">
                  {item.results[watch("waitingTime")]} dni
                </td>

                <td>
                  <Link
                    to={`/results?
                    }${linkTo.toString()}&provinceId=${item.province.id}`}
                  >
                    <EnterIcon />
                  </Link>
                </td>
              </tr>
            ))}
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

export default MobileReportTable;
