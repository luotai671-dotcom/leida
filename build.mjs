import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { site, categories, topics, faqs, faqCategories, detailedFaqs } from './content.mjs';
import { generateCovers } from './covers.mjs';
import { alertsBody, dealsBody, resourcesBody, radarDesk, radarDeskV2, radarDeskV3, alertsBodyV2 } from './extra-content.mjs';
import { reviewsData } from './review-data.mjs';
import { generateReviewPage, generateReviewIndexPage } from './review-template.mjs';

const out = path.resolve('dist');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(path.join(out,'articles'),{recursive:true});
fs.mkdirSync(path.join(out,'reviews'),{recursive:true});
fs.mkdirSync(path.join(out,'assets'),{recursive:true});
fs.copyFileSync('styles.css',path.join(out,'assets','styles.css'));
fs.copyFileSync('cover-styles.css',path.join(out,'assets','cover-styles.css'));
fs.copyFileSync('tech-theme.css',path.join(out,'assets','tech-theme.css'));
fs.copyFileSync('extra-pages.css',path.join(out,'assets','extra-pages.css'));
fs.copyFileSync('review-styles.css',path.join(out,'assets','review-styles.css'));
fs.copyFileSync('hero-refresh.css',path.join(out,'assets','hero-refresh.css'));
fs.copyFileSync('hero-v2.css',path.join(out,'assets','hero-v2.css'));
fs.copyFileSync('radar-fix.css',path.join(out,'assets','radar-fix.css'));
fs.copyFileSync('background-tech.css',path.join(out,'assets','background-tech.css'));
fs.copyFileSync('background-pro.css',path.join(out,'assets','background-pro.css'));
fs.copyFileSync('radar-background-motion.css',path.join(out,'assets','radar-background-motion.css'));
fs.copyFileSync('favicon.svg',path.join(out,'assets','favicon.svg'));
fs.cpSync(path.resolve('assets','recommendations'),path.join(out,'assets','recommendations'),{recursive:true});
fs.mkdirSync(path.resolve('assets'),{recursive:true});
fs.copyFileSync('styles.css',path.resolve('assets','styles.css'));
fs.copyFileSync('cover-styles.css',path.resolve('assets','cover-styles.css'));
fs.copyFileSync('tech-theme.css',path.resolve('assets','tech-theme.css'));
fs.copyFileSync('extra-pages.css',path.resolve('assets','extra-pages.css'));
fs.copyFileSync('review-styles.css',path.resolve('assets','review-styles.css'));
fs.copyFileSync('hero-refresh.css',path.resolve('assets','hero-refresh.css'));
fs.copyFileSync('hero-v2.css',path.resolve('assets','hero-v2.css'));
fs.copyFileSync('radar-fix.css',path.resolve('assets','radar-fix.css'));
fs.copyFileSync('background-tech.css',path.resolve('assets','background-tech.css'));
fs.copyFileSync('background-pro.css',path.resolve('assets','background-pro.css'));
fs.copyFileSync('radar-background-motion.css',path.resolve('assets','radar-background-motion.css'));
fs.copyFileSync('favicon.svg',path.resolve('assets','favicon.svg'));
generateCovers({topics,categories,destinations:[out,path.resolve('.')]});
if (fs.existsSync('public')) {
  fs.cpSync('public', out, { recursive: true });
}

