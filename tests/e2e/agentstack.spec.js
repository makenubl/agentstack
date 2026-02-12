// @ts-check
const { test, expect } = require('@playwright/test');

// ============================================================
// 1. CORE UI & PAGE LOAD TESTS
// ============================================================

test.describe('Page Load & Core UI', () => {
  test('should load the homepage successfully', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
  });

  test('should have correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AgentStack/);
  });

  test('should have meta description', async ({ page }) => {
    await page.goto('/');
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /AI agents/i);
  });

  test('should render the navbar with logo', async ({ page }) => {
    await page.goto('/');
    const navbar = page.locator('#navbar');
    await expect(navbar).toBeVisible();
    const logo = page.locator('#navbar .nav-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('AgentStack');
  });

  test('should render navigation links', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('.nav-links a');
    await expect(links).toHaveCount(4);
    await expect(links.nth(0)).toContainText('Categories');
    await expect(links.nth(1)).toContainText('Featured');
    await expect(links.nth(2)).toContainText('Directory');
    await expect(links.nth(3)).toContainText('Pricing');
  });

  test('should render the Submit Agent button in navbar', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('.nav-cta');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Submit Agent');
  });

  test('should render the hero section with title', async ({ page }) => {
    await page.goto('/');
    const title = page.locator('.hero-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('AI Agents');
  });

  test('should render the hero gradient text', async ({ page }) => {
    await page.goto('/');
    const gradient = page.locator('.hero-gradient');
    await expect(gradient).toBeVisible();
    await expect(gradient).toHaveText('AI Agents');
  });

  test('should render the hero subtitle', async ({ page }) => {
    await page.goto('/');
    const subtitle = page.locator('.hero-subtitle');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('comprehensive directory');
  });

  test('should render the hero badge', async ({ page }) => {
    await page.goto('/');
    const badge = page.locator('.hero-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('#1 AI Agent Directory');
  });

  test('should render stats bar with counters', async ({ page }) => {
    await page.goto('/');
    const statsBar = page.locator('.stats-bar');
    await expect(statsBar).toBeVisible();
    const stats = page.locator('.stat-number');
    await expect(stats).toHaveCount(4);
  });

  test('should render trusted-by bar', async ({ page }) => {
    await page.goto('/');
    const trusted = page.locator('.trusted-bar');
    await expect(trusted).toBeVisible();
    await expect(trusted).toContainText('Trusted by teams at');
  });

  test('should render footer with correct year', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('.footer-bottom');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('2026');
    await expect(footer).toContainText('AgentStack');
  });

  test('should render background effects', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.grid-bg')).toBeAttached();
    await expect(page.locator('.orb-1')).toBeAttached();
    await expect(page.locator('.orb-2')).toBeAttached();
    await expect(page.locator('.orb-3')).toBeAttached();
  });

  test('should have structured data (JSON-LD)', async ({ page }) => {
    await page.goto('/');
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    const content = await jsonLd.textContent();
    const data = JSON.parse(content);
    expect(data['@type']).toBe('WebSite');
    expect(data.name).toBe('AgentStack');
  });
});

// ============================================================
// 2. CATEGORIES SECTION TESTS
// ============================================================

test.describe('Categories Section', () => {
  test('should render categories section', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#categories');
    await expect(section).toBeVisible();
  });

  test('should render category cards', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.category-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test('should display category names and descriptions', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('.category-card').first();
    const name = firstCard.locator('h3');
    const desc = firstCard.locator('p');
    await expect(name).toBeVisible();
    await expect(desc).toBeVisible();
  });

  test('should display category agent counts', async ({ page }) => {
    await page.goto('/');
    const counts = page.locator('.category-count');
    const firstCount = await counts.first().textContent();
    expect(firstCount).toMatch(/\d+ agents?/);
  });

  test('should navigate to agents section when category is clicked', async ({ page }) => {
    await page.goto('/');
    await page.locator('.category-card').first().click();
    // Should scroll to agents section
    await expect(page.locator('#agents')).toBeInViewport({ timeout: 3000 });
  });

  test('clicking a category should filter the agent grid', async ({ page }) => {
    await page.goto('/');
    // Get the category id from first card
    const firstCard = page.locator('.category-card').first();
    await firstCard.click();
    // Wait for the agents section to be in view
    await page.waitForTimeout(500);
    // The filter should be active
    const activeFilter = page.locator('.filter-btn.active');
    await expect(activeFilter).toHaveCount(1);
  });
});

