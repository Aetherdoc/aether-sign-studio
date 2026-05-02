import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileSignature, Receipt, FileStack, Lock, Sparkles, Zap, Globe } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aether Doc — Free Browser-Based Document & Invoice Generator" },
      {
        name: "description",
        content:
          "Create elegant PDFs and professional invoices in your browser with Aether Doc. Free, private, no signup. Tools for freelancers, consultants, and small businesses.",
      },
      { property: "og:title", content: "Aether Doc — Free Browser-Based Document & Invoice Generator" },
      {
        property: "og:description",
        content: "Free browser-based tools to create premium documents and professional invoices. Private, instant, no signup.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Aether Doc",
          url: "https://aether-sign-studio.lovable.app",
          description:
            "Free browser-based tools to create premium documents and professional invoices.",
          publisher: { "@type": "Organization", name: "Aether Doc" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "AetherInvoice",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any (Web Browser)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
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

      {/* How it works */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-12">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">How it works</p>
        <h2 className="font-serif text-3xl md:text-4xl">From blank page to polished PDF in three steps.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Step number="01" title="Open the tool" body="Visit AetherSign or AetherInvoice in any modern browser. There's nothing to install and no account to create." />
          <Step number="02" title="Compose your content" body="Type or paste your text, add line items and your logo, then watch the live preview update as you work." />
          <Step number="03" title="Export a PDF" body="Click download to save a print-grade A4 PDF straight to your device. Send it to clients with confidence." />
        </div>
      </section>

      {/* Why */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-12">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">Why Aether Doc</p>
        <h2 className="font-serif text-3xl md:text-4xl">A quieter way to handle paperwork.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Feature icon={<Lock className="h-5 w-5" />} title="Private by design" body="Everything runs in your browser. We never see your documents." />
          <Feature icon={<Zap className="h-5 w-5" />} title="Instant" body="No signups, no loading dashboards. Open the tool and start creating." />
          <Feature icon={<Sparkles className="h-5 w-5" />} title="Beautifully crafted" body="Typography and layout tuned for serious, executive-grade output." />
          <Feature icon={<Globe className="h-5 w-5" />} title="Free forever" body="Both AetherSign and AetherInvoice are free for individual use." />
        </div>
      </section>

      {/* Use cases */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-12">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">Use cases</p>
        <h2 className="font-serif text-3xl md:text-4xl">Built for the work you actually do.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <UseCase title="Freelancers & consultants" body="Send polished invoices and engagement letters that match the calibre of your work." />
          <UseCase title="Small agencies" body="Produce proposals, statements of work, and client-ready memos in minutes — not hours." />
          <UseCase title="Founders & operators" body="Draft offer letters, NDAs, and internal documents without opening a heavyweight word processor." />
          <UseCase title="Anyone billing clients" body="Generate accurate invoices with your logo, line items, tax, and payment terms." />
        </div>
      </section>

      {/* FAQ */}
      <section id="philosophy" className="relative z-10 mx-auto max-w-4xl px-6 pb-32 lg:px-12">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">FAQ</p>
        <h2 className="font-serif text-3xl md:text-4xl">Common questions</h2>
        <div className="mt-10 space-y-6">
          <Faq q="Is Aether Doc really free?" a="Yes. Both AetherSign and AetherInvoice are free to use without an account or credit card." />
          <Faq q="Where do my documents go?" a="Nowhere but your device. Documents and invoices are generated in your browser and downloaded directly. We never receive a copy." />
          <Faq q="Do I need to install anything?" a="No. Aether Doc runs entirely in any modern desktop or laptop browser." />
          <Faq q="Can I use the invoices for my business?" a="Yes. The PDFs are professionally formatted and suitable for client billing. Always verify local tax and invoicing requirements." />
        </div>
        <div className="mt-10">
          <Link to="/about" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] gold-text">
            Read more about us <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 text-sm text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Aether Doc. Crafted with restraint.</p>
          <nav className="flex flex-wrap gap-5">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/aethersign" className="hover:text-white">AetherSign</Link>
            <Link to="/aetherinvoice" className="hover:text-white">AetherInvoice</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </nav>
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

function Step({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="glass-panel rounded-2xl p-8">
      <div className="font-serif text-sm gold-text">{number}</div>
      <h3 className="mt-4 font-serif text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{body}</p>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 gold-text">
        {icon}
      </div>
      <h3 className="font-serif text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
    </div>
  );
}

function UseCase({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-panel rounded-2xl p-6">
      <h3 className="font-serif text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-white/10 pb-6">
      <h3 className="font-serif text-lg text-white">{q}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{a}</p>
    </div>
  );
}
