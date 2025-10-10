
// scraper.js
const puppeteer = require('puppeteer');

async function scrapeYouTube(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Step 1: Go to YouTube video
  await page.goto(url, { waitUntil: 'load' });

  // get the title text
  await page.waitForSelector('h1 yt-formatted-string');
  const title = await page.evaluate(() => {
    const el = document.querySelector('h1 yt-formatted-string');
    return el ? el.textContent.trim() : null;
  });

  console.log("Video title:", title);

  // wait a bit for comments to load
  await new Promise(resolve => setTimeout(resolve, 5000));

  // helper to check visibility
  const isVisible = async (page, selector) => {
    return await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const style = window.getComputedStyle(el);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        parseFloat(style.opacity) > 0 &&
        el.offsetHeight > 0 &&
        el.offsetWidth > 0
      );
    }, selector);
  };

  let index = 1;
  let comments = []; // store all scraped comments here

  let visible = await isVisible(page, `#contents > ytd-comment-thread-renderer:nth-child(${index})`);
  while (!visible) {
    await page.evaluate(() => { window.scrollBy(0, 500); });
    await new Promise(resolve => setTimeout(resolve, 1000));
    visible = await isVisible(page, `#contents > ytd-comment-thread-renderer:nth-child(${index})`);
  }

  while (visible) {
    const commentText = await page.evaluate((i) => {
      const comment = document.querySelector(`#contents > ytd-comment-thread-renderer:nth-child(${i})`);
      if (!comment) return null;

      const contentText = comment.querySelector('#content-text');
      const text = contentText ? contentText.innerText.trim() : null;
      const height = comment.offsetHeight;

      const likeButton = comment.querySelector('#vote-count-middle');
      const likes = likeButton ? likeButton.textContent.trim() : '0';

      return { text, height, likes };
    }, index);

    if (!commentText) break;

    console.log(`Comment ${index}:`, commentText.text);

    // Instead of writing to file → push to array
    comments.push({
      index,
      text: commentText.text,
      likes: commentText.likes
    });

    // scroll to next comment
    await page.evaluate((scrollY) => { window.scrollBy(0, scrollY); }, commentText.height + 32);

    index++;
    visible = await isVisible(page, `#contents > ytd-comment-thread-renderer:nth-child(${index})`);

    if (!visible) {
      await page.evaluate(() => { window.scrollBy(0, window.innerHeight); });
      await new Promise(resolve => setTimeout(resolve, 2500));
      await page.evaluate(() => { window.scrollBy(0, -window.innerHeight); });
      visible = true;
    }
  }

  await browser.close();

  // Return all scraped data as JSON
  return { title, comments };
}

module.exports = scrapeYouTube;
