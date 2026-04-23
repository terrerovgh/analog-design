# Analog Design

> A design language for interfaces that look like instruments, not apps.

`Analog Design` is a brutalist, monochrome, technical design system. It borrows from archival micrographics, industrial HUDs, scientific telemetry, and printed control-panel labels. Every screen should feel like an artifact: measurable, observable, decoded.

---

## Repository

- **GitHub:** `https://github.com/terrerovgh/analog-design`
- **Component docs:** `https://terrerovgh.github.io/analog-design/`

---

## Principles

1. **Monochrome first.** Ink on paper. Color is information, never decoration. Reserve a single accent only for live states.
2. **Mono everywhere.** All UI text is monospaced. Variable-width type is reserved for prose blocks.
3. **Density over whitespace.** Information should look catalogued. Brackets, IDs, codes, timestamps and units are part of the design.
4. **Latin + Kana.** Japanese katakana/kanji as visual texture and noise — never decorative-only when in a real product, but free in marketing/static surfaces.
5. **Geometry, not gradients.** Circles, lines, crosshairs, dots, stepped progress. No drop shadows, no rounded corners (≤ 2px), no soft gradients.
6. **Stepped motion.** Movement is mechanical: instant, blink, ticker. No easing curves longer than 120ms.
7. **State-as-text.** Every component has an explicit textual state (`ACTIVE`, `STANDBY`, `OFFLINE`, `ERROR — ID 0x7B6A`). Visual state never stands alone.

---

## Vocabulary

| Token              | Meaning                                                     |
| ------------------ | ----------------------------------------------------------- |
| **Ink**            | Foreground (`#0a0a0a`).                                     |
| **Paper**          | Background (`#f4f1ea`) — warm off-white, not pure white.    |
| **Graphite**       | Mid grays for grids, dividers, secondary text.              |
| **Signal**         | The single accent (`#ff3b00`) reserved for ALERT / LIVE.    |
| **Cluster**        | A boxed group of metrics with a label and ID.               |
| **Stamp**          | A short uppercase mono code (e.g. `ID 7F-C2`).              |
| **Crosshair**      | Geometric primitive used as visual anchor.                  |
| **Burst**          | Radial line graphic, decoration with semantic weight.       |
| **Channel**        | A label preceded by `//` — denotes a stream or scope.       |
| **Bracket**        | `[ ... ]` framing for any structural label.                 |

---

## Stack