const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const url=p=>site.url+(p==='/'?'':p);
const nav=`<header class="top"><div class="nav wrap"><a class="brand" href="/index.html"><span class="radar"><i></i></span><b>机场雷达</b></a><nav aria-label="主导航"><a href="/index.html">首页</a><a href="/topics/recommend.html">机场推荐</a><a href="/topics/shadowrocket.html">小火箭</a><a href="/topics/security.html">知识与安全</a><a href="/topics/test.html">测评方法</a><a href="/topics/client.html">客户端教程</a><a href="/articles/index.html">全部文章</a><a href="/faq.html">FAQ</a><a href="/about.html">关于</a></nav><button class="menu" aria-label="打开菜单">☰</button></div></header>`;
const footer=`<footer><div class="wrap footer-grid"><div><a class="brand light" href="/index.html"><span class="radar"><i></i></span><b>机场雷达</b></a><p>${site.tagline}</p></div><div><b>浏览</b><a href="/articles/index.html">全部文章</a><a href="/faq.html">常见问题</a><a href="/about.html">编辑原则</a></div><div><b>提醒</b><p>本站不提供节点或代购服务。请遵守所在地法律与服务条款。</p></div></div><div class="wrap legal">© 2026 机场雷达 · 内容仅供一般信息参考</div></footer>`;
function layout({title,desc,pathName='/',body,schema='',type='website'}){return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="shortcut icon" href="/assets/favicon.svg"><link rel="canonical" href="${url(pathName)}"><meta property="og:type" content="${type}"><meta property="og:site_name" content="${site.name}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url(pathName)}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="/assets/styles.css"><link rel="alternate" type="application/rss+xml" title="机场雷达 RSS" href="/rss.xml"><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"WebSite",name:site.name,url:site.url,description:site.description,inLanguage:'zh-CN'})}</script>${schema}</head><body>${nav}<main>${body}</main>${footer}<script>document.querySelector('.menu').onclick=()=>document.querySelector('header nav').classList.toggle('open')</script></body></html>`}
const articlePartners=[
  {name:'闪电鼠',code:'sd88',logo:'shandianshu.jpg',url:'https://chaore01.shandianshuaff.com/#/?code=HeUwm3zo',line:'轻量入门到大流量档位均有覆盖'},
  {name:'大佬云',code:'dly88',logo:'dalaoyun.png',url:'https://chaore01.dalaoyunaff.com/#/?code=rtH3pPer',line:'月付、年付与一次性流量灵活搭配'},
  {name:'神行加速',code:'sx0077',logo:'shenxing.png',url:'https://chaore01.shenxingaff.com/#/?code=iTjS2mVY',line:'流量档位清晰，适合持续使用需求'},
  {name:'云界线',code:'yjx888',logo:'yunjiexian.png',url:'https://chaore01.yunjiexianaff.com/#/?code=g2PDAa91',line:'常规月付与备用流量方案兼顾'},
  {name:'榴莲云',code:'ll88',logo:'liulianyun.png',url:'https://chaore01.liulianyunaff.com/#/?code=MNqUefcg',line:'提供面向多设备用户的大流量档位'},
  {name:'环球梯',code:'HQ66',logo:'huanqiuti.jpg',url:'https://chaore01.huanqiutiaff.com/#/?code=vXn9xcb8',line:'从学生轻量档到一次性流量均有选择'}
];
const alertEditorial=`<section class="alert-editorial wrap"><div class="alert-editorial-head"><span>RISK HANDBOOK / 2026-09-30</span><h2>机场跑路前，通常不是毫无征兆</h2><p>单个节点故障、一次客服延迟或短时间官网维护，都不能直接等同于跑路。真正值得警惕的是多个异常同时出现，并持续超过正常维护周期。</p></div><div class="warning-signs"><article><b>01</b><h3>突然密集推长期套餐</h3><p>短时间反复推出三年、五年、永久套餐，配合倒计时和“最后一次”活动催促付款。</p><strong>应对：停止长期预付，只保留可承受损失的短周期。</strong></article><article><b>02</b><h3>支付方式越来越难追回</h3><p>原有支付方式消失，只接受虚拟币、私人转账或频繁变化的个人收款账户。</p><strong>应对：不要为了折扣绕开原有支付渠道。</strong></article><article><b>03</b><h3>官网和面板频繁换域名</h3><p>短期内多次迁移官网、订阅面板与官方群组，却没有完整、可交叉验证的迁移公告。</p><strong>应对：从旧官网、旧群公告和客服三处核验新地址。</strong></article><article><b>04</b><h3>客服与公告同时沉默</h3><p>工单、邮件、群组和状态页同时停止更新，故障期间没有原因、进度或预计恢复时间。</p><strong>应对：记录失联时间，不要重复充值测试账户。</strong></article><article><b>05</b><h3>节点大面积长期离线</h3><p>多个地区同时不可用，维护通知不断延期，恢复后又迅速重复故障。</p><strong>应对：保存测速、错误日志和节点状态截图。</strong></article><article><b>06</b><h3>余额、套餐或订单异常</h3><p>未到期套餐消失、余额清零、订阅令牌失效，后台订单记录也无法查询。</p><strong>应对：立即保存证据，并停止向账户追加余额。</strong></article><article><b>07</b><h3>退款规则突然收紧</h3><p>原本存在的退款入口被移除，客服只允许转余额、延期或更换套餐，不处理原路退款。</p><strong>应对：查看旧版条款，并咨询原支付渠道的争议流程。</strong></article><article><b>08</b><h3>用更多充值解决旧故障</h3><p>服务商要求购买“恢复包”“迁移包”或新套餐，才允许继续使用原本尚未到期的服务。</p><strong>应对：不要用第二笔付款挽救第一笔付款。</strong></article></div></section><section class="customer-worries"><div class="wrap"><div class="alert-editorial-head light"><span>USER CONCERNS</span><h2>用户真正担心的，不只是“还能不能连”</h2><p>服务异常时，用户往往同时面对资金、账号、隐私和工作中断风险。先把担忧拆开，才能知道下一步该做什么。</p></div><div class="worry-grid"><article><span>资金</span><h3>已经支付的钱还能退吗？</h3><p>先保存订单号、支付时间、金额、套餐说明和沟通记录，再查看原支付渠道是否提供投诉或争议处理。不要相信陌生人声称可以付费代追回。</p></article><article><span>隐私</span><h3>订阅链接会不会被他人利用？</h3><p>订阅地址通常包含账户令牌。发现服务异常后，不要把完整链接发到群聊或在线检测网站；若后台仍可访问，应重置订阅并退出不认识的设备。</p></article><article><span>账号</span><h3>复用的密码是否需要修改？</h3><p>如果机场账户密码与邮箱、社交平台或其他网站相同，应立即逐个更换，并为重要账号开启双重验证。</p></article><article><span>设备</span><h3>安装过的客户端和证书安全吗？</h3><p>删除来源不明的定制客户端，检查系统中的 VPN 配置、描述文件、根证书和管理员权限。官方客户端通常不需要安装陌生根证书。</p></article><article><span>工作</span><h3>明天还要远程办公怎么办？</h3><p>先准备与原服务无关的备用连接方案，保存必要的工作文件和登录恢复方式。不要等全部节点失效后才开始寻找替代。</p></article><article><span>判断</span><h3>到底是普通故障还是跑路？</h3><p>观察官网、面板、节点、客服、公告和退款六个维度。只有多个维度持续异常，风险才明显升高；单次宕机不应直接定性。</p></article></div></div></section><section class="alert-checklist wrap"><div><span>ACTION CHECKLIST</span><h2>发现异常后的 30 分钟自保顺序</h2></div><ol><li><b>停止续费和追加余额</b><p>先控制可能继续扩大的资金损失。</p></li><li><b>保存订单与服务状态</b><p>截图订单、套餐期限、余额、公告、工单和错误页面。</p></li><li><b>更换复用密码</b><p>优先处理邮箱、支付账户和开启相同密码的重要平台。</p></li><li><b>检查设备配置</b><p>移除陌生证书、描述文件和来历不明的定制客户端。</p></li><li><b>准备独立备用方案</b><p>备用方案不要与原服务共享同一账号、群组或支付渠道。</p></li><li><b>等待可验证公告</b><p>只相信官网、状态页和原有官方频道，警惕私聊发送的新充值地址。</p></li></ol></section>`;
const write=(p,s)=>{
  const depth=p.split('/').length-1;
  const prefix='../'.repeat(depth);
  let enhanced=s;
  if(p.startsWith('articles/')&&p!=='articles/index.html'){
    const articleIndex=topics.findIndex(article=>p===`articles/${article.slug}.html`);
    const partnerIndex=((articleIndex<0?0:articleIndex)*5+2)%articlePartners.length;
    const partner=articlePartners[partnerIndex];
    const partnerCard=`<aside class="article-partner"><img src="/assets/recommendations/${partner.logo}" alt="${partner.name} Logo" loading="lazy" width="96" height="96"><div><small>本文合作推荐</small><h2>${partner.name}</h2><p>${partner.line}。结算时输入优惠码 <b>${partner.code}</b>，活动规则以推荐页说明为准。</p></div><a href="/topics/recommend.html#provider-${partnerIndex+1}">查看推荐套餐 →</a></aside>`;
    enhanced=enhanced.replace('</article>',partnerCard+'</article>');
  }
  enhanced=enhanced.replace('<a href="/topics/recommend.html">机场推荐</a>','<a href="/topics/recommend.html">机场推荐</a><a href="/reviews/index.html">深度测评</a><a href="/deals.html">机场优惠码</a><a class="nav-alert" href="/alerts.html">跑路预警</a>');
  enhanced=enhanced.replace('<a href="/about.html">关于</a>','<a href="/resources.html">资源栏</a><a href="/about.html">关于</a>');
  enhanced=enhanced.replace(/<strong>\d{2}<\/strong>/g,'');
  if(p==='index.html') enhanced=enhanced.replace('<section class="hero">','<section class="hero"><div class="ambient-radar" aria-hidden="true"><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><span class="axis-x"></span><span class="axis-y"></span><i class="sweep"></i><i class="blip b1"></i><i class="blip b2"></i><i class="blip b3"></i><i class="blip b4"></i><small class="bearing north">000°</small><small class="bearing east">090°</small><small class="bearing south">180°</small><small class="bearing west">270°</small></div>');
  if(p==='index.html') enhanced=enhanced.replaceAll('>09.29<','>10.15<').replaceAll('>09.30<','>10.15<').replaceAll('>10.03<','>10.15<').replaceAll('>10.08<','>10.15<');
  if(p==='alerts.html') enhanced=enhanced.replaceAll('2026-09-29','2026-10-15').replaceAll('2026-09-30','2026-10-15').replaceAll('2026-10-03','2026-10-15').replaceAll('2026-10-08','2026-10-15').replace('</main>',alertEditorial+'</main>');
  if(p==='topics/shadowrocket.html') enhanced=enhanced.replace('<section class="section wrap">','<section class="download-hub wrap"><div class="download-head"><span>OFFICIAL DOWNLOADS</span><h2>客户端官方下载</h2><p>只使用官方商店或项目发布页，避免第三方重打包、植入广告或篡改版本。</p></div><div class="download-grid"><article class="download-card"><div class="download-icon rocket-mark">↗</div><div><small>iPhone / iPad / Mac</small><h3>Shadowrocket 小火箭</h3><p>Apple App Store 官方版本。软件本身不包含节点或订阅服务。</p><a href="https://apps.apple.com/us/app/shadowrocket/id932747118" target="_blank" rel="noopener noreferrer nofollow">前往 App Store 官方下载 →</a></div></article><article class="download-card"><div class="download-icon clash-mark">◇</div><div><small>Windows / macOS / Linux</small><h3>Clash Verge Rev</h3><p>项目目前通过 GitHub Releases 发布，请根据系统和处理器架构选择安装包。</p><a href="https://github.com/clash-verge-rev/clash-verge-rev/releases" target="_blank" rel="noopener noreferrer nofollow">前往 GitHub 官方发布页 →</a></div></article></div><div class="download-warning"><b>安全提示</b><span>不要下载所谓“内置节点版”“永久免费破解版”，也不要向陌生安装包授予证书、VPN 或管理员权限。</span></div></section><section class="section wrap">');
  if(p==='deals.html'){
    const registrations={sd88:'https://chaore01.shandianshuaff.com/#/?code=HeUwm3zo',dly88:'https://chaore01.dalaoyunaff.com/#/?code=rtH3pPer',sx0077:'https://chaore01.shenxingaff.com/#/?code=iTjS2mVY',yjx888:'https://chaore01.yunjiexianaff.com/#/?code=g2PDAa91',ll88:'https://chaore01.liulianyunaff.com/#/?code=MNqUefcg',HQ66:'https://chaore01.huanqiutiaff.com/#/?code=vXn9xcb8'};
    for(const [code,href] of Object.entries(registrations)) enhanced=enhanced.replace(`data-code="${code}">复制优惠码</button>`,`data-code="${code}">复制优惠码</button><a class="coupon-register" href="${href}" target="_blank" rel="nofollow sponsored noopener noreferrer">前往官网注册 →</a>`);
  }
  if(p==='topics/recommend.html') enhanced=enhanced.replaceAll('新增四家','另外四家').replace('新增推荐入口','更多老牌入口').replace('以下服务目前仅展示注册入口','以下老牌服务目前仅展示注册入口');
  if(p==='about.html') enhanced=enhanced.replace('</main>','<section class="legal-contact"><div class="wrap legal-contact-grid"><div class="disclaimer-panel"><span>DISCLAIMER</span><h2>免责声明</h2><p>本站内容仅用于一般网络知识、软件使用与隐私安全教育，不构成法律、投资或购买建议。本站不提供、不销售、不代购任何节点、订阅或翻墙服务，也不保证第三方软件、服务或外部链接永久可用、绝对安全或适用于所有地区。</p><p>读者应自行了解并遵守所在地法律法规、单位网络政策和第三方平台条款。因使用本站信息、下载第三方软件、访问外部链接或自行配置网络工具产生的任何直接或间接损失，由使用者自行承担。外部项目的功能、价格、隐私政策与安全性由其开发者负责。</p><p>本站会尽力核对信息，但软件版本、项目地址和政策可能随时变化。如发现内容失效或存在安全问题，请通过下方 Telegram 联系。</p></div><aside class="contact-panel"><span>CONTACT</span><h2>联系机场雷达</h2><p>内容勘误、失效链接、安全提醒与合作咨询。</p><a class="tg-button" href="https://t.me/shandianjiaoliu" target="_blank" rel="noopener noreferrer" aria-label="通过 Telegram 联系机场雷达">点击联系 Telegram →</a><small>请勿发送订阅链接、密码、验证码或其他敏感信息。</small></aside></div></section></main>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/cover-styles.css"></head>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/tech-theme.css"></head>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/extra-pages.css"></head>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/review-styles.css"></head>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/hero-refresh.css"></head>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/hero-v2.css"></head>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/radar-fix.css"></head>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/background-tech.css"></head>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/background-pro.css"></head>');
  if(p.endsWith('.html')) enhanced=enhanced.replace('</head>','<link rel="stylesheet" href="/assets/radar-background-motion.css"></head>');
  if(p==='index.html') enhanced=enhanced.replace(/<div class="hero-art">.*?<\/div><\/div><\/section>(?=<section class="ticker">)/s,radarDeskV3.replace('{{ARTICLE_COUNT}}',String(topics.length))+'</div></section>');
  if(p==='index.html') enhanced=enhanced.replaceAll('>09.29<','>10.15<').replaceAll('>09.30<','>10.15<').replaceAll('>10.03<','>10.15<').replaceAll('>10.08<','>10.15<');
  if(p.startsWith('articles/')&&p!=='articles/index.html'){
    const slug=path.basename(p,'.html');
    enhanced=enhanced.replace('<div class="takeaway">',`<figure class="article-cover"><img src="/assets/covers/${slug}.svg" alt="文章主题封面" width="1200" height="630"></figure><div class="takeaway">`);
  }
  const portable=p.endsWith('.html')
    ? enhanced.replace(/((?:href|src)=")\/([^"]*)/g,(_,attr,target)=>`${attr}${target?prefix+target:(prefix||'./')}`)
    : enhanced;
  const f=path.join(out,p);
  fs.mkdirSync(path.dirname(f),{recursive:true});
  fs.writeFileSync(f,portable);
  const mirror=path.resolve(p);
  fs.mkdirSync(path.dirname(mirror),{recursive:true});
  fs.writeFileSync(mirror,portable);
};
function card(a){
  const idx = topics.indexOf(a) + 1;
  const kwList = (a.keywords || '').split(',').slice(0, 3);
  const kwHtml = kwList.length ? `<div class="card-tags">${kwList.map(k=>`<span class="card-tag">#${esc(k.trim())}</span>`).join('')}</div>` : '';
  return `<article class="card" data-category="${a.category}" data-title="${esc(a.title)}" data-dek="${esc(a.dek)}" data-keywords="${esc(a.keywords)}"><a class="card-top c-${a.category}" href="/articles/${a.slug}.html"><img src="/assets/covers/${a.slug}.svg" alt="${esc(a.title)}文章封面" loading="lazy" width="1200" height="630"><span>${categories[a.category].name}</span><span class="card-seq">${String(idx).padStart(2,'0')}</span></a><div class="card-body"><div class="meta"><span class="meta-date">📅 ${a.date}</span><span class="meta-time">⏱️ ${a.read} 分钟 · 约1500字</span></div><h3><a href="/articles/${a.slug}.html">${a.title}</a></h3><p>${a.dek}</p>${kwHtml}<a class="read" href="/articles/${a.slug}.html">继续阅读 <span>→</span></a></div></article>`;
}
const homeBody=`<section class="hero"><div class="wrap hero-grid"><div><div class="eyebrow">INDEPENDENT NETWORK FIELD NOTES</div><h1>网络工具不该<br>靠玄学来选。</h1><p>${site.description}</p><div class="actions"><a class="btn primary" href="/articles/vpn-jichang-guide.html">从新手指南开始</a><a class="btn ghost" href="/articles/shadowrocket-complete-guide.html">查看小火箭教程</a></div><div class="trust"><span>✓ 不卖节点</span><span>✓ 不接软文</span><span>✓ 先讲风险</span></div></div><div class="hero-art"><div class="scan"></div><div class="orb"><span>${topics.length}</span><small>实用指南</small></div><div class="signal s1"></div><div class="signal s2"></div><div class="float f1">晚高峰稳定性</div><div class="float f2">订阅安全</div><div class="float f3">规则分流</div></div></div></section><section class="ticker"><div>SHADOWROCKET <i>•</i> CLASH <i>•</i> 隐私安全 <i>•</i> 节点测速 <i>•</i> 新手避坑 <i>•</i> SHADOWROCKET</div></section><section class="section wrap"><div class="section-head"><div><span>本周精选</span><h2>先解决最常见的问题</h2></div><a href="/articles/index.html">全部文章 →</a></div><div class="featured">${topics.slice(0,3).map(card).join('')}</div></section><section class="dark"><div class="wrap principles"><div><span class="kicker">我们的判断方式</span><h2>不做“最快最好”的空口推荐</h2></div><div class="principle-list"><div><b>01</b><h3>连续观察</h3><p>一次测速只是快照。我们更看晚高峰、丢包和故障恢复。</p></div><div><b>02</b><h3>明确边界</h3><p>工具能做什么、不能做什么，以及使用前该知道的隐私代价。</p></div><div><b>03</b><h3>可复现步骤</h3><p>每个排错结论都拆成普通人能逐项验证的检查点。</p></div></div></div></section><section class="section wrap"><div class="section-head"><div><span>最新更新</span><h2>刚整理好的实用笔记</h2></div></div><div class="grid">${topics.slice(3,9).map(card).join('')}</div></section><section class="newsletter"><div class="wrap"><div><span>RADAR BRIEF</span><h2>少一点营销，多一点判断依据。</h2><p>收藏本站，遇到连接、测速和客户端问题时回来查。</p></div><a class="btn lightbtn" href="/faq.html">先看常见问题</a></div></section>`;
write('index.html',layout({title:'机场雷达｜VPN 机场、小火箭与代理工具实用指南',desc:site.description,body:homeBody}));

