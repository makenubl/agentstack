/* ====================================
   AgentStack — Conversion-Optimized JS
   Social Proof · Urgency · Delight
   ==================================== */
'use strict';

/* ---- State ---- */
let currentFilter = 'all';
let currentSort = 'featured';
let compareList = [];
const MAX_COMPARE = 4;
let testimonialIndex = 0;
let testimonialTimer = null;

/* ---- Testimonials Data ---- */
const testimonials = [
  { name:'Sarah Chen', role:'VP Engineering, Scale AI', text:'"AgentStack saved us 40+ hours evaluating AI agents. We found our perfect coding assistant in minutes, not months."', stars:5, color:'#a78bfa' },
  { name:'Marcus Wright', role:'CTO, Replicate', text:'"The comparison feature is a game-changer. We tested 6 agents side-by-side and made a confident decision the same day."', stars:5, color:'#06b6d4' },
  { name:'Priya Sharma', role:'Head of AI, Notion', text:'"Listed our agent on AgentStack and got 2,000+ qualified leads in the first month. The ROI is incredible."', stars:5, color:'#f472b6' },
  { name:'James Okafor', role:'Founder, DevTools.ai', text:'"The quality of traffic from AgentStack is unmatched. Buyers here are ready to commit, not just browse."', stars:5, color:'#34d399' },
  { name:'Lisa Zhang', role:'Product Lead, Hugging Face', text:'"Finally a marketplace that understands AI agents. The categorization and filtering are spot-on."', stars:5, color:'#fbbf24' },
  { name:'David Kim', role:'Engineering Manager, Stripe', text:'"We use AgentStack to discover new tools for our team. The reviews and ratings are genuinely helpful."', stars:4, color:'#818cf8' },
];

/* ---- Activity Feed Data ---- */
const activityTemplates = [
  { action:'just viewed', agents:['Devin','Cursor AI','AutoGPT','GitHub Copilot','Tabnine','Replit Agent'] },
  { action:'signed up to list', agents:['their coding agent','a new research assistant','an AI writer'] },
  { action:'compared', agents:['Devin vs Cursor AI','AutoGPT vs BabyAGI','Copilot vs Tabnine'] },
  { action:'submitted a review for', agents:['Devin','GitHub Copilot','Jasper AI','Midjourney'] },
  { action:'purchased Featured listing for', agents:['CodeWhisperer','Phind','Sweep AI'] },
];
const activityNames = ['Sarah','Marcus','Priya','James','Lisa','David','Emma','Alex','Jordan','Taylor','Morgan','Casey','Riley','Sam','Chris'];
const activityLocations = ['San Francisco','New York','London','Berlin','Tokyo','Toronto','Sydney','Singapore','Paris','Austin'];
const activityColors = ['#a78bfa','#06b6d4','#f472b6','#34d399','#fbbf24','#818cf8','#f97316','#ec4899'];

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  showSkeletons();
  setTimeout(() => {
    renderCategories();
    renderFeaturedAgents();
    renderAllAgents();
    renderTestimonials();
    setupEventListeners();
    setupSearch();
    setupRevealAnimations();
    setupNavbarScroll();
    setupBackToTop();
    setupCounters();
    setupKeyboardShortcuts();
    setupScrollProgress();
    setupActivityFeed();
    animateLiveCount();
    startCountdown();
    setupMobileCTA();
    setup3DTilt();
    updateFilterCounts();
    updateFilterButtons();
    updateSortButtons();
  }, 600);
});

/* ===== THEME ===== */
function initTheme() {
  const saved = localStorage.getItem('agentstack-theme');
  const pref = saved || (window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', pref);
}
function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('agentstack-theme', next);
}

