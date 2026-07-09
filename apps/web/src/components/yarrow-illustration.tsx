import type { SxProps, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";

import { brandColors } from "@/theme/brand";

type YarrowIllustrationProps = {
  animated?: boolean;
  framed?: boolean;
  title?: string;
  sx?: SxProps<Theme>;
};

export function YarrowIllustration({
  animated = true,
  framed = false,
  title = "Schafgarbe",
  sx
}: YarrowIllustrationProps) {
  return (
    <Box
      aria-hidden={title ? undefined : true}
      className={animated ? "maria-yarrow maria-yarrow--animated" : "maria-yarrow"}
      component="svg"
      role={title ? "img" : "presentation"}
      sx={sx}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <style>
        {`
          .maria-yarrow {
            overflow: visible;
          }

          .maria-yarrow__plant,
          .maria-yarrow__left-leaves,
          .maria-yarrow__right-leaves,
          .maria-yarrow__umbel {
            transform-box: fill-box;
          }

          .maria-yarrow__plant {
            transform-origin: 50% 92%;
          }

          .maria-yarrow__left-leaves {
            transform-origin: 80% 88%;
          }

          .maria-yarrow__right-leaves {
            transform-origin: 18% 88%;
          }

          .maria-yarrow__umbel {
            transform-origin: 50% 76%;
          }

          .maria-yarrow--animated .maria-yarrow__plant {
            animation: maria-yarrow-plant 8.4s ease-in-out infinite;
          }

          .maria-yarrow--animated .maria-yarrow__left-leaves {
            animation: maria-yarrow-left-leaves 6.8s ease-in-out infinite;
          }

          .maria-yarrow--animated .maria-yarrow__right-leaves {
            animation: maria-yarrow-right-leaves 7.2s ease-in-out infinite;
          }

          .maria-yarrow--animated .maria-yarrow__umbel {
            animation: maria-yarrow-umbel 6.4s ease-in-out infinite;
          }

          @keyframes maria-yarrow-plant {
            0%, 100% { transform: rotate(-0.5deg) translateX(0); }
            42% { transform: rotate(1.4deg) translateX(1.5px); }
            72% { transform: rotate(-0.9deg) translateX(-1px); }
          }

          @keyframes maria-yarrow-left-leaves {
            0%, 100% { transform: rotate(0); }
            52% { transform: rotate(-2.3deg); }
          }

          @keyframes maria-yarrow-right-leaves {
            0%, 100% { transform: rotate(0); }
            50% { transform: rotate(2deg); }
          }

          @keyframes maria-yarrow-umbel {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-1.2px) rotate(0.8deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            .maria-yarrow--animated .maria-yarrow__plant,
            .maria-yarrow--animated .maria-yarrow__left-leaves,
            .maria-yarrow--animated .maria-yarrow__right-leaves,
            .maria-yarrow--animated .maria-yarrow__umbel {
              animation: none;
            }
          }
        `}
      </style>
      {framed ? (
        <circle
          cx="120"
          cy="120"
          fill="none"
          r="96"
          stroke={brandColors.gold}
          strokeWidth="2"
        />
      ) : null}
      <g className="maria-yarrow__plant" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M123 189C122 167 122 144 124 121C126 94 130 73 138 52"
          stroke={brandColors.olive}
          strokeWidth="2"
        />
        <path d="M126 124C112 103 93 92 74 88" stroke={brandColors.olive} strokeWidth="1.5" />
        <path d="M124 139C103 125 83 119 62 121" stroke={brandColors.olive} strokeWidth="1.5" />
        <path d="M123 153C105 145 89 145 72 153" stroke={brandColors.olive} strokeWidth="1.5" />
        <path d="M125 132C143 113 160 105 180 103" stroke={brandColors.olive} strokeWidth="1.5" />
        <path d="M124 148C143 137 160 134 178 139" stroke={brandColors.olive} strokeWidth="1.5" />

        <g className="maria-yarrow__left-leaves" stroke={brandColors.sage} strokeWidth="1.15">
          <FernLeaf points={[[75,88], [63,80], [54,72], [49,65]]} side="left" />
          <FernLeaf points={[[86,96], [74,96], [62,99], [54,104]]} side="right" />
          <FernLeaf points={[[96,105], [83,104], [72,107], [61,114]]} side="left" />
          <FernLeaf points={[[68,121], [55,116], [45,111], [38,105]]} side="left" />
          <FernLeaf points={[[82,124], [70,129], [59,136], [51,145]]} side="right" />
          <FernLeaf points={[[96,130], [82,131], [70,135], [58,143]]} side="left" />
          <FernLeaf points={[[76,154], [64,157], [53,164], [44,174]]} side="right" />
        </g>

        <g className="maria-yarrow__right-leaves" stroke={brandColors.sage} strokeWidth="1.15">
          <FernLeaf points={[[178,103], [190,97], [199,88], [205,80]]} side="right" />
          <FernLeaf points={[[164,111], [176,111], [188,115], [198,122]]} side="left" />
          <FernLeaf points={[[150,119], [162,121], [174,127], [184,136]]} side="right" />
          <FernLeaf points={[[174,139], [187,141], [198,147], [207,156]]} side="left" />
          <FernLeaf points={[[160,140], [171,149], [181,158], [189,169]]} side="right" />
        </g>

        <g className="maria-yarrow__umbel" stroke={brandColors.olive} strokeWidth="1.2">
          <path d="M138 52C126 49 116 43 109 34" />
          <path d="M138 52C135 40 136 31 143 22" />
          <path d="M139 53C149 44 158 39 170 38" />
          <path d="M139 54C129 57 119 58 107 56" />
          <path d="M140 55C151 56 162 60 171 68" />

          <YarrowCluster cx={108} cy={33} scale={0.72} />
          <YarrowCluster cx={143} cy={22} scale={0.84} />
          <YarrowCluster cx={171} cy={38} scale={0.76} />
          <YarrowCluster cx={106} cy={57} scale={0.64} />
          <YarrowCluster cx={172} cy={69} scale={0.66} />
          <YarrowCluster cx={133} cy={39} scale={0.58} />
          <YarrowCluster cx={153} cy={51} scale={0.58} />
        </g>
      </g>
    </Box>
  );
}

function FernLeaf({
  points,
  side
}: Readonly<{ points: Array<[number, number]>; side: "left" | "right" }>) {
  const d = points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join("");
  const leaflet = side === "left" ? -1 : 1;

  return (
    <g>
      <path d={d} />
      {points.slice(1).map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x} ${y}l${leaflet * (6 + index)} ${-4 - index}`} />
          <path d={`M${x} ${y}l${leaflet * (5 + index)} ${4 + index}`} />
        </g>
      ))}
    </g>
  );
}

function YarrowCluster({
  cx,
  cy,
  scale = 1
}: Readonly<{ cx: number; cy: number; scale?: number }>) {
  const offsets: Array<[number, number]> = [
    [0, 0],
    [-8, 1],
    [-4, -7],
    [6, -6],
    [8, 3],
    [0, 7]
  ];

  return (
    <g>
      {offsets.map(([x, y]) => (
        <YarrowFlower cx={cx + x * scale} cy={cy + y * scale} key={`${x}-${y}`} scale={scale} />
      ))}
    </g>
  );
}

function YarrowFlower({
  cx,
  cy,
  scale = 1
}: Readonly<{ cx: number; cy: number; scale?: number }>) {
  const petal = 2.7 * scale;
  const offset = 3.4 * scale;

  return (
    <g stroke={brandColors.taupe} strokeWidth={0.55 * scale}>
      <circle cx={cx - offset} cy={cy} fill={brandColors.white} r={petal} />
      <circle cx={cx} cy={cy - offset} fill={brandColors.white} r={petal} />
      <circle cx={cx + offset} cy={cy} fill={brandColors.white} r={petal} />
      <circle cx={cx} cy={cy + offset} fill={brandColors.white} r={petal} />
      <circle cx={cx} cy={cy} fill={brandColors.goldSoft} r={1.25 * scale} stroke="none" />
    </g>
  );
}
