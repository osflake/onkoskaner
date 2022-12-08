import { Button, Table } from "react-bootstrap";
import "./RaportTable.scss";
import sortArrow from "../../../../assets/Icons/SortResults/SortArrow.svg";
import { useState } from "react";

const RaportTable = () => {
  const [sort, setSort] = useState("");

  return (
    <>
      <Table striped className="mt-5">
        <thead>
          <tr>
            <th className="pb-4">Czas oczekiwania:</th>
            <th className="pb-4">
              <button
                className="raport__sortButton"
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
                className="raport__sortButton"
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
                className="raport__sortButton"
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
            <th>36 dni</th>
            <th>31 dni</th>
            <th>36 dni</th>
            <th></th>
          </tr>
          <tr>
            <td>Dolnośląskie</td>
            <td>36 dni</td>
            <td>31 dni</td>
            <td>36 dni</td>
            <td>Pokaż placówki</td>
          </tr>
          <tr>
            <td>Lubelskie</td>
            <td>36 dni</td>
            <td>31 dni</td>
            <td>36 dni</td>
            <td>Pokaż placówki</td>
          </tr>
          <tr>
            <td>Lubelskie</td>
            <td>36 dni</td>
            <td>31 dni</td>
            <td>36 dni</td>
            <td>Pokaż placówki</td>
          </tr>
          <tr>
            <td>Lubelskie</td>
            <td>36 dni</td>
            <td>31 dni</td>
            <td>36 dni</td>
            <td>Pokaż placówki</td>
          </tr>
          <tr>
            <td>Lubelskie</td>
            <td>36 dni</td>
            <td>31 dni</td>
            <td>36 dni</td>
            <td>Pokaż placówki</td>
          </tr>
          <tr>
            <td>Lubelskie</td>
            <td>36 dni</td>
            <td>31 dni</td>
            <td>36 dni</td>
            <td>Pokaż placówki</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-end w-100 mt-4">
        <Button className="btn-outline-pink">Pobierz raport pdf</Button>
      </div>
    </>
  );
};

export default RaportTable;
