import { jsPDF } from "jspdf";
import Konva from "konva";

export const exportBookToPDF = async (
  stageRefs: React.MutableRefObject<(Konva.Stage | null)[]>,
  bookWidth: number,
  bookHeight: number
) => {
  const orientation = bookWidth > bookHeight ? "landscape" : "portrait";
  const pdf = new jsPDF({
    orientation,
    unit: "px",
    format: [bookWidth, bookHeight],
  });

  const stages = stageRefs.current.filter(Boolean);

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];
    if (!stage) continue;

    const oldTransformerNodes = stage.find('Transformer').map(tr => tr.nodes());
    stage.find('Transformer').forEach(tr => tr.nodes([]));

    const dataUrl = stage.toDataURL({ 
      pixelRatio: 2,
      mimeType: "image/jpeg",
      quality: 0.9 
    });

    if (i > 0) {
      pdf.addPage([bookWidth, bookHeight], orientation);
    }
    
    pdf.addImage(dataUrl, "JPEG", 0, 0, bookWidth, bookHeight);

    stage.find('Transformer').forEach((tr, index) => {
      if (oldTransformerNodes[index]) {
         tr.nodes(oldTransformerNodes[index]);
      }
    });
  }

  pdf.save("My-Artbook.pdf");
};
