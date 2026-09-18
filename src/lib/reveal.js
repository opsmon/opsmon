export function reveal(node) {
  if (
    !("IntersectionObserver" in window) ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return {};
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("entered");
        observer.disconnect();
      }
    },
    { threshold: 0.08 },
  );
  observer.observe(node);
  return {
    destroy() {
      observer.disconnect();
    },
  };
}