/* ===== SCROLL PROGRESS ===== */
function setupScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ===== ACTIVITY FEED ===== */
function setupActivityFeed() {
  const container = document.getElementById('activity-feed-inner');
  if (!container) return;
  function showActivity() {
    const tmpl = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
    const name = activityNames[Math.floor(Math.random() * activityNames.length)];
    const loc = activityLocations[Math.floor(Math.random() * activityLocations.length)];
    const agent = tmpl.agents[Math.floor(Math.random() * tmpl.agents.length)];
    const color = activityColors[Math.floor(Math.random() * activityColors.length)];
    const el = document.createElement('div');
    el.className = 'activity-item';
    el.innerHTML = `
      <div class="activity-avatar" style="background:${color}">${name[0]}</div>
      <div class="activity-text"><strong>${name}</strong> from ${loc} ${tmpl.action} <strong>${agent}</strong></div>
      <span class="activity-time">Just now</span>
    `;
    container.appendChild(el);
    // Remove after animation
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 5500);
    // Keep max 2
    while (container.children.length > 2) container.removeChild(container.firstChild);
  }
  // First after 3s, then every 6-10s
  setTimeout(showActivity, 3000);
  setInterval(showActivity, 7000 + Math.random() * 3000);
}

/* ===== LIVE COUNT ===== */
function animateLiveCount() {
  const el = document.getElementById('live-count');
  if (!el) return;
  let count = 2847;
  el.textContent = count.toLocaleString();
  setInterval(() => {
    const delta = Math.floor(Math.random() * 30) - 12; // -12 to +17
    count = Math.max(2400, Math.min(3200, count + delta));
    el.textContent = count.toLocaleString();
  }, 4000);
}

/* ===== TESTIMONIALS ===== */
function renderTestimonials() {
  const track = document.getElementById('testimonial-track');
  const dotsC = document.getElementById('testimonial-dots');
  if (!track || !dotsC) return;
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar" style="background:${t.color}">${t.name[0]}</div>
        <div><div class="testimonial-name">${t.name}</div><div class="testimonial-role">${t.role}</div></div>
      </div>
    </div>
  `).join('');
  // Dots
  const pageCount = getTestimonialPageCount();
  dotsC.innerHTML = '';
  for (let i = 0; i < pageCount; i++) {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Testimonial page ${i + 1}`);
    dot.addEventListener('click', () => goToTestimonial(i));
    dotsC.appendChild(dot);
  }
  // Auto-advance
  testimonialTimer = setInterval(() => {
    const next = (testimonialIndex + 1) % pageCount;
    goToTestimonial(next);
  }, 5000);
}
function getTestimonialPageCount() {
  const w = window.innerWidth;
  const perPage = w <= 768 ? 1 : w <= 1100 ? 2 : 3;
  return Math.ceil(testimonials.length / perPage);
}
function goToTestimonial(idx) {
  const track = document.getElementById('testimonial-track');
  const dotsC = document.getElementById('testimonial-dots');
  if (!track) return;
  testimonialIndex = idx;
  const w = window.innerWidth;
  const perPage = w <= 768 ? 1 : w <= 1100 ? 2 : 3;
  const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 24 : 0; // 24 = gap
  track.style.transform = `translateX(-${idx * perPage * cardWidth}px)`;
  if (dotsC) {
    dotsC.querySelectorAll('.testimonial-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  }
}

/* ===== COUNTDOWN TIMER ===== */
function startCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  // End = midnight tonight
  function getEndTime() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    return end;
  }
  let endTime = getEndTime();
  function tick() {
    const now = new Date();
    let diff = endTime - now;
    if (diff <= 0) { endTime = getEndTime(); diff = endTime - now; }
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ===== MOBILE STICKY CTA ===== */
function setupMobileCTA() {
  const cta = document.getElementById('mobile-sticky-cta');
  if (!cta) return;
  window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) { cta.style.display = 'none'; return; }
    cta.style.display = window.scrollY > 500 ? 'block' : 'none';
  }, { passive: true });
}

