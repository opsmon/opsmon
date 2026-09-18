<script>
  import { skills } from "../data/skills.js";
  import { reveal } from "../lib/reveal.js";
  export let d;
  let selected = 0;
  $: group = skills[selected];
  $: primary = group.primary || group.items.slice(0, 3);
  $: rest = group.primary ? group.items : group.items.slice(3);
</script>

<section
  class="section shell"
  id="skills"
  tabindex="-1"
  aria-labelledby="skills-title"
  use:reveal
>
  <div class="section-heading">
    <div>
      <p class="eyebrow"><span>03</span> / {d.sections.skills}</p>
      <h2 id="skills-title">{d.skills.title}</h2>
    </div>
  </div>
  <div class="stack-layout">
    <div class="stack-selector" role="group" aria-label={d.sections.skills}>
      {#each skills as skill, i}<button
          aria-pressed={selected === i}
          aria-controls="stack-detail"
          on:click={() => (selected = i)}
          ><span class="mono">0{i + 1}</span>{d.skillNames[i]}<span
            aria-hidden="true">{selected === i ? "↗" : "+"}</span
          ></button
        >{/each}
    </div>
    <div
      class="stack-detail"
      id="stack-detail"
      aria-live="polite"
      aria-atomic="true"
    >
      <p class="eyebrow">{group.direction ? d.exploreNote : d.primaryTools}</p>
      <h3>{d.skillNames[selected]}</h3>
      <p>{d.skillDescriptions[selected]}</p>
      <div class="primary-tools">
        {#each primary as tool}<span>{tool}</span>{/each}
      </div>
      {#key selected}<details>
          <summary>{d.allTools}<span aria-hidden="true">+</span></summary>
          <div class="tags">
            {#each rest as tool}<span>{tool}</span>{/each}
          </div>
        </details>{/key}
    </div>
  </div>
</section>
