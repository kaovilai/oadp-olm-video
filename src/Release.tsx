import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "./Stage";

const ReleaseInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="11 / THREE INSTALL OPTIONS"
      speech="The release plan combines both AllNamespaces install paths with the existing v0 OwnNamespace option, validated across all three choices."
      source="Proposed release options · existing namespaced install mode = CSV OwnNamespace"
    >
      <div
        style={{
          fontSize: 76,
          fontWeight: 750,
          letterSpacing: -4,
          marginBottom: 28,
        }}
      >
        One release. <span style={{ color: "#A84B32" }}>Three options.</span>
      </div>
      <div
        style={{
          borderTop: "2px solid #CCC4B5",
          borderBottom: "2px solid #CCC4B5",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "19px 5px",
            fontSize: 29,
          }}
        >
          <strong>OLM v0 · OwnNamespace</strong>
          <span style={{ color: "#66675E", fontSize: 22 }}>
            Existing install option
          </span>
        </div>
        <Interactive.Div
          name="OLM v0 all namespaces option"
          style={{
            borderTop: "1px solid #DDD5C6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "19px 5px",
            fontSize: 29,
            opacity: interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <strong>OLM v0 · AllNamespaces</strong>
          <span style={{ color: "#A84B32", fontSize: 22 }}>
            Shared baseline
          </span>
        </Interactive.Div>
        <Interactive.Div
          name="OLM v1 all namespaces option"
          style={{
            borderTop: "1px solid #DDD5C6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "19px 5px",
            fontSize: 29,
            opacity: interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <strong>OLM v1 · AllNamespaces</strong>
          <span style={{ color: "#A84B32", fontSize: 22 }}>
            New installer, same baseline
          </span>
        </Interactive.Div>
      </div>
      <div style={{ fontSize: 21, color: "#6A675F", marginTop: 20 }}>
        Choose one installation path for each OADP deployment, with clear
        ownership.
      </div>
    </Stage>
  );
};
export const Release = Interactive.withSchema({
  Component: ReleaseInner,
  componentName: "Release",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