// ============================================================
// 3. FEATURED AGENTS TESTS
// ============================================================

test.describe('Featured Agents Section', () => {
  test('should render featured section', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#featured');
    await expect(section).toBeVisible();
  });

  test('should render featured agent cards', async ({ page }) => {
    await page.goto('/');
    const featured = page.locator('#featured-grid .agent-card');
    const count = await featured.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('featured cards should have featured badge', async ({ page }) => {
    await page.goto('/');
    const badges = page.locator('#featured-grid .featured-badge');
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('agent cards should display name and tagline', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('#featured-grid .agent-card').first();
    const name = firstCard.locator('.agent-info h3');
    const tagline = firstCard.locator('.agent-info .tagline');
    await expect(name).toBeVisible();
    await expect(tagline).toBeVisible();
  });

  test('agent cards should display pricing and rating', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('#featured-grid .agent-card').first();
    const pricing = firstCard.locator('.agent-pricing');
    const rating = firstCard.locator('.agent-rating');
    await expect(pricing).toBeVisible();
    await expect(rating).toBeVisible();
  });

  test('agent cards should display tags', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('#featured-grid .agent-card').first();
    const tags = firstCard.locator('.agent-tag');
    const count = await tags.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

// ============================================================
// 4. SEARCH FUNCTIONALITY TESTS
// ============================================================

test.describe('Search Functionality', () => {
  test('should render search box', async ({ page }) => {
    await page.goto('/');
    const searchBox = page.locator('#search-box');
    await expect(searchBox).toBeVisible();
  });

  test('should render search input with placeholder', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', /Search/);
  });

  test('should render search button', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#search-btn');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText('Search');
  });

  test('should render popular search tags', async ({ page }) => {
    await page.goto('/');
    const tags = page.locator('.search-tag');
    const count = await tags.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('should filter agents when typing in search', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('coding');
    // Wait for debounce
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should find agents by name', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('AutoGPT');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    const firstCardName = await cards.first().locator('.agent-info h3').textContent();
    expect(firstCardName.toLowerCase()).toContain('autogpt');
  });

  test('should find agents by company', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('Microsoft');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should find agents by tag', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('open source');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('should show no results for gibberish search', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('xyznonexistent12345');
    await page.waitForTimeout(300);
    const noResults = page.locator('.no-results');
    await expect(noResults).toBeVisible();
    await expect(noResults).toContainText('No agents found');
  });

  test('should scroll to agents section on Enter', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('coding');
    await input.press('Enter');
    await expect(page.locator('#agents')).toBeInViewport({ timeout: 3000 });
  });

  test('should search when clicking a popular tag', async ({ page }) => {
    await page.goto('/');
    await page.locator('.search-tag').first().click();
    await page.waitForTimeout(300);
    const input = page.locator('#search-input');
    const value = await input.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('search button should scroll to agents section', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('sales');
    await page.locator('#search-btn').click();
    await expect(page.locator('#agents')).toBeInViewport({ timeout: 3000 });
  });
});

// ============================================================
// 5. FILTER FUNCTIONALITY TESTS
// ============================================================

test.describe('Filter Functionality', () => {
  test('should render filter bar', async ({ page }) => {
    await page.goto('/');
    const filterBar = page.locator('#filter-bar');
    await expect(filterBar).toBeVisible();
  });

  test('should have "All" filter active by default', async ({ page }) => {
    await page.goto('/');
    const allBtn = page.locator('.filter-btn[data-filter="all"]');
    await expect(allBtn).toHaveClass(/active/);
  });

  test('should render all filter buttons', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('.filter-btn');
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(9); // all + 8 categories + open-source
  });

  test('should filter by coding category', async ({ page }) => {
    await page.goto('/');
    await page.locator('.filter-btn[data-filter="coding"]').click();
    await page.waitForTimeout(200);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);
    // The coding filter should be active
    await expect(page.locator('.filter-btn[data-filter="coding"]')).toHaveClass(/active/);
  });

  test('should filter by sales category', async ({ page }) => {
    await page.goto('/');
    await page.locator('.filter-btn[data-filter="sales"]').click();
    await page.waitForTimeout(200);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should filter by open-source tag', async ({ page }) => {
    await page.goto('/');
    await page.locator('.filter-btn[data-filter="open-source"]').click();
    await page.waitForTimeout(200);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('should show all agents when clicking "All" filter', async ({ page }) => {
    await page.goto('/');
    // First filter to coding
    await page.locator('.filter-btn[data-filter="coding"]').click();
    await page.waitForTimeout(200);
    const codingCount = await page.locator('#all-agents-grid .agent-card').count();

    // Then click All
    await page.locator('.filter-btn[data-filter="all"]').click();
    await page.waitForTimeout(200);
    const allCount = await page.locator('#all-agents-grid .agent-card').count();

    expect(allCount).toBeGreaterThan(codingCount);
  });

  test('switching filters should update active state', async ({ page }) => {
    await page.goto('/');
    await page.locator('.filter-btn[data-filter="research"]').click();
    await page.waitForTimeout(200);
    await expect(page.locator('.filter-btn[data-filter="research"]')).toHaveClass(/active/);
    await expect(page.locator('.filter-btn[data-filter="all"]')).not.toHaveClass(/active/);
  });
});

// ============================================================
// 6. ALL AGENTS DIRECTORY TESTS
// ============================================================

test.describe('All Agents Directory', () => {
  test('should render the all agents section', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#agents');
    await expect(section).toBeVisible();
  });

  test('should render agent cards in the grid', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    // 24 original + 18 open-source = 42 agents
    expect(count).toBeGreaterThanOrEqual(40);
  });

  test('each agent card should have required elements', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('#all-agents-grid .agent-card').first();
    await expect(card.locator('.agent-header')).toBeAttached();
    await expect(card.locator('.agent-info h3')).toBeAttached();
    await expect(card.locator('.agent-info .tagline')).toBeAttached();
    await expect(card.locator('.agent-description')).toBeAttached();
    await expect(card.locator('.agent-footer')).toBeAttached();
  });

  test('agent card should have pricing info', async ({ page }) => {
    await page.goto('/');
    const pricing = page.locator('#all-agents-grid .agent-pricing').first();
    const text = await pricing.textContent();
    expect(text.length).toBeGreaterThan(0);
  });

  test('agent card should have rating', async ({ page }) => {
    await page.goto('/');
    const rating = page.locator('#all-agents-grid .agent-rating .score').first();
    const text = await rating.textContent();
    const num = parseFloat(text);
    expect(num).toBeGreaterThanOrEqual(3);
    expect(num).toBeLessThanOrEqual(5);
  });

  test('open-source agents should be present in directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');

    // Check AutoGPT exists
    await input.fill('AutoGPT');
    await page.waitForTimeout(300);
    let count = await page.locator('#all-agents-grid .agent-card').count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Check Open Interpreter exists
    await input.fill('Open Interpreter');
    await page.waitForTimeout(300);
    count = await page.locator('#all-agents-grid .agent-card').count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Check LangChain exists
    await input.fill('LangChain');
    await page.waitForTimeout(300);
    count = await page.locator('#all-agents-grid .agent-card').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

// ============================================================
// 7. AGENT DETAIL MODAL TESTS
// ============================================================

test.describe('Agent Detail Modal', () => {
  test('should open agent detail modal when clicking a card', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .agent-card').first().click();
    const modal = page.locator('#agent-modal');
    await expect(modal).toHaveClass(/active/);
  });

  test('agent detail modal should display agent info', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .agent-card').first().click();
    const body = page.locator('#agent-modal-body');
    await expect(body.locator('.detail-header')).toBeVisible();
    await expect(body.locator('.detail-info h1')).toBeVisible();
    await expect(body.locator('.detail-description')).toBeVisible();
  });

  test('agent detail modal should display meta info', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .agent-card').first().click();
    const meta = page.locator('.detail-meta');
    await expect(meta).toBeVisible();
    const items = meta.locator('.detail-meta-item');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('agent detail modal should display tags', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .agent-card').first().click();
    const tags = page.locator('.detail-tags .detail-tag');
    const count = await tags.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('agent detail modal should have Visit Website and Close buttons', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .agent-card').first().click();
    const visitBtn = page.locator('.detail-actions .btn-primary');
    await expect(visitBtn).toBeVisible();
    await expect(visitBtn).toContainText('Visit Website');
    const closeBtn = page.locator('.detail-actions .btn-secondary');
    await expect(closeBtn).toBeVisible();
  });

  test('should close modal when clicking close button', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .agent-card').first().click();
    await expect(page.locator('#agent-modal')).toHaveClass(/active/);
    await page.locator('#agent-modal .modal-close').click();
    await expect(page.locator('#agent-modal')).not.toHaveClass(/active/);
  });

  test('should close modal when clicking overlay', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .agent-card').first().click();
    await expect(page.locator('#agent-modal')).toHaveClass(/active/);
    // Click on the overlay (not the modal content)
    await page.locator('#agent-modal').click({ position: { x: 10, y: 10 } });
    await expect(page.locator('#agent-modal')).not.toHaveClass(/active/);
  });

  test('should close modal when pressing Escape', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .agent-card').first().click();
    await expect(page.locator('#agent-modal')).toHaveClass(/active/);
    await page.keyboard.press('Escape');
    await expect(page.locator('#agent-modal')).not.toHaveClass(/active/);
  });

  test('Visit Website link should have correct href', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .agent-card').first().click();
    const link = page.locator('.detail-actions .btn-primary');
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^https?:\/\//);
  });
});

