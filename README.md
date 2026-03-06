# 🌿 Scope 3 GHG Dashboard

> An interactive data dashboard for monitoring and managing **Scope 3 GHG emissions** across chemical industry supply chains — built as a portfolio project aligned with the **TfS (Together for Sustainability)** initiative framework.

![Dashboard Preview](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white) ![Recharts](https://img.shields.io/badge/Recharts-2.10-22b5bf) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-green)

**[🚀 Live live](https://scope3-ghg-dashboard.vercel.app)**

---

## 📌 Context

This project simulates a Scope 3 GHG programme management tool for a consortium of chemical industry companies. It is inspired by the real-world work of the **TfS Initiative** — a global procurement-driven initiative that helps member companies assess, audit, and reduce GHG emissions across supply chains.

The dashboard addresses a core challenge in Scope 3 reporting: **making complex, multi-category emissions data accessible and actionable** for both leadership and operational stakeholders.

---

## ✨ Features

### 📊 Overview
- Portfolio-wide KPI cards (total emissions, upstream/downstream split, member on-track rate)
- Emissions trajectory line chart (2019–2024)
- Upstream vs. downstream pie chart
- Programme maturity radar chart (Data Quality, Target Setting, PACT Alignment, etc.)
- Top 5 emission categories ranked by absolute tCO₂e

### 🗂️ Categories
- Full breakdown of all **15 GHG Protocol Scope 3 categories**
- YoY % change per category
- Data coverage / reporting completion bars
- Filter by upstream / downstream
- Horizontal bar chart comparison

### 🏢 Members
- 12 simulated TfS member company profiles
- Maturity level (1–4), 2030 reduction target, current achievement
- On-track / At-risk / Lagging status badges
- Filter by region (Europe, Americas, Asia, Middle East)
- Target vs. achievement bar chart

### 📈 Trends
- Stacked absolute emissions bar chart (2019–2024)
- Projected pathway vs. SBTi 1.5°C target trajectory
- Programme highlights: PACT PCFs shared, suppliers assessed, SBT commitments

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Recharts | Data visualisation (bar, line, radar, pie charts) |
| Vite | Build tool & dev server |
| Google Fonts (Syne + DM Mono) | Typography |
| Pure CSS (inline) | Styling & animations |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/scope3-ghg-dashboard.git
cd scope3-ghg-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗺️ Project Structure

```
scope3-ghg-dashboard/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx          # React entry point
    └── App.jsx           # Main dashboard component
```

---

## 📐 Data Model

All data is **simulated** for demonstration purposes and follows the GHG Protocol Corporate Value Chain (Scope 3) Standard. Categories align with WBCSD PACT methodology and SBTi FLAG/Chemical sector guidance.

| Dimension | Description |
|---|---|
| 15 Scope 3 categories | Upstream (Cat. 1–8) + Downstream (Cat. 9–15) |
| Member maturity | 4-level scale: Awareness → Advanced |
| Reduction targets | 2030 targets vs. SBTi 1.5°C pathway |
| External standards | PACT, Catena-X, WBCSD, GHG Protocol |

---

## 🔗 Relevant Frameworks & Initiatives

- [TfS Initiative](https://tfs-initiative.com) — Together for Sustainability
- [WBCSD PACT](https://www.carbon-transparency.com) — Product-level carbon transparency
- [Catena-X](https://catena-x.net) — Automotive & chemical data exchange
- [SBTi](https://sciencebasedtargets.org) — Science Based Targets initiative
- [GHG Protocol](https://ghgprotocol.org) — Scope 3 standard

---

## 👤 About

Built by Thiago Lefebure as a portfolio project demonstrating expertise in:
- Scope 3 GHG accounting & reporting frameworks
- Supply chain sustainability data management
- Stakeholder engagement tooling
- Data visualisation for complex sustainability topics

---

## 📄 License

MIT — free to use and adapt.
