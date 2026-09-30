const buttons = document.querySelectorAll('[data-filter]');
const papers = Array.from(document.querySelectorAll('.publication')).sort((a, b) => Number(b.dataset.year) - Number(a.dataset.year));
const publicationList = document.getElementById('publications');
papers.forEach(paper => publicationList.appendChild(paper));
function selectFilter(filter) {
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  papers.forEach((paper, index) => { paper.hidden = filter === 'recent' && index >= 5; });
  const count = papers.filter(paper => !paper.hidden).length;
  document.getElementById('filter-status').textContent = `${count} research ${count === 1 ? 'entry' : 'entries'} shown.`;
}
buttons.forEach(button => button.addEventListener('click', () => selectFilter(button.dataset.filter)));
selectFilter('recent');

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