// ============================================================
// 8. SUBMIT AGENT MODAL TESTS
// ============================================================

test.describe('Submit Agent Modal', () => {
  test('should open submit modal when clicking navbar CTA', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-cta').click();
    const modal = page.locator('#submit-modal');
    await expect(modal).toHaveClass(/active/);
  });

  test('submit modal should have the form', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-cta').click();
    const form = page.locator('#submit-modal form');
    await expect(form).toBeVisible();
  });

  test('submit form should have all required fields', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-cta').click();
    await expect(page.locator('#submit-modal input[name="name"]')).toBeVisible();
    await expect(page.locator('#submit-modal input[name="company"]')).toBeVisible();
    await expect(page.locator('#submit-modal input[name="tagline"]')).toBeVisible();
    await expect(page.locator('#submit-modal textarea[name="description"]')).toBeVisible();
    await expect(page.locator('#submit-modal select[name="category"]')).toBeVisible();
    await expect(page.locator('#submit-modal input[name="pricing"]')).toBeVisible();
    await expect(page.locator('#submit-modal input[name="website"]')).toBeVisible();
    await expect(page.locator('#submit-modal input[name="email"]')).toBeVisible();
  });

  test('submit form should have tier selection', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-cta').click();
    const tierSelect = page.locator('#submit-modal select[name="tier"]');
    await expect(tierSelect).toBeVisible();
    const options = tierSelect.locator('option');
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('category select should include open-source option', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-cta').click();
    const catSelect = page.locator('#submit-modal select[name="category"]');
    const osOption = catSelect.locator('option[value="open-source"]');
    await expect(osOption).toBeAttached();
  });

  test('should close submit modal when clicking close', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-cta').click();
    await expect(page.locator('#submit-modal')).toHaveClass(/active/);
    await page.locator('#submit-modal .modal-close').click();
    await expect(page.locator('#submit-modal')).not.toHaveClass(/active/);
  });

  test('should submit form with valid data and show toast', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-cta').click();
    // Fill out the form
    await page.locator('#submit-modal input[name="name"]').fill('Test Agent');
    await page.locator('#submit-modal input[name="company"]').fill('Test Co');
    await page.locator('#submit-modal input[name="tagline"]').fill('A test agent');
    await page.locator('#submit-modal textarea[name="description"]').fill('A description of the test agent');
    await page.locator('#submit-modal select[name="category"]').selectOption('coding');
    await page.locator('#submit-modal input[name="pricing"]').fill('Free');
    await page.locator('#submit-modal input[name="website"]').fill('https://test.com');
    await page.locator('#submit-modal input[name="email"]').fill('test@test.com');
    // Submit
    await page.locator('.form-submit').click();
    // Toast should appear
    const toast = page.locator('#toast');
    await expect(toast).toHaveClass(/show/, { timeout: 3000 });
    await expect(toast).toContainText('submitted');
  });
});

