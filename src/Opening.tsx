import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage, Headline } from "./Stage";
import { Clawd } from "./Clawd";

const OpeningInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="01 / OADP WITH OLM V1"
      speech="OLM v1 brings a new installation workflow to OADP’s proposed AllNamespaces support, building on the shared operator runtime."
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Headline>
            Same scope.
            <br />
            <span style={{ color: "#A84B32" }}>New front door.</span>
          </Headline>
          <Interactive.Div
            name="Comparison"
            style={{
              marginTop: 40,
              fontSize: 33,
              fontWeight: 700,
              opacity: interpolate(frame, [1 * fps, 1.6 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            OLM v0{" "}
            <span style={{ color: "#A84B32", padding: "0 15px" }}>→</span> OLM
            v1
          </Interactive.Div>
          <div style={{ fontSize: 25, marginTop: 9, color: "#65625B" }}>
            AllNamespaces on both sides
          </div>
        </div>
        <div style={{ paddingTop: 55, paddingRight: 12 }}>
          <Clawd />
        </div>
      </div>
    </Stage>
  );
};
export const Opening = Interactive.withSchema({
  Component: OpeningInner,
  componentName: "Opening",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
