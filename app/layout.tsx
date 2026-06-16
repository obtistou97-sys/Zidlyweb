import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, LanguageProvider } from "./providers";

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem('oussama-portfolio-theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
    var locale = localStorage.getItem('oussama-portfolio-locale');
    if (locale === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://zidlyweb.com"),
  title: "zidlyweb | Freelance Web Developer in Algeria",
  description:
    "Professional, modern, mobile-responsive websites for small businesses, entrepreneurs, and startups. One-page sites, business websites, e-commerce stores, redesigns, and SEO optimization.",
  keywords: [
    "web developer Algeria",
    "freelance web developer",
    "website design",
    "business website",
    "e-commerce website",
    "landing page developer",
    "SEO website",
    "zidlyweb",
  ],
  authors: [{ name: "zidlyweb" }],
  openGraph: {
    title: "zidlyweb | Freelance Web Developer in Algeria",
    description:
      "Professional websites that help your business grow. Modern, fast, mobile-responsive, and SEO-friendly web development.",
    type: "website",
    locale: "en_US",
    url: "https://zidlyweb.com",
    siteName: "zidlyweb",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "zidlyweb - Freelance Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "zidlyweb | Freelance Web Developer in Algeria",
    description:
      "Professional websites that help your business grow. Modern, fast, mobile-responsive, and SEO-friendly web development.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans bg-white text-[#1E293B] dark:bg-black dark:text-white antialiased transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
