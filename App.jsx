import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend } from "recharts";

const COLORS = {
  bg: "#0a0f1e",
  card: "#0e1628",
  cardBorder: "#1a2540",
  accent: "#00e5b0",
  accentDim: "#00b88a",
  warning: "#f5a623",
  danger: "#e84545",
  blue: "#4a90d9",
  text: "#e8edf5",
  textMuted: "#6b7a99",
  upstream: "#00e5b0",
  downstream: "#4a90d9",
  direct: "#f5a623",
};

const scope3Categories = [
  { id: 1, name: "Purchased Goods & Services", tCO2e: 2840000, type: "upstream", change: -8.2, completion: 78 },
  { id: 2, name: "Capital Goods", tCO2e: 420000, type: "upstream", change: -3.1, completion: 65 },
  { id: 3, name: "Fuel & Energy Related", tCO2e: 310000, type: "upstream", change: -12.4, completion: 91 },
  { id: 4, name: "Upstream Transportation", tCO2e: 580000, type: "upstream", change: -5.7, completion: 83 },
  { id: 5, name: "Waste Generated", tCO2e: 145000, type: "upstream", change: -18.3, completion: 88 },
  { id: 6, name: "Business Travel", tCO2e: 67000, type: "upstream", change: -22.1, completion: 95 },
  { id: 7, name: "Employee Commuting", tCO2e: 89000, type: "upstream", change: -6.4, completion: 72 },
  { id: 8, name: "Upstream Leased Assets", tCO2e: 34000, type: "upstream", change: 2.1, completion: 54 },
  { id: 9, name: "Downstream Transportation", tCO2e: 390000, type: "downstream", change: -4.2, completion: 69 },
  { id: 10, name: "Processing of Sold Products", tCO2e: 1240000, type: "downstream", change: -1.8, completion: 45 },
  { id: 11, name: "Use of Sold Products", tCO2e: 1890000, type: "downstream", change: 1.2, completion: 38 },
  { id: 12, name: "End-of-Life Treatment", tCO2e: 560000, type: "downstream", change: -9.6, completion: 61 },
  { id: 13, name: "Downstream Leased Assets", tCO2e: 28000, type: "downstream", change: -0.4, completion: 42 },
  { id: 14, name: "Franchises", tCO2e: 12000, type: "downstream", change: 0.0, completion: 30 },
  { id: 15, name: "Investments", tCO2e: 95000, type: "downstream", change: -14.2, completion: 58 },
];

const members = [
  { name: "BASF", region: "Europe", maturity: 4, scope3Progress: 82, target2030: -45, currentReduction: -18, status: "on-track" },
  { name: "Bayer", region: "Europe", maturity: 4, scope3Progress: 76, target2030: -40, currentReduction: -14, status: "on-track" },
  { name: "Dow", region: "Americas", maturity: 3, scope3Progress: 61, target2030: -35, currentReduction: -9, status: "at-risk" },
  { name: "Evonik", region: "Europe", maturity: 3, scope3Progress: 58, target2030: -30, currentReduction: -11, status: "on-track" },
  { name: "LG Chem", region: "Asia", maturity: 2, scope3Progress: 44, target2030: -25, currentReduction: -6, status: "at-risk" },
  { name: "Mitsubishi", region: "Asia", maturity: 2, scope3Progress: 39, target2030: -30, currentReduction: -4, status: "lagging" },
  { name: "Sabic", region: "Middle East", maturity: 3, scope3Progress: 67, target2030: -35, currentReduction: -13, status: "on-track" },
  { name: "Solvay", region: "Europe", maturity: 4, scope3Progress: 79, target2030: -42, currentReduction: -17, status: "on-track" },
  { name: "Covestro", region: "Europe", maturity: 3, scope3Progress: 64, target2030: -38, currentReduction: -10, status: "at-risk" },
  { name: "Arkema", region: "Europe", maturity: 2, scope3Progress: 47, target2030: -28, currentReduction: -7, status: "at-risk" },
  { name: "Toray", region: "Asia", maturity: 2, scope3Progress: 35, target2030: -20, currentReduction: -3, status: "lagging" },
  { name: "DSM-Firmenich", region: "Europe", maturity: 4, scope3Progress: 85, target2030: -50, currentReduction: -21, status: "on-track" },
];

