/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { Stage, Layer, Line, Rect, Ellipse, Text, Line as KLine, Image as KonvaImage } from "react-konva";
import { useBookStore } from "@/store/useBookStore";
import Konva from "konva";
import ImageNode from "./elements/ImageNode";
import ShapeNode from "./elements/ShapeNode";
import TextNode from "./elements/TextNode";

interface CanvasPageProps {
  pageId: number;
  width: number;
  height: number;
  stageRef?: (node: Konva.Stage | null) => void;
}

interface DrawingShape {
  type: "rect" | "circle" | "line";
  x: number;
  y: number;
  x2: number;
  y2: number;
}

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

function parseLinearGradient(gradientStr: string) {
  const linearMatch = gradientStr.match(/linear-gradient\(([\s\S]+)\)/i);
  if (!linearMatch) return null;

  const inner = linearMatch[1].trim();
  let angle = 180;
  let colorString = inner;

  const angleMatch = inner.match(/^(-?\d+(?:\.\d+)?deg)/i);
  if (angleMatch) {
    angle = parseFloat(angleMatch[1]);
    colorString = inner.slice(angleMatch[0].length).replace(/^,\s*/, "");
  } else if (inner.startsWith("to ")) {
    const dirMatch = inner.match(/^(to\s+[\w\s]+?),/i);
    if (dirMatch) {
      angle = directionToAngle(dirMatch[1].trim());
      colorString = inner.slice(dirMatch[0].length).trim();
    }
  }

  const stops = splitColorStops(colorString);
  if (stops.length < 2) return null;

  return {
    angle,
    stops: stops.map((stop, index) => {
      const parts = stop.trim().split(/\s+/);
      const color = parts[0].replace(/[()]/g, "");
      let position = index / (stops.length - 1);

      if (parts[1]) {
        const pct = parseFloat(parts[1]);
        if (!Number.isNaN(pct)) position = pct / 100;
      }

      return { color, position };
    }),
  };
}

function getProxiedImageSrc(src: string) {
  if (!src.startsWith("http")) return src;
  return `/api/image-proxy?url=${encodeURIComponent(src)}`;
}

function getGradientPoints(angle: number, width: number, height: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  const x1 = width / 2 - (Math.cos(rad) * width) / 2;
  const y1 = height / 2 - (Math.sin(rad) * height) / 2;
  const x2 = width / 2 + (Math.cos(rad) * width) / 2;
  const y2 = height / 2 + (Math.sin(rad) * height) / 2;

  return {
    startPoint: { x: x1, y: y1 },
    endPoint: { x: x2, y: y2 },
  };
}

