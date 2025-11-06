// tests/example.spec.ts
import { test, expect, BrowserContext, Page } from "@playwright/test";

const BASE_URL = "https://aiaxio.com";

test.setTimeout(60000);

test.describe.serial("Home page Elements visibility", () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    // One window for the whole file
    context = await browser.newContext({
      viewport: { width: 1500, height: 800 },
    });
    // One tab reused by all tests
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
  });

  test("Navbar functionalities", async () => {
    const navbar = page.getByTestId("navbar-aiaxio"); 
    await expect(navbar).toBeVisible();

    // Test navbar logo
    const navbarLogo = page.getByTestId("navbar-logo");
    await expect(navbarLogo).toBeVisible();
    const navbarLogoHref = await navbarLogo.getAttribute("href");
    await expect(navbarLogoHref).not.toBeNull();
    if (navbarLogoHref !== null) {
      expect(navbarLogoHref).toContain("/");
    }

    // Test Tools link
    const navbarTools = page.getByTestId("nav-link-Tools");
    await expect(navbarTools).toBeVisible();
    await expect(navbarTools).toHaveText("Tools");
    await navbarTools.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/`);

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test Submit Tool link
    const navbarSubmitTools = page.getByTestId("nav-link-Submit Tool");
    await expect(navbarSubmitTools).toBeVisible();
    await expect(navbarSubmitTools).toHaveText("Submit Tool");
    await navbarSubmitTools.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/submit/`);

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test Search link
    const navbarSearch = page.getByTestId("nav-link-Search");
    await expect(navbarSearch).toBeVisible();
    await expect(navbarSearch).toHaveText("Search");
    await navbarSearch.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/search/`);

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test Sign In button
    const navbarSignIn = navbar.getByRole("button", { name: /^Sign In$/ });
    await expect(navbarSignIn).toBeVisible();
    await expect(navbarSignIn).toHaveAccessibleName("Sign In");
    await navbarSignIn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/signin/`); 
    
    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test Sign Up button
    const navbarSignUp = navbar.getByRole("button", { name: /^Sign Up$/ });
    await expect(navbarSignUp).toBeVisible();
    await expect(navbarSignUp).toHaveAccessibleName("Sign Up");
    await navbarSignUp.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/signup/`); 
  });

  test("Home page Hero section functionality", async () => {
    await expect(page).toHaveTitle(/AIAXIO - AI Matched To Your Need/i);

    // Test H1 heading
    const homePageH1 = page.getByRole('heading', { name: 'AIAXIO-AI Matched To Your Need' });
    await expect(homePageH1).toBeVisible();
    await expect(homePageH1).toHaveText(/AIAXIO-AI Matched To Your Need/i);

    // Test search functionality
    const searchBox = page.getByTestId('tool-search-input');
    await searchBox.click();
    await searchBox.fill('test');
    await searchBox.press('Enter');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/s/test/`);

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test Just Landed filter
    const justLandedFilter = page.getByTestId('filter-link-just-landed');
    await justLandedFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/?sortBy=date&sortOrder=desc`);

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test Popular filter
    const popularFilter = page.getByTestId('filter-link-popular');
    await popularFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/?sortBy=rating&sortOrder=desc`);

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test Freemium filter
    const freemiumFilter = page.getByTestId('filter-link-freemium');
    await freemiumFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/?pricingType=freemium`);

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test Free filter
    const freeFilter = page.getByTestId('filter-link-free');
    await freeFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/?pricingType=free`);

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test Trending filter
    const trendingFilter = page.getByTestId('filter-link-trending');
    await trendingFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/trending/`);
  });

  test("Header filter button functionality", async () => {
    const headerJustLanded = page.getByTestId("filter-link-just-landed");
    await expect(headerJustLanded).toBeVisible();
    await expect(headerJustLanded).toHaveText("Just Landed");
    await headerJustLanded.click();
    await expect(page).toHaveURL(
      new RegExp(`^${BASE_URL}/tools/\\?sortBy=date&sortOrder=desc$`)
    );

    // Navigate back to home
    await page.goto(BASE_URL);

    const headerMostPopular = page.getByTestId("filter-link-popular");
    await expect(headerMostPopular).toBeVisible();
    await expect(headerMostPopular).toHaveText("Popular");
    await headerMostPopular.click();
    await expect(page).toHaveURL(
      new RegExp(`^${BASE_URL}/tools/\\?sortBy=rating&sortOrder=desc$`)
    );

    // Navigate back to home
    await page.goto(BASE_URL);

    const headerFreemium = page.getByTestId("filter-link-freemium");
    await expect(headerFreemium).toBeVisible();
    await expect(headerFreemium).toHaveText("Freemium");
    await headerFreemium.click();
    await expect(page).toHaveURL(
      new RegExp(`^${BASE_URL}/tools/\\?pricingType=freemium$`)
    );

    // Navigate back to home
    await page.goto(BASE_URL);

    const headerFree = page.getByTestId("filter-link-free");
    await expect(headerFree).toBeVisible();
    await expect(headerFree).toHaveText("Free");
    await headerFree.click();
    await expect(page).toHaveURL(
      new RegExp(`^${BASE_URL}/tools/\\?pricingType=free$`)
    );

    // Navigate back to home
    await page.goto(BASE_URL);

    const headerTrending = page.getByTestId("filter-link-trending");
    await expect(headerTrending).toBeVisible();
    await expect(headerTrending).toHaveText("Trending");
    await headerTrending.click();
    await expect(page).toHaveURL(new RegExp(`^${BASE_URL}/trending/$`));
  });

  test("Body Section visibility and navigation", async () => {
    // Test New Released section
    const newReleasedHeading = page.getByRole('heading', { name: 'New Released' });
    await expect(newReleasedHeading).toBeVisible();
    await expect(newReleasedHeading).toHaveText('New Released');

    const viewAllNewlyReleasedTools = page.getByTestId('view-all-newly-released-tools');
    await viewAllNewlyReleasedTools.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://aiaxio.com/tools/?sortBy=date&sortOrder=desc');

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test AI for Education section
    const aiForEducationHeading = page.getByRole('heading', { name: 'AI for Education' });
    await expect(aiForEducationHeading).toBeVisible();
    await expect(aiForEducationHeading).toHaveText('AI for Education');

    const viewAllAIforEducation = page.getByTestId('view-all-AI for Education');
    await viewAllAIforEducation.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://aiaxio.com/tools/category/education/');

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test AI Writing Assistants section
    const aiWritingAssistantsHeading = page.getByRole('heading', { name: 'AI Writing Assistants' });
    await expect(aiWritingAssistantsHeading).toBeVisible();
    await expect(aiWritingAssistantsHeading).toHaveText('AI Writing Assistants');

    const viewAllAIWritingAssistants = page.getByTestId('view-all-AI Writing Assistants');
    await viewAllAIWritingAssistants.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://aiaxio.com/tools/category/writing-assistant/');

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test AI Coding Tools section
    const aiCodingToolsHeading = page.getByRole('heading', { name: 'AI Coding Tools' });
    await expect(aiCodingToolsHeading).toBeVisible();
    await expect(aiCodingToolsHeading).toHaveText('AI Coding Tools');

    const viewAllAICodingTools = page.getByTestId('view-all-AI Coding Tools');
    await viewAllAICodingTools.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://aiaxio.com/tools/category/coding/');
  });

  test("Body Section load more functionality", async () => {
    // Test New Released Section
    const newReleasedHeading = page.getByRole('heading', { name: 'New Released' });
    await expect(newReleasedHeading).toBeVisible();
    await expect(newReleasedHeading).toHaveText('New Released');

    const loadMoreNewlyReleasedTools = page.getByTestId('view-all-newly-released-tools');
    await expect(loadMoreNewlyReleasedTools).toBeVisible();
    await loadMoreNewlyReleasedTools.click();
    await page.waitForLoadState('networkidle');

    // Navigate back to home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test AI for Education Section
    const aiForEducationHeading = page.getByRole('heading', { name: 'AI for Education' });
    await expect(aiForEducationHeading).toBeVisible();

    const viewToolsAIForEducation = page.getByTestId('view-tools-AI for Education');
    await viewToolsAIForEducation.click();
    await page.waitForLoadState('networkidle');
    
    const toolsGridAIForEducation = page.getByTestId('tools-grid-AI for Education');
    await expect(toolsGridAIForEducation).toBeVisible();

    // Test AI Writing Assistants Section
    const aiWritingAssistantsHeading = page.getByRole('heading', { name: 'AI Writing Assistants' });
    await expect(aiWritingAssistantsHeading).toBeVisible();

    const viewToolsAIWritingAssistants = page.getByTestId('view-tools-AI Writing Assistants');
    await viewToolsAIWritingAssistants.click();
    await page.waitForLoadState('networkidle');

    const toolsGridAIWritingAssistants = page.getByTestId('tools-grid-AI Writing Assistants');
    await expect(toolsGridAIWritingAssistants).toBeVisible();

    const loadMoreAIWritingAssistants = page.locator('section').filter({ hasText: 'AI Writing AssistantsView AllView' }).getByTestId('load-more-newly-released-tools');
    await loadMoreAIWritingAssistants.click();

    // Test AI Coding Tools Section
    const aiCodingToolsHeading = page.getByRole('heading', { name: 'AI Coding Tools' });
    await expect(aiCodingToolsHeading).toBeVisible();

    const viewToolsAICodingTools = page.getByTestId('view-tools-AI Coding Tools');
    await viewToolsAICodingTools.click();
    await page.waitForLoadState('networkidle');

    const toolsGridAICodingTools = page.getByTestId('tools-grid-AI Coding Tools');
    await expect(toolsGridAICodingTools).toBeVisible();

    const loadMoreAICodingTools = page.locator('section').filter({ hasText: 'AI Coding ToolsView AllView' }).getByTestId('load-more-newly-released-tools');
    await loadMoreAICodingTools.click();
  });

  test("Footer Section visibility and functionality", async () => {
    // Test footer logo
    const footerLogo = page.locator('.flex.flex-col > svg');
    await expect(footerLogo).toBeVisible();

    // Test footer description
    await expect(page.getByText('Aiaxio is your curated hub for finding the right AI solutions for your needs, from startups to enterprises.')).toBeVisible();

    // Test social links
    await expect(page.getByText('Follow us')).toBeVisible();

    // Test X (Twitter) link
    const page1Promise = page.waitForEvent('popup');
    const page1 = await page.getByRole('link', { name: 'X (formerly Twitter)' });
    await expect(page1).toBeVisible();
    await page1.click();
    await page1Promise;

    // Test YouTube link
    const page3Promise = page.waitForEvent('popup');
    const page3 = await page.getByRole('link', { name: 'Youtube' });
    await expect(page3).toBeVisible();
    await page3.click();
    await page3Promise;

    // Test LinkedIn link
    const page2Promise = page.waitForEvent('popup');
    const page2 = await page.getByRole('link', { name: 'LinkedIn' });
    await expect(page2).toBeVisible();
    await page2.click();
    await page2Promise;

    // Test Company section links
    await page.getByRole('heading', { name: 'Company' }).click();
    await page.getByRole('link', { name: 'About Us' }).click();
    await page.getByRole('link', { name: 'Contact Us' }).click();
    await page.getByRole('link', { name: 'FAQ' }).click();

    // Test Important Links section
    await page.getByRole('heading', { name: 'Important Links' }).click();
    await page.getByRole('link', { name: 'Tool Type' }).click();
    await page.getByRole('link', { name: 'Trending Tools' }).click();
    await page.getByRole('link', { name: 'Submit a Tool' }).click();

    // Test Legal section links
    await page.getByRole('heading', { name: 'Legal' }).click();
    await page.getByRole('link', { name: 'Terms of Service' }).click();
    await page.getByRole('link', { name: 'Cookies Policy' }).click();
    await page.getByRole('link', { name: 'Disclaimer' }).click();

    // Test Newsletter subscription
    await page.getByRole('heading', { name: 'Newsletter' }).click();
    await page.getByText('Receive product updates news').click();
    await page.locator('form').click();
    await page.getByRole('textbox', { name: '@ Enter your email' }).click();
    await page.getByRole('textbox', { name: '@ Enter your email' }).fill('abc@gmail.com');
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await expect(page.getByText('Thanks for subscribing!')).toBeVisible();
  });
});