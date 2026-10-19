import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "./Stage";

const ImageResolutionInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="09 / MIRROR RESOLUTION"
      speech="oc-mirror copies image content and generates mirror rules. OADP keeps its image references while pulls resolve to private registry copies."
      source="OpenShift 4.20 / oc-mirror v2 path · pullspecs abbreviated · digest shown symbolically"
    >
      <Interactive.Div
        name="Mirror resolution headline"
        style={{ fontSize: 65, fontWeight: 750, letterSpacing: -3 }}
      >
        Names can stay. <span style={{ color: "#A84B32" }}>Pulls move.</span>
      </Interactive.Div>
      <div style={{ fontSize: 25, color: "#66645B", marginTop: 13 }}>
        OADP reads RELATED_IMAGE_VELERO → writes the Pod image string.
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginTop: 28,
        }}
      >
        <Interactive.Div
          name="Original requested digest"
          style={{
            flex: 1,
            padding: "25px 22px",
            borderRadius: 16,
            border: "2px solid #C6C2B9",
            backgroundColor: "#E9E6DF",
          }}
        >
          <div style={{ fontSize: 21, fontWeight: 700, color: "#66645B" }}>
            POD REQUESTS
          </div>
          <div style={{ fontSize: 24, fontFamily: "monospace", marginTop: 17 }}>
            source.example/velero
            <br />
            @sha256:…
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="Digest mirror routing"
          style={{
            width: 170,
            textAlign: "center",
            color: "#A84B32",
            opacity: interpolate(frame, [1.5 * fps, 2.2 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 750 }}>IDMS</div>
          <div style={{ fontSize: 65, lineHeight: 0.9 }}>→</div>
          <div style={{ fontSize: 20, marginTop: 8 }}>same digest</div>
        </Interactive.Div>
        <Interactive.Div
          name="Private registry copy"
          style={{
            flex: 1,
            padding: "25px 22px",
            borderRadius: 16,
            border: "2px solid #AD5037",
            backgroundColor: "#F2D8C9",
            opacity: interpolate(frame, [2.5 * fps, 3.1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ fontSize: 21, fontWeight: 700, color: "#763823" }}>
            PULL RESOLVES TO
          </div>
          <div style={{ fontSize: 24, fontFamily: "monospace", marginTop: 17 }}>
            mirror.local/velero
            <br />
            @sha256:…
          </div>
        </Interactive.Div>
      </div>
      <div style={{ display: "flex", gap: 28, marginTop: 25, fontSize: 21 }}>
        <span>
          <strong>IDMS</strong> · ImageDigestMirrorSet
        </span>
        <span>
          <strong>ITMS</strong> · ImageTagMirrorSet
        </span>
      </div>
      <div style={{ fontSize: 22, color: "#66645B", marginTop: 13 }}>
        IDMS handles digests; ITMS handles tags. ClusterCatalog points at the
        mirrored catalog.
      </div>
    </Stage>
  );
};

export const ImageResolution = Interactive.withSchema({
  Component: ImageResolutionInner,
  componentName: "ImageResolution",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
