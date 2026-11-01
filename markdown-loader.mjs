import fs from 'node:fs';
import path from 'node:path';

export function loadMarkdownArticles() {
  const dir = path.resolve('src/content/articles');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  // Maintain preferred order of the 3 articles
  const order = [
    'network-route-mtr-loss-diagnosis-guide',
    'subscription-link-privacy-security-audit',
    'vless-reality-active-probing-deep-dive'
  ];

  files.sort((a, b) => {
    const slugA = path.basename(a, '.md');
    const slugB = path.basename(b, '.md');
    const idxA = order.indexOf(slugA);
    const idxB = order.indexOf(slugB);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return files.map(file => {
    const slug = path.basename(file, '.md');
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const fmStr = fmMatch ? fmMatch[1] : '';
    const body = raw.slice(fmMatch ? fmMatch[0].length : 0).trim();

    const title = (fmStr.match(/title:\s*"([^"]+)"/) || [])[1] || '';
    const description = (fmStr.match(/description:\s*"([^"]+)"/) || [])[1] || '';
    const date = (fmStr.match(/date:\s*"([^"]+)"/) || [])[1] || '2026-11-01';
    const categoryRaw = (fmStr.match(/category:\s*"([^"]+)"/) || [])[1] || '';
    const tagsMatch = fmStr.match(/tags:\s*\[([^\]]+)\]/);
    const keywords = tagsMatch ? tagsMatch[1].replace(/["']/g, '').trim() : '';

    let category = 'test';
    if (categoryRaw.includes('安全')) category = 'security';
    else if (categoryRaw.includes('协议')) category = 'security';
    else if (categoryRaw.includes('线路') || categoryRaw.includes('测速') || categoryRaw.includes('观测')) category = 'test';

    // Extract Direct Answer
    const daMatch = body.match(/【Direct Answer[^】]*】([^\n]+)/);
    const directAnswer = daMatch ? daMatch[1].trim() : '';

    // Extract ASCII diagram
    let asciiHtml = '';
    const asciiMatch = body.match(/```\r?\n(\+[-+]+\+[\s\S]*?\+[-+]+\+)\r?\n```/);
    if (asciiMatch) {
      asciiHtml = `<div class="ascii-topology-wrap"><pre class="ascii-topology"><code>${asciiMatch[1].replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</code></pre></div>`;
    }

    // Split sections by ##
    const rawSections = body.split(/(?=^## [一二三四五\d]+[、. ])/m);
    const headings = [];
    const sectionsHtml = [];
    const customSections = [];

    rawSections.forEach((secStr) => {
      if (!secStr.trim().startsWith('##')) return;
      const lines = secStr.trim().split(/\r?\n/);
      const h2Line = lines[0].replace(/^##\s*/, '').trim();
      const cleanH2 = h2Line.replace(/^[一二三四五\d]+[、.\s]*/, '').trim();
      headings.push(cleanH2);

      let secBody = lines.slice(1).join('\n').trim();
      let html = renderSectionMarkdown(secBody);
      sectionsHtml.push(`<section id="s${headings.length - 1}"><h2>${cleanH2}</h2>${html}</section>`);
      customSections.push([html]);
    });

    return {
      slug,
      title,
      category,
      keywords,
      dek: description,
      points: [
        directAnswer,
        '双向路由非对称性排查：去程优质无法掩盖回程 163 骨干网拥塞丢包。',
        '端到端 MTR 与 NextTrace 压测：定位 202.97 核心跳数晚高峰队列溢出。',
        '坚持数据实测破除营销玄学，配置强制加密 DNS 与防探测现代协议保障稳定性。'
      ],
      customSections,
      customHeadings: headings,
      customArticleHtml: asciiHtml + sectionsHtml.join(''),
      directAnswer,
      date,
      read: 8
    };
  });
}

function renderSectionMarkdown(md) {
  let out = md;
  // Code blocks
  out = out.replace(/```(bash|sh|shell)?\r?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="tech-code-block"><code>${code.trim().replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</code></pre>`;
  });
  // Tables
  out = out.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (tableText) => {
    const rows = tableText.trim().split(/\r?\n/).filter(r => !r.includes(':---') && !r.includes('---:'));
    if (rows.length < 1) return tableText;
    const headerRow = rows[0];
    const dataRows = rows.slice(1);
    const ths = headerRow.split('|').filter(c => c.trim().length > 0).map(c => `<th>${c.trim()}</th>`).join('');
    const trs = dataRows.map(r => {
      const tds = r.split('|').filter(c => c.trim().length > 0).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${tds}</tr>`;
    }).join('');
    return `<div class="table-wrap"><table class="tech-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
  });
  // H3
  out = out.replace(/^###\s*(.*)$/gm, '<h3>$1</h3>');
  // Links: add rel="nofollow sponsored noopener noreferrer" if /go/
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => {
    if (url.includes('/go/')) {
      return `<a href="${url}" rel="nofollow sponsored noopener noreferrer">${text}</a>`;
    }
    return `<a href="${url}">${text}</a>`;
  });
  // Convert FAQ Q&A pattern: **Q...** \n 答：...
  out = out.replace(/\*\*(Q\d+：[^*]+)\*\*[\s\r\n]*答：([\s\S]*?)(?=(?:\*\*Q\d+：|<hr|$))/g, (m, q, a) => {
    return `<div class="faq-item"><h3>${q.trim()}</h3><p>${a.trim().replace(/\r?\n/g, '<br>')}</p></div>`;
  });
  // Bold
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Inline code
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Paragraphs
  const blocks = out.split(/\r?\n\r?\n+/);
  return blocks.map(b => {
    b = b.trim();
    if (!b) return '';
    if (b.startsWith('<pre') || b.startsWith('<div') || b.startsWith('<h3') || b.startsWith('<section')) return b;
    if (b.startsWith('---')) return '<hr class="tech-divider">';
    return `<p>${b.replace(/\r?\n/g, '<br>')}</p>`;
  }).join('');
}
