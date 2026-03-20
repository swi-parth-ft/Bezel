const fs = require('fs');
const path = require('path');

// Content expanded with SEO keywords like "app store screenshot maker", "iPhone mockup generator", etc.
const features = [
  {
    id: "device-frames",
    title: "iPhone Mockup Generator & Device Frames | Bezel Studio",
    headline: "Photorealistic Device Frames",
    desc: "Use our professional iPhone mockup generator and iPad templates to build high-converting App Store screenshots instantly.",
    seo_keywords: "iPhone mockup generator, app store screenshot maker, device mockups, high-quality iPhone mockups, 3D iPhone mockup generator",
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">The Best iPhone Mockup Generator for iOS Apps</h2>
      <p class="mb-6">
        When building your App Store presence, standard device screens aren't enough. Our <strong>iPhone mockup generator</strong> provides photorealistic, high-quality device frames that elevate your app's presentation. From the latest iPhone models to iPad and Apple Watch, Bezel Studio acts as your complete <strong>app store screenshot maker</strong>.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Why Frame Your Screenshots?</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Boost App Conversions:</strong> Users trust professional, high-quality iPhone mockups over raw screenshots.</li>
        <li><strong>Customizable Templates:</strong> Drop your app imagery into our customizable iPhone mockups with a single tap.</li>
        <li><strong>No Watermarks:</strong> Generate pristine, 4K device mockups ready for App Store Connect.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/export-share.webp",
    ipad_shot: "/assets/feature-platforms/ipad/export-share.webp"
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
    title: "Automatic Multi-Language App Screenshots | Bezel Studio",
    headline: "Global App Translation",
    desc: "Generate localized App Store screenshots instantly. On-device, automatic multi-language screenshot translation.",
    seo_keywords: "localized screenshots, multi-language screenshots, automatic screenshot generation, app store localization",
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">Ship Globally with Localized Screenshots</h2>
      <p class="mb-6">
        Expanding your app's reach requires speaking the user's language. Bezel Studio offers <strong>automatic screenshot generation</strong> for multiple locales. Instantly translate your English captions into Spanish, French, Japanese, and more, creating fully <strong>localized screenshots</strong> in seconds.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Frictionless ASO Localization</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>On-Device Translation:</strong> Secure, native translation that processes entirely on your iPhone or iPad.</li>
        <li><strong>Batch Canvas Updates:</strong> Translate every single canvas in your project with one tap.</li>
        <li><strong>Auto-Resizing Text:</strong> Our typography engine automatically adjusts font sizes to accommodate longer translated phrases.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/translation.webp",
    ipad_shot: "/assets/feature-platforms/ipad/translation.webp"
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
    title: "App Screenshot Templates & Projects | Bezel Studio",
    headline: "Projects & Custom Presets",
    desc: "Organize your workflow. Save App Store screenshot templates, custom styles, and multi-canvas projects.",
    seo_keywords: "screenshot templates, save time app screenshots, easy app screenshot maker, app marketing tools",
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">Scale Your Marketing Workflow</h2>
      <p class="mb-6">
        When managing multiple apps, organization is key. Bezel Studio allows you to save complete layout <strong>screenshot templates</strong> and styles. This is the ultimate way to <strong>save time on app screenshots</strong> while maintaining a cohesive brand aesthetic across your entire portfolio.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Built for Iteration</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Multi-Canvas Projects:</strong> Keep all 8 of your App Store slots organized within a single project file.</li>
        <li><strong>Style Presets:</strong> Save your favorite gradient background or text shadow configuration for one-tap reuse later.</li>
        <li><strong>Duplicate & Iterate:</strong> Need to run an A/B test? Duplicate an entire project instantly and tweak the copy.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/projects-presets.webp",
    ipad_shot: "/assets/feature-platforms/ipad/projects-presets.webp"
  },
  {
    id: "export-share",
    title: "Export App Store Screenshots & iOS Mockups | Bezel Studio",
    headline: "Instant Export & Sharing",
    desc: "Export App Store screenshots in massive batches. Generate high-quality image and video assets natively on your device.",
    seo_keywords: "export app screenshots, App Store Connect integration, panoramic screenshots, iOS screenshot generator",
    body: `
      <h2 class="text-3xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">From Canvas to App Store Connect in Seconds</h2>
      <p class="mb-6">
        The final step is the most important. Bezel Studio's rendering engine allows you to <strong>export app screenshots</strong> in massive, high-fidelity batches. Whether you need static images or '.mp4' video previews, everything is generated instantly, radically streamlining your upload to <strong>App Store Connect</strong>.
      </p>
      <h3 class="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">Frictionless Delivery</h3>
      <ul class="list-disc pl-6 space-y-3 mb-8 text-zinc-600 dark:text-zinc-300">
        <li><strong>Batch Rendering:</strong> Export all your different localized screenshot sets simultaneously.</li>
        <li><strong>High-Fidelity Output:</strong> Guaranteed razor-sharp text and assets that meet all of Apple's strict resolution guidelines.</li>
        <li><strong>Native Share Sheet:</strong> Save directly to your iOS Photos app, Files app, or AirDrop instantly to your Mac.</li>
      </ul>
    `,
    iphone_shot: "/assets/feature-platforms/iphone/export-share.webp",
    ipad_shot: "/assets/feature-platforms/ipad/export-share.webp"
  }
];

const template = (data) => `<!doctype html>
<html lang="en" class="scroll-smooth antialiased">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${data.title}</title>
  <meta name="description" content="${data.desc}">
  <meta name="keywords" content="${data.seo_keywords}">
  <link rel="canonical" href="https://bezelstudio.parthant.com/features/${data.id}.html">
  <link rel="icon" href="/assets/brand/favicon.svg">
  <link rel="apple-touch-icon" href="/assets/brand/bezel-studio-logo.png">
  <link rel="stylesheet" href="/src/style.css">
  <meta name="color-scheme" content="light dark">
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
          Start building for free
        </a>
      </div>
    </section>

      <div class="feature-visual-stage reveal" style="animation-delay: 200ms;" aria-hidden="true">
        <img class="feature-visual-stage__device feature-visual-stage__device--iphone" src="${data.iphone_shot}" alt="">
        <img class="feature-visual-stage__device feature-visual-stage__device--ipad" src="${data.ipad_shot}" alt="">
      </div>

    <!-- Seamless Content Layout -->
    <section class="relative z-10 w-full max-w-3xl px-6 mx-auto premium-content reveal" style="animation-delay: 300ms;">
      <div class="prose prose-lg dark:prose-invert max-w-none text-zinc-900 dark:text-white">
        ${data.body}
      </div>
    </section>
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
