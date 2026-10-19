import { Interactive } from "remotion";
import { Stage, Headline } from "./Stage";

const CloseInner = () => {
  return (
    <Stage
      chapter="12 / RELEASE VALIDATION"
      speech="Shared image logic and focused installer checks form the release plan. Validate mirror completeness and offline pulls across the supported paths."
      source="Proposed release gate · cluster validation remains a release prerequisite"
    >
      <Headline>
        Reuse the code.
        <br />
        <span style={{ color: "#A84B32" }}>Prove the paths.</span>
      </Headline>
      <div style={{ marginTop: 30, fontSize: 31, lineHeight: 1.38 }}>
        Install + upgrade + backup / restore
        <br />
        <span style={{ color: "#66645B" }}>
          All three options. Include disconnected runs.
        </span>
      </div>
      <div
        style={{
          display: "inline-block",
          marginTop: 21,
          padding: "11px 19px",
          backgroundColor: "#E6E1D7",
          borderRadius: 10,
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        Offline gate: block external registries.
      </div>
    </Stage>
  );
};
export const Close = Interactive.withSchema({
  Component: CloseInner,
  componentName: "Close",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
