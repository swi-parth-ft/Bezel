const fs = require('fs');
const path = require('path');
const siteUrl = 'https://bezelstudio.app';

const guides = [
  {
    path: '/guides/create-first-app-store-screenshot-project.html',
    title: 'How to create your first App Store screenshot project on iPhone.',
    description: 'Build the project foundation with frame setup, canvas sizing, styling, and export.',
  },
  {
    path: '/guides/make-clean-iphone-mockup.html',
    title: 'How to make a clean iPhone mockup from a raw screenshot.',
    description: 'Turn a raw screenshot into a polished device mockup with framing, copy, and export.',
  },
  {
    path: '/guides/build-full-app-store-screenshot-set.html',
    title: 'How to build a full App Store screenshot set in one project.',
    description: 'Scale one canvas into a complete campaign set with review and batch export.',
  },
  {
    path: '/guides/localize-screenshot-sets-apple-translate.html',
    title: 'How to localize screenshot sets with Apple Translate.',
    description: 'Translate a complete screenshot set without rebuilding each canvas by hand.',
  },
  {
    path: '/guides/create-app-store-preview-visuals-canvas-motion.html',
    title: 'How to create App Store preview visuals with Canvas Motion.',
    description: 'Extend a still composition into motion with keyframes, timing, and export.',
  },
  {
    path: '/guides/make-instant-mockups-with-shortcuts.html',
    title: 'How to make instant mockups with Quick Mockups and Shortcuts.',
    description: 'Automate repeatable mockup output with presets, Shortcuts, and one-tap generation.',
  },
];

const guideByPath = new Map(guides.map((guide) => [guide.path, guide]));

const guidePathsByFeature = {
  'device-frames': [
    '/guides/make-clean-iphone-mockup.html',
    '/guides/create-first-app-store-screenshot-project.html',
  ],
  'canvas-styling': [
    '/guides/create-first-app-store-screenshot-project.html',
    '/guides/make-clean-iphone-mockup.html',
  ],
  typography: [
    '/guides/create-first-app-store-screenshot-project.html',
    '/guides/make-clean-iphone-mockup.html',
  ],
  'images-stickers': [
    '/guides/make-clean-iphone-mockup.html',
    '/guides/build-full-app-store-screenshot-set.html',
  ],
  'draw-doodle': [
    '/guides/make-clean-iphone-mockup.html',
    '/guides/build-full-app-store-screenshot-set.html',
  ],
  translation: [
    '/guides/localize-screenshot-sets-apple-translate.html',
    '/guides/build-full-app-store-screenshot-set.html',
  ],
  'layers-precision': [
    '/guides/build-full-app-store-screenshot-set.html',
    '/guides/create-first-app-store-screenshot-project.html',
  ],
  'projects-presets': [
    '/guides/create-first-app-store-screenshot-project.html',
    '/guides/build-full-app-store-screenshot-set.html',
  ],
  'export-share': [
    '/guides/build-full-app-store-screenshot-set.html',
    '/guides/create-app-store-preview-visuals-canvas-motion.html',
  ],
  'canvas-motion': [
    '/guides/create-app-store-preview-visuals-canvas-motion.html',
    '/guides/build-full-app-store-screenshot-set.html',
  ],
  'bezel-ai-shortcuts': [
    '/guides/make-instant-mockups-with-shortcuts.html',
    '/guides/create-first-app-store-screenshot-project.html',
  ],
  'copy-paste-projects': [
    '/guides/build-full-app-store-screenshot-set.html',
    '/guides/create-first-app-store-screenshot-project.html',
  ],
  'transforms-3-axis': [
    '/guides/build-full-app-store-screenshot-set.html',
    '/guides/make-clean-iphone-mockup.html',
  ],
  'undo-redo': [
    '/guides/create-first-app-store-screenshot-project.html',
    '/guides/build-full-app-store-screenshot-set.html',
  ],
};

function getRelatedGuides(featureId) {
  const paths = guidePathsByFeature[featureId] || [
    '/guides/create-first-app-store-screenshot-project.html',
    '/guides/build-full-app-store-screenshot-set.html',
  ];

  return paths
    .map((path) => guideByPath.get(path))
    .filter(Boolean);
}