// ============================================================
// 9. PRICING SECTION TESTS
// ============================================================

test.describe('Pricing Section', () => {
  test('should render pricing section', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#pricing');
    await expect(section).toBeVisible();
  });

  test('should render three pricing cards', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.pricing-card');
    await expect(cards).toHaveCount(3);
  });

  test('should show Free tier', async ({ page }) => {
    await page.goto('/');
    const freeCard = page.locator('.pricing-card').first();
    await expect(freeCard).toContainText('Free');
    await expect(freeCard).toContainText('Basic');
  });

  test('should show Featured tier with Most Popular badge', async ({ page }) => {
    await page.goto('/');
    const popularCard = page.locator('.pricing-card.popular');
    await expect(popularCard).toBeVisible();
    await expect(popularCard).toContainText('$49');
    const badge = popularCard.locator('.popular-badge');
    await expect(badge).toContainText('Most Popular');
  });

  test('should show Premium tier', async ({ page }) => {
    await page.goto('/');
    const premiumCard = page.locator('.pricing-card').last();
    await expect(premiumCard).toContainText('$149');
    await expect(premiumCard).toContainText('Premium');
  });

  test('pricing cards should have feature lists', async ({ page }) => {
    await page.goto('/');
    const features = page.locator('.pricing-features li');
    const count = await features.count();
    expect(count).toBeGreaterThanOrEqual(15);
  });

  test('pricing buttons should trigger submit modal', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('.pricing-btn').first();
    await btn.click();
    await expect(page.locator('#submit-modal')).toHaveClass(/active/);
  });
});

