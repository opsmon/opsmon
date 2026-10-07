<script>
  import { tick } from "svelte";
  import { matches } from "../lib/navigation.js";
  export let d;
  export let commands = [];
  let dialog,
    input,
    query = "",
    invoker;
  $: results = commands.filter((command) => matches(command, query));
  export async function open() {
    invoker = document.activeElement;
    query = "";
    dialog.showModal();
    await tick();
    input.focus();
  }
  function close() {
    dialog.close();
    invoker?.focus();
  }
  function activate(command) {
    close();
    command.run();
  }
  function keydown(event) {
    if (event.isComposing) return;
    if (event.key === "Tab") {
      const controls = [...dialog.querySelectorAll("button,input")];
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const controls = [input, ...dialog.querySelectorAll("[data-result]")];
      const index = controls.indexOf(document.activeElement);
      controls[
        (index + (event.key === "ArrowDown" ? 1 : -1) + controls.length) %
          controls.length
      ]?.focus();
    }
    if (event.key === "Enter" && event.target === input && results.length) {
      event.preventDefault();
      activate(results[0]);
    }
  }
</script>

<dialog
  class="command-dialog"
  bind:this={dialog}
  aria-labelledby="palette-title"
  on:keydown={keydown}
  on:cancel={(event) => {
    event.preventDefault();
    close();
  }}
>
  <div class="palette-heading">
    <h2 id="palette-title">{d.palette}</h2>
    <button class="icon-button" aria-label={d.close} on:click={close}>×</button>
  </div>
  <div class="palette-search">
    <label class="sr-only" for="command-search">{d.searchLabel}</label><input
      id="command-search"
      bind:this={input}
      bind:value={query}
      placeholder={d.search}
      autocomplete="off"
      spellcheck="false"
    />
  </div>
  <div class="command-results">
    {#each [d.navigationGroup, d.projectGroup, d.actionGroup] as group}{@const items =
        results.filter(
          (item) => item.group === group,
        )}{#if items.length}<section aria-label={group}>
          <h3>{group}</h3>
          <ul>
            {#each items as command}<li>
                <button data-result on:click={() => activate(command)}
                  ><span>{command.label}</span><span aria-hidden="true">↗</span
                  ></button
                >
              </li>{/each}
          </ul>
        </section>{/if}{/each}{#if !results.length}<p
        class="empty-state"
        role="status"
      >
        {d.empty}
      </p>{/if}
  </div>
  <p class="palette-help">{d.paletteHelp}</p>
</dialog>
