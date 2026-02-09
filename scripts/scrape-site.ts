import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";

const BASE_URL = "https://www.urbanelephant.co.za";
const OUTPUT_DIR = path.join(process.cwd(), "scraped-content");
const ASSETS_DIR = path.join(OUTPUT_DIR, "assets");

// Ensure directories exist
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Download file helper
function downloadFile(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const protocol = url.startsWith("https") ? https : http;
      const file = fs.createWriteStream(destPath);

      protocol
        .get(url, (response) => {
          if (response.statusCode === 301 || response.statusCode === 302) {
            const redirectUrl = response.headers.location;
            if (redirectUrl) {
              downloadFile(redirectUrl, destPath).then(resolve);
              return;
            }
          }
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve(true);
          });
        })
        .on("error", () => {
          fs.unlink(destPath, () => {});
          resolve(false);
        });
    } catch {
      resolve(false);
    }
  });
}

async function main() {
  console.log("🐘 Urban Elephant Site Scraper");
  console.log("==============================\n");

  ensureDir(OUTPUT_DIR);
  ensureDir(ASSETS_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  });
  const page = await context.newPage();

  const siteData: Record<string, unknown> = {
    scrapedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    pages: [] as Record<string, unknown>[],
    colors: [] as string[],
    fonts: [] as string[],
    allImages: [] as string[],
  };

  // URLs to scrape
  const urlsToScrape = [
    BASE_URL,
    `${BASE_URL}/about`,
    `${BASE_URL}/properties`,
    `${BASE_URL}/tours`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/car-hire`,
  ];

  const allImages: string[] = [];
  const allLinks: string[] = [];

  for (const url of urlsToScrape) {
    console.log(`\nScraping: ${url}`);

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(3000);

      // Take full-page screenshot
      const screenshotName = url === BASE_URL
        ? "homepage"
        : url.replace(BASE_URL, "").replace(/\//g, "_").replace(/^_/, "") || "page";

      await page.screenshot({
        path: path.join(OUTPUT_DIR, `screenshot_${screenshotName}.png`),
        fullPage: true,
      });
      console.log(`  📸 Screenshot: screenshot_${screenshotName}.png`);

      // Get page title
      const title = await page.title();

      // Get meta description
      const metaDescription = await page.$eval(
        'meta[name="description"]',
        (el) => el.getAttribute("content")
      ).catch(() => "");

      // Get all headings
      const headings = await page.$$eval("h1, h2, h3, h4, h5, h6", (elements) =>
        elements.map((el) => ({
          level: el.tagName.toLowerCase(),
          text: el.textContent?.trim() || "",
        }))
      );

      // Get all paragraphs
      const paragraphs = await page.$$eval("p", (elements) =>
        elements
          .map((el) => el.textContent?.trim() || "")
          .filter((text) => text.length > 0)
      );

      // Get all links
      const links = await page.$$eval("a[href]", (elements) =>
        elements.map((el) => ({
          text: el.textContent?.trim() || "",
          href: el.getAttribute("href") || "",
        }))
      );

      // Get all images
      const images = await page.$$eval("img", (elements) =>
        elements.map((el) => ({
          src: el.getAttribute("src") || "",
          alt: el.getAttribute("alt") || "",
        }))
      );

      // Get background images via style
      const bgImages = await page.$$eval("*", (elements) =>
        elements
          .map((el) => {
            const style = window.getComputedStyle(el);
            const bg = style.backgroundImage;
            if (bg && bg !== "none") {
              const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
              return match ? match[1] : null;
            }
            return null;
          })
          .filter(Boolean) as string[]
      );

      // Get all buttons/CTAs
      const buttons = await page.$$eval(
        "button, a.btn, [class*='button'], [class*='Button']",
        (elements) =>
          elements
            .map((el) => el.textContent?.trim() || "")
            .filter((text) => text.length > 0)
      );

      // Get all text content
      const allText = await page.$eval("body", (el) => el.innerText);

      // Collect images
      images.forEach((img) => {
        if (img.src && !allImages.includes(img.src)) {
          allImages.push(img.src);
        }
      });
      bgImages.forEach((src) => {
        if (src && !allImages.includes(src)) {
          allImages.push(src);
        }
      });

      // Collect links for discovery
      links.forEach((link) => {
        if (
          link.href.startsWith("/") ||
          link.href.startsWith(BASE_URL)
        ) {
          const fullUrl = link.href.startsWith("/")
            ? BASE_URL + link.href
            : link.href;
          if (!allLinks.includes(fullUrl)) {
            allLinks.push(fullUrl);
          }
        }
      });

      (siteData.pages as Record<string, unknown>[]).push({
        url,
        title,
        metaDescription,
        headings,
        paragraphs,
        links,
        images,
        buttons,
        allText,
      });

      console.log(`  ✅ Found ${headings.length} headings, ${paragraphs.length} paragraphs, ${images.length} images`);
    } catch (e) {
      console.log(`  ❌ Error: ${e}`);
    }
  }

  // Now extract colors from homepage
  console.log("\n🎨 Extracting colors...");
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);

  const colors = await page.$$eval("*", (elements) => {
    const colorSet = new Set<string>();
    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      ["color", "background-color", "border-color"].forEach((prop) => {
        const value = style.getPropertyValue(prop);
        if (value && value !== "rgba(0, 0, 0, 0)" && value !== "transparent") {
          colorSet.add(value);
        }
      });
    });
    return Array.from(colorSet);
  });

  siteData.colors = colors;
  console.log(`  Found ${colors.length} colors`);

  // Extract fonts
  const fonts = await page.$$eval("*", (elements) => {
    const fontSet = new Set<string>();
    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      const ff = style.fontFamily;
      if (ff) fontSet.add(ff);
    });
    return Array.from(fontSet);
  });

  siteData.fonts = fonts;
  console.log(`  Found ${fonts.length} font families`);

  // Check for additional pages we discovered
  console.log("\n🔗 Discovered links:");
  const uniqueLinks = [...new Set(allLinks)].filter(
    (l) => !urlsToScrape.includes(l) && !l.includes("#")
  );
  uniqueLinks.slice(0, 20).forEach((l) => console.log(`  - ${l}`));

  // Scrape any discovered property/tour detail pages
  const detailPages = uniqueLinks.filter(
    (l) =>
      (l.includes("/properties/") || l.includes("/tours/")) &&
      l !== `${BASE_URL}/properties` &&
      l !== `${BASE_URL}/tours`
  );

  for (const url of detailPages.slice(0, 10)) {
    console.log(`\nScraping detail page: ${url}`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(2000);

      const screenshotName = url
        .replace(BASE_URL, "")
        .replace(/\//g, "_")
        .replace(/^_/, "");

      await page.screenshot({
        path: path.join(OUTPUT_DIR, `screenshot_${screenshotName}.png`),
        fullPage: true,
      });

      const title = await page.title();
      const headings = await page.$$eval("h1, h2, h3", (elements) =>
        elements.map((el) => ({
          level: el.tagName.toLowerCase(),
          text: el.textContent?.trim() || "",
        }))
      );
      const paragraphs = await page.$$eval("p", (elements) =>
        elements
          .map((el) => el.textContent?.trim() || "")
          .filter((text) => text.length > 0)
      );
      const images = await page.$$eval("img", (elements) =>
        elements.map((el) => ({
          src: el.getAttribute("src") || "",
          alt: el.getAttribute("alt") || "",
        }))
      );
      const allText = await page.$eval("body", (el) => el.innerText);

      images.forEach((img) => {
        if (img.src && !allImages.includes(img.src)) {
          allImages.push(img.src);
        }
      });

      (siteData.pages as Record<string, unknown>[]).push({
        url,
        title,
        headings,
        paragraphs,
        images,
        allText,
      });

      console.log(`  ✅ Scraped: ${title}`);
    } catch (e) {
      console.log(`  ❌ Error: ${e}`);
    }
  }

  // Download images
  console.log("\n📷 Downloading images...");
  const downloadedImages: string[] = [];

  for (const imgSrc of allImages) {
    try {
      let fullUrl = imgSrc;
      if (imgSrc.startsWith("//")) {
        fullUrl = "https:" + imgSrc;
      } else if (imgSrc.startsWith("/")) {
        fullUrl = BASE_URL + imgSrc;
      } else if (!imgSrc.startsWith("http")) {
        fullUrl = BASE_URL + "/" + imgSrc;
      }

      // Skip data URLs and SVG data
      if (fullUrl.startsWith("data:")) continue;

      const urlObj = new URL(fullUrl);
      let filename = path.basename(urlObj.pathname) || "image.png";

      // Clean filename
      filename = filename.replace(/[?#].*$/, "");
      if (!filename.includes(".")) {
        filename += ".png";
      }

      const destPath = path.join(ASSETS_DIR, filename);

      if (!fs.existsSync(destPath)) {
        console.log(`  ⬇️  ${filename}`);
        const success = await downloadFile(fullUrl, destPath);
        if (success) {
          downloadedImages.push(filename);
        }
      } else {
        downloadedImages.push(filename);
      }
    } catch (e) {
      // Skip invalid URLs
    }
  }

  siteData.allImages = downloadedImages;
  console.log(`  Downloaded ${downloadedImages.length} images`);

  // Save data
  const outputPath = path.join(OUTPUT_DIR, "site-data.json");
  fs.writeFileSync(outputPath, JSON.stringify(siteData, null, 2));
  console.log(`\n💾 Data saved to: ${outputPath}`);

  // Create markdown summary
  let summary = `# Urban Elephant Website Content\n\n`;
  summary += `**Scraped:** ${siteData.scrapedAt}\n\n`;
  summary += `---\n\n`;

  for (const pageData of siteData.pages as Record<string, unknown>[]) {
    summary += `## ${pageData.title || pageData.url}\n\n`;
    summary += `**URL:** ${pageData.url}\n\n`;

    if (pageData.metaDescription) {
      summary += `**Description:** ${pageData.metaDescription}\n\n`;
    }

    const headings = pageData.headings as { level: string; text: string }[];
    if (headings && headings.length > 0) {
      summary += `### Headings\n\n`;
      headings.forEach((h) => {
        if (h.text) {
          summary += `- **${h.level.toUpperCase()}:** ${h.text}\n`;
        }
      });
      summary += "\n";
    }

    const paragraphs = pageData.paragraphs as string[];
    if (paragraphs && paragraphs.length > 0) {
      summary += `### Content\n\n`;
      paragraphs.slice(0, 15).forEach((p) => {
        if (p.length > 20) {
          summary += `> ${p}\n\n`;
        }
      });
    }

    const buttons = pageData.buttons as string[];
    if (buttons && buttons.length > 0) {
      summary += `### Buttons/CTAs\n\n`;
      [...new Set(buttons)].forEach((b) => {
        summary += `- "${b}"\n`;
      });
      summary += "\n";
    }

    summary += `---\n\n`;
  }

  // Colors section
  summary += `## 🎨 Colors Found\n\n`;
  const colorList = siteData.colors as string[];
  colorList.forEach((c) => {
    summary += `- \`${c}\`\n`;
  });

  // Fonts section
  summary += `\n## 🔤 Fonts Found\n\n`;
  const fontList = siteData.fonts as string[];
  fontList.forEach((f) => {
    summary += `- ${f}\n`;
  });

  // Images section
  summary += `\n## 📷 Images (${downloadedImages.length})\n\n`;
  downloadedImages.forEach((img) => {
    summary += `- ${img}\n`;
  });

  const summaryPath = path.join(OUTPUT_DIR, "content-summary.md");
  fs.writeFileSync(summaryPath, summary);
  console.log(`📄 Summary saved to: ${summaryPath}`);

  await browser.close();
  console.log("\n🎉 Scraping complete!");
}

main().catch(console.error);