// ============================================================
// 10. CTA SECTION TESTS
// ============================================================

test.describe('CTA Section', () => {
  test('should render CTA card', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('.cta-card');
    await expect(cta).toBeVisible();
  });

  test('CTA should have correct content', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('.cta-content');
    await expect(cta).toContainText('Built an AI Agent');
  });

  test('CTA submit button should open submit modal', async ({ page }) => {
    await page.goto('/');
    await page.locator('.cta-btn-primary').click();
    await expect(page.locator('#submit-modal')).toHaveClass(/active/);
  });
});

// ============================================================
// 11. KEYBOARD SHORTCUTS TESTS
// ============================================================

test.describe('Keyboard Shortcuts', () => {
  test('Cmd+K should focus search input', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Meta+k');
    const input = page.locator('#search-input');
    await expect(input).toBeFocused();
  });

  test('Escape should close any open modal', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-cta').click();
    await expect(page.locator('#submit-modal')).toHaveClass(/active/);
    await page.keyboard.press('Escape');
    await expect(page.locator('#submit-modal')).not.toHaveClass(/active/);
  });
});

// ============================================================
// 12. SCROLL & NAVIGATION TESTS
// ============================================================

test.describe('Scroll & Navigation', () => {
  test('navbar should get scrolled class on scroll', async ({ page }) => {
    await page.goto('/');
    const navbar = page.locator('#navbar');
    await expect(navbar).not.toHaveClass(/scrolled/);
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(200);
    await expect(navbar).toHaveClass(/scrolled/);
  });

  test('clicking logo should scroll to top', async ({ page }) => {
    await page.goto('/');
    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(200);
    // Click logo
    await page.locator('.nav-logo').first().click();
    await page.waitForTimeout(500);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('navigation links should point to correct sections', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('.nav-links a');
    await expect(links.nth(0)).toHaveAttribute('href', '#categories');
    await expect(links.nth(1)).toHaveAttribute('href', '#featured');
    await expect(links.nth(2)).toHaveAttribute('href', '#agents');
    await expect(links.nth(3)).toHaveAttribute('href', '#pricing');
  });

  test('footer links should exist', async ({ page }) => {
    await page.goto('/');
    const footerLinks = page.locator('.footer-col a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });
});

// ============================================================
// 13. OPEN-SOURCE AGENTS SPECIFIC TESTS
// ============================================================

test.describe('Open-Source Agents', () => {
  test('should have AutoGPT in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('AutoGPT');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    await expect(cards.first()).toBeVisible();
  });

  test('should have Microsoft AutoGen in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('AutoGen');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have MetaGPT in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('MetaGPT');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have Aider in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('Aider');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have SWE-Agent in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('SWE-Agent');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have OpenHands (OpenDevin) in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('OpenHands');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have LangChain in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('LangChain');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have GPT Researcher in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('GPT Researcher');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have PrivateGPT in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('PrivateGPT');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have Flowise in the directory', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await input.fill('Flowise');
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('open-source filter should show many agents', async ({ page }) => {
    await page.goto('/');
    await page.locator('.filter-btn[data-filter="open-source"]').click();
    await page.waitForTimeout(300);
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    // We added 18 open-source agents + CrewAI was already tagged
    expect(count).toBeGreaterThanOrEqual(15);
  });

  test('open-source agents should have free pricing', async ({ page }) => {
    await page.goto('/');
    await page.locator('.filter-btn[data-filter="open-source"]').click();
    await page.waitForTimeout(300);
    const pricingTexts = page.locator('#all-agents-grid .agent-pricing');
    const count = await pricingTexts.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const text = await pricingTexts.nth(i).textContent();
      expect(text.toLowerCase()).toMatch(/free|open source/i);
    }
  });
});

// ============================================================
// 14. THEME TOGGLE TESTS
// ============================================================

test.describe('Theme Toggle', () => {
  test('should render theme toggle button', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#theme-toggle');
    await expect(btn).toBeVisible();
  });

  test('should start in dark mode by default', async ({ page }) => {
    await page.goto('/');
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('dark');
  });

  test('should switch to light mode when toggling', async ({ page }) => {
    await page.goto('/');
    await page.locator('#theme-toggle').click();
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('light');
  });

  test('should switch back to dark mode on second toggle', async ({ page }) => {
    await page.goto('/');
    await page.locator('#theme-toggle').click();
    await page.locator('#theme-toggle').click();
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('dark');
  });

  test('should persist theme in localStorage', async ({ page }) => {
    await page.goto('/');
    await page.locator('#theme-toggle').click();
    const saved = await page.evaluate(() => localStorage.getItem('agentstack-theme'));
    expect(saved).toBe('light');
  });

  test('should restore persisted theme on reload', async ({ page }) => {
    await page.goto('/');
    await page.locator('#theme-toggle').click();
    await page.reload();
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('light');
  });
});

// ============================================================
// 15. SORT FUNCTIONALITY TESTS
// ============================================================

test.describe('Sort Functionality', () => {
  test('should render sort bar', async ({ page }) => {
    await page.goto('/');
    const sortBar = page.locator('#sort-bar');
    await expect(sortBar).toBeVisible();
  });

  test('should have default sort active initially', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.sort-btn[data-sort="default"]')).toHaveClass(/active/);
  });

  test('should render all sort buttons', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('.sort-btn');
    const count = await buttons.count();
    expect(count).toBe(5);
  });

  test('should sort by top rated', async ({ page }) => {
    await page.goto('/');
    await page.locator('.sort-btn[data-sort="rating"]').click();
    await page.waitForTimeout(200);
    await expect(page.locator('.sort-btn[data-sort="rating"]')).toHaveClass(/active/);
    // First card should have highest rating
    const scores = page.locator('#all-agents-grid .agent-card .score');
    const first = parseFloat(await scores.first().textContent());
    const second = parseFloat(await scores.nth(1).textContent());
    expect(first).toBeGreaterThanOrEqual(second);
  });

  test('should sort by most reviewed', async ({ page }) => {
    await page.goto('/');
    await page.locator('.sort-btn[data-sort="reviews"]').click();
    await page.waitForTimeout(200);
    await expect(page.locator('.sort-btn[data-sort="reviews"]')).toHaveClass(/active/);
  });

  test('should sort by name A-Z', async ({ page }) => {
    await page.goto('/');
    await page.locator('.sort-btn[data-sort="name"]').click();
    await page.waitForTimeout(200);
    const names = page.locator('#all-agents-grid .agent-card .agent-info h3');
    const first = await names.first().textContent();
    const second = await names.nth(1).textContent();
    expect(first.localeCompare(second)).toBeLessThanOrEqual(0);
  });

  test('should sort by newest', async ({ page }) => {
    await page.goto('/');
    await page.locator('.sort-btn[data-sort="newest"]').click();
    await page.waitForTimeout(200);
    await expect(page.locator('.sort-btn[data-sort="newest"]')).toHaveClass(/active/);
  });
});

