import { useState, useEffect } from "react";
import poemsData from "./poems.json";

function AppIcon({ size = 80, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <defs>
        <linearGradient id="iconBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d1250" />
          <stop offset="100%" stopColor="#4a1078" />
        </linearGradient>
        <linearGradient id="letterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#iconBg)" />
      <rect width="100" height="100" rx="22" fill="none" stroke="rgba(192,132,252,0.3)" strokeWidth="1.5" />
      <circle cx="18" cy="20" r="1.2" fill="rgba(192,132,252,0.5)" />
      <circle cx="82" cy="78" r="1.5" fill="rgba(244,114,182,0.5)" />
      <text x="28" y="66" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="58" fontWeight="600" fontStyle="italic" fill="url(#letterGrad)" filter="url(#glow)">Q</text>
      <text x="46" y="72" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="46" fontWeight="300" fontStyle="italic" fill="url(#letterGrad)" opacity="0.92" filter="url(#glow)">O</text>
      <path d="M 52 42 Q 62 36 68 44" stroke="url(#letterGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

const themes = {
  night: {
    rootBg: "#0f0720",
    bgGrad: "linear-gradient(160deg, #0f0720 0%, #1e0b3a 60%, #0f0720 100%)",
    appBar: "rgba(15,7,32,0.95)",
    border: "rgba(192,132,252,0.15)",
    text: "#f0e6ff",
    title: "#e9d5ff",
    sub: "rgba(233,213,255,0.35)",
    preview: "rgba(240,230,255,0.5)",
    readText: "rgba(240,230,255,0.82)",
    cardBg: "rgba(255,255,255,0.04)",
    accent: "#c084fc",
    switchBg: "rgba(255,255,255,0.08)",
    switchActive: "rgba(192,132,252,0.3)",
  },
  day: {
    rootBg: "#f8f4ff",
    bgGrad: "linear-gradient(160deg, #f8f4ff 0%, #ede8ff 60%, #f8f4ff 100%)",
    appBar: "rgba(248,244,255,0.97)",
    border: "rgba(147,51,234,0.15)",
    text: "#2d1250",
    title: "#3b0764",
    sub: "rgba(45,18,80,0.45)",
    preview: "rgba(45,18,80,0.55)",
    readText: "rgba(45,18,80,0.82)",
    cardBg: "rgba(255,255,255,0.85)",
    accent: "#9333ea",
    switchBg: "rgba(147,51,234,0.1)",
    switchActive: "rgba(147,51,234,0.2)",
  },
  book: {
    rootBg: "#f5edd6",
    bgGrad: "linear-gradient(160deg, #f5edd6 0%, #ede0c4 60%, #f5edd6 100%)",
    appBar: "rgba(245,237,214,0.97)",
    border: "rgba(139,90,43,0.2)",
    text: "#3d2b1f",
    title: "#2c1a0e",
    sub: "rgba(61,43,31,0.45)",
    preview: "rgba(61,43,31,0.6)",
    readText: "rgba(61,43,31,0.85)",
    cardBg: "rgba(255,250,235,0.85)",
    accent: "#8b5a2b",
    switchBg: "rgba(139,90,43,0.12)",
    switchActive: "rgba(139,90,43,0.25)",
  },
};

const TAG_COLORS = ["#c084fc","#f472b6","#fb923c","#34d399","#60a5fa","#a78bfa","#f87171"];
function getTagColor(tag) {
  let h = 0;
  for (let c of tag) h = (h * 31 + c.charCodeAt(0)) % TAG_COLORS.length;
  return TAG_COLORS[h];
}

export default function App() {
  const [splash, setSplash] = useState(true);
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);
  const [filterTag, setFilterTag] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [toast, setToast] = useState("");
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("qalb_theme") || "night"; } catch { return "night"; }
  });
  const [favorites, setFavorites] = useState(() => {
    try { const s = localStorage.getItem("qalb_favs"); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });

  const T = themes[theme];
  const poems = poemsData;

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    try { localStorage.setItem("qalb_theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem("qalb_favs", JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };
  const toggleFav = (id) => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const allTags = [...new Set(poems.flatMap(p => p.tags))];
  const filtered = poems.filter(p => {
    if (activeTab === "favorites" && !favorites.includes(p.id)) return false;
    if (filterTag && !p.tags.includes(filterTag)) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.content.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (splash) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #0f0720 0%, #1e0b3a 50%, #0f0720 100%)", fontFamily: "'Nunito‘, sans-serif", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", animation: "splashIn 0.7s cubic-bezier(.34,1.56,.64,1) both" }}>
        <div style={{ position: "relative", marginBottom: 28 }}>
          <AppIcon size={100} />
          <div style={{ position: "absolute", inset: -20, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.3) 0%, transparent 70%)", animation: "glowPulse 2s ease infinite" }} />
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: "#e9d5ff", letterSpacing: 2, marginBottom: 8 }}>Qalb oromi</div>
        <div style={{ fontSize: 13, color: "rgba(233,213,255,0.45)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 48 }}>Dilorom Yusupova ijodi</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 0.2, 0.4].map((d, i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#c084fc", display: "inline-block", animation: `pulse 1.2s ease ${d}s infinite` }} />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 24, fontSize: 11, color: "rgba(233,213,255,0.2)", letterSpacing: 1 }}>Qalb oromi | 2026</div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap');
        @keyframes splashIn { from { opacity:0; transform:scale(0.85) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.3; transform:scale(0.8); } 50% { opacity:1; transform:scale(1); } }
        @keyframes glowPulse { 0%,100% { opacity:0.4; } 50% { opacity:0.8; } }
      `}</style>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.rootBg, color: T.text, fontFamily: "'Nunito‘, sans-serif", position: "relative", overflowX: "hidden", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ position: "fixed", inset: 0, background: T.bgGrad, zIndex: 0 }} />

      {toast && <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", background: "rgba(192,132,252,0.95)", color: "#1a0a2e", padding: "10px 26px", borderRadius: 30, fontWeight: 700, fontSize: 14, zIndex: 9999, whiteSpace: "nowrap" }}>{toast}</div>}

      {view === "list" && (
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 14px", background: T.appBar, backdropFilter: "blur(20px)", borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <AppIcon size={36} style={{ borderRadius: 10 }} />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: T.title }}}>Qalb oromi</div>
                <div style={{ fontSize: 11, color: T.sub }}>{poems.length} ta she’r</div>
              </div>
            </div>
            <div style={{ display: "flex", background: T.switchBg, borderRadius: 12, padding: 3, gap: 2 }}>
              {[["night","🌙"],["day","☀️"],["book","📖"]].map(([t, icon]) => (
                <button key={t} onClick={() => setTheme(t)} style={{ background: theme === t ? T.switchActive : "transparent", border: "none", borderRadius: 9, width: 32, height: 30, cursor: "pointer", fontSize: 16, transition: "background 0.2s" }}>{icon}</button>
              ))}
            </div>
          </div>

          <div style={{ margin: "14px 16px 0", display: "flex", alignItems: "center", background: T.cardBg, border: `1.5px solid ${T.border}`, borderRadius: 14, padding: "0 14px" }}>
            <span style={{ fontSize: 14, marginRight: 8, opacity: 0.5 }}>🔍</span>
            <input style={{ flex: 1, background: "none", border: "none", padding: "11px 0", color: T.text, fontSize: 14, outline: "none", fontFamily: "'Nunito‘, sans-serif" }} placeholder="She’r qidirish..." value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button style={{ background: "none", border: "none", color: T.sub, cursor: "pointer", fontSize: 14 }} onClick={() => setSearch("")}>✕</button>}
          </div>

          <div style={{ display: "flex", margin: "14px 16px 0", gap: 8 }}>
            {[["all","Barcha she’rlar"],["favorites","❤️ Sevimlilar"]].map(([t, label]) => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "9px 0", borderRadius: 12, border: `1.5px solid ${activeTab === t ? T.accent + "80" : T.border}`, background: activeTab === t ? T.switchActive : "transparent", color: activeTab === t ? T.title : T.sub, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Nunito‘, sans-serif" }}>{label}</button>
            ))}
          </div>

          {allTags.length > 0 && (
            <div style={{ display: "flex", overflowX: "auto", gap: 8, padding: "12px 16px", scrollbarWidth: "none" }}>
              <button onClick={() => setFilterTag(null)} style={{ flexShrink: 0, padding: "5px 14px", borderRadius: 20, border: `1.5px solid ${T.accent}`, background: filterTag === null ? T.switchActive : "transparent", color: T.accent, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Nunito‘, sans-serif" }}>Barchasi</button>
              {allTags.map(tag => (
                <button key={tag} onClick={() => setFilterTag(filterTag === tag ? null : tag)} style={{ flexShrink: 0, padding: "5px 14px", borderRadius: 20, border: `1.5px solid ${getTagColor(tag)}`, background: filterTag === tag ? getTagColor(tag) + "33" : "transparent", color: getTagColor(tag), fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Nunito‘, sans-serif" }}>#{tag}</button>
              ))}
            </div>
          )}

          <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 0" }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 20px", color: T.sub }}>
                <div style={{ fontSize: 48, marginBottom: 14 }}>✦</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>She’r topilmadi</div>
              </div>
            )}
            {filtered.map((poem, i) => (
              <div key={poem.id} onClick={() => { setSelected(poem); setView("read"); }} style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 18, padding: "18px 18px 14px", marginBottom: 12, cursor: "pointer", position: "relative", animation: "fadeUp 0.4s ease both", animationDelay: `${i * 0.05}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 10, color: T.sub, letterSpacing: 1 }}>{poem.date}</div>
                  <button onClick={e => { e.stopPropagation(); toggleFav(poem.id); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 0 }}>{favorites.includes(poem.id) ? "❤️" : "🤍"}</button>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: T.title, marginBottom: 8 }}>{poem.title}</div>
                <div style={{ fontSize: 13, color: T.preview, lineHeight: 1.65, whiteSpace: "pre-line", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
                  {poem.content.split("\n").slice(0, 2).join("\n")}{poem.content.split("\n").length > 2 ? "…" : ""}
                </div>
                {poem.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                    {poem.tags.slice(0, 3).map(t => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 10, background: getTagColor(t) + "22", color: getTagColor(t), border: `1px solid ${getTagColor(t)}55` }}>#{t}</span>
                    ))}
                  </div>
                )}
                <div style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", fontSize: 22, color: T.border }}>›</div>
              </div>
            ))}
            <div style={{ height: 24 }} />
          </div>
        </div>
      )}

      {view === "read" && selected && (
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: T.appBar, backdropFilter: "blur(20px)", borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 50 }}>
            <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: T.accent, fontSize: 30, cursor: "pointer", lineHeight: 1, padding: "0 4px", width: 36 }}>‹</button>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: T.title }}>She’r</div>
            <button onClick={() => toggleFav(selected.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, width: 36, textAlign: "right" }}>{favorites.includes(selected.id) ? "❤️" : "🤍"}</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 24px 60px", background: T.rootBg, animation: "fadeUp 0.35s ease" }}>
            <div style={{ fontSize: 11, color: T.sub, letterSpacing: 1, marginBottom: 10 }}>{selected.date}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 600, color: T.title, lineHeight: 1.25 }}>{selected.title}</h1>
            <div style={{ height: 1, background: `linear-gradient(90deg, ${T.accent}80, transparent)`, margin: "20px 0" }} />
            <pre style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, lineHeight: 2.1, color: T.readText, whiteSpace: "pre-wrap", fontStyle: "italic", fontWeight: 300 }}>{selected.content}</pre>
            {selected.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 24 }}>
                {selected.tags.map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 10, background: getTagColor(t) + "22", color: getTagColor(t), border: `1px solid ${getTagColor(t)}55` }}>#{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { background: #0f0720; }
        input, button { font-family: 'Nunito‘, sans-serif; }
        input::placeholder { color: rgba(240,230,255,0.25); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(192,132,252,0.3); border-radius: 10px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.3; transform:scale(0.8); } 50% { opacity:1; transform:scale(1); } }
        @keyframes splashIn { from { opacity:0; transform:scale(0.85) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes glowPulse { 0%,100% { opacity:0.4; } 50% { opacity:0.8; } }
      `}</style>
    </div>
  );
}
