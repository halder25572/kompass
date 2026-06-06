import { BookPage } from "@/store/useBookStore";
import type { OccasionTheme } from "@/store/useBookStore";
import jsPDF from "jspdf";

export async function exportBookToPDF(
  pages: BookPage[],
  width: number,
  height: number
): Promise<void> {
  // Orientation: landscape if width > height
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

    // ── 1. Create an offscreen canvas ──
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext("2d")!;

    // Fill background white first (fixes transparent background bug)
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
      } catch (e) {
        console.warn("Gradient parse failed, using white background", e);
      }
    } else {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
    }

    // ── 2. Draw each element (zIndex order) ──
    const sorted = [...page.elements].sort((a, b) => a.zIndex - b.zIndex);

    for (const el of sorted) {
      ctx.save();
      ctx.globalAlpha = el.opacity ?? 1;

      // Image
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

      // Freehand Line / Drawing
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

      // Shape
      if (el.type === "shape") {
        const drawW = el.width ?? 100;
        const drawH = el.height ?? 100;
        const cx = el.x + drawW / 2;
        const cy = el.y + drawH / 2;
        ctx.translate(cx, cy);
        ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);

        ctx.strokeStyle = el.stroke ?? "transparent";
        ctx.lineWidth = el.strokeWidth ?? 1;
        // Shape's fill and stroke are separate — prefer `shapeFill`, otherwise use `fill` if present
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

      // Text (including Emoji)
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

        // x offset according to textAlign
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
            ctx.shadowColor = "transparent"; // no shadow for decorations
            ctx.moveTo(x0, lineY);
            ctx.lineTo(x0 + mw, lineY);
            ctx.stroke();
          }
        });
      }

      ctx.restore();
    }

    // ── 3. Add canvas to PDF ──
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
      } catch { }
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
// Handles strings like "linear-gradient(135deg, #ff6b6b, #feca57 50%, #ff9ff3)"
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
    // Extract/parse the angle
    let angle = 180; // default: top to bottom
    let colorString = inner;

    const angleMatch = inner.match(/^(-?\d+(?:\.\d+)?deg)/i);
    if (angleMatch) {
      angle = parseFloat(angleMatch[1]);
      colorString = inner.slice(angleMatch[0].length).replace(/^,\s*/, "");
    } else if (inner.startsWith("to ")) {
      // Handle directions like "to right", "to bottom left"
      const dirMatch = inner.match(/^(to\s+[\w\s]+?),/);
      if (dirMatch) {
        angle = directionToAngle(dirMatch[1].trim());
        colorString = inner.slice(dirMatch[0].length).trim();
      }
    }

    // Parse color stops (split on commas that are not inside parentheses)
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
      const color = parts[0].replace(/[()]/g, ""); // remove trailing '(' or ')'
      let position = i / (stops.length - 1);
      if (parts[1]) {
        // Explicit positions like "50%"
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