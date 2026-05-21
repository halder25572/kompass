// import { BookPage } from "@/store/useBookStore";
// import jsPDF from "jspdf";

// export async function exportBookToPDF(
//   pages: BookPage[],
//   width: number,
//   height: number
// ): Promise<void> {
//   // ── Orientation: landscape if width > height, square treated as portrait ──
//   const orientation = width > height ? "landscape" : "portrait";

//   const pdf = new jsPDF({
//     orientation,
//     unit: "px",
//     format: [width, height],
//     hotfixes: ["px_scaling"],
//   });

//   for (let i = 0; i < pages.length; i++) {
//     const page = pages[i];
//     if (i > 0) pdf.addPage([width, height], orientation);

//     // ── 1. Draw background onto an offscreen canvas ──
//     const offscreen = document.createElement("canvas");
//     offscreen.width = width;
//     offscreen.height = height;
//     const ctx = offscreen.getContext("2d")!;

//     // Fill background color (fixes black background bug)
//     const bg = page.background ?? "#ffffff";
//     if (bg.startsWith("linear-gradient") || bg.startsWith("radial-gradient")) {
//       ctx.fillStyle = "#ffffff";
//       ctx.fillRect(0, 0, width, height);
//       try {
//         const grad = parseGradientForCanvas(ctx, bg, width, height);
//         if (grad) {
//           ctx.fillStyle = grad;
//           ctx.fillRect(0, 0, width, height);
//         }
//       } catch {}
//     } else {
//       ctx.fillStyle = bg;
//       ctx.fillRect(0, 0, width, height);
//     }

//     // ── 2. Draw each element in zIndex order ──
//     const sorted = [...page.elements].sort((a, b) => a.zIndex - b.zIndex);

//     for (const el of sorted) {
//       ctx.save();
//       ctx.globalAlpha = el.opacity ?? 1;

//       if (el.type === "image" && el.src) {
//         try {
//           const img = await loadImage(el.src);
//           const cx = el.x + (el.width ?? img.naturalWidth) / 2;
//           const cy = el.y + (el.height ?? img.naturalHeight) / 2;
//           ctx.translate(cx, cy);
//           ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);
//           ctx.drawImage(
//             img,
//             -(el.width ?? img.naturalWidth) / 2,
//             -(el.height ?? img.naturalHeight) / 2,
//             el.width ?? img.naturalWidth,
//             el.height ?? img.naturalHeight
//           );
//         } catch (e) {
//           console.warn("Failed to load image for PDF", e);
//         }
//       }

//       if (el.type === "line" && el.points && el.points.length >= 4) {
//         ctx.beginPath();
//         ctx.strokeStyle = el.stroke ?? "#000000";
//         ctx.lineWidth = el.strokeWidth ?? 2;
//         ctx.lineCap = "round";
//         ctx.lineJoin = "round";
//         ctx.moveTo(el.points[0], el.points[1]);
//         for (let p = 2; p < el.points.length; p += 2) {
//           ctx.lineTo(el.points[p], el.points[p + 1]);
//         }
//         ctx.stroke();
//       }

//       if (el.type === "shape") {
//         ctx.strokeStyle = el.stroke ?? "transparent";
//         ctx.lineWidth = el.strokeWidth ?? 1;
//         ctx.fillStyle = el.fill && el.fill !== "transparent" ? el.fill : "transparent";

//         const cx = el.x + (el.width ?? 0) / 2;
//         const cy = el.y + (el.height ?? 0) / 2;
//         ctx.translate(cx, cy);
//         ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);

//         if (el.shapeType === "rect") {
//           ctx.beginPath();
//           ctx.rect(-(el.width ?? 0) / 2, -(el.height ?? 0) / 2, el.width ?? 0, el.height ?? 0);
//           if (el.fill && el.fill !== "transparent") ctx.fill();
//           if (el.strokeWidth) ctx.stroke();
//         } else if (el.shapeType === "circle") {
//           ctx.beginPath();
//           ctx.ellipse(0, 0, (el.width ?? 0) / 2, (el.height ?? 0) / 2, 0, 0, Math.PI * 2);
//           if (el.fill && el.fill !== "transparent") ctx.fill();
//           if (el.strokeWidth) ctx.stroke();
//         }
//       }

