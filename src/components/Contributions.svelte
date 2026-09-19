<script>
  import { contributions } from "../data/contributions.js";
  import { reveal } from "../lib/reveal.js";
  export let d;
  export let language;
</script>

<section
  class="section shell contributions"
  id="contributions"
  tabindex="-1"
  aria-labelledby="contributions-title"
  use:reveal
>
  <div>
    <p class="eyebrow"><span>04</span> / {d.sections.contributions}</p>
    <h2 id="contributions-title">{d.contributionsTitle}</h2>
  </div>
  <div>
    {#each contributions as item}<a class="contribution-row" href={item.url}
        ><strong>{item.title}</strong><span>{item.description[language]}</span
        ><span class="external-arrow" aria-hidden="true">↗</span></a
      >{/each}
  </div>
</section>
