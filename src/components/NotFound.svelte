<script>
  export let d;
  export let base;
</script>

<main class="shell not-found" id="top" tabindex="-1">
  <p class="eyebrow">HTTP / 404</p>
  <div class="error-path" aria-hidden="true">
    <span>○</span><i></i><span>×</span>
  </div>
  <h1>{d.notFoundTitle}</h1>
  <p>{d.notFoundText}</p>
  <a class="button primary" href={base + window.location.search}
    >{d.home}<span aria-hidden="true">↗</span></a
  >
</main>
