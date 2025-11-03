// tests/login.spec.ts
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
  });

  test("Navbar functionalities", async () => {
    const navbar = page.getByTestId("navbar-aiaxio"); 
    await expect(navbar).toBeVisible();

    const navbarLogo = page.getByTestId("navbar-logo");
    await expect(navbarLogo).toBeVisible();
    // locator doesn't have toHaveURL — verify the link target via its href attribute
    const navbarLogoHref = await navbarLogo.getAttribute("href");
    await expect(navbarLogoHref).not.toBeNull();
    if (navbarLogoHref !== null) {
      expect(navbarLogoHref).toContain("/");
    }
    const navbarTools = page.getByTestId("nav-link-Tools");
    await expect(navbarTools).toBeVisible();
    await expect(navbarTools).toHaveText("Tools");
    await navbarTools.click(); // Optional: verify clickability
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/`); // Reset to home for next tests
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const navbarSubmitTools = page.getByTestId("nav-link-Submit Tool");
    await expect(navbarSubmitTools).toBeVisible();
    await expect(navbarSubmitTools).toHaveText("Submit Tool");
    await navbarSubmitTools.click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(`${BASE_URL}/submit/`); // Reset to home for next tests
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const navbarSearch = page.getByTestId("nav-link-Search");
    await expect(navbarSearch).toBeVisible();
    await expect(navbarSearch).toHaveText("Search");
    await navbarSearch.click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(`${BASE_URL}/search/`); // Reset to home for next tests
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Use role + exact name; scoped to navbar to avoid duplicates
    const navbarSignIn = navbar.getByRole("button", { name: /^Sign In$/ });
    await expect(navbarSignIn).toBeVisible();
    await expect(navbarSignIn).toHaveAccessibleName("Sign In");
    await navbarSignIn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/signin/`); // Reset to home for next tests
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const navbarSignUp = navbar.getByRole("button", { name: /^Sign Up$/ });
    await expect(navbarSignUp).toBeVisible();
    await expect(navbarSignUp).toHaveAccessibleName("Sign Up");
    await navbarSignUp.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(`${BASE_URL}/signup/`); // Reset to home for next tests
    await page.goto(BASE_URL);
    await page.waitForTimeout(2000);
   await page.waitForLoadState('networkidle');
  });

  test("Home page Hero part Flows", async () => {
    await expect(page).toHaveTitle(/AIAXIO - AI Matched To Your Need/i);

    // (Keep your existing locators; swap to role-based when convenient)
    const homePageH1 = page.getByRole('heading', { name: 'AIAXIO-AI Matched To Your Need' });
    await expect(homePageH1).toBeVisible();
    await expect(homePageH1).toHaveText(/AIAXIO-AI Matched To Your Need/i);

    const searchBox = page.getByTestId('tool-search-input');
    await searchBox.click();
    await searchBox.fill('test');
    await searchBox.press('Enter');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/s/test/`); // Reset to home for next tests
    await page.goto(BASE_URL); // Reset to home for next tests
    await page.waitForLoadState('networkidle');


    const justLandedFilter = page.getByTestId('filter-link-just-landed');
    await justLandedFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/?sortBy=date&sortOrder=desc`); // Reset to home for next tests
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const popularFilter = page.getByTestId('filter-link-popular');
    await popularFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/?sortBy=rating&sortOrder=desc`); // Reset to home for next tests
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const freemiumFilter = page.getByTestId('filter-link-freemium');
    await freemiumFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/?pricingType=freemium`); // Reset to home for next tests
    await page.goto(BASE_URL);
    //await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');

    const freeFilter = page.getByTestId('filter-link-free');
    await freeFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/tools/?pricingType=free`); // Reset to home for next tests
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const trendingFilter = page.getByTestId('filter-link-trending');
    await trendingFilter.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${BASE_URL}/trending/`); // Reset to home for next tests
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

  });

  test("Home page Header button functionality check", async () => {
    const headerJustLanded = page.getByTestId("filter-link-just-landed");
    await expect(headerJustLanded).toBeVisible();
    await expect(headerJustLanded).toHaveText("Just Landed");
    await headerJustLanded.click();
    await expect(page).toHaveURL(
      new RegExp(`^${BASE_URL}/tools/\\?sortBy=date&sortOrder=desc$`)
    );
    await page.goto(BASE_URL); // Reset to home for next tests

    const headerMostPopular = page.getByTestId("filter-link-popular");
    await expect(headerMostPopular).toBeVisible();
    await expect(headerMostPopular).toHaveText("Popular");
    await headerMostPopular.click();
    await expect(page).toHaveURL(
      new RegExp(`^${BASE_URL}/tools/\\?sortBy=rating&sortOrder=desc$`)
    );
    await page.goto(BASE_URL); // Reset to home for next tests

    const headerFreemium = page.getByTestId("filter-link-freemium");
    await expect(headerFreemium).toBeVisible();
    await expect(headerFreemium).toHaveText("Freemium");
    await headerFreemium.click();
    await expect(page).toHaveURL(
      new RegExp(`^${BASE_URL}/tools/\\?pricingType=freemium$`)
    );
    await page.goto(BASE_URL);

    const headerFree = page.getByTestId("filter-link-free");
    await expect(headerFree).toBeVisible();
    await expect(headerFree).toHaveText("Free");
    await headerFree.click();
    await expect(page).toHaveURL(
      new RegExp(`^${BASE_URL}/tools/\\?pricingType=free$`)
    );
    await page.goto(BASE_URL); // Reset to home for next tests

    const headerTrending = page.getByTestId("filter-link-trending");
    await expect(headerTrending).toBeVisible();
    await expect(headerTrending).toHaveText("Trending");
    await headerTrending.click();
    await expect(page).toHaveURL(new RegExp(`^${BASE_URL}/trending/$`));
    await page.goto(BASE_URL); // Reset to home for next tests
  });

  test("Body Section Visibility and Flows", async () => {
  const newReleasedHeading =  page.getByRole('heading', { name: 'New Released' });
  await expect(newReleasedHeading).toBeVisible();
  await expect(newReleasedHeading).toHaveText('New Released');

  const viewAllNewlyReleasedTools = page.getByTestId('view-all-newly-released-tools');
  await viewAllNewlyReleasedTools.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://aiaxio.com/tools/?sortBy=date&sortOrder=desc');
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  const aiForEducationHeading = page.getByRole('heading', { name: 'AI for Education' });
  await expect(aiForEducationHeading).toBeVisible();
  await expect(aiForEducationHeading).toHaveText('AI for Education');

  const viewAllAIforEducation = page.getByTestId('view-all-AI for Education');
  await viewAllAIforEducation.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://aiaxio.com/tools/category/education/');
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  const aiWritingAssistantsHeading = page.getByRole('heading', { name: 'AI Writing Assistants' });
  await expect(aiWritingAssistantsHeading).toBeVisible();
  await expect(aiWritingAssistantsHeading).toHaveText('AI Writing Assistants');

  const viewAllAIWritingAssistants = page.getByTestId('view-all-AI Writing Assistants');
  await viewAllAIWritingAssistants.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://aiaxio.com/tools/category/writing-assistant/');
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  const aiCodingToolsHeading = page.getByRole('heading', { name: 'AI Coding Tools' });
  await expect(aiCodingToolsHeading).toBeVisible();
  await expect(aiCodingToolsHeading).toHaveText('AI Coding Tools');

  const viewAllAICodingTools = page.getByTestId('view-all-AI Coding Tools');
  await viewAllAICodingTools.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://aiaxio.com/tools/category/coding/');
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  });

  test("Home page Body Section Load More Flows", async () => {

    // New Released Section
  const newReleasedHeading = page.getByRole('heading', { name: 'New Released' });
  await expect(newReleasedHeading).toBeVisible();
  await expect(newReleasedHeading).toHaveText('New Released');
  // await page.getByTestId('view-tools-New Released').click();
  //await page.waitForLoadState('networkidle');

  const loadMoreNewlyReleasedTools = page.getByTestId('view-all-newly-released-tools');
  await expect(loadMoreNewlyReleasedTools).toBeVisible();
  await loadMoreNewlyReleasedTools.click();
  await page.waitForLoadState('networkidle');
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  // AI for Education Section
  const aiForEducationHeading = page.getByRole('heading', { name: 'AI for Education' });
  await expect(aiForEducationHeading).toBeVisible();

  const viewToolsAIForEducation = await page.getByTestId('view-tools-AI for Education');
  await viewToolsAIForEducation.click();
  await page.waitForLoadState('networkidle');
  
  const toolsGridAIForEducation = await page.getByTestId('tools-grid-AI for Education');
  await expect(toolsGridAIForEducation).toBeVisible();

  // AI Writing Assistants Section
  const aiWritingAssistantsHeading = await page.getByRole('heading', { name: 'AI Writing Assistants' });
  await expect(aiWritingAssistantsHeading).toBeVisible();

  const viewToolsAIWritingAssistants = await page.getByTestId('view-tools-AI Writing Assistants');
  await viewToolsAIWritingAssistants.click();
  await page.waitForLoadState('networkidle');

  const toolsGridAIWritingAssistants = await page.getByTestId('tools-grid-AI Writing Assistants');
  await expect(toolsGridAIWritingAssistants).toBeVisible();

  const loadMoreAIWritingAssistants = await page.locator('section').filter({ hasText: 'AI Writing AssistantsView AllView' }).getByTestId('load-more-newly-released-tools');
  await loadMoreAIWritingAssistants.click();

  // AI Coding Tools Section
  const aiCodingToolsHeading = await page.getByRole('heading', { name: 'AI Coding Tools' });
  await expect(aiCodingToolsHeading).toBeVisible();

  const viewToolsAICodingTools = await page.getByTestId('view-tools-AI Coding Tools');
  await viewToolsAICodingTools.click();
  await page.waitForLoadState('networkidle');

  const toolsGridAICodingTools = await page.getByTestId('tools-grid-AI Coding Tools');
  await expect(toolsGridAICodingTools).toBeVisible();

  const loadMoreAICodingTools = await page.locator('section').filter({ hasText: 'AI Coding ToolsView AllView' }).getByTestId('load-more-newly-released-tools');
  await loadMoreAICodingTools.click();
  });

  test("Footer Section Visibility and Flows", async () => {

    const footerLogo =  page.locator('.flex.flex-col > svg');
    await expect(footerLogo).toBeVisible();

    await expect(page.getByText('Aiaxio is your curated hub for finding the right AI solutions for your needs, from startups to enterprises.')).toBeVisible();

    await expect(page.getByText('Follow us')).toBeVisible();

    const page1Promise = page.waitForEvent('popup');
    const page1 = await page.getByRole('link', { name: 'X (formerly Twitter)' });
    await expect(page1).toBeVisible();
    await page1.click();
    await page1Promise;

    const page3Promise = page.waitForEvent('popup');
    const page3 = await page.getByRole('link', { name: 'Youtube' });
    await expect(page3).toBeVisible();
    await page3.click();
    await page3Promise;

    const page2Promise = page.waitForEvent('popup');
    const page2 = await page.getByRole('link', { name: 'LinkedIn' });
    await expect(page2).toBeVisible();
    await page2.click();
    await page2Promise;

    await page.getByRole('heading', { name: 'Company' }).click();
    await page.getByRole('link', { name: 'About Us' }).click();
    await page.getByRole('link', { name: 'Contact Us' }).click();
    await page.getByRole('link', { name: 'FAQ' }).click();
    await page.getByRole('heading', { name: 'Important Links' }).click();
    await page.getByRole('link', { name: 'Tool Type' }).click();
    await page.getByRole('link', { name: 'Trending Tools' }).click();
    await page.getByRole('link', { name: 'Submit a Tool' }).click();
    await page.getByRole('heading', { name: 'Legal' }).click();
    await page.getByRole('link', { name: 'Terms of Service' }).click();
    await page.getByRole('link', { name: 'Cookies Policy' }).click();
    await page.getByRole('link', { name: 'Disclaimer' }).click();
    await page.getByRole('heading', { name: 'Newsletter' }).click();
    await page.getByText('Receive product updates news').click();
    await page.locator('form').click();
    await page.getByRole('textbox', { name: '@ Enter your email' }).click();
    await page.getByRole('textbox', { name: '@ Enter your email' }).fill('abc@gmail.com');
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await page.getByRole('listitem').filter({ hasText: 'Thanks for subscribing!' }).click();
    await page.getByText('Thanks for subscribing!').click();
    //await page.getByTestId('scroll-to-top-button').click();
  });
  
});
