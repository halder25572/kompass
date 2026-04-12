import { jsPDF } from "jspdf";
import Konva from "konva";
import { Page, PageElement } from "@/store/useBookStore";

export const exportBookToPDF = async (
  pages: Page[],
  width: number,
  height: number
) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const PRINT_SCALE_FACTOR = 3.125; // 300 DPI / 96 DPI

  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  for (let i = 0; i < pages.length; i++) {
    const pageData = pages[i];

    const stage = new Konva.Stage({
      container,
      width,
      height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    // Render elements
    await Promise.all(
      pageData.elements.map(async (el: PageElement) => {
        if (el.type === 'line') {
          const line = new Konva.Line({
            points: el.points || [],
            stroke: el.stroke,
            strokeWidth: el.strokeWidth,
            tension: 0.5,
            lineCap: 'round',
            lineJoin: 'round',
          });
          layer.add(line);
        } else if (el.type === 'image' && el.src) {
          await new Promise<void>((resolve) => {
            const img = new window.Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              const konvaImg = new Konva.Image({
                image: img,
                x: el.x,
                y: el.y,
                width: el.width,
                height: el.height,
                rotation: el.rotation || 0,
              });
              layer.add(konvaImg);
              resolve();
            };
            img.onerror = () => resolve();
            img.src = el.src!;
          });
        } else if (el.type === 'text') {
          const text = new Konva.Text({
            text: el.text || '',
            x: el.x,
            y: el.y,
            fontSize: el.fontSize || 32,
            fontFamily: el.fontFamily || 'Arial',
            fontStyle: el.fontStyle,
            textDecoration: el.textDecoration,
            align: el.textAlign,
            fill: el.fill || '#000000',
            width: el.width,
            rotation: el.rotation || 0,
          });
          layer.add(text);
        } else if (el.type === 'shape') {
          if (el.shapeType === 'rect') {
            const rect = new Konva.Rect({
              x: el.x,
              y: el.y,
              width: el.width,
              height: el.height,
              fill: el.fill,
              stroke: el.stroke,
              rotation: el.rotation || 0,
            });
            layer.add(rect);
          } else if (el.shapeType === 'circle') {
            const circle = new Konva.Circle({
              x: el.x,
              y: el.y,
              radius: el.radius || 50,
              fill: el.fill,
              stroke: el.stroke,
              rotation: el.rotation || 0,
            });
            layer.add(circle);
          }
        }
      })
    );

    layer.batchDraw();

    const dataUrl = stage.toDataURL({
      pixelRatio: PRINT_SCALE_FACTOR,
      mimeType: 'image/jpeg',
      quality: 0.95,
    });

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297);

    stage.destroy();
  }

  document.body.removeChild(container);
  pdf.save('My_Book_HD.pdf');
};
