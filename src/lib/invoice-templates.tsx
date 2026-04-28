import type { CSSProperties } from "react";

export type InvoiceTemplateId = "executive" | "minimal" | "modern";

export interface InvoiceTemplateMeta {
  id: InvoiceTemplateId;
  name: string;
  swatch: { bg: string; accent: string; text: string };
}

export const INVOICE_TEMPLATES: InvoiceTemplateMeta[] = [
  {
    id: "executive",
    name: "Executive",
    swatch: { bg: "#fafaf7", accent: "#d4b67a", text: "#1a1a1a" },
  },
  {
    id: "minimal",
    name: "Minimal",
    swatch: { bg: "#ffffff", accent: "#111111", text: "#111111" },
  },
  {
    id: "modern",
    name: "Modern",
    swatch: { bg: "#f5f3ee", accent: "#1f4d3f", text: "#1a1a1a" },
  },
];

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  logo?: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  taxRate: number; // percent
  notes: string;

  fromName: string;
  fromDetails: string;

  toName: string;
  toDetails: string;

  items: LineItem[];
}

const sectionAttr = { "data-pdf-section": "" } as Record<string, string>;

export function computeTotals(items: LineItem[], taxRate: number) {
  const subtotal = items.reduce(
    (sum, i) => sum + (Number(i.quantity) || 0) * (Number(i.unitPrice) || 0),
    0,
  );
  const tax = subtotal * (Number(taxRate) || 0) / 100;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

export function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

interface TemplateProps {
  data: InvoiceData;
}

function LogoBlock({
  logo,
  maxHeight = "18mm",
}: {
  logo?: string;
  maxHeight?: string;
}) {
  if (!logo) return null;
  return (
    <img
      src={logo}
      alt="Logo"
      style={{
        maxHeight,
        maxWidth: "55mm",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

function ItemsTable({
  items,
  currency,
  accent,
  borderColor,
  headerColor,
  rowColor,
  fontFamily,
}: {
  items: LineItem[];
  currency: string;
  accent: string;
  borderColor: string;
  headerColor: string;
  rowColor: string;
  fontFamily: string;
}) {
  const rows = items.length > 0 ? items : [{ id: "ph", description: "—", quantity: 0, unitPrice: 0 }];
  const th: CSSProperties = {
    fontFamily,
    fontSize: "9px",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: headerColor,
    textAlign: "left",
    padding: "3mm 2mm",
    borderBottom: `1px solid ${accent}`,
  };
  const td: CSSProperties = {
    fontSize: "11px",
    color: rowColor,
    padding: "3mm 2mm",
    borderBottom: `1px solid ${borderColor}`,
    verticalAlign: "top",
  };
  return (
    <table
      {...sectionAttr}
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "8mm",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <thead>
        <tr>
          <th style={{ ...th, width: "55%" }}>Description</th>
          <th style={{ ...th, textAlign: "right", width: "10%" }}>Qty</th>
          <th style={{ ...th, textAlign: "right", width: "17%" }}>Unit Price</th>
          <th style={{ ...th, textAlign: "right", width: "18%" }}>Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((item) => {
          const amount = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
          return (
            <tr key={item.id}>
              <td style={td}>{item.description || "—"}</td>
              <td style={{ ...td, textAlign: "right" }}>{item.quantity || 0}</td>
              <td style={{ ...td, textAlign: "right" }}>
                {formatMoney(Number(item.unitPrice) || 0, currency)}
              </td>
              <td style={{ ...td, textAlign: "right", fontWeight: 500 }}>
                {formatMoney(amount, currency)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function TotalsBlock({
  data,
  accent,
  labelColor,
  valueColor,
  fontFamily,
}: {
  data: InvoiceData;
  accent: string;
  labelColor: string;
  valueColor: string;
  fontFamily: string;
}) {
  const { subtotal, tax, total } = computeTotals(data.items, data.taxRate);
  const row = (label: string, value: string, strong = false) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "10mm",
        padding: "1.5mm 0",
        fontSize: strong ? "13px" : "11px",
        fontWeight: strong ? 600 : 400,
        color: strong ? valueColor : labelColor,
        borderTop: strong ? `1px solid ${accent}` : "none",
        marginTop: strong ? "2mm" : 0,
        paddingTop: strong ? "3mm" : "1.5mm",
        fontFamily,
      }}
    >
      <span style={{ textTransform: strong ? "uppercase" : "none", letterSpacing: strong ? "0.2em" : 0 }}>
        {label}
      </span>
      <span style={{ color: valueColor }}>{value}</span>
    </div>
  );
  return (
    <div
      {...sectionAttr}
      style={{
        marginTop: "6mm",
        marginLeft: "auto",
        width: "75mm",
      }}
    >
      {row("Subtotal", formatMoney(subtotal, data.currency))}
      {data.taxRate > 0 && row(`Tax (${data.taxRate}%)`, formatMoney(tax, data.currency))}
      {row("Total Due", formatMoney(total, data.currency), true)}
    </div>
  );
}

function NotesBlock({
  notes,
  color,
  fontFamily,
}: {
  notes: string;
  color: string;
  fontFamily: string;
}) {
  if (!notes.trim()) return null;
  return (
    <div {...sectionAttr} style={{ marginTop: "14mm", maxWidth: "120mm" }}>
      <div
        style={{
          fontFamily,
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color,
          marginBottom: "2mm",
        }}
      >
        Notes
      </div>
      <div style={{ fontSize: "10.5px", lineHeight: 1.7, color: "#333", whiteSpace: "pre-wrap" }}>
        {notes}
      </div>
    </div>
  );
}

/* ============== EXECUTIVE ============== */
function ExecutiveInvoice({ data }: TemplateProps) {
  const accent = "#d4b67a";
  const muted = "#8a7a5a";
  return (
    <div
      style={{
        width: "210mm",
        maxWidth: "100%",
        background: "#fafaf7",
        color: "#1a1a1a",
        padding: "24mm 22mm",
        boxSizing: "border-box",
        fontFamily: '"Playfair Display", Georgia, serif',
      }}
    >
      {/* Header */}
      <div
        {...sectionAttr}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingBottom: "8mm",
          borderBottom: `1px solid ${accent}`,
        }}
      >
        <LogoBlock logo={data.logo} />
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            INVOICE
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: muted,
              marginTop: "3mm",
            }}
          >
            № {data.invoiceNumber || "—"}
          </div>
        </div>
      </div>

      {/* Meta + parties */}
      <div
        {...sectionAttr}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10mm",
          marginTop: "12mm",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div>
          <Label color={muted}>From</Label>
          <div style={{ fontSize: "13px", fontWeight: 600, marginTop: "1mm", color: "#1a1a1a" }}>
            {data.fromName || "—"}
          </div>
          <div style={{ fontSize: "11px", color: "#444", whiteSpace: "pre-wrap", marginTop: "1mm", lineHeight: 1.5 }}>
            {data.fromDetails || "—"}
          </div>
        </div>
        <div>
          <Label color={muted}>Billed To</Label>
          <div style={{ fontSize: "13px", fontWeight: 600, marginTop: "1mm", color: "#1a1a1a" }}>
            {data.toName || "—"}
          </div>
          <div style={{ fontSize: "11px", color: "#444", whiteSpace: "pre-wrap", marginTop: "1mm", lineHeight: 1.5 }}>
            {data.toDetails || "—"}
          </div>
        </div>
      </div>

      <div
        {...sectionAttr}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10mm",
          marginTop: "8mm",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div>
          <Label color={muted}>Issue Date</Label>
          <div style={{ fontSize: "12px", marginTop: "1mm" }}>{data.issueDate || "—"}</div>
        </div>
        <div>
          <Label color={muted}>Due Date</Label>
          <div style={{ fontSize: "12px", marginTop: "1mm" }}>{data.dueDate || "—"}</div>
        </div>
      </div>

      <ItemsTable
        items={data.items}
        currency={data.currency}
        accent={accent}
        borderColor="#e8e3d6"
        headerColor={muted}
        rowColor="#222"
        fontFamily="Inter, sans-serif"
      />

      <TotalsBlock
        data={data}
        accent={accent}
        labelColor={muted}
        valueColor="#1a1a1a"
        fontFamily="Inter, sans-serif"
      />

      <NotesBlock notes={data.notes} color={muted} fontFamily="Inter, sans-serif" />
    </div>
  );
}

/* ============== MINIMAL ============== */
function MinimalInvoice({ data }: TemplateProps) {
  const accent = "#111111";
  const muted = "#666";
  return (
    <div
      style={{
        width: "210mm",
        maxWidth: "100%",
        background: "#ffffff",
        color: "#111111",
        padding: "26mm 24mm",
        boxSizing: "border-box",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        {...sectionAttr}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <LogoBlock logo={data.logo} />
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: muted,
            }}
          >
            Invoice
          </div>
          <div style={{ fontSize: "22px", fontWeight: 500, marginTop: "2mm", letterSpacing: "-0.01em" }}>
            {data.invoiceNumber || "—"}
          </div>
        </div>
      </div>

      <div
        {...sectionAttr}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "6mm",
          marginTop: "16mm",
        }}
      >
        <div>
          <Label color={muted}>From</Label>
          <div style={{ fontSize: "12px", fontWeight: 600, marginTop: "1mm" }}>{data.fromName || "—"}</div>
          <div style={{ fontSize: "10.5px", color: "#444", whiteSpace: "pre-wrap", marginTop: "1mm", lineHeight: 1.5 }}>
            {data.fromDetails || "—"}
          </div>
        </div>
        <div>
          <Label color={muted}>To</Label>
          <div style={{ fontSize: "12px", fontWeight: 600, marginTop: "1mm" }}>{data.toName || "—"}</div>
          <div style={{ fontSize: "10.5px", color: "#444", whiteSpace: "pre-wrap", marginTop: "1mm", lineHeight: 1.5 }}>
            {data.toDetails || "—"}
          </div>
        </div>
        <div>
          <Label color={muted}>Issued</Label>
          <div style={{ fontSize: "11.5px", marginTop: "1mm" }}>{data.issueDate || "—"}</div>
        </div>
        <div>
          <Label color={muted}>Due</Label>
          <div style={{ fontSize: "11.5px", marginTop: "1mm" }}>{data.dueDate || "—"}</div>
        </div>
      </div>

      <ItemsTable
        items={data.items}
        currency={data.currency}
        accent={accent}
        borderColor="#eee"
        headerColor={muted}
        rowColor="#111"
        fontFamily="Inter, sans-serif"
      />

      <TotalsBlock
        data={data}
        accent={accent}
        labelColor={muted}
        valueColor="#111"
        fontFamily="Inter, sans-serif"
      />

      <NotesBlock notes={data.notes} color={muted} fontFamily="Inter, sans-serif" />
    </div>
  );
}

/* ============== MODERN ============== */
function ModernInvoice({ data }: TemplateProps) {
  const accent = "#1f4d3f";
  return (
    <div
      style={{
        width: "210mm",
        maxWidth: "100%",
        background: "#f5f3ee",
        color: "#1a1a1a",
        padding: "0",
        boxSizing: "border-box",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        {...sectionAttr}
        style={{
          background: accent,
          color: "#f5f3ee",
          padding: "16mm 22mm 18mm",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          {data.logo ? (
            <div style={{ background: "#fff", padding: "3mm", borderRadius: "2mm", display: "inline-block" }}>
              <LogoBlock logo={data.logo} maxHeight="14mm" />
            </div>
          ) : (
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              {data.fromName || "Your Company"}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Invoice
          </div>
          <div style={{ fontSize: "11px", opacity: 0.8, marginTop: "2mm", letterSpacing: "0.15em" }}>
            № {data.invoiceNumber || "—"}
          </div>
        </div>
      </div>

      <div style={{ padding: "14mm 22mm 22mm" }}>
        <div
          {...sectionAttr}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6mm" }}
        >
          <div>
            <Label color={accent}>From</Label>
            <div style={{ fontSize: "12px", fontWeight: 600, marginTop: "1mm" }}>{data.fromName || "—"}</div>
            <div style={{ fontSize: "10.5px", color: "#444", whiteSpace: "pre-wrap", marginTop: "1mm", lineHeight: 1.5 }}>
              {data.fromDetails || "—"}
            </div>
          </div>
          <div>
            <Label color={accent}>Billed To</Label>
            <div style={{ fontSize: "12px", fontWeight: 600, marginTop: "1mm" }}>{data.toName || "—"}</div>
            <div style={{ fontSize: "10.5px", color: "#444", whiteSpace: "pre-wrap", marginTop: "1mm", lineHeight: 1.5 }}>
              {data.toDetails || "—"}
            </div>
          </div>
          <div>
            <Label color={accent}>Issued</Label>
            <div style={{ fontSize: "11.5px", marginTop: "1mm" }}>{data.issueDate || "—"}</div>
          </div>
          <div>
            <Label color={accent}>Due</Label>
            <div style={{ fontSize: "11.5px", marginTop: "1mm" }}>{data.dueDate || "—"}</div>
          </div>
        </div>

        <ItemsTable
          items={data.items}
          currency={data.currency}
          accent={accent}
          borderColor="#e3dfd5"
          headerColor={accent}
          rowColor="#222"
          fontFamily="Inter, sans-serif"
        />

        <TotalsBlock
          data={data}
          accent={accent}
          labelColor={accent}
          valueColor="#1a1a1a"
          fontFamily="Inter, sans-serif"
        />

        <NotesBlock notes={data.notes} color={accent} fontFamily="Inter, sans-serif" />
      </div>
    </div>
  );
}

function Label({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "9px",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </div>
  );
}

export function renderInvoiceTemplate(id: InvoiceTemplateId, data: InvoiceData) {
  switch (id) {
    case "minimal":
      return <MinimalInvoice data={data} />;
    case "modern":
      return <ModernInvoice data={data} />;
    case "executive":
    default:
      return <ExecutiveInvoice data={data} />;
  }
}

export function getInvoiceTemplateBackground(id: InvoiceTemplateId): string {
  return INVOICE_TEMPLATES.find((t) => t.id === id)?.swatch.bg ?? "#fafaf7";
}
