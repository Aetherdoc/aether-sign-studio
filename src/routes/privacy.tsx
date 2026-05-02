import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Aether Doc" },
      {
        name: "description",
        content:
          "Aether Doc privacy policy. Learn how our browser-based document and invoice tools handle your data, cookies, and analytics.",
      },
      { property: "og:title", content: "Privacy Policy — Aether Doc" },
      {
        property: "og:description",
        content: "How Aether Doc handles your data, cookies, and analytics.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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

      <article className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12 lg:py-16 prose-invert">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] gold-text">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-white/50">Last updated: May 2, 2026</p>

        <Section title="Overview">
          Aether Doc ("we", "our", "the Service") provides free, browser-based document and invoice
          tools at this website. We respect your privacy and have designed our tools so that the
          documents and invoices you create are processed entirely within your browser. We do not
          upload, view, or store the content you compose.
        </Section>

        <Section title="Information we collect">
          <p>We collect a limited amount of information to operate and improve the Service:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Usage analytics</strong> — We use Google Analytics to understand how visitors
              use our pages (page views, device type, country, referring source). This data is
              aggregated and does not identify you personally.
            </li>
            <li>
              <strong>Log data</strong> — Our hosting provider may automatically record standard
              server logs, including IP address, browser type, and request timestamps, for security
              and reliability purposes.
            </li>
            <li>
              <strong>Cookies</strong> — We use a small number of cookies for analytics and to
              remember your preferences. You can disable cookies in your browser at any time.
            </li>
          </ul>
        </Section>

        <Section title="Information we do NOT collect">
          <p>
            We do <strong>not</strong> collect, upload, or store the contents of the documents and
            invoices you create. All formatting, preview, and PDF export happens locally in your
            browser. Logos you upload to AetherInvoice are processed in-memory and never sent to
            our servers.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>We rely on a small number of third-party services to deliver the Service:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Google Analytics</strong> — for traffic measurement. See Google's privacy
              policy at policies.google.com/privacy.
            </li>
            <li>
              <strong>Google AdSense</strong> — if and when ads are displayed, Google and its
              partners may use cookies to serve ads based on your prior visits to this and other
              websites. You can opt out of personalized advertising at adssettings.google.com.
            </li>
            <li>
              <strong>Hosting providers</strong> — used to deliver the website over HTTPS.
            </li>
          </ul>
        </Section>

        <Section title="Children's privacy">
          The Service is not directed to children under the age of 13, and we do not knowingly
          collect personal information from children.
        </Section>

        <Section title="Your rights">
          You may request information about, or deletion of, any personal data we hold about you by
          contacting us via the Contact page. As we collect very little personal data, most
          requests can be honored simply by clearing cookies in your browser.
        </Section>

        <Section title="Changes to this policy">
          We may update this Privacy Policy from time to time. Material changes will be reflected
          by updating the "Last updated" date at the top of this page.
        </Section>

        <Section title="Contact">
          For privacy-related questions, please reach out via the <Link to="/contact" className="gold-text underline">Contact page</Link>.
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
