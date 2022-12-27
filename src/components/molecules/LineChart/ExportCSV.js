import { Button } from "react-bootstrap";
import FileSaver from "file-saver";
import * as XLSX from "xlsx/xlsx.mjs";

const ExportCSV = ({ fileName, nomralData, citoData }) => {
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

  const exportToCSV = (csvData, fileName, wscols) => {
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

    console.log(wscols);

    XLSX.utils.sheet_add_json(ws, csvData, {
      skipHeader: false,
      origin: "A2",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  };

  return (
    <Button
      onClick={(e) => exportToCSV(pdfData(), fileName, [500])}
      className="btn-outline-pink"
    >
      POBIERZ RAPORT XLSX/CSV
    </Button>
  );
};

export default ExportCSV;
