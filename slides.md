---
theme: default
title: 'OADP: Same scope, new front door'
info: |
  OLM v0 and OLM v1 AllNamespaces installation, shared OADP runtime,
  and disconnected image handling. Based on proposed PR #2488.
author: Tiger Kaovilai
keywords: OADP, OLM v1, AllNamespaces, disconnected, oc-mirror
layout: default
chapter: 01 / OADP WITH OLM V1
class: opening
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1280
transition: fade
routerMode: hash
favicon: ./public/favicon.svg
fonts:
  provider: none
  sans: Arial
  mono: Courier New
presenter: dev
browserExporter: false
download: false
selectable: true
drawings:
  enabled: false
---

<div class="hero">
<div>
<h1>Same scope.<br><span class="accent">New front door.</span></h1>
<p class="lede">OLM v0 → OLM v1<br>AllNamespaces on both sides</p>
<span class="pill">Proposed shared OADP baseline</span>
</div>
<Clawd class="hero-mascot" />
</div>

<ClawdNote text="OLM v1 brings a new installation workflow to OADP’s proposed AllNamespaces support, building on the shared operator runtime." />

---
chapter: 02 / THE INSTALLER LAYER
---

# A new <span class="accent">front door.</span>

<p class="lede">Catalog discovery, installation, and lifecycle management move to OLM v1.</p>

<div class="cards two">
<div class="card coral">
<span class="eyebrow">OLM v0 · AllNamespaces</span>
<h2>CatalogSource<br>+ Subscription</h2>
<p>Global OperatorGroup<br>InstallPlan / CSV lifecycle</p>
</div>
<div class="card coral">
<span class="eyebrow">OLM v1 · AllNamespaces</span>
<h2>ClusterCatalog<br>+ ClusterExtension</h2>
<p>catalogd + Operator Controller<br>Version-specific install permissions</p>
</div>
</div>
<div class="strip"><strong>Shared OADP runtime</strong><span>Operator · DPA reconciliation · operands</span></div>

<ClawdNote text="The installer changes how OLM discovers and manages OADP. The proposed shared AllNamespaces implementation supplies the runtime." />

---
chapter: 03 / THE SHARED RUNTIME
---

# One shared <span class="accent">OADP baseline.</span>

<p class="lede">PR #2488 provides the proposed AllNamespaces enablement.</p>

<div class="cards three">
<div class="card"><span class="eyebrow">Operator</span><h2>Same image</h2><p>Both installation paths are designed to deploy the shared OADP binary.</p></div>
<div class="card"><span class="eyebrow">Reconciliation</span><h2>Same logic</h2><p>DPA configuration drives Velero, plugins, and node-agent resources.</p></div>
<div class="card"><span class="eyebrow">Image inputs</span><h2>Same wiring</h2><p><code>RELATED_IMAGE_*</code> values remain the operator’s image inputs.</p></div>
</div>
<p class="small"><a href="https://github.com/openshift/oadp-operator/pull/2488" target="_blank" rel="noopener noreferrer">Shared implementation: openshift/oadp-operator#2488 ↗</a></p>

<ClawdNote text="Reuse is the design goal. Integration testing checks that both installers supply the namespace, environment, and permissions OADP needs." />

---
chapter: 04 / THE INSTALL CONTRACT
---

# Focus the <span class="accent">integration checks.</span>

<p class="lede">The shared runtime receives equivalent inputs through a new installation workflow.</p>

<div class="checklist">
<div><strong>Catalog + install resources</strong><span>ClusterCatalog and ClusterExtension</span></div>
<div><strong>Permissions + RBAC</strong><span>Match the target OpenShift / OLM release</span></div>
<div><strong>Namespace + environment</strong><span>Preserve OADP’s runtime configuration</span></div>
<div><strong>Lifecycle</strong><span>Exercise installation, upgrade, and resource ownership</span></div>
</div>

<ClawdNote text="OLM v1 reads the registry+v1 bundle’s CSV as installation data. Validate the resulting resources against the selected release." />

---
chapter: 05 / IMAGE INVENTORY AND RUNTIME
---

# Image metadata <span class="accent">in the bundle.</span>

<p class="lede">The CSV packages mirror inventory and operator Deployment configuration.</p>

<div class="cards two">
<div class="card">
<span class="eyebrow">Mirror inventory · CSV spec</span>
<pre class="code-sample">spec:
  relatedImages:
  - name: velero
    image: &lt;digest pullspec&gt;</pre>
</div>
<div class="card">
<span class="eyebrow">Runtime input · Deployment</span>
<pre class="code-sample">env:
- name: RELATED_IMAGE_VELERO
  value: &lt;same pullspec&gt;</pre>
<p class="small">→ Velero + node-agent Pods</p>
</div>
</div>
<a class="source-path" href="https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/bundle/manifests/oadp-operator.clusterserviceversion.yaml#L1827-L1863" target="_blank" rel="noopener noreferrer">bundle/manifests/oadp-operator.clusterserviceversion.yaml → spec.relatedImages ↗</a>