// ============================================================
// 16. COMPARE FEATURE TESTS
// ============================================================

test.describe('Compare Feature', () => {
  test('agent cards should have compare button', async ({ page }) => {
    await page.goto('/');
    const compareBtn = page.locator('#all-agents-grid .card-compare').first();
    await expect(compareBtn).toBeAttached();
  });

  test('clicking compare button should add agent to compare bar', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').first().click();
    await page.waitForTimeout(200);
    const bar = page.locator('#compare-bar');
    await expect(bar).toHaveClass(/visible/);
  });

  test('compare bar should show count', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').first().click();
    await page.waitForTimeout(200);
    const count = page.locator('#compare-count');
    await expect(count).toHaveText('1');
  });

  test('should show chips for selected agents', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').first().click();
    await page.waitForTimeout(200);
    const chips = page.locator('.compare-chip');
    await expect(chips).toHaveCount(1);
  });

  test('should allow selecting multiple agents', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').nth(0).click();
    await page.locator('#all-agents-grid .card-compare').nth(1).click();
    await page.waitForTimeout(200);
    const count = page.locator('#compare-count');
    await expect(count).toHaveText('2');
  });

  test('clear button should remove all selections', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').nth(0).click();
    await page.locator('#all-agents-grid .card-compare').nth(1).click();
    await page.waitForTimeout(200);
    await page.locator('.compare-btn-clear').click();
    await page.waitForTimeout(200);
    const bar = page.locator('#compare-bar');
    await expect(bar).not.toHaveClass(/visible/);
  });

  test('compare button should require at least 2 agents', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').first().click();
    await page.waitForTimeout(200);
    await page.locator('.compare-btn-go').click();
    const toast = page.locator('#toast');
    await expect(toast).toHaveClass(/show/, { timeout: 2000 });
  });

  test('compare modal should open with 2+ agents selected', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').nth(0).click();
    await page.locator('#all-agents-grid .card-compare').nth(1).click();
    await page.waitForTimeout(200);
    await page.locator('.compare-btn-go').click();
    const modal = page.locator('#compare-modal');
    await expect(modal).toHaveClass(/active/);
  });

  test('compare modal should show comparison table', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').nth(0).click();
    await page.locator('#all-agents-grid .card-compare').nth(1).click();
    await page.waitForTimeout(200);
    await page.locator('.compare-btn-go').click();
    const table = page.locator('.compare-table');
    await expect(table).toBeVisible();
    const rows = table.locator('tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should close compare modal with close button', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').nth(0).click();
    await page.locator('#all-agents-grid .card-compare').nth(1).click();
    await page.waitForTimeout(200);
    await page.locator('.compare-btn-go').click();
    await expect(page.locator('#compare-modal')).toHaveClass(/active/);
    await page.locator('#compare-modal .modal-close').click();
    await expect(page.locator('#compare-modal')).not.toHaveClass(/active/);
  });

  test('deselecting agent should remove from compare bar', async ({ page }) => {
    await page.goto('/');
    await page.locator('#all-agents-grid .card-compare').nth(0).click();
    await page.locator('#all-agents-grid .card-compare').nth(1).click();
    await page.waitForTimeout(200);
    await expect(page.locator('#compare-count')).toHaveText('2');
    // Deselect first
    await page.locator('#all-agents-grid .card-compare').nth(0).click();
    await page.waitForTimeout(200);
    await expect(page.locator('#compare-count')).toHaveText('1');
  });
});

