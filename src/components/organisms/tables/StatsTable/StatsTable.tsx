import { Table } from "react-bootstrap";
import "./StatsTable.scss";
import sortArrow from "../../../../assets/Icons/SortResults/SortArrow.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
interface FormValues {
  province: {
    name: string;
    id: number;
  };
  results: {
    min: number;
    avg: number;
    max: number;
  };
}

const RaportTable = (data: any) => {
  const [sort, setSort] = useState("");

  return (
    <div className="w-100 my-5">
      {!!data.data ? (
        <Table striped className="mt-5">
          <thead>
            <tr>
              <th className="pb-4">Czas oczekiwania:</th>
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
                  data.data?.reduce(
                    (accumulator: number, currentValue: FormValues) =>
                      accumulator + currentValue.results.min,
                    0
                  ) / 16
                )}
                dni
              </th>
              <th>
                {Math.round(
                  data.data?.reduce(
                    (accumulator: number, currentValue: FormValues) =>
                      accumulator + Number(currentValue.results.avg),
                    0
                  ) / 16
                )}
                dni
              </th>
              <th>
                {Math.round(
                  data.data?.reduce(
                    (accumulator: number, currentValue: FormValues) =>
                      accumulator + currentValue.results.max,
                    0
                  ) / 16
                )}
                dni
              </th>
              <th></th>
            </tr>

            {data.data.map((item: FormValues) => {
              return (
                <tr key={item.province.id}>
                  <td>{item.province.name}</td>
                  <td>{item.results.min} dni</td>
                  <td>{Math.round(item.results.avg)} dni</td>
                  <td>{item.results.max} dni</td>
                  <td>
                    <Link to="">Pokaż placówki</Link>
                  </td>
                </tr>
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