//       if (el.type === "text" && el.text) {
//         let txt = el.text;
//         if (el.textTransform === "uppercase") txt = txt.toUpperCase();
//         if (el.textTransform === "lowercase") txt = txt.toLowerCase();

//         const fontSize = el.fontSize ?? 24;
//         const fontFamily = el.fontFamily ?? "Arial";
//         const fontStyle = el.fontStyle ?? "normal";
//         ctx.font = `${fontStyle} ${fontSize}px "${fontFamily}"`;
//         ctx.fillStyle = el.fill ?? "#000000";
//         ctx.textAlign = (el.textAlign as CanvasTextAlign) ?? "left";

//         if (el.shadowColor) {
//           ctx.shadowColor = el.shadowColor;
//           ctx.shadowOffsetX = el.shadowOffsetX ?? 2;
//           ctx.shadowOffsetY = el.shadowOffsetY ?? 2;
//           ctx.shadowBlur = el.shadowBlur ?? 4;
//         }

//         const cx = el.x + (el.width ?? 200) / 2;
//         const cy = el.y;
//         ctx.translate(cx, cy);
//         ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);

//         const lineH = fontSize * (el.lineHeight ?? 1.4);
//         const lines = txt.split("\n");
//         lines.forEach((line, li) => {
//           let drawLine = line;
//           if (el.listType === "bullet") drawLine = `• ${line}`;
//           else if (el.listType === "numbered") drawLine = `${li + 1}. ${line}`;

//           ctx.fillText(drawLine, 0, li * lineH + fontSize);

//           if (el.textDecoration === "underline" || el.textDecoration === "line-through") {
//             const mw = ctx.measureText(drawLine).width;
//             const x0 = ctx.textAlign === "center" ? -mw / 2 : 0;
//             const y0 =
//               el.textDecoration === "underline"
//                 ? li * lineH + fontSize + 2
//                 : li * lineH + fontSize - fontSize * 0.3;
//             ctx.beginPath();
//             ctx.strokeStyle = el.fill ?? "#000000";
//             ctx.lineWidth = 1.5;
//             ctx.moveTo(x0, y0);
//             ctx.lineTo(x0 + mw, y0);
//             ctx.stroke();
//           }
//         });
//       }

//       ctx.restore();
//     }

//     // ── 3. Add canvas to PDF ──
//     const imgData = offscreen.toDataURL("image/jpeg", 1.0);
//     pdf.addImage(imgData, "JPEG", 0, 0, width, height);
//   }

//   pdf.save("HerzGeschenk-book.pdf");
// }

// function loadImage(src: string): Promise<HTMLImageElement> {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     img.src = src;
//   });
// }

// function parseGradientForCanvas(
//   ctx: CanvasRenderingContext2D,
//   gradientStr: string,
//   w: number,
//   h: number
// ): CanvasGradient | null {
//   const linearMatch = gradientStr.match(/linear-gradient\(([^)]+)\)/);
//   if (linearMatch) {
//     const parts = linearMatch[1].split(",").map((s) => s.trim());
//     let angle = 180;
//     let colorParts = parts;
//     if (/deg/.test(parts[0])) {
//       angle = parseFloat(parts[0]);
//       colorParts = parts.slice(1);
//     }
//     const rad = ((angle - 90) * Math.PI) / 180;
//     const x1 = w / 2 - (Math.cos(rad) * w) / 2;
//     const y1 = h / 2 - (Math.sin(rad) * h) / 2;
//     const x2 = w / 2 + (Math.cos(rad) * w) / 2;
//     const y2 = h / 2 + (Math.sin(rad) * h) / 2;
//     const grad = ctx.createLinearGradient(x1, y1, x2, y2);
//     colorParts.forEach((c, i) => {
//       grad.addColorStop(i / (colorParts.length - 1), c.split(" ")[0]);
//     });
//     return grad;
//   }
//   return null;
// }


import { BookPage } from "@/store/useBookStore";
import type { OccasionTheme } from "@/store/useBookStore";
import jsPDF from "jspdf";

