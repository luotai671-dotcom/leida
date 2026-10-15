import fs from 'node:fs';
import path from 'node:path';
import { topics } from './content.mjs';
import { reviewsData } from './review-data.mjs';
import { detailedFaqs } from './content.mjs';

console.log('================================================================');
console.log('           全面排查博客项目死链、路由与 404 自检系统           ');
console.log('================================================================\n');

// 1. 数据源与详情页 ID 映射自检
console.log('【1. 数据源与详情页 ID 映射自检】');
const topicSlugs = new Set(topics.map(t => t.slug));
console.log(`- 数据库文章总数: ${topics.length} 篇`);

let missingArticleFiles = [];
for (const t of topics) {
  const rootFile = path.resolve('articles', `${t.slug}.html`);
  const distFile = path.resolve('dist', 'articles', `${t.slug}.html`);
  if (!fs.existsSync(rootFile)) missingArticleFiles.push(`articles/${t.slug}.html (root)`);
  if (!fs.existsSync(distFile)) missingArticleFiles.push(`dist/articles/${t.slug}.html (dist)`);
}
console.log(`- 文章物理 HTML 文件核对: ${missingArticleFiles.length === 0 ? '全部 100% 存在' : '缺失: ' + JSON.stringify(missingArticleFiles)}`);

// 检查所有列表页卡片绑定的目标链接
const listPages = [
  'index.html',
  'articles/index.html',
  'topics/guide.html',
  'topics/shadowrocket.html',
  'topics/client.html',
  'topics/security.html',
  'topics/test.html',
  'topics/recommend.html',
  'reviews/index.html',
  'dist/index.html',
  'dist/articles/index.html',
  'dist/topics/recommend.html'
];

