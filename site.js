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
