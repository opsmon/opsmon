<script>
  import { profile } from "../data/profile.js";
  import { reveal } from "../lib/reveal.js";
  export let d;
  export let copy;
  export let copyState;
</script>

<section
  class="contact-section"
  id="contact"
  tabindex="-1"
  aria-labelledby="contact-title"
  use:reveal
>
  <div class="shell contact-layout">
    <div>
      <p class="eyebrow"><span>05</span> / {d.sections.contact}</p>
      <h2 id="contact-title">{d.contactTitle}</h2>
      <p>{d.contact.text}</p>
    </div>
    <div class="contact-actions">
      <a class="email" href={"mailto:" + profile.email}
        >{profile.email}<span aria-hidden="true">↗</span></a
      ><button class="button secondary" on:click={copy}
        >{d.copy}<span aria-hidden="true">⧉</span></button
      >
      <p class="copy-feedback">
        {copyState === "success"
          ? d.copied
          : copyState === "failure"
            ? d.copyFailed
            : ""}
      </p>
      <div class="socials">
        <a href={profile.github}>GitHub ↗</a><a href={profile.linkedin}
          >LinkedIn ↗</a
        ><a href="https://habr.com/ru/users/opsmon/">Habr ↗</a>
      </div>
    </div>
  </div>
</section>