<ClawdNote text="spec.relatedImages lists images for mirroring. Deployment environment values tell OADP which images to run. These snippets illustrate the two roles." />

---
chapter: 06 / THE CATALOG HANDOFF
---

# Two fields. <span class="accent">Two jobs.</span>

<p class="lede"><code>opm render</code> carries bundle image data into a file-based catalog (FBC).</p>

<div class="cards two">
<div class="card coral">
<span class="eyebrow">FBC · olm.bundle entry</span>
<pre class="code-sample">schema: olm.bundle
image: &lt;bundle pullspec&gt;
relatedImages:
- name: velero
  image: &lt;velero pullspec&gt;</pre>
</div>
<div class="card white">
<h2><code>image</code> → installation</h2>
<p>OLM v1 fetches this bundle for the selected version.</p>
<h2 style="margin-top: 23px"><code>relatedImages</code> → mirroring</h2>
<p>oc-mirror copies the known image inventory.</p>
</div>
</div>
<p class="small">opm includes CSV related images, the bundle image, and deployment images.</p>

<ClawdNote text="The catalog serves both workflows: image inventory prepares the mirror, and the selected bundle supplies installation content." />

---
chapter: 07 / THE BUNDLE HANDOFF
---

# Shared format. <span class="accent">New install flow.</span>

<p class="lede">ClusterExtension → select bundle → fetch registry+v1 content</p>

<div class="cards three">
<div class="card"><span class="eyebrow">1 · Bundle input</span><h2>CSV + manifests</h2><p>Deployment + environment<br>RBAC declarations<br>CRDs + other resources</p></div>
<div class="card coral"><span class="eyebrow">2 · OLM v1 rendering</span><h2>Render → install</h2><p>Convert bundle data into native objects, then install through internal Helm conversion.</p></div>
<div class="card"><span class="eyebrow">3 · Installed resources</span><h2>Native objects</h2><p>Deployment, RBAC, CRDs<br><code>RELATED_IMAGE_*</code> retained<br>Managed through OLM v1</p></div>
</div>
<p class="small">Check bundle compatibility against the target OpenShift release.</p>

<ClawdNote text="OLM v1 reads the bundle’s CSV and renders its install data. ClusterExtension and Operator Controller manage installation and upgrades." />

---
chapter: 08 / PACK FOR DISCONNECTED
---

# Bring the <span class="accent">whole image set.</span>

<p class="lede">CSV <code>spec.relatedImages</code> → opm → FBC <code>olm.bundle.relatedImages</code></p>

<div class="cards four">
<div class="card coral"><h2>Catalog</h2><p>Filtered metadata for the selected releases</p></div>
<div class="card coral"><h2>Bundle</h2><p>CSV, CRDs, and installation manifests</p></div>
<div class="card"><h2>Operator</h2><p>The shared OADP binary</p></div>
<div class="card"><h2>Operands</h2><p>Velero, plugins, and declared helpers</p></div>
</div>
<div class="strip flow"><strong>oc-mirror v2</strong><span class="arrow">→</span><strong>Archive transfer</strong><span class="arrow">→</span><strong>Private registry</strong></div>
<p class="small">Include custom plugins and image overrides through <code>additionalImages</code>.</p>

<ClawdNote text="Mirror the catalog, bundle, operator, and operand images. Add custom image choices to the mirror configuration before going offline." />

---
chapter: 09 / MIRROR RESOLUTION
---

# Names stay. <span class="accent">Pulls move.</span>

<p class="lede">OADP reads <code>RELATED_IMAGE_VELERO</code> and writes the Pod image reference.</p>

<div class="flow" style="margin-top: 28px">
<div class="card" style="flex: 1"><span class="eyebrow">Pod requests</span><pre class="code-sample">source.example/velero
@sha256:…</pre></div>
<div style="text-align: center; width: 170px"><strong>IDMS</strong><div class="arrow">→</div><span class="small">same digest</span></div>
<div class="card coral" style="flex: 1"><span class="eyebrow">Pull resolves to</span><pre class="code-sample">mirror.local/velero
@sha256:…</pre></div>
</div>
<div class="strip"><span><strong>IDMS</strong> · ImageDigestMirrorSet</span><span><strong>ITMS</strong> · ImageTagMirrorSet</span></div>
<p class="small">IDMS handles digests; ITMS handles tags. ClusterCatalog points at the mirrored catalog.</p>

<ClawdNote text="Image references stay in place while mirror rules resolve pulls to private registry copies. The pullspecs here illustrate digest-based routing." />

---
chapter: 10 / THE OFFLINE INSTALL PATH
---

# Install locally. <span class="accent">Two pull layers.</span>

<p class="lede">Apply ClusterCatalog and mirror rules. Create a ClusterExtension to install.</p>

