let currentCategory = 'todos';

// Filtro por Categoria
function filterCategory(category, event) {
  currentCategory = category;

  // Atualizar botões
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  // Limpar campo de pesquisa ao trocar de aba
  const searchInput = document.getElementById('searchInput');
  if (searchInput && searchInput.value !== '') {
    searchInput.value = '';
    document.getElementById('clearSearch').style.display = 'none';
  }

  applyFilters();
}

// Barra de Pesquisa em Tempo Real
function searchMenu() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const clearBtn = document.getElementById('clearSearch');

  if (clearBtn) {
    clearBtn.style.display = query.length > 0 ? 'block' : 'none';
  }

  applyFilters(query);
}

// Limpar pesquisa
function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  const clearBtn = document.getElementById('clearSearch');
  if (clearBtn) {
    clearBtn.style.display = 'none';
  }
  applyFilters();
}

// Aplicação Combinada de Filtros
function applyFilters(query = '') {
  const sections = document.querySelectorAll('.menu-section');
  let totalVisibleItems = 0;

  sections.forEach(section => {
    const isCategoryMatch = (currentCategory === 'todos' || section.dataset.category === currentCategory);
    let visibleInSection = 0;

    // Cartões normais
    const cards = section.querySelectorAll('.card');
    cards.forEach(card => {
      const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
      const desc = card.querySelector('.card-desc')?.innerText.toLowerCase() || '';
      const details = card.querySelector('.card-details')?.innerText.toLowerCase() || '';
      const keywords = card.dataset.keywords || '';

      const matchesSearch = query === '' || 
        title.includes(query) || 
        desc.includes(query) || 
        details.includes(query) || 
        keywords.includes(query);

      if (isCategoryMatch && matchesSearch) {
        card.style.display = 'block';
        visibleInSection++;
      } else {
        card.style.display = 'none';
      }
    });

    // Linhas de cafetaria
    const rows = section.querySelectorAll('.item-row');
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      const keywords = row.dataset.keywords || '';

      const matchesSearch = query === '' || text.includes(query) || keywords.includes(query);

      if (isCategoryMatch && matchesSearch) {
        row.style.display = 'flex';
        visibleInSection++;
      } else {
        row.style.display = 'none';
      }
    });

    if (visibleInSection > 0) {
      section.style.display = 'block';
      totalVisibleItems += visibleInSection;
    } else {
      section.style.display = 'none';
    }
  });

  const noResults = document.getElementById('noResults');
  if (noResults) {
    noResults.style.display = totalVisibleItems === 0 ? 'block' : 'none';
  }
}

// ===== Tema claro / escuro =====
function updateThemeButton() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.setAttribute('aria-label', isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', isDark ? '#111111' : '#ffffff');
}

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
  updateThemeButton();
}

updateThemeButton();
