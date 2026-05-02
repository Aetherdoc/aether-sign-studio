import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Aether Doc" },
      {
        name: "description",
        content:
          "Terms of service for Aether Doc — free browser-based document and invoice tools. Read the rules that govern your use of the Service.",
      },
      { property: "og:title", content: "Terms of Service — Aether Doc" },
      {
        property: "og:description",
        content: "The rules that govern your use of Aether Doc tools.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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

      <article className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12 lg:py-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-white/50">Last updated: May 2, 2026</p>

        <Section title="Acceptance of terms">
          By accessing or using Aether Doc (the "Service"), you agree to be bound by these Terms of
          Service. If you do not agree, please do not use the Service.
        </Section>

        <Section title="Use of the Service">
          Aether Doc provides free, browser-based tools for composing documents and invoices. You
          may use the Service for personal or commercial purposes, subject to these Terms and any
          applicable laws.
        </Section>

        <Section title="Your content">
          You retain all rights to the documents, invoices, logos, and other content you create
          with the Service. Because content is processed entirely in your browser, we never
          receive a copy of it.
        </Section>

        <Section title="Acceptable use">
          <p>You agree not to use the Service to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Create or distribute fraudulent, deceptive, or illegal documents or invoices.</li>
            <li>Infringe on the intellectual property or privacy rights of others.</li>
            <li>Attempt to disrupt, reverse-engineer, or gain unauthorized access to the Service.</li>
            <li>Use the Service in any way that violates applicable law.</li>
          </ul>
        </Section>

        <Section title="No warranty">
          The Service is provided "as is" and "as available" without warranties of any kind,
          express or implied. While we strive for high quality, we do not guarantee that the
          Service will be uninterrupted, error-free, or fit for any particular purpose.
        </Section>

        <Section title="Limitation of liability">
          To the maximum extent permitted by law, Aether Doc and its operators shall not be liable
          for any indirect, incidental, special, consequential, or punitive damages arising from
          your use of the Service.
        </Section>

        <Section title="Third-party services">
          The Service relies on third-party providers for analytics and, where applicable,
          advertising. Your use of those services is subject to their respective terms.
        </Section>

        <Section title="Changes to the terms">
          We may update these Terms from time to time. Continued use of the Service after changes
          constitutes acceptance of the new Terms.
        </Section>

        <Section title="Contact">
          Questions about these Terms? Reach us via the <Link to="/contact" className="gold-text underline">Contact page</Link>.
        </Section>
      </article>

      <SiteFooter />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl text-white">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-white/65">{children}</div>
    </section>
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
