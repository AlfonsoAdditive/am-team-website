const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const BUILD_DIR = path.join(__dirname, 'build');
const OUTPUT_FILE = path.join(BUILD_DIR, 'index.html');

async function prerender() {
  // 1. Serve the build directory
  const app = express();
  app.use(express.static(BUILD_DIR));
  const server = app.listen(PORT, () => {
    console.log(`Serving build/ at http://localhost:${PORT}`);
  });

  // 2. Launch Puppeteer and visit the root route
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle2', timeout: 120000 });
  const html = await page.content();

  // 3. Save the rendered HTML to index.html
  fs.writeFileSync(OUTPUT_FILE, html);
  console.log('Pre-rendered HTML saved to', OUTPUT_FILE);

  await browser.close();
  server.close();
}

prerender().catch(err => {
  console.error('Prerendering failed:', err);
  process.exit(1);
}); 