// ===== APP STATE =====
let currentFilter = 'all';
let currentSort = 'default';
let searchQuery = '';
let compareList = [];
const MAX_COMPARE = 4;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  showSkeletons();
  // Small delay to show skeleton loading effect
  setTimeout(() => {
    renderCategories();
    renderFeaturedAgents();
    renderAllAgents();
    setupSearch();
    setupEventListeners();
    setupRevealAnimations();
    setupNavbarScroll();
    setupCounters();
    setupKeyboardShortcuts();
    setupBackToTop();
    updateFilterCounts();
  }, 300);
});

// ===== THEME =====
function initTheme() {
  const saved = localStorage.getItem('agentstack-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    // Default dark, respect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'dark');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('agentstack-theme', next);
}

// ===== SKELETON LOADING =====
function showSkeletons() {
  const grids = ['categories-grid', 'featured-grid', 'all-agents-grid'];
  grids.forEach(id => {
    const grid = document.getElementById(id);
    if (!grid) return;
    const count = id === 'categories-grid' ? 6 : id === 'featured-grid' ? 3 : 6;
    grid.innerHTML = Array(count).fill('').map(() => `
      <div class="skeleton-card">
        <div style="display:flex;gap:0.9rem;margin-bottom:1rem;">
          <div class="skeleton skeleton-circle"></div>
          <div style="flex:1">
            <div class="skeleton skeleton-line w50"></div>
            <div class="skeleton skeleton-line w75"></div>
          </div>
        </div>
        <div class="skeleton skeleton-line w100"></div>
        <div class="skeleton skeleton-line w75"></div>
        <div style="display:flex;gap:0.35rem;margin-top:0.5rem">
          <div class="skeleton" style="width:50px;height:20px;border-radius:6px"></div>
          <div class="skeleton" style="width:60px;height:20px;border-radius:6px"></div>
          <div class="skeleton" style="width:45px;height:20px;border-radius:6px"></div>
        </div>
      </div>
    `).join('');
  });
}

// ===== REVEAL ON SCROLL =====
function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  
  // Also observe dynamically rendered cards
  const cardObserver = new MutationObserver(() => {
    document.querySelectorAll('.agent-card, .category-card').forEach(el => {
      if (!el.dataset.observed) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.dataset.observed = 'true';
        setTimeout(() => {
          el.style.transition = 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, parseInt(el.dataset.index || 0) * 60 + 50);
      }
    });
  });
  
  const grids = document.querySelectorAll('.agents-grid, .categories-grid');
  grids.forEach(g => cardObserver.observe(g, { childList: true }));
}

// ===== NAVBAR SCROLL =====
function setupNavbarScroll() {
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===== BACK TO TOP =====
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

// ===== ANIMATED COUNTERS =====
function setupCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-count]').forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1500;
  const start = performance.now();
  
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(eased * target);
    el.textContent = current + (target >= 100 ? '+' : '');
    if (progress < 1) requestAnimationFrame(step);
  };
  
  requestAnimationFrame(step);
}

// ===== KEYBOARD SHORTCUTS =====
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.getElementById('search-input');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  hamburger.classList.toggle('active');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.display = 'flex';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.flexDirection = 'column';
    links.style.background = 'rgba(6,6,10,0.95)';
    links.style.backdropFilter = 'blur(24px)';
    links.style.padding = '1rem';
    links.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
    links.style.gap = '0.25rem';
  }
}

// ===== RENDER CATEGORIES =====
function renderCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  
  grid.innerHTML = CATEGORIES.map((cat, i) => `
    <a class="category-card" href="#agents" data-index="${i}" onclick="filterByCategory('${cat.id}')">
      <div class="category-icon">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.description}</p>
      <span class="category-count">${cat.count} agent${cat.count !== 1 ? 's' : ''} →</span>
    </a>
  `).join('');
}

// ===== RENDER FEATURED =====
function renderFeaturedAgents() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  
  const featured = AGENTS.filter(a => a.featured);
  grid.innerHTML = featured.map((agent, i) => renderAgentCard(agent, i)).join('');
}

// ===== RENDER ALL =====
function renderAllAgents() {
  const grid = document.getElementById('all-agents-grid');
  if (!grid) return;
  
  let filtered = [...AGENTS];
  
  // Filter
  if (currentFilter !== 'all') {
    if (currentFilter === 'open-source') {
      filtered = filtered.filter(a => a.tags.some(t => t.toLowerCase() === 'open source'));
    } else {
      filtered = filtered.filter(a => a.category === currentFilter);
    }
  }
  
  // Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(q) ||
      a.tagline.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q)) ||
      a.category.replace('-', ' ').includes(q) ||
      a.company.toLowerCase().includes(q)
    );
  }
  
  // Sort
  if (currentSort !== 'default') {
    filtered = sortAgents(filtered, currentSort);
  }
  
  // Update results count
  const countEl = document.getElementById('results-count');
  if (countEl) {
    if (searchQuery || currentFilter !== 'all') {
      countEl.textContent = `Showing ${filtered.length} of ${AGENTS.length} agents`;
    } else {
      countEl.textContent = `${filtered.length} agents in directory`;
    }
  }
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No agents found</h3>
        <p>Try a different search or category</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = filtered.map((agent, i) => renderAgentCard(agent, i)).join('');
  updateFilterButtons();
  updateSortButtons();
}

