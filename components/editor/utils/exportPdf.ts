// import { jsPDF } from "jspdf";
// import Konva from "konva";
// import { Page, PageElement } from "@/store/useBookStore";

// export const exportBookToPDF = async (
//   pages: Page[],
//   width: number,
//   height: number
// ) => {
//   const pdf = new jsPDF({
//     orientation: 'portrait',
//     unit: 'mm',
//     format: 'a4',
//   });

//   const PRINT_SCALE_FACTOR = 3.125; // 300 DPI / 96 DPI

//   const container = document.createElement('div');
//   container.style.position = 'absolute';
//   container.style.left = '-9999px';
//   document.body.appendChild(container);

//   for (let i = 0; i < pages.length; i++) {
//     const pageData = pages[i];

//     const stage = new Konva.Stage({
//       container,
//       width,
//       height,
//     });

//     const layer = new Konva.Layer();
//     stage.add(layer);

//     // Render elements
//     await Promise.all(
//       pageData.elements.map(async (el: PageElement) => {
//         if (el.type === 'line') {
//           const line = new Konva.Line({
//             points: el.points || [],
//             stroke: el.stroke,
//             strokeWidth: el.strokeWidth,
//             tension: 0.5,
//             lineCap: 'round',
//             lineJoin: 'round',
//           });
//           layer.add(line);
//         } else if (el.type === 'image' && el.src) {
//           await new Promise<void>((resolve) => {
//             const img = new window.Image();
//             img.crossOrigin = 'anonymous';
//             img.onload = () => {
//               const konvaImg = new Konva.Image({
//                 image: img,
//                 x: el.x,
//                 y: el.y,
//                 width: el.width,
//                 height: el.height,
//                 rotation: el.rotation || 0,
//               });
//               layer.add(konvaImg);
//               resolve();
//             };
//             img.onerror = () => resolve();
//             img.src = el.src!;
//           });
//         } else if (el.type === 'text') {
//           const text = new Konva.Text({
//             text: el.text || '',
//             x: el.x,
//             y: el.y,
//             fontSize: el.fontSize || 32,
//             fontFamily: el.fontFamily || 'Arial',
//             fontStyle: el.fontStyle,
//             textDecoration: el.textDecoration,
//             align: el.textAlign,
//             fill: el.fill || '#000000',
//             width: el.width,
//             rotation: el.rotation || 0,
//           });
//           layer.add(text);
//         } else if (el.type === 'shape') {
//           if (el.shapeType === 'rect') {
//             const rect = new Konva.Rect({
//               x: el.x,
//               y: el.y,
//               width: el.width,
//               height: el.height,
//               fill: el.fill,
//               stroke: el.stroke,
//               rotation: el.rotation || 0,
//             });
//             layer.add(rect);
//           } else if (el.shapeType === 'circle') {
//             const circle = new Konva.Circle({
//               x: el.x,
//               y: el.y,
//               radius: el.radius || 50,
//               fill: el.fill,
//               stroke: el.stroke,
//               rotation: el.rotation || 0,
//             });
//             layer.add(circle);
//           }
//         }
//       })
//     );

//     layer.batchDraw();

//     const dataUrl = stage.toDataURL({
//       pixelRatio: PRINT_SCALE_FACTOR,
//       mimeType: 'image/jpeg',
//       quality: 0.95,
//     });

//     if (i > 0) {
//       pdf.addPage();
//     }

//     pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297);

//     stage.destroy();
//   }

//   document.body.removeChild(container);
//   pdf.save('My_Book_HD.pdf');
// };


import { BookPage } from "@/store/useBookStore";
import jsPDF from "jspdf";

