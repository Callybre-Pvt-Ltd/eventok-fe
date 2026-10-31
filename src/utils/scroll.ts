export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }
  const mainContainers = document.querySelectorAll(
    'main, [data-scroll-container]',
  );
  mainContainers.forEach(el => {
    el.scrollTop = 0;
  });
}
