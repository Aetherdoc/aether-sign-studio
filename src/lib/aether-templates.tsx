import type { CSSProperties } from "react";

export type TemplateId = "executive" | "minimal" | "modern" | "editorial" | "monogram";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  swatch: { bg: string; accent: string; text: string };
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "executive",
    name: "Executive",
    description: "Cream paper, gold rule, classic serif.",
    swatch: { bg: "#fafaf7", accent: "#d4b67a", text: "#1a1a1a" },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Pure white, tight typography, no flourishes.",
    swatch: { bg: "#ffffff", accent: "#111111", text: "#111111" },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold sans-serif, accent block, asymmetric.",
    swatch: { bg: "#f5f3ee", accent: "#1f4d3f", text: "#1a1a1a" },
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Magazine-style with drop cap and rule.",
    swatch: { bg: "#fbf9f4", accent: "#8b1e1e", text: "#1a1a1a" },
  },
  {
    id: "monogram",
    name: "Monogram",
    description: "Centered crest, formal old-world layout.",
    swatch: { bg: "#f7f4ec", accent: "#1d2b4a", text: "#1d2b4a" },
  },
];

interface TemplateProps {
  title: string;
  client: string;
  body: string;
  today: string;
}

const sectionAttr = { "data-pdf-section": "" } as Record<string, string>;

function renderParagraphs(body: string, style: CSSProperties, fallback: string) {
  const paras = body ? body.split(/\n\s*\n/) : [fallback];
  return paras.map((p, i) => (
    <p key={i} {...sectionAttr} style={style}>
      {p}
    </p>
  ));
}

const FALLBACK_BODY =
  "Your composition will appear here. Begin typing on the left to see your document take shape.";

function BrandFooter({ color = "#888", fontFamily = "Inter, sans-serif" }: { color?: string; fontFamily?: string }) {
  return (
    <div
      {...sectionAttr}
      style={{
        marginTop: "20mm",
        paddingTop: "6mm",
        borderTop: `1px solid ${color}33`,
        textAlign: "center",
        fontFamily,
        fontSize: "9px",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color,
      }}
    >
      Aether Doc
    </div>
  );
}

/* ============== EXECUTIVE ============== */
function ExecutiveTemplate({ title, client, body, today }: TemplateProps) {
  return (
    <div
      style={{
        width: "210mm",
        maxWidth: "100%",
        background: "#fafaf7",
        color: "#1a1a1a",
        padding: "28mm 24mm",
        boxSizing: "border-box",
        fontFamily: '"Playfair Display", Georgia, serif',
      }}
    >
      <div
        {...sectionAttr}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: "8mm",
          borderBottom: "1px solid #d4b67a",
        }}
      >
        <div>
          <div style={{ fontSize: "20px", color: "#d4b67a" }}>Æ</div>
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

      <div {...sectionAttr} style={{ marginTop: "22mm" }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title || "Untitled Document"}
        </h1>
      </div>

      <div {...sectionAttr} style={{ marginTop: "8mm" }}>
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
        <p style={{ fontSize: "18px", fontStyle: "italic", color: "#333", margin: 0 }}>
          {client || "—"}
        </p>
      </div>

      <div
        {...sectionAttr}
        style={{ width: "20mm", height: "1px", background: "#d4b67a", marginTop: "12mm" }}
      />

      <div style={{ marginTop: "10mm" }}>
        {renderParagraphs(
          body,
          {
            fontSize: "12pt",
            lineHeight: 1.75,
            color: "#222",
            textAlign: "justify",
            whiteSpace: "pre-wrap",
            margin: "0 0 5mm 0",
          },
          FALLBACK_BODY,
        )}
      </div>

      <BrandFooter color="#8a7a5a" />
    </div>
  );
}

/* ============== MINIMAL ============== */
function MinimalTemplate({ title, client, body, today }: TemplateProps) {
  return (
    <div
      style={{
        width: "210mm",
        maxWidth: "100%",
        background: "#ffffff",
        color: "#111111",
        padding: "32mm 28mm",
        boxSizing: "border-box",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        {...sectionAttr}
        style={{
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#666",
        }}
      >
        {today}
      </div>

      <div {...sectionAttr} style={{ marginTop: "30mm" }}>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {title || "Untitled Document"}
        </h1>
      </div>

      <div {...sectionAttr} style={{ marginTop: "6mm" }}>
        <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
          For <span style={{ color: "#111", fontWeight: 500 }}>{client || "—"}</span>
        </p>
      </div>

      <div style={{ marginTop: "16mm" }}>
        {renderParagraphs(
          body,
          {
            fontSize: "11pt",
            lineHeight: 1.7,
            color: "#222",
            margin: "0 0 4mm 0",
          },
          FALLBACK_BODY,
        )}
      </div>

      <BrandFooter />
    </div>
  );
}
function ModernTemplate({ title, client, body, today }: TemplateProps) {
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
          padding: "20mm 24mm 24mm",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          {today}
        </div>
        <h1
          style={{
            fontSize: "44px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: "10mm 0 0 0",
          }}
        >
          {title || "Untitled Document"}
        </h1>
      </div>

      <div style={{ padding: "16mm 24mm 24mm" }}>
        <div {...sectionAttr} style={{ display: "flex", gap: "10mm", marginBottom: "12mm" }}>
          <div style={{ width: "4mm", background: accent }} />
          <div>
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: accent,
                marginBottom: "1mm",
              }}
            >
              Prepared for
            </div>
            <div style={{ fontSize: "16px", fontWeight: 600 }}>{client || "—"}</div>
          </div>
        </div>

        <div>
          {renderParagraphs(
            body,
            {
              fontSize: "11pt",
              lineHeight: 1.75,
              color: "#222",
              margin: "0 0 4mm 0",
            },
            FALLBACK_BODY,
          )}
        </div>
      </div>
    </div>
  );
}

