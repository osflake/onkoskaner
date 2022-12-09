import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import CustomPagination from "../../../molecules/CustomPagination/CustomPagination";
import "./OtherRaportsTable.scss";

const OtherRaportsTable = () => {
  const [currPage, setCurrPage] = useState(1);
  return (
    <>
      <Table>
        <tbody className="otherRaportsTable">
          <tr>
            <td>Rezonans magenetyczny za 3 kwartał 2022r</td>
            <td className="pdfWeight">PDF (150 KB)</td>
            <td>
              <div className="d-flex justify-content-end w-100 p-2">
                <Button className="btn-outline-pink">Pobierz raport pdf</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Rezonans magenetyczny za 3 kwartał 2022r</td>
            <td className="pdfWeight">PDF (150 KB)</td>
            <td>
              <div className="d-flex justify-content-end w-100 p-2">
                <Button className="btn-outline-pink">Pobierz raport pdf</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Rezonans magenetyczny za 3 kwartał 2022r</td>
            <td className="pdfWeight">PDF (150 KB)</td>
            <td>
              <div className="d-flex justify-content-end w-100 p-2">
                <Button className="btn-outline-pink">Pobierz raport pdf</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Rezonans magenetyczny za 3 kwartał 2022r</td>
            <td className="pdfWeight">PDF (150 KB)</td>
            <td>
              <div className="d-flex justify-content-end w-100 p-2">
                <Button className="btn-outline-pink">Pobierz raport pdf</Button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <CustomPagination
        total={20}
        itemsPerPage={8}
        currentPage={currPage}
        onPageChange={setCurrPage}
      />
    </>
  );
};

export default OtherRaportsTable;
