/* ------------------------------------------------------------------
   Profile data — single source of truth for every section and mode.
   No emoji, no decoration: content only.
   ------------------------------------------------------------------ */
(function () {
  'use strict';
  const GH = 'https://github.com/bhuvan0808';
  const L = {
    linkyaar: 'https://linkyaar.com',
    linkyaarRepo: GH + '/linkyaar',
    goddie: 'https://goddie.linkyaar.com',
    goddieRepo: GH + '/buymeagoddie',
    aharyas: 'https://www.aharyas.com/',
    zypdf: 'https://zy-pdf.vercel.app/',
    routin: 'https://play.google.com/store/apps/details?id=com.bhuvanboddu.routin',
    routinRepo: GH + '/routin',
    lapper: 'https://lapper.vercel.app/',
    lapperRepo: GH + '/lapper',
    bcm10: 'https://www.bcm10news.in/',
    beuvian: GH + '/beuvian',
    beuvianCode: GH + '/beuviancode',
    kawkaw: GH + '/kawkaw',
    kawkawDemo: 'https://kawkaw-admin-psi.vercel.app',
    fileorg: 'https://pypi.org/project/bd-fileorganizer',
    fileorgRepo: GH + '/bd-fileorganizer',
    dwel: 'https://marketplace.atlassian.com/apps/3005194704/dwel-time-in-status-for-jira',
    quaicu: 'https://quaicu.org',
    book: 'https://drive.google.com/file/d/1ks8F_i0B69xrIboDALk7C0xvA6dOSjxQ/view?usp=sharing',
    stitch: 'https://stitch.withgoogle.com/projects/16453632940987749201',
    medium: 'https://medium.com/@bhuvanboddu08'
  };

  window.PROFILE = {
    name: 'Bhuvan Boddu',
    fullName: 'Boddu Venkata Sai Bhuvan',
    email: 'bhuvanboddu08@gmail.com',
    phone: '+91 76708 41357',
    phoneHref: 'tel:+917670841357',
    github: GH,
    linkedin: 'https://linkedin.com/in/bhuvanboddu',
    location: 'Chennai, India. Ready to relocate anywhere.',
    links: L,

    marquee: ['YC founders on LinkYaar', 'Vietnam Airlines', 'Paris fashion brands', 'Swisscom', 'Tajikistan AI Cell', 'Karnataka AI Cell', 'Endorsed by KTR', 'NeurIPS 2025 LAW workshop', 'Google Play', 'PyPI', 'Atlassian Marketplace', 'Turkish universities on ZyPDF', 'BCM10 News'],

    quote: {
      text: 'What is felt within appears as a phenomenon outside.',
      by: 'The line from the first book I ever read. I have been testing it against reality ever since.'
    },

    /* ================= per-mode copy ================= */
    modes: {
      founder: {
        label: 'Founder',
        world: 'Gotham',
        eyebrow: 'Founder · Operator · Consumer & D2C',
        title: ['I build consumer', 'businesses from', 'the ground up.'],
        sub: 'Founding CTO at Aharyas, solo founder of LinkYaar, board member at BetterIntegrations, co-founder of a stealth Gen Z brand. Twenty-two, raised in rural South India, and I have never met a stranger I could not start a conversation with.',
        cta1: { t: 'Open the case files', h: '#cases' },
        cta2: { t: 'Light the signal', h: '#contact' },
        stats: [
          { v: 4, pre: '~$', suf: 'K', l: 'monthly revenue built from zero at Aharyas' },
          { v: 14, pre: '₹', suf: ' L', l: 'MSME grant secured (about $15K)' },
          { v: 100, suf: '+', l: 'artisans onboarded in person, village by village' },
          { v: 10, pre: '₹', suf: ' Cr', l: 'B2B pipeline I run at BetterIntegrations' }
        ],
        casesEyebrow: 'Case files',
        casesTitle: 'Every venture. Equal weight.',
        casesSub: 'Six things I have built, sold or shut down. Each one taught me something the next one used.',
        cases: ['aharyas', 'linkyaar', 'dwel', 'quaicu', 'probiotic', 'kawkaw'],
        storyEyebrow: 'Ground truth',
        storyTitle: 'The code was easy. The ground was not.',
        storySub: 'How Aharyas went from failing pickups to a working marketplace.',
        story: [
          { k: 'What broke', h: 'Trust and trucks.', p: 'Artisans did not trust a digital platform with their inventory. Our first logistics vendors simply failed to pick up shipments. Orders were live and nothing was moving.' },
          { k: 'The call', h: 'I refused to buy inventory.', p: 'My co-founder wanted to purchase stock upfront to guarantee fulfilment. I said no. It would burn our cash in weeks and turn a marketplace into a warehouse.' },
          { k: 'On the ground', h: 'Fire the vendors, take the bus.', p: 'I dropped the failing vendors and found local transport myself so customers got their orders. Then I travelled to the villages, sat with artisans and spoke Telugu until they trusted us. Every onboarding and every hard delivery got shared with the team as a win.' },
          { k: 'Outcome', h: 'The model proved itself.', p: '100+ suppliers on the platform, a ₹14 Lakh government grant, roughly $4,000 in monthly revenue, 10K+ monthly visits, and an endorsement from KTR at zero ad spend.' }
        ],
        principlesEyebrow: 'How I operate',
        principlesTitle: 'Rules I did not read in a book.',
        viewsEyebrow: 'Market instinct',
        viewsTitle: 'What I believe about Indian consumers.',
        views: [
          { h: 'India is not one market.', p: 'KawKaw taught me that tier-2 consumers call the shop they trust unless convenience is undeniable. Metro playbooks do not copy-paste.' },
          { h: 'Payments must feel native.', p: 'BuyMeAGoddie works because it is UPI-first and zero-fee. Western gateways add friction Indians will not tolerate for a tip.' },
          { h: 'Healthy but boring is the white space.', p: 'My generation wants gut health packaged like a lifestyle, not medicine. That is the brand my brother and I are building.' },
          { h: 'Failing fast is a feature.', p: 'Launch, take real orders, read the unit economics, decide. KawKaw was shut down in weeks instead of bleeding for a year.' }
        ],
        trackEyebrow: 'Track record',
        trackTitle: 'Where the work happened.',
        workEyebrow: 'Products',
        workTitle: 'Things people actually use.',
        workSub: '41 public repositories. These are the ones with real users.',
        worldEyebrow: 'Beyond Gotham',
        worldTitle: 'Nine countries. Ten markets sold into.',
        worldSub: 'If a problem is solved here but not there, I fly there and talk to people. A deal is a business. No deal is a vacation.',
        eduEyebrow: 'Training',
        eduTitle: 'Studying while shipping.',
        wantEyebrow: 'What I am after',
        wantTitle: 'A consumer brand that outlives me.',
        wantText: 'Until now I have built with whatever I had, fast and tightly scoped. Now I want to go all in on a generational consumer brand, a billion touchpoints over the next eight years, with a co-founder who complements how I build and people who think big.',
        contactEyebrow: 'The signal',
        contactTitle: 'Light the signal.',
        contactSub: 'Building something for consumers? Co-founder, founding team, founder’s office. I answer fast, usually the same day.',
        formPlaceholder: 'What are you building, and where is it stuck?',
        formBtn: 'Send the signal',
        footerLine: 'Built in the dark. Shipped by dawn.'
      },

      builder: {
        label: 'Builder',
        world: 'Shadow Fight',
        eyebrow: 'Builder · 41 repositories · 8+ live products',
        title: ['I build things', 'that ship.'],
        sub: 'LinkYaar went from blank repo to 100+ users in a week, built alone in about three days. ZyPDF runs in Turkish universities. Routin is on the Play Store. Sites for newsrooms ship in under an hour with AI agents. Excuses do not survive a weekend.',
        cta1: { t: 'See what shipped', h: '#cases' },
        cta2: { t: 'Send me a problem', h: '#contact' },
        stats: [
          { v: 41, l: 'public repositories on GitHub' },
          { v: 8, suf: '+', l: 'live products with real users' },
          { v: 3, l: 'days to build and launch LinkYaar' },
          { v: 100, suf: '+', l: 'LinkYaar users in the first week' }
        ],
        casesEyebrow: 'Shipped',
        casesTitle: 'Built alone. Used by strangers.',
        casesSub: 'Six products taken from idea to live users, end to end.',
        cases: ['linkyaar', 'goddie', 'routin', 'zypdf', 'lapper', 'beuvianCode'],
        storyEyebrow: 'Zero budget',
        storyTitle: 'No money, no team, no excuse.',
        storySub: 'How LinkYaar and BuyMeAGoddie got built.',
        story: [
          { k: 'The idea', h: 'Everything you are, in one link.', p: 'I wanted a free, open-source alternative to Linktree that gives creators every premium feature without a ransom. I had no budget and nobody to hire.' },
          { k: 'The decision', h: 'Do not wait. Learn it.', p: 'I locked myself in and taught myself to architect a full-stack production system: Next.js, Supabase with row-level security, Redis, OAuth, email, analytics, CI/CD. About three days later linkyaar.com was live.' },
          { k: 'The pull', h: 'Users asked for tips.', p: 'Creators loved their pages and immediately asked how to accept money. Paid gateways were too expensive, so I went back to the code and built BuyMeAGoddie: UPI deep links and QR, bank to bank, zero fee, forever.' },
          { k: 'Outcome', h: 'A creator ecosystem from nothing.', p: '100+ users in week one including YC founders, Vietnam Airlines and Paris fashion brands. Tipping rails designed for 27 countries. Marketing took longer than building.' }
        ],
        principlesEyebrow: 'Fighting style',
        principlesTitle: 'How I fight problems.',
        viewsEyebrow: 'Working notes',
        viewsTitle: 'What building fast has taught me.',
        views: [
          { h: 'Prototype first. Then call sales.', p: 'Every idle thought hunts for a problem. If the prototype works, it goes into the CRM pipeline as a low-impact test with real customers.' },
          { h: 'A weekend is enough.', p: 'Most products die in planning. LinkYaar took three days. Sites for news channels take an hour with AI agents.' },
          { h: 'Maintain what you ship.', p: 'bd-fileorganizer has seven releases and users across Europe and the US. Routin is still updated. Shipping is a relationship, not an event.' },
          { h: 'Privacy by construction.', p: 'ZyPDF processes every document inside the browser. It is compliant because of how it is built, not because of a policy.' }
        ],
        trackEyebrow: 'Rounds',
        trackTitle: 'Where I have fought.',
        workEyebrow: 'The full arsenal',
        workTitle: 'Everything I have shipped.',
        workSub: 'Agents, models, live SaaS, mobile, dev tools. Filter by what you care about.',
        worldEyebrow: 'Away games',
        worldTitle: 'Problems do not respect borders.',
        worldSub: 'Nine countries, five of them solo. Every trip is a vacation with a list of people whose problems I might solve.',
        eduEyebrow: 'Training grounds',
        eduTitle: 'Always in training.',
        wantEyebrow: 'Next',
        wantTitle: 'Send me something hard.',
        wantText: 'I am at my best when the problem is real, the users are waiting and nobody has a playbook. If you have one of those, I will build the first version before we finish talking about it.',
        contactEyebrow: 'Your turn',
        contactTitle: 'Name the problem.',
        contactSub: 'Type it below and watch it enter the arena. Then send it, and I will come back with a first version.',
        formPlaceholder: 'Describe the problem. Be specific.',
        formBtn: 'Send the problem',
        footerLine: 'No excuses were spared in the making of this page.'
      },

      engineer: {
        label: 'AI Engineer',
        world: 'Stark',
        eyebrow: 'AI Engineer · Foundation models · Agents · Production',
        title: ['Trained the model.', 'Built the pipeline.', 'Shipped the agents.'],
        sub: 'Pre-trained a 109.5M-parameter LLM from scratch on one H100 that beats GPT-2 Small with nine times fewer parameters. Built the 20-stage vision pipeline behind a NeurIPS 2025 paper that ran for a month with zero failures. Now building RL post-training workflows for Fortune-100 clients at Centific.',
        cta1: { t: 'Inspect the systems', h: '#cases' },
        cta2: { t: 'Open a channel', h: '#contact' },
        stats: [
          { v: 109.5, dec: 1, suf: 'M', l: 'parameters, trained from scratch on one H100' },
          { v: 29.19, dec: 2, l: 'perplexity on WikiText-103. GPT-2 Small: 29.41' },
          { v: 320, suf: 'K', l: 'tokens per second at 24% MFU' },
          { v: 80, suf: '%', l: 'less human review for MAG7 clients' }
        ],
        casesEyebrow: 'Systems',
        casesTitle: 'From weights to production.',
        casesSub: 'The models, pipelines and control planes I have designed and run.',
        cases: ['buvn', 'pipeline', 'beuvianCode', 'evalflow', 'rl', 'zentivra'],
        storyEyebrow: 'Training log',
        storyTitle: 'Beating GPT-2 for $1,150.',
        storySub: 'How BUVN-2.0 was trained, in four decisions.',
        story: [
          { k: 'Why', h: 'Understand the layer beneath.', p: 'I had built agents and apps on top of models for years. I wanted to know how a foundation model actually works, so I decided to train one myself on a constrained budget.' },
          { k: 'Architecture', h: 'Modern defaults, small scale.', p: 'A 109.5M-parameter decoder-only transformer: 12 layers, 768 dimensions, 32K vocabulary, 1024 context, with RoPE, RMSNorm and SwiGLU. Nothing exotic. Everything tuned.' },
          { k: 'Throughput', h: 'One H100, two hours.', p: 'An 8-worker streaming data pipeline over 2B C4 tokens kept the GPU fed at 320K tokens per second and 24% MFU. Total spend: $1,150.' },
          { k: 'Result', h: '29.19 perplexity.', p: 'Beats GPT-2 Small, Pythia-160M and GPT-Neo-125M on WikiText-103 with nine times fewer parameters, generating at 204 tokens per second. Now growing into SRVN for code and MNI for finance behind one FastAPI gateway.' }
        ],
        principlesEyebrow: 'Engineering values',
        principlesTitle: 'What good systems have in common.',
        viewsEyebrow: 'Field notes',
        viewsTitle: 'What production AI has taught me.',
        views: [
          { h: 'Zero failures is a design decision.', p: 'The pre-annotation pipeline ran a month on bare-metal H100s without a failure because every stage owned one task and scaled on its own.' },
          { h: 'Evaluation is the product.', p: 'Agents ship when they are scored, red-teamed and benchmarked for hallucination, latency, edge cases and safety, in a tight prompt-test-iterate loop.' },
          { h: 'Cost is a feature.', p: 'Right-sizing AKS, Databricks and storage cut idle GPU spend by about a quarter with no latency regression. Terraform took environment setup from days to under an hour.' },
          { h: 'Control planes beat chat windows.', p: 'Beuvian Code exists because coding agents need supervision, approval and re-prompting from anywhere, not another terminal tab.' }
        ],
        trackEyebrow: 'Deployments',
        trackTitle: 'Where the systems ran.',
        workEyebrow: 'Repositories',
        workTitle: 'Open source and shipped code.',
        workSub: '41 public repositories across models, agents, SaaS, mobile and dev tools.',
        worldEyebrow: 'Field work',
        worldTitle: 'Nine countries of real-world data.',
        worldSub: 'Systems generalise better when their builder has seen more distributions.',
        eduEyebrow: 'Pre-training',
        eduTitle: 'Formal training. Continuous fine-tuning.',
        wantEyebrow: 'Now',
        wantTitle: 'Reinforcement learning and post-training.',
        wantText: 'At Centific I am building RL and post-training alignment workflows: preference-data pipelines, reward-signal design and evaluation harnesses that steer model behaviour to enterprise reliability before release. Outside work, Beuvian grows into a three-model ecosystem.',
        contactEyebrow: 'Open channel',
        contactTitle: 'Open a channel.',
        contactSub: 'Founding AI engineer, applied research, agentic systems, full-stack AI. Chennai-based and ready to relocate anywhere the work is interesting.',
        formPlaceholder: 'Describe the system you need built.',
        formBtn: 'Transmit',
        footerLine: 'Designed and built by hand, like everything else here.'
      }
    },

    /* ================= case-file pool ================= */
    cases: {
      aharyas: {
        kind: 'Consumer D2C · marketplace', title: 'Aharyas',
        what: 'An artisan marketplace connecting rural craftsmen directly to global consumers: handcrafted clothing, toys and decor.',
        role: 'CTO & Head of Logistics, now executive board consultant',
        owned: 'The entire technology stack, the logistics and delivery pipeline, and the first 100+ suppliers, onboarded by visiting their villages.',
        outcome: 'Zero to ~$4,000 MRR. ₹14 Lakh MSME grant. 10K+ monthly visits. Brand endorsed by KTR, former IT Minister of Telangana.',
        status: 'Active · advisory role', tone: 'live', link: L.aharyas, linkText: 'aharyas.com'
      },
      linkyaar: {
        kind: 'Creator economy · SaaS', title: 'LinkYaar + BuyMeAGoddie',
        what: 'A free, open-source link-in-bio platform with 27 themes, scheduling, private analytics and an AI bio writer, plus a zero-fee UPI tipping product.',
        role: 'Founder, CEO and sole builder',
        owned: 'Everything: architecture, full-stack code, payments, deployments, database, design, marketing.',
        outcome: '100+ users in the first week including YC founders, Vietnam Airlines and Paris fashion brands. Tipping rails designed for 27 countries.',
        status: 'Live', tone: 'live', link: L.linkyaar, linkText: 'linkyaar.com', link2: L.goddie, link2Text: 'goddie.linkyaar.com'
      },
      dwel: {
        kind: 'B2B SaaS · sales', title: 'BetterIntegrations / Dwel',
        what: 'Enterprise integrations for the Atlassian Forge and Shopify ecosystems. “Dwel — Time in Status for Jira” is live on the Atlassian Marketplace.',
        role: 'Head of Marketing & board member, paid in base plus vested equity',
        owned: 'The direct B2B pipeline, go-to-market and marketing execution, and a two-person sales team.',
        outcome: '₹10 Cr active pipeline across a 40+ product portfolio with a $4,000 average enterprise ticket.',
        status: 'Selling', tone: 'live', link: L.dwel, linkText: 'Atlassian Marketplace'
      },
      quaicu: {
        kind: 'AI governance · consulting', title: 'Quaicu',
        what: 'An AI governance platform for ERP systems.',
        role: 'Technical consultant',
        owned: 'Optimising internal processes so the team can onboard enterprise clients faster.',
        outcome: 'Engagements at a $20,000 ticket size. Separately landed Tajikistan AI Cell and Swisscom as clients for a consulting practice, and engaged Karnataka AI Cell.',
        status: 'Consulting', tone: 'warm', link: L.quaicu, linkText: 'quaicu.org'
      },
      probiotic: {
        kind: 'Consumer brand · 0 → 1', title: 'Stealth probiotic mixer',
        what: 'A Gen Z consumer health beverage that packages gut health as a lifestyle rather than medicine.',
        role: 'Co-founder & investor, building with my brother',
        owned: 'Strategy, brand positioning, go-to-market and early capital.',
        outcome: 'Supply chain secured. Core formulation and GTM playbook finalised. Pre-launch.',
        status: 'Stealth · pre-launch', tone: 'warm', link: null, linkText: 'Ask me about it'
      },
      kawkaw: {
        kind: 'Hyperlocal delivery · shut down', title: 'KawKaw',
        what: 'A multi-service delivery marketplace for Bhadrachalam, a tier-2 town, with customer, vendor and admin apps.',
        role: 'Founder and sole builder',
        owned: 'The whole stack and live operations, including real fulfilment.',
        outcome: '10+ real orders, then a unit-economics review: order density could not cover fixed logistics cost. Wound down deliberately. Lessons went into Aharyas, LinkYaar and the probiotic brand.',
        status: 'Wound down on purpose', tone: 'dead', link: L.kawkaw, linkText: 'GitHub'
      },
      goddie: {
        kind: 'Creator payments · live', title: 'BuyMeAGoddie',
        what: 'A Buy Me a Coffee alternative where supporters pay creators bank to bank via UPI deep links and QR, so the platform never holds money.',
        role: 'Founder and sole builder',
        owned: 'Product, multi-rail payment architecture, front end and infrastructure.',
        outcome: 'Live on UPI, free forever, built to extend to Pix, PayNow and PromptPay across 27 countries.',
        status: 'Live', tone: 'live', link: L.goddie, linkText: 'goddie.linkyaar.com', link2: L.goddieRepo, link2Text: 'Code'
      },
      routin: {
        kind: 'Mobile · Google Play', title: 'Routin',
        what: 'A Google Tasks alternative: routines, reminders, streaks, statistics and offline-first sync.',
        role: 'Builder and publisher',
        owned: 'Concept to store listing to ongoing maintenance, in Flutter.',
        outcome: 'Published on the Play Store, free and open source.',
        status: 'Live', tone: 'live', link: L.routin, linkText: 'Google Play', link2: L.routinRepo, link2Text: 'Code'
      },
      zypdf: {
        kind: 'Privacy tooling · live', title: 'ZyPDF',
        what: 'A PDF toolkit where every document is processed inside the browser tab and never leaves the device.',
        role: 'Builder',
        owned: 'Client-side processing architecture and the product.',
        outcome: 'Used widely across Turkish universities. Compliant by construction, not by policy.',
        status: 'Live', tone: 'live', link: L.zypdf, linkText: 'zy-pdf.vercel.app'
      },
      lapper: {
        kind: 'Media tooling · client work', title: 'Lapper for BCM10 News',
        what: 'A broadcast overlay studio for text, video, audio and image overlays used on air by a regional news channel, plus the channel’s website.',
        role: 'Builder and consultant',
        owned: 'Tooling that simplified newsroom workflows and reduced human cost, for several media channels.',
        outcome: 'In daily use by a real newsroom.',
        status: 'Live', tone: 'live', link: L.lapper, linkText: 'lapper.vercel.app', link2: L.bcm10, link2Text: 'bcm10news.in'
      },
      beuvianCode: {
        kind: 'Agent control plane · open source', title: 'Beuvian Code',
        what: 'An operating system for AI coding agents: monitor, approve and re-prompt any agent remotely, from WhatsApp, Telegram or a phone call.',
        role: 'Author and maintainer',
        owned: 'Clean-architecture Go with a Fiber REST API, a versioned WebSocket gateway, a desktop supervisor with pluggable adapters and a Next.js dashboard.',
        outcome: 'A 12-table PostgreSQL schema with 47 indexes, Redis state, offline prompt queueing, AES-256-GCM at rest, GitHub OAuth with rotating tokens, distroless images for six platforms. Claude Code adapter shipped; Codex, Gemini CLI, Aider next.',
        status: 'Open source', tone: 'warm', link: L.beuvianCode, linkText: 'GitHub'
      },
      buvn: {
        kind: 'Foundation model · from scratch', title: 'Beuvian / BUVN-2.0',
        what: 'A 109.5M-parameter decoder-only transformer pre-trained on 2B C4 tokens.',
        role: 'Sole author',
        owned: 'Architecture (12 layers, 768 dim, 32K vocab, 1024 context, RoPE, RMSNorm, SwiGLU), the streaming data pipeline, training, evaluation and serving.',
        outcome: '29.19 perplexity on WikiText-103, beating GPT-2 Small, Pythia-160M and GPT-Neo-125M with nine times fewer parameters. One H100, two hours, $1,150.',
        status: 'Open source', tone: 'live', link: L.beuvian, linkText: 'GitHub'
      },
      pipeline: {
        kind: 'Production vision AI · Fortune 100', title: 'GAZE pre-annotation pipeline',
        what: 'A 20+ stage video pipeline on bare-metal H100s with Ray and 16+ models, processing MAG7 client video for world-model training data.',
        role: 'End-to-end owner at Centific',
        owned: 'Prototype to reliable production system, every computer-vision microservice, GPU and Kubernetes right-sizing.',
        outcome: 'A month of non-stop processing with zero production failures. The system behind our team’s NeurIPS 2025 LAW workshop paper. Over 80% less human review.',
        status: 'Production', tone: 'live', link: null, linkText: 'Built at Centific'
      },
      evalflow: {
        kind: 'Agentic AI · evaluation', title: 'Agentic LLM evaluation workflow',
        what: 'A workflow to score, red-team and benchmark agent quality before release.',
        role: 'Designer, with the product team at Centific',
        owned: 'Hallucination, latency, edge-case and safety failure modes across use cases; system prompts iterated in a prompt-test-iterate loop.',
        outcome: 'Agents ship against measured quality instead of demos.',
        status: 'In use', tone: 'live', link: null, linkText: 'Built at Centific'
      },
      rl: {
        kind: 'Reinforcement learning · current', title: 'RL post-training workflows',
        what: 'Preference-data pipelines, reward-signal design and evaluation harnesses that steer model behaviour to enterprise reliability.',
        role: 'Engineer, current charter at Centific',
        owned: 'Data pipelines and evaluation harnesses for post-training alignment.',
        outcome: 'In progress. Fourth charter delivered at Centific after AIOps, Vision AI and Agentic AI.',
        status: 'Building', tone: 'warm', link: null, linkText: 'Built at Centific'
      },
      zentivra: {
        kind: 'Multi-agent system', title: 'Zentivra',
        what: 'An autonomous multi-agent AI radar that monitors, extracts, deduplicates, ranks and summarises frontier-AI news into executive briefings.',
        role: 'Author',
        owned: 'Agent design, LLM tool-calling, FastAPI back end and Next.js 14 front end on Groq-hosted Llama 3.',
        outcome: 'Executive briefings without an analyst in the loop.',
        status: 'Open source', tone: 'warm', link: GH, linkText: 'GitHub'
      }
    },

    /* ================= principles ================= */
    principles: [
      { n: '01', title: 'Prototype first. Then call sales.', desc: 'If it works, it goes straight into the pipeline as a low-impact test with real customers.' },
      { n: '02', title: 'Fail fast, on purpose.', desc: 'Launch, take real orders, read the numbers, decide. KawKaw died in weeks, not years.' },
      { n: '03', title: 'No resources is no excuse.', desc: 'LinkYaar had zero budget and zero team. It shipped in three days.' },
      { n: '04', title: 'If the problem lives elsewhere, fly there.', desc: 'Talk to the relevant people in person. Deal or vacation, both are wins.' },
      { n: '05', title: 'Talk to everyone.', desc: 'Conferences, communities, strangers on the road. Business is the best relationship after family and friendship.' },
      { n: '06', title: 'Take the stand. Fix it on the ground.', desc: 'Refuse the wrong call, then go do the unglamorous work that makes the right one succeed.' }
    ],

    /* ================= track record ================= */
    experience: [
      { date: 'Oct 2024 — Present', current: true, role: 'Associate Application Engineer, AI Product R&D', org: 'Centific, AI Data Foundry · Chennai',
        points: [
          'Four charters delivered for Fortune-100 (MAG7) clients: AIOps/DevOps, Vision AI, Agentic AI and now Reinforcement Learning.',
          'Owned a 20+ stage production video pipeline end to end: thousands of client videos processed with zero production failures; the system behind our team’s GAZE paper at the NeurIPS 2025 LAW workshop, cutting human review by more than 80%.',
          'Designed an agentic LLM evaluation workflow with the product team to score, red-team and benchmark agents before release.',
          'Cut idle GPU and compute spend by about 25% through AKS, Databricks and storage right-sizing; modular Terraform took environment setup from days to under an hour.'
        ] },
      { date: '2024 — Present', role: 'Startup consultant, AI and growth', org: 'BetterIntegrations, Quaicu and others · India and abroad',
        points: [
          'BetterIntegrations / Dwel: head of marketing and board member; run the ₹10 Cr B2B pipeline, $4,000 average ticket, 40+ products, two-person sales team.',
          'Quaicu: technical consulting on AI governance for ERPs at a $20,000 ticket size.',
          'Landed Tajikistan AI Cell and Swisscom as enterprise clients for a consulting engagement; engaged Karnataka AI Cell.'
        ] },
      { date: '2023 — Present', role: 'CTO & Head of Logistics, now executive board consultant', org: 'Aharyas · aharyas.com',
        points: [
          'Founding team from day one. Owned technology, logistics, supplier onboarding, direct sales and growth as a full generalist.',
          'Zero to ~$4,000 MRR. Secured a ₹14 Lakh MSME grant. Built the store to 10K+ monthly visits on Razorpay.',
          'Onboarded 100+ artisans by visiting villages; sold at stalls, forums and trade conferences; earned a brand endorsement from KTR.'
        ] },
      { date: '2026 — Present', role: 'Co-founder, stealth consumer brand', org: 'Gen Z probiotic mixer · with my brother',
        points: ['Positioning, go-to-market and early capital for a consumer health brand. Supply chain secured, formulation finalised, pre-launch.'] },
      { date: 'Aug — Sep 2024', role: 'AI/ML Engineer Intern', org: 'Deepfacts · Hyderabad',
        points: ['Built classifiers detecting Ventricular Ectopic Beats from single-lead ECG (NeuroKit2); engineered signal features that lifted minority-class recall on imbalanced data.'] },
      { date: 'Feb — May 2024', role: 'Research Intern, team lead', org: 'Centre for Human Security Studies · Hyderabad',
        points: ['Led a five-person team researching seaport-security technologies across India; authored “Will LLMs Outscore Traditional Search Engines?”'] },
      { date: 'Nov 2021 — Oct 2022', role: 'AI Research Specialist (part-time)', org: 'Woxsen University, AI Research Centre',
        points: ['Co-authored two white papers on Generative AI and its impact on engineers; produced trend reports for faculty and partners.'] }
    ],

    /* ================= repositories ================= */
    repoFilters: [['all', 'All'], ['live', 'Live products'], ['agentic', 'Agents'], ['ml', 'Models'], ['oss', 'Open source'], ['devtools', 'Dev tools'], ['apps', 'Web and mobile']],
    langColors: { Python: '#3572A5', TypeScript: '#3178C6', JavaScript: '#F1E05A', Kotlin: '#A97BFF', Jupyter: '#DA5B0B', Go: '#00ADD8', Dart: '#00B4AB' },
    repos: [
      { n: 'linkyaar', cat: ['live', 'oss', 'apps'], lang: 'TypeScript', desc: 'Free, open-source Linktree alternative: 27 themes, Theme Studio, AI bio writer, scheduling, private analytics, QR and OG images.', tags: ['Next.js', 'Supabase RLS', 'AGPL-3.0'], link: L.linkyaar, link2: L.linkyaarRepo, badge: 'Live' },
      { n: 'buymeagoddie', cat: ['live', 'oss', 'apps'], lang: 'TypeScript', desc: 'Zero-fee creator tipping over UPI deep links and QR. The platform never holds money. Multi-rail for Pix, PayNow and PromptPay.', tags: ['Next.js 15', 'React 19', 'UPI'], link: L.goddie, link2: L.goddieRepo, badge: 'Live' },
      { n: 'beuvian', cat: ['ml', 'oss'], lang: 'Python', desc: 'Foundation LLM pre-trained from scratch: 109.5M parameters, 2B C4 tokens, one H100, two hours. 29.19 perplexity. SRVN and MNI siblings in progress.', tags: ['PyTorch', 'H100', 'RoPE · SwiGLU'], link: L.beuvian, badge: 'Flagship' },
      { n: 'beuviancode', cat: ['agentic', 'devtools', 'oss'], lang: 'Go', desc: 'Control plane to monitor, approve and re-prompt any AI coding agent remotely. Fiber API, WebSocket gateway, Postgres, Redis, AES-256-GCM.', tags: ['Go', 'WebSockets', 'PostgreSQL'], link: L.beuvianCode, badge: 'Flagship' },
      { n: 'zypdf', cat: ['live', 'oss', 'apps'], lang: 'TypeScript', desc: 'Privacy-by-construction PDF toolkit. Every document is processed in the browser tab. Used widely across Turkish universities.', tags: ['React', 'Client-side WASM'], link: L.zypdf, badge: 'Live' },
      { n: 'routin', cat: ['live', 'oss', 'apps'], lang: 'Dart', desc: 'Google Tasks alternative on the Play Store: routines, reminders, streaks, statistics, offline-first sync.', tags: ['Flutter', 'Play Store'], link: L.routin, link2: L.routinRepo, badge: 'Play Store' },
      { n: 'lapper', cat: ['live', 'apps'], lang: 'TypeScript', desc: 'Broadcast overlay studio for BCM10 News: text, video, audio and image overlays for on-air use.', tags: ['Next.js', 'Media'], link: L.lapper, link2: L.lapperRepo, badge: 'Live' },
      { n: 'bd-fileorganizer', cat: ['oss', 'devtools'], lang: 'Python', desc: 'pip-installable CLI that sorts cluttered directories into typed folders. Seven releases, users across Europe and the US.', tags: ['PyPI', 'CLI', 'GPLv3'], link: L.fileorg, link2: L.fileorgRepo, badge: 'PyPI' },
      { n: 'kawkaw', cat: ['apps'], lang: 'TypeScript', desc: 'Hyperlocal delivery platform for Bhadrachalam: customer, vendor and admin stack, 10+ real orders, wound down on unit economics.', tags: ['Next.js', 'Supabase', 'Fail fast'], link: L.kawkaw, link2: L.kawkawDemo, badge: 'Wound down' },
      { n: 'zentivra', cat: ['agentic', 'ml'], lang: 'Python', desc: 'Multi-agent AI radar that monitors, extracts, dedupes, ranks and summarises frontier-AI news into executive briefings.', tags: ['Next.js 14', 'Groq Llama 3', 'FastAPI'], link: GH, badge: 'Multi-agent' },
      { n: 'pointpilot', cat: ['live', 'apps'], lang: 'TypeScript', desc: 'Ten-module travel-rewards SaaS: award search, value calculator, card optimiser, fare alerts, lounge finder. Free-tier infrastructure.', tags: ['Next.js 15', 'Tailwind', 'Vercel'], link: GH, badge: 'Live' },
      { n: 'hellogpu', cat: ['oss', 'devtools', 'ml'], lang: 'Python', desc: 'Local-first GPU cost monitor that flags idle compute, spend anomalies and untagged resources with plain-English reports.', tags: ['Anomaly detection', 'FastAPI'], link: GH, badge: 'Open source' },
      { n: 'databricks-error-handler', cat: ['devtools'], lang: 'TypeScript', desc: 'Full-stack tool using the Gemini API to diagnose Databricks pipeline failures in plain English.', tags: ['Gemini API', 'Full-stack'], link: GH, badge: 'Dev tool' },
      { n: 'llm-finetuning-eval', cat: ['ml'], lang: 'Jupyter', desc: 'FLAN-T5 and BERT fine-tuned for summarisation on 300K CNN/DailyMail articles; BLEU, ROUGE and BERTScore benchmarks.', tags: ['FLAN-T5', 'BERT'], link: GH, badge: 'Research' },
      { n: 'cervical-cancer-cv', cat: ['ml'], lang: 'Python', desc: 'Five-class Pap-smear classification: YOLOv8 detection plus a fine-tuned ResNet50V2 backbone, team of four.', tags: ['YOLOv8', 'ResNet50V2', 'OpenCV'], link: GH, badge: 'Vision' },
      { n: 'llm-chatbots', cat: ['ml', 'agentic'], lang: 'Python', desc: 'Conversational chatbots on DeepSeek and LLaMA-2 with prompt-engineered system instructions.', tags: ['LLaMA-2', 'DeepSeek'], link: GH, badge: 'Conversational' },
      { n: 'convertly', cat: ['apps'], lang: 'Kotlin', desc: 'Android app for currency, unit, timezone, GPA and file-size conversion with a Gemini-powered assistant.', tags: ['Android', 'Gemini API'], link: GH, badge: 'Android' },
      { n: 'g8-car-race', cat: ['apps'], lang: 'Kotlin', desc: 'A small racing game published on the Play Store.', tags: ['Kotlin', 'Play Store'], link: GH, badge: 'Play Store' },
      { n: 'bcm10news', cat: ['live', 'apps'], lang: 'TypeScript', desc: 'Production website for the BCM10 News channel, one of several newsroom sites shipped in under an hour with AI agents.', tags: ['Next.js', 'Media'], link: L.bcm10, badge: 'Live' },
      { n: 'school-sms-system', cat: ['apps'], lang: 'JavaScript', desc: 'Automated SMS notifications and student ranking for a school, in Angular.js and Cordova.', tags: ['Angular.js', 'Cordova'], link: GH, badge: 'Social impact' }
    ],

    /* ================= world ================= */
    world: {
      countries: [['mk', 'North Macedonia'], ['bh', 'Bahrain'], ['om', 'Oman'], ['tr', 'Türkiye'], ['lk', 'Sri Lanka'], ['my', 'Malaysia'], ['sg', 'Singapore'], ['th', 'Thailand'], ['id', 'Indonesia']],
      facts: [
        { v: '9', l: 'countries visited, five of them solo' },
        { v: '50+', l: 'countries with friends I can call and stay with' },
        { v: '10+', l: 'countries where conversations turned into clients' },
        { v: '20+', l: 'cultures I understand well enough to pitch in' },
        { v: '₹12K', l: 'for a five-day Kuala Lumpur trip in 2024, flights included' },
        { v: '3', l: 'languages: English, Hindi, Telugu' }
      ]
    },

    /* ================= education & recognition ================= */
    education: [
      { title: 'Doctorate (DBA), AI for Business', org: 'ESGCI, Paris', desc: 'How AI systems create measurable business value. Pursued alongside full-time work.', status: '2026 — in progress', hot: true },
      { title: 'MBA', org: 'Completed alongside a full-time engineering role', desc: '', status: '2025 — 2026' },
      { title: 'B.Tech, Artificial Intelligence & Data Science', org: 'Woxsen University, Hyderabad', desc: '', status: '2021 — 2025' },
      { title: 'Exchange semester, AI & Computer Science', org: 'International Balkan University, Skopje', desc: '', status: 'Mar — Jul 2024' }
    ],
    recognition: [
      { title: '3rd nationally, Industrial & Research Conclave, IIT Guwahati', desc: 'Led a microcontroller-based oxygen-adjustment life-support prototype to national recognition. Patent documentation completed.' },
      { title: 'Hackathons', desc: 'BUILD Gen AI Hackathon at MIT (2023), Centific Premier Hackathon (2024), Smart India Hackathon (2022), 3rd prize at the Woxsen Hackathon.' },
      { title: 'Author of “People Inside the Room”', desc: 'A book on communication and business relationships. Written, designed, ISBN registered and published solo, in weeks.', link: L.book, linkText: 'Read it' },
      { title: 'Leadership', desc: 'President of Club Udyogh (entrepreneurship and innovation). TEDx curator and organiser. Debate Club executive. XLRI Model UN delegate (Algeria, 2022). AI & Robotics Club executive.' },
      { title: 'Community', desc: 'Taught computer-science basics to 200+ rural students for free under Woxsen Elevate. Rotaract member. Inter-University Cricket Champion.' },
      { title: 'Writing', desc: 'Two co-authored white papers on Generative AI. Writes on Medium about agents and building.', link: L.medium, linkText: 'Medium' }
    ],

    contactLinks: [
      ['Email', 'bhuvanboddu08@gmail.com', 'mailto:bhuvanboddu08@gmail.com'],
      ['LinkedIn', 'linkedin.com/in/bhuvanboddu', 'https://linkedin.com/in/bhuvanboddu'],
      ['GitHub', 'github.com/bhuvan0808', GH],
      ['Phone', '+91 76708 41357', 'tel:+917670841357'],
      ['LinkYaar', 'linkyaar.com', L.linkyaar]
    ],

    excuses: ['No budget', 'No team', 'Not the right time', 'Market too small', 'Someone already did it', 'Too young for this', 'Needs more research', 'It will not scale', 'Nobody will pay', 'Wait for a co-founder']
  };
})();