function renderRelatedGuides(featureId) {
  const relatedGuides = getRelatedGuides(featureId);

  return `
    <section class="relative z-10 w-full max-w-5xl px-6 mx-auto mt-20 reveal" style="animation-delay: 360ms;">
      <div class="rounded-[2rem] border border-zinc-200/80 bg-white/85 px-6 py-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-white/5 md:px-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">Keep Exploring</p>
            <h2 class="mt-3 text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Related guides for this feature</h2>
            <p class="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">These tutorials deepen the workflow behind ${featureId.replace(/-/g, ' ')} so the feature page can pass users and crawlers into the stronger how-to cluster.</p>
          </div>
          <a href="/guides/" class="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-300">
            Browse all guides
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-2">
          ${relatedGuides.map((guide) => `
            <a href="${guide.path}" class="block rounded-[1.5rem] border border-zinc-200/80 bg-zinc-50/90 px-5 py-5 transition-all hover:-translate-y-1 hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-zinc-950/40 dark:hover:border-blue-400/60 dark:hover:bg-zinc-950/70">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Guide</p>
              <h3 class="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">${guide.title}</h3>
              <p class="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">${guide.description}</p>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderFeatureJourney(data) {
  if (!Array.isArray(data.related_features) || data.related_features.length === 0) {
    return '';
  }

  const guideHref = data.guide_cta_href || '/guides/';
  const guideLabel = data.guide_cta_label || 'Browse the App Store screenshot guides';
  const primaryCtaText = data.primary_cta_text || 'Get Bezel Studio';

  return `
    <section class="relative z-10 w-full max-w-5xl px-6 mx-auto mt-12 reveal" style="animation-delay: 420ms;">
      <div class="rounded-[2rem] border border-zinc-200/80 bg-zinc-50/90 px-6 py-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.28)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/50 md:px-8">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">Launch Path</p>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-zinc-900 dark:text-white">${data.feature_journey_heading || 'Turn this feature into a complete launch workflow.'}</h2>
          <p class="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">${data.feature_journey_body || 'Use these related feature pages to move from one commercial job-to-be-done into the next without dropping back to the homepage.'}</p>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-2">
          ${data.related_features.map((feature) => `
            <a href="${feature.href}" class="block rounded-[1.5rem] border border-zinc-200/80 bg-white/90 px-5 py-5 transition-all hover:-translate-y-1 hover:border-blue-300 hover:bg-white dark:border-white/10 dark:bg-zinc-950/60 dark:hover:border-blue-400/60 dark:hover:bg-zinc-950/80">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Feature</p>
              <h3 class="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">${feature.title}</h3>
              <p class="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">${feature.description}</p>
            </a>
          `).join('')}
        </div>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="https://apps.apple.com/in/app/app-screenshot-studio-bezel/id6758039031" class="inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500">
            <img src="/assets/brand/app-store-logo.svg" alt="App Store" class="h-5 w-5 brightness-0 invert">
            ${primaryCtaText}
          </a>
          <a href="${guideHref}" class="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/80 bg-white/75 px-6 py-3 text-base font-semibold text-zinc-900 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400/60 dark:hover:bg-white/[0.08]">
            ${guideLabel}
          </a>
        </div>
      </div>
    </section>
  `;
}

function renderFeatureConversionCta(data) {
  if (!data.primary_cta_text) {
    return '';
  }

  const heading = data.conversion_heading || 'Try this workflow in the native iPhone and iPad app.';
  const body = data.conversion_body || 'Move from the feature page into the actual Bezel Studio workflow while the launch context is still fresh.';
  const points = Array.isArray(data.conversion_points) && data.conversion_points.length > 0
    ? data.conversion_points
    : [
        'Native iPhone and iPad workflow',
        'Templates, styling, and export stay in one project',
        'Launch-ready App Store assets without a browser toolchain',
      ];

  return `
    <section class="relative z-10 w-full max-w-5xl px-6 mx-auto mt-12 reveal" style="animation-delay: 340ms;">
      <div class="rounded-[2rem] border border-zinc-200/80 bg-blue-50/80 px-6 py-8 shadow-[0_30px_80px_-50px_rgba(37,99,235,0.35)] backdrop-blur dark:border-blue-400/20 dark:bg-blue-500/[0.08] md:px-8">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700 dark:text-blue-300">Install The Workflow</p>
          <h2 class="mt-3 text-3xl font-black tracking-tight text-zinc-900 dark:text-white">${heading}</h2>
          <p class="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">${body}</p>
        </div>
        <div class="mt-6 grid gap-3 md:grid-cols-3">
          ${points.map((point) => `
            <div class="rounded-[1.25rem] border border-blue-200/70 bg-white/90 px-4 py-4 text-sm font-medium leading-6 text-zinc-700 shadow-sm dark:border-blue-300/15 dark:bg-zinc-950/60 dark:text-zinc-200">
              ${point}
            </div>
          `).join('')}
        </div>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="https://apps.apple.com/in/app/app-screenshot-studio-bezel/id6758039031" class="inline-flex items-center justify-center gap-3 rounded-full bg-zinc-900 px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
            <img src="/assets/brand/app-store-logo.svg" alt="App Store" class="h-5 w-5 dark:invert">
            ${data.primary_cta_text}
          </a>
          <a href="${data.guide_cta_href || '/guides/'}" class="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/80 bg-white/85 px-6 py-3 text-base font-semibold text-zinc-900 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-blue-400/60 dark:hover:bg-white/[0.08]">
            ${data.guide_cta_label || 'Browse the App Store screenshot guides'}
          </a>
        </div>
      </div>
    </section>
  `;
}

// Content expanded with SEO keywords like "app store screenshot maker", "iPhone mockup generator", etc.
const features = [
  {
    id: "device-frames",
    title: "iPhone Mockup Generator & Device Frames | Bezel Studio",
    headline: "Photorealistic Device Frames",
    desc: "Generate iPhone mockups, iPad device frames, and App Store-ready Apple hardware layouts without leaving your iPhone or iPad.",
    seo_keywords: "iPhone mockup generator, app store screenshot maker, device mockups, high-quality iPhone mockups, 3D iPhone mockup generator",
    hero_cta_text: "Get the iPhone mockup generator",
    primary_cta_text: "Download Bezel Studio for device mockups",
    guide_cta_href: "/guides/make-clean-iphone-mockup.html",
    guide_cta_label: "Follow the clean iPhone mockup guide",
    conversion_heading: "Build the iPhone mockup in the same native workflow you ship from.",
    conversion_body: "Device-frame visitors are usually evaluating tools, not browsing casually. Install Bezel Studio while the screenshot, template, and export workflow is still top of mind.",
    conversion_points: [
      "Native iPhone and iPad editor for framed App Store screenshots",
      "Apple device mockups, caption styling, and layout edits in one file",
      "Reuse the polished frame setup as the next launch template",
    ],
    feature_journey_heading: "Build the mockup, then template and export it.",
    feature_journey_body: "People who land on device frames are already close to buying intent. Keep that journey moving into reusable templates and final export instead of sending them back to the homepage.",
    related_features: [
      {
        href: "/features/projects-presets.html",
        title: "App screenshot templates and project presets",
        description: "Save framed layouts as reusable starting points so the next launch begins from a tested template instead of a blank project.",
      },
      {
        href: "/features/export-share.html",
        title: "Batch export App Store screenshots and preview videos",
        description: "Turn polished iPhone mockups into delivery-ready screenshots, localized batches, and preview assets for App Store Connect.",
      },
    ],
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">The Best iPhone Mockup Generator for iOS Apps</h2>
      <p class="mb-6">
        When building your App Store presence, standard device screens aren't enough. Our <strong>iPhone mockup generator</strong> provides photorealistic, high-quality device frames that elevate your app's presentation. From the latest iPhone models to iPad and Apple Watch, Bezel Studio acts as your complete <strong>app store screenshot maker</strong>.
      </p>
      <p class="mb-6">
        Because the frames live inside the same editor as backgrounds, captions, stickers, and export controls, you can turn one raw screenshot into a polished App Store mockup without bouncing between browser generators, PSD templates, and desktop apps.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Why Frame Your Screenshots?</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Boost App Conversions:</strong> Users trust professional, high-quality iPhone mockups over raw screenshots.</li>
        <li><strong>Customizable Templates:</strong> Drop your app imagery into our customizable iPhone mockups with a single tap.</li>
        <li><strong>No Watermarks:</strong> Generate pristine, 4K device mockups ready for App Store Connect.</li>
      </ul>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Where device frames help most</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Store listing screenshots:</strong> Build framed iPhone and iPad visuals that feel consistent across the whole set.</li>
        <li><strong>Social launch assets:</strong> Reuse the same Apple hardware compositions for X, Product Hunt, and release posts.</li>
        <li><strong>Client or team reviews:</strong> Share polished device mockups instead of raw screenshots when approvals depend on presentation quality.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/device-frames.webp",
    ipad_shot: "/assets/feature-platforms/ipad/device-frames.webp",
    iphone_visual_alt: "Framed iPhone App Store screenshot mockup in Bezel Studio",
    ipad_visual_alt: "Framed iPad App Store screenshot mockup in Bezel Studio",
  },
  {
    id: "canvas-styling",
    title: "App Screenshot Backgrounds & Canvas Styling | Bezel Studio",
    headline: "Dynamic Canvas Styling",
    desc: "Enhance your App Store optimization (ASO) with custom screenshot backgrounds, gradients, and intense lighting effects.",
    seo_keywords: "app store screenshot design, custom app screenshots, app store optimization screenshots, screenshot backgrounds",
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">Design High-Converting App Previews</h2>
      <p class="mb-6">
        Great <strong>app store screenshot design</strong> relies on context and atmosphere. Our canvas styling tools allow you to seamlessly inject brand colors, dynamic gradients, and sophisticated lighting effects directly into your <strong>app store screenshots</strong>.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Atmosphere That Sells</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Custom Gradients:</strong> Build multi-stop gradient backgrounds to match your brand identity.</li>
        <li><strong>Lighting FX:</strong> Apply soft spotlights or dramatic edge lighting to make your app UI pop.</li>
        <li><strong>Pattern Overlays:</strong> Use subtle geometric or noise patterns to add premium texture to your iOS app mockups.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/animated-patterns-lighting.webp",
    ipad_shot: "/assets/feature-platforms/ipad/animated-patterns-lighting.webp"
  },
  {
    id: "typography",
    title: "App Store Screenshot Typography & Captions | Bezel Studio",
    headline: "Pro Typography & Captions",
    desc: "Add beautiful text overlays, gradient fills, and pinpoint shadows to your App Store screenshots to increase app downloads.",
    seo_keywords: "screenshot captions, text overlays on screenshots, professional app screenshots, increase app downloads",
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">Text Overlays That Drive Downloads</h2>
      <p class="mb-6">
        The best <strong>app store screenshots</strong> use clear, compelling copy to communicate value instantly. With Bezel Studio's advanced typography engine, adding <strong>screenshot captions</strong> and robust text overlays is effortless, helping you <strong>increase app downloads</strong>.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Typography Features</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Gradient Text Fills:</strong> Make your headlines stand out with vibrant, multi-color gradient text.</li>
        <li><strong>Drop Shadows & Strokes:</strong> Ensure your text is perfectly legible against any background with precision shadow controls.</li>
        <li><strong>Apple-Native Fonts:</strong> Native integration with iOS fonts to maintain a professional, ecosystem-aligned aesthetic.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/typography.webp",
    ipad_shot: "/assets/feature-platforms/ipad/typography.webp"
  },
  {
    id: "images-stickers",
    title: "App Screenshot Stickers & Callouts | Bezel Studio",
    headline: "Stickers & UI Cutouts",
    desc: "Instantly remove backgrounds and build pop-out stickers to highlight specific features in your App Store screenshots.",
    seo_keywords: "app feature callouts, app UI mockups, highlight app features, app store creative assets",
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">Highlight Core Features with UI Stickers</h2>
      <p class="mb-6">
        Sometimes a full device frame is too much. Use our sticker and cutout tools to isolate specific UI elements, remove backgrounds instantly, and create floating feature callouts for your <strong>App Store creatives</strong>.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Build Pop-Out Visuals</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Instant Background Removal:</strong> Isolate UI components or character art automatically.</li>
        <li><strong>Custom Borders:</strong> Add thick, stylized strokes around cutouts to make them visually distinct.</li>
        <li><strong>Callout Arrows & Badges:</strong> Direct the user's eye exactly where you want it.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/images-stickers.webp",
    ipad_shot: "/assets/feature-platforms/ipad/images-stickers.webp"
  },
  {
    id: "draw-doodle",
    title: "Draw & Annotate App Screenshots | Bezel Studio",
    headline: "Draw, Doodle & Annotate",
    desc: "Use Apple PencilKit to draw directly on your iOS mockups. Add handcrafted annotations to your App Store screenshots.",
    seo_keywords: "annotate app screenshots, hand-drawn mockups, app store visuals, custom screenshot maker",
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">Handcrafted Annotations</h2>
      <p class="mb-6">
        Bring a personal, handcrafted touch to your marketing. With native PencilKit integration, Bezel Studio lets you draw directly onto your canvases. It's the perfect way to <strong>annotate app screenshots</strong> or highlight hidden features with organic arrows and circles.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Pencil-Ready Creative</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Native PencilKit:</strong> Fluid, responsive drawing utilizing Apple's native rendering engine.</li>
        <li><strong>Layered Drawings:</strong> Every sketch acts as an independent layer that can be scaled, rotated, or ordered.</li>
        <li><strong>Organic Annotations:</strong> Break away from rigid corporate templates with custom, hand-drawn highlights.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/images-stickers.webp",
    ipad_shot: "/assets/feature-platforms/ipad/images-stickers.webp"
  },
  {
    id: "translation",
    title: "App Store Screenshot Localization | Bezel Studio",
    headline: "Global App Translation",
    desc: "Localize App Store screenshots, text layers, and full projects on-device so every locale stays visually aligned.",
    seo_keywords: "localized screenshots, multi-language screenshots, automatic screenshot generation, app store localization",
    hero_cta_text: "Get screenshot localization tools",
    primary_cta_text: "Download Bezel Studio for localization workflows",
    guide_cta_href: "/guides/localize-screenshot-sets-apple-translate.html",
    guide_cta_label: "Follow the App Store localization guide",
    conversion_heading: "Install the localization workflow before the next translated launch slips.",
    conversion_body: "This page is most useful when it leads straight into the app. Keep translation, text fitting, and export inside one native project instead of splitting the process across multiple tools.",
    conversion_points: [
      "Translate the current canvas or the full screenshot project on-device",
      "Keep typography, spacing, and device frames aligned across every locale",
      "Batch-export localized screenshots and preview assets from one source of truth",
    ],
    feature_journey_heading: "Localize the set, then preserve it through export.",
    feature_journey_body: "Screenshot localization is strongest when reusable templates and export live in the same workflow. These pages keep the localized campaign connected from setup to delivery.",
    related_features: [
      {
        href: "/features/projects-presets.html",
        title: "App screenshot templates for repeated localization work",
        description: "Keep base layouts, safe text styles, and reusable project presets ready before you translate the next locale.",
      },
      {
        href: "/features/export-share.html",
        title: "Batch export localized App Store screenshot sets",
        description: "Render every translated canvas and preview asset from one place when the localized release is ready to ship.",
      },
    ],
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">Ship Globally with Localized Screenshots</h2>
      <p class="mb-6">
        Expanding your app's reach requires speaking the user's language. Bezel Studio offers <strong>automatic screenshot generation</strong> for multiple locales. Instantly translate your English captions into Spanish, French, Japanese, and more, creating fully <strong>localized screenshots</strong> in seconds.
      </p>
      <p class="mb-6">
        App Store screenshot localization is more than translated copy. It also means preserving hierarchy, spacing, and typography when one language runs longer than another. Bezel Studio keeps translation, layout edits, and export in the same project so the localized campaign stays consistent instead of splintering into manual rebuilds.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Frictionless ASO Localization</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>On-Device Translation:</strong> Secure, native translation that processes entirely on your iPhone or iPad.</li>
        <li><strong>Batch Canvas Updates:</strong> Translate every single canvas in your project with one tap.</li>
        <li><strong>Auto-Resizing Text:</strong> Our typography engine automatically adjusts font sizes to accommodate longer translated phrases.</li>
      </ul>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">What a localization workflow should protect</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Visual consistency:</strong> Keep device frames, gradients, and callout systems aligned across every language.</li>
        <li><strong>Readable copy:</strong> Adapt captions for German, French, Japanese, and other longer or denser strings without losing balance.</li>
        <li><strong>Fast iteration:</strong> Review one locale, adjust the template, then push the improvement across the project instead of editing every canvas separately.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/translation.webp",
    ipad_shot: "/assets/feature-platforms/ipad/translation.webp",
    iphone_visual_alt: "Localized iPhone App Store screenshot workflow in Bezel Studio",
    ipad_visual_alt: "Localized iPad App Store screenshot workflow in Bezel Studio",
  },
  {
    id: "layers-precision",
    title: "Precision App Screenshot Layouts & Layers | Bezel Studio",
    headline: "Layer-Based Precision",
    desc: "A true drag-and-drop editor for app screenshots. Reorder layers, use snap guides, and build layouts with absolute precision.",
    seo_keywords: "drag and drop editor, customizable screenshots, app mockup tool, app store screenshot best practices",
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">A True Professional Workspace</h2>
      <p class="mb-6">
        Say goodbye to rigid web layouts. Bezel Studio is a powerful <strong>drag and drop editor</strong> built for the iPad and iPhone. Take full control over your Z-index with our comprehensive layer panel, ensuring your <strong>customizable screenshots</strong> are pixel-perfect.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Design With Confidence</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Layer Reordering:</strong> Easily drag to reorder 3D devices, text, and background elements.</li>
        <li><strong>Snap-to Guides:</strong> Magnetic alignment helpers ensure your typography and devices are perfectly centered across multiple canvases.</li>
        <li><strong>Zoom & Pan:</strong> Dive deep into the details with fluid, gesture-based canvas navigation.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/layers-precision.webp",
    ipad_shot: "/assets/feature-platforms/ipad/layers-precision.webp"
  },
  {
    id: "projects-presets",
    title: "App Screenshot Templates & Project Presets | Bezel Studio",
    headline: "Projects & Custom Presets",
    desc: "Save editable app screenshot templates, custom styles, and multi-canvas project presets for faster launches and updates.",
    seo_keywords: "screenshot templates, save time app screenshots, easy app screenshot maker, app marketing tools",
    hero_cta_text: "Get app screenshot templates",
    primary_cta_text: "Download Bezel Studio for reusable templates",
    guide_cta_href: "/guides/create-first-app-store-screenshot-project.html",
    guide_cta_label: "Start with the first screenshot project guide",
    conversion_heading: "Save the next App Store launch as a reusable screenshot template.",
    conversion_body: "People searching for screenshot templates usually want repeatability, not more setup overhead. Install Bezel Studio and keep presets, reusable layouts, and export settings in the same editable project.",
    conversion_points: [
      "Store multi-canvas screenshot templates for future releases",
      "Preserve headline styles, device frames, and launch structure",
      "Reopen the preset, update the copy, and export again without rebuilding",
    ],
    feature_journey_heading: "Templates only matter if they speed up the next release.",
    feature_journey_body: "Once someone understands presets, the next steps are layout reuse and export. Keep them inside that commercial path with direct links instead of generic navigation.",
    related_features: [
      {
        href: "/features/copy-paste-projects.html",
        title: "Reusable App Store screenshot layouts",
        description: "Carry one approved canvas, caption stack, or full layout into the next launch campaign without rebuilding from zero.",
      },
      {
        href: "/features/export-share.html",
        title: "Batch export saved screenshot templates",
        description: "Move saved layouts straight into still-image and preview-video exports when the campaign is approved.",
      },
    ],
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">Scale Your Marketing Workflow</h2>
      <p class="mb-6">
        When managing multiple apps, organization is key. Bezel Studio allows you to save complete layout <strong>screenshot templates</strong> and styles. This is the ultimate way to <strong>save time on app screenshots</strong> while maintaining a cohesive brand aesthetic across your entire portfolio.
      </p>
      <p class="mb-6">
        Instead of recreating backgrounds, frame stacks, caption styling, and export settings every time, you can open the exact project preset that matched the last release and adapt it for the next update, seasonal campaign, or localization pass.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Built for Iteration</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Multi-Canvas Projects:</strong> Keep all 8 of your App Store slots organized within a single project file.</li>
        <li><strong>Style Presets:</strong> Save your favorite gradient background or text shadow configuration for one-tap reuse later.</li>
        <li><strong>Duplicate & Iterate:</strong> Need to run an A/B test? Duplicate an entire project instantly and tweak the copy.</li>
      </ul>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">What strong screenshot templates preserve</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Launch structure:</strong> Keep the same frame, headline system, and scene order across major updates.</li>
        <li><strong>Team velocity:</strong> Hand collaborators or future-you a preset that already respects your brand and store constraints.</li>
        <li><strong>Editable output:</strong> Reopen the template, change the copy, adjust a device frame, and export again without flattening the source.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/projects-presets.webp",
    ipad_shot: "/assets/feature-platforms/ipad/projects-presets.webp",
    iphone_visual_alt: "Reusable App Store screenshot project preset in Bezel Studio",
    ipad_visual_alt: "Reusable App Store screenshot template preset in Bezel Studio",
  },
  {
    id: "export-share",
    title: "Batch Export App Store Screenshots | Bezel Studio",
    headline: "Instant Export & Sharing",
    desc: "Batch export App Store screenshots, preview videos, and localized sets from the same project without rebuilding assets.",
    seo_keywords: "export app screenshots, App Store Connect integration, panoramic screenshots, iOS screenshot generator",
    hero_cta_text: "Get batch screenshot export",
    primary_cta_text: "Download Bezel Studio for batch exports",
    guide_cta_href: "/guides/build-full-app-store-screenshot-set.html",
    guide_cta_label: "See the full screenshot set workflow",
    conversion_heading: "Export the whole launch package from the same project.",
    conversion_body: "When visitors reach export, they are already close to action. Give them the native iPhone and iPad workflow that keeps screenshots, localization, and preview videos ready for App Store Connect.",
    conversion_points: [
      "Batch-export still screenshots, localized sets, and preview videos together",
      "Keep App Store Connect delivery tied to the editable source project",
      "Share to Photos, Files, or AirDrop without rebuilding the launch assets",
    ],
    feature_journey_heading: "Export is the last commercial step, not a dead end.",
    feature_journey_body: "Visitors who reach export are close to conversion. Give them a direct App Store CTA plus the adjacent feature pages that explain motion and localization output.",
    related_features: [
      {
        href: "/features/canvas-motion.html",
        title: "App preview video maker with Canvas Motion",
        description: "Turn the same screenshot composition into animated preview videos before you export the final launch package.",
      },
      {
        href: "/features/translation.html",
        title: "Localized App Store screenshot workflows",
        description: "Keep translated campaigns in the same project so screenshot batches and locale-specific exports stay aligned.",
      },
    ],
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">From Canvas to App Store Connect in Seconds</h2>
      <p class="mb-6">
        The final step is the most important. Bezel Studio's rendering engine allows you to <strong>export app screenshots</strong> in massive, high-fidelity batches. Whether you need static images or '.mp4' video previews, everything is generated instantly, radically streamlining your upload to <strong>App Store Connect</strong>.
      </p>
      <p class="mb-6">
        That means the same project can hold the launch screenshots, localized variants, and motion-ready preview visuals until you are ready to render the whole campaign. Instead of rebuilding assets for every output type, you export from one source of truth.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Frictionless Delivery</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Batch Rendering:</strong> Export all your different localized screenshot sets simultaneously.</li>
        <li><strong>High-Fidelity Output:</strong> Guaranteed razor-sharp text and assets that meet all of Apple's strict resolution guidelines.</li>
        <li><strong>Native Share Sheet:</strong> Save directly to your iOS Photos app, Files app, or AirDrop instantly to your Mac.</li>
      </ul>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">What batch export solves</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Store-ready stills:</strong> Export the full screenshot set in one pass when copy, frames, and styling are locked.</li>
        <li><strong>Preview-video delivery:</strong> Render motion pieces from the same project that already holds the static screenshots.</li>
        <li><strong>Localization handoff:</strong> Keep every locale inside the same delivery workflow so App Store Connect upload stops being a manual scramble.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/export-share.webp",
    ipad_shot: "/assets/feature-platforms/ipad/export-share.webp",
    iphone_visual_alt: "Batch export workflow for App Store screenshots in Bezel Studio",
    ipad_visual_alt: "Batch export workflow for App Store preview assets in Bezel Studio",
  }
];

const template = (data) => `<!doctype html>
<html lang="en" class="scroll-smooth antialiased">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-4H5EW5KWZC"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-4H5EW5KWZC');
  </script>
  <title>${data.title}</title>
  <meta name="description" content="${data.desc}">
  <meta name="keywords" content="${data.seo_keywords}">
  <link rel="canonical" href="https://bezelstudio.app/features/${data.id}.html">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="/assets/brand/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/assets/brand/favicon-16x16.png" sizes="16x16">
  <link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">
  <link rel="stylesheet" href="/src/style.css">
  <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Bezel Studio">
  <meta property="og:locale" content="en_US">
  <meta property="og:title" content="${data.title}">
  <meta property="og:description" content="${data.desc}">
  <meta property="og:url" content="https://bezelstudio.app/features/${data.id}.html">
  <meta property="og:image" content="https://bezelstudio.app${data.ipad_shot}">
  <meta property="og:image:alt" content="${data.headline} on iPad">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.title}">
  <meta name="twitter:description" content="${data.desc}">
  <meta name="twitter:image" content="https://bezelstudio.app${data.ipad_shot}">
  <meta name="twitter:image:alt" content="${data.headline} on iPad">
  <meta name="color-scheme" content="light dark">
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${data.title}",
      "description": "${data.desc}",
      "url": "${siteUrl}/features/${data.id}.html",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Bezel Studio",
        "url": "${siteUrl}/"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "${siteUrl}/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Features",
            "item": "${siteUrl}/#features"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${data.headline}",
            "item": "${siteUrl}/features/${data.id}.html"
          }
        ]
      },
      "about": {
        "@type": "SoftwareApplication",
        "name": "Bezel Studio",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "iOS, iPadOS",
        "downloadUrl": "https://apps.apple.com/in/app/app-screenshot-studio-bezel/id6758039031"
      }
    }
  </script>
  <script>
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (event.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  </script>
  <style>
    .feature-page-shell {
      position: relative;
      width: min(100%, 78rem);
      padding-inline: 1rem;
    }
    .feature-visual-stage {
      position: relative;
      width: min(100%, 70rem);
      height: clamp(20rem, 40vw, 31rem);
      margin: 0 auto 4rem;
      pointer-events: none;
      overflow: hidden;
    }
    .feature-visual-stage::before {
      content: "";
      position: absolute;
      inset: 8% 7% 10%;
      border-radius: 2.75rem;
      background:
        radial-gradient(circle at 22% 64%, rgba(96, 165, 250, 0.14), transparent 28%),
        radial-gradient(circle at 78% 28%, rgba(244, 114, 182, 0.1), transparent 22%),
        radial-gradient(circle at 54% 82%, rgba(99, 102, 241, 0.14), transparent 30%);
      filter: blur(16px);
      opacity: 0.9;
    }
    .feature-visual-stage::after {
      content: "";
      position: absolute;
      inset: auto 12% 0;
      height: 36%;
      background: radial-gradient(circle at center, rgba(15, 23, 42, 0.08), transparent 66%);
      filter: blur(28px);
    }
    .dark .feature-visual-stage::after {
      background: radial-gradient(circle at center, rgba(0, 0, 0, 0.3), transparent 66%);
    }
    .feature-visual-stage__device {
      position: absolute;
      height: auto;
      object-fit: contain;
      transform-origin: center center;
      filter: drop-shadow(0 30px 70px rgba(15, 23, 42, 0.18));
      user-select: none;
      -webkit-user-drag: none;
    }
    .feature-visual-stage__device--ipad {
      width: min(63%, 50rem);
      right: clamp(5%, 9vw, 11%);
      top: clamp(1rem, 3vw, 2rem);
      z-index: 1;
      opacity: 0.98;
      transform: rotate(6deg);
    }
    .feature-visual-stage__device--iphone {
      width: min(20%, 13.5rem);
      left: clamp(6%, 10vw, 12%);
      top: clamp(6.5rem, 14vw, 10rem);
      z-index: 2;
      opacity: 0.98;
      transform: rotate(-8deg);
    }
    /* Premium markdown overrides for generated body content */
    .premium-content h2 {
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
    }
    @media (min-width: 768px) {
      .premium-content h2 { font-size: 3.5rem; }
    }
    .premium-content h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-top: 3rem;
      margin-bottom: 1rem;
    }
    .premium-content p {
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--tw-prose-body);
      margin-bottom: 2rem;
    }
    .premium-content strong {
      color: inherit;
      font-weight: 600;
      opacity: 0.9;
    }
    .premium-content ul {
      margin-top: 2rem;
      margin-bottom: 3rem;
      padding-left: 0;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .premium-content li {
      position: relative;
      padding-left: 2.5rem;
      font-size: 1.125rem;
    }
    .premium-content li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
    @media (max-width: 1023px) {
      .feature-page-shell {
        width: min(100%, 68rem);
      }
      .feature-visual-stage {
        height: clamp(18rem, 46vw, 25rem);
      }
      .feature-visual-stage__device--ipad {
        width: min(66%, 38rem);
        right: clamp(1%, 4vw, 6%);
      }
      .feature-visual-stage__device--iphone {
        width: min(22%, 10.5rem);
        left: clamp(3%, 7vw, 10%);
        top: clamp(6rem, 16vw, 8.6rem);
      }
    }
    @media (max-width: 767px) {
      .feature-page-shell {
        padding-inline: 0.75rem;
      }
      .feature-visual-stage {
        height: clamp(14rem, 66vw, 18rem);
        margin-bottom: 2.2rem;
      }
      .feature-visual-stage::before {
        inset: 10% 2% 14%;
      }
      .feature-visual-stage__device--ipad {
        width: min(70%, 19rem);
        right: 2%;
        left: auto;
        top: 0.6rem;
        transform: rotate(5deg);
      }
      .feature-visual-stage__device--iphone {
        width: min(24%, 6.5rem);
        left: 4%;
        top: 4.4rem;
        transform: rotate(-7deg);
      }
    }
  </style>
</head>

<body class="font-sans bg-white dark:bg-[#050505] selection:bg-blue-500/30 overflow-x-hidden text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
  
  <!-- Premium ambient glow -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div class="absolute top-[-20%] left-[20%] w-[60%] h-[50%] rounded-[100%] bg-blue-600/10 dark:bg-blue-600/20 blur-[150px]"></div>
    <div class="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-[100%] bg-purple-600/10 dark:bg-purple-600/20 blur-[150px]"></div>
  </div>

  <div class="relative z-10 w-full flex justify-center pt-8 reveal">
    <header class="flex items-center justify-between px-6 py-3 bg-black/5 dark:bg-white/5 glass-blur border border-black/5 dark:border-white/10 rounded-full w-[90%] max-w-5xl shadow-xl dark:shadow-2xl">
      <a href="/" class="flex items-center gap-3">
        <img class="w-8 h-8 rounded-[8px] object-cover shadow-sm" src="/assets/brand/bezel-studio-logo.webp" alt="Logo">
        <span class="text-zinc-900 dark:text-white font-semibold text-sm tracking-tight">Bezel Studio</span>
      </a>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="/#features" class="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Features</a>
        <a href="/guides/" class="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Guides</a>
        <a href="/#workflow" class="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Workflow</a>
        <a href="/#faq" class="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">FAQ</a>
      </nav>
      <a href="https://apps.apple.com/in/app/app-screenshot-studio-bezel/id6758039031" class="hidden sm:flex items-center justify-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
        Get the App
      </a>
    </header>
  </div>

  <main class="relative z-10 pt-32 pb-24 flex flex-col items-center">
    <div class="feature-page-shell mb-24">
    <!-- Massive Centered Hero Section -->
    <section class="relative z-10 max-w-5xl w-[90%] mx-auto text-center mb-16 reveal">
      <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 [text-wrap:balance]">
        ${data.headline}
      </h1>
      <p class="text-xl md:text-2xl font-light text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-12 [text-wrap:balance]">
        ${data.desc}
      </p>
      
      <!-- Call to action cluster in hero -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
        <a href="https://apps.apple.com/in/app/app-screenshot-studio-bezel/id6758039031" class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1">
          <img src="/assets/brand/app-store-logo.svg" alt="App Store" class="w-5 h-5 brightness-0 invert">
          ${data.hero_cta_text || 'Start building for free'}
        </a>
      </div>
    </section>

      <div class="feature-visual-stage reveal" style="animation-delay: 200ms;" aria-hidden="true">
        <img class="feature-visual-stage__device feature-visual-stage__device--iphone" src="${data.iphone_shot}" alt="${data.iphone_visual_alt || ''}">
        <img class="feature-visual-stage__device feature-visual-stage__device--ipad" src="${data.ipad_shot}" alt="${data.ipad_visual_alt || ''}">
      </div>

    <!-- Seamless Content Layout -->
    <section class="relative z-10 w-full max-w-3xl px-6 mx-auto premium-content reveal" style="animation-delay: 300ms;">
      <div class="prose prose-lg dark:prose-invert max-w-none text-zinc-900 dark:text-white">
        ${data.body}
      </div>
    </section>
    ${renderFeatureConversionCta(data)}
    ${renderRelatedGuides(data.id)}
    ${renderFeatureJourney(data)}
    </div>
    
  </main>

  <footer class="border-t border-zinc-200 dark:border-white/10 pt-16 pb-12 px-6 md:px-12 bg-zinc-50 dark:bg-[#020202] mt-24">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-4">
        <img class="w-8 h-8 rounded-lg" src="/assets/brand/bezel-studio-logo.webp" alt="Bezel Studio">
        <span class="text-zinc-900 dark:text-white font-semibold flex items-center gap-2">
          Bezel Studio
          <span class="text-xs bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-white/70 px-2 py-0.5 rounded uppercase tracking-wider">iOS App</span>
        </span>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-zinc-500">
        <a href="https://apps.apple.com/in/app/app-screenshot-studio-bezel/id6758039031" class="hover:text-black dark:hover:text-white transition-colors">App Store</a>
        <a href="/" class="hover:text-black dark:hover:text-white transition-colors">Home</a>
        <a href="/guides/" class="hover:text-black dark:hover:text-white transition-colors">Guides</a>
        <a href="/privacy.html" class="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
      </div>
    </div>
  </footer>

  <script type="module" src="/src/main.js"></script>
</body>
</html>`;

const outDir = path.join(__dirname, 'features');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

features.forEach(feature => {
  const filePath = path.join(outDir, `${feature.id}.html`);
  fs.writeFileSync(filePath, template(feature));
  console.log(`Created ${filePath}`);
});

const staticPages = ['/', '/guides/', ...guides.map((guide) => guide.path), '/privacy.html'];
const featurePages = fs.existsSync(outDir)
  ? fs.readdirSync(outDir)
      .filter(file => file.endsWith('.html'))
      .map(file => `/features/${file}`)
      .sort()
  : features.map(feature => `/features/${feature.id}.html`);
const allPages = [...staticPages, ...featurePages];
const lastmod = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
console.log(`Created ${path.join(__dirname, 'sitemap.xml')}`);

const robots = `User-agent: *
Allow: /
Allow: /guides/

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, 'robots.txt'), robots);
console.log(`Created ${path.join(__dirname, 'robots.txt')}`);
