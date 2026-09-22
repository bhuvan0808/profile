/* ------------------------------------------------------------------
   Profile data — single source of truth for every section and mode.
   ------------------------------------------------------------------ */
(function () {
  'use strict';
  const GH = 'https://github.com/bhuvan0808';
  const LINKS = {
    linkyaar: 'https://linkyaar.com',
    linkyaarRepo: GH + '/linkyaar',
    goddie: 'https://goddie.linkyaar.com',
    aharyas: 'https://www.aharyas.com/',
    zypdf: 'https://zy-pdf.vercel.app/',
    routin: 'https://play.google.com/store/apps/details?id=com.bhuvanboddu.routin',
    lapper: 'https://lapper.vercel.app/',
    bcm10: 'https://www.bcm10news.in/',
    beuvian: GH + '/beuvian',
    dwel: 'https://marketplace.atlassian.com/apps/3005194704/dwel-time-in-status-for-jira',
    quaicu: 'https://quaicu.org',
    book: 'https://drive.google.com/file/d/1ks8F_i0B69xrIboDALk7C0xvA6dOSjxQ/view?usp=sharing',
    stitch: 'https://stitch.withgoogle.com/projects/16453632940987749201',
    kawkaw: 'https://kawkaw-admin-psi.vercel.app'
  };

  window.PROFILE = {
    name: 'Bhuvan Boddu',
    fullName: 'Boddu Venkata Sai Bhuvan',
    email: 'bhuvanboddu08@gmail.com',
    phone: '+91 76708 41357',
    phoneHref: 'tel:+917670841357',
    github: GH,
    linkedin: 'https://linkedin.com/in/bhuvanboddu',
    location: 'Chennai → anywhere',
    links: LINKS,

    quote: {
      text: 'What is felt within appears as a phenomenon outside.',
      by: 'From the first book I ever read — and the line I have been testing against reality ever since.'
    },

    /* ---------- per-mode copy ---------- */
    modes: {
      builder: {
        label: 'Builder',
        world: 'Shadow Fight',
        eyebrow: 'BUILDER MODE // 41 REPOS · 8+ LIVE PRODUCTS',
        title: ['I build', 'things that', 'ship.'],
        sub: 'LinkYaar built solo in ~3 days → 100+ users in week one, including YC founders, Vietnam Airlines and Paris fashion brands. ZyPDF used across Turkish universities. Routin on the Play Store. Sites for news channels shipped in under an hour with AI agents. Every repo is a round won.',
        cta1: { t: 'Enter the arena', h: '#work' },
        cta2: { t: 'Challenge me', h: '#contact' },
        stats: [
          { v: 41, l: 'public repositories' },
          { v: 8, suf: '+', l: 'live products in use' },
          { v: 3, l: 'days to build LinkYaar v1, solo' },
          { v: 100, suf: '+', l: 'LinkYaar users in week one' }
        ],
        featured: ['linkyaar', 'goddie', 'routin'],
        featuredEyebrow: 'SIGNATURE MOVES',
        featuredTitle: 'Signature moves.',
        featuredSub: 'Three products that went from blank repo to real users — each one built alone, end to end.',
        principlesEyebrow: 'FIGHTING STYLE',
        principlesTitle: 'Fighting style.',
        principlesSub: 'The rules I build by. Learned the hard way, in production.',
        venturesEyebrow: 'SIDE QUESTS',
        venturesTitle: 'Side quests.',
        venturesSub: 'Companies, consulting and the one I deliberately knocked out.',
        expEyebrow: 'FIGHT RECORD',
        expTitle: 'Rounds fought.',
        expSub: 'Where I have built, shipped and been punched in the face by production.',
        workEyebrow: 'THE ARSENAL',
        workTitle: 'The arsenal.',
        workSub: '41 public repos spanning agents, models, live SaaS, mobile and dev tools. Pick a weapon.',
        skillsEyebrow: 'MOVE LIST',
        skillsTitle: 'Move list.',
        skillsSub: 'Weights → agents → infra → web → sales. Combos across the whole stack.',
        worldEyebrow: 'AWAY GAMES',
        worldTitle: 'Away games.',
        worldSub: 'If a problem is solved here but not there, I fly there. Deal → business. No deal → vacation.',
        eduEyebrow: 'TRAINING GROUNDS',
        eduTitle: 'Training grounds.',
        eduSub: 'Always in training. Never done.',
        beyondEyebrow: 'OFF THE MAT',
        beyondTitle: 'Off the mat.',
        beyondSub: 'Signal outside the repo.',
        contactEyebrow: 'FINAL ROUND',
        contactTitle: 'Challenge me.',
        contactSub: 'Got something hard to build? Send the brief. I ship — AI/ML, agentic systems, full-stack AI, founder’s office.',
        formPlaceholder: 'Describe the fight — what are we building?',
        formBtn: 'Send challenge',
        footerLine: 'Designed & built by hand — like everything else here. No bugs were harmed. (Many were.)'
      },
      founder: {
        label: 'Founder',
        world: 'Gotham',
        eyebrow: 'FOUNDER // 0→1 OPERATOR · REAL REVENUE',
        title: ['Founding CTO.', 'Real revenue.', 'No cape required.'],
        sub: 'Took Aharyas from zero to ~$4K MRR — raised ₹14 Lakh plus a $15K grant, onboarded 100+ artisans village by village, earned an endorsement from KTR. Now managing a ₹10 Cr B2B pipeline, consulting for startups, and co-building a Gen Z consumer brand with my brother.',
        cta1: { t: 'Light the signal', h: '#contact' },
        cta2: { t: 'The origin story', h: '#experience' },
        stats: [
          { v: 4, pre: '~$', suf: 'K', l: 'MRR built from zero at Aharyas' },
          { v: 14, pre: '₹', suf: 'L', l: 'MSME funding raised, plus a $15K grant' },
          { v: 100, suf: '+', l: 'artisans onboarded, in person' },
          { v: 10, pre: '₹', suf: ' Cr', l: 'B2B sales pipeline managed' }
        ],
        featured: ['aharyas', 'dwel', 'probiotic'],
        featuredEyebrow: 'CASE FILES',
        featuredTitle: 'Case files.',
        featuredSub: 'Ventures with revenue, users and receipts.',
        principlesEyebrow: 'THE CODE',
        principlesTitle: 'The code I live by.',
        principlesSub: 'Rules for a city that does not hand out playbooks.',
        venturesEyebrow: 'THE PORTFOLIO',
        venturesTitle: 'The portfolio.',
        venturesSub: 'Every venture, board seat and consulting engagement — including the one I shut down on purpose.',
        expEyebrow: 'ORIGIN STORY',
        expTitle: 'The origin story.',
        expSub: 'From part-time AI researcher to founding CTO to Fortune-100 delivery.',
        workEyebrow: 'UTILITY BELT',
        workTitle: 'The utility belt.',
        workSub: 'Every venture needs gadgets. These are the ones I built, shipped and still maintain.',
        skillsEyebrow: 'GADGETS',
        skillsTitle: 'Gadgets.',
        skillsSub: 'The range that takes a founder from pitch deck to production to payroll.',
        worldEyebrow: 'BEYOND GOTHAM',
        worldTitle: 'Beyond Gotham.',
        worldSub: 'Nine countries, five of them solo. Every trip is a vacation with a list of people whose problems I might solve.',
        eduEyebrow: 'THE TRAINING',
        eduTitle: 'The training.',
        eduSub: 'Doctorate, MBA and engineering — pursued alongside full-time work, self-funded, no career break.',
        beyondEyebrow: 'BEYOND THE COWL',
        beyondTitle: 'Beyond the cowl.',
        beyondSub: 'What I do when the city is quiet.',
        contactEyebrow: 'THE SIGNAL',
        contactTitle: 'Light the signal.',
        contactSub: 'Building something that matters? Co-founder, founder’s office, CTO or first engineer — I answer the signal.',
        formPlaceholder: 'Describe the mission — what does Gotham need?',
        formBtn: 'Send the signal',
        footerLine: 'Built in the dark. Shipped by dawn.'
      },
      ai: {
        label: 'AI Engineer',
        world: 'Neural',
        eyebrow: 'AI ENGINEER // MODELS · AGENTS · EVAL',
        title: ['Train the model.', 'Orchestrate the agents.', 'Ship the AI.'],
        sub: 'Pre-trained a 109.5M-parameter LLM from scratch on one H100 — 29.19 perplexity, beating GPT-2 Small at 9× fewer parameters, for $1,150. Built a 20+ microservice, 16-model pipeline on H100s that ran 30 days without a failure for a Fortune-100 client — the production system behind a NeurIPS 2025 paper.',
        cta1: { t: 'Inspect the stack', h: '#skills' },
        cta2: { t: 'Open a session', h: '#contact' },
        stats: [
          { v: 109.5, dec: 1, suf: 'M', l: 'LLM params trained from scratch' },
          { v: 29.19, dec: 2, l: 'perplexity — beats GPT-2 Small (29.41)' },
          { v: 320, suf: 'K', l: 'tokens / second on a single H100' },
          { v: 20, suf: '+', l: 'microservices in the production pipeline' }
        ],
        featured: ['buvn', 'pipeline', 'beuvian'],
        featuredEyebrow: 'SELECTED RUNS',
        featuredTitle: 'Selected runs.',
        featuredSub: 'Foundation model, production pipeline, agent orchestration.',
        principlesEyebrow: 'TRAINING OBJECTIVES',
        principlesTitle: 'Training objectives.',
        principlesSub: 'The loss function I optimise for.',
        venturesEyebrow: 'DEPLOYMENTS',
        venturesTitle: 'Deployments.',
        venturesSub: 'Companies and clients where the models met the market.',
        expEyebrow: 'TRAINING LOG',
        expTitle: 'Training log.',
        expSub: 'Epochs of real-world engineering — evaluation, vision AI, MLOps, research.',
        workEyebrow: 'REPOSITORIES',
        workTitle: 'Repositories.',
        workSub: '41 public repos spanning agents, models, live SaaS, mobile and dev tools.',
        skillsEyebrow: 'THE STACK',
        skillsTitle: 'The stack.',
        skillsSub: 'Weights → agents → infra → web.',
        worldEyebrow: 'DISTRIBUTION SHIFT',
        worldTitle: 'Distribution shift.',
        worldSub: 'Nine countries of real-world data. Models generalise better when the training set does.',
        eduEyebrow: 'PRE-TRAINING',
        eduTitle: 'Pre-training.',
        eduSub: 'Formal training data. Continuously fine-tuned.',
        beyondEyebrow: 'OUT OF DISTRIBUTION',
        beyondTitle: 'Out of distribution.',
        beyondSub: 'Signal outside the repo.',
        contactEyebrow: 'NEW SESSION',
        contactTitle: 'Open a session.',
        contactSub: 'AI/ML engineering, agentic systems, full-stack AI — Chennai-based, ready to relocate anywhere the work is interesting.',
        formPlaceholder: 'Describe the problem — what should the model do?',
        formBtn: 'Run prompt',
        footerLine: 'Designed & built by hand — like everything else here.'
      }
    },

    /* ---------- featured pool ---------- */
    featured: {
      linkyaar: {
        kind: 'live · open source · solo', icon: '🔗', title: 'LinkYaar',
        desc: 'A free, open-source Linktree alternative built solo in about three days. 27 themes plus a Theme Studio, AI bio writer, drag-and-drop link scheduling, private analytics, email capture, QR and dynamic OG images, full self-hosting. 100+ users in week one — YC founders, Vietnam Airlines, Paris fashion brands.',
        tags: ['Next.js', 'TypeScript', 'Supabase RLS', 'Upstash Redis', 'AGPL-3.0'],
        metric: '● Live · 100+ users in week 1', link: LINKS.linkyaar, linkText: 'Visit linkyaar.com', link2: LINKS.linkyaarRepo
      },
      goddie: {
        kind: 'live · creator payments', icon: '☕', title: 'BuyMeAGoddie',
        desc: 'A zero-fee Buy Me a Coffee alternative built because LinkYaar users asked for tips. Supporters pay creators bank-to-bank via UPI deep links and QR, so the platform never touches the money — free forever. Multi-rail architecture ready for Pix, PayNow and PromptPay across 27 countries.',
        tags: ['Next.js 15', 'React 19', 'Framer Motion', 'Three.js', 'UPI'],
        metric: '● Live · 27-country rails', link: LINKS.goddie, linkText: 'Visit goddie.linkyaar.com'
      },
      routin: {
        kind: 'play store · open source', icon: '📱', title: 'Routin',
        desc: 'Got tired of Google Tasks, so I built the alternative and self-published it to the Play Store. A daily planner with routines, reminders, streaks, statistics and offline-first sync — concept to store listing to ongoing maintenance.',
        tags: ['Flutter', 'Dart', 'Offline-first', 'Play Store'],
        metric: '● Published on Google Play', link: LINKS.routin, linkText: 'Open on Play Store'
      },
      beuvian: {
        kind: 'agentic AI · control plane', icon: '🤖', title: 'Beuvian Code',
        desc: 'An open-source Go control plane that lets a developer monitor, approve and re-prompt any AI coding agent remotely — from WhatsApp, Telegram or a phone call. Message a task, agents plan and code it, you approve from chat.',
        tags: ['Go', 'PostgreSQL', 'Redis', 'WebSockets', 'AES-256-GCM'],
        metric: 'Your dev team in your pocket', link: GH, linkText: 'View on GitHub'
      },
      buvn: {
        kind: 'foundation ML · from scratch', icon: '🧠', title: 'Beuvian / BUVN-2.0',
        desc: 'A 109.5M-parameter decoder-only transformer (12 layers, 768 dim, 32K vocab, RoPE, RMSNorm, SwiGLU) pre-trained on 2B C4 tokens on one H100 in ~2 hours at 320K tokens/s. 29.19 perplexity on WikiText-103 — beats GPT-2 Small at 9× fewer parameters, on a $1,150 budget.',
        tags: ['PyTorch', 'H100', 'HuggingFace', 'FastAPI', '24% MFU'],
        metric: 'ppl 29.19 vs GPT-2 Small 29.41', link: LINKS.beuvian, linkText: 'View on GitHub'
      },
      pipeline: {
        kind: 'production AI · fortune-100', icon: '⚙️', title: 'H100 pre-annotation pipeline',
        desc: 'A 20+ microservice pipeline on bare-metal H100s with Ray and 16+ models that processed MAG7 client video data non-stop for a month with zero failures. The production system behind our team’s NeurIPS 2025 paper — over 80% less human review for MAANG clients.',
        tags: ['Ray', 'H100', '16+ models', 'Kubernetes', 'NeurIPS 2025'],
        metric: '30 days · zero failures', link: null, linkText: 'Built at Centific'
      },
      aharyas: {
        kind: 'founding CTO · D2C', icon: '🚀', title: 'Aharyas',
        desc: '“From Rural to Global” — an artisan marketplace I co-built from day one as CTO & Head of Logistics. Built the platform, set up physical logistics, walked into villages to onboard 100+ artisans, sold at conference stalls. Zero to ~$4K MRR, ₹14 Lakh raised plus a $15K grant, endorsed by KTR.',
        tags: ['0→1', '₹14L + $15K', 'Razorpay', 'Logistics', 'Advisory board now'],
        metric: '~$4K MRR · 100+ artisans', link: LINKS.aharyas, linkText: 'Visit aharyas.com'
      },
      dwel: {
        kind: 'B2B SaaS · board member', icon: '🧩', title: 'BetterIntegrations / Dwel',
        desc: 'Head of Marketing and board member at a B2B SaaS building enterprise integrations for Atlassian Forge and Shopify. I own the sales pipeline, GTM and marketing — paid in base plus vested equity. “Dwel — Time in Status” is live on the Atlassian Marketplace.',
        tags: ['₹10 Cr pipeline', '$4K avg ticket', '40+ products', 'Atlassian Marketplace'],
        metric: '₹10 Cr active pipeline', link: LINKS.dwel, linkText: 'See Dwel on Atlassian'
      },
      probiotic: {
        kind: 'consumer brand · stealth', icon: '🧪', title: 'Stealth probiotic mixer',
        desc: 'Co-founding a Gen Z consumer health beverage with my brother — health packaged as an aspirational lifestyle, not medicine. I own strategy, positioning, GTM and early capital. Supply chain secured, core formulation and GTM playbook locked. Pre-launch.',
        tags: ['Co-founder & investor', 'D2C', 'Supply chain', 'GTM'],
        metric: 'Pre-launch · 2026', link: null, linkText: 'Stealth — ask me'
      },
      zentivra: {
        kind: 'multi-agent', icon: '📡', title: 'Zentivra',
        desc: 'Autonomous multi-agent AI radar — monitors, extracts, deduplicates, ranks and summarizes frontier-AI news into executive briefings via LLM tool-calling.',
        tags: ['Multi-agent', 'Groq · Llama 3', 'FastAPI', 'Next.js 14'],
        metric: 'Executive briefings, autonomously', link: GH, linkText: 'View on GitHub'
      }
    },

    /* ---------- operating principles ---------- */
    principles: [
      { n: '01', title: 'Prototype first. Then call sales.', desc: 'Every idle thought hunts for a problem. If the prototype works, it goes straight into the CRM pipeline as a low-impact test with real customers.' },
      { n: '02', title: 'Fail fast, on purpose.', desc: 'KawKaw: built a hyperlocal marketplace, launched, fulfilled real orders, ran the unit economics — and killed it. No capital burned forcing a bad model.' },
      { n: '03', title: 'No resources is no excuse.', desc: 'LinkYaar had zero budget and zero team. I taught myself, shipped it solo in about three days, and built BuyMeAGoddie when users asked for tips.' },
      { n: '04', title: 'If the problem exists elsewhere, fly there.', desc: 'Talk to the relevant people in person. A deal means a business; no deal means a vacation. Nine countries later, it is still the best market research I know.' },
      { n: '05', title: 'Talk to everyone.', desc: 'Conferences, communities, strangers on the road. Business is the best relationship after family and friendship — and it starts with a conversation.' },
      { n: '06', title: 'Take the stand. Fix it on the ground.', desc: 'At Aharyas I refused to buy inventory upfront, fired failing logistics vendors, and sat with artisans in Telugu until they trusted the platform.' }
    ],

    /* ---------- ventures ledger ---------- */
    ventures: [
      { name: 'Aharyas', role: 'CTO & Head of Logistics → Executive Board Consultant', status: 'ACTIVE · ADVISORY', tone: 'live', outcome: '0 → ~$4K MRR · ₹14L + $15K grant · 100+ artisans · endorsed by KTR', link: LINKS.aharyas, linkText: 'aharyas.com' },
      { name: 'LinkYaar + BuyMeAGoddie', role: 'Founder, CEO & sole builder', status: 'LIVE', tone: 'live', outcome: '100+ users in week one · zero-fee UPI tipping · rails for 27 countries', link: LINKS.linkyaar, linkText: 'linkyaar.com' },
      { name: 'BetterIntegrations / Dwel', role: 'Head of Marketing & Board Member', status: 'SELLING', tone: 'live', outcome: '₹10 Cr active pipeline · $4K avg ticket · 40+ products · 2-person sales team', link: LINKS.dwel, linkText: 'Atlassian Marketplace' },
      { name: 'Quaicu.org', role: 'Technical consultant', status: 'CONSULTING', tone: 'warm', outcome: 'AI governance for ERPs · optimising internal processes to onboard clients · $20K ticket size', link: LINKS.quaicu, linkText: 'quaicu.org' },
      { name: 'Stealth probiotic mixer', role: 'Co-Founder & Investor, with my brother', status: 'STEALTH · PRE-LAUNCH', tone: 'warm', outcome: 'Gen Z consumer health brand · formulation locked · supply chain secured · GTM playbook ready', link: null, linkText: '' },
      { name: 'Enterprise consulting', role: 'AI & growth consultant for startups', status: 'ONGOING', tone: 'warm', outcome: 'Landed Tajikistan AI Cell and Swisscom · engaged Karnataka AI Cell · tooling for media channels (BCM10 News, Lapper)', link: LINKS.lapper, linkText: 'lapper.vercel.app' },
      { name: 'KawKaw', role: 'Founder, solo build', status: 'WOUND DOWN · ON PURPOSE', tone: 'dead', outcome: 'Hyperlocal delivery in Bhadrachalam · full customer, vendor and admin stack · 10+ real orders · killed on unit economics', link: GH, linkText: 'GitHub' }
    ],

    /* ---------- experience ---------- */
    experience: [
      {
        date: 'Oct 2024 — Present', current: true,
        role: 'Associate Application Engineer — AI Product R&D',
        org: 'Centific — AI Data Foundry · Chennai',
        points: [
          'Built a <b>20+ microservice pre-annotation pipeline</b> (Ray, H100, 16+ models) that processed MAG7 client video data non-stop for a month with <b>zero failures</b> — the production system behind our team’s <b>NeurIPS 2025 paper</b>; over 80% less human review for MAANG clients.',
          'Designed a <b>drag-and-drop customisable data pipeline</b> adaptable to client-specific requirements.',
          'Designing an <b>agentic LLM evaluation workflow</b> with the product team — scoring, red-teaming and benchmarking agent quality before release.',
          'Delivered <b>Vision AI to Fortune-100 (MAG7) clients</b>; cut cloud and GPU spend <b>~25%</b> via AKS and Databricks right-sizing; <b>Terraform IaC</b> took environment setup from days to under an hour.'
        ]
      },
      {
        date: '2024 — Present',
        role: 'Startup Consultant — AI & Growth',
        org: 'Multiple startups · India & global',
        points: [
          '<b>BetterIntegrations / Dwel</b> — Head of Marketing & board member; own the B2B pipeline (<b>₹10 Cr</b>, $4K average ticket, 40+ products) and a 2-person sales team. Compensated in base plus vested equity.',
          '<b>Quaicu.org</b> (AI governance for ERPs) — technical consulting to optimise internal processes and client onboarding; <b>$20K ticket size</b>.',
          'Landed <b>Tajikistan AI Cell</b> and <b>Swisscom</b> as enterprise clients for a consulting engagement; engaged Karnataka AI Cell.'
        ]
      },
      {
        date: '2023 — Present',
        role: 'CTO & Head of Logistics → Executive Board Consultant',
        org: 'Aharyas — “From Rural to Global” artisan marketplace · aharyas.com',
        points: [
          'Founding team, day one → <b>~$4,000 MRR</b>, owning technology, logistics, supplier onboarding, direct sales and growth end to end.',
          'Raised <b>₹14 Lakh MSME funding</b> and a <b>$15,000 grant</b>; built the financial model, unit economics and investor narrative from scratch.',
          'Onboarded <b>100+ artisans</b> by visiting villages in person; sold at stalls and trade conferences; built the store (10K+ monthly visits, Razorpay). Brand endorsed by <b>KTR</b>, former IT Minister of Telangana.'
        ]
      },
      {
        date: '2026 — Present',
        role: 'Co-Founder — Consumer Brand (Stealth)',
        org: 'Gen Z probiotic mixer · with my brother',
        points: [
          'Co-building a consumer health brand from day zero — product-market fit, positioning and go-to-market for a fast-growing beverage category. Supply chain secured, formulation finalised.'
        ]
      },
      {
        date: 'Aug — Sep 2024',
        role: 'AI/ML Engineer Intern',
        org: 'Deepfacts · Hyderabad',
        points: [
          'Built classifiers detecting Ventricular Ectopic Beats from single-lead ECG (NeuroKit2); engineered signal features that lifted minority-class recall on imbalanced biomedical time-series.'
        ]
      },
      {
        date: 'Feb — May 2024',
        role: 'Research Intern — Team Lead',
        org: 'Centre for Human Security Studies (CHSS) · Hyderabad',
        points: [
          'Led a 5-person team researching seaport-security tech across India; authored <b>“Will LLMs Outscore Traditional Search Engines?”</b>'
        ]
      },
      {
        date: 'Nov 2021 — Oct 2022',
        role: 'AI Research Specialist (part-time)',
        org: 'Woxsen University — AI Research Centre',
        points: [
          'Co-authored <b>two white papers</b> on Generative AI’s impact on upcoming engineers; produced AI trend reports for faculty and partners.'
        ]
      }
    ],

    /* ---------- repositories ---------- */
    repoFilters: [
      ['all', 'All'], ['live', '🟢 Live products'], ['agentic', '🤖 Agentic AI'], ['ml', '🧠 ML & models'],
      ['oss', '📖 Open source'], ['devtools', '🛠 Dev tools'], ['apps', '📱 Web & mobile']
    ],
    langColors: { Python: '#3572A5', TypeScript: '#3178C6', JavaScript: '#F1E05A', Kotlin: '#A97BFF', Jupyter: '#DA5B0B', HTML: '#E34C26', Go: '#00ADD8', Dart: '#00B4AB' },
    repos: [
      { n: 'linkyaar', emoji: '🔗', cat: ['live', 'oss', 'apps'], lang: 'TypeScript', desc: 'Free, open-source Linktree alternative — 27 themes, Theme Studio, AI bio writer, scheduling, private analytics, QR & OG images. AGPL, self-hostable.', tags: ['next.js', 'supabase', 'AGPL-3.0'], link: LINKS.linkyaar, link2: LINKS.linkyaarRepo, badge: '● live' },
      { n: 'buymeagoddie', emoji: '☕', cat: ['live', 'oss', 'apps'], lang: 'TypeScript', desc: 'Zero-fee creator tipping — UPI deep links and QR, bank-to-bank, the platform never holds money. Multi-rail for Pix, PayNow, PromptPay across 27 countries.', tags: ['next.js 15', 'react 19', 'UPI'], link: LINKS.goddie, badge: '● live' },
      { n: 'beuvian', emoji: '🧠', cat: ['ml', 'oss'], lang: 'Python', desc: 'Foundation LLM pre-trained from scratch — 109.5M params, 2B C4 tokens, one H100, ~2 hours. Perplexity 29.19, beats GPT-2 Small. SRVN (code) and MNI (finance) siblings.', tags: ['pytorch', 'H100', 'RoPE · SwiGLU'], link: LINKS.beuvian, badge: 'flagship' },
      { n: 'beuvian-code', emoji: '🤖', cat: ['agentic', 'devtools', 'oss'], lang: 'Go', desc: 'Open-source control plane to monitor, approve and re-prompt any AI coding agent remotely — WhatsApp, Telegram, or a phone call.', tags: ['go', 'websockets', 'redis'], link: GH, badge: 'flagship' },
      { n: 'zypdf', emoji: '📄', cat: ['live', 'oss', 'apps'], lang: 'TypeScript', desc: 'Privacy-by-construction PDF toolkit — every document is processed inside the browser tab and never leaves the device. Used widely across Turkish universities.', tags: ['react', 'client-side wasm'], link: LINKS.zypdf, badge: '● live' },
      { n: 'routin', emoji: '📱', cat: ['live', 'oss', 'apps'], lang: 'Dart', desc: 'Google Tasks alternative published on the Play Store — routines, reminders, streaks, statistics, offline-first sync. Free and open source.', tags: ['flutter', 'play store'], link: LINKS.routin, badge: '● play store' },
      { n: 'lapper', emoji: '🎬', cat: ['live', 'apps'], lang: 'TypeScript', desc: 'Broadcast overlay studio for BCM10 News — text, video, audio and image overlays for on-air use. Built to cut human cost in a newsroom.', tags: ['next.js', 'media'], link: LINKS.lapper, link2: LINKS.bcm10, badge: '● live' },
      { n: 'kawkaw', emoji: '🛵', cat: ['apps'], lang: 'TypeScript', desc: 'Hyperlocal multi-service delivery platform for Bhadrachalam — customer, vendor and admin stack, 10+ real orders, wound down on unit economics.', tags: ['next.js', 'supabase', 'fail fast'], link: GH, badge: 'wound down' },
      { n: 'zentivra', emoji: '📡', cat: ['agentic', 'ml'], lang: 'Python', desc: 'Autonomous multi-agent AI radar — monitors, extracts, dedupes, ranks and summarizes frontier-AI news into executive briefings via LLM tool-calling.', tags: ['next.js 14', 'groq llama 3', 'fastapi'], link: GH, badge: 'multi-agent' },
      { n: 'pointpilot', emoji: '✈️', cat: ['live', 'apps'], lang: 'TypeScript', desc: 'Travel-rewards SaaS — 10 modules: award flight search, value calculator, card optimizer, fare alerts, lounge finder. Runs on free-tier infra.', tags: ['next.js 15', 'tailwind', 'vercel'], link: GH, badge: '● live' },
      { n: 'hellogpu', emoji: '📉', cat: ['oss', 'devtools', 'ml'], lang: 'Python', desc: 'Open-source, local-first GPU cost monitoring — flags idle GPU waste, per-job spend spikes and untagged resources; plain-English savings reports.', tags: ['anomaly detection', 'fastapi'], link: GH, badge: 'open source' },
      { n: 'bd-fileorganizer', emoji: '🗂️', cat: ['oss', 'devtools'], lang: 'Python', desc: 'PyPI package, 7 releases, users across Europe and the US — pip-installable CLI that auto-sorts files into typed folders.', tags: ['pypi', 'cli'], link: GH, badge: 'on PyPI' },
      { n: 'databricks-error-handler', emoji: '🚑', cat: ['devtools'], lang: 'TypeScript', desc: 'Full-stack app using the Gemini API to diagnose and explain Databricks pipeline failures in plain English — cuts engineer triage time.', tags: ['gemini api', 'full-stack'], link: GH, badge: 'devtool' },
      { n: 'llm-finetuning-eval', emoji: '🔬', cat: ['ml'], lang: 'Jupyter', desc: 'Fine-tuned FLAN-T5 & BERT for abstractive summarization on 300K CNN/DailyMail articles; benchmarked with BLEU, ROUGE, BERTScore.', tags: ['flan-t5', 'bert', 'bleu/rouge'], link: GH, badge: 'research' },
      { n: 'cervical-cancer-cv', emoji: '🔍', cat: ['ml'], lang: 'Python', desc: 'Computer-vision pipeline classifying Pap-smear images into 5 classes — YOLOv8 detection + fine-tuned ResNet50V2 backbone (team of 4).', tags: ['yolov8', 'resnet50v2', 'opencv'], link: GH, badge: 'vision' },
      { n: 'llm-chatbots', emoji: '💬', cat: ['ml', 'agentic'], lang: 'Python', desc: 'Conversational chatbots wired to DeepSeek and LLaMA-2 with prompt-engineered system instructions and configurable API keys.', tags: ['llama-2', 'deepseek'], link: GH, badge: 'conversational' },
      { n: 'convertly', emoji: '🔄', cat: ['apps'], lang: 'Kotlin', desc: 'Android app for currency, unit, timezone, GPA & file-size conversion with a Gemini-powered LLM assistant built in.', tags: ['android', 'gemini api'], link: GH, badge: 'android' },
      { n: 'bcm10news', emoji: '📰', cat: ['live', 'apps'], lang: 'TypeScript', desc: 'Production website for the BCM10 News channel — one of several media sites and internal tools shipped for newsrooms in under an hour with AI agents.', tags: ['next.js', 'media'], link: LINKS.bcm10, badge: '● live' },
      { n: 'school-sms-system', emoji: '🏫', cat: ['apps'], lang: 'JavaScript', desc: 'Automated SMS notification + student-ranking system for a school (Angular.js + Apache Cordova) — real software for real users.', tags: ['angular.js', 'cordova'], link: GH, badge: 'social impact' }
    ],

    /* ---------- skills ---------- */
    skills: [
      { icon: '🧠', title: 'AI / ML', items: ['LLM pre-training & fine-tuning', 'PyTorch', 'Transformers / HuggingFace', 'RAG', 'Agentic & multi-agent systems', 'Ray pipelines', 'Computer vision (YOLOv8, ResNet)', 'NLP'] },
      { icon: '🎯', title: 'LLM Evaluation', items: ['Red-teaming', 'Agent benchmarking', 'BLEU / ROUGE / BERTScore', 'Perplexity', 'Hallucination & latency analysis', 'A/B prompt testing'] },
      { icon: '☁️', title: 'Cloud / MLOps', items: ['Microsoft Azure', 'AWS', 'Kubernetes (AKS)', 'Docker', 'Terraform (IaC)', 'Databricks', 'CI/CD', 'GPU cost optimisation'] },
      { icon: '💻', title: 'Full-Stack & Mobile', items: ['Python (FastAPI, Flask)', 'TypeScript / Next.js / React', 'Go', 'Flutter / Dart', 'Kotlin / Android', 'Supabase / PostgreSQL', 'Angular', 'Power BI'] },
      { icon: '📈', title: 'Venture & Sales', items: ['0→1 venture building', 'Unit economics & pricing', 'Fundraising (₹14L + $15K)', 'B2B pipeline (₹10 Cr)', 'Cross-border sales (10+ countries)', 'Conference selling', 'Supplier onboarding', 'Investor & CXO pitching'] },
      { icon: '🌏', title: 'People & Culture', items: ['Cultures of 20+ countries', 'English · Hindi · Telugu', 'TEDx organiser', 'Model UN delegate', 'Community building', 'Published author'] }
    ],

    /* ---------- world ---------- */
    world: {
      countries: [
        ['mk', 'North Macedonia'], ['bh', 'Bahrain'], ['om', 'Oman'], ['tr', 'Türkiye'], ['lk', 'Sri Lanka'],
        ['my', 'Malaysia'], ['sg', 'Singapore'], ['th', 'Thailand'], ['id', 'Indonesia']
      ],
      facts: [
        { v: '9', l: 'countries visited — 5 of them solo' },
        { v: '50+', l: 'countries with friends I can call and stay with' },
        { v: '10+', l: 'countries where conversations turned into clients' },
        { v: '20+', l: 'cultures I understand well enough to pitch to' },
        { v: '₹12K', l: 'for a 5-day Kuala Lumpur trip in 2024, flights included' },
        { v: '3', l: 'languages — English, Hindi, Telugu' }
      ]
    },

    /* ---------- education ---------- */
    education: [
      { title: 'Doctorate (DBA) — AI for Business', org: 'ESGCI, Paris · alongside full-time work', desc: 'Researching how AI systems create measurable business value — the bridge between hands-on engineering (LLMs, agents, MLOps) and strategic impact.', status: '2026 — IN PROGRESS', hot: true },
      { title: 'MBA', org: 'Completed alongside a full-time engineering role', desc: '', status: '2025 — 2026' },
      { title: 'B.Tech — AI & Data Science', org: 'Woxsen University, Hyderabad', desc: '', status: '2021 — 2025' },
      { title: 'International Exchange — AI & CS', org: 'International Balkan University, Skopje, North Macedonia', desc: '', status: 'MAR — JUL 2024' },
      { title: 'Hackathons', org: 'BUILD Gen AI Hackathon (MIT) · Centific Premier Hackathon · Smart India Hackathon', desc: '', status: 'COMPETED' },
      { title: 'Certifications', org: 'AWS Cloud · Container Orchestration · IBM Python for DS & AI · Databricks · Power BI · Bloomberg Market Concepts · Design Thinking', desc: '', status: 'CONTINUOUS' }
    ],

    /* ---------- beyond ---------- */
    beyond: [
      { icon: '📖', title: 'Wrote and published a book', desc: '“People Inside the Room” — my thoughts on communication and business relationships. Wrote it, designed it with Claude Design, got the ISBN and published it. All solo, in weeks.', link: LINKS.book, linkText: 'Read the book' },
      { icon: '🏅', title: '3rd nationally — IIT Guwahati', desc: 'Led a microcontroller oxygen-adjustment life-support prototype to national recognition; patent documentation completed (MSME, 2022).' },
      { icon: '🎤', title: 'TEDx · Model UN · Debate', desc: 'TEDx curator and organiser, Debate Club exec, XLRI MUN delegate, President of Club Udyogh — the entrepreneurship and innovation club.' },
      { icon: '🌏', title: 'Community', desc: 'Taught and counselled 200+ rural students computer science for free (Woxsen Elevate). Rotaract member, Satya Sai Sevadal volunteer. Inter-University Cricket Champion.' },
      { icon: '✍️', title: 'Writing & research', desc: 'Co-authored two white papers on Generative AI. Writes on Medium about building, selling and travelling cheaply.' },
      { icon: '🎨', title: 'Design experiments with AI', desc: 'Prototyped an Andhra Pradesh tourism app with Google Stitch, plus dozens of web and mobile concepts with AI design agents.', link: LINKS.stitch, linkText: 'See the Stitch project' }
    ]
  };
})();