/* ============== EDITORIAL ============== */
function EditorialTemplate({ title, client, body, today }: TemplateProps) {
  const accent = "#8b1e1e";
  const paras = body ? body.split(/\n\s*\n/) : [FALLBACK_BODY];

  return (
    <div
      style={{
        width: "210mm",
        maxWidth: "100%",
        background: "#fbf9f4",
        color: "#1a1a1a",
        padding: "26mm 24mm",
        boxSizing: "border-box",
        fontFamily: '"Playfair Display", Georgia, serif',
      }}
    >
      <div
        {...sectionAttr}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
          fontSize: "9px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: accent,
          paddingBottom: "4mm",
          borderBottom: `2px solid ${accent}`,
        }}
      >
        <span>The Aether Quarterly</span>
        <span style={{ color: "#666" }}>{today}</span>
      </div>

      <div {...sectionAttr} style={{ marginTop: "18mm", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: "6mm",
          }}
        >
          Feature
        </div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          {title || "Untitled Document"}
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#666",
            marginTop: "6mm",
          }}
        >
          A note for {client || "—"}
        </p>
      </div>

      <div
        {...sectionAttr}
        style={{
          width: "30mm",
          height: "1px",
          background: accent,
          margin: "14mm auto",
        }}
      />

      <div>
        {paras.map((p, i) => (
          <p
            key={i}
            {...sectionAttr}
            style={{
              fontSize: "12pt",
              lineHeight: 1.8,
              color: "#222",
              textAlign: "justify",
              whiteSpace: "pre-wrap",
              margin: "0 0 5mm 0",
              textIndent: i === 0 ? 0 : "8mm",
            }}
          >
            {i === 0 && p ? (
              <>
                <span
                  style={{
                    float: "left",
                    fontSize: "52px",
                    lineHeight: "0.9",
                    fontWeight: 700,
                    color: accent,
                    paddingRight: "3mm",
                    paddingTop: "2mm",
                  }}
                >
                  {p.charAt(0)}
                </span>
                {p.slice(1)}
              </>
            ) : (
              p
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ============== MONOGRAM ============== */
function MonogramTemplate({ title, client, body, today }: TemplateProps) {
  const accent = "#1d2b4a";
  return (
    <div
      style={{
        width: "210mm",
        maxWidth: "100%",
        background: "#f7f4ec",
        color: "#1d2b4a",
        padding: "28mm 26mm",
        boxSizing: "border-box",
        fontFamily: '"Playfair Display", Georgia, serif',
      }}
    >
      <div {...sectionAttr} style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "22mm",
            height: "22mm",
            border: `1.5px solid ${accent}`,
            borderRadius: "50%",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          Æ
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "9px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: accent,
            marginTop: "4mm",
          }}
        >
          Aether Doc · Est. MMXXV
        </div>
      </div>

      <div {...sectionAttr} style={{ marginTop: "18mm", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "0.02em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {title || "Untitled Document"}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4mm",
            marginTop: "6mm",
          }}
        >
          <span style={{ width: "12mm", height: "1px", background: accent }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {today}
          </span>
          <span style={{ width: "12mm", height: "1px", background: accent }} />
        </div>
      </div>

      <div {...sectionAttr} style={{ marginTop: "16mm", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#5a6987",
            margin: "0 0 2mm 0",
          }}
        >
          Presented to
        </p>
        <p style={{ fontSize: "20px", fontStyle: "italic", margin: 0 }}>{client || "—"}</p>
      </div>

      <div style={{ marginTop: "16mm" }}>
        {renderParagraphs(
          body,
          {
            fontSize: "12pt",
            lineHeight: 1.8,
            color: "#1d2b4a",
            textAlign: "justify",
            whiteSpace: "pre-wrap",
            margin: "0 0 5mm 0",
          },
          FALLBACK_BODY,
        )}
      </div>
    </div>
  );
}

export function renderTemplate(id: TemplateId, props: TemplateProps) {
  switch (id) {
    case "minimal":
      return <MinimalTemplate {...props} />;
    case "modern":
      return <ModernTemplate {...props} />;
    case "editorial":
      return <EditorialTemplate {...props} />;
    case "monogram":
      return <MonogramTemplate {...props} />;
    case "executive":
    default:
      return <ExecutiveTemplate {...props} />;
  }
}

export function getTemplateBackground(id: TemplateId): string {
  return TEMPLATES.find((t) => t.id === id)?.swatch.bg ?? "#fafaf7";
}
