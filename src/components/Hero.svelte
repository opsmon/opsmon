<script>
  import { profile } from "../data/profile.js";
  import EngineeringMap from "./EngineeringMap.svelte";
  export let d;
  export let openPalette;
</script>

<section class="hero shell" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow hero-eyebrow">
      <span class="signal-dot" aria-hidden="true"></span>{d.name}
      <span class="role">/ {profile.role}</span>
    </p>
    <h1 id="hero-title">
      {d.titleLines[0]}<br /><span>{d.titleLines[1]}</span>
    </h1>
    <p class="hero-lead">{d.intro}</p>
    <div class="actions">
      <a class="button primary" href="#projects"
        >{d.explore}<span aria-hidden="true">↗</span></a
      ><a class="button secondary" href="#contact"
        >{d.touch}<span aria-hidden="true">↗</span></a
      >
    </div>
    <div class="hero-links">
      <a href={profile.github}>GitHub ↗</a><a href={profile.linkedin}
        >LinkedIn ↗</a
      ><span class="divider"></span><button class="hint" on:click={openPalette}
        >{d.hint} <kbd>⌘ / Ctrl K</kbd></button
      >
    </div>
  </div>
  <EngineeringMap {d} />
</section>
<section class="highlights shell" aria-label={d.metrics.aria}>
  {#each d.metrics.items as [value, label]}<div>
      <strong>{value}</strong><span>{label}</span>
    </div>{/each}
</section>
