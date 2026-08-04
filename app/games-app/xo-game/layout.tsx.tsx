import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XO Game | ZidlyWeb",
  description: "Multiplayer XO game for Facebook groups by ZidlyWeb.site",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function XOLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}