const headings=['先把概念说清楚','实际使用时怎么判断','一套不会越查越乱的步骤','容易踩的坑','我们的建议'];

function getArticleSections(a){
  if (a.customSections) return a.customSections;
  const kw = a.keywords.split(',').map(s=>s.trim());
  const primaryKw = kw[0] || a.title;
  const secondaryKw = kw.slice(1, 4).join('、') || '协议配置与分流机制';
  const cleanTitle = a.title.replace(/：.*/,'').replace(/？.*/,'');

  const s0 = [
    `深入理解“${cleanTitle}”的技术本质，是避开绝大多数配置误区的前提。许多初学者容易被复杂的名词和教程带偏，误以为只要复制链接就能一劳永逸。事实上，网络代理涉及本地系统协议栈、客户端内核驱动、加密传输协议与跨国骨干网络路由等多个层次。${a.points[0]} 只有明确流量在设备、本地网络与远程服务器之间的交接边界，后续排查打不开网页或断流时才不会无从下手。`,
    `从网络拓扑与通信模型来看，${cleanTitle}的核心价值在于重塑客户端与目标服务器之间的数据路径。围绕“${secondaryKw}”，工具并非凭空提升物理带宽，而是通过加密隧道规避骨干网拥堵节点与 QoS 限速。理解这一点至关重要：代理只能在物理链路允许的物理限度内优化选路，它无法突破光纤传播的物理延迟，也不能在本地 Wi-Fi 丢包严重时凭空消除抖动。明确自身的使用场景（如影音播放、办公通讯还是游戏联机），是选配参数与节点的基石。`
  ];

  const s1 = [
    `衡量当前网络链路是否处于健康可用状态，不能只看测速软件在凌晨跑出的瞬时峰值。${a.points[1]} 实际体验中，判断线路质量应紧扣三个核心维度：平均往返延迟（RTT）、延迟抖动（Jitter）以及晚高峰丢包率（Packet Loss）。在 20:00 至 23:00 期间持续稳定、零丢包的百兆带宽，其实用价值远超白天看似亮眼但高峰期频繁抽风的千兆跑分。`,
    `在客户端配置与分流模式的选择上，核心在于“分流精度”与“系统兼容性”的平衡。合理的规则应放行局域网、国内金融与主流服务直连，仅将真正需要代理的境外请求送入对应节点。若遇到国内应用定位漂移、网银提示异地登录，或某些网页长期白屏，往往是规则误伤或本地 DNS 解析受阻所致，而非节点彻底失效。建议固定同一设备在不同时段多轮对比，避免把本地 Wi-Fi 波动误判为服务商问题。`
  ];

  const s2 = [
    `遇到连接异常或打不开网页时，最忌讳同时改动多项参数，这会导致排查线索彻底中断。${a.points[2]} 正确的做法是严格遵循“自底向上、控制单变量”的排错顺序：先彻底关闭代理，测试本地网络访问国内主流站点与局域网网关是否正常；若底层 Wi-Fi 已经存在丢包或时延过高，应先修复本地基础网络。`,
    `第二步检查客户端内核与节点握手状态。开启客户端控制台查看实时日志，确认是否有 TLS 证书报错、DNS 解析失败或端口冲突（如 7890 端口被占）。检查系统时间是否精准到秒（误差超 60 秒会导致多数现代加密协议握手失败），并在后台核对套餐剩余流量与到期时间。必要时临时切到全局模式对照测试，即可迅速定位问题是出在规则分流还是节点服务器端。`
  ];

  const s3 = [
    `配置与使用过程中，新手最容易陷入“盲目堆叠复杂规则与脚本”的误区。${a.points[3]} 很多用户热衷从网上导入包含数万条域名的巨型规则包，这不仅会导致客户端内存占用居高不下、手机发热严重，还会显著拖慢每一个请求的首包响应速度。规则越臃肿，发生域名匹配冲突和死循环解析的概率就越高。`,
    `另一个隐蔽且严重的重灾区是隐私泄露与虚假宣传陷阱。部分用户图省事将含有唯一 Token 的订阅链接提交给公共在线转换站，导致节点与个人凭证被第三方截获；忽视 WebRTC 穿透与 DNS 泄漏也会暴露真实公网 IP。此外，切忌迷信商家宣传的“全专线”与“无限流量”，需警惕高倍率扣费与晚高峰严苛限速，切勿为了折扣一次性大额预付多年。`
  ];

  const s4 = [
    `针对“${cleanTitle}”的长期健康使用，我们始终建议遵循“保持极简、按需配置”的原则。优先选择经过社区长期审计的主流开源客户端与官方发布源，尽量保留轻量高效的默认规则库。分流配置建议采用编译好的 GeoSite 与 GeoIP 规则集，确保国内流量完全走本地网络直连通道，兼顾响应速度与系统资源开销。`,
    `建立冗余备份思维，始终保留一条来自不同运营商或独立服务商的备用线路，并坚持按月或按季度的短周期订阅，把主动权牢牢掌握在自己手中。围绕“${primaryKw}”，合理规划流媒体、办公与游戏场景的分流策略，定期核对客户端安全补丁，才能在享受高速全球网络互联的同时，守住稳定性与个人数字隐私的安全底线。`
  ];

  return [s0, s1, s2, s3, s4];
}

function article(a){
  const headingsList = a.customHeadings || headings;
  const sectionParagraphs = a.customArticleHtml ? null : getArticleSections(a);
  const sections = a.customArticleHtml || headings.map((h,i)=>`<section id="s${i}"><h2>${h}</h2>${sectionParagraphs[i].map(x=>`<p>${x}</p>`).join('')}</section>`).join('');
  const related=topics.filter(x=>x.category===a.category&&x.slug!==a.slug).slice(0,3);
  const schema=`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:a.title,description:a.dek,datePublished:a.date,dateModified:a.date,author:{"@type":"Organization",name:site.author},publisher:{"@type":"Organization",name:site.name},mainEntityOfPage:url('/articles/'+a.slug+'.html'),keywords:a.keywords})}</script><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:'首页',item:site.url},{"@type":"ListItem",position:2,name:'文章',item:url('/articles/')},{"@type":"ListItem",position:3,name:a.title,item:url('/articles/'+a.slug+'.html')}]})}</script>`;
  const takeawayTitle = a.directAnswer ? 'Direct Answer 核心结论速览' : '先说结论';
  const takeawayText = a.directAnswer || a.points[0];
  const body=`<div class="article-shell wrap"><article class="article"><div class="crumb"><a href="/index.html">首页</a> / <a href="/articles/index.html">文章</a> / ${categories[a.category].name}</div><header><span class="pill c-${a.category}">${categories[a.category].name}</span><h1>${a.title}</h1><p class="lead">${a.dek}</p><div class="byline"><span class="avatar">雷</span><span><b>${site.author}</b><small>更新于 ${a.date} · ${a.read} 分钟阅读 · 约1500字</small></span></div></header><div class="takeaway"><b>${takeawayTitle}</b><p>${takeawayText}</p></div>${sections}<div class="notice"><b>合规与安全提醒</b><p>请遵守所在地法律法规、单位网络政策和第三方服务条款。本文只提供一般技术信息，不构成法律意见，也不提供节点或绕过授权的服务。</p></div></article><aside class="toc"><b>本文目录</b>${headingsList.map((h,i)=>`<a href="#s${i}">${i+1}. ${h}</a>`).join('')}<div class="aside-box">不确定从哪查？<a href="/faq.html">查看 FAQ →</a></div></aside></div><section class="related wrap"><h2>继续阅读</h2><div class="grid">${related.map(card).join('')}</div></section>`;
  return layout({title:`${a.title}｜机场雷达`,desc:a.dek,pathName:`/articles/${a.slug}.html`,body,schema,type:'article'});
}
topics.forEach(a=>write(`articles/${a.slug}.html`,article(a)));

const catCounts={};
topics.forEach(t=>{catCounts[t.category]=(catCounts[t.category]||0)+1;});
const catPillIcons={guide:'🧭',shadowrocket:'🚀',client:'💻',security:'🔒',test:'⚡'};
const allPillsHtml=`<button type="button" class="article-pill active" data-filter="all"><span>🌟 全部</span><span class="pill-count">${topics.length}</span></button>`+Object.entries(categories).map(([k,v])=>`<button type="button" class="article-pill" data-filter="${k}"><span>${catPillIcons[k]||'📁'} ${v.name}</span><span class="pill-count">${catCounts[k]||0}</span></button>`).join('');