// ===== SORT =====
function sortAgents(agents, sortType) {
  const sorted = [...agents];
  switch (sortType) {
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating);
    case 'reviews': return sorted.sort((a, b) => b.reviews - a.reviews);
    case 'newest': return sorted.sort((a, b) => b.launchDate.localeCompare(a.launchDate));
    case 'name': return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default: return sorted;
  }
}

function setSort(sort) {
  currentSort = sort;
  renderAllAgents();
}

function updateSortButtons() {
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sort === currentSort);
  });
}

// ===== FILTER COUNTS =====
function updateFilterCounts() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const filter = btn.dataset.filter;
    if (filter === 'all') {
      btn.innerHTML = `🌐 All <span class="filter-count">${AGENTS.length}</span>`;
    } else {
      let count;
      if (filter === 'open-source') {
        count = AGENTS.filter(a => a.tags.some(t => t.toLowerCase() === 'open source')).length;
      } else {
        count = AGENTS.filter(a => a.category === filter).length;
      }
      const icon = btn.textContent.trim().split(' ')[0]; // Grab emoji
      const label = btn.textContent.trim().split(' ').slice(1).join(' ').replace(/\d+/, '').trim();
      btn.innerHTML = `${icon} ${label} <span class="filter-count">${count}</span>`;
    }
  });
}

// ===== AGENT CARD =====
function renderAgentCard(agent, index = 0) {
  const isCompared = compareList.includes(agent.id);
  const isTrending = agent.reviews > 800 && agent.rating >= 4.5;
  const views = Math.floor(agent.reviews * 3.2 + Math.random() * 500);
  
  return `
    <div class="agent-card ${agent.featured ? 'featured' : ''}" data-index="${index}" onclick="openAgentDetail('${agent.id}')">
      <div class="card-compare ${isCompared ? 'active' : ''}" onclick="event.stopPropagation(); toggleCompare('${agent.id}')" title="Add to compare">
        ${isCompared ? '✓' : '+'}
      </div>
      ${agent.featured ? '<span class="featured-badge">⚡ Featured</span>' : (isTrending ? '<span class="trending-badge">🔥 Trending</span>' : '')}
      <div class="agent-header">
        <div class="agent-logo">
          <img src="${agent.logo}" alt="${agent.name}" loading="lazy" onerror="this.parentElement.innerHTML='<span style=\\'font-size:1.25rem\\'>${getCategoryIcon(agent.category)}</span>'">
        </div>
        <div class="agent-info">
          <h3>${agent.name}</h3>
          <div class="tagline">${agent.tagline}</div>
        </div>
      </div>
      <p class="agent-description">${agent.description}</p>
      <div class="agent-tags">
        ${agent.tags.slice(0, 3).map(t => `<span class="agent-tag">${t}</span>`).join('')}
      </div>
      <div class="agent-footer">
        <span class="agent-pricing">${agent.pricing}</span>
        <span class="agent-rating">
          <span class="stars">★</span>
          <span class="score">${agent.rating}</span>
          <span class="count">(${formatNumber(agent.reviews)})</span>
          <span class="agent-views">👁 ${formatNumber(views)}</span>
        </span>
      </div>
    </div>
  `;
}

function getCategoryIcon(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  return cat ? cat.icon : '🤖';
}

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

// ===== COMPARE =====
function toggleCompare(agentId) {
  const idx = compareList.indexOf(agentId);
  if (idx > -1) {
    compareList.splice(idx, 1);
  } else {
    if (compareList.length >= MAX_COMPARE) {
      showToast(`⚠️ Maximum ${MAX_COMPARE} agents for comparison`);
      return;
    }
    compareList.push(agentId);
  }
  updateCompareUI();
  // Update card checkboxes
  document.querySelectorAll('.card-compare').forEach(el => {
    const card = el.closest('.agent-card');
    if (!card) return;
    const cardAgentId = card.getAttribute('onclick').match(/'([^']+)'/)?.[1];
    if (cardAgentId && compareList.includes(cardAgentId)) {
      el.classList.add('active');
      el.textContent = '✓';
    } else {
      el.classList.remove('active');
      el.textContent = '+';
    }
  });
}

function updateCompareUI() {
  const bar = document.getElementById('compare-bar');
  const countEl = document.getElementById('compare-count');
  const chipsEl = document.getElementById('compare-chips');
  
  if (compareList.length > 0) {
    bar.classList.add('visible');
    countEl.textContent = compareList.length;
    chipsEl.innerHTML = compareList.map(id => {
      const agent = AGENTS.find(a => a.id === id);
      return agent ? `<span class="compare-chip">${agent.name}<span class="compare-chip-x" onclick="event.stopPropagation(); toggleCompare('${id}')">×</span></span>` : '';
    }).join('');
  } else {
    bar.classList.remove('visible');
  }
}