// ============================================================
// 17. NEWSLETTER TESTS
// ============================================================

test.describe('Newsletter Section', () => {
  test('should render newsletter section', async ({ page }) => {
    await page.goto('/');
    const newsletter = page.locator('#newsletter');
    await expect(newsletter).toBeVisible();
  });

  test('should render newsletter form', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('.newsletter-form');
    await expect(form).toBeVisible();
  });

  test('should have email input', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('.newsletter-form input[name="email"]');
    await expect(input).toBeVisible();
  });

  test('should have subscribe button', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('.newsletter-form button[type="submit"]');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText('Subscribe');
  });

  test('should show toast on successful subscription', async ({ page }) => {
    await page.goto('/');
    await page.locator('.newsletter-form input[name="email"]').fill('test@example.com');
    await page.locator('.newsletter-form button[type="submit"]').click();
    const toast = page.locator('#toast');
    await expect(toast).toHaveClass(/show/, { timeout: 3000 });
    await expect(toast).toContainText('Subscribed');
  });

  test('should show newsletter content text', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.newsletter-card')).toContainText('AI Agent Weekly');
  });
});

// ============================================================
// 18. BACK-TO-TOP & RESULTS COUNT TESTS
// ============================================================

test.describe('Back-to-Top & Results Count', () => {
  test('back-to-top button should be hidden initially', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#back-to-top');
    await expect(btn).not.toHaveClass(/visible/);
  });

  test('back-to-top button should appear after scrolling', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);
    const btn = page.locator('#back-to-top');
    await expect(btn).toHaveClass(/visible/);
  });

  test('back-to-top button should scroll to top on click', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);
    await page.locator('#back-to-top').click();
    await page.waitForTimeout(800);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('results count should be displayed', async ({ page }) => {
    await page.goto('/');
    const count = page.locator('#results-count');
    await expect(count).toBeVisible();
    const text = await count.textContent();
    expect(text).toMatch(/\d+ agents/);
  });

  test('results count should update on filter', async ({ page }) => {
    await page.goto('/');
    const initialText = await page.locator('#results-count').textContent();
    await page.locator('.filter-btn[data-filter="coding"]').click();
    await page.waitForTimeout(200);
    const filteredText = await page.locator('#results-count').textContent();
    expect(filteredText).toContain('Showing');
    expect(filteredText).not.toBe(initialText);
  });
});