const trendData = [
  { year: "2019", total: 9200000, upstream: 5100000, downstream: 4100000 },
  { year: "2020", total: 8750000, upstream: 4850000, downstream: 3900000 },
  { year: "2021", total: 8620000, upstream: 4780000, downstream: 3840000 },
  { year: "2022", total: 8310000, upstream: 4600000, downstream: 3710000 },
  { year: "2023", total: 7940000, upstream: 4400000, downstream: 3540000 },
  { year: "2024", total: 7700000, upstream: 4280000, downstream: 3420000 },
];

const maturityData = [
  { subject: "Data Quality", A: 72, fullMark: 100 },
  { subject: "Target Setting", A: 65, fullMark: 100 },
  { subject: "Supplier Engagement", A: 58, fullMark: 100 },
  { subject: "Reporting", A: 80, fullMark: 100 },
  { subject: "Verification", A: 61, fullMark: 100 },
  { subject: "PACT Alignment", A: 49, fullMark: 100 },
];

const fmt = (n) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n;

const StatusBadge = ({ status }) => {
  const config = {
    "on-track": { color: COLORS.accent, label: "On Track" },
    "at-risk": { color: COLORS.warning, label: "At Risk" },
    "lagging": { color: COLORS.danger, label: "Lagging" },
  };
  const c = config[status];
  return (
    <span style={{
      background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}44`,
      padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em"
    }}>{c.label}</span>
  );
};

const KpiCard = ({ label, value, sub, accent, trend }) => (
  <div style={{
    background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12,
    padding: "20px 24px", flex: 1, minWidth: 160,
    borderTop: `2px solid ${accent || COLORS.accent}`,
    position: "relative", overflow: "hidden"
  }}>
    <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80,
      background: `radial-gradient(circle at top right, ${accent || COLORS.accent}18, transparent 70%)` }} />
    <div style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
    <div style={{ color: COLORS.text, fontSize: 28, fontWeight: 700, fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em" }}>{value}</div>
    {sub && <div style={{ color: trend < 0 ? COLORS.accent : trend > 0 ? COLORS.danger : COLORS.textMuted, fontSize: 12, marginTop: 6, fontWeight: 500 }}>{sub}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111827", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px" }}>
      <div style={{ color: COLORS.textMuted, fontSize: 11, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}: {fmt(p.value)} tCO₂e
        </div>
      ))}
    </div>
  );
};

export default function Scope3Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [filterType, setFilterType] = useState("all");
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => { setAnimKey(k => k + 1); }, [activeTab]);

  const totalEmissions = scope3Categories.reduce((s, c) => s + c.tCO2e, 0);
  const upstreamTotal = scope3Categories.filter(c => c.type === "upstream").reduce((s, c) => s + c.tCO2e, 0);
  const downstreamTotal = scope3Categories.filter(c => c.type === "downstream").reduce((s, c) => s + c.tCO2e, 0);
  const avgReduction = (trendData[5].total - trendData[0].total) / trendData[0].total * 100;
  const onTrack = members.filter(m => m.status === "on-track").length;

  const filteredCats = scope3Categories.filter(c => filterType === "all" || c.type === filterType);
  const filteredMembers = members.filter(m => selectedRegion === "All" || m.region === selectedRegion);

  const pieData = [
    { name: "Upstream", value: upstreamTotal },
    { name: "Downstream", value: downstreamTotal },
  ];

  const tabs = ["overview", "categories", "members", "trends"];

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg, color: COLORS.text,
      fontFamily: "'Syne', 'DM Sans', sans-serif", padding: "0"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.cardBorder}; border-radius: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        .tab-btn { background: none; border: none; cursor: pointer; transition: all 0.2s; }
        .tab-btn:hover { opacity: 0.8; }
        .row-hover:hover { background: ${COLORS.cardBorder} !important; transition: background 0.15s; }
      `}</style>

      {/* Header */}
      <div style={{
        background: `linear-gradient(180deg, #0d1529 0%, ${COLORS.bg} 100%)`,
        borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "0 32px"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.blue})`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800
              }}>T</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, letterSpacing: "0.05em" }}>TfS INITIATIVE</div>
                <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.1em" }}>Together for Sustainability</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.accent, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.08em" }}>LIVE · FY2024 DATA</span>
            </div>
          </div>

          <div style={{ padding: "24px 0 0" }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Scope 3 GHG{" "}
              <span style={{ background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Emissions Programme
              </span>
            </h1>
            <p style={{ color: COLORS.textMuted, marginTop: 6, fontSize: 13 }}>
              Chemical industry supply chain · {members.length} member companies · 15 GHG Protocol categories
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, marginTop: 24 }}>
            {tabs.map(tab => (
              <button key={tab} className="tab-btn" onClick={() => setActiveTab(tab)} style={{
                padding: "12px 20px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: activeTab === tab ? COLORS.accent : COLORS.textMuted,
                borderBottom: `2px solid ${activeTab === tab ? COLORS.accent : "transparent"}`,
              }}>{tab}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px" }} key={animKey}>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {/* KPI Row */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <KpiCard label="Total Scope 3 Emissions" value={`${fmt(totalEmissions)} tCO₂e`} sub={`${avgReduction.toFixed(1)}% since 2019`} trend={-1} accent={COLORS.accent} />
              <KpiCard label="Upstream Emissions" value={`${fmt(upstreamTotal)} tCO₂e`} sub={`${(upstreamTotal/totalEmissions*100).toFixed(0)}% of total`} accent={COLORS.upstream} />
              <KpiCard label="Downstream Emissions" value={`${fmt(downstreamTotal)} tCO₂e`} sub={`${(downstreamTotal/totalEmissions*100).toFixed(0)}% of total`} accent={COLORS.downstream} />
              <KpiCard label="Members On-Track" value={`${onTrack}/${members.length}`} sub={`${(onTrack/members.length*100).toFixed(0)}% meeting 2030 targets`} trend={-1} accent={COLORS.accent} />
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 24 }}>
              
              {/* Trend Line */}
              <div style={{ gridColumn: "1 / 3", background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>EMISSIONS TRAJECTORY</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 20 }}>Portfolio-wide Scope 3 trend 2019–2024 (tCO₂e)</div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.cardBorder} />
                    <XAxis dataKey="year" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: COLORS.textMuted }} />
                    <Line type="monotone" dataKey="upstream" name="Upstream" stroke={COLORS.upstream} strokeWidth={2} dot={{ r: 3, fill: COLORS.upstream }} />
                    <Line type="monotone" dataKey="downstream" name="Downstream" stroke={COLORS.downstream} strokeWidth={2} dot={{ r: 3, fill: COLORS.downstream }} />
                    <Line type="monotone" dataKey="total" name="Total" stroke={COLORS.warning} strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3, fill: COLORS.warning }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pie */}
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>SPLIT</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 12 }}>Upstream vs Downstream</div>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                      <Cell fill={COLORS.upstream} />
                      <Cell fill={COLORS.downstream} />
                    </Pie>
                    <Tooltip formatter={(v) => `${fmt(v)} tCO₂e`} contentStyle={{ background: "#111827", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                  {pieData.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: i === 0 ? COLORS.upstream : COLORS.downstream }} />
                      <span style={{ fontSize: 11, color: COLORS.textMuted }}>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Radar + top emitters */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>PROGRAMME MATURITY</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 16 }}>Average across TfS membership</div>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={maturityData}>
                    <PolarGrid stroke={COLORS.cardBorder} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: COLORS.textMuted, fontSize: 10 }} />
                    <Radar name="Score" dataKey="A" stroke={COLORS.accent} fill={COLORS.accent} fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>TOP EMISSION CATEGORIES</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 16 }}>Ranked by absolute tCO₂e</div>
                {[...scope3Categories].sort((a, b) => b.tCO2e - a.tCO2e).slice(0, 5).map((cat, i) => (
                  <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ color: COLORS.textMuted, fontSize: 11, fontFamily: "'DM Mono', monospace", width: 16 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3 }}>Cat. {cat.id}: {cat.name}</div>
                      <div style={{ height: 4, background: COLORS.cardBorder, borderRadius: 2 }}>
                        <div style={{ height: 4, background: cat.type === "upstream" ? COLORS.upstream : COLORS.downstream, borderRadius: 2, width: `${cat.tCO2e / scope3Categories[0].tCO2e * 100}%` }} />
                      </div>
                    </div>
                    <div style={{ color: COLORS.text, fontSize: 12, fontFamily: "'DM Mono', monospace", textAlign: "right", width: 70 }}>{fmt(cat.tCO2e)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === "categories" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {["all", "upstream", "downstream"].map(f => (
                <button key={f} onClick={() => setFilterType(f)} style={{
                  background: filterType === f ? `${COLORS.accent}22` : COLORS.card,
                  border: `1px solid ${filterType === f ? COLORS.accent : COLORS.cardBorder}`,
                  color: filterType === f ? COLORS.accent : COLORS.textMuted,
                  padding: "6px 16px", borderRadius: 6, cursor: "pointer", fontSize: 11,
                  fontWeight: 600, letterSpacing: "0.06em", textTransform: "capitalize"
                }}>{f === "all" ? "All Categories" : f.charAt(0).toUpperCase() + f.slice(1)}</button>
              ))}
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "40px 2fr 130px 100px 90px 100px", gap: 0, padding: "12px 20px", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
                {["#", "Category", "tCO₂e", "YoY Change", "Type", "Data Coverage"].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 700, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {filteredCats.map((cat, i) => (
                <div key={cat.id} className="row-hover" style={{
                  display: "grid", gridTemplateColumns: "40px 2fr 130px 100px 90px 100px",
                  padding: "14px 20px", borderBottom: `1px solid ${COLORS.cardBorder}`,
                  background: i % 2 === 0 ? "transparent" : "#0c111f"
                }}>
                  <div style={{ color: COLORS.textMuted, fontSize: 12, fontFamily: "'DM Mono', monospace" }}>{cat.id.toString().padStart(2, "0")}</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{cat.name}</div>
                  <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: COLORS.text }}>{fmt(cat.tCO2e)}</div>
                  <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: cat.change < 0 ? COLORS.accent : COLORS.danger, fontWeight: 600 }}>
                    {cat.change > 0 ? "+" : ""}{cat.change}%
                  </div>
                  <div>
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                      color: cat.type === "upstream" ? COLORS.upstream : COLORS.downstream,
                      background: cat.type === "upstream" ? `${COLORS.upstream}18` : `${COLORS.downstream}18`,
                      border: `1px solid ${cat.type === "upstream" ? COLORS.upstream : COLORS.downstream}44`,
                      padding: "2px 8px", borderRadius: 4
                    }}>{cat.type}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: COLORS.cardBorder, borderRadius: 2 }}>
                      <div style={{ height: 4, background: cat.completion > 75 ? COLORS.accent : cat.completion > 50 ? COLORS.warning : COLORS.danger, borderRadius: 2, width: `${cat.completion}%` }} />
                    </div>
                    <span style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'DM Mono', monospace", width: 32 }}>{cat.completion}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>EMISSIONS BY CATEGORY</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 20 }}>Absolute tCO₂e comparison</div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={filteredCats} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fill: COLORS.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                  <YAxis type="category" dataKey="id" tick={{ fill: COLORS.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={id => `Cat.${id}`} width={40} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="tCO2e" name="Emissions" radius={[0, 4, 4, 0]}>
                    {filteredCats.map((entry) => (
                      <Cell key={entry.id} fill={entry.type === "upstream" ? COLORS.upstream : COLORS.downstream} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* MEMBERS TAB */}
        {activeTab === "members" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {["All", "Europe", "Americas", "Asia", "Middle East"].map(r => (
                <button key={r} onClick={() => setSelectedRegion(r)} style={{
                  background: selectedRegion === r ? `${COLORS.accent}22` : COLORS.card,
                  border: `1px solid ${selectedRegion === r ? COLORS.accent : COLORS.cardBorder}`,
                  color: selectedRegion === r ? COLORS.accent : COLORS.textMuted,
                  padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 11,
                  fontWeight: 600, letterSpacing: "0.06em"
                }}>{r}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: 24 }}>
              {filteredMembers.map(member => (
                <div key={member.name} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 20, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100,
                    background: `radial-gradient(circle at top right, ${member.status === "on-track" ? COLORS.accent : member.status === "at-risk" ? COLORS.warning : COLORS.danger}12, transparent 70%)` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{member.name}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{member.region}</div>
                    </div>
                    <StatusBadge status={member.status} />
                  </div>
                  
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: COLORS.textMuted }}>Programme completion</span>
                      <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: COLORS.text }}>{member.scope3Progress}%</span>
                    </div>
                    <div style={{ height: 6, background: COLORS.cardBorder, borderRadius: 3 }}>
                      <div style={{ height: 6, borderRadius: 3, width: `${member.scope3Progress}%`,
                        background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.blue})` }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    <div style={{ background: `${COLORS.cardBorder}88`, borderRadius: 6, padding: "8px 10px" }}>
                      <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>Maturity</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>{member.maturity}<span style={{ fontSize: 10, color: COLORS.textMuted }}>/4</span></div>
                    </div>
                    <div style={{ background: `${COLORS.cardBorder}88`, borderRadius: 6, padding: "8px 10px" }}>
                      <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>2030 Target</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.warning }}>{member.target2030}%</div>
                    </div>
                    <div style={{ background: `${COLORS.cardBorder}88`, borderRadius: 6, padding: "8px 10px" }}>
                      <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>Achieved</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent }}>{member.currentReduction}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>TARGET vs ACHIEVEMENT</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 20 }}>2030 reduction target vs current progress (%)</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={filteredMembers} margin={{ bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.cardBorder} vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip contentStyle={{ background: "#111827", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, fontSize: 12 }} formatter={v => `${v}%`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="target2030" name="2030 Target" fill={COLORS.warning} fillOpacity={0.6} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="currentReduction" name="Current Reduction" fill={COLORS.accent} fillOpacity={0.8} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TRENDS TAB */}
        {activeTab === "trends" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>ABSOLUTE EMISSIONS TREND</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 20 }}>Total portfolio Scope 3 (MtCO₂e)</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.cardBorder} vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="upstream" name="Upstream" stackId="a" fill={COLORS.upstream} fillOpacity={0.85} />
                    <Bar dataKey="downstream" name="Downstream" stackId="a" fill={COLORS.downstream} fillOpacity={0.85} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4 }}>PATHWAY TO NET ZERO</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 20 }}>Projected trajectory vs SBTi 1.5°C pathway</div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={[
                    ...trendData,
                    { year: "2025", total: 7350000, upstream: 4080000, downstream: 3270000 },
                    { year: "2026", total: 6950000, upstream: null, downstream: null, sbti: 6500000 },
                    { year: "2027", total: null, upstream: null, downstream: null, sbti: 6000000 },
                    { year: "2028", total: null, sbti: 5400000 },
                    { year: "2029", total: null, sbti: 4700000 },
                    { year: "2030", total: null, sbti: 3900000 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.cardBorder} />
                    <XAxis dataKey="year" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: COLORS.textMuted }} />
                    <Line type="monotone" dataKey="total" name="Actual/Projected" stroke={COLORS.accent} strokeWidth={2.5} dot={{ r: 3 }} connectNulls={false} />
                    <Line type="monotone" dataKey="sbti" name="SBTi 1.5°C" stroke={COLORS.danger} strokeWidth={2} strokeDasharray="6 3" dot={false} connectNulls={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary stats */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 20 }}>PROGRAMME HIGHLIGHTS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {[
                  { label: "Total Reduction Since 2019", value: `${Math.abs(avgReduction).toFixed(1)}%`, note: "16.3% absolute decline", color: COLORS.accent },
                  { label: "Members with SBTs", value: "38/50", note: "76% commitment rate", color: COLORS.blue },
                  { label: "Suppliers Assessed", value: "12,400+", note: "Via TfS assessments", color: COLORS.warning },
                  { label: "PACT-Aligned PCFs", value: "2,800+", note: "Product carbon footprints shared", color: COLORS.accent },
                ].map(item => (
                  <div key={item.label} style={{ background: `${item.color}10`, border: `1px solid ${item.color}30`, borderRadius: 10, padding: 18 }}>
                    <div style={{ color: item.color, fontSize: 26, fontWeight: 800, fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em" }}>{item.value}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, margin: "6px 0 3px" }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${COLORS.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 11, color: COLORS.textMuted }}>
            TfS Scope 3 GHG Programme · Data as of December 2024 · GHG Protocol compliant
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {["PACT", "Catena-X", "WBCSD", "SBTi"].map(p => (
              <span key={p} style={{ fontSize: 10, fontWeight: 700, color: COLORS.textMuted, letterSpacing: "0.1em",
                background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, padding: "3px 8px", borderRadius: 4 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