const all=`<section class="page-hero article-hero-banner">
  <div class="wrap">
    <div class="article-hero-meta">
      <span class="hero-badge">RADAR KNOWLEDGE ARCHIVE</span>
      <span class="hero-tag">🔥 ${topics.length} 篇技术专栏 · 5 大分类体系</span>
    </div>
    <h1>全部文章与技术专栏</h1>
    <p>从第一次导入订阅、排错避坑，到看懂内核配置、专线拓扑与网络攻防。拒绝夸张宣传，只讲实操逻辑与可复现步骤。</p>
    <div class="article-hero-stats">
      <div class="stat-pill"><b class="stat-num">${topics.length}</b><span>篇实操教程</span></div>
      <div class="stat-pill"><b class="stat-num">5</b><span>大核心分类</span></div>
      <div class="stat-pill"><b class="stat-num">100%</b><span>独立排错</span></div>
      <div class="stat-pill"><b class="stat-num">24/7</b><span>持续跟踪</span></div>
    </div>
  </div>
</section>

<nav class="article-filter-section" aria-label="文章筛选与搜索">
  <div class="wrap article-control-panel">
    <div class="article-cat-pills" id="articleCategoryPills">
      ${allPillsHtml}
    </div>
    <div class="article-search-row">
      <div class="article-search-box">
        <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="articleSearchInput" placeholder="输入关键词实时搜索（如：Clash Verge、Hysteria 2、Apple TV、软路由、一元机场...）" aria-label="搜索文章">
        <button type="button" id="clearSearchBtn" class="article-search-clear" aria-label="清空搜索" hidden>×</button>
      </div>
      <div class="hot-search-box">
        <span class="hot-search-label">🔥 热门搜索：</span>
        <button type="button" class="hot-search-tag" data-kw="Clash Verge">Clash Verge</button>
        <button type="button" class="hot-search-tag" data-kw="Hysteria 2">Hysteria 2</button>
        <button type="button" class="hot-search-tag" data-kw="Apple TV">Apple TV</button>
        <button type="button" class="hot-search-tag" data-kw="软路由">软路由</button>
        <button type="button" class="hot-search-tag" data-kw="Subconverter">Subconverter</button>
        <button type="button" class="hot-search-tag" data-kw="一元机场">一元机场</button>
        <button type="button" class="hot-search-tag" data-kw="WebRTC">WebRTC</button>
        <button type="button" class="hot-search-tag" data-kw="专线">IPLC专线</button>
      </div>
    </div>
    <div class="article-live-status" id="searchSummary" hidden>
      <span id="searchSummaryText">🔍 筛选匹配：共找到 <b class="highlight-count" id="searchCount">0</b> 篇相关专栏文章</span>
      <button type="button" id="resetFilterBtn" class="reset-filter-link">清除筛选与搜索 ↺</button>
    </div>
  </div>
</nav>

<main class="wrap article-main-content">
  <div class="grid article-grid" id="articleGrid">
    ${topics.map(card).join('')}
  </div>
  <div class="no-search-results" id="noSearchResults" hidden>
    <div class="no-results-inner">
      <div class="no-results-icon">🔎</div>
      <h3>未找到匹配的技术文章</h3>
      <p>没有找到完全匹配的内容。您可以直接点击下方推荐关键词查看核心专栏：</p>
      <div class="empty-suggest-tags">
        <button type="button" class="empty-tag-chip" data-kw="Hysteria 2">⚡ Hysteria 2</button>
        <button type="button" class="empty-tag-chip" data-kw="Clash Verge">💻 Clash Verge</button>
        <button type="button" class="empty-tag-chip" data-kw="小火箭">🚀 小火箭教程</button>
        <button type="button" class="empty-tag-chip" data-kw="Apple TV">📺 Apple TV</button>
        <button type="button" class="empty-tag-chip" data-kw="软路由">🌐 软路由</button>
        <button type="button" class="empty-tag-chip" data-kw="Subconverter">🔒 订阅转换</button>
        <button type="button" class="empty-tag-chip" data-kw="一元机场">💰 一元机场</button>
        <button type="button" class="empty-tag-chip" data-kw="专线">🔌 IPLC专线</button>
      </div>
      <button type="button" class="btn primary" id="emptyResetBtn">重置全部筛选与搜索</button>
    </div>
  </div>
</main>

<script>(function(){
  const sInput = document.getElementById('articleSearchInput');
  const cBtn = document.getElementById('clearSearchBtn');
  const pBtns = document.querySelectorAll('#articleCategoryPills .article-pill');
  const hotTags = document.querySelectorAll('.hot-search-tag');
  const cards = document.querySelectorAll('#articleGrid .card');
  const summary = document.getElementById('searchSummary');
  const summaryText = document.getElementById('searchSummaryText');
  const noRes = document.getElementById('noSearchResults');
  const rBtn = document.getElementById('resetFilterBtn');
  const eBtn = document.getElementById('emptyResetBtn');
  const emptyChips = document.querySelectorAll('.empty-tag-chip');
  const catNames = ${JSON.stringify(Object.fromEntries(Object.entries(categories).map(([k, v]) => [k, v.name])))};

  let aFilter = 'all';
  let sQuery = '';

  function setCategory(catKey) {
    aFilter = catKey;
    pBtns.forEach(b => {
      if (b.dataset.filter === catKey) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  function update(source) {
    const q = sQuery.trim().toLowerCase();
    const words = q ? q.split(/\s+/).filter(Boolean) : [];

    // 1. Calculate matches across entire library and in current category
    let totalMatches = 0;
    let currentCatMatches = 0;

    cards.forEach(c => {
      const cat = c.dataset.category;
      const t = (c.dataset.title || '').toLowerCase();
      const d = (c.dataset.dek || '').toLowerCase();
      const k = (c.dataset.keywords || '').toLowerCase();
      const mSearch = words.length === 0 || words.every(w => t.includes(w) || d.includes(w) || k.includes(w));
      if (mSearch) {
        totalMatches++;
        if (aFilter === 'all' || cat === aFilter) {
          currentCatMatches++;
        }
      }
    });

    // 2. Intelligent Auto-Expand:
    // If user searches or clicks while in a category that has 0 matches,
    // but the site DOES have matching articles, automatically switch to 'all'!
    let autoExpanded = false;
    let prevCatName = '';
    if (q && aFilter !== 'all' && currentCatMatches === 0 && totalMatches > 0 && source !== 'category-click') {
      prevCatName = catNames[aFilter] || aFilter;
      setCategory('all');
      currentCatMatches = totalMatches;
      autoExpanded = true;
    }

    // 3. Render card visibility with both style.display and hidden attribute
    let visibleCount = 0;
    cards.forEach(c => {
      const cat = c.dataset.category;
      const t = (c.dataset.title || '').toLowerCase();
      const d = (c.dataset.dek || '').toLowerCase();
      const k = (c.dataset.keywords || '').toLowerCase();
      const mCat = (aFilter === 'all' || cat === aFilter);
      const mSearch = words.length === 0 || words.every(w => t.includes(w) || d.includes(w) || k.includes(w));
      if (mCat && mSearch) {
        c.hidden = false;
        c.style.display = '';
        visibleCount++;
        if (q && (source === 'hot-tag' || source === 'input')) {
          c.classList.add('pulse-match');
          setTimeout(() => c.classList.remove('pulse-match'), 400);
        }
      } else {
        c.hidden = true;
        c.style.display = 'none';
      }
    });

    cBtn.hidden = !sQuery;

    // 4. Update status summary banner
    if (q || aFilter !== 'all') {
      summary.hidden = false;
      if (autoExpanded) {
        summaryText.innerHTML = '💡 在「' + prevCatName + '」下无匹配，已<b>自动切换至全部分类</b>：为您找到 <b class="highlight-count">' + totalMatches + '</b> 篇关于“' + sQuery.replace(/</g,'&lt;').replace(/>/g,'&gt;') + '”的文章';
      } else if (aFilter !== 'all' && q) {
        if (visibleCount > 0) {
          const extraCount = totalMatches - visibleCount;
          const extraHint = extraCount > 0 ? '（全站共有 <b>' + totalMatches + '</b> 篇，<button type="button" class="btn-text-link" id="viewAllCatMatchesBtn">查看全站结果 ➔</button>）' : '';
          summaryText.innerHTML = '🔍 在「' + (catNames[aFilter] || aFilter) + '」分类下找到 <b class="highlight-count">' + visibleCount + '</b> 篇匹配文章 ' + extraHint;
        } else {
          summaryText.innerHTML = '⚠️ 在「' + (catNames[aFilter] || aFilter) + '」分类下未找到相关文章（全站共有 <b>' + totalMatches + '</b> 篇，<button type="button" class="btn-text-link" id="viewAllCatMatchesBtn">一键查看全站结果 ➔</button>）';
        }
      } else if (q) {
        summaryText.innerHTML = '🔍 搜索“<b>' + sQuery.replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</b>”：共找到 <b class="highlight-count">' + visibleCount + '</b> 篇相关专栏文章';
      } else {
        summaryText.innerHTML = '📁 当前分类：<b>' + (catNames[aFilter] || aFilter) + '</b>（共 <b class="highlight-count">' + visibleCount + '</b> 篇技术专栏）';
      }

      const expandBtn = document.getElementById('viewAllCatMatchesBtn');
      if (expandBtn) {
        expandBtn.onclick = () => {
          setCategory('all');
          update('expand-click');
        };
      }
    } else {
      summary.hidden = true;
    }

    noRes.hidden = (visibleCount > 0);

    // 5. Scroll to results when requested
    if (source === 'hot-tag' || source === 'enter' || source === 'chip-click') {
      const summaryEl = document.getElementById('searchSummary');
      if (summaryEl && !summaryEl.hidden) {
        summaryEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  // Hot Search Tags: ALWAYS search globally across all categories!
  hotTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const kw = tag.dataset.kw || tag.textContent.trim();
      hotTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      setCategory('all');
      sInput.value = kw;
      sQuery = kw;
      update('hot-tag');
      sInput.focus();
    });
  });

  // Category Pills
  pBtns.forEach(b => {
    b.addEventListener('click', () => {
      setCategory(b.dataset.filter);
      update('category-click');
    });
  });

  // Search input typing & enter key
  sInput.addEventListener('input', e => {
    sQuery = e.target.value;
    hotTags.forEach(t => {
      if ((t.dataset.kw || t.textContent.trim()).toLowerCase() === sQuery.trim().toLowerCase()) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
    update('input');
  });

  sInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      update('enter');
      sInput.blur();
    }
  });

  // Clear button inside input
  cBtn.addEventListener('click', () => {
    sInput.value = '';
    sQuery = '';
    hotTags.forEach(t => t.classList.remove('active'));
    update('clear');
    sInput.focus();
  });

  // Reset all
  function resetAll() {
    sInput.value = '';
    sQuery = '';
    hotTags.forEach(t => t.classList.remove('active'));
    setCategory('all');
    update('reset');
  }

  if (rBtn) rBtn.addEventListener('click', resetAll);
  if (eBtn) eBtn.addEventListener('click', resetAll);

  // Empty state suggestion chips
  emptyChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const kw = chip.dataset.kw || chip.textContent.trim();
      setCategory('all');
      sInput.value = kw;
      sQuery = kw;
      update('chip-click');
      sInput.focus();
    });
  });

  // Make the entire article card clickable
  cards.forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      const link = card.querySelector('a.card-top') || card.querySelector('h3 a') || card.querySelector('a.read');
      if (link && link.href) {
        window.location.href = link.href;
      }
    });
  });
})();</script>`;
write('articles/index.html',layout({title:'全部文章与技术专栏｜机场雷达',desc:'机场雷达全部 VPN、机场、小火箭、Clash Verge、sing-box、节点测速与隐私安全教程。',pathName:'/articles/',body:all}));
const faqSchema=`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:detailedFaqs.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))})}</script>`;

