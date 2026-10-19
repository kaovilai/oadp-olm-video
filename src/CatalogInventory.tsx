import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "./Stage";

const CatalogInventoryInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="06 / THE CATALOG HANDOFF"
      speech="The catalog serves both workflows: oc-mirror copies the image inventory, and OLM v1 fetches the selected bundle to install OADP."
      source="opm render v1.50.0 · OpenShift 4.20 / oc-mirror v2 · schematic FBC; fields omitted"
    >
      <Interactive.Div
        name="Catalog handoff headline"
        premountFor={fps}
        style={{ fontSize: 64, fontWeight: 750, letterSpacing: -3 }}
      >
        Two fields.{" "}
        <span style={{ color: "#A84B32" }}>Two different jobs.</span>
      </Interactive.Div>
      <div style={{ marginTop: 10, fontSize: 24, color: "#66645B" }}>
        At catalog build time, opm extracts CSV image data into a file-based
        catalog (FBC).
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 22 }}>
        <Interactive.Div
          name="File based catalog image fields"
          premountFor={fps}
          style={{
            flex: 1,
            padding: "21px 24px",
            border: "2px solid #AD5037",
            backgroundColor: "#F2D8C9",
            borderRadius: 16,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 750, color: "#763823" }}>
            FILE-BASED CATALOG · BUNDLE METADATA
          </div>
          <pre style={{ fontSize: 23, lineHeight: 1.37, margin: "12px 0 0" }}>
            {
              "schema: olm.bundle\nimage: <bundle pullspec>\nrelatedImages:\n- name: velero\n  image: <velero pullspec>"
            }
          </pre>
        </Interactive.Div>
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}
        >
          <Interactive.Div
            name="Bundle reference consumer"
            premountFor={fps}
            style={{
              padding: "21px 24px",
              border: "2px solid #AD5037",
              backgroundColor: "#F2D8C9",
              borderRadius: 16,
            }}
          >
            <div style={{ fontSize: 27, fontWeight: 750 }}>
              image → OLM v1 install
            </div>
            <div style={{ fontSize: 22, marginTop: 8 }}>
              Fetch this bundle for the selected version.
            </div>
          </Interactive.Div>
          <Interactive.Div
            name="Related images mirror consumer"
            premountFor={fps}
            style={{
              padding: "21px 24px",
              border: "2px solid #C6C2B9",
              backgroundColor: "#E9E6DF",
              borderRadius: 16,
              opacity: interpolate(frame, [2 * fps, 2.6 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div style={{ fontSize: 27, fontWeight: 750 }}>
              relatedImages → oc-mirror
            </div>
            <div style={{ fontSize: 22, marginTop: 8 }}>
              Copy the known images before going offline.
            </div>
          </Interactive.Div>
        </div>
      </div>
      <div style={{ fontSize: 21, color: "#66645B", marginTop: 15 }}>
        opm builds the inventory from CSV related images, plus bundle and
        deployment images.
      </div>
    </Stage>
  );
};

export const CatalogInventory = Interactive.withSchema({
  Component: CatalogInventoryInner,
  componentName: "CatalogInventory",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
