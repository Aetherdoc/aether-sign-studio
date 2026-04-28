import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, Check, Download, Plus, RotateCcw, Sparkles, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  INVOICE_TEMPLATES,
  computeTotals,
  formatMoney,
  getInvoiceTemplateBackground,
  renderInvoiceTemplate,
  type InvoiceData,
  type InvoiceTemplateId,
  type LineItem,
} from "@/lib/invoice-templates";

export const Route = createFileRoute("/aetherinvoice")({
  head: () => ({
    meta: [
      { title: "AetherInvoice — Aether Doc" },
      {
        name: "description",
        content:
          "AetherInvoice is a refined, browser-based invoice generator. Add your logo, line items, and tax — preview a print-grade PDF and download instantly.",
      },
      { property: "og:title", content: "AetherInvoice — Aether Doc" },
      {
        property: "og:description",
        content: "Compose, preview, and export executive-grade invoices in your browser.",
      },
    ],
  }),
  component: AetherInvoicePage,
});

const today = new Date();
const todayISO = today.toISOString().slice(0, 10);
const dueISO = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

function makeItem(): LineItem {
  return { id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0 };
}

const SAMPLE: Omit<InvoiceData, "logo"> = {
  invoiceNumber: "INV-2025-0042",
  issueDate: todayISO,
  dueDate: dueISO,
  currency: "USD",
  taxRate: 8.5,
  notes: "Payment due within 14 days. Wire transfer details available upon request.",
  fromName: "Aether Studio",
  fromDetails: "224 Madison Ave, Suite 14\nNew York, NY 10016\nbilling@aetherstudio.com",
  toName: "Wilkinson & Hayes Capital",
  toDetails: "Attn: Margaret Hayes\n88 Park Avenue\nNew York, NY 10016",
  items: [
    { id: crypto.randomUUID(), description: "Brand strategy & positioning workshop", quantity: 1, unitPrice: 4800 },
    { id: crypto.randomUUID(), description: "Visual identity system design", quantity: 1, unitPrice: 6500 },
    { id: crypto.randomUUID(), description: "Stationery & collateral suite", quantity: 1, unitPrice: 2200 },
  ],
};

