import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "./Stage";

const OfflineInstallInner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage
      chapter="10 / THE OFFLINE INSTALL PATH"
      speech="OpenShift 4.20 connects the controllers to mirror rules, registry credentials, and CA trust. Configure access and verify rollout before installing."
      source="OpenShift 4.20 integrated deployments · check controller wiring for the target release"
    >
      <Interactive.Div
        name="Offline install headline"
        style={{ fontSize: 65, fontWeight: 750, letterSpacing: -3 }}
      >
        Install locally.{" "}
        <span style={{ color: "#A84B32" }}>Two pull layers.</span>
      </Interactive.Div>
      <div style={{ fontSize: 24, color: "#66645B", marginTop: 13 }}>
        Apply ClusterCatalog + mirror rules. Create a ClusterExtension to
        install.
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "0 24px",
          marginTop: 22,
          marginBottom: 9,
          fontSize: 18,
          fontWeight: 750,
          color: "#66645B",
        }}
      >
        <span>REQUEST</span>
        <span>WHO FETCHES</span>
        <span>PRIVATE REGISTRY CONTENT</span>
      </div>
      <Interactive.Div
        name="Catalog controller pull"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          padding: "17px 24px",
          borderRadius: "14px 14px 0 0",
          backgroundColor: "#F2D8C9",
          fontSize: 25,
        }}
      >
        <strong>ClusterCatalog</strong>
        <span>catalogd</span>
        <span>Catalog → metadata</span>
      </Interactive.Div>
      <Interactive.Div
        name="Bundle controller pull"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          padding: "17px 24px",
          backgroundColor: "#F2D8C9",
          borderTop: "1px solid #D1AA93",
          fontSize: 25,
          opacity: interpolate(frame, [1.4 * fps, 2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <strong>ClusterExtension</strong>
        <span>Operator Controller</span>
        <span>Bundle → manifests</span>
      </Interactive.Div>
      <Interactive.Div
        name="Node runtime image pulls"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          padding: "17px 24px",
          borderRadius: "0 0 14px 14px",
          backgroundColor: "#E9E6DF",
          borderTop: "1px solid #C6C2B9",
          fontSize: 25,
          opacity: interpolate(frame, [2.8 * fps, 3.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <strong>Workload Pods</strong>
        <span>kubelet / CRI-O</span>
        <span>Operator + operands</span>
      </Interactive.Div>
      <div style={{ fontSize: 21, color: "#66645B", marginTop: 15 }}>
        Controllers read installation artifacts. Nodes pull the containers that
        run OADP.
      </div>
    </Stage>
  );
};

export const OfflineInstall = Interactive.withSchema({
  Component: OfflineInstallInner,
  componentName: "OfflineInstall",
  schema: {},
  wrapInSequence: true,
  layout: "absolute-fill",
});