- **[Astro 6](https://astro.build/)** — static-first, component-driven.
- **CSS variables only** — no Tailwind, no CSS-in-JS. Tokens live in `src/styles/tokens.css`.
- **Zero runtime JS by default.** Components are HTML + CSS. JS is opt-in per island.

---

## Components — 24 total

Run `npm install && npm run dev` and open `http://localhost:4321/` to browse the catalog.

### Badges & labels
| # | Component | Purpose |
|---|-----------|---------|
| 01 | `StatusBadge`  | Stamped state (`active` · `standby` · `offline` · `processing` · `error`) with optional ID and blink. |
| 02 | `IDTag`        | Compact code stamp — `[ID 0x7B6A]` — boxed or inline. |
| 03 | `ChannelLabel` | `// CHANNEL_NAME` scope marker with `live` / `idle` / `muted` dot. |

### Typography
| # | Component | Purpose |
|---|-----------|---------|
| 04 | `KanaLabel` | Japanese character stamp + latin caption, 4 sizes, row or column. |

### Data
| # | Component | Purpose |
|---|-----------|---------|
| 05 | `DataCluster` | Boxed group of metrics with header (name + code) and footer. |
| 06 | `MetricBlock` | Single hero metric — large value + label + optional code. |
| 07 | `LogLine`     | Timestamped entry with level (`ok` · `info` · `warn` · `err` · `debug`). |

### Indicators
| # | Component | Purpose |
|---|-----------|---------|
| 08 | `SignalBar`       | Stepped horizontal bar with cells, label, value, unit, `critical` flag. |
| 09 | `ProgressStepped` | Block-character progress bar (`█████░░░░░ 50%`), customizable chars. |

### Graphics
| # | Component | Purpose |
|---|-----------|---------|
| 10 | `Crosshair` | SVG primitive — `cross` · `target` · `reticle` · `burst` variants. |
| 11 | `Burst`     | Configurable radial graphic with rays count, origin, and ring. |
| 12 | `NodeMap`   | Horizontal map of nodes connected by lines, with state per node. |

### Frames
| # | Component | Purpose |
|---|-----------|---------|
| 13 | `Panel`    | Bracketed container with channel + ID header, footer, kana watermark. |
| 14 | `Terminal` | Console-style output container with optional cursor and inverted variant. |

### Inputs — hardware-style (v0.3)
| # | Component | Purpose |
|---|-----------|---------|
| 15 | `KeycapButton` | Physical key cap with offset depth, `wide` / `inverted` / `signal` variants. |
| 16 | `RotaryKnob`   | Analog potentiometer dial with tick marks, optional `live` rotation. |

### Static graphics (v0.3)
| # | Component | Purpose |
|---|-----------|---------|
| 17 | `AsciiDivider` | Text-based separator with 6 variants (`solid`, `dotted`, `double`, `block`, `scan`, `ticker`). |
| 18 | `DeviceFrame`  | Chassis container — `monitor`, `terminal`, `server`, `modem`, `card`. |

### Animated charts & telemetry (v0.3)
| # | Component | Purpose |
|---|-----------|---------|
| 19 | `Sparkline`     | Inline trend line with stroke-reveal animation, `step` / `area` variants. |
| 20 | `Oscilloscope`  | Animated waveform display — `sine` / `square` / `sawtooth` / `triangle` / `noise`. |
| 21 | `BusinessChart` | `bar` / `line` / `area` chart with stepped entry animation, multi-series. |

### Animated flows / networks / circuits (v0.3)
| # | Component | Purpose |
|---|-----------|---------|
| 22 | `ProcessFlow`  | Sequential pipeline with state per step + animated traversal token. |
| 23 | `CircuitTrace` | Procedural circuit-board pattern with travelling sparks (SMIL `animateMotion`). |
| 24 | `NetworkGraph` | Topology with positioned nodes, weighted edges, animated packet flow per edge. |

### Animation principles

- **All animations are stepped** (`steps()` timing) — never smooth easing.
- **Every animated component supports `paused`** where freezing the UI matters.
- **Globally respects `prefers-reduced-motion: reduce`** — animation duration collapses to `0.01ms`.
- **Animation tokens** live in `src/styles/tokens.css` — `--ad-dur-blink`, `--ad-dur-tick`, `--ad-dur-scan`, `--ad-dur-orbit`, `--ad-dur-packet`, `--ad-dur-sweep` plus stepped easings (`steps(2…24, end)`).

---

## Usage

```astro
---
// Import individually
import StatusBadge from 'analog-design/components/StatusBadge.astro';

// Or via the barrel
import { StatusBadge, DataCluster, Crosshair, Panel } from 'analog-design/components';
---

<Panel channel="ARCHIVE_LOG" id="EGH-9320" footer="ACCESS CONFIRMED" kana="稿">
  <StatusBadge state="active" id="7F-C2" />
  <DataCluster
    name="MODULE-B7"
    code="0x7B6A"
    metrics={[
      { label: 'TEMP',  value: '27', unit: '°C' },
      { label: 'POWER', value: '68', unit: '%'  },
    ]}
  />
</Panel>
```

---

## Catalog routes

The dev server ships two pages:

- `/` — **v0.2 Foundation** (badges, data, indicators, primitives, frames).
- `/v3` — **v0.3 Expansion** (inputs, static graphics, animated charts, animated networks, the `MISSION_CONTROL` composed example).
- `/dashboard` — **Dashboard Spec** (best-practice guidance, composition rules, and a full specimen dashboard built from the component set).

A nav strip at the top of every page lets you jump between them.

## Publishing To GitHub

1. Create the repository `terrerovgh/analog-design`.
2. Push the `main` branch.
3. Enable GitHub Pages with `GitHub Actions` as the source.
4. The `pages.yml` workflow will publish the catalog automatically on pushes to `main`.
5. The `ci.yml` workflow runs type and build validation for pull requests and pushes.

## Roadmap

- **v0.4** — Dark inversion (`paper → ink` global swap), `Form` primitives (`InputField`, `Select`, `Toggle`, `Slider`), tab navigation, dialog/modal frame.
- **v0.5** — `Map` (geographic), `Treemap`, `RadialChart`, `Gauge` (analog needle), `WaterfallChart`.
- **v0.6** — Astro integration package (`@analog-design/astro`) for `npm install` consumption + JS islands for live data binding (WebSocket / SSE adapters).
