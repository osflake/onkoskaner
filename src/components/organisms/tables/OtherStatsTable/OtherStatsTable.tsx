import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import CustomPagination from "../../../molecules/CustomPagination/CustomPagination";
import "./OtherStatsTable.scss";
import { useQuery } from "@tanstack/react-query";
import { getPdf } from "../../../../services/api/pdfApi";
import { useSearchParams } from "react-router-dom";

const OtherStatsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const { data: pdfData, isLoading } = useQuery(
    getPdf({
      offset: currPage ? ((currPage - 1) * 1).toString() : "0",
      limit: "10",
    })
  );

  const handlePageChange = (e: any) => {
    searchParams.set("page", e.toString());
    setSearchParams(searchParams);
    setCurrPage(e);
  };

  return (
    <>
      <Table>
        {!isLoading ? (
          <tbody className="otherStatsTable">
            {pdfData.map((item: any) =>
              item.status === "publish" ? (
                <tr key={item.pdf.id} className="tableContent">
                  <td>
                    <a
                      className="nav-link"
                      href={item.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <p
                        className="m-0 fs-5"
                        dangerouslySetInnerHTML={{
                          __html: item.title.rendered,
                        }}
                      />
                    </a>{" "}
                    <p
                      className="m-0 fs-6 innerText"
                      dangerouslySetInnerHTML={{
                        __html: item.excerpt.rendered,
                      }}
                    />
                  </td>
                  <td className="pdfWeight">
                    PDF ({item.pdf.filesize / 1000}KB)
                  </td>
                  <td>
                    <div className="d-flex justify-content-end w-100 p-2">
                      <a
                        href={item.pdf.url}
                        download
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Button className="btn-outline-pink ">
                          POBIERZ RAPORT
                        </Button>
                      </a>
                    </div>
                  </td>
                </tr>
              ) : null
            )}
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
          totalCount={(!!pdfData && pdfData[0]?.totalRaports) || 0}
          pageSize={10}
          currentPage={currPage}
          onPageChange={(e: any) => handlePageChange(e)}
        />
      </div>
    </>
  );
};

export default OtherStatsTable;