function clearCompare() {
  compareList = [];
  updateCompareUI();
  renderAllAgents();
}

function openCompareModal() {
  if (compareList.length < 2) {
    showToast('⚠️ Select at least 2 agents to compare');
    return;
  }
  
  const agents = compareList.map(id => AGENTS.find(a => a.id === id)).filter(Boolean);
  const modal = document.getElementById('compare-modal');
  const body = document.getElementById('compare-modal-body');
  
  const rows = [
    { label: 'Company', get: a => a.company },
    { label: 'Category', get: a => { const c = CATEGORIES.find(c => c.id === a.category); return c ? c.icon + ' ' + c.name : a.category; } },
    { label: 'Rating', get: a => `<span class="compare-rating">★ ${a.rating}</span> (${formatNumber(a.reviews)} reviews)`, isHTML: true },
    { label: 'Pricing', get: a => `<span class="compare-pricing">${a.pricing}</span>`, isHTML: true },
    { label: 'Tagline', get: a => a.tagline },
    { label: 'Tags', get: a => a.tags.slice(0,4).join(', ') },
    { label: 'Launch', get: a => a.launchDate },
    { label: 'Website', get: a => `<a href="${a.website}" target="_blank" rel="noopener">${a.website.replace('https://', '')}</a>`, isHTML: true },
  ];
  
  body.innerHTML = `
    <div style="overflow-x:auto">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            ${agents.map(a => `<th><span class="compare-agent-name">${a.name}</span></th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr>
              <td>${row.label}</td>
              ${agents.map(a => `<td>${row.isHTML ? row.get(a) : escapeHTML(row.get(a))}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== SEARCH =====
function setupSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  
  let timeout;
  input.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchQuery = e.target.value;
      renderAllAgents();
    }, 200);
  });
  
  const btn = document.getElementById('search-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      searchQuery = input.value;
      currentFilter = 'all';
      renderAllAgents();
      document.getElementById('agents').scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchQuery = input.value;
      currentFilter = 'all';
      renderAllAgents();
      document.getElementById('agents').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function searchFor(term) {
  const input = document.getElementById('search-input');
  input.value = term;
  searchQuery = term;
  currentFilter = 'all';
  renderAllAgents();
  document.getElementById('agents').scrollIntoView({ behavior: 'smooth' });
}

// ===== FILTER =====
function filterByCategory(catId) {
  currentFilter = catId;
  searchQuery = '';
  const input = document.getElementById('search-input');
  if (input) input.value = '';
  renderAllAgents();
  updateFilterButtons();
  setTimeout(() => {
    document.getElementById('agents').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function setFilter(filter) {
  currentFilter = filter;
  renderAllAgents();
}

function updateFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });
}

// ===== AGENT DETAIL =====
function openAgentDetail(agentId) {
  const agent = AGENTS.find(a => a.id === agentId);
  if (!agent) return;
  
  const category = CATEGORIES.find(c => c.id === agent.category);
  
  const modal = document.getElementById('agent-modal');
  const body = document.getElementById('agent-modal-body');
  
  body.innerHTML = `
    <div class="detail-header">
      <div class="detail-logo">
        <img src="${agent.logo}" alt="${agent.name}" onerror="this.parentElement.innerHTML='<span style=\\'font-size:1.75rem\\'>${getCategoryIcon(agent.category)}</span>'">
      </div>
      <div class="detail-info">
        <h1>${agent.name}</h1>
        <div class="tagline">${agent.tagline}</div>
      </div>
    </div>
    
    <div class="detail-meta">
      <div class="detail-meta-item">🏢 ${agent.company}</div>
      <div class="detail-meta-item">⭐ ${agent.rating} (${formatNumber(agent.reviews)} reviews)</div>
      <div class="detail-meta-item">💰 ${agent.pricing}</div>
      <div class="detail-meta-item">${category ? category.icon : '🤖'} ${category ? category.name : 'AI Agent'}</div>
      <div class="detail-meta-item">📅 ${agent.launchDate}</div>
    </div>
    
    <p class="detail-description">${agent.description}</p>
    
    <div class="detail-tags">
      ${agent.tags.map(t => `<span class="detail-tag">${t}</span>`).join('')}
    </div>
    
    <div class="detail-actions">
      <a href="${agent.website}" target="_blank" rel="noopener" class="btn-primary">Visit Website →</a>
      <button class="btn-secondary" onclick="closeModal('agent-modal')">Close</button>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===== MODALS =====
function openSubmitModal() {
  document.getElementById('submit-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  document.body.style.overflow = '';
}

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  console.log('Agent submission:', data);
  closeModal('submit-modal');
  showToast('✅ Agent submitted! We\'ll review it within 24 hours.');
  e.target.reset();
}

function handleNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[name="email"]').value;
  console.log('Newsletter signup:', email);
  showToast('✅ Subscribed! Check your inbox for confirmation.');
  e.target.reset();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close modals on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });
}
