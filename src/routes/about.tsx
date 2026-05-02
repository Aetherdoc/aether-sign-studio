import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileSignature, Receipt, ShieldCheck, Sparkles, Lock, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aether Doc — Browser-based Document & Invoice Tools" },
      {
        name: "description",
        content:
          "Learn about Aether Doc: a refined suite of free, browser-based tools including AetherSign for documents and AetherInvoice for professional invoices. Private, fast, and beautifully designed.",
      },
      { property: "og:title", content: "About Aether Doc — Browser-based Document & Invoice Tools" },
      {
        property: "og:description",
        content:
          "Discover how Aether Doc helps freelancers, consultants, and small businesses craft pristine PDFs and invoices in the browser — no signup, no servers.",
      },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Aether Doc",
          description:
            "Aether Doc is a refined suite of browser-based tools for creating premium documents and invoices.",
          publisher: {
            "@type": "Organization",
            name: "Aether Doc",
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--gold)]/40">
            <span className="font-serif text-sm gold-text">Æ</span>
          </div>
          <span className="font-serif text-xl tracking-wide">Aether Doc</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <Link to="/" className="transition hover:text-white">
            Home
          </Link>
          <Link to="/about" className="text-white">
            About
          </Link>
          <Link
            to="/aethersign"
            className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2 text-[var(--gold)] transition hover:bg-[var(--gold)]/20"
          >
            Launch AetherSign
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-12 lg:px-12 lg:pt-20">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] gold-text">About Aether Doc</p>
        <h1 className="font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
          Refined paperwork,
          <br />
          <span className="gold-text italic">made effortless.</span>
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-white/65">
          Aether Doc is a small, focused suite of free browser-based tools that help freelancers,
          consultants, agencies, and small businesses produce client-ready documents and invoices —
          without bloated software, accounts, or monthly fees. Everything runs entirely in your browser,
          which means your data never leaves your device.
        </p>
      </section>

      {/* Mission */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-20 lg:px-12">
        <div className="glass-panel rounded-2xl p-8 md:p-12">
          <h2 className="font-serif text-3xl md:text-4xl">Our mission</h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Most document software is overbuilt. It asks you to sign up, upload sensitive files to a
            server, navigate cluttered interfaces, and pay a subscription for features you'll never use.
            We believe modern professionals deserve better. Aether Doc strips the experience down to
            what matters: a quiet workspace, beautiful typography, and a pristine PDF at the end.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Every tool in the suite shares the same philosophy — minimal, private, instant.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">Our Products</p>
        <h2 className="font-serif text-3xl md:text-4xl">What you can build with Aether Doc</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* AetherSign */}
          <article className="glass-panel rounded-2xl p-8">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 gold-text">
              <FileSignature className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-2xl">AetherSign</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              A browser-based document formatter for crafting elegant, executive-grade PDFs — letters,
              proposals, contracts, memos, statements of work, and more.
            </p>
            <h4 className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">How to use it</h4>
            <ol className="mt-3 space-y-2 text-sm text-white/65">
              <li><span className="gold-text">1.</span> Open AetherSign in your browser.</li>
              <li><span className="gold-text">2.</span> Choose a template style that fits your tone.</li>
              <li><span className="gold-text">3.</span> Type or paste your content into the editor.</li>
              <li><span className="gold-text">4.</span> Preview the live, formatted document.</li>
              <li><span className="gold-text">5.</span> Export a print-ready PDF in one click.</li>
            </ol>
            <Link
              to="/aethersign"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] gold-text"
            >
              Try AetherSign <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>

          {/* AetherInvoice */}
          <article className="glass-panel rounded-2xl p-8">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 gold-text">
              <Receipt className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-2xl">AetherInvoice</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              A free invoice generator for freelancers and small businesses. Add your logo, line items,
              tax, and payment terms — then export a professional PDF ready to send to clients.
            </p>
            <h4 className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">How to use it</h4>
            <ol className="mt-3 space-y-2 text-sm text-white/65">
              <li><span className="gold-text">1.</span> Open AetherInvoice in your browser.</li>
              <li><span className="gold-text">2.</span> Upload your logo (it appears top-left on the invoice).</li>
              <li><span className="gold-text">3.</span> Fill in sender, client, dates, and line items.</li>
              <li><span className="gold-text">4.</span> Set a tax rate — totals calculate automatically.</li>
              <li><span className="gold-text">5.</span> Download a polished A4 PDF and send it off.</li>
            </ol>
            <Link
              to="/aetherinvoice"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] gold-text"
            >
              Try AetherInvoice <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        </div>
      </section>

      {/* Why */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">Why Aether Doc</p>
        <h2 className="font-serif text-3xl md:text-4xl">Built around three quiet principles</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ValueCard
            icon={<Lock className="h-5 w-5" />}
            title="Private by design"
            body="Your documents are generated entirely in your browser. We never upload, store, or see your content. No account is required to use any tool."
          />
          <ValueCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Beautifully crafted"
            body="Typography, spacing, and color are tuned for serious work. Each export looks like it came from a design studio — not a templating engine."
          />
          <ValueCard
            icon={<Globe className="h-5 w-5" />}
            title="Instantly accessible"
            body="No installs, no signup walls, no subscriptions. Open the site, do the work, export the PDF. Free forever for individual use."
          />
        </div>
      </section>

      {/* Who it's for */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-20 lg:px-12">
        <div className="glass-panel rounded-2xl p-8 md:p-12">
          <h2 className="font-serif text-3xl md:text-4xl">Who Aether Doc is for</h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Aether Doc is built for people who care about how their work is presented:
          </p>
          <ul className="mt-5 space-y-2 text-sm text-white/65">
            <li>• Freelance designers, developers, writers, and consultants invoicing clients.</li>
            <li>• Small agencies preparing proposals and statements of work.</li>
            <li>• Founders and operators sending offer letters, memos, and contracts.</li>
            <li>• Anyone who needs a clean PDF without opening a word processor.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 lg:px-12">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">FAQ</p>
        <h2 className="font-serif text-3xl md:text-4xl">Common questions</h2>
        <div className="mt-10 space-y-6">
          <Faq
            q="Is Aether Doc free?"
            a="Yes. Both AetherSign and AetherInvoice are free to use without an account. We may add optional paid features in the future, but the core tools will remain free."
          />
          <Faq
            q="Where are my documents stored?"
            a="Nowhere but on your device. Documents are generated in your browser using JavaScript, and PDFs are downloaded directly. We never receive a copy of your content."
          />
          <Faq
            q="Can I use Aether Doc invoices for my business?"
            a="Yes. The invoices are professionally formatted and suitable for client billing. Always check local tax and invoicing requirements in your jurisdiction."
          />
          <Faq
            q="Do I need to install anything?"
            a="No. Aether Doc runs in any modern web browser on desktop or laptop. There is nothing to install or update."
          />
          <Faq
            q="How do I contact you?"
            a="For questions, feedback, or partnership inquiries, reach out via the homepage or our published contact channels."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 text-center lg:px-12">
        <ShieldCheck className="mx-auto h-8 w-8 gold-text" />
        <h2 className="mt-6 font-serif text-3xl md:text-4xl">Ready to create something refined?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Pick a tool and have a polished PDF in your hands in under a minute.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/aethersign"
            className="inline-flex items-center gap-2 rounded-full gold-bg px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
          >
            Open AetherSign <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/aetherinvoice"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Open AetherInvoice <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-sm text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Aether Doc. Crafted with restraint.</p>
          <p className="font-serif italic">"Less, but better."</p>
        </div>
      </footer>
    </main>
  );
}

function ValueCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 gold-text">
        {icon}
      </div>
      <h3 className="font-serif text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{body}</p>
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
