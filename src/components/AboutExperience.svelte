<script>
  import { profile } from "../data/profile.js";
  import { reveal } from "../lib/reveal.js";
  export let d;
</script>

<section
  class="section about-section"
  id="about"
  tabindex="-1"
  aria-labelledby="about-title"
  use:reveal
>
  <div class="shell about-grid">
    <div>
      <p class="eyebrow"><span>02</span> / {d.sections.about}</p>
      <h2 id="about-title">{d.aboutTitle}</h2>
      <div class="profile-line">
        <img
          src={profile.avatar}
          width="64"
          height="64"
          loading="lazy"
          alt={d.hero.avatarAlt}
        />
        <div><strong>{d.name}</strong><span>{profile.role}</span></div>
      </div>
    </div>
    <div class="about-prose">
      {#each d.about.paragraphs as paragraph}<p>{paragraph}</p>{/each}
      <p>{d.hero.positioning}</p>
      <details>
        <summary>{d.about.focusTitle}<span aria-hidden="true">+</span></summary>
        <ul>
          {#each d.about.focus as focus}<li>{focus}</li>{/each}
        </ul>
      </details>
    </div>
  </div>
  <div class="shell practice" id="experience" tabindex="-1">
    <div class="practice-heading">
      <p class="eyebrow">{d.sections.experience}</p>
      <h3>{d.practiceTitle}</h3>
    </div>
    <div>
      {#each d.experience.items as [title, text], i}<article
          class="practice-row"
        >
          <span class="mono">0{i + 1}</span>
          <div>
            <h4>{title}</h4>
            <p>{text}</p>
            {#if i === 3}<span class="exploration-label">{d.exploreNote}</span
              >{/if}
          </div>
        </article>{/each}
    </div>
  </div>
</section>