export async function exportBookToPDF(
  pages: BookPage[],
  width: number,
  height: number
): Promise<void> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [width, height],
    hotfixes: ["px_scaling"],
  });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (i > 0) pdf.addPage([width, height], "portrait");

    // ── 1. Draw background onto an offscreen canvas ──
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext("2d")!;

    // Fill background color (fixes black background bug)
    const bg = page.background ?? "#ffffff";
    if (bg.startsWith("linear-gradient") || bg.startsWith("radial-gradient")) {
      // Parse simple linear gradients for PDF export
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      try {
        const grad = parseGradientForCanvas(ctx, bg, width, height);
        if (grad) {
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);
        }
      } catch {}
    } else {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
    }

    // ── 2. Draw each element in zIndex order ──
    const sorted = [...page.elements].sort((a, b) => a.zIndex - b.zIndex);

    for (const el of sorted) {
      ctx.save();
      ctx.globalAlpha = el.opacity ?? 1;

      if (el.type === "image" && el.src) {
        try {
          const img = await loadImage(el.src);
          const cx = el.x + (el.width ?? img.naturalWidth) / 2;
          const cy = el.y + (el.height ?? img.naturalHeight) / 2;
          ctx.translate(cx, cy);
          ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);
          ctx.drawImage(
            img,
            -(el.width ?? img.naturalWidth) / 2,
            -(el.height ?? img.naturalHeight) / 2,
            el.width ?? img.naturalWidth,
            el.height ?? img.naturalHeight
          );
        } catch (e) {
          console.warn("Failed to load image for PDF", e);
        }
      }

      if (el.type === "line" && el.points && el.points.length >= 4) {
        ctx.beginPath();
        ctx.strokeStyle = el.stroke ?? "#000000";
        ctx.lineWidth = el.strokeWidth ?? 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(el.points[0], el.points[1]);
        for (let p = 2; p < el.points.length; p += 2) {
          ctx.lineTo(el.points[p], el.points[p + 1]);
        }
        ctx.stroke();
      }

      if (el.type === "shape") {
        ctx.strokeStyle = el.stroke ?? "transparent";
        ctx.lineWidth = el.strokeWidth ?? 1;
        ctx.fillStyle = el.fill && el.fill !== "transparent" ? el.fill : "transparent";

        const cx = el.x + (el.width ?? 0) / 2;
        const cy = el.y + (el.height ?? 0) / 2;
        ctx.translate(cx, cy);
        ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);

        if (el.shapeType === "rect") {
          ctx.beginPath();
          ctx.rect(-(el.width ?? 0) / 2, -(el.height ?? 0) / 2, el.width ?? 0, el.height ?? 0);
          if (el.fill && el.fill !== "transparent") ctx.fill();
          if (el.strokeWidth) ctx.stroke();
        } else if (el.shapeType === "circle") {
          ctx.beginPath();
          ctx.ellipse(0, 0, (el.width ?? 0) / 2, (el.height ?? 0) / 2, 0, 0, Math.PI * 2);
          if (el.fill && el.fill !== "transparent") ctx.fill();
          if (el.strokeWidth) ctx.stroke();
        }
      }

      if (el.type === "text" && el.text) {
        let txt = el.text;
        // textTransform
        if (el.textTransform === "uppercase") txt = txt.toUpperCase();
        if (el.textTransform === "lowercase") txt = txt.toLowerCase();

        const fontSize = el.fontSize ?? 24;
        const fontFamily = el.fontFamily ?? "Arial";
        const fontStyle = el.fontStyle ?? "normal";
        ctx.font = `${fontStyle} ${fontSize}px "${fontFamily}"`;
        ctx.fillStyle = el.fill ?? "#000000";
        ctx.textAlign = (el.textAlign as CanvasTextAlign) ?? "left";

        // text shadow
        if (el.shadowColor) {
          ctx.shadowColor = el.shadowColor;
          ctx.shadowOffsetX = el.shadowOffsetX ?? 2;
          ctx.shadowOffsetY = el.shadowOffsetY ?? 2;
          ctx.shadowBlur = el.shadowBlur ?? 4;
        }

        const cx = el.x + (el.width ?? 200) / 2;
        const cy = el.y;
        ctx.translate(cx, cy);
        ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);

        const lineH = fontSize * (el.lineHeight ?? 1.4);
        const lines = txt.split("\n");
        lines.forEach((line, li) => {
          // bullet / numbered list
          let drawLine = line;
          if (el.listType === "bullet") drawLine = `• ${line}`;
          else if (el.listType === "numbered") drawLine = `${li + 1}. ${line}`;

          ctx.fillText(drawLine, 0, li * lineH + fontSize);

          // underline / strikethrough
          if (el.textDecoration === "underline" || el.textDecoration === "line-through") {
            const mw = ctx.measureText(drawLine).width;
            const x0 = ctx.textAlign === "center" ? -mw / 2 : 0;
            const y0 =
              el.textDecoration === "underline"
                ? li * lineH + fontSize + 2
                : li * lineH + fontSize - fontSize * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = el.fill ?? "#000000";
            ctx.lineWidth = 1.5;
            ctx.moveTo(x0, y0);
            ctx.lineTo(x0 + mw, y0);
            ctx.stroke();
          }
        });
      }

      ctx.restore();
    }

    // ── 3. Add canvas to PDF ──
    const imgData = offscreen.toDataURL("image/jpeg", 1.0);
    pdf.addImage(imgData, "JPEG", 0, 0, width, height);
  }

  pdf.save("HerzGeschenk-book.pdf");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function parseGradientForCanvas(
  ctx: CanvasRenderingContext2D,
  gradientStr: string,
  w: number,
  h: number
): CanvasGradient | null {
  // Simple linear-gradient parser: linear-gradient(deg, color1, color2, ...)
  const linearMatch = gradientStr.match(/linear-gradient\(([^)]+)\)/);
  if (linearMatch) {
    const parts = linearMatch[1].split(",").map((s) => s.trim());
    let angle = 180;
    let colorParts = parts;
    if (/deg/.test(parts[0])) {
      angle = parseFloat(parts[0]);
      colorParts = parts.slice(1);
    }
    const rad = ((angle - 90) * Math.PI) / 180;
    const x1 = w / 2 - (Math.cos(rad) * w) / 2;
    const y1 = h / 2 - (Math.sin(rad) * h) / 2;
    const x2 = w / 2 + (Math.cos(rad) * w) / 2;
    const y2 = h / 2 + (Math.sin(rad) * h) / 2;
    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
    colorParts.forEach((c, i) => {
      grad.addColorStop(i / (colorParts.length - 1), c.split(" ")[0]);
    });
    return grad;
  }
  return null;
}