import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "./Stage";

const MirrorFlowInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="08 / PACK FOR DISCONNECTED"
      speech="Mirror the catalog, bundle, operator, and operand images. Catalog metadata supplies the inventory; include custom images in the mirror configuration."
      source="OpenShift 4.20 · oc-mirror v2 · operator-registry opm render · FBC also works with OLM v0"
    >
      <Interactive.Div
        name="Mirror completeness headline"
        style={{ fontSize: 66, fontWeight: 750, letterSpacing: -3 }}
      >
        Bring the <span style={{ color: "#A84B32" }}>whole image set.</span>
      </Interactive.Div>
      <div style={{ fontSize: 25, marginTop: 14, color: "#66645B" }}>
        CSV spec.relatedImages → opm → FBC olm.bundle.relatedImages
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        <Interactive.Div
          name="Catalog image"
          style={{
            flex: 1,
            padding: "17px 20px",
            borderRadius: 16,
            backgroundColor: "#F2D8C9",
            border: "2px solid #AD5037",
          }}
        >
          <div style={{ fontSize: 31, fontWeight: 750 }}>Catalog</div>
          <div style={{ fontSize: 21, lineHeight: 1.35, marginTop: 10 }}>
            Filtered metadata
            <br />
            for selected releases
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Bundle image"
          style={{
            flex: 1,
            padding: "17px 20px",
            borderRadius: 16,
            backgroundColor: "#F2D8C9",
            border: "2px solid #AD5037",
          }}
        >
          <div style={{ fontSize: 31, fontWeight: 750 }}>Bundle</div>
          <div style={{ fontSize: 21, lineHeight: 1.35, marginTop: 10 }}>
            CSV + CRDs
            <br />+ other manifests
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Operator image"
          style={{
            flex: 1,
            padding: "17px 20px",
            borderRadius: 16,
            backgroundColor: "#E9E6DF",
            border: "2px solid #C6C2B9",
          }}
        >
          <div style={{ fontSize: 31, fontWeight: 750 }}>Operator</div>
          <div style={{ fontSize: 21, lineHeight: 1.35, marginTop: 10 }}>
            The shared
            <br />
            OADP binary
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Operand images"
          style={{
            flex: 1,
            padding: "17px 20px",
            borderRadius: 16,
            backgroundColor: "#E9E6DF",
            border: "2px solid #C6C2B9",
          }}
        >
          <div style={{ fontSize: 31, fontWeight: 750 }}>Operands</div>
          <div style={{ fontSize: 21, lineHeight: 1.35, marginTop: 10 }}>
            Velero, plugins
            <br />+ declared helpers
          </div>
        </Interactive.Div>
      </div>
      <Interactive.Div
        name="Air gap transfer route"
        style={{
          marginTop: 18,
          padding: "15px 24px",
          borderRadius: 14,
          backgroundColor: "#FFFFFF",
          border: "2px solid #DDD4C5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 28,
          fontWeight: 700,
          opacity: interpolate(frame, [2 * fps, 2.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span>oc-mirror v2</span>
        <span style={{ color: "#A84B32" }}>→</span>
        <span>Archive transfer</span>
        <span style={{ color: "#A84B32" }}>→</span>
        <span>Private registry</span>
      </Interactive.Div>
      <div style={{ fontSize: 21, color: "#66645B", marginTop: 12 }}>
        Include custom plugins and image overrides with additionalImages.
      </div>
    </Stage>
  );
};

export const MirrorFlow = Interactive.withSchema({
  Component: MirrorFlowInner,
  componentName: "MirrorFlow",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
