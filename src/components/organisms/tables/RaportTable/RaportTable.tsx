import { Button, Table } from "react-bootstrap";
import "./RaportTable.scss";
import sortArrow from "../../../../assets/Icons/SortResults/SortArrow.svg";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import downloadPdf from "../../../../hooks/downloadPdf";

const RaportTable = () => {
  const [sort, setSort] = useState("");

  const printRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div ref={printRef} className=" w-100">
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
              <td>
                <Link to="">Pokaż placówki</Link>
              </td>
            </tr>
            <tr>
              <td>Lubelskie</td>
              <td>36 dni</td>
              <td>31 dni</td>
              <td>36 dni</td>
              <td>
                <Link to="">Pokaż placówki</Link>
              </td>
            </tr>
            <tr>
              <td>Lubelskie</td>
              <td>36 dni</td>
              <td>31 dni</td>
              <td>36 dni</td>
              <td>
                <Link to="">Pokaż placówki</Link>
              </td>
            </tr>
            <tr>
              <td>Lubelskie</td>
              <td>36 dni</td>
              <td>31 dni</td>
              <td>36 dni</td>
              <td>
                <Link to="">Pokaż placówki</Link>
              </td>
            </tr>
            <tr>
              <td>Lubelskie</td>
              <td>36 dni</td>
              <td>31 dni</td>
              <td>36 dni</td>
              <td>
                <Link to="">Pokaż placówki</Link>
              </td>
            </tr>
            <tr>
              <td>Lubelskie</td>
              <td>36 dni</td>
              <td>31 dni</td>
              <td>36 dni</td>
              <td>
                <Link to="">Pokaż placówki</Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-end w-100 mt-4">
        <Button
          onClick={() => downloadPdf(printRef)}
          className="btn-outline-pink"
        >
          Pobierz raport pdf
        </Button>
      </div>
    </>
  );
};

export default RaportTable;