const categoryBlocksHtml=Object.entries(faqCategories).map(([catId,cat])=>{
  const catItems=detailedFaqs.filter(f=>f.category===catId);
  return `<section class="faq-category-block" id="category-${cat.id}" data-category="${cat.id}"><header class="faq-category-header"><div class="faq-category-title-wrap"><span class="faq-category-icon">${cat.icon}</span><div><h2>${cat.name}</h2><p>${cat.desc}</p></div></div><span class="faq-category-count">${catItems.length} 问</span></header><div class="faq-items-list">${catItems.map(f=>`<details class="faq-item" id="faq-${f.id}" data-category="${f.category}" data-keywords="${esc(f.keywords)}" data-q="${esc(f.q)}"><summary><div class="faq-summary-left"><span class="faq-num">${String(f.id).padStart(2,'0')}</span>${f.geoTag?`<span class="faq-geo-badge">${esc(f.geoTag)}</span>`:''}<h3>${esc(f.q)}</h3></div><i class="faq-toggle-icon">＋</i></summary><div class="faq-answer-body"><p>${esc(f.a)}</p><div class="faq-item-footer"><span class="faq-kw-tags">🏷️ ${esc(f.keywords.split(' ').slice(0,5).join(' · '))}</span><a class="faq-anchor-link" href="#faq-${f.id}"># 直达定位</a></div></div></details>`).join('')}</div></section>`;
}).join('');

const categoryPillsHtml=`<button type="button" class="faq-pill active" data-filter="all"><span>🌟 全部问答</span><span class="faq-pill-count">${detailedFaqs.length}</span></button>${Object.entries(faqCategories).map(([catId,cat])=>{
  const count=detailedFaqs.filter(f=>f.category===catId).length;
  return `<button type="button" class="faq-pill" data-filter="${cat.id}"><span>${cat.icon} ${cat.shortName}</span><span class="faq-pill-count">${count}</span></button>`;
}).join('')}`;

const faqBody=`<section class="page-hero faq-hero"><div class="wrap"><div class="faq-hero-meta"><span class="faq-hero-badge">FIELD FAQ DATABASE</span><span class="faq-hero-tag">🔥 42 篇热搜解答 · SEO &amp; GEO 深度覆盖</span></div><h1>常见问题深度指南 (FAQ)</h1><p>短答案先解决问题，复杂情况再去读完整指南。涵盖华北联通、南方电信与移动宽带选路、香港/日本/美西机房海缆走线、小火箭与 Clash 实操排错、Netflix 4K 与 ChatGPT 解锁及防跑路安全指南。</p></div></section><nav class="faq-filter-section" aria-label="FAQ分类与搜索"><div class="wrap faq-control-panel"><div class="faq-category-pills" id="faqCategoryPills">${categoryPillsHtml}</div><div class="faq-search-row"><div class="faq-search-box"><svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><input type="text" id="faqSearchInput" placeholder="输入关键词实时搜索（如：北方联通、小火箭超时、Netflix、TUN模式、倍率...）" aria-label="搜索FAQ常见问题"><button type="button" id="faqClearSearchBtn" class="faq-search-clear" aria-label="清空搜索" hidden>×</button></div><div class="faq-actions-box"><button type="button" class="faq-btn-action" id="faqExpandAllBtn">＋ 展开全部</button><button type="button" class="faq-btn-action" id="faqCollapseAllBtn">－ 收起全部</button></div></div><div class="faq-search-live-status" id="faqLiveStatus" hidden><span>🔍 筛选匹配：共找到 <b id="faqMatchCount">0</b> 条相关问答</span><button type="button" class="reset-filter-link" id="faqResetFilterBtn">重置筛选与搜索</button></div></div></nav><main class="wrap faq-main-content"><div id="faqCategoriesContainer">${categoryBlocksHtml}</div><div class="no-search-results" id="faqNoResults" hidden><div class="no-results-inner"><div class="no-results-icon">🔎</div><h3>未找到匹配的 FAQ 问题</h3><p>可以尝试搜索更通用的关键词，如“联通”、“电信”、“小火箭”、“专线”、“Netflix”等</p><button type="button" class="btn primary" id="faqEmptyResetBtn">重置所有搜索条件</button></div></div></main><script>(function(){const sInput=document.getElementById('faqSearchInput');const cBtn=document.getElementById('faqClearSearchBtn');const pBtns=document.querySelectorAll('#faqCategoryPills .faq-pill');const blocks=document.querySelectorAll('.faq-category-block');const items=document.querySelectorAll('.faq-item');const liveStatus=document.getElementById('faqLiveStatus');const matchCountEl=document.getElementById('faqMatchCount');const noResults=document.getElementById('faqNoResults');const resetBtn=document.getElementById('faqResetFilterBtn');const emptyResetBtn=document.getElementById('faqEmptyResetBtn');const expandAllBtn=document.getElementById('faqExpandAllBtn');const collapseAllBtn=document.getElementById('faqCollapseAllBtn');let currentCategory='all';let currentQuery='';function applyFilter(){const q=currentQuery.trim().toLowerCase();let totalVisible=0;blocks.forEach(block=>{const blockCat=block.dataset.category;const blockItems=block.querySelectorAll('.faq-item');let blockVisibleCount=0;if(currentCategory!=='all'&&currentCategory!==blockCat){block.hidden=true;return}blockItems.forEach(item=>{const question=(item.dataset.q||'').toLowerCase();const keywords=(item.dataset.keywords||'').toLowerCase();const text=item.textContent.toLowerCase();const matchesQuery=!q||question.includes(q)||keywords.includes(q)||text.includes(q);if(matchesQuery){item.hidden=false;blockVisibleCount++;totalVisible++;if(q)item.open=true}else{item.hidden=true}});block.hidden=(blockVisibleCount===0)});cBtn.hidden=!currentQuery;if(q||currentCategory!=='all'){liveStatus.hidden=false;matchCountEl.textContent=totalVisible}else{liveStatus.hidden=true}noResults.hidden=(totalVisible>0)}pBtns.forEach(btn=>{btn.addEventListener('click',()=>{pBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentCategory=btn.dataset.filter;applyFilter()})});sInput.addEventListener('input',e=>{currentQuery=e.target.value;applyFilter()});cBtn.addEventListener('click',()=>{sInput.value='';currentQuery='';applyFilter();sInput.focus()});function resetAll(){sInput.value='';currentQuery='';currentCategory='all';pBtns.forEach(b=>b.classList.remove('active'));const allBtn=document.querySelector('#faqCategoryPills .faq-pill[data-filter="all"]');if(allBtn)allBtn.classList.add('active');applyFilter()}if(resetBtn)resetBtn.addEventListener('click',resetAll);if(emptyResetBtn)emptyResetBtn.addEventListener('click',resetAll);expandAllBtn.addEventListener('click',()=>{items.forEach(item=>{if(!item.hidden)item.open=true})});collapseAllBtn.addEventListener('click',()=>{items.forEach(item=>{item.open=false})});if(location.hash&&location.hash.startsWith('#faq-')){const target=document.querySelector(location.hash);if(target){target.open=true;setTimeout(()=>{target.scrollIntoView({behavior:'smooth',block:'center'})},200)}}})();</script>`;

