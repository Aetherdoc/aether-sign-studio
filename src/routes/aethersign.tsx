import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, Check, Download, Plus, RotateCcw, Sparkles, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  TEMPLATES,
  getTemplateBackground,
  renderTemplate,
  type CustomField,
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
  const [showPageNumbers, setShowPageNumbers] = useState(false);
  const [signature, setSignature] = useState<string | undefined>(undefined);
  const [signerName, setSignerName] = useState("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);

  const handleSignatureUpload = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, SVG).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Signature must be under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setSignature(reader.result as string);
    reader.onerror = () => toast.error("Could not read the file.");
    reader.readAsDataURL(file);
  };

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
        if (showPageNumbers) {
          pdf.text(`PAGE ${i} OF ${pageCount}`, A4_W - MARGIN_X, A4_H - 12, { align: "right" });
        }
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
    setSignature(undefined);
    setSignerName("");
    setCustomFields([]);
  };

  const addCustomField = () => {
    setCustomFields((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: "", value: "" },
    ]);
  };

  const updateCustomField = (id: string, patch: Partial<CustomField>) => {
    setCustomFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const removeCustomField = (id: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== id));
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

          {/* Template picker */}
          <div className="mb-8">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/50">Template</p>
            <div className="grid grid-cols-5 gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`group relative flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition ${
                    template === t.id
                      ? "border-[var(--gold)]/60 bg-[var(--gold)]/10"
                      : "border-white/8 bg-white/3 hover:border-white/20"
                  }`}
                >
                  <div className="flex gap-0.5">
                    <span
                      className="block h-3 w-3 rounded-full"
                      style={{ background: t.swatch.bg, border: "1px solid rgba(255,255,255,0.15)" }}
                    />
                    <span
                      className="block h-3 w-3 rounded-full"
                      style={{ background: t.swatch.accent }}
                    />
                  </div>
                  <span className="text-[10px] leading-tight text-white/70">{t.name}</span>
                  {template === t.id && (
                    <Check className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[var(--gold)] p-0.5 text-black" />
                  )}
                </button>
              ))}
          </div>

          <label className="mb-8 flex cursor-pointer items-center justify-between rounded-lg border border-white/8 bg-white/3 px-4 py-3 transition hover:border-white/20">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Page Numbers</p>
              <p className="mt-0.5 text-[10px] text-white/40">Show "Page 1 of N" in footer</p>
            </div>
            <input
              type="checkbox"
              checked={showPageNumbers}
              onChange={(e) => setShowPageNumbers(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-[var(--gold)]"
            />
          </label>
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

            <Field label="Signer Name" hint="Optional">
              <input
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="e.g. Jane Doe, Managing Partner"
                className="input-underline w-full text-lg text-white placeholder:text-white/25"
              />
            </Field>

            <Field label="Signature" hint="PNG / JPG · max 2 MB">
              <input
                ref={signatureInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleSignatureUpload(e.target.files?.[0])}
              />
              {signature ? (
                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex h-12 w-28 items-center justify-center rounded bg-white/90 p-1">
                    <img src={signature} alt="Signature preview" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex flex-1 gap-2">
                    <button
                      type="button"
                      onClick={() => signatureInputRef.current?.click()}
                      className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-[var(--gold)]"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignature(undefined)}
                      className="ml-auto inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white/80"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => signatureInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-white/3 px-4 py-5 text-sm text-white/50 transition hover:border-[var(--gold)]/50 hover:text-white/80"
                >
                  <Upload className="h-4 w-4" />
                  Upload signature image
                </button>
              )}
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
                {renderTemplate(template, {
                  title,
                  client,
                  body,
                  today,
                  pageLabel: showPageNumbers ? "Page 1 of 1" : undefined,
                  signature,
                  signerName,
                })}
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
