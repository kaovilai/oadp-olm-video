import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "./Stage";

const ImageInventoryInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="05 / IMAGE INVENTORY AND RUNTIME"
      speech="The CSV’s spec.relatedImages lists images for mirroring. Its Deployment environment values tell OADP which images to run."
      source="OADP PR #2488 · CSV inventory + RELATED_IMAGE_* wiring unchanged · fragments are illustrative"
    >
      <Interactive.Div
        name="Bundle image metadata headline"
        style={{ fontSize: 66, fontWeight: 750, letterSpacing: -3 }}
      >
        Image metadata <span style={{ color: "#A84B32" }}>in the bundle.</span>
      </Interactive.Div>
      <div style={{ fontSize: 23, color: "#66645B", marginTop: 10 }}>
        The CSV packages image inventory and Deployment configuration in a
        registry+v1 bundle.
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 26 }}>
        <Interactive.Div
          name="Image discovery inventory"
          style={{
            flex: 1,
            padding: "22px 25px",
            backgroundColor: "#E9E6DF",
            border: "2px solid #C6C2B9",
            borderRadius: 16,
          }}
        >
          <div style={{ fontSize: 19, fontWeight: 750, color: "#66645B" }}>
            MIRROR INVENTORY · CSV SPEC
          </div>
          <pre style={{ fontSize: 23, lineHeight: 1.38, margin: "13px 0 0" }}>
            {
              "spec:\n  relatedImages:\n  - name: velero\n    image: <digest pullspec>"
            }
          </pre>
        </Interactive.Div>
        <Interactive.Div
          name="Separate runtime image input"
          style={{
            flex: 1,
            padding: "22px 25px",
            backgroundColor: "#E9E6DF",
            border: "2px solid #C6C2B9",
            borderRadius: 16,
            opacity: interpolate(frame, [2 * fps, 2.6 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ fontSize: 19, fontWeight: 750, color: "#66645B" }}>
            RUNTIME INPUT · OPERATOR DEPLOYMENT
          </div>
          <pre style={{ fontSize: 23, lineHeight: 1.38, margin: "13px 0 0" }}>
            {"env:\n- name: RELATED_IMAGE_VELERO\n  value: <same pullspec>"}
          </pre>
          <div style={{ fontSize: 22, marginTop: 11, fontWeight: 700 }}>
            → Velero + node-agent Pods
          </div>
        </Interactive.Div>
      </div>
      <a
        href="https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/bundle/manifests/oadp-operator.clusterserviceversion.yaml#L1827-L1863"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          fontSize: 21,
          fontFamily: "monospace",
          color: "#8A4936",
          marginTop: 16,
          textDecoration: "underline",
        }}
      >
        bundle/manifests/oadp-operator.clusterserviceversion.yaml ·
        spec.relatedImages
      </a>
    </Stage>
  );
};

export const ImageInventory = Interactive.withSchema({
  Component: ImageInventoryInner,
  componentName: "ImageInventory",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
