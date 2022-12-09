import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const useDownloadPdf = async (ref: { current: any }) => {
  const data = ref.current;
  html2canvas(data).then((canvas: any) => {
    const imgWidth = 208;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    heightLeft -= pageHeight;
    const doc = new jsPDF("p", "mm");
    doc.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      console.log(position);
      doc.addPage();
      doc.addImage(
        canvas,
        "PNG",
        0,
        position - 2,
        imgWidth,
        imgHeight,
        "",
        "FAST"
      );
      heightLeft -= pageHeight;
    }
    doc.save("Downld.pdf");
  });
};

export default useDownloadPdf;
