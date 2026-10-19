import React from "react";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Clawd } from "./Clawd";

export const Stage: React.FC<{
  chapter: string;
  children: React.ReactNode;
  speech: string;
  source?: string;
}> = ({
  chapter,
  children,
  speech,
  source = "Proposed shared baseline · openshift/oadp-operator#2488",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F6F2EA",
        color: "#242522",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#DDD5C5 0.8px, transparent 0.8px)",
          backgroundSize: "22px 22px",
          opacity: 0.3,
        }}
      />
      <Interactive.Div
        name="Chapter label"
        style={{
          position: "absolute",
          top: 40,
          left: 70,
          right: 70,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        <span>OADP / THE ALLNAMESPACES DELTA</span>
        <span style={{ color: "#8A4936" }}>{chapter}</span>
      </Interactive.Div>
      <Interactive.Div
        name="Scene content"
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 100,
          bottom: 215,
          opacity: interpolate(frame, [0, 0.55 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [0, 0.7 * fps],
            ["0px 22px", "0px 0px"],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        {children}
      </Interactive.Div>
      <div style={{ position: "absolute", bottom: 55, left: 55 }}>
        <Clawd small />
      </div>
      <Interactive.Div
        name="Clawd explanation"
        style={{
          position: "absolute",
          left: 226,
          right: 70,
          bottom: 82,
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          border: "2px solid #DDD4C5",
          borderRadius: 20,
          padding: "19px 28px",
          fontSize: 29,
          lineHeight: 1.28,
          fontWeight: 500,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -13,
            top: 37,
            width: 22,
            height: 22,
            rotate: "45deg",
            backgroundColor: "#FFFFFF",
            borderBottom: "2px solid #DDD4C5",
            borderLeft: "2px solid #DDD4C5",
          }}
        />
        <span style={{ position: "relative" }}>{speech}</span>
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 226,
          bottom: 45,
          fontSize: 14,
          color: "#6A675F",
        }}
      >
        {source}
      </div>
    </AbsoluteFill>
  );
};

export const Headline: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Interactive.Div
    name="Headline"
    style={{
      fontSize: 88,
      fontWeight: 750,
      letterSpacing: -5,
      lineHeight: 0.98,
    }}
  >
    {children}
  </Interactive.Div>
);
