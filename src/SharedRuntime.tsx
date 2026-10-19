import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage, Headline } from "./Stage";

const SharedRuntimeInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="03 / THE SHARED RUNTIME"
      speech="PR #2488 proposes the shared AllNamespaces baseline. Both install paths are designed to use the same OADP image and reconciliation logic."
    >
      <Headline>
        One shared
        <br />
        <span style={{ color: "#A84B32" }}>OADP baseline.</span>
      </Headline>
      <Interactive.Div
        name="Shared baseline"
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          gap: 30,
          opacity: interpolate(frame, [1 * fps, 1.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            backgroundColor: "#E7E4DC",
            border: "2px solid #BFBBB1",
            borderRadius: 16,
            padding: "21px 27px",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          Same operator image
        </div>
        <div style={{ fontSize: 27, lineHeight: 1.35 }}>
          Shared reconciliation
          <br />
          across both install paths.
        </div>
      </Interactive.Div>
      <div style={{ marginTop: 23, fontSize: 20, color: "#6A675F" }}>
        PR #2488 supplies the proposed shared AllNamespaces enablement.
      </div>
    </Stage>
  );
};
export const SharedRuntime = Interactive.withSchema({
  Component: SharedRuntimeInner,
  componentName: "SharedRuntime",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