write('faq.html',layout({title:'VPN 机场常见问题深度解答 (FAQ)｜涵盖地域选路、客户端与解锁｜机场雷达',desc:'机场雷达汇总 42 项高频热搜 FAQ：涵盖北方联通、南方电信与移动宽带选路、香港/日本/美西海缆走向、小火箭超时与 Clash 内核崩溃排查、Netflix 4K与ChatGPT解锁、IPLC专线避坑及防跑路指南。',pathName:'/faq.html',schema:faqSchema,body:faqBody}));
write('about.html',layout({title:'关于机场雷达｜编辑原则与内容说明',desc:'了解机场雷达的编辑原则、内容边界与更新方式。',pathName:'/about.html',body:`<section class="page-hero"><div class="wrap"><span>ABOUT THE RADAR</span><h1>我们不替你做决定，<br>只把判断依据摆清楚。</h1></div></section><section class="prose wrap"><h2>为什么做这个站</h2><p>代理工具的中文资料不少，但许多文章不是过期截图，就是堆满无法验证的“最佳推荐”。机场雷达想做得更朴素：解释名词、记录排错顺序、说明隐私代价，并承认工具能力的边界。</p><h2>编辑原则</h2><p>不出售节点，不接受付费排名，不把一次测速写成长期结论。涉及软件版本与法规时标注日期；无法独立验证的商家宣传，不作为事实引用。教程优先给出可回退、可复现的步骤。</p><h2>内容边界</h2><p>本站提供一般网络与隐私教育内容，不提供绕过授权、攻击、欺诈或其他违法用途的操作指导。不同地区规则不同，读者应自行核对所在地法律和组织政策。</p><h2>勘误与更新</h2><p>网络工具变化很快。若页面步骤已经失效，请记录文章标题、设备系统、客户端版本和具体差异，方便编辑复核。我们宁愿删掉过期结论，也不靠旧流量撑页面。</p></section>`}));
for(const [key,cat] of Object.entries(categories)){const subset=topics.filter(a=>a.category===key);write(`topics/${key}.html`,layout({title:`${cat.name}教程与文章｜机场雷达`,desc:`机场雷达关于${cat.name}的实用教程与排错文章。`,pathName:`/topics/${key}.html`,body:`<section class="page-hero"><div class="wrap"><span>TOPIC / ${subset.length}</span><h1>${cat.name}</h1><p>经过整理的操作步骤、判断方法与风险提示。</p></div></section><section class="section wrap"><div class="grid">${subset.map(card).join('')}</div></section>`}))}
const recommendedSlugs=['airport-buying-checklist','node-selection','node-speed-test','free-vpn-risk','airport-running-risk','streaming-nodes','multi-device-setup','vpn-jichang-guide'];
const recommended=topics.filter(article=>recommendedSlugs.includes(article.slug));
const providers=[
  {rank:1,name:'闪电鼠',logo:'shandianshu.jpg',tag:'综合首选',code:'sd88',url:'https://chaore01.shandianshuaff.com/#/?code=HeUwm3zo',feature:'从轻量入门到 500GB 大流量档位都覆盖，价格梯度直观，适合希望一站式完成日常浏览、影音与多设备使用的读者。',fit:'适合第一次选择机场、重视套餐均衡度的人群',points:['60GB 年付小包适合轻量用户','120GB 至 500GB 月付档位清晰','输入专属码后统一按 7 折结算'],plans:[['限时钜惠小包','¥67.2/年','¥96/年','60GB/月'],['轻快版','¥15.4/月','¥22/月','120GB/月'],['疾速版','¥28/月','¥40/月','250GB/月'],['雷霆版','¥49/月','¥70/月','500GB/月']]},
  {rank:2,name:'大佬云',logo:'dalaoyun.png',tag:'套餐丰富',code:'dly88',url:'https://chaore01.dalaoyunaff.com/#/?code=rtH3pPer',feature:'月付、年付与一次性流量包同时提供，选择空间更大。轻量用户可以控制预算，大流量用户也能找到 600GB 档位。',fit:'适合希望灵活切换周期、需要一次性流量包的人群',points:['130GB 至 600GB 月付套餐','提供 78GB 与 160GB 一次性流量','不同使用周期更容易匹配预算'],plans:[['年付活动包','¥67.2/年','¥96/年','60GB/月'],['初云·入门版','¥16.1/月','¥23/月','130GB/月'],['凌云·基础版','¥30.1/月','¥43/月','300GB/月'],['御云·高级版','¥51.1/月','¥73/月','600GB/月'],['闲云·随心包','¥69.3/一次','¥99/一次','78GB 总量'],['悠云·长享包','¥139.3/一次','¥199/一次','160GB 总量']]},
  {rank:3,name:'神行加速',logo:'shenxing.png',tag:'流量进阶',code:'sx0077',url:'https://chaore01.shenxingaff.com/#/?code=iTjS2mVY',feature:'套餐从 130GB 平稳提升到 520GB，档位数量不复杂，适合不想在大量套餐中反复比较、希望快速作出决定的用户。',fit:'适合影音、下载及中高流量使用需求',points:['130GB 入门档降低选择门槛','260GB 与 520GB 适合持续使用','年付特惠版兼顾轻量需求'],plans:[['神行·尝鲜包','¥16.1/月','¥23/月','130GB/月'],['神行·基础包','¥28/月','¥40/月','260GB/月'],['神行·尊享包','¥50.4/月','¥72/月','520GB/月'],['神行·年付特惠版','¥67.2/年','¥96/年','60GB/月']]},
  {rank:4,name:'云界线',logo:'yunjiexian.png',tag:'弹性搭配',code:'yjx888',url:'https://chaore01.yunjiexianaff.com/#/?code=g2PDAa91',feature:'既有 150GB、300GB、600GB 月付套餐，也有不按月重置的一次性流量包，适合流量使用不稳定或需要备用方案的人群。',fit:'适合用量波动明显、希望保留备用流量的人群',points:['150GB 起步的月付选择','最高 600GB 月流量档位','80GB 与 200GB 一次性流量包'],plans:[['云界年付小包','¥67.2/年','¥96/年','60GB/月'],['轻云·基础版','¥15.4/月','¥22/月','150GB/月'],['凌云·进阶版','¥28/月','¥40/月','300GB/月'],['御云·高级版','¥46.2/月','¥66/月','600GB/月'],['闲云·随心包','¥69.3/一次','¥99/一次','80GB 总量'],['悠云·长享包','¥139.3/一次','¥199/一次','200GB 总量']]},
  {rank:5,name:'榴莲云',logo:'liulianyun.png',tag:'大流量优选',code:'ll88',url:'https://chaore01.liulianyunaff.com/#/?code=MNqUefcg',feature:'月付套餐以流量递增为主，从 140GB 到 750GB 覆盖明显，适合视频观看、远程协作和多台设备同时在线的场景。',fit:'适合高频影音、多设备及大流量用户',points:['140GB 至 750GB 多档月流量','高流量套餐价格跨度清楚','年付小包适合轻量备用'],plans:[['榴莲年付特惠版','¥67.2/年','¥96/年','60GB/月'],['轻享包','¥16.8/月','¥24/月','140GB/月'],['畅享包','¥28/月','¥40/月','260GB/月'],['尊享包','¥42/月','¥60/月','420GB/月'],['榴莲王','¥70/月','¥100/月','750GB/月']]},
  {rank:6,name:'环球梯',logo:'huanqiuti.jpg',tag:'场景覆盖',code:'HQ66',url:'https://chaore01.huanqiutiaff.com/#/?code=vXn9xcb8',feature:'同时覆盖学生轻量档、常规月付档和一次性流量包，适合按场景挑选，不必为了偶尔使用直接购买过大的长期套餐。',fit:'适合学生、轻量使用与临时大流量需求',points:['120GB 至 600GB 常规月付','80GB 与 400GB 一次性流量','不同预算都能找到对应档位'],plans:[['环球学生餐','¥67.2/年','¥96/年','60GB/月'],['环球轻享','¥15.4/月','¥22/月','120GB/月'],['环球畅游','¥27.3/月','¥39/月','240GB/月'],['环球尊享','¥48.3/月','¥69/月','600GB/月'],['环球随行包','¥69.3/一次','¥99/一次','80GB 总量'],['环球灵活包','¥209.3/一次','¥299/一次','400GB 总量']]}
];
const providerCards=providers.map(p=>{
  const rSlug = reviewsData.find(r=>r.rank===p.rank)?.slug || 'shandianshu';
  return `<article class="provider-card rank-${p.rank}" id="provider-${p.rank}"><header><div class="provider-rank"><small>推荐排名</small><b>${String(p.rank).padStart(2,'0')}</b></div><div class="provider-logo"><img src="/assets/recommendations/${p.logo}" alt="${p.name} Logo" loading="lazy" width="240" height="240"></div><div class="provider-name"><span class="provider-tag tag-${p.rank}">${p.tag}</span><h2>${p.name}</h2><p>${p.feature}</p><div class="provider-fit">适合人群：${p.fit}</div></div><div class="provider-coupon"><small>专属 7 折码</small><b>${p.code}</b><div class="provider-actions"><a class="register-link" href="${p.url}" target="_blank" rel="nofollow sponsored noopener noreferrer">立即注册 →</a><a class="review-card-btn" href="/reviews/${rSlug}.html">深度测评 ↗</a><a class="deal-link" href="/deals.html#${p.name}">优惠说明</a></div></div></header><div class="provider-points">${p.points.map(x=>`<span>✓ ${x}</span>`).join('')}</div><div class="plan-list">${p.plans.map(([name,price,original,traffic])=>`<div class="plan-row"><b>${name}</b><div class="discount-price"><strong>${price}</strong><del>${original}</del></div><span>${traffic}</span></div>`).join('')}</div></article>`;
}).join('');
const extraProviders=[
  {rank:7,name:'二猫云',logo:'/assets/recommendations/legacy/ermaoyun.svg',tag:'全专线',url:'https://server.ermaotztz3.homes/#/?code=Vf45aB7S',desc:'全线 IPLC/IEPL 国际私有专线，主打晚高峰稳定性与多设备无限制连接。套餐起步约 ¥20/月 (130GB流量)，另有年付小包等档位。'},
  {rank:8,name:'光速云',logo:'/assets/recommendations/legacy/guangsuyun.svg',tag:'高性价比',url:'https://sjds8ds.guangsut.sbs/#/?code=RrfZcKT5',desc:'隧道中转与 IPLC 专线，覆盖 60+ 独立节点，适合日常流媒体与 AI 解锁。套餐起步约 ¥17/月 (120GB流量)。'},
  {rank:9,name:'边缘节点',logo:'/assets/recommendations/legacy/yinjianjiedian.svg',tag:'边缘加密',url:'https://bcbhk40y.ztymforedge.lol/#/?code=HgD5cJEh',desc:'基于分布式边缘节点技术，优化连接延迟，提供稳定高速的网络接入。套餐起步约 ¥18/月 (130GB流量)。'},
  {rank:10,name:'网际快车',logo:'/assets/recommendations/legacy/wangjikuwaiche.svg',tag:'极速协议',url:'https://johhhu.xn--66tw07h.com',desc:'支持 Hysteria 2 新一代协议，主打高吞吐大流量流媒体播放，提供 ¥6.8/一次 (20GB) 及月付包。'},
  {rank:11,name:'大哥云',logo:'/assets/recommendations/legacy/dageyun.svg',tag:'老牌口碑',url:'https://a03.dgy02.com/#/register?code=vjFaxWEI',desc:'多年稳定运营的老牌专线机场，Trojan 协议与广泛节点覆盖。套餐起步约 ¥19.9/月 (120GB流量)。'},
  {rank:12,name:'青云梯',logo:'/assets/recommendations/legacy/qingyunti.svg',tag:'内网专线',url:'https://inv02.qytaff.cc/register?aff=WkyKiasW',desc:'全线 IPLC 内网专线，多设备并发支持好，4K 流媒体与 AI 解锁稳定。套餐起步约 ¥25/月 (150GB流量) 或年付小包。'},
  {rank:13,name:'泡芙云',logo:'/assets/recommendations/legacy/paofuyun.svg',tag:'老牌体验',url:'https://www.paofu.cloud/auth/register?code=qC0O',desc:'2018 年起运营的老牌服务商，IEPL/IPLC 专线，适合日常浏览与轻度下载。套餐起步约 ¥19/月 (150GB流量)。'},
  {rank:14,name:'龙猫云',logo:'/assets/recommendations/legacy/longmaoyun.svg',tag:'新手友好',url:'https://inv06.lmaff01.cc/register?aff=PIB8x7dJ',desc:'全 IPLC 专线架构，新手文档齐全，支持解锁主流流媒体与 ChatGPT。套餐起步约 ¥15/月 (100GB流量)。'},
  {rank:15,name:'Flybit',logo:'/assets/recommendations/legacy/flybit.svg',tag:'性价比高',url:'https://www.fastfastfast.buzz/#/register?code=tuAiVVbP',desc:'高性价比 IEPL 专线，提供稳定高速的传输与优秀的流媒体解锁。套餐起步约 ¥12/月 (100GB流量)。'},
  {rank:16,name:'星岛梦',logo:'/assets/recommendations/legacy/xingdaomeng.svg',tag:'品质专线',url:'https://rweqr.xdmttt4.click/#/?code=lSVhHFnY',desc:'IEPL 专线高品质线路，低延迟抗封锁，适合跨境办公、游戏与 4K 影音。套餐起步约 ¥16/月 (100GB流量)。'}
];
const extraProviderCards=extraProviders.map(p=>{
  const rSlug = reviewsData.find(r=>r.rank===p.rank)?.slug || 'ermaoyun';
  return `<article class="extra-provider-card" id="provider-${p.rank}"><div class="extra-rank"><small>推荐排名</small><b>${String(p.rank).padStart(2,'0')}</b></div><div class="extra-mark"><img src="${p.logo}" alt="${p.name} Logo" loading="lazy" width="96" height="96" referrerpolicy="no-referrer"></div><div class="extra-provider-copy"><span>${p.tag}</span><h2>${p.name}</h2><p>${p.desc}</p></div><div class="extra-actions-box"><a class="extra-review-btn" href="/reviews/${rSlug}.html">深度测评 ↗</a><a class="extra-reg-btn" href="${p.url}" target="_blank" rel="nofollow sponsored noopener noreferrer">前往官网注册 →</a></div></article>`;
}).join('');
const airportJumpNav=`<section class="airport-jump-section"><div class="wrap"><div class="airport-jump-box"><div class="jump-box-head"><div class="jump-box-title"><div class="jump-icon">⚡</div><div><h3>指定机场直达导航</h3><span>点击任意机场标签，即刻定位跳转至对应详细信息与套餐</span></div></div><div class="jump-select-wrap"><label for="quickAirportSelect">快速跳转：</label><select id="quickAirportSelect" class="jump-select" onchange="if(this.value){location.hash=this.value;}"><option value="">-- 请选择目标机场 --</option><optgroup label="🔥 专属优惠机场 (1-6)"><option value="#provider-1">01. 闪电鼠 (7折/综合首选)</option><option value="#provider-2">02. 大佬云 (7折/套餐丰富)</option><option value="#provider-3">03. 神行加速 (7折/流量进阶)</option><option value="#provider-4">04. 云界线 (7折/弹性搭配)</option><option value="#provider-5">05. 榴莲云 (7折/大流量优选)</option><option value="#provider-6">06. 环球梯 (7折/场景覆盖)</option></optgroup><optgroup label="✨ 精选推荐机场 (7-16)"><option value="#provider-7">07. 二猫云 (全专线)</option><option value="#provider-8">08. 光速云 (高性价比)</option><option value="#provider-9">09. 边缘节点 (边缘加密)</option><option value="#provider-10">10. 网际快车 (极速协议)</option><option value="#provider-11">11. 大哥云 (老牌口碑)</option><option value="#provider-12">12. 青云梯 (内网专线)</option><option value="#provider-13">13. 泡芙云 (老牌体验)</option><option value="#provider-14">14. 龙猫云 (新手友好)</option><option value="#provider-15">15. Flybit (性价比高)</option><option value="#provider-16">16. 星岛梦 (品质专线)</option></optgroup></select></div></div><div class="jump-grid"><a href="#provider-1" class="jump-chip hot"><span class="chip-num">01</span>闪电鼠</a><a href="#provider-2" class="jump-chip hot"><span class="chip-num">02</span>大佬云</a><a href="#provider-3" class="jump-chip hot"><span class="chip-num">03</span>神行加速</a><a href="#provider-4" class="jump-chip hot"><span class="chip-num">04</span>云界线</a><a href="#provider-5" class="jump-chip hot"><span class="chip-num">05</span>榴莲云</a><a href="#provider-6" class="jump-chip hot"><span class="chip-num">06</span>环球梯</a><a href="#provider-7" class="jump-chip"><span class="chip-num">07</span>二猫云</a><a href="#provider-8" class="jump-chip"><span class="chip-num">08</span>光速云</a><a href="#provider-9" class="jump-chip"><span class="chip-num">09</span>边缘节点</a><a href="#provider-10" class="jump-chip"><span class="chip-num">10</span>网际快车</a><a href="#provider-11" class="jump-chip"><span class="chip-num">11</span>大哥云</a><a href="#provider-12" class="jump-chip"><span class="chip-num">12</span>青云梯</a><a href="#provider-13" class="jump-chip"><span class="chip-num">13</span>泡芙云</a><a href="#provider-14" class="jump-chip"><span class="chip-num">14</span>龙猫云</a><a href="#provider-15" class="jump-chip"><span class="chip-num">15</span>Flybit</a><a href="#provider-16" class="jump-chip"><span class="chip-num">16</span>星岛梦</a></div><div class="jump-review-banner"><div class="jump-review-banner-text"><strong>🔬 16 家推荐机场均已上线独立深度测评档案</strong><span>收录真实成立时间、晚高峰 20:30-22:30 实测数据、节假日避堵拓扑选路图与性价比测评</span></div><a href="/reviews/index.html" class="jump-review-banner-btn">浏览全部测评档案 →</a></div></div></div></section>`;
write('topics/recommend.html',layout({title:'机场推荐与套餐价格｜机场雷达',desc:'机场雷达推荐榜：闪电鼠、大佬云、神行加速、云界线、榴莲云、环球梯、二猫云、光速云、边缘节点、网际快车、大哥云、青云梯、泡芙云、龙猫云、Flybit、星岛梦。',pathName:'/topics/recommend.html',body:`<section class="page-hero recommend-hero"><div class="wrap"><span>RECOMMENDED SERVICES / 16</span><h1>机场推荐</h1><p>按照本站当前推荐顺序展示十六家服务；前六家提供专属优惠码，7-16名已同步整理最新线路特点与价格套餐。</p><div class="recommend-date">资料整理：2026-10-15 · 价格、流量与活动可能调整，最终以商家结算页面为准。</div></div></section>${airportJumpNav}<section class="recommend-intro"><div class="wrap"><div><b>阅读说明</b><h2>先看使用需求，再看套餐价格。</h2></div><div class="recommend-points"><p><strong>01</strong> 前六家已整理套餐与七折码，第7-16名已整理基础套餐与直达入口。</p><p><strong>02</strong> 月付流量与一次性流量不能直接比较，请注意套餐周期。</p><p><strong>03</strong> 建议先短周期体验，并在付款前核对倍率、设备限制和退款规则。</p></div></div></section><section class="provider-section wrap"><div class="provider-heading"><span>CURRENT RANKING</span><h2>十六家推荐机场与套餐</h2><p>前六家展示套餐与专属优惠；第 7 - 16 名展示推荐排名、基础套餐与官网入口。</p></div><div class="provider-list">${providerCards}</div><div class="extra-provider-heading"><span>MORE OPTIONS</span><h2>精选推荐机场 (第 7 - 16 名)</h2><p>以下服务均已搜集整理基础套餐价格与专线特点，点击可前往官网注册。</p></div><div class="extra-provider-list">${extraProviderCards}</div></section><section class="section wrap"><div class="section-head"><div><span>SELECTION NOTES</span><h2>选择机场前先读这些</h2></div></div><div class="grid">${recommended.map(card).join('')}</div></section>`}));
write('alerts.html',layout({title:'机场跑路预警与风险信号｜机场雷达',desc:'基于第三方公开状态库整理的机场服务历史异常记录，并提供来源、日期与风险提示。',pathName:'/alerts.html',body:alertsBodyV2}));
write('deals.html',layout({title:'机场优惠码与优惠活动｜机场雷达',desc:'收录经过官方来源核验、标明有效期和适用范围的机场优惠信息。',pathName:'/deals.html',body:dealsBody}));
write('resources.html',layout({title:'代理工具与网络安全资源栏｜机场雷达',desc:'Shadowrocket、Clash Verge Rev 官方下载以及网络测速、浏览器隐私检查资源。',pathName:'/resources.html',body:resourcesBody}));

