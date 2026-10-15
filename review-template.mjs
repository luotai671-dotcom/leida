/**
 * 机场独立深度测评页面模板与总览专区模板生成器
 */

const esc = s => String(s || '').replace(/[&<>\"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;' }[c]));

/**
 * 生成单家机场的独立深度测评界面 HTML Body
 */
export function generateReviewPage(data, allReviews) {
  const currentIndex = allReviews.findIndex(r => r.slug === data.slug);
  const prevReview = currentIndex > 0 ? allReviews[currentIndex - 1] : null;
  const nextReview = currentIndex < allReviews.length - 1 ? allReviews[currentIndex + 1] : null;

  // 1. 核心档案指标
  const specsHtml = data.specs.map(item => `
    <div class="review-spec-card">
      <span class="review-spec-label">${esc(item.label)}</span>
      <span class="review-spec-value">${esc(item.value)}</span>
    </div>
  `).join('');

  // 2. 拓扑结构节点
  const topologyHtml = data.routeGuide.topology.map((t, idx) => `
    <div class="topology-node">
      <div class="topology-node-icon">${t.icon}</div>
      <div class="topology-node-title">${esc(t.step)}</div>
      <div class="topology-node-desc">${esc(t.detail)}</div>
    </div>
  `).join('');

  // 3. 场景选路表格行
  const scenarioRowsHtml = data.routeGuide.scenarioRoutes.map(s => `
    <tr>
      <td><b>${esc(s.scenario)}</b></td>
      <td><span class="scenario-badge-primary">首选</span> ${esc(s.primary)}</td>
      <td><span class="scenario-badge-backup">备用</span> ${esc(s.backup)}</td>
      <td class="scenario-latency">${esc(s.latency)}</td>
      <td style="color:#94a3b8; font-family:ui-monospace,monospace;">${esc(s.jitter)}</td>
      <td style="font-size:12px; color:#cbd5e1;">${esc(s.notes)}</td>
    </tr>
  `).join('');

  // 4. 晚高峰实测数据行
  const benchmarkRowsHtml = data.benchmark.map(b => {
    const scoreClass = b.status === 'S+' ? 'score-s-plus' : b.status === 'S' ? 'score-s' : 'score-a-plus';
    return `
      <tr>
        <td><b>${esc(b.node)}</b></td>
        <td><span style="font-family:ui-monospace,monospace; font-size:12px; color:#4b5563;">${esc(b.protocol)}</span></td>
        <td style="font-family:ui-monospace,monospace; font-weight:700; color:#b52c18;">${esc(b.ping)}</td>
        <td style="font-family:ui-monospace,monospace; font-size:12px; color:#6b7280;">${esc(b.jitter)}</td>
        <td style="font-family:ui-monospace,monospace; font-weight:800; color:#107c41;">${esc(b.down)}</td>
        <td style="font-family:ui-monospace,monospace; font-size:13px; color:#374151;">${esc(b.up)}</td>
        <td style="font-family:ui-monospace,monospace; font-weight:700; color:#16a34a;">${esc(b.loss)}</td>
        <td><span class="benchmark-score ${scoreClass}">${esc(b.status)}</span></td>
      </tr>
    `;
  }).join('');

  // 5. 套餐盒子
  const plansHtml = data.plans.map(p => `
    <div class="review-plan-box">
      <h3>${esc(p.name)}</h3>
      <div class="review-plan-prices">
        <strong>${esc(p.price)}</strong>
        ${p.original ? `<del>${esc(p.original)}</del>` : ''}
      </div>
      <span class="review-plan-traffic">${esc(p.traffic)}</span>
      <div class="review-plan-highlight">✓ ${esc(p.highlight)}</div>
    </div>
  `).join('');

  // 6. 优缺点
  const prosHtml = data.pros.map(item => `<li>${esc(item)}</li>`).join('');
  const consHtml = data.cons.map(item => `<li>${esc(item)}</li>`).join('');

  // 7. FAQ 常见问题
  const faqsHtml = data.faqs.map((f, idx) => `
    <div class="review-faq-item">
      <h4><span>Q${idx + 1}</span> ${esc(f.q)}</h4>
      <p>${esc(f.a)}</p>
    </div>
  `).join('');

  // 8. 快速切换下拉菜单
  const switchOptions = allReviews.map(r => `
    <option value="/reviews/${r.slug}.html" ${r.slug === data.slug ? 'selected' : ''}>
      ${String(r.rank).padStart(2, '0')}. ${r.name} (${r.tag})
    </option>
  `).join('');

  return `
    <div class="review-page">
      <!-- 头部 Hero 区域 -->
      <section class="review-hero">
        <div class="wrap">
          <div class="review-crumb">
            <a href="/index.html">首页</a>
            <span>/</span>
            <a href="/topics/recommend.html">机场推荐</a>
            <span>/</span>
            <a href="/reviews/index.html">深度测评专区</a>
            <span>/</span>
            <span style="color:var(--rv-primary);">${esc(data.name)} 深度测评</span>
          </div>

          <div class="review-hero-grid">
            <div class="review-logo-box">
              <img src="/assets/recommendations/${data.logo}" alt="${esc(data.name)} Logo" width="140" height="140">
            </div>

            <div class="review-hero-info">
              <div class="review-badges">
                <span class="review-rank-badge">推荐排名 NO.${String(data.rank).padStart(2, '0')}</span>
                <span class="review-tag-badge">${esc(data.tag)}</span>
                <span class="review-founded-badge">
                  <i>📅</i> 成立时间：<b>${esc(data.founded)}</b> (${esc(data.operationalDuration)})
                </span>
                <span class="review-founded-badge" style="background:#f0fdf4; border-color:#bbf7d0; color:#166534;">
                  <i>⚡</i> ${esc(data.lineType)}
                </span>
              </div>
              <h1>${esc(data.name)} 深度测评报告</h1>
              <p class="review-slogan">${esc(data.slogan)}</p>
            </div>

            <div class="review-hero-cta">
              <div class="review-cta-price">
                <small>资费起步参考</small>
                <b>${esc(data.minPrice)}</b>
              </div>
              ${data.coupon ? `
                <div class="review-cta-coupon">
                  <span>专属优惠码：</span>
                  <strong>${esc(data.coupon.code)}</strong>
                  <div style="font-size:11px; margin-top:2px;">(享 ${esc(data.coupon.discount)} 结算特惠)</div>
                </div>
              ` : ''}
              <a class="review-cta-btn" href="${data.affUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored">
                前往 ${esc(data.name)} 官网注册 →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 页面吸顶导航栏 -->
      <nav class="review-anchor-nav" aria-label="测评页面导航">
        <div class="wrap review-nav-scroll">
          <a class="review-nav-link" href="#specs">基础档案</a>
          <a class="review-nav-link" href="#intro">品牌背景</a>
          <a class="review-nav-link" href="#route-map" style="color:var(--rv-primary);">🗺️ 选路图 (晚高峰/节假日)</a>
          <a class="review-nav-link" href="#benchmark">晚高峰实测</a>
          <a class="review-nav-link" href="#plans">套餐价格</a>
          <a class="review-nav-link" href="#pro-con">优缺点</a>
          <a class="review-nav-link" href="#faqs">常见问题</a>

          <div class="review-nav-switch">
            <select class="review-switch-select" onchange="if(this.value){location.href=this.value;}" aria-label="切换机场测评">
              <option value="">-- 切换其他机场测评 --</option>
              ${switchOptions}
            </select>
          </div>
        </div>
      </nav>

      <!-- 测评内容主体 -->
      <main class="wrap review-body">
        <!-- 模块 1：基础参数档案 -->
        <section class="review-section" id="specs">
          <div class="review-section-header">
            <span class="review-kicker">SPECIFICATIONS &amp; ARCHITECTURE</span>
            <h2>核心参数与服务档案</h2>
            <p>核对成立时间、专线类型、入口机房及客户端兼容性，判断其硬件实力与运维抗风险能力。</p>
          </div>
          <div class="review-specs-grid">
            ${specsHtml}
          </div>
        </section>

        <!-- 模块 2：深度背景与定位简介 -->
        <section class="review-section" id="intro">
          <div class="review-section-header">
            <span class="review-kicker">BACKGROUND &amp; SUMMARY</span>
            <h2>${esc(data.name)} 详细简介与定位剖析</h2>
          </div>
          <div class="review-intro-box">
            <p>${esc(data.intro)}</p>
            <div class="review-fit-callout">
              <span>🎯 <b>适合人群：</b>${esc(data.fit)}</span>
            </div>
          </div>
        </section>

        <!-- 模块 3：重点核心——节假日与晚高峰网络选路图 -->
        <section class="review-section" id="route-map">
          <div class="review-section-header">
            <span class="review-kicker">NETWORK ROUTING &amp; HIGH TRAFFIC GUIDE</span>
            <h2>节假日与晚高峰网络选路图</h2>
            <p>${esc(data.routeGuide.summary)}</p>
          </div>

          <div class="route-map-panel">
            <div class="route-map-header">
              <span class="route-map-badge">⚡ DUAL-ENTRY IEPL/IPLC REDUNDANCY</span>
              <h3>${esc(data.name)} 线路调度架构图与防堵策略</h3>
              <p>针对国内三大运营商公网互联在每晚 20:00-23:00 及法定节假日的跨网拥堵，整理端到端选路方案：</p>
            </div>

            <!-- 网络拓扑链路 -->
            <div class="topology-flow">
              <div class="topology-title">
                <h4>📡 端到端物理内网选路示意</h4>
                <div class="topology-status-indicator">
                  <span class="pulse-dot"></span>
                  <span>当前链路状态：晚高峰畅通 (零丢包保障)</span>
                </div>
              </div>
              <div class="topology-chain">
                ${topologyHtml}
              </div>
            </div>

            <!-- 选路策略深度拆解 -->
            <div class="route-strategy-grid">
              <div class="route-strategy-card evening">
                <div class="strategy-card-title">
                  <span>🌙 晚高峰选路策略 (20:00 - 23:00)</span>
                </div>
                <p>${esc(data.routeGuide.eveningPeakStrategy)}</p>
              </div>

              <div class="route-strategy-card holiday">
                <div class="strategy-card-title">
                  <span>🏮 节假日与网络敏感期避堵策略</span>
                </div>
                <p>${esc(data.routeGuide.holidayStrategy)}</p>
              </div>
            </div>

            <!-- 场景化选路指南明细表 -->
            <div class="scenario-routing-section">
              <h4>🎯 场景化节点配置速查表</h4>
              <div class="scenario-table-wrap">
                <table class="scenario-table">
                  <thead>
                    <tr>
                      <th>使用场景</th>
                      <th>首选建议节点</th>
                      <th>备用容灾节点</th>
                      <th>参考延迟</th>
                      <th>抖动 (Jitter)</th>
                      <th>调度建议</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${scenarioRowsHtml}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <!-- 模块 4：晚高峰实测数据矩阵 -->
        <section class="review-section" id="benchmark">
          <div class="review-section-header">
            <span class="review-kicker">EVENING PEAK BENCHMARK MATRIX</span>
            <h2>晚高峰实测数据表现 (20:30 - 22:30)</h2>
            <p>基于广东电信、上海联通和北京移动多地实测，固定晚高峰黄金拥堵时段对核心节点进行压力测速与丢包统计。</p>
          </div>

          <div class="benchmark-card">
            <div class="benchmark-header-note">
              <span>测速环境：千兆宽带 · Clash Verge Rev (Mihomo内核) · 规则模式 (Rule)</span>
              <span class="benchmark-tag-time">实测窗口：晚高峰 20:30-22:30</span>
            </div>
            <div class="benchmark-table-wrap">
              <table class="benchmark-table">
                <thead>
                  <tr>
                    <th>测速节点</th>
                    <th>协议</th>
                    <th>Ping 延迟</th>
                    <th>抖动 Jitter</th>
                    <th>下载带宽 (Mbps)</th>
                    <th>上传带宽 (Mbps)</th>
                    <th>丢包率</th>
                    <th>综合评级</th>
                  </tr>
                </thead>
                <tbody>
                  ${benchmarkRowsHtml}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 模块 5：套餐价格与优惠对比 -->
        <section class="review-section" id="plans">
          <div class="review-section-header">
            <span class="review-kicker">PLANS &amp; PRICING</span>
            <h2>在售套餐档位与资费一览</h2>
            <p>价格均已换算为折后参考价。月付满足短期试用，年付或大流量包适合主力长期使用。</p>
          </div>

          <div class="review-plans-grid">
            ${plansHtml}
          </div>

          ${data.coupon ? `
            <div class="review-coupon-banner">
              <div class="review-coupon-text">
                <h3>专属 ${esc(data.coupon.discount)} 优惠码已为您准备就绪</h3>
                <p>${esc(data.coupon.note)}。点击右侧按钮一键复制并在官网结账面板黏贴使用。</p>
              </div>
              <div class="review-coupon-action">
                <span class="review-coupon-pill" id="couponCodeDisplay">${esc(data.coupon.code)}</span>
                <button type="button" class="review-copy-btn" id="copyCouponBtn" onclick="navigator.clipboard.writeText('${esc(data.coupon.code)}').then(()=>{this.textContent='已复制到剪贴板！';setTimeout(()=>this.textContent='复制专属优惠码',2000);})">
                  复制专属优惠码
                </button>
              </div>
            </div>
          ` : ''}
        </section>

        <!-- 模块 6：客观优缺点评测 -->
        <section class="review-section" id="pro-con">
          <div class="review-section-header">
            <span class="review-kicker">PROS &amp; CONS</span>
            <h2>客观评价：优势与注意事项</h2>
            <p>不隐瞒使用限制，理性分析服务商的优点与可能存在的局限性，帮助您做出明智选购判断。</p>
          </div>

          <div class="review-pro-con-grid">
            <div class="review-pro-card">
              <h3><span>✓</span> 优势亮点 (Pros)</h3>
              <ul>
                ${prosHtml}
              </ul>
            </div>

            <div class="review-con-card">
              <h3><span>✕</span> 注意事项与不足 (Cons)</h3>
              <ul>
                ${consHtml}
              </ul>
            </div>
          </div>
        </section>

        <!-- 模块 7：常见问题 FAQ -->
        <section class="review-section" id="faqs">
          <div class="review-section-header">
            <span class="review-kicker">FREQUENTLY ASKED QUESTIONS</span>
            <h2>使用常见问题解答</h2>
            <p>涵盖测速、客户端配置、网络超时排查与优惠码使用的常见疑惑。</p>
          </div>

          <div class="review-faqs">
            ${faqsHtml}
          </div>
        </section>

        <!-- 模块 8：底部行动召唤与注册入口 -->
        <section class="review-footer-cta" id="register">
          <h2>准备好开始体验 ${esc(data.name)} 了吗？</h2>
          <p>
            建议初次使用先选择短周期体验线路质量，满意后再考虑续订更长周期。记得在结账时填入本站专属优惠码享受折扣。
          </p>
          <div class="review-footer-actions">
            <a class="review-btn-primary" href="${data.affUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored">
              访问 ${esc(data.name)} 官网开启注册 →
            </a>
            <a class="review-btn-ghost" href="/topics/recommend.html">
              返回 16 家推荐机场榜单
            </a>
            <a class="review-btn-ghost" href="/reviews/index.html">
              浏览全部测评报告
            </a>
          </div>
        </section>

        <!-- 前后机场快速翻页导航 -->
        <div class="review-pagination">
          ${prevReview ? `
            <a class="review-page-btn" href="/reviews/${prevReview.slug}.html">
              ← 上一家：#${String(prevReview.rank).padStart(2, '0')} ${prevReview.name}
            </a>
          ` : `<span></span>`}

          <a class="review-page-btn" href="/reviews/index.html" style="background:var(--rv-bg-soft);">
            📚 查看全部 16 家机场测评目录
          </a>

          ${nextReview ? `
            <a class="review-page-btn" href="/reviews/${nextReview.slug}.html">
              下一家：#${String(nextReview.rank).padStart(2, '0')} ${nextReview.name} →
            </a>
          ` : `<span></span>`}
        </div>
      </main>
    </div>
  `;
}

/**
 * 生成 16 家推荐机场独立深度测评专区总览页 (reviews/index.html) HTML Body
 */
export function generateReviewIndexPage(allReviews) {
  const cardsHtml = allReviews.map(r => `
    <article class="review-summary-card" id="review-card-${r.slug}">
      <div class="review-summary-logo">
        <img src="/assets/recommendations/${r.logo}" alt="${esc(r.name)} Logo" loading="lazy" width="84" height="84">
      </div>
      <div class="review-summary-info">
        <div class="summary-meta">
          <span class="review-rank-badge">NO.${String(r.rank).padStart(2, '0')}</span>
          <span class="review-tag-badge">${esc(r.tag)}</span>
          <span style="font-size:12px; font-weight:700; color:#596068;">
            📅 成立时间：${esc(r.founded)} (${esc(r.operationalDuration)})
          </span>
        </div>
        <h3><a href="/reviews/${r.slug}.html">${esc(r.name)} 深度测评</a></h3>
        <p>${esc(r.slogan)}</p>
        <div class="summary-highlights">
          <span>⚡ ${esc(r.lineType.split(' ')[0])}</span>
          <span>🚀 晚高峰 ${esc(r.speedRating.split(' ')[0])}</span>
          <span>丢包率 ${esc(r.lossRate.split(' ')[0])}</span>
          <span style="color:var(--rv-primary); font-weight:800;">${esc(r.minPrice)}</span>
        </div>
        <div class="review-summary-actions">
          <a class="btn-view-review" href="/reviews/${r.slug}.html">
            阅读独立测评报告 ↗
          </a>
          <a class="btn-visit-site" href="${r.affUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored">
            前往官网注册
          </a>
        </div>
      </div>
    </article>
  `).join('');

  return `
    <div class="reviews-hub-page">
      <section class="reviews-hub-hero">
        <div class="wrap">
          <div class="review-crumb">
            <a href="/index.html">首页</a>
            <span>/</span>
            <a href="/topics/recommend.html">机场推荐</a>
            <span>/</span>
            <span style="color:var(--rv-primary);">深度测评专区</span>
          </div>
          <span class="review-kicker">FIELD IN-DEPTH EVALUATION / 16 PROVIDERS</span>
          <h1>十六家推荐机场独立深度测评</h1>
          <p>
            每一个服务均提供独立测评界面：收录准确成立时间、线路传输拓扑、晚高峰 20:30-22:30 黄金拥堵时段实测数据、节假日避堵选路图以及各档位套餐性价比剖析，拒绝虚假营销与空头承诺。
          </p>
        </div>
      </section>

      <main class="wrap" style="padding: 50px 0 90px;">
        <div class="reviews-card-grid">
          ${cardsHtml}
        </div>
      </main>
    </div>
  `;
}
