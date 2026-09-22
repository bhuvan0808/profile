/* ------------------------------------------------------------------
   Profile data — single source of truth for every section and mode.
   Order of emphasis everywhere: LinkYaar, BuyMeAGoddie, the probiotic
   brand first; then Aharyas, BetterIntegrations, Quaicu and the rest.
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

    marquee: ['LinkYaar: 100+ users in week one', 'BuyMeAGoddie: rails for 27 countries', 'Gen Z probiotic brand, pre-launch', 'YC founders', 'Vietnam Airlines', 'Paris fashion brands', 'Aharyas endorsed by KTR', 'Swisscom', 'Tajikistan AI Cell', 'Karnataka AI Cell', 'Atlassian Marketplace', 'NeurIPS 2025 LAW workshop', 'Google Play', 'PyPI', 'Turkish universities on ZyPDF'],

    quote: {
      text: 'What is felt within appears as a phenomenon outside.',
      by: 'The line from the first book I ever read. I have been testing it against reality ever since.'
    },

    /* ================= per-mode copy ================= */
    modes: {
      founder: {
        label: 'Founder',
        world: 'Gotham',
        eyebrow: 'Founder · Consumer & D2C · 0 → 1',
        title: ['I build consumer', 'businesses from', 'the ground up.'],
        sub: 'Solo founder of LinkYaar and BuyMeAGoddie, co-founder of a stealth Gen Z probiotic brand, founding CTO at Aharyas, board member at BetterIntegrations. Twenty-two, raised in rural South India, and I have never met a stranger I could not start a conversation with.',
        cta1: { t: 'Open the case files', h: '#cases' },
        cta2: { t: 'Light the signal', h: '#contact' },
        stats: [
          { v: 100, suf: '+', l: 'LinkYaar users in week one, built solo in three days' },
          { v: 27, l: 'countries BuyMeAGoddie’s zero-fee rails are built for' },
          { v: 1, l: 'consumer brand in stealth, launching with my brother' },
          { v: 4, pre: '~$', suf: 'K', l: 'monthly revenue built from zero at Aharyas' }
        ],
        casesEyebrow: 'Case files',
        casesTitle: 'Every venture. Equal weight.',
        casesSub: 'Six things I have built, sold or shut down. Each one taught me something the next one used.',
        cases: ['linkyaar', 'goddie', 'probiotic', 'aharyas', 'dwel', 'quaicu'],
        storyEyebrow: 'How it actually went',
        storyTitle: 'Zero budget. Real users. Then a brand.',
        storySub: 'Four decisions, from LinkYaar to the brand my brother and I are building.',
        story: [
          { k: 'LinkYaar', h: 'Do not wait. Build it.', p: 'I wanted a free, open-source alternative to Linktree with every premium feature and no ransom. I had no money and nobody to hire, so I taught myself the full stack and shipped linkyaar.com in about three days. 100+ users in the first week, including YC founders, Vietnam Airlines and Paris fashion brands.' },
          { k: 'BuyMeAGoddie', h: 'Listen to the pull.', p: 'Creators loved their pages and immediately asked how to accept tips. Paid gateways were too expensive and too foreign, so I built BuyMeAGoddie: UPI deep links and QR, bank to bank, zero fee forever, with rails designed for 27 countries.' },
          { k: 'The brand', h: 'Healthy but boring is the gap.', p: 'My generation wants gut health packaged like a lifestyle, not medicine. With my brother I am building a Gen Z probiotic mixer from day zero: formulation locked, supply chain secured, go-to-market playbook written.' },
          { k: 'Aharyas', h: 'Fix it on the ground.', p: 'At Aharyas the code was easy and the ground was not. Vendors failed pickups and artisans did not trust the platform. I refused to buy inventory upfront, found local transport myself, and sat with artisans in Telugu until they trusted us. 100+ suppliers, a ₹14 Lakh grant, roughly $4K a month.' }
        ],
        principlesEyebrow: 'How I operate',
        principlesTitle: 'Rules I did not read in a book.',
        viewsEyebrow: 'Market instinct',
        viewsTitle: 'What I believe about Indian consumers.',
        views: [
          { h: 'Payments must feel native.', p: 'BuyMeAGoddie works because it is UPI-first and zero-fee. Western gateways add friction Indians will not tolerate for a tip.' },
          { h: 'Healthy but boring is the white space.', p: 'Gen Z wants gut health packaged like a lifestyle, not medicine. That is the brand my brother and I are building.' },
          { h: 'India is not one market.', p: 'KawKaw taught me that tier-2 consumers call the shop they trust unless convenience is undeniable. Metro playbooks do not copy-paste.' },
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

      consultant: {
        label: 'Consultant',
        world: 'The corner office',
        eyebrow: 'Consultant · AI and growth · Cross-border sales',
        title: ['I don’t pitch.', 'I close.'],
        sub: 'Growth and AI consultant to startups and enterprises. I took LinkYaar to 100+ users in a week with zero ad spend, built BuyMeAGoddie’s go-to-market for 27 countries, wrote the playbook for a Gen Z brand, and run a ₹10 Cr B2B pipeline at BetterIntegrations. Clients in ten countries. Equity, because I want skin in the game.',
        cta1: { t: 'See the engagements', h: '#cases' },
        cta2: { t: 'Name your terms', h: '#contact' },
        stats: [
          { v: 100, suf: '+', l: 'LinkYaar users in week one, zero ad spend' },
          { v: 27, l: 'countries in the BuyMeAGoddie go-to-market' },
          { v: 10, pre: '₹', suf: ' Cr', l: 'B2B pipeline I run at BetterIntegrations' },
          { v: 10, suf: '+', l: 'countries where conversations became clients' }
        ],
        casesEyebrow: 'Engagements',
        casesTitle: 'Growth work with receipts.',
        casesSub: 'Products I grew, boards I sit on, deals I closed.',
        cases: ['linkyaar', 'goddie', 'probiotic', 'dwel', 'quaicu', 'consulting'],
        storyEyebrow: 'How I close',
        storyTitle: 'The pitch is the last ten percent.',
        storySub: 'Four moves, in the order they actually happen.',
        story: [
          { k: 'Listen', h: 'Walk into the market first.', p: 'Before a single slide, I sit in the cafe, the trade stall, the founder’s office. Nine countries, fifty-plus places to stay, and every trip starts with a list of people whose problems I might solve.' },
          { k: 'Read the room', h: 'Every market has a tell.', p: 'I understand twenty-plus cultures well enough to know what each values: price in one, relationship in another, speed in a third. The pitch changes. The product usually does not.' },
          { k: 'Skin in the game', h: 'Equity over invoices.', p: 'At BetterIntegrations I took base plus vested equity to run the pipeline and sit on the board. If I do not believe enough to own a piece, I should not be selling it.' },
          { k: 'Close', h: 'Then deliver the thing you sold.', p: 'Tajikistan AI Cell and Swisscom signed. Quaicu engagements at a $20,000 ticket. A ₹10 Cr pipeline across 40+ products. And because I build, the demo is real before the contract is dry.' }
        ],
        principlesEyebrow: 'House rules',
        principlesTitle: 'How I run a room.',
        viewsEyebrow: 'Notes from the table',
        viewsTitle: 'What closing has taught me.',
        views: [
          { h: 'Prototype, then sell.', p: 'Every idle thought becomes a prototype. If it works it goes straight into the CRM as a low-impact test with real customers. Slides come last.' },
          { h: 'Distribution is a product.', p: 'LinkYaar took three days to build and longer to market. Communities, founders and cold conversations did what ads never could.' },
          { h: 'Native beats imported.', p: 'BuyMeAGoddie won on UPI, not on a Western gateway. Sell the way the market already pays.' },
          { h: 'Say no early.', p: 'KawKaw had real orders and bad unit economics. I shut it down in weeks. A good consultant kills the wrong deal faster than the wrong client would.' }
        ],
        trackEyebrow: 'Engagements',
        trackTitle: 'Where I have sat at the table.',
        workEyebrow: 'The portfolio',
        workTitle: 'Products I can put on the table.',
        workSub: 'Live products and open-source work I bring into every engagement.',
        worldEyebrow: 'Territory',
        worldTitle: 'Ten markets. One playbook.',
        worldSub: 'Nine countries visited, five solo, clients in ten. Deal or vacation, both are wins.',
        eduEyebrow: 'Credentials',
        eduTitle: 'Degrees earned on the side.',
        wantEyebrow: 'The ask',
        wantTitle: 'Bring me a room and a problem.',
        wantText: 'Advisory, growth retainers, board seats, a single hard closing. I take engagements where I can own an outcome, and I like a piece of the upside. If the problem is real and the people are serious, I am in the room tomorrow.',
        contactEyebrow: 'Terms',
        contactTitle: 'Name your terms.',
        contactSub: 'Retainer, advisory, board seat or one closing. Tell me the terms and I will tell you if I am in.',
        formPlaceholder: 'The engagement, the market, the number.',
        formBtn: 'Send the terms',
        footerLine: 'Goals, not dreams.'
      },

      engineer: {
        label: 'AI Engineer',
        world: 'Stark',
        eyebrow: 'AI Engineer · Foundation models · Agents · Production',
        title: ['Trained the model.', 'Built the pipeline.', 'Shipped the agents.'],
        sub: 'Shipped LinkYaar and BuyMeAGoddie solo, end to end. Pre-trained a 109.5M-parameter LLM from scratch on one H100 that beats GPT-2 Small with nine times fewer parameters. Built the 20-stage vision pipeline behind a NeurIPS 2025 paper that ran a month with zero failures. Now building RL post-training workflows for Fortune-100 clients at Centific.',
        cta1: { t: 'Inspect the systems', h: '#cases' },
        cta2: { t: 'Open a channel', h: '#contact' },
        stats: [
          { v: 100, suf: '+', l: 'LinkYaar users in week one on a stack I built alone' },
          { v: 109.5, dec: 1, suf: 'M', l: 'parameters, trained from scratch on one H100' },
          { v: 29.19, dec: 2, l: 'perplexity on WikiText-103. GPT-2 Small: 29.41' },
          { v: 80, suf: '%', l: 'less human review for MAG7 clients' }
        ],
        casesEyebrow: 'Systems',
        casesTitle: 'From weights to production.',
        casesSub: 'Products, models, pipelines and control planes I have designed and run.',
        cases: ['linkyaar', 'goddie', 'buvn', 'pipeline', 'beuvianCode', 'evalflow'],
        storyEyebrow: 'Training log',
        storyTitle: 'Beating GPT-2 for $1,150.',
        storySub: 'How BUVN-2.0 was trained, in four decisions.',
        story: [
          { k: 'Why', h: 'Understand the layer beneath.', p: 'I had shipped products like LinkYaar and agents on top of models for years. I wanted to know how a foundation model actually works, so I decided to train one myself on a constrained budget.' },
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
      linkyaar: {
        kind: 'Creator economy · SaaS', title: 'LinkYaar',
        what: 'A free, open-source link-in-bio platform: 27 themes and a Theme Studio, drag-and-drop scheduling, private analytics, email capture, an AI bio writer, QR and dynamic OG images, full self-hosting.',
        role: 'Founder, CEO and sole builder',
        owned: 'Everything: architecture, full-stack code, deployments, database, design, distribution.',
        outcome: 'Built and launched in about three days. 100+ users in the first week including YC founders, Vietnam Airlines and Paris fashion brands, at zero ad spend.',
        status: 'Live', tone: 'live', link: L.linkyaar, linkText: 'linkyaar.com', link2: L.linkyaarRepo, link2Text: 'Code'
      },
      goddie: {
        kind: 'Creator payments · zero fee', title: 'BuyMeAGoddie',
        what: 'A Buy Me a Coffee alternative where supporters pay creators bank to bank over UPI deep links and QR, so the platform never receives, holds or routes money.',
        role: 'Founder and sole builder',
        owned: 'Product, multi-rail payment architecture, front end, infrastructure and go-to-market.',
        outcome: 'Live on UPI, free forever, built to extend to Pix, PayNow and PromptPay across 27 countries. Born from what LinkYaar users asked for.',
        status: 'Live', tone: 'live', link: L.goddie, linkText: 'goddie.linkyaar.com', link2: L.goddieRepo, link2Text: 'Code'
      },
      probiotic: {
        kind: 'Consumer brand · 0 → 1', title: 'Stealth probiotic mixer',
        what: 'A Gen Z consumer health beverage that packages gut health as a lifestyle rather than medicine.',
        role: 'Co-founder and investor, building with my brother',
        owned: 'Strategy, brand positioning, go-to-market playbook and early capital.',
        outcome: 'Core formulation finalised. Supply chain secured. GTM playbook written. Pre-launch.',
        status: 'Stealth · pre-launch', tone: 'warm', link: null, linkText: 'Ask me about it'
      },
      aharyas: {
        kind: 'Consumer D2C · marketplace', title: 'Aharyas',
        what: 'An artisan marketplace connecting rural craftsmen directly to global consumers: handcrafted clothing, toys and decor.',
        role: 'CTO and Head of Logistics, now executive board consultant',
        owned: 'The technology stack, the logistics and delivery pipeline, and the first 100+ suppliers, onboarded by visiting their villages.',
        outcome: 'Zero to ~$4,000 MRR. ₹14 Lakh MSME grant. 10K+ monthly visits. Brand endorsed by KTR, former IT Minister of Telangana.',
        status: 'Active · advisory role', tone: 'live', link: L.aharyas, linkText: 'aharyas.com'
      },
      dwel: {
        kind: 'B2B SaaS · sales', title: 'BetterIntegrations / Dwel',
        what: 'Enterprise integrations for the Atlassian Forge and Shopify ecosystems. “Dwel — Time in Status for Jira” is live on the Atlassian Marketplace.',
        role: 'Head of Marketing and board member, base plus vested equity',
        owned: 'The direct B2B pipeline, go-to-market and marketing execution, and a two-person sales team.',
        outcome: '₹10 Cr active pipeline across a 40+ product portfolio with a $4,000 average enterprise ticket.',
        status: 'Selling', tone: 'live', link: L.dwel, linkText: 'Atlassian Marketplace'
      },
      quaicu: {
        kind: 'AI governance · consulting', title: 'Quaicu',
        what: 'An AI governance platform for ERP systems.',
        role: 'Technical consultant',
        owned: 'Optimising internal processes so the team can onboard enterprise clients faster.',
        outcome: 'Engagements at a $20,000 ticket size.',
        status: 'Consulting', tone: 'warm', link: L.quaicu, linkText: 'quaicu.org'
      },
      consulting: {
        kind: 'Enterprise clients · cross-border', title: 'Enterprise consulting',
        what: 'AI and growth consulting for a delivery practice and for media companies.',
        role: 'Consultant and closer',
        owned: 'Client acquisition across markets, the pitch for each culture, and tooling for newsrooms such as Lapper for BCM10 News.',
        outcome: 'Landed Tajikistan AI Cell and Swisscom as clients, engaged Karnataka AI Cell, and won conversations-to-clients in ten countries.',
        status: 'Ongoing', tone: 'warm', link: L.lapper, linkText: 'lapper.vercel.app'
      },
      kawkaw: {
        kind: 'Hyperlocal delivery · shut down', title: 'KawKaw',
        what: 'A multi-service delivery marketplace for Bhadrachalam, a tier-2 town, with customer, vendor and admin apps.',
        role: 'Founder and sole builder',
        owned: 'The whole stack and live operations, including real fulfilment.',
        outcome: '10+ real orders, then a unit-economics review: order density could not cover fixed logistics cost. Wound down deliberately.',
        status: 'Wound down on purpose', tone: 'dead', link: L.kawkaw, linkText: 'GitHub'
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
      beuvianCode: {
        kind: 'Agent control plane · open source', title: 'Beuvian Code',
        what: 'An operating system for AI coding agents: monitor, approve and re-prompt any agent remotely, from WhatsApp, Telegram or a phone call.',
        role: 'Author and maintainer',
        owned: 'Clean-architecture Go with a Fiber REST API, a versioned WebSocket gateway, a desktop supervisor with pluggable adapters and a Next.js dashboard.',
        outcome: 'A 12-table PostgreSQL schema with 47 indexes, Redis state, offline prompt queueing, AES-256-GCM at rest, GitHub OAuth with rotating tokens, distroless images for six platforms.',
        status: 'Open source', tone: 'warm', link: L.beuvianCode, linkText: 'GitHub'
      },
      evalflow: {
        kind: 'Agentic AI · evaluation', title: 'Agentic LLM evaluation workflow',
        what: 'A workflow to score, red-team and benchmark agent quality before release.',
        role: 'Designer, with the product team at Centific',
        owned: 'Hallucination, latency, edge-case and safety failure modes across use cases; system prompts iterated in a prompt-test-iterate loop.',
        outcome: 'Agents ship against measured quality instead of demos.',
        status: 'In use', tone: 'live', link: null, linkText: 'Built at Centific'
      }
    },

    /* ================= deals the term sheet cycles through ================= */
    deals: [
      { client: 'LinkYaar', scope: 'Zero-budget launch · communities and founders', terms: 'Three days to build. A week to 100+ users.', value: 'Zero ad spend' },
      { client: 'BuyMeAGoddie', scope: 'Go-to-market · UPI-first creator payments', terms: 'Free forever. Rails for 27 countries.', value: 'Live on UPI' },
      { client: 'Gen Z probiotic brand', scope: 'Positioning · GTM playbook · supply chain', terms: 'Co-founder and investor with my brother.', value: 'Pre-launch' },
      { client: 'BetterIntegrations', scope: 'Head of Marketing · board member · B2B pipeline', terms: 'Base plus vested equity. Skin in the game.', value: '₹10 Cr pipeline' },
      { client: 'Quaicu', scope: 'AI governance for ERPs · onboarding process', terms: 'Technical consulting engagement.', value: '$20,000 ticket' },
      { client: 'Swisscom', scope: 'Enterprise AI consulting · landed for a delivery practice', terms: 'Closed cross-border.', value: 'Signed' },
      { client: 'Tajikistan AI Cell', scope: 'Government AI programme · consulting', terms: 'Closed cross-border.', value: 'Signed' },
      { client: 'BCM10 News', scope: 'Newsroom tooling · Lapper overlay studio · website', terms: 'Built and delivered in days.', value: 'On air daily' }
    ],

    /* ================= principles ================= */
    principles: [
      { n: '01', title: 'Prototype first. Then call sales.', desc: 'If it works, it goes straight into the pipeline as a low-impact test with real customers.' },
      { n: '02', title: 'No resources is no excuse.', desc: 'LinkYaar had zero budget and zero team. It shipped in three days.' },
      { n: '03', title: 'Fail fast, on purpose.', desc: 'Launch, take real orders, read the numbers, decide. KawKaw died in weeks, not years.' },
      { n: '04', title: 'If the problem lives elsewhere, fly there.', desc: 'Talk to the relevant people in person. Deal or vacation, both are wins.' },
      { n: '05', title: 'Talk to everyone.', desc: 'Conferences, communities, strangers on the road. Business is the best relationship after family and friendship.' },
      { n: '06', title: 'Take the stand. Fix it on the ground.', desc: 'Refuse the wrong call, then go do the unglamorous work that makes the right one succeed.' }
    ],

    /* ================= track record ================= */
    experience: [
      { date: '2024 — Present', current: true, role: 'Founder, LinkYaar and BuyMeAGoddie', org: 'linkyaar.com · goddie.linkyaar.com',
        points: [
          'Built LinkYaar solo in about three days: Next.js, Supabase with row-level security, Upstash Redis, Google OAuth, Resend, PostHog, Sentry, CI/CD. 100+ users in the first week.',
          'Built BuyMeAGoddie when users asked for tips: zero-fee UPI tipping with rails designed for 27 countries.'
        ] },
      { date: '2026 — Present', role: 'Co-founder, stealth consumer brand', org: 'Gen Z probiotic mixer · with my brother',
        points: ['Positioning, go-to-market and early capital for a consumer health brand. Supply chain secured, formulation finalised, pre-launch.'] },
      { date: 'Oct 2024 — Present', current: true, role: 'Associate Application Engineer, AI Product R&D', org: 'Centific, AI Data Foundry · Chennai',
        points: [
          'Four charters delivered for Fortune-100 (MAG7) clients: AIOps/DevOps, Vision AI, Agentic AI and now Reinforcement Learning.',
          'Owned a 20+ stage production video pipeline end to end: thousands of client videos processed with zero production failures; the system behind our team’s GAZE paper at the NeurIPS 2025 LAW workshop, cutting human review by more than 80%.',
          'Designed an agentic LLM evaluation workflow with the product team to score, red-team and benchmark agents before release.',
          'Cut idle GPU and compute spend by about 25% through AKS, Databricks and storage right-sizing; modular Terraform took environment setup from days to under an hour.'
        ] },
      { date: '2023 — Present', role: 'CTO and Head of Logistics, now executive board consultant', org: 'Aharyas · aharyas.com',
        points: [
          'Founding team from day one. Owned technology, logistics, supplier onboarding, direct sales and growth as a full generalist.',
          'Zero to ~$4,000 MRR. Secured a ₹14 Lakh MSME grant. Built the store to 10K+ monthly visits on Razorpay.',
          'Onboarded 100+ artisans by visiting villages; sold at stalls, forums and trade conferences; earned a brand endorsement from KTR.'
        ] },
      { date: '2024 — Present', role: 'Consultant, AI and growth', org: 'BetterIntegrations, Quaicu and others · India and abroad',
        points: [
          'BetterIntegrations / Dwel: head of marketing and board member; run the ₹10 Cr B2B pipeline, $4,000 average ticket, 40+ products, two-person sales team.',
          'Quaicu: technical consulting on AI governance for ERPs at a $20,000 ticket size.',
          'Landed Tajikistan AI Cell and Swisscom as enterprise clients for a consulting engagement; engaged Karnataka AI Cell.'
        ] },
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
      { title: 'Author of “People Inside the Room”', desc: 'A book on communication and business relationships. Written, designed, ISBN registered and published solo, in weeks.', link: L.book, linkText: 'Read it' },
      { title: '3rd nationally, Industrial & Research Conclave, IIT Guwahati', desc: 'Led a microcontroller-based oxygen-adjustment life-support prototype to national recognition. Patent documentation completed.' },
      { title: 'Hackathons', desc: 'BUILD Gen AI Hackathon at MIT (2023), Centific Premier Hackathon (2024), Smart India Hackathon (2022), 3rd prize at the Woxsen Hackathon.' },
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

    jarvis: 'Good evening. Systems online. Welcome to Bhuvan’s workshop. The reactor is yours.'
  };
})();
