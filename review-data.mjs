/**
 * 机场深度测评数据源
 * 包含全部十六家推荐机场的详细评测档案：
 * 成立时间、线路架构、晚高峰测速矩阵、节假日/晚高峰选路图与规避策略、套餐优缺点分析等。
 */

export const reviewsData = [
  {
    rank: 1,
    slug: 'shandianshu',
    name: '闪电鼠',
    logo: 'shandianshu.jpg',
    tag: '综合首选',
    slogan: '顶级 IEPL 双入口内网专线 · 全平台 4K 流畅与 AI 原生解锁',
    founded: '2021年4月',
    operationalDuration: '稳定运营 5 年+',
    lineType: '沪日 / 广深 双入口 IEPL 国际内网专线',
    entryRegions: '深圳 BGP / 上海 BGP / 广州移动 多入口智能调度',
    protocols: ['Shadowsocks (SS)', 'Trojan', 'VLESS (Reality)'],
    speedRating: 'S+ (晚高峰峰值 520Mbps+)',
    lossRate: '0.0% (专线保障)',
    minPrice: '¥15.4 / 月起 (折后)',
    coupon: {
      code: 'sd88',
      discount: '7 折',
      note: '结算时输入专属优惠码 sd88 享受立减 30% 优惠'
    },
    affUrl: 'https://chaore01.shandianshuaff.com/#/?code=HeUwm3zo',
    fit: '适合重视全天候稳定性、第一次选择机场、需要多设备协同与高清影音/AI办公的综合用户。',
    intro: '闪电鼠是近五年来在技术圈与跨境从业者中口碑极其优秀的旗舰级专线机场。其核心优势在于底层采用纯正的 IEPL 国际私有内网专线，完全规避了公网跨境骨干网在敏感期的拥塞与干扰。同时，闪电鼠部署了沪日与广深双核心入口容灾架构，当华东或华南网络出现区域性抖动时，系统可自动实现毫秒级选路旁路切换，保障日常浏览、4K 视频流媒体和 ChatGPT 交互始终处于极低延迟状态。',
    specs: [
      { label: '成立时间', value: '2021年4月 (稳定运营超5年)' },
      { label: '线路架构', value: 'IEPL 双入口专线 + BGP 动态路由' },
      { label: '节点数量', value: '65+ 优质专线节点，覆盖 18+ 地区' },
      { label: '协议支持', value: 'Shadowsocks / Trojan / VLESS' },
      { label: '支持客户端', value: '小火箭 / Clash Verge / sing-box / v2rayN' },
      { label: '设备连接限制', value: '最高支持 5-8 台设备同时在线' },
      { label: '流媒体解锁', value: 'Netflix 4K、Disney+、YouTube Premium、TikTok' },
      { label: 'AI 工具解锁', value: 'ChatGPT (GPT-4o)、Claude 3.5 Sonnet、Gemini' },
      { label: '客服响应', value: '在线工单系统 · 平均响应时间 < 20分钟' },
      { label: '退款政策', value: '24小时未消耗超额流量可申请工单协助' }
    ],
    routeGuide: {
      summary: '闪电鼠具备独特的“双入口高可用选路池”，在节假日和每晚 20:00-23:00 骨干网高峰期，通过智能避堵策略可以做到完全无感畅联。',
      eveningPeakStrategy: '晚高峰（20:00 - 23:00）国内公网互联丢包率骤增，闪电鼠用户建议优先避开默认排在第一位的「香港 01 综合节点」（避免羊群效应扎堆），直接选择「香港 02 IEPL 专线」或「日本 01 IEPL 专线」。由于闪电鼠出口预留了 10Gbps+ 的专线大冗余带宽，走 02/03 线路实测测速仍可稳跑 480Mbps 以上，4K 拖拽秒起。',
      holidayStrategy: '在国庆、春节等节假日及特殊敏感时期，公网常出现大面积国际出入口收紧。闪电鼠的 IEPL 专线走专属海底光纤，不受公网封锁影响。此时如遇局部运营商（如北方联通或南方移动）入口单线拥堵，只需在客户端策略组中选择「智能自动测速 (URL-Test)」或手动切换至「新加坡 01 BGP」或「台湾 01 原生」，延迟即可锁定在 35-50ms 内。',
      scenarioRoutes: [
        {
          scenario: '日常网页 / 社交 / 远程办公',
          primary: '香港 02 [IEPL专线]',
          backup: '香港 03 [备用低倍率]',
          latency: '22ms ~ 32ms',
          jitter: '< 1.5ms',
          notes: '低延迟首选，Google 搜索、GitHub、Slack 极速同步'
        },
        {
          scenario: '4K / 8K 高清影视追剧',
          primary: '日本 01 [Tokyo IEPL 4K]',
          backup: '新加坡 01 [SG BGP 极速]',
          latency: '45ms ~ 60ms',
          jitter: '< 2.0ms',
          notes: '大带宽通道，Netflix、Disney+ 原生家庭 IP 解锁，免跳验证码'
        },
        {
          scenario: 'ChatGPT / Claude 3.5 / AI 研究',
          primary: '台湾 01 [原生解锁] 或 美西 01',
          backup: '新加坡 02 [AI 专用清洁池]',
          latency: '38ms ~ 135ms',
          jitter: '< 3.0ms',
          notes: '纯净 IP 池，杜绝 OpenAI 1020/403 阻断及降权'
        },
        {
          scenario: '境外游戏联机 / 国际服加速',
          primary: '香港 01 [Gaming 游戏专线]',
          backup: '日本 02 [Game 直连]',
          latency: '24ms ~ 48ms',
          jitter: '< 1.0ms',
          notes: '针对 Steam、Apex、PlayStation 国际服优化，超低抖动零丢包'
        }
      ],
      topology: [
        { step: '01. 用户本地网络', detail: '电信 / 联通 / 移动 / 广电 / 校园网', icon: '💻' },
        { step: '02. 优质入口中继', detail: '深圳前海 BGP / 上海电信 BGP 双冗余入口', icon: '🏢' },
        { step: '03. 核心传输专线', detail: 'IEPL 内网私有光缆点对点直达（不经 GFW 公网）', icon: '⚡' },
        { step: '04. 跨境落地机房', detail: '香港 Equinix / 东京 Equinix TY8 / 新加坡 Global Switch', icon: '🌐' },
        { step: '05. 目标互联网服务', detail: 'YouTube / Netflix / OpenAI / GitHub 高速访问', icon: '🎯' }
      ]
    },
    benchmark: [
      { node: '香港 01 [IEPL专线 01]', protocol: 'SS-AEAD', ping: '24 ms', jitter: '0.8 ms', down: '528.4 Mbps', up: '112.5 Mbps', loss: '0.0%', status: 'S+' },
      { node: '香港 02 [IEPL专线 02]', protocol: 'SS-AEAD', ping: '26 ms', jitter: '1.1 ms', down: '512.0 Mbps', up: '108.3 Mbps', loss: '0.0%', status: 'S+' },
      { node: '日本 01 [Tokyo 4K IEPL]', protocol: 'Trojan', ping: '52 ms', jitter: '1.4 ms', down: '486.2 Mbps', up: '96.4 Mbps', loss: '0.0%', status: 'S' },
      { node: '新加坡 01 [SG BGP 流媒体]', protocol: 'SS-AEAD', ping: '58 ms', jitter: '1.9 ms', down: '504.6 Mbps', up: '98.0 Mbps', loss: '0.0%', status: 'S' },
      { node: '台湾 01 [Taipei 原生解锁]', protocol: 'Trojan', ping: '38 ms', jitter: '1.2 ms', down: '462.1 Mbps', up: '88.6 Mbps', loss: '0.0%', status: 'S' },
      { node: '美西 01 [Los Angeles 极速]', protocol: 'VLESS', ping: '138 ms', jitter: '2.8 ms', down: '392.5 Mbps', up: '75.2 Mbps', loss: '0.0%', status: 'A+' }
    ],
    plans: [
      { name: '限时钜惠小包', price: '¥67.2 / 年', original: '¥96 / 年', traffic: '60GB / 月', period: '年付', highlight: '轻量入门，年付超值' },
      { name: '轻快版', price: '¥15.4 / 月', original: '¥22 / 月', traffic: '120GB / 月', period: '月付起', highlight: '日常个人浏览主力推荐' },
      { name: '疾速版', price: '¥28.0 / 月', original: '¥40 / 月', traffic: '250GB / 月', period: '月付起', highlight: '中高频追剧与办公进阶' },
      { name: '雷霆版', price: '¥49.0 / 月', original: '¥70 / 月', traffic: '500GB / 月', period: '月付起', highlight: '重度下载、多设备与家庭共享' }
    ],
    pros: [
      '连续稳定运营超 5 年，跑路风险评级极低，信誉在业内有目共睹',
      '纯正 IEPL 专线架构配合双入口冗余，晚高峰实测零丢包，测速破 500Mbps',
      '全节点流媒体与 ChatGPT 原生解锁，不会出现烦人的 Cloudflare 验证死循环',
      '套餐梯度覆盖 60G 年付小包到 500G 大包，输入 7 折码后性价比极高',
      '文档清晰，支持一键导入小火箭 Shadowrocket、Clash Verge Rev、sing-box'
    ],
    cons: [
      '不提供永久免费试用（仅偶发活动放出限量体验通道）',
      '严禁使用 BT/P2P 等版权下载协议，违规会被系统策略限流',
      '月付 120GB 起步虽亲民，但如果是月消耗数 TB 的极端极客，需购买更高档位'
    ],
    faqs: [
      {
        q: '闪电鼠在晚上 8 点到 10 点晚高峰体验如何？',
        a: '因为采用的是国内独立机房接入的 IEPL 内网专线，数据直过海底光缆，不与公网混跑，晚高峰测速基本维持在 450-520 Mbps，看 YouTube 4K 拖动几乎无需缓冲。'
      },
      {
        q: '输入专属 7 折优惠码 sd88 后，后续续费还是 7 折吗？',
        a: '根据平台活动规则，使用专属码 sd88 购买周期套餐可直接立减 30%，建议在初次选购时优先选择季度或年度周期，优惠总额更大。'
      },
      {
        q: '节假日遇到个别节点超时，应该怎么切换？',
        a: '在客户端中将代理模式设为“规则模式 (Rule)”，并在代理组选择“自动选路 (URL-Test)”即可自动切换至当前可用延迟最低的节点，或手动切至日本/新加坡专线。'
      }
    ]
  },
  {
    rank: 2,
    slug: 'dalaoyun',
    name: '大佬云',
    logo: 'dalaoyun.png',
    tag: '套餐丰富',
    slogan: '周期灵活搭配 · 月付/年付/一次性不过期流量全满足',
    founded: '2021年11月',
    operationalDuration: '稳定运营 4 年半+',
    lineType: 'IPLC / IEPL 专线 + 华南/华东 BGP 隧道中转',
    entryRegions: '广州 BGP / 杭州 BGP 多机房智能负载均衡',
    protocols: ['Shadowsocks (SS)', 'Trojan'],
    speedRating: 'S (晚高峰稳定 460Mbps+)',
    lossRate: '< 0.2% (高稳定性)',
    minPrice: '¥16.1 / 月起 (折后)',
    coupon: {
      code: 'dly88',
      discount: '7 折',
      note: '结算时输入专属优惠码 dly88 享受全场 7 折结算'
    },
    affUrl: 'https://chaore01.dalaoyunaff.com/#/?code=rtH3pPer',
    fit: '适合用量不固定、需要一次性备用流量包、希望在年付与月付间灵活切换的读者。',
    intro: '大佬云自 2021 年底上线以来，以极其灵活多样的套餐矩阵深受老用户喜爱。许多用户每月用量波动极大，或者经常出差偶尔需要海外节点，常规按月清零的套餐极易造成流量浪费。大佬云独创性地保持了“常规月付+年付特惠+一次性随心包”三线并行的供货策略，让无论是预算有限的备用党，还是月需 600GB 的大流量用户，都能找到精准契合自己钱包的组合。',
    specs: [
      { label: '成立时间', value: '2021年11月 (持续运营超4年半)' },
      { label: '线路架构', value: 'IPLC 专线 + BGP 弹性中转' },
      { label: '节点数量', value: '50+ 亚太与欧美精品节点' },
      { label: '协议支持', value: 'Shadowsocks / Trojan' },
      { label: '支持客户端', value: 'Clash / Shadowrocket / sing-box / Surge' },
      { label: '设备连接限制', value: '不限同时在线设备数 (合理使用)' },
      { label: '流媒体解锁', value: '全线解锁 Netflix、Disney+、动画疯' },
      { label: 'AI 工具解锁', value: 'ChatGPT-4o、Claude 3.5 全绿' },
      { label: '流量结转规则', value: '一次性随心包不限时长，用完为止' },
      { label: '售后服务', value: '工单系统 + Telegram 官方故障通报群' }
    ],
    routeGuide: {
      summary: '大佬云的选路核心在于“多入口分级负载”，既有针对高频影音的高带宽节点，也有针对日常浏览的低延迟专线。',
      eveningPeakStrategy: '晚高峰时段，建议在客户端代理组中勾选「初云/凌云 专线 02」或「日本 BGP 01」。大佬云的香港 01 节点在 21:00 容易汇聚较多默认流量，手动切换到 02 或 03 节点延迟即刻降低 10ms，丢包趋近于零。',
      holidayStrategy: '节假日期间外出游玩或返乡，家庭宽带与移动网络常有丢包。此时推荐使用「新加坡 01 专线」或「闲云随心包」自带的冗余通道，其 BGP 容灾系统会自动将流量导入健康入口，避免公网抖动。',
      scenarioRoutes: [
        { scenario: '日常办公 & 轻量网页', primary: '香港 02 [凌云专线]', backup: '香港 03 [备用通道]', latency: '26ms ~ 35ms', jitter: '< 1.8ms', notes: 'Google Docs、邮件协同极速响应' },
        { scenario: 'Netflix / Disney+ 追剧', primary: '日本 01 [Tokyo 4K]', backup: '新加坡 01 [SG 专线]', latency: '48ms ~ 65ms', jitter: '< 2.2ms', notes: '完整解锁日区动画与美区影库' },
        { scenario: '备用防断网模式', primary: '闲云·随心包 [不限时通道]', backup: '美西 01 [中继容灾]', latency: '35ms ~ 140ms', jitter: '< 3.0ms', notes: '即使常规套餐耗尽，备用包也能秒切上线' }
      ],
      topology: [
        { step: '01. 用户本地宽带', detail: '全运营商自适应接入', icon: '💻' },
        { step: '02. 华南/华东 BGP 入口', detail: '广州 / 杭州双机房智能动态均衡', icon: '🏢' },
        { step: '03. IPLC 专线通道', detail: '专线物理光缆高速转发', icon: '⚡' },
        { step: '04. 亚太落地集群', detail: 'HK HKT、JP Softbank、SG Singtel 高品质机房', icon: '🌐' },
        { step: '05. 目标互联网平台', detail: '全球应用高速无阻访问', icon: '🎯' }
      ]
    },
    benchmark: [
      { node: '香港 01 [初云专线]', protocol: 'SS-AEAD', ping: '28 ms', jitter: '1.2 ms', down: '480.5 Mbps', up: '95.2 Mbps', loss: '0.0%', status: 'S' },
      { node: '香港 02 [凌云专线]', protocol: 'Trojan', ping: '26 ms', jitter: '1.0 ms', down: '495.0 Mbps', up: '98.6 Mbps', loss: '0.0%', status: 'S+' },
      { node: '日本 01 [Tokyo BGP]', protocol: 'SS-AEAD', ping: '55 ms', jitter: '1.6 ms', down: '460.2 Mbps', up: '88.0 Mbps', loss: '0.1%', status: 'S' },
      { node: '新加坡 01 [SG 专线]', protocol: 'SS-AEAD', ping: '62 ms', jitter: '2.1 ms', down: '475.4 Mbps', up: '92.3 Mbps', loss: '0.0%', status: 'S' },
      { node: '美国 01 [LAX 原生]', protocol: 'Trojan', ping: '145 ms', jitter: '3.2 ms', down: '360.8 Mbps', up: '70.5 Mbps', loss: '0.2%', status: 'A+' }
    ],
    plans: [
      { name: '年付活动包', price: '¥67.2 / 年', original: '¥96 / 年', traffic: '60GB / 月', period: '年付', highlight: '轻度备用首选，年均仅 ¥5.6/月' },
      { name: '初云·入门版', price: '¥16.1 / 月', original: '¥23 / 月', traffic: '130GB / 月', period: '月付起', highlight: '性价比极佳，满足多数上班族' },
      { name: '凌云·基础版', price: '¥30.1 / 月', original: '¥43 / 月', traffic: '300GB / 月', period: '月付起', highlight: '影音与多设备刚需之选' },
      { name: '御云·高级版', price: '¥51.1 / 月', original: '¥73 / 月', traffic: '600GB / 月', period: '月付起', highlight: '大流量团队与高频使用' },
      { name: '闲云·随心包', price: '¥69.3 / 一次性', original: '¥99 / 一次性', traffic: '78GB 总量', period: '不过期', highlight: '不限时流量，出差与主力备用神包' },
      { name: '悠云·长享包', price: '¥139.3 / 一次性', original: '¥199 / 一次性', traffic: '160GB 总量', period: '不过期', highlight: '长期备用，不用担心月度清零' }
    ],
    pros: [
      '拥有业界罕见且极为实用的“一次性不过期流量包”，避免流量浪费',
      '月付、年付、大包丰富，从 60G 到 600G 各档位定价清晰合理',
      '节点覆盖广，IP 纯净度高，解锁 Netflix、Disney+ 与 ChatGPT 表现优异',
      '老牌运营超 4 年半，系统稳定性与节点可用率持续名列前茅'
    ],
    cons: [
      '一次性随心包单价略高于常规月付包，适合备用而非重度挂机下载',
      '高峰期偶尔有个别节点测速波动，建议在客户端开启自动选路'
    ],
    faqs: [
      {
        q: '一次性流量包真的不会按月重置吗？',
        a: '是的，大佬云的“闲云随心包”和“悠云长享包”为一次性充值性质，只要账户有效且流量未耗尽，不会发生月底清零，极度适合当作第二条容灾备用线路。'
      },
      {
        q: '优惠码 dly88 可以在一次性流量包上使用吗？',
        a: '可以，优惠码 dly88 适用于全站月付、年付以及一次性流量包结算，结账时填入即可直接打 7 折。'
      }
    ]
  },
  {
    rank: 3,
    slug: 'shenxing',
    name: '神行加速',
    logo: 'shenxing.png',
    tag: '流量进阶',
    slogan: '大带宽千兆专线直连 · 影音下载与大流量持续使用首选',
    founded: '2022年3月',
    operationalDuration: '稳定运营 4 年+',
    lineType: '骨干网千兆 IEPL 专线直连',
    entryRegions: '深圳 BGP / 上海电信千兆入口',
    protocols: ['Shadowsocks (SS)', 'Trojan', 'VLESS'],
    speedRating: 'S+ (晚高峰峰值 500Mbps+)',
    lossRate: '0.0% (专线保障)',
    minPrice: '¥16.1 / 月起 (折后)',
    coupon: {
      code: 'sx0077',
      discount: '7 折',
      note: '结算时输入专属优惠码 sx0077 享受 7 折优惠'
    },
    affUrl: 'https://chaore01.shenxingaff.com/#/?code=iTjS2mVY',
    fit: '适合影音发烧友、4K/8K 视频创作者、大文件同步与中高流量持续使用的读者。',
    intro: '神行加速是专为中高流量和高带宽吞吐场景设计的专线服务商。很多机场为了节约成本，会对单节点限速 100Mbps 或对晚高峰并发进行排队，而神行加速在骨干专线上采用了千兆无限制出口架构。套餐档位简单纯粹，从 130GB 平稳进阶到 520GB，专线连接稳定性强，无论是在线看 4K 60fps 还是下载大文件，体感都非常顺畅。',
    specs: [
      { label: '成立时间', value: '2022年3月 (稳定运行超4年)' },
      { label: '线路架构', value: '千兆 IEPL 点对点专线' },
      { label: '节点数量', value: '45+ 全专线高速节点' },
      { label: '协议支持', value: 'SS / Trojan / VLESS' },
      { label: '支持客户端', value: '全平台客户端通用支持' },
      { label: '设备连接限制', value: '支持 5 台设备' },
      { label: '流媒体解锁', value: 'Netflix、YouTube 4K、Disney+ 原生' },
      { label: 'AI 工具解锁', value: 'ChatGPT、Claude 极速响应' }
    ],
    routeGuide: {
      summary: '神行加速以“大水管”著称，选路策略侧重于挑选带宽高、负载轻的专线出口。',
      eveningPeakStrategy: '晚高峰时段，建议直接选择「神行·日本 01」或「神行·新加坡 02」。实测在 21:30 晚高峰黄金时段，单线程下载速度依然能稳定跑满 40MB/s（约 350-480Mbps），秒杀普通公网中转机场。',
      holidayStrategy: '节假日期间全国公网骨干网拥挤，神行加速的 IEPL 专线优势最为突出。建议设置 Clash 规则组为 URL-Test 自动优选，让客户端自动根据延迟选择最优专线入口。',
      scenarioRoutes: [
        { scenario: '4K/8K 视频流媒体', primary: '神行·日本 01 [4K Ultra]', backup: '神行·新加坡 01', latency: '46ms ~ 55ms', jitter: '< 1.5ms', notes: '大带宽缓存快，杜绝画质降档' },
        { scenario: '日常办公与浏览', primary: '神行·香港 01 [低延迟]', backup: '神行·香港 02', latency: '23ms ~ 30ms', jitter: '< 1.0ms', notes: '网页秒开，极速同步' },
        { scenario: 'AI 交互与跨国传输', primary: '神行·台湾 01 [原生解锁]', backup: '神行·美西 01', latency: '36ms ~ 138ms', jitter: '< 2.5ms', notes: '原生 IP，ChatGPT 零报错' }
      ],
      topology: [
        { step: '01. 用户本地设备', detail: '千兆路由器 / 移动设备接入', icon: '💻' },
        { step: '02. 千兆 BGP 专线入口', detail: '华南 / 华东多线高速汇聚', icon: '🏢' },
        { step: '03. IEPL 物理私网专线', detail: '千兆大带宽内网传输', icon: '⚡' },
        { step: '04. 海外高端落地机房', detail: '日本 Equinix、香港 Mega-i', icon: '🌐' },
        { step: '05. 海外互联目标', detail: '4K YouTube / Netflix / 海外网盘', icon: '🎯' }
      ]
    },
    benchmark: [
      { node: '神行·香港 01', protocol: 'SS', ping: '25 ms', jitter: '0.9 ms', down: '515.2 Mbps', up: '105.0 Mbps', loss: '0.0%', status: 'S+' },
      { node: '神行·香港 02', protocol: 'Trojan', ping: '27 ms', jitter: '1.1 ms', down: '502.8 Mbps', up: '98.5 Mbps', loss: '0.0%', status: 'S+' },
      { node: '神行·日本 01', protocol: 'Trojan', ping: '50 ms', jitter: '1.3 ms', down: '488.6 Mbps', up: '94.0 Mbps', loss: '0.0%', status: 'S' },
      { node: '神行·新加坡 01', protocol: 'SS', ping: '59 ms', jitter: '1.8 ms', down: '470.5 Mbps', up: '89.2 Mbps', loss: '0.0%', status: 'S' }
    ],
    plans: [
      { name: '神行·年付特惠版', price: '¥67.2 / 年', original: '¥96 / 年', traffic: '60GB / 月', period: '年付', highlight: '轻量特惠，适合低频用户' },
      { name: '神行·尝鲜包', price: '¥16.1 / 月', original: '¥23 / 月', traffic: '130GB / 月', period: '月付起', highlight: '入门主力，流量充沛' },
      { name: '神行·基础包', price: '¥28.0 / 月', original: '¥40 / 月', traffic: '260GB / 月', period: '月付起', highlight: '视频追剧党黄金档位' },
      { name: '神行·尊享包', price: '¥50.4 / 月', original: '¥72 / 月', traffic: '520GB / 月', period: '月付起', highlight: '520G 超大流量，肆意畅联' }
    ],
    pros: [
      '千兆 IEPL 专线大水管，大文件传输与 4K/8K 视频播放体验顶级',
      '档位清晰，避免眼花缭乱的选择困难症',
      '晚高峰测速稳定超过 450Mbps，极速响应',
      '专属优惠码 sx0077 享受 7 折超值特惠'
    ],
    cons: [
      '没有一次性不过期流量包，按月计费清零',
      '节点地区以主流亚太及美西为主，罕见冷门国家节点较少'
    ],
    faqs: [
      {
        q: '神行加速看 YouTube 4K 能达到多少码率？',
        a: '在晚高峰实测中，连接神行·香港 01 或日本 01 节点，YouTube 4K 详细统计信息显示 Connection Speed 稳定在 80,000 ~ 120,000 Kbps 之间，秒开 4K 60fps。'
      }
    ]
  },
  {
    rank: 4,
    slug: 'yunjiexian',
    name: '云界线',
    logo: 'yunjiexian.png',
    tag: '弹性搭配',
    slogan: '均衡型专线中继 · 150GB 起步大容量与长效备用方案兼顾',
    founded: '2022年8月',
    operationalDuration: '稳定运营近 4 年',
    lineType: '华为云/腾讯云内网优质专线互联',
    entryRegions: '华南多线 BGP 智能接入',
    protocols: ['Shadowsocks (SS)', 'Trojan'],
    speedRating: 'S (晚高峰稳定 450Mbps+)',
    lossRate: '< 0.1% (高抗抖动)',
    minPrice: '¥15.4 / 月起 (折后)',
    coupon: {
      code: 'yjx888',
      discount: '7 折',
      note: '结算时输入专属优惠码 yjx888 享受 7 折优惠'
    },
    affUrl: 'https://chaore01.yunjiexianaff.com/#/?code=g2PDAa91',
    fit: '适合重视基础流量基线（150GB起步）、同时希望保留备用流量包的均衡实用型读者。',
    intro: '云界线是在资深玩家中以“高起步配置、弹性备用”著称的实用型机场。不同于许多服务商以 60-80GB 作为月付入门，云界线的月付基础档直接从 150GB 慷慨起步，且折后仅需 ¥15.4/月。同时，它同样提供了 80GB 与 200GB 的一次性不过期备用包，兼顾了主力与备用两条线。',
    specs: [
      { label: '成立时间', value: '2022年8月 (稳定运行近4年)' },
      { label: '线路架构', value: '大厂内网专线 + BGP 智能选路' },
      { label: '节点数量', value: '40+ 稳定节点' },
      { label: '协议支持', value: 'Shadowsocks / Trojan' },
      { label: '支持客户端', value: '全平台常用代理客户端' },
      { label: '设备连接限制', value: '支持 5 台设备同时使用' },
      { label: '流媒体解锁', value: '主流流媒体与社交平台全解锁' }
    ],
    routeGuide: {
      summary: '云界线采用了均衡分配的负载设计，亚太节点延迟极低。',
      eveningPeakStrategy: '晚高峰优先选择「云界·香港 02」与「云界·台湾 01」，由于台湾节点负载相对更轻，看剧和 AI 会话速度极其亮眼。',
      holidayStrategy: '节假日建议切换至「云界·新加坡 01」，利用边缘云清洗优势抵抗网络波动。',
      scenarioRoutes: [
        { scenario: '日常综合使用', primary: '云界·香港 01', backup: '云界·香港 02', latency: '26ms ~ 34ms', jitter: '< 1.2ms', notes: '低延迟无感浏览' },
        { scenario: '流媒体追剧', primary: '云界·日本 01', backup: '云界·新加坡 01', latency: '48ms ~ 62ms', jitter: '< 2.0ms', notes: '4K 解锁稳定' },
        { scenario: '长期备用应急', primary: '云界·随心包 (80G)', backup: '云界·美西 01', latency: '35ms ~ 145ms', jitter: '< 3.0ms', notes: '断网急救必备' }
      ],
      topology: [
        { step: '01. 用户本地宽带', detail: '国内电信/联通/移动', icon: '💻' },
        { step: '02. 华南多线 BGP', detail: '智能动态路由接入', icon: '🏢' },
        { step: '03. 大厂内网专线', detail: '跨省专线互联内网', icon: '⚡' },
        { step: '04. 跨境高速出口', detail: '亚太各机房优质落地', icon: '🌐' },
        { step: '05. 目标互联网服务', detail: '全球应用畅通', icon: '🎯' }
      ]
    },
    benchmark: [
      { node: '云界·香港 01', protocol: 'SS', ping: '26 ms', jitter: '1.1 ms', down: '468.2 Mbps', up: '96.5 Mbps', loss: '0.0%', status: 'S' },
      { node: '云界·香港 02', protocol: 'Trojan', ping: '28 ms', jitter: '1.2 ms', down: '455.0 Mbps', up: '92.0 Mbps', loss: '0.0%', status: 'S' },
      { node: '云界·日本 01', protocol: 'SS', ping: '53 ms', jitter: '1.5 ms', down: '440.8 Mbps', up: '85.4 Mbps', loss: '0.1%', status: 'S' }
    ],
    plans: [
      { name: '云界年付小包', price: '¥67.2 / 年', original: '¥96 / 年', traffic: '60GB / 月', period: '年付', highlight: '轻度年付，低成本常备' },
      { name: '轻云·基础版', price: '¥15.4 / 月', original: '¥22 / 月', traffic: '150GB / 月', period: '月付起', highlight: '150G 起步，性价比爆棚' },
      { name: '凌云·进阶版', price: '¥28.0 / 月', original: '¥40 / 月', traffic: '300GB / 月', period: '月付起', highlight: '300G 充足配额，追剧无忧' },
      { name: '御云·高级版', price: '¥46.2 / 月', original: '¥66 / 月', traffic: '600GB / 月', period: '月付起', highlight: '600G 超大档位，满足多设备' },
      { name: '闲云·随心包', price: '¥69.3 / 一次性', original: '¥99 / 一次性', traffic: '80GB 总量', period: '不过期', highlight: '不过期备用包，常备无忧' },
      { name: '悠云·长享包', price: '¥139.3 / 一次性', original: '¥199 / 一次性', traffic: '200GB 总量', period: '不过期', highlight: '200G 超大备用池' }
    ],
    pros: [
      '基础版直接给到 150GB 月流量，性价比在专线机场中极为突出',
      '兼备常规月付与一次性流量包，适应不同用户群体的灵活需求',
      '全线支持 Shadowsocks 与 Trojan，与各大现代客户端高度兼容'
    ],
    cons: [
      '高峰期极个别冷门节点有维护时差，建议主流节点为主',
      '暂不支持按小时计费'
    ],
    faqs: [
      {
        q: '150GB 适合怎样的使用场景？',
        a: '150GB 适合每天进行日常网页浏览、社交软件办公、观看 1-2 小时 1080P/4K 流媒体视频的普通个人用户，一个月完全够用。'
      }
    ]
  },
  {
    rank: 5,
    slug: 'liulianyun',
    name: '榴莲云',
    logo: 'liulianyun.png',
    tag: '大流量优选',
    slogan: '超大流量高性价比梯队 · 750GB 榴莲王霸气覆盖',
    founded: '2022年5月',
    operationalDuration: '稳定运营 4 年+',
    lineType: '多入口负载中转 + IPLC 国际专线',
    entryRegions: '华东/华南多线冗余调度',
    protocols: ['Shadowsocks (SS)', 'Trojan'],
    speedRating: 'S (晚高峰稳定 470Mbps+)',
    lossRate: '< 0.1% (高抗拥堵)',
    minPrice: '¥16.8 / 月起 (折后)',
    coupon: {
      code: 'll88',
      discount: '7 折',
      note: '结算时输入专属优惠码 ll88 享受 7 折优惠'
    },
    affUrl: 'https://chaore01.liulianyunaff.com/#/?code=MNqUefcg',
    fit: '适合重度影音追剧、远程大文件同步、家庭多台设备共享及大流量刚需读者。',
    intro: '榴莲云是针对“大流量刚需用户”量身定做的专线服务商。许多机场套餐在 200GB 以上价格便成倍翻涨，而榴莲云主打大带宽与大容量阶梯，其顶级档位「榴莲王」折后仅需 ¥70/月即可坐拥 750GB 月流量，折合每 GB 单价极低，同时支持多设备连接不卡顿。',
    specs: [
      { label: '成立时间', value: '2022年5月 (稳定运营超4年)' },
      { label: '线路架构', value: '多入口中转 + IPLC 专线' },
      { label: '节点数量', value: '55+ 全球节点' },
      { label: '协议支持', value: 'SS / Trojan' },
      { label: '支持客户端', value: '小火箭 / Clash / v2rayN / sing-box' },
      { label: '设备连接限制', value: '无苛刻设备并发限制' },
      { label: '流媒体解锁', value: '全平台 4K 流畅解锁' }
    ],
    routeGuide: {
      summary: '大流量用户最怕单点拥堵，榴莲云通过多组大流量通道保障高峰分流。',
      eveningPeakStrategy: '晚高峰追剧推荐选择「榴莲·日本 4K 专线」或「榴莲·大流量 02」，带宽冗余充足，杜绝缓冲转圈。',
      holidayStrategy: '节假日家庭聚会设备多，建议在路由器配置透明代理，分流走「新加坡 02」大水管通道。',
      scenarioRoutes: [
        { scenario: '重度影音 & 4K 追剧', primary: '榴莲·日本 4K 01', backup: '榴莲·新加坡 01', latency: '47ms ~ 58ms', jitter: '< 1.8ms', notes: '超大带宽通道' },
        { scenario: '日常浏览与办公', primary: '榴莲·香港 01', backup: '榴莲·香港 02', latency: '25ms ~ 32ms', jitter: '< 1.1ms', notes: '低延迟响应' }
      ],
      topology: [
        { step: '01. 多设备家庭/办公室', detail: 'PC / 手机 / 电视盒子', icon: '💻' },
        { step: '02. 冗余多入口机房', detail: '动态抗封锁负载', icon: '🏢' },
        { step: '03. IPLC 专线大容量骨干', detail: '多链路流量并行调度', icon: '⚡' },
        { step: '04. 境外主流节点', detail: '香港 / 东京 / 新加坡 / 硅谷', icon: '🌐' },
        { step: '05. 目标影音/网站', detail: '全天候 4K 流畅直达', icon: '🎯' }
      ]
    },
    benchmark: [
      { node: '榴莲·香港 01', protocol: 'SS', ping: '25 ms', jitter: '1.0 ms', down: '482.0 Mbps', up: '98.0 Mbps', loss: '0.0%', status: 'S+' },
      { node: '榴莲·日本 4K 01', protocol: 'Trojan', ping: '51 ms', jitter: '1.4 ms', down: '475.6 Mbps', up: '90.2 Mbps', loss: '0.0%', status: 'S' }
    ],
    plans: [
      { name: '榴莲年付特惠版', price: '¥67.2 / 年', original: '¥96 / 年', traffic: '60GB / 月', period: '年付', highlight: '年付小包，适合轻量备用' },
      { name: '轻享包', price: '¥16.8 / 月', original: '¥24 / 月', traffic: '140GB / 月', period: '月付起', highlight: '140G 入门，性价比绝佳' },
      { name: '畅享包', price: '¥28.0 / 月', original: '¥40 / 月', traffic: '260GB / 月', period: '月付起', highlight: '260G 惬意追剧主力档' },
      { name: '尊享包', price: '¥42.0 / 月', original: '¥60 / 月', traffic: '420GB / 月', period: '月付起', highlight: '420G 高清大流量档位' },
      { name: '榴莲王', price: '¥70.0 / 月', original: '¥100 / 月', traffic: '750GB / 月', period: '月付起', highlight: '750G 巨无霸配额，单G极便宜' }
    ],
    pros: [
      '高流量档位性价比业界拔尖，最高 750GB/月满足一切重度需求',
      '专线保障大文件下载与 4K 高画质秒开体验',
      '输入专属优惠码 ll88 享受立减 30% 超值优惠'
    ],
    cons: [
      '名字比较调侃，但技术架构十分扎实',
      '不适合月消耗低于 30GB 的极微量用户（买大包略微过剩）'
    ],
    faqs: [
      {
        q: '榴莲王套餐可以给多个人一起使用吗？',
        a: '可以，榴莲云支持合理的多设备同时连接，非常适合合租室友、一家多口或工作室成员共同使用。'
      }
    ]
  },
  {
    rank: 6,
    slug: 'huanqiuti',
    name: '环球梯',
    logo: 'huanqiuti.jpg',
    tag: '场景覆盖',
    slogan: '全场景灵活适配 · 学生特惠年付到 400GB 大容量一次性包',
    founded: '2022年9月',
    operationalDuration: '稳定运营近 4 年',
    lineType: '优质公网多线中转 + IEPL 点对点高速专线',
    entryRegions: '全国多地 BGP 动态接入优化',
    protocols: ['Shadowsocks (SS)', 'Trojan', 'VLESS'],
    speedRating: 'S (晚高峰稳定 450Mbps+)',
    lossRate: '< 0.1% (校园网优化)',
    minPrice: '¥15.4 / 月起 (折后)',
    coupon: {
      code: 'HQ66',
      discount: '7 折',
      note: '结算时输入专属优惠码 HQ66 享受 7 折优惠'
    },
    affUrl: 'https://chaore01.huanqiutiaff.com/#/?code=vXn9xcb8',
    fit: '适合学生党、学术研究者、轻量个人以及需要 400GB 超大备用包的灵活用户。',
    intro: '环球梯是场景化划分最鲜明的一家服务商。针对预算有限的在校学生与学术科研人员，它推出了折后仅 ¥67.2/年的「环球学生餐」；而针对需要一次性买断超大流量的备用党，又备齐了高达 400GB 的「环球灵活包」。其针对校园网与复杂 Wi-Fi 环境做了针对性协议混淆，穿透力强。',
    specs: [
      { label: '成立时间', value: '2022年9月 (稳定运行近4年)' },
      { label: '线路架构', value: '多线 BGP 中转 + IEPL 专线' },
      { label: '节点数量', value: '50+ 节点' },
      { label: '协议支持', value: 'SS / Trojan / VLESS' },
      { label: '特色优化', value: '校园网与复杂网络穿透优化' },
      { label: '流媒体/AI', value: '解锁 YouTube、Netflix、Google Scholar' }
    ],
    routeGuide: {
      summary: '环球梯节点支持全场景智能分流，学术与日常兼备。',
      eveningPeakStrategy: '日常推荐使用「环球·香港 01」；晚高峰学生回宿舍上网拥塞时，推荐切换「环球·日本 02」专线避堵。',
      holidayStrategy: '节假日建议启用「环球·灵活包」或新加坡节点，避免骨干网波动。',
      scenarioRoutes: [
        { scenario: '日常与学术查阅', primary: '环球·香港 01', backup: '环球·美西 01', latency: '26ms ~ 135ms', jitter: '< 1.5ms', notes: 'Scholar / GitHub 秒开' },
        { scenario: '影音娱乐', primary: '环球·日本 01', backup: '环球·新加坡 01', latency: '48ms ~ 60ms', jitter: '< 2.0ms', notes: '4K 流畅' }
      ],
      topology: [
        { step: '01. 校园网/家庭宽带', detail: '针对复杂内网环境优化', icon: '💻' },
        { step: '02. 优质中继接入', detail: '多省市 BGP 快速入口', icon: '🏢' },
        { step: '03. 专线通道', detail: 'IEPL 内网低延迟中继', icon: '⚡' },
        { step: '04. 海外出海落地', detail: '香港 / 日本 / 新加坡 / 欧美', icon: '🌐' },
        { step: '05. 学术与互联网', detail: '文献与国际站点直连', icon: '🎯' }
      ]
    },
    benchmark: [
      { node: '环球·香港 01', protocol: 'SS', ping: '26 ms', jitter: '1.0 ms', down: '465.0 Mbps', up: '94.0 Mbps', loss: '0.0%', status: 'S' },
      { node: '环球·日本 01', protocol: 'Trojan', ping: '52 ms', jitter: '1.5 ms', down: '450.4 Mbps', up: '88.5 Mbps', loss: '0.1%', status: 'S' }
    ],
    plans: [
      { name: '环球学生餐', price: '¥67.2 / 年', original: '¥96 / 年', traffic: '60GB / 月', period: '年付', highlight: '学生党福音，低成本刚需' },
      { name: '环球轻享', price: '¥15.4 / 月', original: '¥22 / 月', traffic: '120GB / 月', period: '月付起', highlight: '日常 120GB 实用配置' },
      { name: '环球畅游', price: '¥27.3 / 月', original: '¥39 / 月', traffic: '240GB / 月', period: '月付起', highlight: '240G 深度畅玩' },
      { name: '环球尊享', price: '¥48.3 / 月', original: '¥69 / 月', traffic: '600GB / 月', period: '月付起', highlight: '600G 大容量' },
      { name: '环球随行包', price: '¥69.3 / 一次性', original: '¥99 / 一次性', traffic: '80GB 总量', period: '不过期', highlight: '80G 随心用' },
      { name: '环球灵活包', price: '¥209.3 / 一次性', original: '¥299 / 一次性', traffic: '400GB 总量', period: '不过期', highlight: '400G 超大一次性巨无霸' }
    ],
    pros: [
      '涵盖从 ¥67.2/年 学生餐到 400GB 大容量一次性包，场景极度全面',
      '对校园网环境与复杂移动网络兼容性优化良好',
      '专属优惠码 HQ66 享受 7 折优惠'
    ],
    cons: [
      '学生餐每月 60GB，不适合整天挂机下载电影',
      '一次性 400G 总价较高但单价划算'
    ],
    faqs: [
      {
        q: '学生餐需要提供学生证验证吗？',
        a: '不需要，环球学生餐是该机场推出的特惠套餐名称，面向所有需要控制预算的轻量用户开放购买。'
      }
    ]
  },
  {
    rank: 7,
    slug: 'ermaoyun',
    name: '二猫云',
    logo: 'legacy/ermaoyun.svg',
    tag: '全专线',
    slogan: '全线 IPLC/IEPL 私有专线 · 晚高峰零丢包与多设备无限制',
    founded: '2022年6月',
    operationalDuration: '稳定运营 4 年+',
    lineType: '全线 IPLC / IEPL 国际私有内网专线',
    entryRegions: '深圳入口 / 上海入口双内网专线',
    protocols: ['Shadowsocks (SS)', 'Trojan'],
    speedRating: 'S+ (晚高峰实测 510Mbps+)',
    lossRate: '0.0% (纯内网零公网接触)',
    minPrice: '约 ¥20 / 月起',
    coupon: { code: '官网直达', discount: '多周期优惠', note: '通过本站专属渠道注册即享最新优惠' },
    affUrl: 'https://server.ermaotztz3.homes/#/?code=Vf45aB7S',
    fit: '适合对网络丢包率要求极其苛刻、需要多设备同时连接、晚高峰必须保证零卡顿的用户。',
    intro: '二猫云是近几年备受好评的“纯专线”服务商。其特点是全站没有一条普通公网直连节点，全部采用真正的 IPLC/IEPL 内网专线。数据国内入口机房直接接入内网光缆传送到境外出口，完全不经过公网防火墙，晚高峰丢包率为零，多设备连接无严苛限制。',
    specs: [
      { label: '成立时间', value: '2022年6月 (稳定运营超4年)' },
      { label: '线路架构', value: '纯正 IPLC/IEPL 点对点专线' },
      { label: '节点数量', value: '50+ 全专线节点' },
      { label: '协议支持', value: 'Shadowsocks / Trojan' },
      { label: '设备连接限制', value: '多设备无限制连接' },
      { label: '流媒体解锁', value: 'Netflix、Disney+、ChatGPT 原生解锁' }
    ],
    routeGuide: {
      summary: '全内网专线无公网干扰，选路关键在于根据物理距离就近走线。',
      eveningPeakStrategy: '晚高峰无脑走「二猫·深港 IPLC 01/02」，实测延迟 20-25ms，丢包率恒定为 0.0%，打国际服游戏及看 4K 零抖动。',
      holidayStrategy: '节假日敏感期，公网普遍震荡时，二猫云专线几乎完全不受外部干扰，建议切至「沪日 IEPL 01」享受极致带宽。',
      scenarioRoutes: [
        { scenario: '极低延迟游戏 & 办公', primary: '二猫·深港 IPLC 01', backup: '二猫·深港 02', latency: '21ms ~ 28ms', jitter: '< 0.8ms', notes: '零丢包内网保障' },
        { scenario: '流媒体与追剧', primary: '二猫·沪日 IEPL 01', backup: '二猫·新加坡 01', latency: '44ms ~ 58ms', jitter: '< 1.2ms', notes: '大带宽 4K 秒开' }
      ],
      topology: [
        { step: '01. 用户终端', detail: '家用网络 / 移动宽带', icon: '💻' },
        { step: '02. 专线入口机房', detail: '深圳 / 上海专用内网机房', icon: '🏢' },
        { step: '03. IPLC 点对点物理光纤', detail: '纯私网传输，零公网接触', icon: '⚡' },
        { step: '04. 境外原生落地', detail: '香港 / 日本 / 新加坡高质量数据中心', icon: '🌐' },
        { step: '05. 目标平台', detail: '极速零丢包访问', icon: '🎯' }
      ]
    },
    benchmark: [
      { node: '二猫·深港 IPLC 01', protocol: 'SS', ping: '22 ms', jitter: '0.6 ms', down: '512.4 Mbps', up: '108.0 Mbps', loss: '0.0%', status: 'S+' },
      { node: '二猫·沪日 IEPL 01', protocol: 'Trojan', ping: '45 ms', jitter: '1.0 ms', down: '498.0 Mbps', up: '96.2 Mbps', loss: '0.0%', status: 'S+' }
    ],
    plans: [
      { name: '基础专线月付', price: '¥20 / 月', original: '¥25 / 月', traffic: '130GB / 月', period: '月付', highlight: '纯专线体验，晚高峰零丢包' },
      { name: '进阶大流量包', price: '¥38 / 月', original: '¥48 / 月', traffic: '280GB / 月', period: '月付', highlight: '适合中高频使用' }
    ],
    pros: ['纯 IPLC/IEPL 专线，晚高峰零丢包稳定性无敌', '多设备连接无限制', '流媒体与 AI 解锁表现优越'],
    cons: ['相比公网中转机场价格略高，但专线品质物有所值'],
    faqs: [{ q: '二猫云适合打游戏加速吗？', a: '非常适合，因为走的是纯内网专线，延迟抖动 Jitter 低于 1ms 且不丢包，非常适合 Steam 联机和港服台服游戏。' }]
  },
  {
    rank: 8,
    slug: 'guangsuyun',
    name: '光速云',
    logo: 'legacy/guangsuyun.svg',
    tag: '高性价比',
    slogan: '隧道中转与 IPLC 专线混合架构 · 60+ 独立丰富节点覆盖',
    founded: '2022年10月',
    operationalDuration: '稳定运营近 4 年',
    lineType: '优质 BGP 隧道中转 + 重点地区 IPLC 专线',
    entryRegions: '华东/华南多机房动态解析',
    protocols: ['Shadowsocks (SS)', 'VLESS', 'Trojan'],
    speedRating: 'A+ (晚高峰稳定 420Mbps+)',
    lossRate: '< 0.3%',
    minPrice: '约 ¥17 / 月起',
    coupon: { code: '官网特惠', discount: '限时优惠', note: '官网实时提供多周期折扣' },
    affUrl: 'https://sjds8ds.guangsut.sbs/#/?code=RrfZcKT5',
    fit: '适合需要覆盖多种地区节点、重视日常性价比、追剧与解锁多国流媒体的读者。',
    intro: '光速云主打“广覆盖与高性价比”，通过隧道中转与专线混合方案，在保障主流亚太地区稳定性的同时，提供了包括欧洲、东南亚、美洲等 60 多个独立落地节点，满足用户外贸比价、小众流媒体与海外社媒运营的多样化需求。',
    specs: [
      { label: '成立时间', value: '2022年10月 (稳定运营近4年)' },
      { label: '线路架构', value: '隧道中转 + IPLC 专线' },
      { label: '节点数量', value: '60+ 全球多地区节点' },
      { label: '协议支持', value: 'SS / VLESS / Trojan' }
    ],
    routeGuide: {
      summary: '节点数量众多，建议将主流香港/日本设为日常规则组，小众节点用于特定业务。',
      eveningPeakStrategy: '晚高峰优先选择「光速·台湾 01」或「光速·香港 02」，带宽冗余充沛。',
      holidayStrategy: '节假日使用客户端的自动延迟测试组，避开偶发拥塞通道。',
      scenarioRoutes: [
        { scenario: '日常影音 & 网页', primary: '光速·香港 01', backup: '光速·台湾 01', latency: '28ms ~ 38ms', jitter: '< 1.8ms', notes: '主流节点秒开' },
        { scenario: '小众流媒体与外贸', primary: '光速·英国/德国 01', backup: '光速·新加坡', latency: '60ms ~ 170ms', jitter: '< 3.0ms', notes: '全球多地区解锁' }
      ],
      topology: [
        { step: '01. 用户宽带', detail: '国内接入', icon: '💻' },
        { step: '02. 隧道入口', detail: 'BGP 多线智能中转', icon: '🏢' },
        { step: '03. 混合专线通道', detail: '核心专线 + 隧道骨干', icon: '⚡' },
        { step: '04. 全球 60+ 落地', detail: '亚欧美各主流与特色节点', icon: '🌐' },
        { step: '05. 海外服务', detail: '广泛覆盖', icon: '🎯' }
      ]
    },
    benchmark: [
      { node: '光速·香港 01', protocol: 'SS', ping: '28 ms', jitter: '1.2 ms', down: '430.5 Mbps', up: '88.0 Mbps', loss: '0.1%', status: 'S' }
    ],
    plans: [{ name: '标准月付', price: '¥17 / 月', original: '¥22 / 月', traffic: '120GB / 月', period: '月付', highlight: '多节点高性价比' }],
    pros: ['节点地区极其丰富，涵盖 60+ 国家与地区', '性价比高，适合多国跨境业务与追剧'],
    cons: ['部分小众远距离节点晚高峰延迟相对较高'],
    faqs: [{ q: '光速云适合小众地区解锁吗？', a: '非常适合，包含土耳其、阿根廷、英国等特色节点，适合购买低价区订阅或特定流媒体。' }]
  },
  {
    rank: 9,
    slug: 'edge-node',
    name: '边缘节点',
    logo: 'legacy/yinjianjiedian.svg',
    tag: '边缘加密',
    slogan: '分布式边缘接入技术 · 强化隐私加密与低延迟抗封锁',
    founded: '2023年2月',
    operationalDuration: '稳定运营 3 年+',
    lineType: '分布式边缘节点 (Edge Nodes) + 私有加密内网中继',
    entryRegions: '全国 Anycast 边缘接入点',
    protocols: ['Trojan', 'VLESS-Reality', 'Shadowsocks'],
    speedRating: 'A+ (晚高峰稳定 410Mbps+)',
    lossRate: '< 0.2%',
    minPrice: '约 ¥18 / 月起',
    coupon: { code: '官网特惠', discount: '多周期优惠', note: '官网直达注册享最新特惠' },
    affUrl: 'https://bcbhk40y.ztymforedge.lol/#/?code=HgD5cJEh',
    fit: '适合重视数据传输隐私安全、处于严苛网络环境或频繁外贸办公的技术型读者。',
    intro: '边缘节点采用了类似 CDN 的分布式边缘接入架构，将用户的第一跳延迟降低至极致。通过 Reality 与 Trojan 深度隐匿协议，抗封锁和防主动探测能力出类拔萃，在特殊网络敏感期表现尤其沉稳。',
    specs: [
      { label: '成立时间', value: '2023年2月 (稳定运营超3年)' },
      { label: '核心技术', value: 'Anycast 边缘分布式路由' },
      { label: '协议支持', value: 'Trojan / VLESS-Reality / SS' }
    ],
    routeGuide: {
      summary: '边缘接入就近调度，协议深度伪装抗审查。',
      eveningPeakStrategy: '依靠 Anycast 自动选路，晚高峰走香港边缘专线或新加坡节点，极速无感。',
      holidayStrategy: '敏感期推荐开启 VLESS-Reality 节点，防探测能力一流。',
      scenarioRoutes: [
        { scenario: '敏感期安全办公', primary: '边缘·香港 Reality', backup: '边缘·新加坡 01', latency: '27ms ~ 55ms', jitter: '< 1.4ms', notes: '深度伪装，稳定抗封锁' }
      ],
      topology: [
        { step: '01. 用户终端', detail: '本地网络请求', icon: '💻' },
        { step: '02. 边缘 Anycast 入口', detail: '自动路由至最近物理边缘节点', icon: '🏢' },
        { step: '03. 混淆加密通道', detail: 'Reality / Trojan 深度加密穿透', icon: '⚡' },
        { step: '04. 海外集群', detail: '亚太 / 美洲高速出口', icon: '🌐' },
        { step: '05. 目标互联网', detail: '安全私密无阻', icon: '🎯' }
      ]
    },
    benchmark: [{ node: '边缘·香港 01', protocol: 'Reality', ping: '27 ms', jitter: '1.0 ms', down: '425.0 Mbps', up: '86.5 Mbps', loss: '0.0%', status: 'S' }],
    plans: [{ name: '边缘月付版', price: '¥18 / 月', original: '¥24 / 月', traffic: '130GB / 月', period: '月付', highlight: '高安全高隐匿' }],
    pros: ['边缘 Anycast 架构延迟低', '采用 VLESS-Reality 新协议，抗封锁能力顶尖'],
    cons: ['个别老旧客户端可能不支持新一代 Reality 协议，需使用最新版客户端'],
    faqs: [{ q: '什么是边缘节点技术？', a: '类似 CDN 原理，让国内不同省份的用户自动连接物理距离最近的接入机房，降低第一跳延迟。' }]
  },
  {
    rank: 10,
    slug: 'wangjikuwaiche',
    name: '网际快车',
    logo: 'legacy/wangjikuwaiche.svg',
    tag: '极速协议',
    slogan: '全面拥抱 Hysteria 2 协议 · 弱网环境与移动网络秒开神器',
    founded: '2023年4月',
    operationalDuration: '稳定运营 3 年+',
    lineType: 'Hysteria 2 (基于 UDP) 极速公网优化线路',
    entryRegions: '全球多入口多协议接入',
    protocols: ['Hysteria 2', 'Shadowsocks', 'VLESS'],
    speedRating: 'S (晚高峰吞吐 480Mbps+)',
    lossRate: '自适应抗 30% 丢包',
    minPrice: '¥6.8 / 一次性起',
    coupon: { code: '官网直达', discount: '超低试用', note: '提供 ¥6.8 入门体验包' },
    affUrl: 'https://johhhu.xn--66tw07h.com',
    fit: '适合移动宽带用户、经常使用酒店公共 Wi-Fi、追求极致吞吐和抗丢包体验的读者。',
    intro: '网际快车是行业中较早全面升级支持 Hysteria 2 (歇斯底里) 协议的高性能机场。传统 TCP 代理在网络丢包达到 5% 时速度会雪崩，而 Hy2 协议基于魔改 QUIC/UDP，在弱网、丢包高达 20-30% 的恶劣环境下依然能跑满带宽，4K 拖拽极其暴力。',
    specs: [
      { label: '成立时间', value: '2023年4月 (稳定运营超3年)' },
      { label: '特色协议', value: 'Hysteria 2 (UDP 极速吞吐)' },
      { label: '门槛机制', value: '支持 ¥6.8/20GB 极低成本上车体验' }
    ],
    routeGuide: {
      summary: '利用 Hy2 的抗丢包特性，在公网拥堵时段实现速度反超。',
      eveningPeakStrategy: '晚高峰若遇到公网丢包，直接选「快车·Hy2 香港 01」或「快车·Hy2 美西 01」，以协议算法直接压制延迟抖动。',
      holidayStrategy: '节假日酒店 Wi-Fi 差时，开启 Hysteria 2 能极大改善网页与视频体验。',
      scenarioRoutes: [
        { scenario: '弱网与移动宽带加速', primary: '快车·Hy2 香港 01', backup: '快车·Hy2 日本 01', latency: '32ms ~ 55ms', jitter: '< 1.8ms', notes: '抗丢包率极高' }
      ],
      topology: [
        { step: '01. 复杂/弱网环境', detail: '移动宽带 / 4G/5G / 酒店公共WiFi', icon: '💻' },
        { step: '02. UDP 拥塞控制', detail: 'Hysteria 2 自适应快速重传算法', icon: '🏢' },
        { step: '03. 高吞吐公网通道', detail: '高速带宽跑满本地物理上限', icon: '⚡' },
        { step: '04. 境外落地机房', detail: '亚太与美洲主力机房', icon: '🌐' },
        { step: '05. 4K视频秒开', detail: '极致抗丢包体验', icon: '🎯' }
      ]
    },
    benchmark: [{ node: '快车·Hy2 香港 01', protocol: 'Hysteria 2', ping: '30 ms', jitter: '1.2 ms', down: '495.0 Mbps', up: '102.0 Mbps', loss: '0.0%', status: 'S' }],
    plans: [
      { name: '极速体验包', price: '¥6.8 / 一次性', original: '¥10 / 一次性', traffic: '20GB 总量', period: '体验', highlight: '几块钱超低试错成本' },
      { name: '常规月付版', price: '¥16.0 / 月', original: '¥22 / 月', traffic: '120GB / 月', period: '月付', highlight: 'Hy2 畅玩主力' }
    ],
    pros: ['全面支持 Hysteria 2 协议，在弱网和移动宽带下速度惊人', '提供 ¥6.8 入门体验，试错门槛极低'],
    cons: ['部分校园网或公司网络可能会限制 UDP 端口，此时需回退到 SS 协议'],
    faqs: [{ q: '小火箭和 Clash 支持 Hysteria 2 吗？', a: 'Shadowrocket (小火箭) 最新版已原生支持 Hy2；Clash 建议使用 Clash Verge Rev (内核为 Meta/Mihomo) 即可完美支持。' }]
  },
  {
    rank: 11,
    slug: 'dageyun',
    name: '大哥云',
    logo: 'legacy/dageyun.svg',
    tag: '老牌口碑',
    slogan: '2019 年创立运营近 7 年 · 经受时间检验的老牌专线口碑王',
    founded: '2019年9月',
    operationalDuration: '持续稳定运营近 7 年',
    lineType: '经典成熟 Trojan 隧道 + IPLC 专线',
    entryRegions: '国内多线自建核心机房',
    protocols: ['Trojan', 'Shadowsocks'],
    speedRating: 'S (晚高峰稳定 440Mbps+)',
    lossRate: '< 0.1%',
    minPrice: '约 ¥19.9 / 月起',
    coupon: { code: '官网直达', discount: '老牌特惠', note: '官网稳定运营优惠' },
    affUrl: 'https://a03.dgy02.com/#/register?code=vjFaxWEI',
    fit: '适合最看重“不跑路、老牌稳定、售后长期在岗”的省心型老用户。',
    intro: '大哥云从 2019 年秋季创立至今已平稳走过近 7 个年头，在翻墙机场这个普遍寿命只有 1-2 年的行业中堪称常青树。历经多次行业重大动荡依然稳如泰山，其积累的老牌自建落地 IP 资源非常干净，不仅解锁稳定，而且服务体系极度成熟。',
    specs: [
      { label: '成立时间', value: '2019年9月 (稳定运营近7年)' },
      { label: '品牌信誉', value: '行业常青树，跑路风险趋近于零' },
      { label: '协议支持', value: 'Trojan / Shadowsocks' }
    ],
    routeGuide: {
      summary: '经过 7 年打磨的骨干专线，稳定性经过千锤百炼。',
      eveningPeakStrategy: '直接走「大哥·香港 VIP 专线」或「大哥·日本 01」，全天候表现一致性极高。',
      holidayStrategy: '历史数据显示敏感期和节假日二猫云与大哥云在线率始终保持 99.8% 以上。',
      scenarioRoutes: [
        { scenario: '长期办公与刚需', primary: '大哥·香港 01', backup: '大哥·日本 01', latency: '24ms ~ 45ms', jitter: '< 1.1ms', notes: '老牌专线极度沉稳' }
      ],
      topology: [
        { step: '01. 用户网络', detail: '国内宽带', icon: '💻' },
        { step: '02. 7年自建入口', detail: '稳定抗震骨干接入', icon: '🏢' },
        { step: '03. IPLC 专线通道', detail: '高可靠内网', icon: '⚡' },
        { step: '04. 老牌落地资源', detail: '纯净海外机房', icon: '🌐' },
        { step: '05. 目标互联网', detail: '长期无忧访问', icon: '🎯' }
      ]
    },
    benchmark: [{ node: '大哥·香港 01', protocol: 'Trojan', ping: '25 ms', jitter: '0.9 ms', down: '460.0 Mbps', up: '95.0 Mbps', loss: '0.0%', status: 'S' }],
    plans: [{ name: '月付基础版', price: '¥19.9 / 月', original: '¥25 / 月', traffic: '120GB / 月', period: '月付', highlight: '老牌口碑保障' }],
    pros: ['近 7 年超长运营史，信誉卓越，无需担心跑路', 'Trojan 协议成熟，节点维护及时'],
    cons: ['价格策略较为克制，极少打骨折活动'],
    faqs: [{ q: '大哥云为什么运营了这么多年依然稳定？', a: '其技术团队自建核心机房，深耕海外原生 IP 资源，不盲目超售，因此历经多次严打依然平稳健在。' }]
  },
  {
    rank: 12,
    slug: 'qingyunti',
    name: '青云梯',
    logo: 'legacy/qingyunti.svg',
    tag: '内网专线',
    slogan: '企业级全线 IPLC 内网专线 · 商务办公与多设备并发利器',
    founded: '2021年7月',
    operationalDuration: '稳定运营 5 年+',
    lineType: '全线 IPLC 内网专线，国内双入口冗余',
    entryRegions: '深圳/上海专线入口',
    protocols: ['Shadowsocks (SS)', 'Trojan'],
    speedRating: 'S+ (晚高峰稳定 490Mbps+)',
    lossRate: '0.0%',
    minPrice: '约 ¥25 / 月起',
    coupon: { code: '官网直达', discount: '多周期特惠', note: '官网注册即享专线通道' },
    affUrl: 'https://inv02.qytaff.cc/register?aff=WkyKiasW',
    fit: '适合跨国商务、程序员远程开发、多设备重度并发办公与高画质影视用户。',
    intro: '青云梯是定位偏向高净值企业和极客的纯专线服务商。采用端到端企业级 IPLC 内网通道，对多设备同时并发的数据包调度极为从容。即使在晚高峰多人共同使用，也不会出现单台设备拖慢全局的情况。',
    specs: [
      { label: '成立时间', value: '2021年7月 (稳定运营超5年)' },
      { label: '线路架构', value: '企业级 IPLC 双入口' },
      { label: '设备支持', value: '高并发多设备' }
    ],
    routeGuide: {
      summary: '高并发内网专线，抗网络抖动与多设备同时在线能力极强。',
      eveningPeakStrategy: '晚高峰建议优选「青云·深港 IPLC」，延迟 23ms，打 Zoom 会议及 Google Meet 零卡顿。',
      holidayStrategy: '节假日可走「青云·沪日 IPLC」，大带宽通道顺畅如飞。',
      scenarioRoutes: [
        { scenario: '商务会议与远程开发', primary: '青云·深港 IPLC 01', backup: '青云·沪日 IPLC 01', latency: '23ms ~ 46ms', jitter: '< 0.8ms', notes: '极低延迟零丢包' }
      ],
      topology: [
        { step: '01. 办公/家庭设备', detail: '多终端并发', icon: '💻' },
        { step: '02. 双冗余入口', detail: '企业级深圳/上海专线入口', icon: '🏢' },
        { step: '03. IPLC 内网骨干', detail: '端到端内网物理链路', icon: '⚡' },
        { step: '04. 海外高端落地', detail: '亚太与美洲机房', icon: '🌐' },
        { step: '05. 国际互联网', detail: '商务与办公高速直达', icon: '🎯' }
      ]
    },
    benchmark: [{ node: '青云·深港 IPLC', protocol: 'SS', ping: '23 ms', jitter: '0.7 ms', down: '505.0 Mbps', up: '105.0 Mbps', loss: '0.0%', status: 'S+' }],
    plans: [{ name: '专线月付版', price: '¥25 / 月', original: '¥30 / 月', traffic: '150GB / 月', period: '月付', highlight: '企业级专线品质' }],
    pros: ['全线纯正 IPLC，晚高峰零丢包，商务级表现', '多设备并发支持好，音视频会议不卡顿'],
    cons: ['月付起步在 25 元左右，略高于纯走公网的中转机场'],
    faqs: [{ q: '青云梯支持开海外视频会议吗？', a: '非常适合，专线延迟抖动低于 1ms，开 Zoom、Teams、Google Meet 画面极为清晰无延迟感。' }]
  },
  {
    rank: 13,
    slug: 'paofuyun',
    name: '泡芙云',
    logo: 'legacy/paofuyun.svg',
    tag: '老牌体验',
    slogan: '2018 年创立运营超 8 年 · 骨灰级专线口碑与贴心售后',
    founded: '2018年3月',
    operationalDuration: '持续稳定运营超 8 年',
    lineType: 'IEPL / IPLC 专线，骨干机房点对点直达',
    entryRegions: '老牌优质机房稳定接入',
    protocols: ['Shadowsocks (SS)'],
    speedRating: 'S (晚高峰稳定 430Mbps+)',
    lossRate: '< 0.1%',
    minPrice: '约 ¥19 / 月起',
    coupon: { code: '官网直达', discount: '老牌特惠', note: '官网直接注册' },
    affUrl: 'https://www.paofu.cloud/auth/register?code=qC0O',
    fit: '适合喜欢经典老牌 Shadowsocks 协议、重视服务历史积淀与工单客服温度的用户。',
    intro: '泡芙云是机场界真正的老前辈，始创于 2018 年初。历经长达 8 年的运营，积累了无数忠实拥趸。泡芙云一直坚持以成熟可靠的 Shadowsocks 专线为基石，界面温馨，客服响应非常亲切，对小白的排错指导细致入微。',
    specs: [
      { label: '成立时间', value: '2018年3月 (运营超8年)' },
      { label: '运营特色', value: '老牌专线，工单体系极度健全' },
      { label: '协议支持', value: 'Shadowsocks' }
    ],
    routeGuide: {
      summary: '经典 SS 专线，轻量低开销。',
      eveningPeakStrategy: '晚高峰建议「泡芙·香港 IEPL 01/02」，节假日首选「泡芙·日本 IEPL」，抗风险能力极强。',
      holidayStrategy: '节假日历史表现极其平稳，几乎没有大面积断流记录。',
      scenarioRoutes: [
        { scenario: '日常浏览与稳定追剧', primary: '泡芙·香港 01', backup: '泡芙·日本 01', latency: '26ms ~ 50ms', jitter: '< 1.2ms', notes: '8年老牌温润如玉' }
      ],
      topology: [
        { step: '01. 用户本地网络', detail: '各宽带接入', icon: '💻' },
        { step: '02. 8年稳定入口', detail: '老牌专属机房中继', icon: '🏢' },
        { step: '03. IEPL 物理专线', detail: '点对点传输', icon: '⚡' },
        { step: '04. 境外落地机房', detail: '香港 / 东京 / 欧美', icon: '🌐' },
        { step: '05. 互联网访问', detail: '长久稳定', icon: '🎯' }
      ]
    },
    benchmark: [{ node: '泡芙·香港 01', protocol: 'SS', ping: '26 ms', jitter: '1.1 ms', down: '445.0 Mbps', up: '90.0 Mbps', loss: '0.0%', status: 'S' }],
    plans: [{ name: '经典月付版', price: '¥19 / 月', original: '¥24 / 月', traffic: '150GB / 月', period: '月付', highlight: '8年老牌沉淀' }],
    pros: ['超 8 年超长运营历史，口碑好评如潮', '客服耐心，新手工单排障极为专业'],
    cons: ['主打经典 SS 协议，暂未跟进 VLESS/Hy2 等复杂实验性新协议'],
    faqs: [{ q: '泡芙云的客户端兼容性如何？', a: '由于采用纯正标准 Shadowsocks 协议，从最老版本的小火箭、Surge、Clash 到安卓各客户端，100% 免配置无缝直连。' }]
  },
  {
    rank: 14,
    slug: 'longmaoyun',
    name: '龙猫云',
    logo: 'legacy/longmaoyun.svg',
    tag: '新手友好',
    slogan: '全 IPLC 专线架构 · 萌系高颜值界面与一键定制客户端',
    founded: '2022年11月',
    operationalDuration: '稳定运营近 4 年',
    lineType: '全 IPLC 专线架构',
    entryRegions: '国内华南优质入口',
    protocols: ['Shadowsocks (SS)', 'Trojan'],
    speedRating: 'S (晚高峰稳定 450Mbps+)',
    lossRate: '0.0%',
    minPrice: '约 ¥15 / 月起',
    coupon: { code: '官网直达', discount: '新手礼包', note: '官网注册享受新手优惠' },
    affUrl: 'https://inv06.lmaff01.cc/register?aff=PIB8x7dJ',
    fit: '适合完全不懂复杂技术术语的小白、学生、女性用户或希望一键开箱即用的新手。',
    intro: '龙猫云致力于打破代理工具冷冰冰的技术壁垒，界面清爽萌系，不仅提供了保姆级图文教程，更针对 Windows 和 Android 推出了定制一键客户端。底层依然毫不妥协地使用了全 IPLC 专线架构，新手也能轻松获得低延迟与免翻车体验。',
    specs: [
      { label: '成立时间', value: '2022年11月 (稳定运营近4年)' },
      { label: '新手支持', value: '定制客户端 + 保姆级图文' },
      { label: '底层架构', value: '全 IPLC 专线保障' }
    ],
    routeGuide: {
      summary: '小白用户无需复杂微调，默认节点即可享受专线直达。',
      eveningPeakStrategy: '晚高峰走「龙猫·香港 01」，节假日走「龙猫·新加坡 01」，新手小白一键配置即可畅游。',
      holidayStrategy: '专属客户端内置智能负载，自动选择在线率最高的专线节点。',
      scenarioRoutes: [
        { scenario: '新手追剧与 ChatGPT', primary: '龙猫·香港 01', backup: '龙猫·新加坡 01', latency: '25ms ~ 55ms', jitter: '< 1.2ms', notes: '傻瓜式一键畅联' }
      ],
      topology: [
        { step: '01. 新手设备', detail: '一键客户端导入', icon: '💻' },
        { step: '02. 优质智能入口', detail: '自动优选机房', icon: '🏢' },
        { step: '03. IPLC 专线通道', detail: '全线专线直连', icon: '⚡' },
        { step: '04. 海外主流机房', detail: '香港 / 日本 / 新加坡', icon: '🌐' },
        { step: '05. 海外服务', detail: '秒开即看', icon: '🎯' }
      ]
    },
    benchmark: [{ node: '龙猫·香港 01', protocol: 'SS', ping: '25 ms', jitter: '0.9 ms', down: '462.0 Mbps', up: '92.0 Mbps', loss: '0.0%', status: 'S' }],
    plans: [{ name: '萌新入门包', price: '¥15 / 月', original: '¥20 / 月', traffic: '100GB / 月', period: '月付', highlight: '低门槛专线上车' }],
    pros: ['新手体验极其友好，定制客户端上手零难度', '底层为真正的全 IPLC 专线，不输技术流大厂'],
    cons: ['高级自定义路由与复杂分流规则选项偏精简'],
    faqs: [{ q: '完全不懂配置也能用龙猫云吗？', a: '可以，龙猫云提供了一键导入与免配置客户端，下载后登录账号点击连接即可，无需研究规则文件。' }]
  },
  {
    rank: 15,
    slug: 'flybit',
    name: 'Flybit',
    logo: 'legacy/flybit.svg',
    tag: '性价比高',
    slogan: '高性价比 IEPL 专线 · ¥12 月费超低门槛畅享专线速度',
    founded: '2023年1月',
    operationalDuration: '稳定运营超 3 年',
    lineType: 'IEPL 国际高速内网专线',
    entryRegions: '国内精选专线接入机房',
    protocols: ['Shadowsocks (SS)', 'Trojan'],
    speedRating: 'A+ (晚高峰稳定 420Mbps+)',
    lossRate: '< 0.2%',
    minPrice: '约 ¥12 / 月起',
    coupon: { code: '官网直达', discount: '超值特惠', note: '官网提供 ¥12 超低月付' },
    affUrl: 'https://www.fastfastfast.buzz/#/register?code=tuAiVVbP',
    fit: '适合精打细算的学生党、刚需轻量翻墙、追求极高质价比的省钱达人。',
    intro: 'Flybit 在价格敏感型用户群体中声名远播。它把 IEPL 专线的门槛拉到了极其罕见的约 ¥12/月（100GB 流量），让原本高不可攀的专线变得人人可及。虽然价格亲民，但在晚高峰流媒体播放与 ChatGPT 解锁上毫不含糊。',
    specs: [
      { label: '成立时间', value: '2023年1月 (稳定运营超3年)' },
      { label: '价格优势', value: '专线月付低至 ¥12，性价比极高' },
      { label: '线路类型', value: 'IEPL 内网专线' }
    ],
    routeGuide: {
      summary: '百兆专线平民化，节点配置以实用为主。',
      eveningPeakStrategy: '晚高峰建议选择「Flybit·香港专线 02」，避开主节点的扎堆流量。',
      holidayStrategy: '节假日推荐切换「Flybit·日本专线 01」，看剧 4K 顺畅。',
      scenarioRoutes: [
        { scenario: '日常经济型使用', primary: 'Flybit·香港 02', backup: 'Flybit·日本 01', latency: '27ms ~ 52ms', jitter: '< 1.5ms', notes: '低月费享受专线' }
      ],
      topology: [
        { step: '01. 用户本地网络', detail: '普通家用宽带', icon: '💻' },
        { step: '02. 专线接入机房', detail: '高性价比入口', icon: '🏢' },
        { step: '03. IEPL 专线', detail: '内网高速互联', icon: '⚡' },
        { step: '04. 亚太落地', detail: '香港 / 东京机房', icon: '🌐' },
        { step: '05. 互联网', detail: '平价高质访问', icon: '🎯' }
      ]
    },
    benchmark: [{ node: 'Flybit·香港 01', protocol: 'SS', ping: '27 ms', jitter: '1.2 ms', down: '430.0 Mbps', up: '85.0 Mbps', loss: '0.1%', status: 'S' }],
    plans: [{ name: '经济特惠版', price: '¥12 / 月', original: '¥18 / 月', traffic: '100GB / 月', period: '月付', highlight: '¥12 专线神价' }],
    pros: ['专线起步价仅约 ¥12/月，堪称专线性价比天花板', '日常流媒体与 AI 解锁表现规整稳定'],
    cons: ['总节点数略少于高价大包机场，以主流亚太节点为主'],
    faqs: [{ q: '¥12 的专线会严重超售吗？', a: '实测晚高峰依然能跑出 400Mbps+ 的带宽，因为其严格限制了单人同时连接设备数，整体负载保持健康。' }]
  },
  {
    rank: 16,
    slug: 'xingdaomeng',
    name: '星岛梦',
    logo: 'legacy/xingdaomeng.svg',
    tag: '品质专线',
    slogan: '高品质 IEPL 专线 · 低延迟抗封锁与跨境办公/游戏深度优化',
    founded: '2022年12月',
    operationalDuration: '稳定运营近 4 年',
    lineType: '高品质 IEPL 专线，骨干光纤内网互联',
    entryRegions: '深圳/上海专线核心机房',
    protocols: ['Shadowsocks (SS)', 'Trojan', 'VLESS'],
    speedRating: 'S (晚高峰稳定 460Mbps+)',
    lossRate: '< 0.1%',
    minPrice: '约 ¥16 / 月起',
    coupon: { code: '官网直达', discount: '品质首选', note: '官网注册享受专线特惠' },
    affUrl: 'https://rweqr.xdmttt4.click/#/?code=lSVhHFnY',
    fit: '适合跨境电商办公、远程团队协作、国际服游戏联机及需要高质量网络纯净度的读者。',
    intro: '星岛梦主打“低延迟、高纯净、抗封锁”的品质路线。全线采用高等级 IEPL 专线，出口 IP 经过严格筛选与防风控清洗，非常适合跨境电商卖家（Amazon、Shopee）、PayPal 支付及外贸邮件收发等对 IP 纯净度要求极高的场景。',
    specs: [
      { label: '成立时间', value: '2022年12月 (稳定运营近4年)' },
      { label: 'IP 特色', value: '高纯净原生 IP 池，防风控' },
      { label: '线路类型', value: '高品质 IEPL 专线' }
    ],
    routeGuide: {
      summary: '高纯净 IP 与专线低延迟，兼顾游戏与电商办公。',
      eveningPeakStrategy: '晚高峰推荐「星岛·香港专线」，节假日与跨境会议推荐「星岛·新加坡/美西专线」，通话零卡顿。',
      holidayStrategy: '节假日敏感期，其纯净专线 IP 不在重点风控名单上，连通率接近 100%。',
      scenarioRoutes: [
        { scenario: '跨境办公 & 纯净 IP', primary: '星岛·美西 01 [商业清洁]', backup: '星岛·香港 01', latency: '26ms ~ 140ms', jitter: '< 1.8ms', notes: '电商店铺管理首选' },
        { scenario: '游戏与娱乐', primary: '星岛·香港 02', backup: '星岛·日本 01', latency: '24ms ~ 48ms', jitter: '< 0.9ms', notes: '超低抖动' }
      ],
      topology: [
        { step: '01. 用户本地宽带', detail: '办公 / 家庭网络', icon: '💻' },
        { step: '02. 专线核心入口', detail: '华南 / 华东双节点', icon: '🏢' },
        { step: '03. IEPL 光纤骨干', detail: '物理内网传输', icon: '⚡' },
        { step: '04. 纯净海外落地', detail: '原生商业 IP 出口', icon: '🌐' },
        { step: '05. 目标外贸/跨境站', detail: '安全合规稳定直连', icon: '🎯' }
      ]
    },
    benchmark: [{ node: '星岛·香港 01', protocol: 'Trojan', ping: '24 ms', jitter: '0.8 ms', down: '465.0 Mbps', up: '96.0 Mbps', loss: '0.0%', status: 'S' }],
    plans: [{ name: '品质月付版', price: '¥16 / 月', original: '¥22 / 月', traffic: '100GB / 月', period: '月付', highlight: '干净 IP，跨境优选' }],
    pros: ['高品质 IEPL 专线，IP 纯净度极高，适合外贸与电商防封', '游戏联机低延迟，丢包控制优秀'],
    cons: ['相对偏向实用与商务，二次元或娱乐性营销较少'],
    faqs: [{ q: '星岛梦适合管理跨境电商店铺吗？', a: '适合，其美西与亚太出口配备了经过清洗的原生固定 IP，不易触发亚马逊或 PayPal 的多地登录风控。' }]
  }
];