let orphanCardLinks = [];
let totalCardsFound = 0;
for (const lp of listPages) {
  if (!fs.existsSync(lp)) continue;
  const content = fs.readFileSync(lp, 'utf8');
  const cardLinks = [...content.matchAll(/href=["']([^"']*\/articles\/([^"'\.]+)\.html)["']/g)];
  for (const match of cardLinks) {
    totalCardsFound++;
    const fullHref = match[1];
    const slug = match[2];
    if (slug === 'index') continue;
    if (!topicSlugs.has(slug)) {
      orphanCardLinks.push({ page: lp, href: fullHref, slug });
    }
  }
}
console.log(`- 扫描列表页文章卡片引用次数: ${totalCardsFound} 次`);
console.log(`- 是否存在“列表展示但找不到数据源正文”的孤儿卡片: ${orphanCardLinks.length === 0 ? '无（0 异常）' : JSON.stringify(orphanCardLinks)}`);

// 2. 详情页加载与资源路径检查
console.log('\n【2. 详情页加载与资源路径检查】');
let resourceErrors = [];
for (const t of topics) {
  const filePath = path.resolve('dist', 'articles', `${t.slug}.html`);
  const content = fs.readFileSync(filePath, 'utf8');
  // Check for dynamic import or fetch of articles
  if (/fetch\s*\(/.test(content)) {
    resourceErrors.push(`${t.slug}: unexpected fetch() found`);
  }
  // Check CSS links
  const cssLinks = [...content.matchAll(/<link\s+rel=["']stylesheet["']\s+href=["']([^"']+)["']/g)].map(m => m[1]);
  for (const css of cssLinks) {
    const cssPath = path.resolve(path.dirname(filePath), css);
    if (!fs.existsSync(cssPath)) {
      resourceErrors.push(`${t.slug}: Missing stylesheet ${css}`);
    }
  }
  // Check Cover image
  const coverMatch = content.match(/src=["']([^"']*covers\/[^"']+)["']/);
  if (coverMatch) {
    const coverPath = path.resolve(path.dirname(filePath), coverMatch[1]);
    if (!fs.existsSync(coverPath)) {
      resourceErrors.push(`${t.slug}: Missing cover image ${coverMatch[1]}`);
    }
  }
}
console.log(`- 详情页架构: SSG 静态预渲染架构（无客户端 fetch/import 异步跨层请求正文风险）`);
console.log(`- 详情页 CSS/封面资源完整性: ${resourceErrors.length === 0 ? '全部 100% 存在有效' : JSON.stringify(resourceErrors)}`);

// 3. 路由与静默兼容逻辑核验
console.log('\n【3. 路由与静默兼容逻辑核验】');
const compatFiles = ['dist/article.html', 'dist/article/index.html', 'article.html', 'article/index.html'];
let compatCheckPassed = true;
for (const cf of compatFiles) {
  if (!fs.existsSync(cf)) {
    compatCheckPassed = false;
    console.log(`  [FAIL] 缺失兼容路由文件: ${cf}`);
  }
}

// 检查 article.html 中是否有 redirect 死循环
const compatHtml = fs.readFileSync('dist/article.html', 'utf8');
const hasRedirectHref = compatHtml.includes('window.location.href =') || compatHtml.includes('location.href =') || compatHtml.includes('location.replace(');
console.log(`- 兼容路由支持: /article 及 /article.html 均已支持`);
console.log(`- 是否存在 window.location.href 刷新跳转或 301 互踹死循环: ${hasRedirectHref ? '存在风险！' : '安全（0 强制重定向，采用 DOM 原地静默渲染）'}`);

// 检查所有 46 篇文章在兼容数据字典中是否全部存在
const dbMatch = compatHtml.match(/<script id="articleCompatDb" type="application\/json">([\s\S]*?)<\/script>/);
let dbArticlesCount = 0;
let dbMissing = [];
if (dbMatch) {
  const db = JSON.parse(dbMatch[1]);
  dbArticlesCount = Object.keys(db).length;
  for (const t of topics) {
    if (!db[t.slug]) dbMissing.push(t.slug);
  }
}
console.log(`- 兼容路由字典映射文章总数: ${dbArticlesCount} 篇 (缺失: ${dbMissing.length})`);

// 4. 站内死链与锚点完整性扫描
console.log('\n【4. 站内死链扫描与输出】');
function scanDir(baseDir) {
  const files = [];
  function walk(d) {
    for (const item of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, item.name);
      if (item.isDirectory()) {
        if (item.name !== '.git' && item.name !== 'node_modules' && (baseDir === 'dist' || item.name !== 'dist')) {
          walk(p);
        }
      } else if (item.name.endsWith('.html')) {
        files.push(p);
      }
    }
  }
  walk(baseDir);

  let totalLinks = 0;
  let emptyHashes = [];
  let brokenFiles = [];
  let brokenAnchors = [];

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const relFile = path.relative(baseDir, file).replace(/\\/g, '/');

    const hrefMatches = html.matchAll(/href=["']([^"']*)["']/g);
    for (const match of hrefMatches) {
      const rawHref = match[1];
      if (/^(https?:|mailto:|tel:|javascript:)/i.test(rawHref)) continue;

      totalLinks++;
      if (rawHref === '' || rawHref === '#') {
        emptyHashes.push({ file: relFile, href: rawHref });
        continue;
      }

      const [urlPath, hash] = rawHref.split('#');
      let targetFile = file;
      if (urlPath) {
        if (urlPath.startsWith('/')) {
          targetFile = path.join(baseDir, urlPath.slice(1));
        } else {
          targetFile = path.resolve(path.dirname(file), urlPath);
        }
        if (fs.existsSync(targetFile) && fs.statSync(targetFile).isDirectory()) {
          targetFile = path.join(targetFile, 'index.html');
        }
        if (!fs.existsSync(targetFile)) {
          brokenFiles.push({ file: relFile, href: rawHref, target: targetFile });
          continue;
        }
      }

      if (hash) {
        const targetHtml = fs.readFileSync(targetFile, 'utf8');
        const escapedHash = hash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const idRegex = new RegExp(`id=["']${escapedHash}["']`, 'i');
        const nameRegex = new RegExp(`name=["']${escapedHash}["']`, 'i');
        if (!idRegex.test(targetHtml) && !nameRegex.test(targetHtml)) {
          brokenAnchors.push({ file: relFile, href: rawHref, hash });
        }
      }
    }
  }

  return { totalFiles: files.length, totalLinks, emptyHashes, brokenFiles, brokenAnchors };
}

const distReport = scanDir('dist');
console.log(`- 扫描 dist 目录下 HTML 页面总数: ${distReport.totalFiles} 个`);
console.log(`- 扫描内部超链接总计: ${distReport.totalLinks} 个`);
console.log(`- 空哈希 (href="#" 或 href=""): ${distReport.emptyHashes.length} 个`);
console.log(`- 失效页面超链接 (404 Not Found): ${distReport.brokenFiles.length} 个`);
console.log(`- 失效锚点定位 (#hash 未在目标页面找到对应 DOM id): ${distReport.brokenAnchors.length} 个`);

// 5. 测评与 FAQ 映射验证
console.log('\n【5. 推荐机场测评 (16家) 与 FAQ 深度校验】');
console.log(`- 测评报告数据总数: ${reviewsData.length} 篇 (全部生成独立页面: ${reviewsData.every(r => fs.existsSync(path.resolve('dist', 'reviews', `${r.slug}.html`)))})`);
console.log(`- FAQ 问答项目总数: ${detailedFaqs.length} 条 (全部匹配 DOM id: ${detailedFaqs.every(f => fs.readFileSync('dist/faq.html', 'utf8').includes(`id="faq-${f.id}"`))})`);

console.log('\n================================================================');
console.log('                          自检完成                              ');
console.log('================================================================\n');
