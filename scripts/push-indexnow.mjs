import fs from 'node:fs';
import path from 'node:path';

export const INDEXNOW_CONFIG = {
  host: 'jcleida.com',
  key: '81fb9c6ec7be446016909f925e16c21f',
  keyLocation: 'https://jcleida.com/81fb9c6ec7be446016909f925e16c21f.txt',
  endpoint: 'https://api.indexnow.org/indexnow'
};

/**
 * Extract all <loc> URLs from sitemap.xml
 */
export function extractUrlsFromSitemap(sitemapPath) {
  const resolved = path.resolve(sitemapPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Sitemap file not found at: ${resolved}`);
  }
  const content = fs.readFileSync(resolved, 'utf-8');
  const matches = [...content.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)];
  const urls = [...new Set(matches.map(m => m[1].trim()))];
  return urls;
}

/**
 * Send POST request to IndexNow API
 */
export async function pushToIndexNow(urls = [], options = {}) {
  const host = options.host || INDEXNOW_CONFIG.host;
  const key = options.key || INDEXNOW_CONFIG.key;
  const keyLocation = options.keyLocation || INDEXNOW_CONFIG.keyLocation;
  const endpoint = options.endpoint || INDEXNOW_CONFIG.endpoint;

  if (!urls || urls.length === 0) {
    console.log('[IndexNow] ⚠️ No URLs provided to submit.');
    return { success: false, statusCode: 0, message: 'No URLs provided' };
  }

  // IndexNow accepts up to 10,000 URLs per batch
  const batchUrls = urls.slice(0, 10000);

  const payload = {
    host,
    key,
    keyLocation,
    urlList: batchUrls
  };

  console.log(`[IndexNow] 🚀 Submitting ${batchUrls.length} URLs to ${endpoint}...`);
  console.log(`[IndexNow] 🔑 Host: ${host} | Key: ${key.slice(0, 8)}... | KeyLocation: ${keyLocation}`);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const status = res.status;
    const statusText = res.statusText;
    const bodyText = await res.text();

    if (status === 200) {
      console.log(`[IndexNow] ✅ Success (200 OK): All URLs successfully submitted and indexed.`);
      return { success: true, statusCode: 200, response: bodyText };
    } else if (status === 202) {
      console.log(`[IndexNow] ⏳ Accepted (202 Accepted): URL submission received, key pending verification.`);
      return { success: true, statusCode: 202, response: bodyText };
    } else {
      console.warn(`[IndexNow] ⚠️ Received response ${status} ${statusText}: ${bodyText}`);
      return { success: false, statusCode: status, response: bodyText };
    }
  } catch (error) {
    console.error(`[IndexNow] ❌ Network error while submitting:`, error.message);
    return { success: false, error: error.message };
  }
}

// CLI Execution
if (process.argv[1] && (process.argv[1].endsWith('push-indexnow.mjs') || process.argv[1].endsWith('push-indexnow.js'))) {
  const args = process.argv.slice(2);
  const isSingle = args.includes('--single');
  const targetUrl = args[args.indexOf('--single') + 1] || 'https://jcleida.com/';

  if (isSingle) {
    console.log(`[IndexNow] Mode: Single URL (${targetUrl})`);
    await pushToIndexNow([targetUrl]);
  } else {
    const candidatePaths = ['dist/sitemap.xml', 'sitemap.xml'];
    let chosenPath = null;
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        chosenPath = p;
        break;
      }
    }

    if (!chosenPath) {
      console.error('[IndexNow] ❌ Could not find sitemap.xml in dist/ or project root.');
      process.exit(1);
    }

    console.log(`[IndexNow] 📄 Reading sitemap from: ${chosenPath}`);
    const urls = extractUrlsFromSitemap(chosenPath);
    console.log(`[IndexNow] 🔍 Found ${urls.length} URLs in sitemap.`);
    await pushToIndexNow(urls);
  }
}
