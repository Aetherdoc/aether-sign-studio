import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileSignature, Receipt, FileStack } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aether Doc — Documents, refined." },
      {
        name: "description",
        content:
          "Aether Doc is a suite of refined, browser-based document tools for executives. Format, sign, and deliver beautifully — no servers, no fuss.",
      },
      { property: "og:title", content: "Aether Doc — Documents, refined." },
      {
        property: "og:description",
        content: "A premium suite of browser-based document tools for the modern executive.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Top nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--gold)]/40">
            <span className="font-serif text-sm gold-text">Æ</span>
          </div>
          <span className="font-serif text-xl tracking-wide">Aether Doc</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#suite" className="transition hover:text-white">
            The Suite
          </a>
          <Link to="/about" className="transition hover:text-white">
            About
          </Link>
          <Link
            to="/aethersign"
            className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2 text-[var(--gold)] transition hover:bg-[var(--gold)]/20"
          >
            AetherSign
          </Link>
          <Link
            to="/aetherinvoice"
            className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2 text-[var(--gold)] transition hover:bg-[var(--gold)]/20"
          >
            AetherInvoice
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-12 lg:pt-28">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/60 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full gold-bg" />
            New · AetherSign 1.0
          </div>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Documents,
            <br />
            <span className="gold-text italic">refined.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            Aether Doc is a quiet workspace for serious paperwork. Compose,
            preview, and deliver client-ready documents — entirely in your browser,
            with the polish your work deserves.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/aethersign"
              className="group inline-flex items-center gap-3 rounded-full gold-bg px-7 py-3.5 text-sm font-medium text-black transition hover:opacity-90"
            >
              Open AetherSign
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#suite"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Explore the suite
            </a>
          </div>
        </div>
      </section>

      {/* Suite */}
      <section id="suite" className="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-12">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">The Suite</p>
            <h2 className="font-serif text-3xl md:text-4xl">A small family of refined tools.</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <SuiteCard
            available
            title="AetherSign"
            description="Compose and export pristine, client-ready documents in your browser."
            icon={<FileSignature className="h-5 w-5" />}
            cta="Launch"
            to="/aethersign"
          />
          <SuiteCard
            available
            title="AetherInvoice"
            description="Generate beautifully formatted invoices with your logo, line items, and tax."
            icon={<Receipt className="h-5 w-5" />}
            cta="Launch"
            to="/aetherinvoice"
          />
          <SuiteCard
            title="AetherVault"
            description="Encrypted, share-only links for private documents and addenda."
            icon={<FileStack className="h-5 w-5" />}
            cta="Coming soon"
          />
        </div>
      </section>

      {/* Footer */}
      <footer
        id="philosophy"
        className="relative z-10 border-t border-white/5 px-6 py-10 lg:px-12"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-sm text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Aether Doc. Crafted with restraint.</p>
          <p className="font-serif italic">"Less, but better."</p>
        </div>
      </footer>
    </main>
  );
}

function SuiteCard({
  title,
  description,
  icon,
  cta,
  available,
  to,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
  available?: boolean;
  to?: "/aethersign" | "/aetherinvoice";
}) {
  const inner = (
    <div
      className={`glass-panel group relative flex h-full flex-col rounded-2xl p-8 transition ${
        available ? "hover:border-[var(--gold)]/30" : "opacity-70"
      }`}
    >
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 gold-text">
        {icon}
      </div>
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{description}</p>
      <div
        className={`mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] ${
          available ? "gold-text" : "text-white/40"
        }`}
      >
        {cta}
        {available && <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />}
      </div>
    </div>
  );
  return available && to ? <Link to={to}>{inner}</Link> : <div>{inner}</div>;
}
