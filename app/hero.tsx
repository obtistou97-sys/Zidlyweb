export function Hero() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-12 px-6 py-24 lg:px-12">
        <div className="col-span-12 lg:col-span-7">
          <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted">
            ZidlyWeb
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-[1.1] tracking-tight lg:text-6xl font-display">
            Websites That{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Build Trust
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">
            A professional website helps you build trust, explain your services
            clearly, and position your business as a serious brand ready to
            compete at a higher level.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            >
              Contact us today
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white"
            >
              Contact
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 flex items-center justify-center lg:col-span-5">
          <div className="relative w-full overflow-hidden rounded-sm bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 border-b border-white/5 bg-surface px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
              </div>
              <div className="ml-3 flex-1 rounded bg-black/30 px-3 py-1 text-xs text-text-muted">
                zidlyweb.com
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary" />
                  <div className="h-3 w-20 rounded-lg bg-white/10" />
                </div>
                <div className="flex gap-3">
                  <div className="h-2.5 w-12 rounded-lg bg-white/5" />
                  <div className="h-2.5 w-12 rounded-lg bg-white/5" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="h-4 w-4/5 rounded-lg bg-white/15" />
                <div className="h-4 w-3/5 rounded-lg bg-white/8" />
                <div className="h-3 w-2/5 rounded-lg bg-white/5" />
              </div>

              <div className="flex gap-3 pt-1">
                <div className="h-9 w-28 rounded-md bg-primary" />
                <div className="h-9 w-28 rounded-md border border-white/10" />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-lg border border-white/5 bg-white/[0.02]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: "60+", label: "Clients Trusted" },
  { value: "100%", label: "Responsive" },
  { value: "Fast", label: "Delivery" },
];
