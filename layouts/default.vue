<template>
  <div class="slidev-layout oadp-slide">
    <header class="deck-header">
      <span>OADP / ALLNAMESPACES</span>
      <span class="chapter">{{ $frontmatter.chapter }}</span>
    </header>
    <main class="slide-content"><slot /></main>
    <footer class="deck-footer">
      <a
        href="https://github.com/kaovilai/oadp-olm-video/blob/main/SOURCES.md"
        target="_blank"
        rel="noopener noreferrer"
        >Sources &amp; release scope ↗</a
      >
      <span>{{ $page }} / {{ $nav.total }}</span>
    </footer>
  </div>
</template>
