# OADP: Same scope, new front door

A **14-slide, self-paced Slidev presentation** comparing OLM v0 AllNamespaces with OLM v1 AllNamespaces, including shared OADP runtime behavior and disconnected image handling. Clawd guides the presentation through concise callouts, with clickable implementation references.

**[Open the presentation →](https://kaovilai.github.io/oadp-olm-video/)**

## Present

- Use the arrow keys, Space, or Slidev's navigation controls to advance.
- Open the slide overview to jump between topics.
- Share a slide directly, for example [the image inventory](https://kaovilai.github.io/oadp-olm-video/#/5).
- Source links open in a separate tab.
- The deck is silent. Mascot animation respects the browser's reduced-motion preference.

## Story

| Slide | Topic                      | Message                                                                                                 |
| ----- | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1     | Same scope, new front door | A new installer for the proposed shared AllNamespaces runtime.                                          |
| 2     | Installer layer            | CatalogSource/Subscription and ClusterCatalog/ClusterExtension manage different installation workflows. |
| 3     | Shared runtime             | Reuse the proposed OADP image, reconciliation logic, and image inputs.                                  |
| 4     | Install contract           | Check permissions, namespace configuration, and lifecycle behavior.                                     |
| 5     | Image metadata             | CSV `spec.relatedImages` supplies mirror inventory; Deployment env supplies runtime inputs.             |
| 6     | Catalog handoff            | FBC `image` locates the selected bundle; `relatedImages` inventories mirror content.                    |
| 7     | Bundle handoff             | OLM v1 renders CSV package data into native resources.                                                  |
| 8     | Mirror preparation         | Copy catalog, bundle, operator, operands, and custom extras.                                            |
| 9     | Mirror resolution          | Digest and tag rules resolve image pulls to private registry copies.                                    |
| 10    | Offline installation       | Controllers fetch installation artifacts; nodes pull workloads.                                         |
| 11    | Registry access            | Configure mirror policy, credentials, and CA trust for both pull layers.                                |
| 12    | Release options            | Propose v0 OwnNamespace, v0 AllNamespaces, and v1 AllNamespaces choices.                                |
| 13    | Release validation         | Exercise install, upgrade, backup/restore, isolation, and fresh offline pulls.                          |
| 14    | References                 | Open the source proposal, inventory, documentation, and evidence.                                       |

## Source inventory

[**`bundle/manifests/oadp-operator.clusterserviceversion.yaml` → `spec.relatedImages`, lines 1827–1863**](https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/bundle/manifests/oadp-operator.clusterserviceversion.yaml#L1827-L1863)

Pinned to the researched [openshift/oadp-operator#2488](https://github.com/openshift/oadp-operator/pull/2488) commit. `opm render` carries the source inventory into FBC `olm.bundle.relatedImages`, which `oc-mirror v2` consumes. Offline installation uses published release catalogs and bundles; the linked upstream snapshot contains development image tags.

The registry+v1 bundle carries the CSV's Deployment/RBAC data. OLM v1 renders this into native resources and installs through internal Helm conversion. The operator retains its `RELATED_IMAGE_*` environment values, and mirror rules resolve its image pulls.

## Scope and validation

- PR openshift/oadp-operator#2488 is the proposed shared AllNamespaces baseline. OLM v1 readiness remains subject to integration testing.
- Disconnected details use **OpenShift 4.20 documentation and pinned release-4.20 integration code**, with **oc-mirror v2**. Check the deployed release's permissions and registry wiring.
- Mirror the release inventory plus custom plugin/override images; validate fresh pulls with external registry access blocked.
- Choose one installation path per OADP deployment and maintain clear resource ownership.
- Cluster testing and downstream release-image inventory verification remain release prerequisites.

Full implementation citations and validation boundaries: **[SOURCES.md](SOURCES.md)**.

## Develop

Use **Node.js 24 LTS** and npm.

```sh
npm ci
npm run dev
```

Slidev opens at `http://localhost:3030`. Edit `slides.md`; the preview reloads automatically.

- `slides.md`: slide content and Slidev configuration.
- `components/`: animated Clawd and takeaway callouts.
- `layouts/default.vue`: shared header, footer, and slide frame.
- `styles/index.css`: cream/coral presentation styling.
- `public/favicon.svg`: locally bundled mascot icon.

## Build and preview the static site

```sh
npm run lint
npm run build
npm run preview
```

Open `http://localhost:4173/oadp-olm-video/`. The build writes `dist/` with the Pages base path `/oadp-olm-video/`. Hash routing supports direct slide URLs and refreshes on static hosting. Fonts use the system stack; the application bundles its own assets. Speaker mode is available during development.

## GitHub Pages

`.github/workflows/pages.yml` validates and builds each pull request. Pushes to `main` also upload the static artifact and deploy it to GitHub Pages using the `github-pages` environment.

Repository **Settings → Pages → Source** is **GitHub Actions**. The workflow uses GitHub's short-lived deployment token; it requires `pages: write` and `id-token: write` only in the deployment job. Generated `dist/` content stays outside Git history.

## Original Remotion project

The original **154-second silent video source** remains in `src/`, alongside its configuration and dependencies:

```sh
npm run video:dev
npm run video:build
```

The Slidev deck is the primary presentation. The video source remains available for future editing; video export is optional.

## Dependency maintenance

On 2026-10-19, `npm audit` reports **17 upstream transitive dependency findings** (6 moderate, 11 high), rooted in `braces`, `image-size`, and `sprintf-js` in Slidev's build/export toolchain. DOMPurify is pinned to the compatible patched release `3.4.17`. The published deck serves fixed static assets, with presenter mode limited to development and browser export disabled. Build only reviewed slide sources and track compatible upstream dependency fixes.

## Credits

Clawd artwork is an original pixel depiction derived from [kaovilai/video-assets](https://github.com/kaovilai/video-assets). This is a user-created technical presentation. No official Anthropic or Red Hat endorsement is implied.

Created with Claude Code (model: gpt-6-astra). Slidev and theme dependencies retain their respective licenses. Check [Remotion licensing](https://www.remotion.dev/license) when using the retained video tooling.
