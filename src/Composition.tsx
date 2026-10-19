import { TransitionSeries } from "@remotion/transitions";
import { useVideoConfig } from "remotion";
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

export const AllNamespacesExplainer = () => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        name="Same scope, new front door"
        durationInFrames={8 * fps}
        premountFor={fps}
      >
        <Opening premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="Spotlight the installer"
        durationInFrames={12 * fps}
        premountFor={fps}
      >
        <Installer premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="Shared AllNamespaces baseline"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <SharedRuntime premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="The v1 install contract"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <Delta premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="CSV inventory and runtime inputs"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <ImageInventory premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="Catalog metadata for mirroring and installation"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <CatalogInventory premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="Bundle data to native resources"
        durationInFrames={16 * fps}
        premountFor={fps}
      >
        <BundleConsumption premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="Mirror the whole image set"
        durationInFrames={16 * fps}
        premountFor={fps}
      >
        <MirrorFlow premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="Image references and mirror resolution"
        durationInFrames={16 * fps}
        premountFor={fps}
      >
        <ImageResolution premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="Offline controller and node pulls"
        durationInFrames={14 * fps}
        premountFor={fps}
      >
        <OfflineInstall premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="One release, three options"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <Release premountFor={fps} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="Release gate"
        durationInFrames={10 * fps}
        premountFor={fps}
      >
        <Close premountFor={fps} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
