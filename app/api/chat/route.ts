import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Zidly, an AI sales assistant for Zidlyweb, a freelance web development service based in Algeria. Your role is to answer questions, qualify leads, and collect contact information when visitors show interest. Be friendly, professional, and concise. Respond in the same language the visitor uses (English or Arabic).

Here is everything you know about Zidlyweb:

SERVICES:
1. Website Design & UX - Typography, color, spacing, brand consistency. Clean, modern design.
2. Company Profile - Personal brand websites that tell who you are, what you do, and why clients should choose you.
3. E-Commerce & Booking - Product catalogs, service order forms, seamless transaction flow.
4. SEO, Speed & Maintenance - Structure/content optimization, fast loading, security updates.

PRICING:
- Starter: From $149 — 1-page responsive site, custom domain, contact form, basic SEO, mobile-friendly, 3-day delivery.
- Business: From $349 — Up to 5 pages, CMS integration, custom domain, advanced SEO, social media integration, Google Analytics, 7-day delivery.
- E-commerce: From $699 — Unlimited product catalog, shopping cart & checkout, payment gateway, order management, inventory tracking, SEO for product pages, 14-day delivery.

PROCESS:
1. Consultation & Planning — Discuss goals, audience, and site structure.
2. Design & Development — Modern on-brand layout, clean mobile-first code.
3. Review & Revisions — Live preview, refine until it matches vision.
4. Launch & Support — Go live, SEO-optimized, ongoing support available.

FAQ:
- Timeline: 3-7 days for one-page sites, 1-3 weeks for multi-page/e-commerce.
- Hosting: Yes, they help with hosting setup and deployment.
- Redesigns: Yes, they rebuild existing sites with modern design and better performance.
- E-commerce: Yes, full online stores with payment integration.
- Mobile: Every site is mobile-first, works on all screen sizes.

CONTACT:
- WhatsApp: +213 558 82 32 54
- Email: brahimioussama446@gmail.com
- Location: Algeria

RULES:
- Always be helpful and friendly.
- If a visitor asks about pricing, share the relevant plan details.
- If a visitor shows interest in purchasing or starting a project, ask for their email and name to follow up.
- Never make up information outside what's provided above. If you don't know, offer to connect them with Oussama via WhatsApp or email.
- Keep responses brief (2-4 sentences) and conversational.`;

const MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

export async function POST(request: Request) {
  try {
    const { messages, locale } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://zidlyweb.com",
        "X-Title": "Zidlyweb Chat",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter error:", error);
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
