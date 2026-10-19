import { Composition, Folder } from "remotion";
import { AllNamespacesExplainer } from "./Composition";
import { Opening } from "./Opening";
import { Installer } from "./Installer";
import { SharedRuntime } from "./SharedRuntime";
import { Delta } from "./Delta";
import { ImageInventory } from "./ImageInventory";
import { CatalogInventory } from "./CatalogInventory";
import { BundleConsumption } from "./BundleConsumption";
import { MirrorFlow } from "./MirrorFlow";
import { ImageResolution } from "./ImageResolution";
import { OfflineInstall } from "./OfflineInstall";
import { Release } from "./Release";
import { Close } from "./Close";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="OADP-AllNamespaces"
      component={AllNamespacesExplainer}
      durationInFrames={4620}
      fps={30}
      width={1280}
      height={720}
    />
    <Folder name="Scenes">
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="Installer"
        component={Installer}
        durationInFrames={360}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="SharedRuntime"
        component={SharedRuntime}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="Delta"
        component={Delta}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ImageInventory"
        component={ImageInventory}
        durationInFrames={420}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="CatalogInventory"
        component={CatalogInventory}
        durationInFrames={540}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="BundleConsumption"
        component={BundleConsumption}
        durationInFrames={480}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="MirrorFlow"
        component={MirrorFlow}
        durationInFrames={480}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ImageResolution"
        component={ImageResolution}
        durationInFrames={480}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="OfflineInstall"
        component={OfflineInstall}
        durationInFrames={420}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="Release"
        component={Release}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="Close"
        component={Close}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
      />
    </Folder>
  </>
);
