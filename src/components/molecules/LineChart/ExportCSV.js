import { useState } from "react";
import { Button } from "react-bootstrap";
import FileSaver from "file-saver";
import * as XLSX from "xlsx/xlsx.mjs";

const ExportCSV = ({ fileName, nomralData, citoData }) => {
  const [buttonIsBlocked, setButtonIsBlocked] = useState(false);

  const pdfData = () => {
    const normal = nomralData?.stats?.map((item) => ({
      Nazwa: nomralData.service.name,
      "Tryb świadczenia": nomralData.queue.name,
      Data: item.date,
      "Najkrótszy czas oczekiwania na wyniki": item.minDaysToResult,
      "Najkrótszy czas oczekiwania na świadczenie":
        item.minDaysUntilExamination,
      "Średni czas oczekiwania na wyniki": item.avgDaysToResult,
      "Średni czas oczekiwania na świadczenie": item.avgDaysUntilExamination,
      "Najdłuższy czas oczekiwania na wyniki": item.maxDaysToResult,
      "Najdłuższy czas oczekiwania na świadczenie":
        item.maxDaysUntilExamination,
    }));

    const urgent = citoData?.stats?.map((item) => ({
      Nazwa: citoData.service.name,
      "Tryb świadczenia": citoData.queue.name,
      Data: item.date,
      "Najkrótszy czas oczekiwania na wyniki": item.minDaysToResult,
      "Najkrótszy czas oczekiwania na świadczenie":
        item.minDaysUntilExamination,
      "Średni czas oczekiwania na wyniki": item.avgDaysToResult,
      "Średni czas oczekiwania na świadczenie": item.avgDaysUntilExamination,
      "Najdłuższy czas oczekiwania na wyniki": item.maxDaysToResult,
      "Najdłuższy czas oczekiwania na świadczenie":
        item.maxDaysUntilExamination,
    }));

    return [...(!!normal ? normal : []), ...(!!urgent ? urgent : [])];
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const ExportToCSV = async (csvData, fileName) => {
    var ws = XLSX.utils.aoa_to_sheet([["ONKOSKANER", "RAPORT"]]);
    var wsrows = [{ hpt: 16 }, { hpx: 24 }];
    ws["!rows"] = wsrows;
    ws["!cols"] = [
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    XLSX.utils.sheet_add_json(ws, csvData, {
      skipHeader: false,
      origin: "A2",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    await FileSaver.saveAs(data, fileName);
  };

  return (
    <Button
      onClick={(e) =>
        ExportToCSV(pdfData(), fileName, [500]).then(() =>
          setButtonIsBlocked(false)
        )
      }
      disabled={buttonIsBlocked}
      className="btn-outline-pink loadingButton"
    >
      POBIERZ RAPORT XLSX/CSV
      {buttonIsBlocked && (
        <div className="loadingButtonSpinner">
          <div className="spinner-border " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Button>
  );
};

export default ExportCSV;
