import fs from 'node:fs';
import path from 'node:path';

export function loadMarkdownArticles() {
  const dir = path.resolve('src/content/articles');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  // Maintain preferred order of articles
  const order = [
    'network-route-mtr-loss-diagnosis-guide',
    'subscription-link-privacy-security-audit',
    'vless-reality-active-probing-deep-dive',
    'isp-broadband-peering-routing-guide',
    'no-logs-privacy-audit-security-guide'
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
    if (categoryRaw.includes('安全') || categoryRaw.includes('隐私')) category = 'security';
    else if (categoryRaw.includes('协议')) category = 'security';
    else if (categoryRaw.includes('线路') || categoryRaw.includes('测速') || categoryRaw.includes('观测') || categoryRaw.includes('宽带') || categoryRaw.includes('路由')) category = 'test';
    else if (categoryRaw.includes('客户端')) category = 'client';
    else if (categoryRaw.includes('小火箭')) category = 'shadowrocket';
    else if (categoryRaw.includes('指南') || categoryRaw.includes('选型')) category = 'guide';

    // Extract Direct Answer
    const daMatch = body.match(/【Direct Answer[^】]*】([^\n]+)/);
    const directAnswer = daMatch ? daMatch[1].trim() : '';

    // Extract points from frontmatter if available
    const pointsMatch = fmStr.match(/points:\s*\r?\n((?:\s*-\s*[^\r\n]+\r?\n)+)/);
    let points = [];
    if (pointsMatch) {
      points = pointsMatch[1].split(/\r?\n/).map(l => l.replace(/^\s*-\s*["']?/, '').replace(/["']?\s*$/, '').trim()).filter(Boolean);
    }
    if (!points || points.length === 0) {
      points = [
        directAnswer || description,
        '根据底层物理网络拓扑与通信协议标准客观选型，破除单一商业营销玄学。',
        '针对晚高峰骨干网拥塞与三网路由抖动，建立端到端可复现的排错观测基线。',
        '坚持零日志安全审计与多层加密隔离，保障数字资产与通信会话绝对安全。'
      ];
    }

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
      points,
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
