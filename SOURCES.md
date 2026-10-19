# Evidence and editorial scope

Verified 2026-10-19. The Slidev presentation and retained Remotion source compare **OLM v0 AllNamespaces against OLM v1 AllNamespaces**, using the proposed shared AllNamespaces implementation in [openshift/oadp-operator#2488](https://github.com/openshift/oadp-operator/pull/2488) as the baseline. It does not claim openshift/oadp-operator#2488 is merged, OLM v1 is tested, or all AllNamespaces enablement is configuration-only.

## Pinned evidence

- PR head: `b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41`.
- PR base/merge-base: `fa3a813b884fcaab9f7e27722d108252fb0827a7`.
- Refreshed upstream/oadp-dev: `c35d5b1f1e436e12e26743a9f0f88a753ba3d8c2`.
- operator-framework/operator-controller reference: `e4955df6f9c1a5d79450eed502c5c5bfe47cef62`.

## Claims used

1. **The net architectural change is the installer/lifecycle layer, not a version-specific OADP controller fork.** PR `cmd/main.go:182-210` constructs the shared manager; `cmd/main.go:350-371` handles namespace inputs. No OLM-generation branch was found in `cmd/`, `internal/`, or `pkg/`. This supports a shared-image design, not a claim of tested v1 compatibility or a guarantee that integration will uncover no required changes.
2. **OLM v0 installation:** CatalogSource, Subscription/InstallPlan/CSV, global OperatorGroup for AllNamespaces. PR `Makefile:648`, `:672-683`, `:700-742`.
3. **OLM v1 installation:** ClusterCatalog and ClusterExtension. See official [catalog tutorial](https://operator-framework.github.io/operator-controller/tutorials/add-catalog/), [installation tutorial](https://operator-framework.github.io/operator-controller/tutorials/install-extension/), and [upgrade tutorial](https://operator-framework.github.io/operator-controller/tutorials/upgrade-extension/).
4. **The CSV format has not simply vanished.** OLM v1 can consume registry+v1 bundles containing a CSV; CSV is not the installed v0 lifecycle path. [Pinned official limitations](https://github.com/operator-framework/operator-controller/blob/e4955df6f9c1a5d79450eed502c5c5bfe47cef62/docs/project/olmv1_limitations.md#L8-L9).
5. **Install-permission details are version-specific.** Do not claim every v1 release requires the user to create an extension installer service account. Latest referenced upstream marks `spec.serviceAccount` deprecated/ignored in favor of operator-controller's own SA. [Pinned API](https://github.com/operator-framework/operator-controller/blob/e4955df6f9c1a5d79450eed502c5c5bfe47cef62/api/v1/clusterextension_types.go#L89-L97). Check the actual OpenShift/OLM version before applying manifests.
6. **Existing namespaced option means OwnNamespace in this OADP CSV**, not the separate OLM SingleNamespace enumeration. Retention of install-mode metadata alone does not prove unchanged watch scope or isolation. PR openshift/oadp-operator#2488 removes the manager cache namespace restriction; regressions need explicit review and tests.
7. **Co-shipping is not concurrent overlapping installation.** The three options are release choices. The video does not recommend overlapping OADP controllers or automatic v0-to-v1 migration in one cluster.

## Disconnected image handling

### Scope

The offline scenes use **OpenShift 4.20 documentation**, plus the following pinned release-4.20 integration sources inspected on 2026-10-19:

- openshift/operator-framework-operator-controller: `30b46d6cf509fe0f6879cc2699acd51f940068b6`.
- openshift/oc-mirror: `9786cf2e90c1dbf504b528d83142e946339f9d5d`.
- operator-framework/operator-registry: `v1.50.0`.

These are source references, not proof that a particular 4.20.z cluster runs those exact commits. Check the deployed release. Do not substitute latest upstream defaults for OpenShift release behavior. In particular, the [4.20 ClusterExtension path](https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/extensions/cluster-extensions) specifies an install service account; the newer upstream API cited above differs. Neither is the operator's own runtime service account.

### 1. Inventory persists; it is not runtime configuration

- The field is **CSV `spec.relatedImages`**, not `status.relatedImages`. [OADP CSV inventory](https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/bundle/manifests/oadp-operator.clusterserviceversion.yaml#L1827-L1863); `spec` begins at line 330.
- `opm render` turns registry+v1 bundle data into FBC `olm.bundle.relatedImages`, collecting CSV related images and adding the bundle and deployment images. [Pinned renderer](https://github.com/operator-framework/operator-registry/blob/v1.50.0/alpha/action/render.go#L351-L396).
- `oc-mirror v2` filters catalog bundles and reads that inventory. [Filtered collector](https://github.com/openshift/oc-mirror/blob/9786cf2e90c1dbf504b528d83142e946339f9d5d/v2/internal/pkg/operator/filtered_collector.go), [image classification](https://github.com/openshift/oc-mirror/blob/9786cf2e90c1dbf504b528d83142e946339f9d5d/v2/internal/pkg/operator/catalog_handler.go).
- FBC is not exclusive to OLM v1; OLM v0 can also use it. See [4.20 catalogs](https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/extensions/catalogs).
- The operator Deployment separately declares `RELATED_IMAGE_VELERO`. A related-image name does not create an environment variable. [CSV env value](https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/bundle/manifests/oadp-operator.clusterserviceversion.yaml#L1520-L1521).
- OADP resolution order is DPA unsupported override → environment value → compiled fallback. It passes the selected string to PodSpecs, not through a registry or mirror-policy resolver. [Resolver](https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/internal/controller/velero.go#L948-L956), [Velero Deployment](https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/internal/controller/velero.go#L337-L339), [node-agent uses the same image](https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/internal/controller/nodeagent.go#L442-L447).
- PR base/head inventory and all `RELATED_IMAGE_*` name/value entries were compared: unchanged. The relevant resolvers and image placement are also unchanged. This supports reusing the image path, not certifying all v1 behavior.
- Upstream PR inventory/env examples use `:latest`. No downstream release bundle/digest inventory was verified. The video deliberately uses symbolic digest placeholders, not executable release YAML.

### 1a. Shared artifact format does not require OLM v0

The two additional handoff scenes distinguish **a CSV file packaged inside a registry+v1 bundle** from **an installed ClusterServiceVersion custom resource managed by OLM v0**. `registry+v1` is a bundle-format name; it is not a dependency on OLM v0 controllers.

1. **CSV remains a required input for this path.** The pinned v1 bundle reader classifies the CSV separately from CRDs and other manifests; it errors if the CSV is absent. [Bundle source parser, lines 95–129](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/operator-controller/rukpak/bundle/source/source.go#L95-L129). Do not say that OLM v1 no longer reads CSV data, and do not strip the CSV from this bundle format.
2. **Inventory handoff happens during catalog production.** In the demonstrated `opm render` workflow, CSV related images plus bundle/deployment images become FBC `olm.bundle.relatedImages`. This does not require querying an installed CSV or a running OLM v0 service, nor does every arbitrary catalog-building workflow automatically reconstruct inventory. [Pinned opm renderer, lines 319–396](https://github.com/operator-framework/operator-registry/blob/ed8d23bef591f894839f9f85f82c000f1a9c231a/alpha/action/render.go#L319-L396).
3. **Mirroring and installation consume different data for different purposes.** oc-mirror traverses FBC bundle entries and their `RelatedImages`, then forms copy tasks. [Catalog handler, lines 450–491](https://github.com/openshift/oc-mirror/blob/9786cf2e90c1dbf504b528d83142e946339f9d5d/v2/internal/pkg/operator/catalog_handler.go#L450-L491), [filtered collector, lines 87–104](https://github.com/openshift/oc-mirror/blob/9786cf2e90c1dbf504b528d83142e946339f9d5d/v2/internal/pkg/operator/filtered_collector.go#L87-L104). Operator Controller first selects a bundle using package/channel/version and other catalog constraints, then fetches `resolvedBundle.Image`. The `image` field is a location, not itself the version-selection algorithm. [Resolver, lines 99–146](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/operator-controller/resolve/catalog.go#L99-L146), [bundle pull, lines 261–264](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/operator-controller/controllers/clusterextension_controller.go#L261-L264).
4. **The original CSV is not emitted as an installed CSV CR.** The parser stores it separately; rendering generates service accounts, RBAC, Deployments, CRDs, and other allowed resources. There is no original-CSV generator in this path. [Generator list, lines 32–48](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/operator-controller/rukpak/render/registryv1/registryv1.go#L32-L48). The output becomes Helm chart templates, then is installed/upgraded. [Conversion, lines 42–78](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/operator-controller/rukpak/convert/helm.go#L42-L78), [Helm applier, lines 171–186](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/operator-controller/applier/helm.go#L171-L186).
5. **No v0 dependency in this installation chain is not universal compatibility.** The v1 path does not use a v0 controller, Subscription, or InstallPlan. That does not prohibit v0/v1 coexistence in a cluster, prove an arbitrary operator has no v0-specific assumptions, or guarantee all classic bundles work. The pinned conversion rejects owned APIService entries and gates webhooks on additional support. [Compatibility checks, lines 26–39](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/operator-controller/rukpak/convert/helm.go#L26-L39).

**Practical message:** keep publishing complete CSV/catalog image inventory. Reuse the format and OADP's existing image environment inputs; do not expect OLM v1 to create operand Pods or environment variables from `relatedImages`.

### 2. Copy images and route pulls—not a bulk CSV rewrite

The set must cover the selected **catalog, bundle, operator, and declared operand/helper images**. User overrides and custom plugins can add images absent from static inventory; include them explicitly, such as through `additionalImages`. [Custom plugin image placement](https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/internal/controller/velero.go#L728-L739). An inventory entry is not a promise that every listed image runs in every configuration.

The researched oc-mirror v2 path copies image content, rebuilds the filtered catalog, writes the target catalog into `ClusterCatalog.spec.source.image.ref`, and generates ImageDigestMirrorSet / ImageTagMirrorSet resources. It also generates the classic CatalogSource resource; the v1 installation uses ClusterCatalog. [4.20 oc-mirror v2](https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/disconnected_environments/about-installing-oc-mirror-v2), [target catalog reference generation](https://github.com/openshift/oc-mirror/blob/9786cf2e90c1dbf504b528d83142e946339f9d5d/v2/internal/pkg/clusterresources/clusterresources.go#L223-L247), [catalog rebuild](https://github.com/openshift/oc-mirror/blob/9786cf2e90c1dbf504b528d83142e946339f9d5d/v2/internal/pkg/imagebuilder/catalog_builder.go).

This path does **not** bulk-rewrite bundle CSV deployment images/environment values or all FBC bundle/operand references to private addresses. OLM v1's registry+v1 renderer copies the CSV deployment spec; it does not synthesize `RELATED_IMAGE_*` from the inventory. [Deployment renderer](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/operator-controller/rukpak/render/registryv1/generators/generators.go#L62-L104).

Thus an original source pullspec can remain in operator env and generated Pods while the pull resolver obtains its mirror copy. **IDMS matches digest references; ITMS matches tag references.** These rules do not mutate API-stored Pod image strings or environment values. Source fallback depends on `mirrorSourcePolicy`; do not rely on fallback in a strict disconnected test. `imagePullPolicy` is yet another, separate mechanism.

### 3. Controllers fetch installation content; nodes pull workloads

- **catalogd:** directly retrieves the catalog OCI image and serves its FBC metadata.
- **Operator Controller:** selects and fetches the bundle, renders its CSV/CRDs/manifests, and installs resources (internally through Helm conversion).
- **kubelet / CRI-O:** pulls the operator and operand containers that actually run.

Catalog and bundle content is fetched in-process; those artifacts are not workload containers executed by kubelet. [4.20 architecture](https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/extensions/architecture), [image pull implementation](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/shared/util/image/pull.go), [Helm conversion](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/internal/operator-controller/rukpak/convert/helm.go).

**OpenShift 4.20 integration provides mirror/auth/trust wiring to both controllers:** host-mounted `/etc/containers` and `/etc/docker`, `--global-pull-secret=openshift-config/pull-secret`, and trusted CA projection with `SSL_CERT_DIR`. [catalogd deployment](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/openshift/catalogd/manifests/18-deployment-openshift-catalogd-catalogd-controller-manager.yml), [Operator Controller deployment](https://github.com/openshift/operator-framework-operator-controller/blob/30b46d6cf509fe0f6879cc2699acd51f940068b6/openshift/operator-controller/manifests/20-deployment-openshift-operator-controller-operator-controller-controller-manager.yml).

Cluster administrators must supply mirror registry credentials and CA trust, and wait for configuration rollout. Registry trust uses image configuration such as `additionalTrustedCA`; catalogd's HTTPS-serving CA is a different concern. A namespace workload pull secret alone does not authorize controller registry requests. The oc-mirror host separately needs source/target credentials and trust. Bare upstream/custom controller deployments require inspection of their own wiring. [4.20 image configuration](https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/images/image-configuration-classic).

## Validation not performed

PR AllNamespaces e2e code (`tests/e2e/allnamespaces_suite_test.go:19-23,27-62`) checks OperatorGroup and CSV: v0 evidence, not ClusterExtension evidence. No cluster tests were run for this video.

Proposed release gates:

1. Pin the OpenShift/OLM release and actual downstream catalog/bundle/operator/operand images; check complete inventory and digest/tag policy coverage.
2. Mirror required versions and custom extras; configure credentials, registry CA trust, and mirror rules; verify configuration has reached both controllers and nodes.
3. With external registry access blocked, prove catalog discovery, fresh bundle fetch, operator/operand image pulls, install, and upgrade. Avoid warm caches masking missing mirror content.
4. Validate namespace/environment wiring, SA/RBAC, DPA reconcile, backup/restore, upgrade/resource retention, and v0 OwnNamespace isolation regressions across the proposed options. Image availability alone does not provide a reachable backup storage endpoint or its credentials.
5. Do not treat AllNamespaces as authorization for overlapping controllers or shared ownership of installed objects.

## Creative disclosure

Original vector/pixel depiction of Clawd, the requested Claude mascot. This is a user-created technical explainer, not an official Anthropic or Red Hat endorsement. The video is silent. Previous synthetic narration and its generated audio assets have been removed.

Created with Claude Code (model: gpt-6-astra).
