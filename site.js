const buttons = document.querySelectorAll('[data-filter]');
const papers = document.querySelectorAll('[data-category]');
const latestYear = Math.max(...Array.from(papers, paper => Number(paper.dataset.year)));
buttons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  let count = 0;
  buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  papers.forEach(paper => {
    const show = filter === 'all' || (filter === 'recent' ? Number(paper.dataset.year) >= latestYear - 1 : paper.dataset.category === filter);
    paper.hidden = !show;
    if (show) count++;
  });
  document.getElementById('filter-status').textContent = `${count} research ${count === 1 ? 'entry' : 'entries'} shown.`;
}));

const themeToggle = document.querySelector('.theme-toggle');
const applyTheme = (dark) => {
  document.body.classList.toggle('dark', dark);
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.querySelector('.theme-icon').textContent = dark ? '☼' : '☾';
  themeToggle.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
};

let savedTheme = null;
try { savedTheme = localStorage.getItem('juhwan-theme'); } catch (error) { /* storage may be unavailable */ }
applyTheme(savedTheme === 'dark');
themeToggle.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  applyTheme(dark);
  try { localStorage.setItem('juhwan-theme', dark ? 'dark' : 'light'); } catch (error) { /* storage may be unavailable */ }
});
