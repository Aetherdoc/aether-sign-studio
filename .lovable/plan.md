
# Aether Doc — AetherSign Tool

A browser-based document formatter with live PDF preview and one-click download. Fully client-side using `html2pdf.js`.

## Routes
- `/` — Aether Doc landing page introducing the product suite, with a CTA into AetherSign.
- `/aethersign` — The AetherSign formatter tool (split-screen workspace).

## Visual Direction — Dark Executive Glassmorphism
- **Background**: Deep near-black (`#0a0a0f`) with subtle radial gradient orbs (muted indigo + warm gold) blurred behind content for depth.
- **Glass surfaces**: Semi-transparent panels (`bg-white/5`), `backdrop-blur-xl`, hairline `border-white/10`, soft inner highlight.
- **Accent**: Warm champagne gold (`#d4b67a`) for primary actions, dividers, and the wordmark — signals "executive."
- **Typography**: Serif display (Playfair Display) for the Aether Doc wordmark and PDF document title; Inter for UI and body.
- **Micro-details**: Subtle grain overlay, smooth fade-ins, gold underline on focused inputs.

## `/aethersign` — Split-Screen Workspace

**Top bar (glass)**: Aether Doc wordmark left · "AetherSign" label center · Download PDF button (gold) right.

**Left panel — Data Input (≈40% width, glass card)**
- Section heading: "Document Details"
- Fields:
  - **Title** — single-line input
  - **Client Name** — single-line input
  - **Body Text** — large textarea (auto-grow), placeholder showing example formal copy
- Optional niceties: character count under body, "Reset" ghost button, "Load sample" link.
- Inputs: transparent bg, bottom-border style, gold focus ring.

**Right panel — Live Preview (≈60% width)**
- Rendered inside a realistic PDF "page" — white/cream sheet (`#fafaf7`), subtle shadow, A4 aspect ratio, internal padding mimicking print margins.
- Layout of the PDF page:
  - Small uppercase "AETHER DOC" monogram top-left + thin gold rule
  - Date (auto, today) top-right
  - Large serif **Title**
  - "Prepared for: **Client Name**" subtitle
  - Divider
  - **Body Text** in justified serif paragraphs, preserving line breaks
  - Footer: "Confidential · Aether Doc" + page mark
- Updates live as the user types (controlled state, no debounce needed).

**Download behavior**
- Button triggers `html2pdf.js` on the preview node.
- Output: A4, high-resolution (scale 2), filename `AetherSign-{Title-or-Untitled}.pdf`.
- Toast confirmation on success; graceful error toast on failure.

## `/` — Landing Page
- Hero: "Aether Doc — Documents, refined." with gold accent + CTA "Open AetherSign".
- Brief 3-card section describing the suite (AetherSign featured, two "coming soon" placeholders) so the brand feels like a product family.
- Same dark glass aesthetic for consistency.

## Technical Notes
- Add `html2pdf.js` dependency; load only on the AetherSign route.
- Use shadcn `Input`, `Textarea`, `Button`, `sonner` for toast.
- Per-route SEO metadata (title, description, og tags) for `/` and `/aethersign`.
- Responsive: on screens <1024px, stack panels vertically with the preview scaled to fit.
