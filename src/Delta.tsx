import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "./Stage";

const DeltaInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="04 / THE V1 INTEGRATION CHECK"
      speech="Same image is the design goal. Verify the new installer gives it the namespace, environment, and permissions it needs."
      source="OLM v1 integration requirements · validate against the target OpenShift release"
    >
      <div
        style={{
          fontSize: 74,
          fontWeight: 750,
          letterSpacing: -3,
          marginBottom: 27,
        }}
      >
        A new <span style={{ color: "#A84B32" }}>install contract.</span>
      </div>
      <div style={{ borderLeft: "5px solid #AD5037", paddingLeft: 28 }}>
        <Interactive.Div
          name="Catalog contract"
          style={{
            fontSize: 32,
            padding: "10px 0",
            opacity: interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <strong>Catalog + install resources</strong>
          <span style={{ color: "#747067", marginLeft: 23 }}>
            New entry points
          </span>
        </Interactive.Div>
        <Interactive.Div
          name="Permission contract"
          style={{
            fontSize: 32,
            padding: "18px 0",
            opacity: interpolate(frame, [1.8 * fps, 2.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <strong>Install permissions + RBAC</strong>
          <span style={{ color: "#747067", marginLeft: 23 }}>
            Version-specific
          </span>
        </Interactive.Div>
        <Interactive.Div
          name="Runtime contract"
          style={{
            fontSize: 32,
            padding: "18px 0",
            opacity: interpolate(frame, [3.3 * fps, 3.8 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <strong>Namespace + environment</strong>
          <span style={{ color: "#747067", marginLeft: 23 }}>
            Equivalent runtime inputs
          </span>
        </Interactive.Div>
      </div>
      <div style={{ fontSize: 21, color: "#6A675F", marginTop: 18 }}>
        OLM v1 reads the registry+v1 bundle’s CSV as installation data.
      </div>
    </Stage>
  );
};
export const Delta = Interactive.withSchema({
  Component: DeltaInner,
  componentName: "Delta",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