/* ===== 3D TILT ===== */
function setup3DTilt() {
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.agent-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 4; // max 4deg
    const rotX = ((cy - y) / cy) * 4;
    card.style.transform = `translateY(-8px) scale(1.01) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  document.addEventListener('mouseleave', e => {
    if (e.target.classList && e.target.classList.contains('agent-card')) {
      e.target.style.transform = '';
    }
  }, true);
  document.addEventListener('mouseout', e => {
    const card = e.target.closest('.agent-card');
    if (card && !card.contains(e.relatedTarget)) {
      card.style.transform = '';
    }
  });
}

/* ===== SKELETONS ===== */
function showSkeletons() {
  const featured = document.getElementById('featured-grid');
  const all = document.getElementById('agents-grid');
  const cats = document.getElementById('categories-grid');
  const skel = `<div class="skeleton-card"><div class="skeleton skeleton-circle" style="margin-bottom:0.75rem"></div><div class="skeleton skeleton-line w75"></div><div class="skeleton skeleton-line w100"></div><div class="skeleton skeleton-line w50"></div></div>`;
  if (featured) featured.innerHTML = skel.repeat(3);
  if (all) all.innerHTML = skel.repeat(6);
  if (cats) cats.innerHTML = skel.repeat(6);
}

/* ===== REVEAL ANIMATIONS ===== */
function setupRevealAnimations() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

/* ===== NAVBAR SCROLL ===== */
function setupNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 20); }, { passive: true });
}

/* ===== BACK TO TOP ===== */
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => { btn.classList.toggle('visible', window.scrollY > 600); }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===== COUNTERS ===== */
function setupCounters() {
  const els = document.querySelectorAll('.stat-number');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
}
function animateCounter(el) {
  const text = el.textContent.trim();
  const suffix = text.replace(/[0-9,.]/g, '');
  const target = parseInt(text.replace(/[^0-9]/g, ''), 10);
  if (isNaN(target)) return;
  const dur = 1800;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    const val = Math.round(target * ease);
    el.textContent = val.toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ===== KEYBOARD SHORTCUTS ===== */
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Ctrl/Cmd+K → focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const inp = document.querySelector('.search-box input');
      if (inp) inp.focus();
    }
    // Escape → close modal
    if (e.key === 'Escape') closeModal();
  });
}

/* ===== MOBILE MENU ===== */
function toggleMobileMenu() {
  const ham = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (!ham || !links) return;
  ham.classList.toggle('active');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'var(--bg-elevated)';
    links.style.padding = '1rem';
    links.style.borderBottom = '1px solid var(--border)';
  }
}

/* ===== CATEGORIES ===== */
const categoryIcons = {
  'Coding':    '💻',
  'Research':  '🔬',
  'Writing':   '✍️',
  'Data':      '📊',
  'Design':    '🎨',
  'DevOps':    '⚙️',
  'Security':  '🛡️',
  'Customer Support': '💬',
  'General':   '🤖',
};
function getCategoryIcon(cat) { return categoryIcons[cat] || '🤖'; }

function renderCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid || typeof agents === 'undefined') return;
  const cats = {};
  agents.forEach(a => { cats[a.category] = (cats[a.category] || 0) + 1; });
  grid.innerHTML = Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([cat, count]) => `
    <div class="category-card reveal" onclick="setFilter('${cat}')" tabindex="0" role="button" aria-label="Filter by ${cat}">
      <div class="category-icon">${getCategoryIcon(cat)}</div>
      <h3>${cat}</h3>
      <p>${getCategoryDescription(cat)}</p>
      <span class="category-count">${count} agent${count !== 1 ? 's' : ''}</span>
    </div>
  `).join('');
  setupRevealAnimations();
}
function getCategoryDescription(cat) {
  const d = {
    'Coding': 'AI-powered code generation, review & debugging',
    'Research': 'Automated research, analysis & knowledge synthesis',
    'Writing': 'Content creation, copywriting & editing',
    'Data': 'Data analysis, visualization & pipeline automation',
    'Design': 'Image generation, UI design & creative tools',
    'DevOps': 'CI/CD, infrastructure & deployment automation',
    'Security': 'Vulnerability scanning & threat detection',
    'Customer Support': 'AI chatbots & support automation',
    'General': 'Multi-purpose autonomous AI agents',
  };
  return d[cat] || 'AI-powered tools and automation';
}

/* ===== FEATURED AGENTS ===== */
function renderFeaturedAgents() {
  const grid = document.getElementById('featured-grid');
  if (!grid || typeof agents === 'undefined') return;
  const featured = agents.filter(a => a.featured).slice(0, 6);
  grid.innerHTML = featured.map(a => renderAgentCard(a, true)).join('');
}

/* ===== ALL AGENTS ===== */
function renderAllAgents() {
  const grid = document.getElementById('agents-grid');
  if (!grid || typeof agents === 'undefined') return;
  let list = [...agents];
  if (currentFilter !== 'all') {
    if (currentFilter === 'Open Source') {
      list = list.filter(a => a.tags && a.tags.some(t => t.toLowerCase() === 'open source'));
    } else {
      list = list.filter(a => a.category === currentFilter);
    }
  }
  list = sortAgents(list, currentSort);
  grid.innerHTML = list.length ? list.map(a => renderAgentCard(a, false)).join('') : `
    <div class="no-results"><div class="no-results-icon">🔍</div><h3>No agents found</h3><p>Try a different filter or search term</p></div>
  `;
  const rc = document.getElementById('results-count');
  if (rc) rc.textContent = `Showing ${list.length} of ${agents.length} agents`;
  setupRevealAnimations();
}

/* ===== SORT ===== */
function sortAgents(arr, method) {
  switch (method) {
    case 'rating': return arr.sort((a, b) => b.rating - a.rating);
    case 'name': return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest': return arr.sort((a, b) => (b.year || 2024) - (a.year || 2024));
    case 'views': return arr.sort((a, b) => (b.views || 0) - (a.views || 0));
    case 'trending': return arr.sort((a, b) => ((b.views || 0) * b.rating) - ((a.views || 0) * a.rating));
    default: return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
  }
}
function setSort(method) {
  currentSort = method;
  updateSortButtons();
  renderAllAgents();
}
function updateSortButtons() {
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.toggle('active', b.dataset.sort === currentSort));
}

/* ===== FILTER ===== */
function setFilter(cat) {
  currentFilter = cat;
  updateFilterButtons();
  renderAllAgents();
  const dir = document.getElementById('directory');
  if (dir) dir.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function updateFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === currentFilter));
}
function updateFilterCounts() {
  if (typeof agents === 'undefined') return;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const f = btn.dataset.filter;
    if (!f) return;
    let count = 0;
    if (f === 'all') count = agents.length;
    else if (f === 'Open Source') count = agents.filter(a => a.tags && a.tags.some(t => t.toLowerCase() === 'open source')).length;
    else count = agents.filter(a => a.category === f).length;
    const span = btn.querySelector('.filter-count');
    if (span) span.textContent = count;
  });
}

/* ===== RENDER CARD ===== */
function renderAgentCard(a, isFeatured) {
  const stars = renderStars(a.rating);
  const isTrending = (a.views || 0) > 50000;
  const isCompared = compareList.includes(a.id);
  const popularityPct = Math.min(100, Math.round(((a.views || 0) / 120000) * 100));
  const isOS = a.tags && a.tags.some(t => t.toLowerCase() === 'open source');

  return `
    <div class="agent-card ${isFeatured ? 'featured' : ''} reveal" data-id="${a.id}" onclick="openAgentDetail(${a.id})" tabindex="0" role="article" aria-label="${a.name}">
      <div class="card-compare ${isCompared ? 'active' : ''}" onclick="event.stopPropagation();toggleCompare(${a.id})" title="Compare" aria-label="Compare ${a.name}">✓</div>
      ${isFeatured ? '<div class="featured-badge">⭐ Featured</div>' : isTrending ? '<div class="trending-badge">🔥 Trending</div>' : ''}
      <div class="agent-header">
        <div class="agent-logo">${a.logo ? `<img src="${a.logo}" alt="${a.name}" onerror="this.parentNode.textContent='${getCategoryIcon(a.category)}'">` : getCategoryIcon(a.category)}</div>
        <div class="agent-info">
          <h3>${escapeHTML(a.name)}</h3>
          <div class="tagline">${escapeHTML(a.tagline || a.category)}</div>
        </div>
      </div>
      <p class="agent-description">${escapeHTML(a.description)}</p>
      <div class="agent-stars-bar">${stars}<span class="rating-number">${a.rating}</span><span class="review-count">(${formatNumber(a.reviews || 0)})</span></div>
      <div class="agent-tags">
        ${(a.tags || []).slice(0, 3).map(t => `<span class="agent-tag">${escapeHTML(t)}</span>`).join('')}
        ${isOS ? '<span class="agent-tag" style="border-color:var(--green);color:var(--green)">Open Source</span>' : ''}
      </div>
      <div class="card-actions" onclick="event.stopPropagation()">
        <a href="${a.url || '#'}" target="_blank" rel="noopener" class="card-cta card-cta-primary" aria-label="Try ${a.name}">Try Free →</a>
        <button class="card-cta card-cta-secondary" onclick="openAgentDetail(${a.id})" aria-label="View details for ${a.name}">Details</button>
      </div>
      <div class="agent-footer">
        <span class="agent-pricing">${escapeHTML(a.pricing)}</span>
        <span>
          <span class="agent-views">👁 ${formatNumber(a.views || 0)}</span>
        </span>
      </div>
      <div class="popularity-bar"><div class="popularity-fill" style="width:${popularityPct}%"></div></div>
    </div>
  `;
}

function renderStars(rating) {
  let html = '<div class="stars-visual">';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) html += '<span class="star-fill">★</span>';
    else if (rating >= i - 0.5) html += '<span class="star-half">★</span>';
    else html += '<span class="star-empty">★</span>';
  }
  html += '</div>';
  return html;
}

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
  return n.toString();
}
function escapeHTML(s) {
  if (!s) return '';
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ===== COMPARE ===== */
function toggleCompare(id) {
  const idx = compareList.indexOf(id);
  if (idx > -1) { compareList.splice(idx, 1); } else {
    if (compareList.length >= MAX_COMPARE) { showToast(`Max ${MAX_COMPARE} agents for comparison`); return; }
    compareList.push(id);
  }
  updateCompareUI();
  // Update card checkboxes
  document.querySelectorAll('.agent-card').forEach(c => {
    const cid = parseInt(c.dataset.id);
    const cb = c.querySelector('.card-compare');
    if (cb) cb.classList.toggle('active', compareList.includes(cid));
  });
}
function updateCompareUI() {
  const bar = document.getElementById('compare-bar');
  const badge = document.getElementById('compare-count');
  const chips = document.getElementById('compare-chips');
  if (!bar) return;
  bar.classList.toggle('visible', compareList.length > 0);
  if (badge) badge.textContent = compareList.length;
  if (chips && typeof agents !== 'undefined') {
    chips.innerHTML = compareList.map(id => {
      const a = agents.find(x => x.id === id);
      return a ? `<span class="compare-chip">${escapeHTML(a.name)}<span class="compare-chip-x" onclick="toggleCompare(${id})">×</span></span>` : '';
    }).join('');
  }
}
function clearCompare() { compareList = []; updateCompareUI(); renderAllAgents(); }
function openCompareModal() {
  if (compareList.length < 2) { showToast('Select at least 2 agents to compare'); return; }
  if (typeof agents === 'undefined') return;
  const list = compareList.map(id => agents.find(a => a.id === id)).filter(Boolean);
  const rows = [
    { label: 'Category', fn: a => a.category },
    { label: 'Rating', fn: a => `⭐ ${a.rating}`, cls: 'compare-rating' },
    { label: 'Reviews', fn: a => formatNumber(a.reviews || 0) },
    { label: 'Pricing', fn: a => a.pricing, cls: 'compare-pricing' },
    { label: 'Views', fn: a => formatNumber(a.views || 0) },
    { label: 'Year', fn: a => a.year || '—' },
    { label: 'Tags', fn: a => (a.tags || []).join(', ') },
  ];
  const html = `
    <div style="overflow-x:auto">
    <table class="compare-table">
      <thead><tr><th></th>${list.map(a => `<th><span class="compare-agent-name">${escapeHTML(a.name)}</span></th>`).join('')}</tr></thead>
      <tbody>${rows.map(r => `<tr><td>${r.label}</td>${list.map(a => `<td class="${r.cls || ''}">${r.fn(a)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
    </div>
  `;
  showModal('Compare Agents', html, 'modal-wide');
}

/* ===== SEARCH ===== */
function setupSearch() {
  const input = document.querySelector('.search-box input');
  const btn = document.querySelector('.search-box button');
  if (!input) return;
  let debounce;
  input.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(() => searchFor(input.value), 250); });
  if (btn) btn.addEventListener('click', () => searchFor(input.value));
}
function searchFor(q) {
  q = q.trim().toLowerCase();
  const grid = document.getElementById('agents-grid');
  if (!grid || typeof agents === 'undefined') return;
  let list = [...agents];
  if (currentFilter !== 'all') {
    if (currentFilter === 'Open Source') list = list.filter(a => a.tags && a.tags.some(t => t.toLowerCase() === 'open source'));
    else list = list.filter(a => a.category === currentFilter);
  }
  if (q) {
    list = list.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      (a.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }
  list = sortAgents(list, currentSort);
  grid.innerHTML = list.length ? list.map(a => renderAgentCard(a, false)).join('') : `
    <div class="no-results"><div class="no-results-icon">🔍</div><h3>No results for "${escapeHTML(q)}"</h3><p>Try different keywords or clear filters</p></div>
  `;
  const rc = document.getElementById('results-count');
  if (rc) rc.textContent = `Showing ${list.length} of ${agents.length} agents`;
  setupRevealAnimations();
}
function filterByCategory(cat) { setFilter(cat); }

/* ===== AGENT DETAIL MODAL ===== */
function openAgentDetail(id) {
  if (typeof agents === 'undefined') return;
  const a = agents.find(x => x.id === id);
  if (!a) return;

  // Generate rating breakdown (simulated)
  const totalReviews = a.reviews || 100;
  const breakdowns = [
    Math.round(totalReviews * 0.65),
    Math.round(totalReviews * 0.20),
    Math.round(totalReviews * 0.08),
    Math.round(totalReviews * 0.04),
    Math.round(totalReviews * 0.03),
  ];

  // Find similar agents
  const similar = agents.filter(x => x.id !== a.id && x.category === a.category).slice(0, 3);

  const html = `
    <div class="detail-header">
      <div class="detail-logo">${a.logo ? `<img src="${a.logo}" alt="" onerror="this.parentNode.textContent='${getCategoryIcon(a.category)}'">` : getCategoryIcon(a.category)}</div>
      <div class="detail-info">
        <h1>${escapeHTML(a.name)}</h1>
        <p class="tagline">${escapeHTML(a.tagline || a.category)}</p>
      </div>
    </div>
    <div class="detail-meta">
      <span class="detail-meta-item">⭐ ${a.rating}/5</span>
      <span class="detail-meta-item">💰 ${escapeHTML(a.pricing)}</span>
      <span class="detail-meta-item">📁 ${escapeHTML(a.category)}</span>
      <span class="detail-meta-item">👁 ${formatNumber(a.views || 0)} views</span>
      ${a.year ? `<span class="detail-meta-item">📅 ${a.year}</span>` : ''}
    </div>
    <div class="detail-rating-breakdown">
      <div>
        <div class="rating-big">${a.rating}</div>
        <div class="rating-total">${formatNumber(totalReviews)} reviews</div>
      </div>
      <div class="rating-bars">
        ${[5,4,3,2,1].map((star, i) => `
          <div class="rating-bar-row">
            <span class="rating-bar-label">${star}</span>
            <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${Math.round((breakdowns[i] / totalReviews) * 100)}%"></div></div>
            <span class="rating-bar-count">${breakdowns[i]}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <p class="detail-description">${escapeHTML(a.description)}</p>
    <div class="detail-tags">${(a.tags || []).map(t => `<span class="detail-tag">${escapeHTML(t)}</span>`).join('')}</div>
    ${similar.length ? `
    <div class="detail-similar">
      <div class="detail-similar-label">Similar Agents</div>
      <div class="detail-similar-grid">
        ${similar.map(s => `
          <div class="similar-card" onclick="closeModal();setTimeout(()=>openAgentDetail(${s.id}),300)">
            <div class="similar-name">${escapeHTML(s.name)}</div>
            <div class="similar-cat">${escapeHTML(s.category)} · ⭐ ${s.rating}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
    <div class="detail-actions">
      <a href="${a.url || '#'}" target="_blank" rel="noopener" class="btn-primary">🚀 Try ${escapeHTML(a.name)} Free</a>
      <button class="btn-secondary" onclick="toggleCompare(${a.id});closeModal()">⚖️ Add to Compare</button>
    </div>
    <div style="text-align:center;margin-top:0.75rem;font-size:0.75rem;color:var(--text-muted)">🛡️ Verified listing · 30-day guarantee</div>
  `;
  showModal(a.name, html);
}

/* ===== SUBMIT MODAL ===== */
function openSubmitModal() {
  const html = `
    <p class="form-intro">List your AI agent on AgentStack and reach thousands of potential users. Free tier available — get started in 60 seconds.</p>
    <form id="submit-form" onsubmit="handleSubmit(event)">
      <div class="form-row">
        <div class="form-group"><label>Agent Name <span class="req">*</span></label><input type="text" placeholder="e.g. MyAgent AI" required></div>
        <div class="form-group"><label>Website <span class="req">*</span></label><input type="url" placeholder="https://..." required></div>
      </div>
      <div class="form-group"><label>Category <span class="req">*</span></label>
        <select required><option value="">Select category...</option>
        ${Object.keys(categoryIcons).map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Short Description <span class="req">*</span></label><textarea placeholder="What does your agent do?" required></textarea></div>
      <div class="form-row">
        <div class="form-group"><label>Pricing</label><input type="text" placeholder="e.g. Free / $20/mo"></div>
        <div class="form-group"><label>Your Email <span class="req">*</span></label><input type="email" placeholder="you@company.com" required></div>
      </div>
      <button type="submit" class="form-submit">🚀 Submit Agent — It's Free</button>
    </form>
  `;
  showModal('Submit Your Agent', html);
}

/* ===== MODAL HELPERS ===== */
function showModal(title, bodyHTML, extraClass) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  const header = overlay.querySelector('.modal-header h2');
  const body = overlay.querySelector('.modal-body');
  const modal = overlay.querySelector('.modal');
  if (header) header.textContent = title;
  if (body) body.innerHTML = bodyHTML;
  if (modal) { modal.className = 'modal' + (extraClass ? ' ' + extraClass : ''); }
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ===== FORM HANDLERS ===== */
function handleSubmit(e) {
  e.preventDefault();
  closeModal();
  launchConfetti();
  showToast('🎉 Agent submitted! We\'ll review it within 24 hours.');
}
function handleNewsletter(e) {
  e.preventDefault();
  const inp = e.target.querySelector('input');
  if (inp && inp.value) {
    inp.value = '';
    launchConfetti();
    showToast('🎉 Welcome aboard! Check your inbox for a confirmation.');
  }
}

/* ===== CONFETTI ===== */
function launchConfetti() {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(container);
  const colors = ['#a78bfa','#06b6d4','#34d399','#fbbf24','#f472b6','#818cf8','#f97316'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * 100;
    const delay = Math.random() * 0.3;
    const size = 6 + Math.random() * 6;
    c.style.cssText = `position:absolute;top:-10px;left:${x}%;width:${size}px;height:${size}px;background:${color};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};animation:confettiFall ${1.5 + Math.random()}s ease-in ${delay}s forwards;`;
    container.appendChild(c);
  }
  // Inject animation if not present
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `@keyframes confettiFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }`;
    document.head.appendChild(style);
  }
  setTimeout(() => container.remove(), 3000);
}

/* ===== TOAST ===== */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ===== EVENT LISTENERS ===== */
function setupEventListeners() {
  // Theme
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Hamburger
  const ham = document.querySelector('.nav-hamburger');
  if (ham) ham.addEventListener('click', toggleMobileMenu);

  // Submit CTA
  document.querySelectorAll('[data-action="submit"]').forEach(el => el.addEventListener('click', openSubmitModal));

  // Mobile sticky CTA
  const mobileCTA = document.querySelector('.mobile-sticky-cta button');
  if (mobileCTA) mobileCTA.addEventListener('click', openSubmitModal);

  // Compare
  const compareGoBtn = document.querySelector('.compare-btn-go');
  if (compareGoBtn) compareGoBtn.addEventListener('click', openCompareModal);
  const compareClearBtn = document.querySelector('.compare-btn-clear');
  if (compareClearBtn) compareClearBtn.addEventListener('click', clearCompare);

  // Modal close
  const modalClose = document.querySelector('.modal-close');
  if (modalClose) modalClose.addEventListener('click', closeModal);
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });

  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => setSort(btn.dataset.sort));
  });

  // Search tags
  document.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const inp = document.querySelector('.search-box input');
      if (inp) { inp.value = tag.textContent.trim(); searchFor(inp.value); }
    });
  });

  // Newsletter
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) nlForm.addEventListener('submit', handleNewsletter);

  // Back to top in footer
  document.querySelectorAll('[href="#"]').forEach(l => {
    l.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}
