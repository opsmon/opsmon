<script>
  export let project;
  export let d;
  export let language;
  $: index =
    project.visual === "reference" ? 0 : project.visual === "setup" ? 1 : 2;
</script>

<article class="project" class:lead-project={project.lead}>
  <div class="project-preview preview-{project.visual}">
    <div class="preview-label mono">
      <span>0{index + 1} / {d.projectLabels[index]}</span><span
        aria-hidden="true">↗</span
      >
    </div>
    {#if project.visual === "reference"}
      <div class="reference-art" aria-hidden="true">
        <div class="reference-bracket">[</div>
        <div>
          <span class="mono">kubectl</span><strong
            >get clarity<span class="cursor">_</span></strong
          ><span class="preview-caption">{d.preview.search}</span>
        </div>
        <div class="reference-bracket">]</div>
      </div>
    {:else if project.visual === "setup"}
      <div class="setup-art" aria-hidden="true">
        <span class="setup-root">~/</span>
        <div>
          {#each d.preview.setupSteps as step, i}<span
              ><i>0{i + 1}</i>{step}</span
            >{/each}
        </div>
      </div>
    {:else}
      <div class="travel-art" aria-hidden="true">
        <svg viewBox="0 0 160 100"
          ><path d="M15 80C20 10 100 110 140 20" /><circle
            cx="15"
            cy="80"
            r="5"
          /><circle cx="140" cy="20" r="5" /></svg
        >
        <div>
          {#each d.preview.travelSteps as step}<span><i>✓</i>{step}</span
            >{/each}
        </div>
      </div>
    {/if}
    <span class="illustration-label">{d.illustration}</span>
  </div>
  <div class="project-body">
    <p class="eyebrow">{d.projectLabels[index]}</p>
    <h3>{project.title}</h3>
    <p>{project.description[language]}</p>
    <div class="tags">
      {#each project.stack as tool}<span>{tool}</span>{/each}
    </div>
    <div class="project-links">
      <a href={project.demo}>{d.demo} <span aria-hidden="true">↗</span></a><a
        href={project.github}>GitHub <span aria-hidden="true">↗</span></a
      >
    </div>
    <details>
      <summary>{d.details}<span aria-hidden="true">+</span></summary>
      <div class="disclosure-content">
        <h4>{d.projects.problemLabel}</h4>
        <p>{project.problem[language]}</p>
        <h4>{d.projects.solutionLabel}</h4>
        <p>{project.solution[language]}</p>
        <h4>{d.features}</h4>
        <ul>
          {#each d.projectFeatures[index] as feature}<li>{feature}</li>{/each}
        </ul>
      </div>
    </details>
  </div>
</article>
