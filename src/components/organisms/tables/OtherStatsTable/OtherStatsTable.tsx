import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import CustomPagination from "../../../molecules/CustomPagination/CustomPagination";
import "./OtherStatsTable.scss";
import { useQuery } from "@tanstack/react-query";
import { getPdf } from "../../../../services/api/pdfApi";

const OtherStatsTable = () => {
  const [currPage, setCurrPage] = useState(1);
  const { data: pdfData, isLoading } = useQuery(getPdf());

  console.log(pdfData);

  return (
    <>
      <Table>
        {!isLoading ? (
          <tbody className="otherStatsTable">
            {pdfData.map((item: any) => (
              <tr key={item.id}>
                <td>{item.title.rendered}</td>
                <td className="pdfWeight">PDF (150 KB)</td>
                <td>
                  <div className="d-flex justify-content-end w-100 p-2">
                    <Button className="btn-outline-pink">
                      Pobierz raport pdf
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody className="d-flex justify-content-center my-5">
            <tr className="spinner-border" role="status">
              <td>
                <span className="visually-hidden">Loading...</span>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
      <div className="d-flex justify-content-center w-100 p-0">
        <CustomPagination
          totalCount={20}
          itemsPerPage={8}
          currentPage={currPage}
          onPageChange={setCurrPage}
        />
      </div>
    </>
  );
};

export default OtherStatsTable;
