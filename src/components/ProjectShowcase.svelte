<script>
  import { projects } from "../data/projects.js";
  import ProjectCard from "./ProjectCard.svelte";
  import { reveal } from "../lib/reveal.js";
  export let d;
  export let language;
</script>

<section
  class="section shell"
  id="projects"
  tabindex="-1"
  aria-labelledby="projects-title"
  use:reveal
>
  <div class="section-heading">
    <div>
      <p class="eyebrow"><span>01</span> / {d.sections.projects}</p>
      <h2 id="projects-title">{d.projectsTitle}</h2>
    </div>
    <p>{d.projectsIntro}</p>
  </div>
  <div class="project-grid">
    {#each projects as project}<ProjectCard {project} {d} {language} />{/each}
  </div>
</section>
