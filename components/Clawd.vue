<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 160 140"
    role="img"
    aria-label="Clawd, the pixel crab mascot"
    class="clawd"
    shape-rendering="crispEdges"
  >
    <ellipse cx="80" cy="128" rx="55" ry="5" fill="#DDD6C9" />
    <g class="clawd-body">
      <g fill="#CF7859">
        <rect x="29" y="30" width="102" height="70" />
        <rect x="18" y="43" width="11" height="44" />
        <rect x="131" y="43" width="11" height="44" />
        <rect x="39" y="100" width="12" height="25" />
        <rect x="62" y="100" width="12" height="19" />
        <rect x="88" y="100" width="12" height="19" />
        <rect x="111" y="100" width="12" height="25" />
        <g class="clawd-wave">
          <rect x="142" y="35" width="10" height="25" />
          <rect x="151" y="27" width="9" height="13" />
        </g>
      </g>
      <g fill="#B96145">
        <rect x="29" y="89" width="102" height="11" />
        <rect x="39" y="114" width="12" height="11" />
        <rect x="111" y="114" width="12" height="11" />
      </g>
      <g class="clawd-eyes" fill="#242522">
        <rect x="47" y="54" width="10" height="17" />
        <rect x="103" y="54" width="10" height="17" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.clawd {
  display: block;
  height: auto;
  overflow: visible;
}
.clawd-wave {
  transform-origin: 139px 57px;
  animation: wave 3.5s ease-in-out infinite;
}
.clawd-eyes {
  transform-origin: 80px 62px;
  animation: blink 6s infinite;
}
@keyframes wave {
  0%,
  55%,
  100% {
    transform: rotate(0);
  }
  65%,
  85% {
    transform: rotate(-12deg);
  }
  75%,
  95% {
    transform: rotate(5deg);
  }
}
@keyframes blink {
  0%,
  44%,
  48%,
  100% {
    transform: scaleY(1);
  }
  46% {
    transform: scaleY(0.12);
  }
}
@media (prefers-reduced-motion: reduce) {
  .clawd-wave,
  .clawd-eyes {
    animation: none;
  }
}
</style>