reviewsData.forEach(review => {
  write(`reviews/${review.slug}.html`, layout({
    title: `${review.name}深度测评与选路图（成立时间/晚高峰测速）｜机场雷达`,
    desc: `${review.name}独立深度测评报告：成立于${review.founded}，${review.operationalDuration}，线路架构：${review.lineType}。提供晚高峰选路图、节假日避堵策略、实测丢包率与套餐性价比分析。`,
    pathName: `/reviews/${review.slug}.html`,
    body: generateReviewPage(review, reviewsData)
  }));
});

write('reviews/index.html', layout({
  title: '十六家推荐机场独立深度测评与选路图专区｜机场雷达',
  desc: '机场雷达收录的十六家推荐机场全方位深度测评：包含成立时间、晚高峰测速矩阵、节假日避堵拓扑选路图、各档位资费对比与避坑指南。',
  pathName: '/reviews/index.html',
  body: generateReviewIndexPage(reviewsData)
}));

// Build article compat DB for /article and /article.html query routing (?post=slug)
const articleCompatDb = {};
topics.forEach(a => {
  const headingsList = a.customHeadings || headings;
  const sectionParagraphs = a.customArticleHtml ? null : getArticleSections(a);
  const sections = a.customArticleHtml || headings.map((h,i)=>`<section id="s${i}"><h2>${h}</h2>${sectionParagraphs[i].map(x=>`<p>${x}</p>`).join('')}</section>`).join('');
  const related = topics.filter(x=>x.category===a.category&&x.slug!==a.slug).slice(0,3);
  const articleIndex = topics.indexOf(a);
  const partnerIndex = ((articleIndex<0?0:articleIndex)*5+2)%articlePartners.length;
  const partner = articlePartners[partnerIndex];
  const partnerCard = `<aside class="article-partner"><img src="/assets/recommendations/${partner.logo}" alt="${partner.name} Logo" loading="lazy" width="96" height="96"><div><small>本文合作推荐</small><h2>${partner.name}</h2><p>${partner.line}。结算时输入优惠码 <b>${partner.code}</b>，活动规则以推荐页说明为准。</p></div><a href="/topics/recommend.html#provider-${partnerIndex+1}">查看推荐套餐 →</a></aside>`;
  const coverImg = `<figure class="article-cover"><img src="/assets/covers/${a.slug}.svg" alt="文章主题封面" width="1200" height="630"></figure>`;
  const takeawayTitle = a.directAnswer ? 'Direct Answer 核心结论速览' : '先说结论';
  const takeawayText = a.directAnswer || a.points[0];
  const innerHtml = `<div class="article-shell wrap"><article class="article"><div class="crumb"><a href="/index.html">首页</a> / <a href="/articles/index.html">文章</a> / ${categories[a.category].name}</div>${coverImg}<header><span class="pill c-${a.category}">${categories[a.category].name}</span><h1>${a.title}</h1><p class="lead">${a.dek}</p><div class="byline"><span class="avatar">雷</span><span><b>${site.author}</b><small>更新于 ${a.date} · ${a.read} 分钟阅读 · 约1500字</small></span></div></header><div class="takeaway"><b>${takeawayTitle}</b><p>${takeawayText}</p></div>${sections}<div class="notice"><b>合规与安全提醒</b><p>请遵守所在地法律法规、单位网络政策和第三方服务条款。本文只提供一般技术信息，不构成法律意见，也不提供节点或绕过授权的服务。</p></div>${partnerCard}</article><aside class="toc"><b>本文目录</b>${headingsList.map((h,i)=>`<a href="#s${i}">${i+1}. ${h}</a>`).join('')}<div class="aside-box">不确定从哪查？<a href="/faq.html">查看 FAQ →</a></div></aside></div><section class="related wrap"><h2>继续阅读</h2><div class="grid">${related.map(card).join('')}</div></section>`;
  articleCompatDb[a.slug] = {
    slug: a.slug,
    title: a.title,
    dek: a.dek,
    category: a.category,
    html: innerHtml
  };
});

