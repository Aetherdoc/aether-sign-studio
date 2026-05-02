import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageSquare, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Aether Doc — Get in Touch" },
      {
        name: "description",
        content:
          "Contact Aether Doc with questions, feedback, partnership inquiries, or privacy requests about our document and invoice tools.",
      },
      { property: "og:title", content: "Contact Aether Doc — Get in Touch" },
      {
        property: "og:description",
        content: "Reach the Aether Doc team for support, feedback, or partnership inquiries.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Aether Doc",
          url: "/contact",
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--gold)]/40">
            <span className="font-serif text-sm gold-text">Æ</span>
          </div>
          <span className="font-serif text-xl tracking-wide">Aether Doc</span>
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12 lg:px-12 lg:py-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">Contact</p>
        <h1 className="font-serif text-4xl md:text-6xl">Let's talk.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
          Whether you've found a bug, have a feature idea, want to partner with us, or just want to
          say hello — we'd love to hear from you.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            title="Email"
            body="For all inquiries, including support, feedback, and privacy requests."
            value="hello@aetherdoc.app"
            href="mailto:hello@aetherdoc.app"
          />
          <ContactCard
            icon={<MessageSquare className="h-5 w-5" />}
            title="Feedback"
            body="Spotted something we could improve? We read every message and reply when we can."
            value="feedback@aetherdoc.app"
            href="mailto:feedback@aetherdoc.app"
          />
          <ContactCard
            icon={<Clock className="h-5 w-5" />}
            title="Response time"
            body="We're a small team. Most messages receive a reply within 2–3 business days."
          />
        </div>

        <div className="glass-panel mt-12 rounded-2xl p-8">
          <h2 className="font-serif text-2xl">What to include</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            To help us respond quickly, please include:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            <li>• Which tool you were using (AetherSign or AetherInvoice).</li>
            <li>• Your browser and operating system if reporting a bug.</li>
            <li>• A short description of what happened and what you expected.</li>
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ContactCard({
  icon,
  title,
  body,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  value?: string;
  href?: string;
}) {
  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 gold-text">
        {icon}
      </div>
      <h3 className="font-serif text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
      {value && href && (
        <a href={href} className="mt-4 inline-block text-sm gold-text hover:underline">
          {value}
        </a>
      )}
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-sm text-white/40 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Aether Doc. Crafted with restraint.</p>
        <nav className="flex gap-5">
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