<table>
<thead><tr><th>Request</th><th>Fetcher</th><th>Private registry content</th></tr></thead>
<tbody>
<tr class="installer-row"><td><strong>ClusterCatalog</strong></td><td>catalogd</td><td>Catalog → metadata</td></tr>
<tr class="installer-row"><td><strong>ClusterExtension</strong></td><td>Operator Controller</td><td>Bundle → manifests</td></tr>
<tr class="runtime-row"><td><strong>Workload Pods</strong></td><td>kubelet / CRI-O</td><td>Operator + operands</td></tr>
</tbody>
</table>
<p class="small">Controllers read installation artifacts. Nodes pull the containers that run OADP.</p>

<ClawdNote text="The disconnected workflow covers both installation-content fetches and workload image pulls, each with registry access and trust configured." />

---
chapter: 11 / REGISTRY ACCESS AND TRUST
---

# Prepare <span class="accent">both pull layers.</span>

<p class="lede">OpenShift 4.20 integrates mirror, credential, and CA configuration with the controllers.</p>

<div class="cards three">
<div class="card coral"><h2>Mirror rules</h2><p>Configure IDMS / ITMS coverage and the intended source-fallback policy.</p></div>
<div class="card coral"><h2>Credentials</h2><p>Provide registry access for controllers, workload pulls, and the mirroring host.</p></div>
<div class="card coral"><h2>CA trust</h2><p>Configure registry trust and verify rollout to controllers and nodes.</p></div>
</div>
<p class="small">Check the deployed release’s controller wiring, pull-secret configuration, and trusted CA mounts.</p>

<ClawdNote text="Validate each fetch path after configuration rolls out. The OpenShift 4.20 integration is the reference for these disconnected-install details." />

---
chapter: 12 / THREE INSTALL OPTIONS
---

# One release. <span class="accent">Three options.</span>

<p class="lede">A proposed release plan built around shared OADP enablement.</p>

<table>
<thead><tr><th>Installation path</th><th>Role in the release</th></tr></thead>
<tbody>
<tr><td><strong>OLM v0 · OwnNamespace</strong></td><td>Existing namespaced option</td></tr>
<tr><td><strong>OLM v0 · AllNamespaces</strong></td><td>Shared AllNamespaces baseline</td></tr>
<tr><td><strong>OLM v1 · AllNamespaces</strong></td><td>New installer, same proposed baseline</td></tr>
</tbody>
</table>
<p class="small">Choose one installation path per OADP deployment and keep resource ownership clear.</p>

<ClawdNote text="The release plan pairs both AllNamespaces paths with the existing OwnNamespace option, with validation across all three choices." />

---
chapter: 13 / RELEASE VALIDATION
---

# Reuse the code. <span class="accent">Prove the paths.</span>

<p class="lede">Release gates cover installation, runtime behavior, and disconnected operation.</p>

<div class="checklist">
<div><strong>Install + upgrade</strong><span>Permissions, namespace wiring, and resource retention</span></div>
<div><strong>Backup + restore</strong><span>DPA reconciliation, operands, and storage access</span></div>
<div><strong>Fresh offline pulls</strong><span>Catalog, bundle, operator, and operand images</span></div>
<div><strong>Existing-mode regression</strong><span>OwnNamespace behavior and isolation</span></div>
</div>
<p class="small"><strong>Offline gate:</strong> block external registries and exercise fresh pulls to expose missing mirror content.</p>

<ClawdNote text="Shared image logic and focused installer checks form the plan. Cluster validation and downstream release-image verification remain release prerequisites." />

---
chapter: 14 / REFERENCES
---

# Follow the <span class="accent">implementation.</span>

<p class="lede">Public sources behind the architecture and disconnected workflow.</p>

<div class="references">
<a href="https://github.com/openshift/oadp-operator/pull/2488" target="_blank" rel="noopener noreferrer">OADP AllNamespaces proposal ↗<small>openshift/oadp-operator#2488</small></a>
<a href="https://github.com/openshift/oadp-operator/blob/b11c0bcb0c9a533ab63c4a4987b9f3c768ea6e41/bundle/manifests/oadp-operator.clusterserviceversion.yaml#L1827-L1863" target="_blank" rel="noopener noreferrer">CSV image inventory ↗<small>Pinned spec.relatedImages source</small></a>
<a href="https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/extensions/cluster-extensions" target="_blank" rel="noopener noreferrer">OpenShift 4.20 cluster extensions ↗<small>Installation and lifecycle</small></a>
<a href="https://docs.redhat.com/en/documentation/openshift_container_platform/4.20/html/disconnected_environments/about-installing-oc-mirror-v2" target="_blank" rel="noopener noreferrer">oc-mirror v2 documentation ↗<small>Disconnected image preparation</small></a>
<a href="https://github.com/kaovilai/oadp-olm-video/blob/main/SOURCES.md" target="_blank" rel="noopener noreferrer">Evidence and validation scope ↗<small>Pinned implementation references</small></a>
<a href="https://github.com/kaovilai/oadp-olm-video" target="_blank" rel="noopener noreferrer">Presentation source ↗<small>Slidev deck, Clawd, and original video source</small></a>
</div>

<ClawdNote text="The source links document the shared runtime, catalog inventory, and OLM v1 installation path. Use the target release’s artifacts for validation." />
