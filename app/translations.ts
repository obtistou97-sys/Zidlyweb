export type Locale = "en" | "ar";

export const translations = {
  en: {
    nav: {
      services: "Services",
      work: "Projects",
      process: "Process",
      testimonials: "Testimonials",
      faq: "FAQ",
      pricing: "Pricing",
      cta: "Let's Talk",
    },
    hero: {
      eyebrow: "ZidlyWeb · Web Development Agency",
      headlineLine1: "We Help You Turn Your Idea Into a Real Online Website",
      subheadline:
        "A professional website will help you build trust, explain your services more clearly, and position your business as a serious brand ready to play at a higher level.",
      ctaPrimary: "Start Your Website Project",
      ctaSecondary: "View Our Work",
      stats: [
        { value: "60+", label: "Clients Trusted" },
        { value: "100%", label: "Responsive" },
      ],
      rotatingPhrases: [
        { text: "Build Your Brand" },
        { text: "Launch Your Brand" },
        { text: "Deliver Your Website" },
      ],
    },
    trustBadges: {
      title: "Trusted by Many Companies",
      items: [
        { name: "Brand 1", image: "/Untitled design (33).png" },
        { name: "Brand 2", image: "/Untitled design (34).png" },
        { name: "Brand 3", image: "/Untitled design (35).png" },
        { name: "Brand 4", image: "/Untitled design (36).png" },
        { name: "Brand 5", image: "/Untitled design (37).png" },
      ],
    },
    about: {
      eyebrow: "About Our Studio",
      title: "Digital Website Solutions that deliver Real Impact",
      paragraph1Rest:
        "An effective website solution isn't just about aesthetics. The right website should reflect your brand identity, be easy to use, and clearly direct visitors to action. At our studio, every website is designed with a strategic approach: from page structure and brand storyline to small details like typography and white space. The result is a website that's modern, elegant, fast to navigate, and ready to help your business scale.",
      ceoName: "Oussama Brahimi",
      ceoTitle: "CEO ZidlyWeb",
    },
    work: {
      eyebrow: "Recent Projects",
      title: "Sites We've Built",
      subtitle:
        "Each project is designed to address real business needs — from increasing trust and clarifying services to helping generate more clients.",
      liveLink: "View Project",
      items: [
        {
          title: "TOM Real Estate & Developing Company",
          tag: "Company Profile",
          desc: "TOM for Real Estate & Development is a leading company in real estate development and finishing of residential and commercial projects in Libya. We offer comprehensive real estate services including buying, selling, and finishing with the highest quality and professional standards. We are distinguished by a specialized team and long experience in the Libyan real estate market.",
          image: "/Tom.JPG",
          url: "https://tom-gold.vercel.app",
        },
        {
          title: "ZidFollow",
          tag: "Social Media Services",
          desc: "ZidFollow.shop is a social media growth service — Helps get more Instagram followers, more Facebook page Followers and likes, TikTok views, TikTok Likes etc. with easy and fast ordering.",
          image: "/zidfollow.JPG",
          url: "https://ZidFollow.shop",
        },
        {
          title: "Zümrüt Perfumes",
          tag: "Landing Page",
          desc: "Luxury custom perfumes for brand, They craft your perfume from scratch — unique notes that match your brand identity, they also guide you in selecting the right notes for your brand and develop your fragrance concept.",
          image: "/Zumurt.JPG",
          url: null,
        },
        {
          title: "Dar el Folk",
          tag: "E-Commerce Store",
          desc: "Library ecommerce website sell all Types of Books they already has a traditional business and they wanted to go even better by lunching there own online Brand and make it live.",
          image: "/darelfolk.JPG",
          url: "https://darelfolk.com",
        },
      ],
    },
    services: {
      eyebrow: "What We Offer",
      title: "Website Solutions that Deliver Real Impact",
      subtitle:
        "An effective website solution isn't just about aesthetics — the right website should reflect your brand identity, be easy to use, and clearly direct visitors to action.",
      items: [
        {
          title: "Website Design & UX",
          desc: "Every element, from typography and color to spacing, is designed to maintain brand consistency and make visitors feel comfortable from the moment they land.",
          cta: "See Our Work",
        },
        {
          title: "Company Profile",
          desc: "We create company profile and personal brand websites that tell who you are, what you do, and why clients should choose you over others.",
          cta: "Get Started",
        },
        {
          title: "E-Commerce & Booking",
          desc: "Transform your website into a sales and ordering machine with product catalogs, service order forms, and a seamless flow for visitors to complete transactions.",
          cta: "Increase My Sales",
        },
        {
          title: "SEO, Speed & Maintenance",
          desc: "An attractive website should be easy to find and fast to access. We optimize structure, content, and speed, and provide maintenance to keep your site secure.",
          cta: "Keep Me Optimized",
        },
      ],
    },
    clientLogos: {
      eyebrow: "Brands That Trust Us",
      title: "Trusted by Innovative Businesses",
      items: [
        { name: "Hopkins Foundation", image: "/client-hopkins.svg" },
        { name: "Café Lumière", image: "/client-cafe.svg" },
        { name: "KEE Visa", image: "/client-keevisa.svg" },
        { name: "Ryuben Consultancy", image: "/client-ryuben.svg" },
        { name: "MezTech Repairs", image: "/client-meztech.svg" },
        { name: "Atelier Nadia", image: "/client-nadia.svg" },
      ],
    },
    whyChoose: {
      eyebrow: "Why Choose ZidlyWeb",
      title: "Built for Your Success",
      items: [
        {
          title: "Custom Solutions",
          desc: "Every website is designed based on your business goals — from page structure and content order to clear calls-to-action. Tailored to your brand and audience.",
          icon: "Code2",
        },
        {
          title: "Elegant Design",
          desc: "Clean, modern, and easy-to-read. The combination of typography, color, and white space creates a premium feel that's both user-friendly and enjoyable.",
          icon: "Sparkles",
        },
        {
          title: "Fully Responsive",
          desc: "Optimized to load smoothly on desktops, tablets, and phones. Visitors enjoy a seamless browsing experience on any device.",
          icon: "Smartphone",
        },
        {
          title: "Easy to Manage",
          desc: "Change text, images, and pages without relying on developers. The backend stays simple so daily updates are quick and hassle-free.",
          icon: "ShieldCheck",
        },
      ],
    },
    process: {
      eyebrow: "How It Works",
      title: "Simple Development Process",
      steps: [
        {
          title: "Consultation & Planning",
          desc: "We discuss your business goals, target audience, and what your website needs to achieve. I map out the structure and pages before any design begins.",
        },
        {
          title: "Design & Development",
          desc: "I design a modern, on-brand layout and build it with clean, fast, mobile-first code so your site looks great and loads instantly on any device.",
        },
        {
          title: "Review & Revisions",
          desc: "You review the live preview and request changes. We refine the details together until the site matches your vision exactly.",
        },
        {
          title: "Launch & Support",
          desc: "Your website goes live, optimized for search engines and ready for customers. I stay available for updates and ongoing support afterward.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Client Feedback",
      title: "What Clients Say",
      items: [
        {
          name: "Amira Belkacem",
          role: "Owner, Café Lumière",
          text: "Oussama redesigned our coffee shop's website in less than two weeks. It looks incredibly professional now, loads fast, and we've already had new customers mention they found us through Google.",
        },
        {
          name: "Yacine Meziane",
          role: "Founder, MezTech Repairs",
          text: "What stood out most was the communication. Oussama explained every step clearly, delivered exactly what we discussed, and the final site converts way better than our old one.",
        },
        {
          name: "Nadia Cherif",
          role: "Director, Atelier Nadia",
          text: "I needed an online store that felt premium but was easy to manage. Oussama built exactly that — clean design, smooth checkout, and it works perfectly on mobile. Highly recommend his work.",
        },
      ],
    },
    faq: {
      eyebrow: "Good to Know",
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How long does a website take?",
          a: "Most one-page websites are completed within 3–7 days. Multi-page business websites and online stores typically take 1–3 weeks, depending on the number of pages and features required. I'll always give you a clear timeline before we start.",
        },
        {
          q: "Do you provide hosting support?",
          a: "Yes. I can help you choose the right hosting and domain setup, handle the deployment, and make sure everything runs smoothly after launch.",
        },
        {
          q: "Can you redesign my existing website?",
          a: "Absolutely. I can take your current website's content and rebuild it with a modern design, faster performance, and better mobile responsiveness — without losing what already works.",
        },
        {
          q: "Do you build online stores?",
          a: "Yes, I build complete e-commerce websites with product listings, shopping carts, secure payment integration, and mobile-optimized checkout flows.",
        },
        {
          q: "Will my website work on mobile devices?",
          a: "Every website I build is mobile-first, meaning it's designed for phones and tablets first, then scaled up for desktop. It will look and work great on any screen size.",
        },
      ],
    },
    finalCta: {
      headline: "Ready to Launch Your Next Website?",
      text: "From landing pages to full-scale business websites, we build fast, modern, and conversion-focused digital experiences.",
      ctaPrimary: "Start Your Project",
      ctaSecondary: "View Our Work",
      trustCount: "Trusted by 80+ clients",
    },
    contact: {
      eyebrow: "Get In Touch",
      title: "Let's Talk About Your Project",
      subtitle:
        "Tell me a bit about your business and what you need — I'll get back to you with ideas and next steps.",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      locationLabel: "Location",
      locationValue: "Algeria",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your full name",
        emailLabel: "Email",
        emailPlaceholder: "you@example.com",
        whatsappLabel: "WhatsApp Number",
        whatsappPlaceholder: "+213 5XX XX XX XX",
        businessLabel: "Business Name",
        businessPlaceholder: "Your business or brand name",
        detailsLabel: "Project Details",
        detailsPlaceholder:
          "Tell me about your project — what type of website you need, your goals, and any deadlines.",
        submit: "Send Message",
        sending: "Sending...",
        error: "Something went wrong. Please try again or reach out via WhatsApp.",
        successTitle: "Message sent",
        successText:
          "Thanks for reaching out — I'll get back to you within 24 hours to discuss your project.",
      },
    },
    footer: {
      rights: "All rights reserved.",
    },
    pricing: {
      badge: "Simple Pricing",
      heading: "Choose Your Plan",
      subheading: "No hidden fees, no surprises. Pick the plan that fits your needs.",
      plans: [
        {
          name: "Starter",
          price: "From $149",
          desc: "Perfect for personal sites, freelancers, and small projects.",
          features: [
            "1-page responsive website",
            "Custom domain setup",
            "Contact form integration",
            "Basic SEO optimization",
            "Mobile-friendly design",
            "3 days delivery",
          ],
          cta: "Get Started",
        },
        {
          name: "Business",
          price: "From $349",
          desc: "Ideal for growing businesses that need a strong online presence.",
          featured: true,
          features: [
            "Up to 5 pages",
            "CMS integration (WordPress)",
            "Advanced SEO setup",
            "Social media integration",
            "WhatsApp & contact forms",
            "Google Analytics setup",
            "7 days delivery",
          ],
          cta: "Start Business",
        },
        {
          name: "E-commerce",
          price: "From $699",
          desc: "For online stores and custom e-commerce solutions.",
          features: [
            "Product catalog (unlimited items)",
            "Shopping cart & checkout",
            "Payment gateway integration",
            "Order management dashboard",
            "Inventory tracking",
            "SEO for product pages",
            "14 days delivery",
          ],
          cta: "Contact Us",
        },
      ],
    },
  },
  ar: {
    nav: {
      services: "الخدمات",
      work: "مشاريعنا",
      process: "آلية العمل",
      testimonials: "آراء العملاء",
      faq: "الأسئلة الشائعة",
      pricing: "التسعير",
      cta: "تواصل معنا",
    },
    hero: {
      eyebrow: "ZidlyWeb · وكالة تطوير مواقع",
      headlineLine1: "نساعدك على تحويل فكرتك إلى موقع إلكتروني حقيقي على الإنترنت",
      subheadline:
        "موقع محترف يساعدك على بناء الثقة، شرح خدماتك بوضوح، ووضع نشاطك التجاري كمكانة جدية تلعب على مستوى أعلى.",
      ctaPrimary: "ابدأ مشروع موقعك",
      ctaSecondary: "شاهد أعمالنا",
      stats: [
        { value: "60+", label: "عميل موثوق" },
        { value: "100%", label: "متوافق مع الجوال" },
      ],
      rotatingPhrases: [
        { text: "ابنِ علامتك التجارية" },
        { text: "أطلق علامتك التجارية" },
        { text: "قدّم موقعك الإلكتروني" },
      ],
    },
    trustBadges: {
      title: "موثوق من عدة شركات",
      items: [
        { name: "Brand 1", image: "/Untitled design (33).png" },
        { name: "Brand 2", image: "/Untitled design (34).png" },
        { name: "Brand 3", image: "/Untitled design (35).png" },
        { name: "Brand 4", image: "/Untitled design (36).png" },
        { name: "Brand 5", image: "/Untitled design (37).png" },
      ],
    },
    about: {
      eyebrow: "عن الاستوديو",
      title: "حلول مواقع رقمية تحقق تأثيراً حقيقياً",
      paragraph1Rest:
        "حلول مواقع فعالة لا تقتصر على الجماليات. الموقع المناسب يعكس هوية علامتك التجارية، سهل الاستخدام، ويوجّه الزوار بوضوح لاتخاذ الإجراء المطلوب. في استوديو موقعنا، كل موقع يُصمم بنهج استراتيجي: من بنية الصفحة وسرد قصّة العلامة التجارية إلى التفاصيل الدقيقة كالخطوط والمساحات البيضاء. النتيجة: موقع عصري، أنيق، سريع التصفح، وجاهز لمساعدة عملك على النمو.",
      ceoName: "أسامة براهيمي",
      ceoTitle: "المدير التنفيذي ZidlyWeb",
    },
    work: {
      eyebrow: "أعمالنا الحديثة",
      title: "مواقع قمنا ببنائها",
      subtitle:
        "كل مشروع يُصمم ليلبي احتياجات تجارية حقيقية — من بناء الثقة وتوضيح الخدمات إلى المساعدة في جذب المزيد من العملاء.",
      liveLink: "عرض المشروع",
      items: [
        {
          title: "شركة توم للتطوير العقاري",
          tag: "ملف شركة",
          desc: "شركة توم للتطوير العقاري هي شركة رائدة في مجال تطوير وتجهيز المشاريع السكنية والتجارية في ليبيا. نقدم خدمات عقارية شاملة تشمل البيع والشراء والتشطيب بأعلى معايير الجودة والاحترافية. نتميز بفريق متخصص وخبرة طويلة في سوق العقارات الليبي.",
          image: "/Tom.JPG",
          url: "https://tom-gold.vercel.app",
        },
        {
          title: "ZidFollow",
          tag: "خدمات السوشيال ميديا",
          desc: "ZidFollow.shop هي خدمة لتنمية حسابات التواصل الاجتماعي — تساعدك على زيادة عدد متابعي إنستغرام، ومتابعي صفحات فيسبوك، والإعجابات، ومشاهدات تيك توك، والإعجابات، وغيرها، من خلال عملية طلب سهلة وسريعة.",
          image: "/zidfollow.JPG",
          url: "https://ZidFollow.shop",
        },
        {
          title: "عطور زمرد",
          tag: "صفحة هبوط",
          desc: "عطور فاخرة مصممة خصيصًا لعلامتك التجارية، حيث يقومون بصنع عطرك من الصفر — بمكونات فريدة تتناسب مع هوية علامتك التجارية، كما يقدمون لك الإرشاد في اختيار المكونات المناسبة لعلامتك التجارية وتطوير مفهوم عطرك.",
          image: "/Zumurt.JPG",
          url: null,
        },
        {
          title: "دار الفلك للكتاب",
          tag: "متجر إلكتروني",
          desc: "جميع أنواع الكتب، ولديهم بالفعل نشاط تجاري تقليدي، لكنهم أرادوا تطويره أكثر من خلال إطلاق علامتهم التجارية الإلكترونية الخاصة وجعلها متاحة للجميع.",
          image: "/darelfolk.JPG",
          url: "https://darelfolk.com",
        },
      ],
    },
    services: {
      eyebrow: "ماذا نقدم",
      title: "خدمات مواقع رقمية تحقق تأثيراً حقيقياً",
      subtitle:
        "حلول مواقع فعالة لا تقتصر على الجماليات — الموقع المناسب يعكس هوية علامتك التجارية، سهل الاستخدام، ويوجّه الزوار لاتخاذ الإجراء المطلوب.",
      items: [
        {
          title: "تصميم المواقع وتجربة المستخدم",
          desc: "كل عنصر من الخطوط والألوان إلى المسافات مصمم للحفاظ على تناسق العلامة التجارية وراحة الزوار.",
          cta: "شاهد أعمالنا",
        },
        {
          title: "ملف الشركة",
          desc: "ننشئ مواقع تعريفية تحكي من أنت، ماذا تفعل، ولماذا يختارك العملاء دون غيرك.",
          cta: "ابدأ الآن",
        },
        {
          title: "متجر إلكتروني وحجوزات",
          desc: "حوّل موقعك إلى آلة مبيعات مع كتالوجات المنتجات ونماذج الطلب وتجربة شراء سلسة.",
          cta: "زد مبيعاتي",
        },
        {
          title: "SEO والسرعة والصيانة",
          desc: "موقع جذاب يجب أن يكون سهل الوصول وسريع التحميل. نُحسّن البنية والمحتوى والسرعة مع حزم صيانة دورية.",
          cta: "حسّن موقعي",
        },
      ],
    },
    clientLogos: {
      eyebrow: "علامات تثق بنا",
      title: "موثوق من شركات مبتكرة",
      items: [
        { name: "Hopkins Foundation", image: "/client-hopkins.svg" },
        { name: "Café Lumière", image: "/client-cafe.svg" },
        { name: "KEE Visa", image: "/client-keevisa.svg" },
        { name: "Ryuben Consultancy", image: "/client-ryuben.svg" },
        { name: "MezTech Repairs", image: "/client-meztech.svg" },
        { name: "Atelier Nadia", image: "/client-nadia.svg" },
      ],
    },
    whyChoose: {
      eyebrow: "لماذا ZidlyWeb",
      title: "مُصمم لنجاحك",
      items: [
        {
          title: "حلول مخصصة",
          desc: "كل موقع يُصمم بناءً على أهداف عملك — من بنية الصفحة إلى عبارات الحث على اتخاذ إجراء. مخصص لعلامتك التجارية وجمهورك.",
          icon: "Code2",
        },
        {
          title: "تصميم أنيق",
          desc: "مظهر نظيف وعصري وسهل القراءة. التوازن بين الخطوط والألوان والمسافات يخلق تجربة راقية وسلسة.",
          icon: "Sparkles",
        },
        {
          title: "متوافق مع جميع الأجهزة",
          desc: "محسّن ليعمل بسلاسة على الحواسيب والأجهزة اللوحية والهواتف. الزوار يستمتعون بتجربة تصفح سلسة على أي جهاز.",
          icon: "Smartphone",
        },
        {
          title: "سهولة الإدارة",
          desc: "غيّر النصوص والصور والصفحات دون الاعتماد على مطورين. لوحة التحكم بسيطة والتحديثات اليومية سريعة.",
          icon: "ShieldCheck",
        },
      ],
    },
    process: {
      eyebrow: "كيف نعمل",
      title: "آلية عمل بسيطة",
      steps: [
        {
          title: "الاستشارة والتخطيط",
          desc: "نناقش أهداف عملك، جمهورك المستهدف، وما يحتاجه موقعك لتحقيقه. أحدد بنية الموقع والصفحات قبل بدء التصميم.",
        },
        {
          title: "التصميم والتطوير",
          desc: "أصمم تصميماً عصرياً يعكس هويتك وأبنيه بكود نظيف وسريع متوافق مع الجوال أولاً، لضمان مظهر رائع وتحميل فوري على أي جهاز.",
        },
        {
          title: "المراجعة والتعديلات",
          desc: "تراجع المعاينة المباشرة وتطلب التعديلات. نعمل معاً على تحسين التفاصيل حتى يطابق الموقع رؤيتك تماماً.",
        },
        {
          title: "الإطلاق والدعم",
          desc: "يصبح موقعك متاحاً، محسّناً لمحركات البحث وجاهزاً لاستقبال العملاء. أبقى متاحاً للتحديثات والدعم المستمر بعد ذلك.",
        },
      ],
    },
    testimonials: {
      eyebrow: "آراء العملاء",
      title: "ما يقوله عملائي",
      items: [
        {
          name: "أميرة بلقاسم",
          role: "صاحبة، Café Lumière",
          text: "أعاد أسامة تصميم موقع مقهانا في أقل من أسبوعين. أصبح يبدو محترفاً جداً، يحمّل بسرعة، وقد ذكر لنا عملاء جدد أنهم وجدونا عبر غوغل.",
        },
        {
          name: "ياسين مزيان",
          role: "مؤسس، MezTech Repairs",
          text: "أكثر ما لفت انتباهي هو التواصل. أوضح أسامة كل خطوة بوضوح، نفّذ تماماً ما تم الاتفاق عليه، والموقع النهائي يحقق تحويلات أفضل بكثير من موقعنا القديم.",
        },
        {
          name: "نادية شريف",
          role: "مديرة، Atelier Nadia",
          text: "كنت أحتاج متجراً إلكترونياً يبدو مميزاً وسهل الإدارة في الوقت نفسه. بنى أسامة ذلك بالضبط — تصميم نظيف، عملية شراء سلسة، ويعمل بشكل مثالي على الجوال. أنصح بالتعامل معه بشدة.",
        },
      ],
    },
    faq: {
      eyebrow: "معلومات مفيدة",
      title: "الأسئلة الشائعة",
      items: [
        {
          q: "كم يستغرق بناء موقع؟",
          a: "معظم مواقع الصفحة الواحدة تُنجز في 3-7 أيام. المواقع التجارية متعددة الصفحات والمتاجر الإلكترونية تستغرق عادة 1-3 أسابيع، حسب عدد الصفحات والميزات المطلوبة. سأقدم لك جدولاً زمنياً واضحاً قبل البدء.",
        },
        {
          q: "هل تقدم دعماً للاستضافة؟",
          a: "نعم. يمكنني مساعدتك في اختيار الاستضافة والدومين المناسبين، التعامل مع عملية النشر، والتأكد من أن كل شيء يعمل بسلاسة بعد الإطلاق.",
        },
        {
          q: "هل يمكنك إعادة تصميم موقعي الحالي؟",
          a: "بالتأكيد. يمكنني أخذ محتوى موقعك الحالي وإعادة بنائه بتصميم عصري، أداء أسرع، وتوافق أفضل مع الجوال — دون فقدان ما يعمل بشكل جيد.",
        },
        {
          q: "هل تبني متاجر إلكترونية؟",
          a: "نعم، أبني متاجر إلكترونية كاملة مع عرض المنتجات، عربة التسوق، بوابات دفع آمنة، وعمليات شراء محسّنة للجوال.",
        },
        {
          q: "هل سيعمل موقعي على الأجهزة المحمولة؟",
          a: "كل موقع أبنيه مصمم أولاً للهواتف والأجهزة اللوحية، ثم يُكيّف للحاسوب. سيبدو ويعمل بشكل رائع على أي حجم شاشة.",
        },
      ],
    },
    finalCta: {
      headline: "مستعد لإطلاق موقعك التالي؟",
      text: "من الصفحات التعريفية إلى مواقع الأعمال المتكاملة، نبني تجارب رقمية سريعة وعصرية ومركزة على التحويل.",
      ctaPrimary: "ابدأ مشروعك",
      ctaSecondary: "شاهد أعمالنا",
      trustCount: "موثوق من أكثر من 80 عميلاً",
    },
    contact: {
      eyebrow: "تواصل معي",
      title: "لنتحدث عن مشروعك",
      subtitle:
        "أخبرني قليلاً عن عملك وما تحتاجه — سأعود إليك بأفكار وخطوات تالية.",
      emailLabel: "البريد الإلكتروني",
      whatsappLabel: "واتساب",
      locationLabel: "الموقع",
      locationValue: "الجزائر",
      form: {
        nameLabel: "الاسم",
        namePlaceholder: "اسمك الكامل",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "example@email.com",
        whatsappLabel: "رقم الواتساب",
        whatsappPlaceholder: "+213 5XX XX XX XX",
        businessLabel: "اسم النشاط التجاري",
        businessPlaceholder: "اسم نشاطك أو علامتك التجارية",
        detailsLabel: "تفاصيل المشروع",
        detailsPlaceholder:
          "أخبرني عن مشروعك — نوع الموقع الذي تحتاجه، أهدافك، وأي مواعيد نهائية.",
        submit: "إرسال الرسالة",
        sending: "جارٍ الإرسال...",
        error: "حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.",
        successTitle: "تم إرسال الرسالة",
        successText:
          "شكراً على تواصلك — سأعود إليك خلال 24 ساعة لمناقشة مشروعك.",
      },
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
    },
    pricing: {
      badge: "تسعير بسيط",
      heading: "اختر الباقة المناسبة",
      subheading: "لا رسوم خفية ولا مفاجآت. اختر الباقة التي تناسب احتياجاتك.",
      plans: [
        {
          name: "ابتدائية",
          price: "من $149",
          desc: "مناسبة للمواقع الشخصية والمستقلين والمشاريع الصغيرة.",
          features: [
            "موقع صفحة واحدة متجاوب",
            "إعداد نطاق مخصص",
            "دمج نموذج تواصل",
            "تحسين محركات بحث أساسي",
            "تصميم متوافق مع الجوال",
            "تسليم خلال 3 أيام",
          ],
          cta: "ابدأ الآن",
        },
        {
          name: "تجارية",
          price: "من $349",
          desc: "مثالية للشركات المتنامية التي تحتاج حضوراً رقمياً قوياً.",
          featured: true,
          features: [
            "حتى 5 صفحات",
            "نظام إدارة محتوى (WordPress)",
            "تحسين محركات بحث متقدم",
            "دمج وسائل التواصل الاجتماعي",
            "نماذج واتساب وتواصل",
            "إعداد Google Analytics",
            "تسليم خلال 7 أيام",
          ],
          cta: "ابدأ مشوارك",
        },
        {
          name: "متجر إلكتروني",
          price: "من $699",
          desc: "للمتاجر الإلكترونية وحلول التجارة الإلكترونية المخصصة.",
          features: [
            "كتالوج منتجات (غير محدود)",
            "سلة تسوق وإتمام شراء",
            "دمج بوابات الدفع",
            "لوحة تحكم الطلبات",
            "تتبع المخزون",
            "تحسين محركات البحث لصفحات المنتجات",
            "تسليم خلال 14 يوم",
          ],
          cta: "تواصل معنا",
        },
      ],
    },
  },
} as const;

export type TranslationShape = typeof translations.en;
