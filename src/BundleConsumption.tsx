import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "./Stage";

const BundleConsumptionInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="07 / THE BUNDLE HANDOFF"
      speech="OLM v1 reads the bundle’s CSV and renders its install data into native resources. OADP receives the same runtime image inputs."
      source="OpenShift 4.20 · registry+v1 rendering · validate bundle compatibility for the target release"
    >
      <Interactive.Div
        name="Bundle installation headline"
        premountFor={fps}
        style={{ fontSize: 64, fontWeight: 750, letterSpacing: -3 }}
      >
        Shared format.{" "}
        <span style={{ color: "#A84B32" }}>New install flow.</span>
      </Interactive.Div>
      <div style={{ fontSize: 24, color: "#66645B", marginTop: 11 }}>
        ClusterExtension → select bundle → fetch registry+v1 content
      </div>
      <div
        style={{
          display: "flex",
          gap: 22,
          alignItems: "stretch",
          marginTop: 24,
        }}
      >
        <Interactive.Div
          name="Bundle input data"
          premountFor={fps}
          style={{
            flex: 1,
            border: "2px solid #C6C2B9",
            backgroundColor: "#E9E6DF",
            borderRadius: 16,
            padding: "22px 24px",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 750, color: "#66645B" }}>
            BUNDLE INPUT
          </div>
          <div style={{ fontSize: 31, fontWeight: 750, marginTop: 12 }}>
            CSV file
          </div>
          <div style={{ fontSize: 23, lineHeight: 1.4, marginTop: 10 }}>
            Deployment + env
            <br />
            RBAC declarations
            <br />
            Plus CRDs / other manifests
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="V1 registry bundle rendering"
          premountFor={fps}
          style={{
            width: 205,
            border: "2px solid #AD5037",
            backgroundColor: "#F2D8C9",
            borderRadius: 16,
            padding: "22px 17px",
            textAlign: "center",
            opacity: interpolate(frame, [1.3 * fps, 1.9 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 750, color: "#763823" }}>
            OLM v1
          </div>
          <div style={{ fontSize: 30, fontWeight: 750, marginTop: 12 }}>
            Render →
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.35, marginTop: 12 }}>
            Install through
            <br />
            internal Helm
            <br />
            conversion
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Native installed resources"
          premountFor={fps}
          style={{
            flex: 1,
            border: "2px solid #C6C2B9",
            backgroundColor: "#E9E6DF",
            borderRadius: 16,
            padding: "22px 24px",
            opacity: interpolate(frame, [2.6 * fps, 3.2 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 750, color: "#66645B" }}>
            INSTALLED RESOURCES
          </div>
          <div style={{ fontSize: 31, fontWeight: 750, marginTop: 12 }}>
            Native objects
          </div>
          <div style={{ fontSize: 23, lineHeight: 1.4, marginTop: 10 }}>
            Deployment, RBAC, CRDs
            <br />
            <strong>RELATED_IMAGE_* retained</strong>
            <br />
            Managed through OLM v1
          </div>
        </Interactive.Div>
      </div>
      <div style={{ fontSize: 22, color: "#66645B", marginTop: 18 }}>
        ClusterExtension and Operator Controller manage installation and
        upgrades.
      </div>
    </Stage>
  );
};

export const BundleConsumption = Interactive.withSchema({
  Component: BundleConsumptionInner,
  componentName: "BundleConsumption",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