const CanvasPage = forwardRef<HTMLDivElement, CanvasPageProps>(
  ({ pageId, width, height, stageRef }, ref) => {
    const [currentLine, setCurrentLine] = useState<number[] | null>(null);
    const [drawingShape, setDrawingShape] = useState<DrawingShape | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
    const isDrawing = useRef(false);
    const startPos = useRef<{ x: number; y: number } | null>(null);

    const pages = useBookStore((s) => s.pages);
    const activeTool = useBookStore((s) => s.activeTool);
    const strokeColor = useBookStore((s) => s.strokeColor);
    const strokeWidth = useBookStore((s) => s.strokeWidth);
    const selectedElementId = useBookStore((s) => s.selectedElementId);
    const addElement = useBookStore((s) => s.addElement);
    const updateElement = useBookStore((s) => s.updateElement);
    const setSelectedElement = useBookStore((s) => s.setSelectedElement);

    const page = pages.find((p) => p.id === pageId);
    const isSelectMode = activeTool === "select";
    const bookTitle = useBookStore((s) => s.bookTitle);
    const bookSubtitle = useBookStore((s) => s.bookSubtitle);
    const recipientName = useBookStore((s) => s.recipientName);
    const coverPageBackground = useBookStore((s) => s.coverPageBackground);
    const bookPageBackground = useBookStore((s) => s.bookPageBackground);

    const hasLocalBackground = typeof page?.background === "string" && page.background.trim().length > 0;
    const resolvedBackground = page?.id === 1
      ? (hasLocalBackground ? page!.background : coverPageBackground || "#ffffff")
      : (bookPageBackground || (hasLocalBackground ? page!.background : "#ffffff"));
    const backgroundType = typeof resolvedBackground === "string" ? resolvedBackground.trim() : "";
    const isImageBackground = backgroundType.startsWith("http");
    const isGradientBackground = backgroundType.includes("gradient");
    const isColorBackground = backgroundType.startsWith("#") || backgroundType.startsWith("rgb");
    const gradient = isGradientBackground ? parseLinearGradient(backgroundType) : null;

    useEffect(() => {
      if (!isImageBackground) {
        setBackgroundImage(null);
        return;
      }

      const img = new window.Image();
      img.src = getProxiedImageSrc(backgroundType);
      img.onload = () => setBackgroundImage(img);
      img.onerror = () => setBackgroundImage(null);
    }, [backgroundType, isImageBackground]);

    const getPos = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) =>
      e.target.getStage()?.getPointerPosition() ?? null;

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (e.target === e.target.getStage()) setSelectedElement(null);

      const pos = getPos(e);
      if (!pos) return;

      if (activeTool === "pen" || activeTool === "eraser") {
        isDrawing.current = true;
        setCurrentLine([pos.x, pos.y]);
      }

      if (activeTool === "rect" || activeTool === "circle" || activeTool === "line") {
        isDrawing.current = true;
        startPos.current = pos;
        setDrawingShape({ type: activeTool, x: pos.x, y: pos.y, x2: pos.x, y2: pos.y });
      }
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (!isDrawing.current) return;
      const pos = getPos(e);
      if (!pos) return;

      if (activeTool === "pen" || activeTool === "eraser") {
        setCurrentLine((prev) => (prev ? [...prev, pos.x, pos.y] : [pos.x, pos.y]));
      }

      if (drawingShape) {
        setDrawingShape((prev) => prev ? { ...prev, x2: pos.x, y2: pos.y } : prev);
      }
    };

    const handleMouseUp = () => {
      if (!isDrawing.current) return;
      isDrawing.current = false;

      // commit freehand line
      if ((activeTool === "pen" || activeTool === "eraser") && currentLine && currentLine.length > 2) {
        addElement(pageId, {
          id: `line-${Date.now()}-${Math.random()}`,
          type: "line",
          x: 0,
          y: 0,
          points: currentLine,
          stroke: activeTool === "eraser" ? (page?.background ?? "#ffffff") : strokeColor,
          strokeWidth: activeTool === "eraser" ? strokeWidth * 3 : strokeWidth,
          zIndex: page?.elements.length || 0,
        });
        setCurrentLine(null);
      }

      // commit shape
      if (drawingShape && startPos.current) {
        const { type, x, y, x2, y2 } = drawingShape;
        const minW = Math.abs(x2 - x);
        const minH = Math.abs(y2 - y);
        if (minW > 4 || minH > 4) {
          if (type === "rect") {
            addElement(pageId, {
              id: `shape-${Date.now()}`,
              type: "shape",
              shapeType: "rect",
              x: Math.min(x, x2),
              y: Math.min(y, y2),
              width: minW,
              height: minH,
              fill: "transparent",
              stroke: strokeColor,
              strokeWidth,
              zIndex: page?.elements.length || 0,
            });
          } else if (type === "circle") {
            addElement(pageId, {
              id: `shape-${Date.now()}`,
              type: "shape",
              shapeType: "circle",
              x: Math.min(x, x2) + minW / 2,
              y: Math.min(y, y2) + minH / 2,
              width: minW,
              height: minH,
              radius: Math.max(minW, minH) / 2,
              fill: "transparent",
              stroke: strokeColor,
              strokeWidth,
              zIndex: page?.elements.length || 0,
            });
          } else if (type === "line") {
            addElement(pageId, {
              id: `line-${Date.now()}`,
              type: "line",
              x: 0,
              y: 0,
              points: [x, y, x2, y2],
              stroke: strokeColor,
              strokeWidth,
              zIndex: page?.elements.length || 0,
            });
          }
        }
        setDrawingShape(null);
        startPos.current = null;
      }
    };

    const sortedElements = page
      ? [...page.elements].sort((a, b) => a.zIndex - b.zIndex)
      : [];

    return (
      <div ref={ref} className="h-full w-full relative" style={{ background: isColorBackground ? resolvedBackground : "#ffffff" }}>
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown as any}
          onTouchMove={handleMouseMove as any}
          onTouchEnd={handleMouseUp}
          style={{ cursor: activeTool === "select" ? "default" : "crosshair" }}
        >
          <Layer>
            {isImageBackground && backgroundImage && (
              <KonvaImage
                image={backgroundImage}
                x={0}
                y={0}
                width={width}
                height={height}
                listening={false}
              />
            )}

            {isGradientBackground && gradient && (() => {
              const gradientPoints = getGradientPoints(gradient.angle, width, height);

              return (
                <Rect
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                  listening={false}
                  fillLinearGradientStartPoint={gradientPoints.startPoint}
                  fillLinearGradientEndPoint={gradientPoints.endPoint}
                  fillLinearGradientColorStops={gradient.stops.flatMap((stop) => [stop.position, stop.color])}
                />
              );
            })()}

            {!isImageBackground && !isGradientBackground && isColorBackground && (
              <Rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={resolvedBackground}
                listening={false}
              />
            )}

            {(page?.isCover || page?.id === 1) && (
              <>
                <Text
                  text={"Pick Your Occasion"}
                  x={0}
                  y={20}
                  width={width}
                  align="center"
                  fontSize={14}
                  fontFamily="Arial"
                  fill="#111"
                />
                {bookTitle && (
                  <Text
                    text={bookTitle}
                    x={0}
                    y={80}
                    width={width}
                    align="center"
                    fontSize={48}
                    fontFamily="Arial"
                    fontStyle="bold"
                    fill="#111"
                  />
                )}
                {bookSubtitle && (
                  <Text
                    text={bookSubtitle}
                    x={0}
                    y={140}
                    width={width}
                    align="center"
                    fontSize={20}
                    fontFamily="Arial"
                    fill="#222"
                  />
                )}
                {recipientName && (
                  <Text
                    text={recipientName}
                    x={0}
                    y={height - 120}
                    width={width}
                    align="center"
                    fontSize={18}
                    fontFamily="Arial"
                    fill="#222"
                  />
                )}
              </>
            )}

            {sortedElements.map((element) => {
              if (element.type === "line") {
                return (
                  <Line
                    key={element.id}
                    points={element.points || []}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                  />
                );
              }

              if (element.type === "image") {
                return (
                  <ImageNode
                    key={element.id}
                    id={element.id}
                    src={element.src || ""}
                    x={element.x}
                    y={element.y}
                    width={element.width || 100}
                    height={element.height || 100}
                    rotation={element.rotation}
                    isSelected={element.id === selectedElementId}
                    isSelectMode={isSelectMode}
                    onSelect={() => setSelectedElement(element.id)}
                    onChange={(updates) => updateElement(pageId, element.id, updates)}
                  />
                );
              }

              if (element.type === "shape") {
                return (
                  <ShapeNode
                    key={element.id}
                    id={element.id}
                    shapeType={element.shapeType === "circle" ? "circle" : "rect"}
                    x={element.x}
                    y={element.y}
                    width={element.width}
                    height={element.height}
                    radius={element.radius}
                    fill={element.fill}
                    stroke={element.stroke}
                    rotation={element.rotation}
                    isSelected={element.id === selectedElementId}
                    isSelectMode={isSelectMode}
                    onSelect={() => setSelectedElement(element.id)}
                    onChange={(updates) => updateElement(pageId, element.id, updates)}
                  />
                );
              }

              if (element.type === "text") {
                return (
                  <TextNode
                    key={element.id}
                    id={element.id}
                    text={element.text || ""}
                    x={element.x}
                    y={element.y}
                    fontSize={element.fontSize}
                    fontFamily={element.fontFamily}
                    fontStyle={element.fontStyle}
                    textDecoration={element.textDecoration}
                    textAlign={element.textAlign as "left" | "center" | "right" | undefined}
                    fill={element.fill}
                    width={element.width}
                    rotation={element.rotation}
                    opacity={element.opacity}
                    lineHeight={element.lineHeight}
                    letterSpacing={element.letterSpacing}
                    listType={element.listType as "number" | "none" | "bullet" | undefined}
                    textTransform={element.textTransform as "none" | "uppercase" | "lowercase" | "capitalize" | undefined}
                    isSelected={element.id === selectedElementId}
                    isSelectMode={isSelectMode}
                    onSelect={() => setSelectedElement(element.id)}
                    onChange={(updates) => updateElement(pageId, element.id, updates)}
                  />
                );
              }

              return null;
            })}

            {/* live freehand preview */}
            {currentLine && (
              <Line
                points={currentLine}
                stroke={activeTool === "eraser" ? (page?.background ?? "#ffffff") : strokeColor}
                strokeWidth={activeTool === "eraser" ? strokeWidth * 3 : strokeWidth}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            )}

            {/* live shape preview */}
            {drawingShape && drawingShape.type === "rect" && (
              <Rect
                x={Math.min(drawingShape.x, drawingShape.x2)}
                y={Math.min(drawingShape.y, drawingShape.y2)}
                width={Math.abs(drawingShape.x2 - drawingShape.x)}
                height={Math.abs(drawingShape.y2 - drawingShape.y)}
                fill="transparent"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                dash={[6, 3]}
              />
            )}
            {drawingShape && drawingShape.type === "circle" && (
              <Ellipse
                x={Math.min(drawingShape.x, drawingShape.x2) + Math.abs(drawingShape.x2 - drawingShape.x) / 2}
                y={Math.min(drawingShape.y, drawingShape.y2) + Math.abs(drawingShape.y2 - drawingShape.y) / 2}
                radiusX={Math.abs(drawingShape.x2 - drawingShape.x) / 2}
                radiusY={Math.abs(drawingShape.y2 - drawingShape.y) / 2}
                fill="transparent"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                dash={[6, 3]}
              />
            )}
            {drawingShape && drawingShape.type === "line" && (
              <KLine
                points={[drawingShape.x, drawingShape.y, drawingShape.x2, drawingShape.y2]}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                lineCap="round"
                dash={[6, 3]}
              />
            )}
          </Layer>
        </Stage>
      </div>
    );
  }
);

CanvasPage.displayName = "CanvasPage";

export default CanvasPage;