function AetherInvoicePage() {
  const [template, setTemplate] = useState<InvoiceTemplateId>("executive");
  const [data, setData] = useState<InvoiceData>({
    logo: undefined,
    invoiceNumber: "",
    issueDate: todayISO,
    dueDate: dueISO,
    currency: "USD",
    taxRate: 0,
    notes: "",
    fromName: "",
    fromDetails: "",
    toName: "",
    toDetails: "",
    items: [makeItem()],
  });
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const handleLogoUpload = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, SVG).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update("logo", reader.result as string);
    reader.onerror = () => toast.error("Could not read the file.");
    reader.readAsDataURL(file);
  };

  const addItem = () => update("items", [...data.items, makeItem()]);
  const removeItem = (id: string) =>
    update("items", data.items.filter((i) => i.id !== id));
  const updateItem = (id: string, patch: Partial<LineItem>) =>
    update("items", data.items.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const totals = computeTotals(data.items, data.taxRate);

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
          backgroundColor: getInvoiceTemplateBackground(template),
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

      const filename = `AetherInvoice-${(data.invoiceNumber || "Untitled").replace(/[^\w\s-]/g, "").trim() || "Untitled"}.pdf`;
      pdf.save(filename);
      toast.success("Invoice downloaded", { description: filename });
    } catch (err) {
      console.error(err);
      toast.error("Could not generate PDF", { description: "Please try again." });
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => {
    setData({
      logo: undefined,
      invoiceNumber: "",
      issueDate: todayISO,
      dueDate: dueISO,
      currency: "USD",
      taxRate: 0,
      notes: "",
      fromName: "",
      fromDetails: "",
      toName: "",
      toDetails: "",
      items: [makeItem()],
    });
  };

  const handleSample = () => {
    setData((d) => ({ ...SAMPLE, logo: d.logo }));
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
            AetherInvoice
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
              <h2 className="font-serif text-2xl">Invoice Details</h2>
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
            <div className="grid grid-cols-3 gap-2">
              {INVOICE_TEMPLATES.map((t) => (
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
          </div>

          {/* Logo */}
          <div className="mb-8">
            <Field label="Logo" hint="Top-left of invoice · PNG / JPG · max 2 MB">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleLogoUpload(e.target.files?.[0])}
              />
              {data.logo ? (
                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex h-14 w-28 items-center justify-center rounded bg-white/90 p-1">
                    <img src={data.logo} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex flex-1 gap-2">
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-[var(--gold)]"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => update("logo", undefined)}
                      className="ml-auto inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white/80"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-white/3 px-4 py-5 text-sm text-white/50 transition hover:border-[var(--gold)]/50 hover:text-white/80"
                >
                  <Upload className="h-4 w-4" />
                  Upload logo
                </button>
              )}
            </Field>
          </div>

          {/* Invoice meta */}
          <div className="mb-8 grid grid-cols-2 gap-4">
            <Field label="Invoice Number">
              <input
                value={data.invoiceNumber}
                onChange={(e) => update("invoiceNumber", e.target.value)}
                placeholder="INV-2025-0001"
                className="input-underline w-full text-base text-white placeholder:text-white/25"
              />
            </Field>
            <Field label="Currency">
              <select
                value={data.currency}
                onChange={(e) => update("currency", e.target.value)}
                className="input-underline w-full bg-transparent text-base text-white"
              >
                {["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "INR", "AED", "SGD"].map((c) => (
                  <option key={c} value={c} className="bg-black">
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Issue Date">
              <input
                type="date"
                value={data.issueDate}
                onChange={(e) => update("issueDate", e.target.value)}
                className="input-underline w-full text-base text-white"
              />
            </Field>
            <Field label="Due Date">
              <input
                type="date"
                value={data.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
                className="input-underline w-full text-base text-white"
              />
            </Field>
          </div>

          {/* Parties */}
          <div className="mb-8 space-y-7">
            <Field label="From — Your Company">
              <input
                value={data.fromName}
                onChange={(e) => update("fromName", e.target.value)}
                placeholder="Company name"
                className="input-underline mb-2 w-full text-base text-white placeholder:text-white/25"
              />
              <textarea
                value={data.fromDetails}
                onChange={(e) => update("fromDetails", e.target.value)}
                placeholder="Address, email, phone…"
                rows={3}
                className="input-underline w-full resize-y text-sm text-white placeholder:text-white/25"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 0.15)" }}
              />
            </Field>

            <Field label="Billed To — Client">
              <input
                value={data.toName}
                onChange={(e) => update("toName", e.target.value)}
                placeholder="Client name"
                className="input-underline mb-2 w-full text-base text-white placeholder:text-white/25"
              />
              <textarea
                value={data.toDetails}
                onChange={(e) => update("toDetails", e.target.value)}
                placeholder="Address, contact…"
                rows={3}
                className="input-underline w-full resize-y text-sm text-white placeholder:text-white/25"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 0.15)" }}
              />
            </Field>
          </div>

          {/* Line items */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <label className="text-xs uppercase tracking-[0.25em] text-white/50">Line Items</label>
                <p className="mt-1 text-[10px] text-white/30">Description, quantity, and unit price</p>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gold)]/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] gold-text transition hover:bg-[var(--gold)]/10"
              >
                <Plus className="h-3 w-3" />
                Add item
              </button>
            </div>

            <div className="space-y-3">
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-white/8 bg-white/3 p-3"
                >
                  <input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    placeholder="Description"
                    className="input-underline mb-2 w-full text-sm text-white placeholder:text-white/25"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                      placeholder="Qty"
                      className="input-underline w-20 text-sm text-white placeholder:text-white/25"
                    />
                    <span className="text-white/30">×</span>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, { unitPrice: Number(e.target.value) })}
                      placeholder="Unit price"
                      className="input-underline w-32 text-sm text-white placeholder:text-white/25"
                    />
                    <span className="ml-auto text-sm text-white/70">
                      {formatMoney(
                        (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
                        data.currency,
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={data.items.length <= 1}
                      className="rounded p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white/80 disabled:opacity-30"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax */}
          <div className="mb-8">
            <Field label="Tax Rate (%)" hint={`${formatMoney(totals.tax, data.currency)} tax · ${formatMoney(totals.total, data.currency)} total`}>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={data.taxRate}
                onChange={(e) => update("taxRate", Number(e.target.value))}
                placeholder="0"
                className="input-underline w-full text-base text-white placeholder:text-white/25"
              />
            </Field>
          </div>

          {/* Notes */}
          <Field label="Notes" hint="Optional">
            <textarea
              value={data.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Payment terms, bank details, thank-you note…"
              rows={4}
              className="input-underline w-full resize-y text-sm text-white placeholder:text-white/25"
              style={{ borderBottom: "1px solid oklch(1 0 0 / 0.15)" }}
            />
          </Field>

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
              <div ref={previewRef}>{renderInvoiceTemplate(template, data)}</div>
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
