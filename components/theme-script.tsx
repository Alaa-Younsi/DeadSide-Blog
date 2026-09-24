const THEME_SCRIPT = `
(function () {
  var root = document.documentElement;
  try {
    var stored = localStorage.getItem('edition');
    root.dataset.theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (error) {
    root.dataset.theme = 'light';
  }
  try {
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!calm && !sessionStorage.getItem('press-run')) {
      sessionStorage.setItem('press-run', '1');
      root.dataset.intro = 'running';
    }
  } catch (error) {}
})();
`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
}