export async function exportBookToPDF(
  pages: BookPage[],
  width: number,
  height: number
): Promise<void> {
  const orientation = width > height ? "landscape" : "portrait";

  const pdf = new jsPDF({
    orientation,
    unit: "px",
    format: [width, height],
    hotfixes: ["px_scaling"],
  });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (i > 0) pdf.addPage([width, height], orientation);

    // ── 1. Offscreen canvas তৈরি ──
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext("2d")!;

    // ── 2. Background আঁকা ──
    const bg = page.background ?? "#ffffff";
    // সর্বদা আগে সাদা fill করো (transparent bug fix)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    if (bg.startsWith("linear-gradient") || bg.startsWith("radial-gradient")) {
      try {
        const grad = parseGradientForCanvas(ctx, bg, width, height);
        if (grad) {
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);
        }
      } catch (e) {
        console.warn("Gradient parse failed, using white background", e);
      }
    } else {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
    }

    // ── 3. Elements আঁকা (zIndex order অনুযায়ী) ──
    const sorted = [...page.elements].sort((a, b) => a.zIndex - b.zIndex);

    for (const el of sorted) {
      ctx.save();
      ctx.globalAlpha = el.opacity ?? 1;

      // ── Image ──
      if (el.type === "image" && el.src) {
        try {
          const img = await loadImage(el.src);
          const drawW = el.width ?? img.naturalWidth;
          const drawH = el.height ?? img.naturalHeight;
          // Rotation center = element center
          const cx = el.x + drawW / 2;
          const cy = el.y + drawH / 2;
          ctx.translate(cx, cy);
          ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);
          ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        } catch (e) {
          console.warn("Image load failed for PDF export:", e);
        }
      }

      // ── Freehand Line / Drawing ──
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

      // ── Shape ──
      if (el.type === "shape") {
        const drawW = el.width ?? 100;
        const drawH = el.height ?? 100;
        const cx = el.x + drawW / 2;
        const cy = el.y + drawH / 2;
        ctx.translate(cx, cy);
        ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);

        ctx.strokeStyle = el.stroke ?? "transparent";
        ctx.lineWidth = el.strokeWidth ?? 1;
        // shape এর fill ও stroke আলাদা — shapeFill বা fill যেটা আছে নাও
        const fillColor = el.shapeFill ?? el.fill ?? "transparent";
        ctx.fillStyle = fillColor;

        if (el.shapeType === "rect") {
          ctx.beginPath();
          ctx.rect(-drawW / 2, -drawH / 2, drawW, drawH);
          if (fillColor !== "transparent") ctx.fill();
          if ((el.strokeWidth ?? 0) > 0) ctx.stroke();
        } else if (el.shapeType === "circle") {
          ctx.beginPath();
          ctx.ellipse(0, 0, drawW / 2, drawH / 2, 0, 0, Math.PI * 2);
          if (fillColor !== "transparent") ctx.fill();
          if ((el.strokeWidth ?? 0) > 0) ctx.stroke();
        }
      }

      // ── Text (Emoji সহ) ──
      if (el.type === "text" && el.text) {
        let txt = el.text;
        if (el.textTransform === "uppercase") txt = txt.toUpperCase();
        if (el.textTransform === "lowercase") txt = txt.toLowerCase();

        const fontSize = el.fontSize ?? 24;
        const fontFamily = el.fontFamily ?? "Arial";
        const fontStyle = el.fontStyle ?? "normal";
        const align = (el.textAlign as CanvasTextAlign) ?? "left";
        const lineH = fontSize * (el.lineHeight ?? 1.4);
        const elWidth = el.width ?? 200;

        ctx.font = `${fontStyle} ${fontSize}px "${fontFamily}"`;
        ctx.fillStyle = el.fill ?? "#000000";
        ctx.textAlign = align;
        ctx.textBaseline = "top";

        // Shadow
        if (el.shadowColor) {
          ctx.shadowColor = el.shadowColor;
          ctx.shadowOffsetX = el.shadowOffsetX ?? 2;
          ctx.shadowOffsetY = el.shadowOffsetY ?? 2;
          ctx.shadowBlur = el.shadowBlur ?? 4;
        }

        // Rotation: center of element
        const cx = el.x + elWidth / 2;
        const cy = el.y;
        ctx.translate(cx, cy);
        ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);

        // textAlign অনুযায়ী x offset
        let textX = 0;
        if (align === "left") textX = -elWidth / 2;
        else if (align === "right") textX = elWidth / 2;
        // "center" → 0 (translate এ center এ আছি)

        const lines = txt.split("\n");
        lines.forEach((line, li) => {
          let drawLine = line;
          if (el.listType === "bullet") drawLine = `• ${line}`;
          else if (el.listType === "numbered") drawLine = `${li + 1}. ${line}`;

          const yPos = li * lineH;
          ctx.fillText(drawLine, textX, yPos);

          // Underline / Strikethrough
          if (el.textDecoration === "underline" || el.textDecoration === "line-through") {
            const mw = ctx.measureText(drawLine).width;
            let x0: number;
            if (align === "center") x0 = -mw / 2;
            else if (align === "right") x0 = textX - mw;
            else x0 = textX;

            const lineY =
              el.textDecoration === "underline"
                ? yPos + fontSize + 2
                : yPos + fontSize * 0.6;

            ctx.beginPath();
            ctx.strokeStyle = el.fill ?? "#000000";
            ctx.lineWidth = Math.max(1, fontSize * 0.05);
            ctx.shadowColor = "transparent"; // decoration এ shadow না
            ctx.moveTo(x0, lineY);
            ctx.lineTo(x0 + mw, lineY);
            ctx.stroke();
          }
        });
      }

      ctx.restore();
    }

    // ── 4. Canvas → PDF ──
    // PNG ব্যবহার করো (transparent areas নষ্ট হবে না, gradient সঠিক থাকবে)
    const imgData = offscreen.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
  }

  pdf.save("HerzGeschenk-book.pdf");
}