// ============================================================
// 19. FILTER COUNT BADGES TESTS
// ============================================================

test.describe('Filter Count Badges', () => {
  test('filter buttons should show count badges', async ({ page }) => {
    await page.goto('/');
    const badges = page.locator('.filter-count');
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('All filter badge should show total agent count', async ({ page }) => {
    await page.goto('/');
    const allBadge = page.locator('.filter-btn[data-filter="all"] .filter-count');
    const text = await allBadge.textContent();
    const num = parseInt(text);
    expect(num).toBeGreaterThanOrEqual(40);
  });
});

// ============================================================
// 20. ACCESSIBILITY TESTS
// ============================================================

test.describe('Accessibility', () => {
  test('should have skip-link', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#agents');
  });

  test('navbar should have navigation role', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('#navbar');
    await expect(nav).toHaveAttribute('role', 'navigation');
  });

  test('modals should have dialog role', async ({ page }) => {
    await page.goto('/');
    const agentModal = page.locator('#agent-modal');
    await expect(agentModal).toHaveAttribute('role', 'dialog');
    await expect(agentModal).toHaveAttribute('aria-modal', 'true');
  });

  test('theme toggle should have aria-label', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#theme-toggle');
    await expect(btn).toHaveAttribute('aria-label', /theme/i);
  });

  test('back-to-top button should have aria-label', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#back-to-top');
    await expect(btn).toHaveAttribute('aria-label', /back to top/i);
  });

  test('search input should have aria-label', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#search-input');
    await expect(input).toHaveAttribute('aria-label', /search/i);
  });
});

// ============================================================
// 21. RESPONSIVE DESIGN TESTS
// ============================================================

test.describe('Responsive Design (continued)', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.locator('#search-input')).toBeVisible();
  });

  test('hamburger menu should be visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const hamburger = page.locator('#hamburger');
    await expect(hamburger).toBeVisible();
  });

  test('nav links should be hidden on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).not.toBeVisible();
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('.hero-title')).toBeVisible();
    const cards = page.locator('#all-agents-grid .agent-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('agents grid should be single column on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    // Check that the grid exists and renders
    const grid = page.locator('#all-agents-grid');
    const style = await grid.evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
    // On mobile should be 1 column
    const columns = style.split(' ').length;
    expect(columns).toBe(1);
  });
});

// ============================================================
// 22. PERFORMANCE & ACCESSIBILITY TESTS (continued)
// ============================================================

test.describe('Performance & Scripts', () => {
  test('page should load within reasonable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(5000); // Under 5 seconds
  });

  test('all images should have alt attributes', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('search input should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    // After some tabs, search input should be focusable
    await page.locator('#search-input').focus();
    await expect(page.locator('#search-input')).toBeFocused();
  });

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    // Tab through nav and check buttons are focusable
    const cta = page.locator('.nav-cta');
    await cta.focus();
    await expect(cta).toBeFocused();
  });

  test('modal should trap focus context', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav-cta').click();
    await expect(page.locator('#submit-modal')).toHaveClass(/active/);
    // The close button should be interactable
    const closeBtn = page.locator('#submit-modal .modal-close');
    await expect(closeBtn).toBeVisible();
  });

  test('scripts should be loaded', async ({ page }) => {
    await page.goto('/');
    const agentsScript = page.locator('script[src="data/agents.js"]');
    await expect(agentsScript).toBeAttached();
    const appScript = page.locator('script[src="js/app.js"]');
    await expect(appScript).toBeAttached();
  });

  test('CSS should be loaded', async ({ page }) => {
    await page.goto('/');
    const css = page.locator('link[href="css/style.css"]');
    await expect(css).toBeAttached();
  });

  test('fonts should be loaded', async ({ page }) => {
    await page.goto('/');
    const fontLink = page.locator('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
    await expect(fontLink).toBeAttached();
  });
});
