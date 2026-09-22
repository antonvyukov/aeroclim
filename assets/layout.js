(() => {
  if (location.pathname.endsWith('/index.html') || location.pathname.endsWith('/')) return;

  fetch('index.html')
    .then((response) => response.text())
    .then((html) => {
      const source = new DOMParser().parseFromString(html, 'text/html');
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const sourceHeader = source.querySelector('header');
      const sourceFooter = source.querySelector('footer');
      if (!sourceHeader || !sourceFooter) return;

      header?.replaceWith(sourceHeader.cloneNode(true));
      if (footer) footer.replaceWith(sourceFooter.cloneNode(true));
      else document.body.insertBefore(sourceFooter.cloneNode(true), document.querySelector('script[src*="store.js"]'));
      if (window.Alpine) Alpine.initTree(document.querySelector('header'));
    })
    .catch(() => {});
})();
