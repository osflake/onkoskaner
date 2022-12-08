import { Button, Table } from "react-bootstrap";
import "./OtherRaportsTable.scss";

const OtherRaportsTable = () => {
  return (
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
  );
};

export default OtherRaportsTable;
