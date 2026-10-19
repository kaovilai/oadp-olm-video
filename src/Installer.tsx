import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "./Stage";

const InstallerInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="02 / SPOTLIGHT THE CHANGE"
      speech="The net change lives here: how OLM finds, installs, and manages the operator."
      source="OLM v1 ClusterCatalog / ClusterExtension · registry+v1 bundle format"
    >
      <Interactive.Div
        name="Installer title"
        style={{
          fontSize: 68,
          fontWeight: 750,
          letterSpacing: -3,
          marginBottom: 24,
        }}
      >
        Swap the <span style={{ color: "#A84B32" }}>installer layer.</span>
      </Interactive.Div>
      <div
        style={{
          position: "relative",
          height: 206,
          borderRadius: 20,
          border: "3px solid #AD5037",
          backgroundColor: "#F2D8C9",
          overflow: "hidden",
          boxShadow: "0 9px 0 #E3C5B5",
        }}
      >
        <Interactive.Div
          name="OLM v0 installer"
          style={{
            position: "absolute",
            inset: 0,
            padding: "23px 32px",
            opacity: interpolate(frame, [4.6 * fps, 5.15 * fps], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [4.6 * fps, 5.15 * fps],
              ["0px 0px", "0px -50px"],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              fontWeight: 700,
              color: "#763823",
            }}
          >
            <span>OLM v0</span>
            <span>AllNamespaces</span>
          </div>
          <div style={{ fontSize: 42, fontWeight: 700, marginTop: 15 }}>
            CatalogSource + Subscription
          </div>
          <div style={{ fontSize: 23, marginTop: 10 }}>
            Global OperatorGroup · InstallPlan / CSV lifecycle
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="OLM v1 installer"
          style={{
            position: "absolute",
            inset: 0,
            padding: "23px 32px",
            opacity: interpolate(frame, [4.8 * fps, 5.4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [4.8 * fps, 5.4 * fps],
              ["0px 50px", "0px 0px"],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              fontWeight: 700,
              color: "#763823",
            }}
          >
            <span>OLM v1</span>
            <span>AllNamespaces</span>
          </div>
          <div style={{ fontSize: 42, fontWeight: 700, marginTop: 15 }}>
            ClusterCatalog + ClusterExtension
          </div>
          <div style={{ fontSize: 23, marginTop: 10 }}>
            Install namespace · version-specific permissions
          </div>
        </Interactive.Div>
      </div>
      <div
        style={{
          marginTop: 24,
          border: "2px solid #C6C2B9",
          backgroundColor: "#E9E6DF",
          borderRadius: 16,
          padding: "16px 28px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 25,
          color: "#595B54",
        }}
      >
        <strong>OADP operator</strong>
        <span>Shared AllNamespaces implementation</span>
      </div>
    </Stage>
  );
};
export const Installer = Interactive.withSchema({
  Component: InstallerInner,
  componentName: "Installer",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