const compatPageBody = `<div id="compatArticleContainer"><section class="page-hero"><div class="wrap"><span>ROUTER COMPATIBILITY ARCHIVE</span><h1>文章专栏总览</h1><p>您正在通过历史兼容路由 /article 访问。全站共收录 ${topics.length} 篇网络与客户端技术专栏，系统支持根据 URL 的 ?post= 标识原地直读并渲染正文，绝不发生任何刷新或循环跳转。</p></div></section><section class="section wrap"><div class="section-head"><div><span>全部文章</span><h2>点击卡片直接阅读</h2></div><a href="/articles/index.html">前往分类筛选专区 →</a></div><div class="grid">${topics.map(card).join('')}</div></section></div><div id="compatFallbackBox" style="display:none;"><section class="page-hero"><div class="wrap"><span>NOTICE / 404</span><h1>未找到指定文章</h1><p class="fallback-msg"></p></div></section><section class="section wrap"><div class="section-head"><div><span>推荐阅读</span><h2>精选文章</h2></div><a href="/articles/index.html">前往分类专区 →</a></div><div class="grid">${topics.slice(0,6).map(card).join('')}</div></section></div><script id="articleCompatDb" type="application/json">${JSON.stringify(articleCompatDb).replace(/</g, '\\u003c')}</script><script>(function(){try{var db=JSON.parse(document.getElementById('articleCompatDb').textContent);var params=new URLSearchParams(window.location.search);var rawPost=params.get('post')||params.get('id')||params.get('slug')||params.get('p');if(!rawPost)return;var post=rawPost.trim().toLowerCase();var match=db[post]||db[rawPost.trim()];if(!match){var keys=Object.keys(db);for(var i=0;i<keys.length;i++){var k=keys[i];if(k.toLowerCase()===post||k.replace(/^[0-9]+[-_]?/,'')===post.replace(/^[0-9]+[-_]?/,'')){match=db[k];break;}}}var container=document.getElementById('compatArticleContainer');if(match&&container){document.title=match.title+'｜机场雷达';var descMeta=document.querySelector('meta[name="description"]');if(descMeta)descMeta.setAttribute('content',match.dek);var canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.setAttribute('href','https://jcleida.com/articles/'+match.slug+'.html');container.innerHTML=match.html;window.scrollTo(0,0);}else if(container){document.title='未找到指定文章｜机场雷达';var fallbackBox=document.getElementById('compatFallbackBox');if(fallbackBox){var msg=fallbackBox.querySelector('.fallback-msg');if(msg)msg.textContent='未查询到 post 参数为 “'+rawPost+'” 的正文内容。请核对参数，或从下方全部文章列表中挑选。';container.innerHTML=fallbackBox.innerHTML;}}}catch(e){console.error('Compat router render error:',e);}})();</script>`;

write('article.html', layout({
  title: '全部文章与技术专栏｜机场雷达',
  desc: '机场雷达技术专栏，支持通过 ?post= 参数原地读取并渲染文章详情，兼容各类历史收录路径。',
  pathName: '/article.html',
  body: compatPageBody
}));

write('article/index.html', layout({
  title: '全部文章与技术专栏｜机场雷达',
  desc: '机场雷达技术专栏，支持通过 ?post= 参数原地读取并渲染文章详情，兼容各类历史收录路径。',
  pathName: '/article/',
  body: compatPageBody
}));

const notFoundBody = `<section class="page-hero" style="padding:100px 0 60px;"><div class="wrap" style="text-align:center;"><span class="hero-badge" style="display:inline-block;margin-bottom:1rem;color:#38bdf8;background:rgba(56,189,248,0.1);padding:4px 12px;border-radius:20px;font-size:0.85rem;border:1px solid rgba(56,189,248,0.2);">404 / PAGE NOT FOUND</span><h1 style="font-size:2.8rem;margin-bottom:1.2rem;color:#f8fafc;">页面信号未检出</h1><p style="max-width:600px;margin:0 auto 2.5rem;color:#94a3b8;line-height:1.7;">您访问的页面链接可能已迁移、已更新或输入有误。雷达系统已为您准备好核心导航通道：</p><div class="actions" style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;"><a class="btn primary" href="/index.html">返回雷达首页</a><a class="btn ghost" href="/articles/index.html">全部 ${topics.length} 篇文章</a><a class="btn ghost" href="/topics/recommend.html">推荐机场榜单</a><a class="btn ghost" href="/faq.html">常见问题 FAQ</a></div></div></section><section class="section wrap"><div class="section-head"><div><span>精选导航</span><h2>热门推荐文章</h2></div><a href="/articles/index.html">全部文章 →</a></div><div class="grid">${topics.slice(0,6).map(card).join('')}</div></section>`;

write('404.html', layout({
  title: '404 页面未找到｜机场雷达',
  desc: '您访问的页面不存在或已被移除，点击返回机场雷达首页。',
  pathName: '/404.html',
  body: notFoundBody
}));

write('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
write('CNAME','jcleida.com\n');
const INDEXNOW_KEY = '81fb9c6ec7be446016909f925e16c21f';
write(`${INDEXNOW_KEY}.txt`, `${INDEXNOW_KEY}\n`);
const redirectGoObserve = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>正在转向雷达推荐观测节点...</title><meta name="description" content="正在安全跳转至机场雷达经过双向路由审计的推荐观测节点与合规技术服务专区。"><meta http-equiv="refresh" content="0; url=/topics/recommend.html#provider-1"><link rel="canonical" href="https://jcleida.com/topics/recommend.html#provider-1"></head><body><p>正在跳转至雷达推荐节点... <a href="/topics/recommend.html#provider-1">点击手动前往</a></p></body></html>`;
write('go/observe.html', redirectGoObserve);
write('go/observe/index.html', redirectGoObserve);

const redirectMethodology = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>测评方法与标准｜机场雷达</title><meta name="description" content="机场雷达测评方法与标准专栏：包含延迟、抖动、丢包、晚高峰测速与双向路由审计标准。"><meta http-equiv="refresh" content="0; url=/topics/test.html"><link rel="canonical" href="https://jcleida.com/topics/test.html"></head><body><p>正在转向测评方法与标准专栏... <a href="/topics/test.html">点击立即前往</a></p></body></html>`;
write('methodology.html', redirectMethodology);
write('methodology/index.html', redirectMethodology);

const redirectSecurity = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>知识与安全专栏｜机场雷达</title><meta name="description" content="机场雷达知识与安全专栏：深入解析订阅安全、DNS防泄漏、WebRTC穿透与现代协议深度。"><meta http-equiv="refresh" content="0; url=/topics/security.html"><link rel="canonical" href="https://jcleida.com/topics/security.html"></head><body><p>正在转向知识与安全专栏... <a href="/topics/security.html">点击立即前往</a></p></body></html>`;
write('security.html', redirectSecurity);
write('security/index.html', redirectSecurity);

const redirectReviews = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>深度测评专区｜机场雷达</title><meta name="description" content="机场雷达十六家推荐机场独立深度测评：晚高峰测速、成立时间、拓扑选路图与性价比测评。"><meta http-equiv="refresh" content="0; url=/reviews/index.html"><link rel="canonical" href="https://jcleida.com/reviews/index.html"></head><body><p>正在转向深度测评专区... <a href="/reviews/index.html">点击立即前往</a></p></body></html>`;
write('reviews.html', redirectReviews);

const reviewPaths = ['/reviews/index.html', ...reviewsData.map(r => `/reviews/${r.slug}.html`)];
const paths=['/','/articles/','/faq.html','/about.html','/alerts.html','/deals.html','/resources.html','/topics/recommend.html',...reviewPaths,...Object.keys(categories).map(k=>`/topics/${k}.html`),...topics.map(a=>`/articles/${a.slug}.html`)];
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p=>`  <url>\n    <loc>${url(p)}</loc>\n    <lastmod>${p.includes('network-route-mtr')||p.includes('subscription-link-privacy')||p.includes('vless-reality')?'2026-11-01':'2026-10-15'}</lastmod>\n  </url>`).join('\n')}\n</urlset>\n`);
const rssTopics = [...topics].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,15);
write('rss.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${site.name}</title><link>${site.url}</link><description>${site.description}</description>${rssTopics.map(a=>`<item><title>${esc(a.title)}</title><link>${url('/articles/'+a.slug+'.html')}</link><guid>${url('/articles/'+a.slug+'.html')}</guid><pubDate>${new Date(a.date+'T08:00:00+08:00').toUTCString()}</pubDate><description>${esc(a.dek)}</description></item>`).join('')}</channel></rss>`);
console.log(`Built ${paths.length} pages in ${out}`);

if (!process.argv.includes('--serve') && !process.env.npm_lifecycle_event && !process.argv.includes('--no-indexnow')) {
  try {
    const { pushToIndexNow, extractUrlsFromSitemap } = await import('./scripts/push-indexnow.mjs');
    const urls = extractUrlsFromSitemap(path.join(out, 'sitemap.xml'));
    await pushToIndexNow(urls);
  } catch (err) {
    console.warn('[IndexNow] Notice:', err.message);
  }
}

if(process.argv.includes('--serve')){http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';let f=path.join(out,p);if(fs.existsSync(f)&&fs.statSync(f).isDirectory()){const idx=path.join(f,'index.html');if(fs.existsSync(idx))f=idx}else if(!fs.existsSync(f)&&fs.existsSync(f+'.html')){f=f+'.html'}if(!f.startsWith(out)||!fs.existsSync(f)){const custom404=path.join(out,'404.html');if(fs.existsSync(custom404)){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});return fs.createReadStream(custom404).pipe(res)}res.writeHead(404);return res.end('404')}res.setHeader('Content-Type',f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.css')?'text/css':f.endsWith('.txt')?'text/plain; charset=utf-8':'application/xml');fs.createReadStream(f).pipe(res)}).listen(4173,()=>console.log('http://localhost:4173'))}


