import React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Clawd: React.FC<{ small?: boolean; wave?: boolean }> = ({
  small = false,
  wave = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const blink = frame % Math.round(4 * fps);
  const beat = frame % Math.round(2 * fps);
  return (
    <Interactive.Div
      name="Clawd mascot"
      style={{
        width: small ? 146 : 260,
        height: small ? 126 : 224,
        position: "relative",
        translate: interpolate(
          beat,
          [0, fps, 2 * fps],
          ["0px 0px", "0px -8px", "0px 0px"],
        ),
        transformOrigin: "50% 100%",
      }}
    >
      <svg
        viewBox="0 0 160 140"
        width="100%"
        height="100%"
        aria-label="Clawd, the pixel crab mascot"
        shapeRendering="crispEdges"
      >
        <ellipse cx="80" cy="128" rx="55" ry="5" fill="#DDD6C9" />
        <g fill="#CF7859">
          <rect x="29" y="30" width="102" height="70" />
          <rect x="18" y="43" width="11" height="44" />
          <rect x="131" y="43" width="11" height="44" />
          <rect x="39" y="100" width="12" height="25" />
          <rect x="62" y="100" width="12" height="19" />
          <rect x="88" y="100" width="12" height="19" />
          <rect x="111" y="100" width="12" height="25" />
        </g>
        <g fill="#B96145">
          <rect x="29" y="89" width="102" height="11" />
          <rect x="39" y="114" width="12" height="11" />
          <rect x="111" y="114" width="12" height="11" />
        </g>
        <g fill="#242522">
          <rect x="47" y="54" width="10" height={blink > 3.85 * fps ? 3 : 17} />
          <rect
            x="103"
            y="54"
            width="10"
            height={blink > 3.85 * fps ? 3 : 17}
          />
        </g>
        {wave && (
          <g
            fill="#CF7859"
            style={{
              translate: interpolate(
                beat,
                [0, fps, 2 * fps],
                ["0px 0px", "0px -10px", "0px 0px"],
              ),
            }}
          >
            <rect x="142" y="35" width="10" height="25" />
            <rect x="151" y="27" width="9" height="13" />
          </g>
        )}
      </svg>
    </Interactive.Div>
  );
};
