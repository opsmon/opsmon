<script>
  import { skills } from "../data/skills.js";
  export let d;
  let selected = 0;
  const nodes = [0, 1, 2, 5];
  $: group = skills[selected];
  $: tools = [...(group.primary || []), ...group.items].slice(0, 4);
</script>

<aside class="engineering-map" aria-label={d.map}>
  <div class="map-caption">
    <span class="eyebrow">{d.map}</span><span class="mono" aria-hidden="true"
      >[ 01 — 04 ]</span
    >
  </div>
  <div class="map-stage">
    <svg
      class="map-lines"
      viewBox="0 0 440 280"
      preserveAspectRatio="none"
      aria-hidden="true"
      ><path d="M88 62H220V210H355M220 62H355M88 210H220" /><path
        class="signal"
        d="M88 62H220V138H300"
      /><circle cx="220" cy="138" r="5" /><path
        d="M202 120h-8v36h8m36-36h8v36h-8"
      /></svg
    >
    {#each nodes as n, i}<button
        class="map-node node-{i}"
        aria-pressed={selected === n}
        aria-controls="map-detail"
        on:click={() => (selected = n)}
        ><span class="node-symbol" aria-hidden="true"
          >{["◇", "↗", "◎", "⌘"][i]}</span
        ><span>{d.skillNames[n]}</span><span
          class="node-index"
          aria-hidden="true">0{i + 1}</span
        ></button
      >{/each}
  </div>
  <div class="map-detail" id="map-detail" aria-live="polite" aria-atomic="true">
    <p class="eyebrow">{group.direction ? d.exploreNote : d.selected}</p>
    <h2>{d.skillNames[selected]}</h2>
    <p>{d.skillDescriptions[selected]}</p>
    <div class="map-tools mono">{tools.join(" / ")}</div>
  </div>
  <p class="map-footnote">{d.mapNote}</p>
</aside>