function drawCoverOverlay(ctx: CanvasRenderingContext2D, width: number, height: number, theme: OccasionTheme) {
  const coverScale = width / 794;

  // Top arc decoration
  ctx.fillStyle = "rgba(255,255,255,0.10)";
  ctx.beginPath();
  ctx.ellipse(width / 2, 0, width * 0.72, Math.round(height * 0.30), 0, 0, Math.PI * 2);
  ctx.fill();

  // Bottom arc decoration
  ctx.fillStyle = "rgba(0,0,0,0.07)";
  ctx.beginPath();
  ctx.ellipse(width / 2, Math.round(height * 0.30), width * 0.65, Math.round(height * 0.22), 0, 0, Math.PI * 2);
  ctx.fill();

  // Corner dots
  const cornerPositions = [
    { x: width * 0.06, y: height * 0.07 },
    { x: width * 0.94, y: height * 0.07 },
    { x: width * 0.06, y: height * 0.93 },
    { x: width * 0.94, y: height * 0.93 },
  ];

  ctx.fillStyle = "rgba(255,255,255,0.35)";
  cornerPositions.forEach((pos) => {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Math.round(4 * coverScale), 0, Math.PI * 2);
    ctx.fill();
  });

  // Center content
  const centerX = width / 2;
  const centerY = height / 2;
  const gap = Math.round(16 * coverScale);

  // Emoji
  ctx.font = `${Math.round(80 * coverScale)}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.22)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;
  ctx.fillText(theme.emoji, centerX, centerY - gap * 2 - Math.round(60 * coverScale));

  // Title
  ctx.font = `bold ${Math.round(48 * coverScale)}px Georgia, serif`;
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0,0,0,0.28)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  ctx.fillText(theme.label, centerX, centerY - gap / 2);

  // Divider
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(255,255,255,0.50)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - Math.round(28 * coverScale), centerY + gap / 2);
  ctx.lineTo(centerX + Math.round(28 * coverScale), centerY + gap / 2);
  ctx.stroke();

  // Subtitle
  ctx.font = `600 ${Math.round(14 * coverScale)}px Arial`;
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillText("My Book", centerX, centerY + gap * 1.5);
}

export async function exportBookToPdfBlob(
  pages: BookPage[],
  width: number,
  height: number,
  coverTheme?: OccasionTheme | null
): Promise<Blob> {
  const orientation = width > height ? "landscape" : "portrait";

  const pdf = new jsPDF({
    orientation,
    unit: "px",
    format: [width, height],
    hotfixes: ["px_scaling"],
  });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (i > 0) pdf.addPage([width, height], orientation);

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext("2d")!;

    const bg = page.background ?? "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    if (bg.startsWith("linear-gradient") || bg.startsWith("radial-gradient")) {
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

    // Draw cover overlay on first page if coverTheme is provided
    if (i === 0 && coverTheme) {
      drawCoverOverlay(ctx, width, height, coverTheme);
    }

    const sorted = [...page.elements].sort((a, b) => a.zIndex - b.zIndex);

    for (const el of sorted) {
      ctx.save();
      ctx.globalAlpha = el.opacity ?? 1;

      if (el.type === "image" && el.src) {
        try {
          const img = await loadImage(el.src);
          const drawW = el.width ?? img.naturalWidth;
          const drawH = el.height ?? img.naturalHeight;
          const cx = el.x + drawW / 2;
          const cy = el.y + drawH / 2;
          ctx.translate(cx, cy);
          ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);
          ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        } catch (e) {
          console.warn("Image load failed for PDF export:", e);
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
        const drawW = el.width ?? 100;
        const drawH = el.height ?? 100;
        const cx = el.x + drawW / 2;
        const cy = el.y + drawH / 2;
        ctx.translate(cx, cy);
        ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);

        ctx.strokeStyle = el.stroke ?? "transparent";
        ctx.lineWidth = el.strokeWidth ?? 1;
        const fillColor = el.shapeFill ?? el.fill ?? "transparent";
        ctx.fillStyle = fillColor;

        if (el.shapeType === "rect") {
          ctx.beginPath();
          ctx.rect(-drawW / 2, -drawH / 2, drawW, drawH);
          if (fillColor !== "transparent") ctx.fill();
          if ((el.strokeWidth ?? 0) > 0) ctx.stroke();
        } else if (el.shapeType === "circle") {
          ctx.beginPath();
          ctx.ellipse(0, 0, drawW / 2, drawH / 2, 0, 0, Math.PI * 2);
          if (fillColor !== "transparent") ctx.fill();
          if ((el.strokeWidth ?? 0) > 0) ctx.stroke();
        }
      }

      if (el.type === "text" && el.text) {
        let txt = el.text;
        if (el.textTransform === "uppercase") txt = txt.toUpperCase();
        if (el.textTransform === "lowercase") txt = txt.toLowerCase();

        const fontSize = el.fontSize ?? 24;
        const fontFamily = el.fontFamily ?? "Arial";
        const fontStyle = el.fontStyle ?? "normal";
        const align = (el.textAlign as CanvasTextAlign) ?? "left";
        const lineH = fontSize * (el.lineHeight ?? 1.4);
        const elWidth = el.width ?? 200;

        ctx.font = `${fontStyle} ${fontSize}px "${fontFamily}"`;
        ctx.fillStyle = el.fill ?? "#000000";
        ctx.textAlign = align;
        ctx.textBaseline = "top";

        if (el.shadowColor) {
          ctx.shadowColor = el.shadowColor;
          ctx.shadowOffsetX = el.shadowOffsetX ?? 2;
          ctx.shadowOffsetY = el.shadowOffsetY ?? 2;
          ctx.shadowBlur = el.shadowBlur ?? 4;
        }

        const cx = el.x + elWidth / 2;
        const cy = el.y;
        ctx.translate(cx, cy);
        ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);

        let textX = 0;
        if (align === "left") textX = -elWidth / 2;
        else if (align === "right") textX = elWidth / 2;

        const lines = txt.split("\n");
        lines.forEach((line, li) => {
          let drawLine = line;
          if (el.listType === "bullet") drawLine = `• ${line}`;
          else if (el.listType === "numbered") drawLine = `${li + 1}. ${line}`;

          const yPos = li * lineH;
          ctx.fillText(drawLine, textX, yPos);

          if (el.textDecoration === "underline" || el.textDecoration === "line-through") {
            const mw = ctx.measureText(drawLine).width;
            let x0: number;
            if (align === "center") x0 = -mw / 2;
            else if (align === "right") x0 = textX - mw;
            else x0 = textX;

            const lineY =
              el.textDecoration === "underline"
                ? yPos + fontSize + 2
                : yPos + fontSize * 0.6;

            ctx.beginPath();
            ctx.strokeStyle = el.fill ?? "#000000";
            ctx.lineWidth = Math.max(1, fontSize * 0.05);
            ctx.shadowColor = "transparent";
            ctx.moveTo(x0, lineY);
            ctx.lineTo(x0 + mw, lineY);
            ctx.stroke();
          }
        });
      }

      ctx.restore();
    }

    const imgData = offscreen.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
  }

  // Return Blob instead of triggering download
  const blob = pdf.output("blob") as Blob;
  return blob;
}

// ── Image loader ──────────────────────────────────────────────────────────
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// ── Gradient parser (robust) ──────────────────────────────────────────────
// "linear-gradient(135deg, #ff6b6b, #feca57 50%, #ff9ff3)" ধরনের string handle করে
function parseGradientForCanvas(
  ctx: CanvasRenderingContext2D,
  gradientStr: string,
  w: number,
  h: number
): CanvasGradient | null {
  // linear-gradient match
  const linearMatch = gradientStr.match(/linear-gradient\(([\s\S]+)\)/);
  if (linearMatch) {
    const inner = linearMatch[1].trim();
    // angle আলাদা করো
    let angle = 180; // default: top to bottom
    let colorString = inner;

    const angleMatch = inner.match(/^(-?\d+(?:\.\d+)?deg)/i);
    if (angleMatch) {
      angle = parseFloat(angleMatch[1]);
      colorString = inner.slice(angleMatch[0].length).replace(/^,\s*/, "");
    } else if (inner.startsWith("to ")) {
      // "to right", "to bottom left" ইত্যাদি
      const dirMatch = inner.match(/^(to\s+[\w\s]+?),/);
      if (dirMatch) {
        angle = directionToAngle(dirMatch[1].trim());
        colorString = inner.slice(dirMatch[0].length).trim();
      }
    }

    // Color stops parse করো (commas যে color এর মাঝে নেই সেগুলো দিয়ে split)
    const stops = splitColorStops(colorString);
    if (stops.length < 2) return null;

    // Angle → canvas gradient coordinates
    const rad = ((angle - 90) * Math.PI) / 180;
    const x1 = w / 2 - (Math.cos(rad) * w) / 2;
    const y1 = h / 2 - (Math.sin(rad) * h) / 2;
    const x2 = w / 2 + (Math.cos(rad) * w) / 2;
    const y2 = h / 2 + (Math.sin(rad) * h) / 2;

    const grad = ctx.createLinearGradient(x1, y1, x2, y2);

    stops.forEach((stop, i) => {
      const parts = stop.trim().split(/\s+/);
      const color = parts[0].replace(/[()]/g, ""); // trailing ) বা ( সরাও
      let position = i / (stops.length - 1);
      if (parts[1]) {
        // "50%" ধরনের explicit position
        const pct = parseFloat(parts[1]);
        if (!isNaN(pct)) position = pct / 100;
      }
      try {
        grad.addColorStop(Math.min(1, Math.max(0, position)), color);
      } catch (e) {
        console.warn("Invalid color stop:", color, e);
      }
    });

    return grad;
  }

  return null;
}

// "to right" → 90, "to bottom" → 180, "to left" → 270, "to top" → 0
function directionToAngle(dir: string): number {
  const map: Record<string, number> = {
    "to top": 0,
    "to top right": 45,
    "to right": 90,
    "to bottom right": 135,
    "to bottom": 180,
    "to bottom left": 225,
    "to left": 270,
    "to top left": 315,
  };
  return map[dir] ?? 180;
}

function splitColorStops(str: string): string[] {
  const stops: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of str) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      if (current.trim()) stops.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) stops.push(current.trim());
  return stops;
}