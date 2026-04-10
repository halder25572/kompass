"use client";

import { Group, Rect, Line } from 'react-konva';

interface TableNodeProps {
  x: number;
  y: number;
  rows: number;
  cols: number;
  cellWidth: number;
  cellHeight: number;
  stroke?: string;
}

export default function TableNode({ x, y, rows, cols, cellWidth, cellHeight, stroke = '#000000' }: TableNodeProps) {
  return (
    <Group x={x} y={y} draggable>
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <Line
          key={`h-${i}`}
          points={[0, i * cellHeight, cols * cellWidth, i * cellHeight]}
          stroke={stroke}
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <Line
          key={`v-${i}`}
          points={[i * cellWidth, 0, i * cellWidth, rows * cellHeight]}
          stroke={stroke}
          strokeWidth={1}
        />
      ))}
    </Group>
  );
}
