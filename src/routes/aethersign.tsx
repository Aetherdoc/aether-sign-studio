import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, Check, Download, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  TEMPLATES,
  getTemplateBackground,
  renderTemplate,
  type TemplateId,
} from "@/lib/aether-templates";

export const Route = createFileRoute("/aethersign")({
  head: () => ({
    meta: [
      { title: "AetherSign — Aether Doc" },
      {
        name: "description",
        content:
          "AetherSign is a browser-based document formatter. Compose a title, client name, and body — preview a print-grade PDF live and download it instantly.",
      },
      { property: "og:title", content: "AetherSign — Aether Doc" },
      {
        property: "og:description",
        content: "Compose, preview, and export executive-grade documents in your browser.",
      },
    ],
  }),
  component: AetherSignPage,
});

const SAMPLE = {
  title: "Engagement Letter",
  client: "Wilkinson & Hayes Capital",
  body: `It is our pleasure to confirm the terms of our engagement and the nature of the services we will provide.

This letter sets out the scope of our work, our mutual responsibilities, and the basis on which our fees will be charged. Should you have any questions about the contents that follow, please do not hesitate to reach out at your convenience.

We are grateful for the opportunity to work alongside your team and look forward to a productive partnership in the months ahead.`,
};

function AetherSignPage() {
  const [template, setTemplate] = useState<TemplateId>("executive");
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [body, setBody] = useState("");
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const [{ jsPDF }, html2canvasMod] = await Promise.all([
        import("jspdf"),
        import("html2canvas-pro"),
      ]);
      const html2canvas = html2canvasMod.default;

      const A4_W = 210;
      const A4_H = 297;
      const MARGIN_X = 24;
      const MARGIN_Y = 28;
      const CONTENT_W = A4_W - MARGIN_X * 2;
      const SECTION_GAP = 3;

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      let y = MARGIN_Y;

      const sections = Array.from(
        previewRef.current.querySelectorAll<HTMLElement>("[data-pdf-section]"),
      );

      for (const section of sections) {
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          backgroundColor: getTemplateBackground(template),
        });
        const heightMM = (canvas.height / canvas.width) * CONTENT_W;
        const remaining = A4_H - MARGIN_Y - y;

        if (heightMM > remaining && y > MARGIN_Y) {
          pdf.addPage();
          y = MARGIN_Y;
        }

        const imgData = canvas.toDataURL("image/jpeg", 0.98);
        pdf.addImage(imgData, "JPEG", MARGIN_X, y, CONTENT_W, heightMM);
        y += heightMM + SECTION_GAP;
      }

      // Footer on every page
      const pageCount = pdf.getNumberOfPages();
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(150);
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.text("CONFIDENTIAL · AETHER DOC", MARGIN_X, A4_H - 12);
        pdf.text(`PAGE ${i} OF ${pageCount}`, A4_W - MARGIN_X, A4_H - 12, { align: "right" });
      }

      const filename = `AetherSign-${(title || "Untitled").replace(/[^\w\s-]/g, "").trim() || "Untitled"}.pdf`;
      pdf.save(filename);
      toast.success("Document downloaded", { description: filename });
    } catch (err) {
      console.error(err);
      toast.error("Could not generate PDF", { description: "Please try again." });
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setClient("");
    setBody("");
  };

  const handleSample = () => {
    setTitle(SAMPLE.title);
    setClient(SAMPLE.client);
    setBody(SAMPLE.body);
  };

  return (
    <main className="relative min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-10">
          <Link
            to="/"
            className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--gold)]/40">
                <span className="font-serif text-xs gold-text">Æ</span>
              </div>
              <span className="font-serif text-lg tracking-wide text-white">Aether Doc</span>
            </div>
          </Link>
          <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40 md:flex">
            <span className="h-1 w-1 rounded-full gold-bg" />
            AetherSign
          </div>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="gold-bg rounded-full px-5 text-sm font-medium text-black hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Preparing…" : "Download PDF"}
          </Button>
        </div>
      </header>

      {/* Workspace */}
      <div className="mx-auto grid max-w-[1600px] gap-6 px-6 py-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:px-10">
        {/* Left: Inputs */}
        <section className="glass-panel rounded-2xl p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] gold-text">01 — Compose</p>
              <h2 className="font-serif text-2xl">Document Details</h2>
            </div>
            <button
              onClick={handleSample}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-[var(--gold)]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Sample
            </button>
          </div>

          <div className="space-y-7">
            <Field label="Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Engagement Letter"
                className="input-underline w-full text-lg text-white placeholder:text-white/25"
              />
            </Field>

            <Field label="Client Name">
              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Wilkinson & Hayes Capital"
                className="input-underline w-full text-lg text-white placeholder:text-white/25"
              />
            </Field>

            <Field label="Body Text" hint={`${body.length} characters`}>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Begin with a salutation, then articulate the matter at hand. Use double line breaks to separate paragraphs."
                rows={14}
                className="input-underline w-full resize-y text-base leading-relaxed text-white placeholder:text-white/25"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 0.15)" }}
              />
            </Field>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 transition hover:text-white/80"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
            <p className="text-xs text-white/30">Updates appear live on the right.</p>
          </div>
        </section>

        {/* Right: Preview */}
        <section>
          <div className="mb-4 flex items-center justify-between px-1">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">02 — Preview</p>
            <p className="text-xs text-white/30">A4 · 210 × 297 mm</p>
          </div>

          <div className="flex justify-center">
            <div
              className="w-full max-w-[800px] overflow-hidden rounded-sm"
              style={{ boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)" }}
            >
              <div ref={previewRef}>
                {renderTemplate(template, { title, client, body, today })}
              </div>
            </div>
          </div>
                {/* Header rule */}
                <div
                  data-pdf-section=""
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    paddingBottom: "8mm",
                    borderBottom: "1px solid #d4b67a",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "9px",
                        letterSpacing: "0.3em",
                        color: "#8a7a5a",
                        textTransform: "uppercase",
                      }}
                    >
                      Aether Doc
                    </div>
                    <div
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: "20px",
                        color: "#d4b67a",
                        marginTop: "2mm",
                      }}
                    >
                      Æ
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      color: "#666",
                      textTransform: "uppercase",
                    }}
                  >
                    {today}
                  </div>
                </div>

                {/* Title */}
                <div data-pdf-section="" style={{ marginTop: "22mm" }}>
                  <h1
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: "42px",
                      fontWeight: 600,
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      color: "#1a1a1a",
                      margin: 0,
                    }}
                  >
                    {title || "Untitled Document"}
                  </h1>
                </div>

                {/* Client */}
                <div data-pdf-section="" style={{ marginTop: "8mm" }}>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#8a7a5a",
                      margin: "0 0 2mm 0",
                    }}
                  >
                    Prepared for
                  </p>
                  <p
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: "18px",
                      fontStyle: "italic",
                      color: "#333",
                      margin: 0,
                    }}
                  >
                    {client || "—"}
                  </p>
                </div>

                {/* Divider */}
                <div
                  data-pdf-section=""
                  style={{
                    width: "20mm",
                    height: "1px",
                    background: "#d4b67a",
                    marginTop: "12mm",
                  }}
                />

                {/* Body — paragraph-per-section so pagination is clean */}
                <div style={{ marginTop: "10mm" }}>
                  {(body
                    ? body.split(/\n\s*\n/)
                    : [
                        "Your composition will appear here. Begin typing on the left to see your document take shape.",
                      ]
                  ).map((para, i) => (
                    <p
                      key={i}
                      data-pdf-section=""
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: "12pt",
                        lineHeight: 1.75,
                        color: "#222",
                        textAlign: "justify",
                        whiteSpace: "pre-wrap",
                        margin: "0 0 5mm 0",
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs uppercase tracking-[0.25em] text-white/50">{label}</label>
        {hint && <span className="text-[10px] text-white/30">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
