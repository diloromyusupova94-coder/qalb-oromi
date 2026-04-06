import poemsData from "./poems.json";

import { useState, useEffect } from "react";

// ─── APP ICON SVG ───────────────────────────────────────────────────────────
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
      {/* Background rounded rect */}
      <rect width="100" height="100" rx="22" fill="url(#iconBg)" />
      {/* Subtle inner glow ring */}
      <rect width="100" height="100" rx="22" fill="none" stroke="rgba(192,132,252,0.3)" strokeWidth="1.5" />
      {/* Decorative small stars */}
      <circle cx="18" cy="20" r="1.2" fill="rgba(192,132,252,0.5)" />
      <circle cx="82" cy="78" r="1.5" fill="rgba(244,114,182,0.5)" />
      <circle cx="78" cy="22" r="1" fill="rgba(192,132,252,0.4)" />
      {/* Q letter */}
      <text
        x="28" y="66"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="58"
        fontWeight="600"
        fontStyle="italic"
        fill="url(#letterGrad)"
        filter="url(#glow)"
      >Q</text>
      {/* O letter — overlapping, offset */}
      <text
        x="46" y="72"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="46"
        fontWeight="300"
        fontStyle="italic"
        fill="url(#letterGrad)"
        opacity="0.92"
        filter="url(#glow)"
      >O</text>
      {/* Connecting flourish line */}
      <path
        d="M 52 42 Q 62 36 68 44"
        stroke="url(#letterGrad)" strokeWidth="1.2"
        fill="none" strokeLinecap="round" opacity="0.7"
      />
    </svg>
  );
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const TAG_COLORS = ["#c084fc","#f472b6","#fb923c","#34d399","#60a5fa","#a78bfa","#f87171"];
function getTagColor(tag) {
  let h = 0;
  for (let c of tag) h = (h * 31 + c.charCodeAt(0)) % TAG_COLORS.length;
  return TAG_COLORS[h];
}

// ─── THEMES ──────────────────────────────────────────────────────────────────
const themes = {
  night: {
    rootBg: "#0f0720",
    bgGrad: "linear-gradient(160deg, #0f0720 0%, #1e0b3a 60%, #0f0720 100%)",
    appBar: "rgba(15,7,32,0.92)",
    border: "rgba(192,132,252,0.15)",
    text: "#f0e6ff",
    title: "#e9d5ff",
    sub: "rgba(233,213,255,0.35)",
    preview: "rgba(240,230,255,0.5)",
    readText: "rgba(240,230,255,0.82)",
    cardBg: "rgba(255,255,255,0.04)",
    inputBg: "rgba(255,255,255,0.05)",
    accent: "#c084fc",
    themeSwitchBg: "rgba(255,255,255,0.08)",
    themeBtnActive: "rgba(192,132,252,0.3)",
  },
  day: {
    rootBg: "#f8f4ff",
    bgGrad: "linear-gradient(160deg, #f8f4ff 0%, #ede8ff 60%, #f8f4ff 100%)",
    appBar: "rgba(248,244,255,0.95)",
    border: "rgba(147,51,234,0.15)",
    text: "#2d1250",
    title: "#3b0764",
    sub: "rgba(45,18,80,0.45)",
    preview: "rgba(45,18,80,0.55)",
    readText: "rgba(45,18,80,0.8)",
    cardBg: "rgba(255,255,255,0.8)",
    inputBg: "rgba(255,255,255,0.9)",
    accent: "#9333ea",
    themeSwitchBg: "rgba(147,51,234,0.1)",
    themeBtnActive: "rgba(147,51,234,0.2)",
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
    inputBg: "rgba(255,252,242,0.9)",
    accent: "#8b5a2b",
    themeSwitchBg: "rgba(139,90,43,0.12)",
    themeBtnActive: "rgba(139,90,43,0.22)",
  },
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [splash, setSplash] = useState(true);
  const [poems, setPoems] = useState(() => {
    try { const s = localStorage.getItem("qalb_oromi"); return s ? JSON.parse(s) : poemsData; }
    catch { return poemsData; }
  });
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);
  const [filterTag, setFilterTag] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("qalb_theme") || "night"; } catch { return "night"; }
  });
  const [favorites, setFavorites] = useState(() => {
    try { const s = localStorage.getItem("qalb_favs"); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });

  const T = themes[theme];

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    try { localStorage.setItem("qalb_oromi", JSON.stringify(poems)); } catch {}
  }, [poems]);

  useEffect(() => {
    try { localStorage.setItem("qalb_favs", JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  useEffect(() => {
    try { localStorage.setItem("qalb_theme", theme); } catch {}
  }, [theme]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const allTags = [...new Set(poems.flatMap(p => p.tags))];
  const filtered = poems.filter(p => {
    if (activeTab === "favorites" && !favorites.includes(p.id)) return false;
    if (filterTag && !p.tags.includes(filterTag)) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.content.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleFav = (id) => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const openRead = (poem) => { setSelected(poem); setView("read"); };
  const openEdit = (poem) => {
    setForm({ title: poem.title, content: poem.content, tags: poem.tags.join(", ") });
    setEditId(poem.id); setView("write");
  };
  const openNew = () => { setForm({ title: "", content: "", tags: "" }); setEditId(null); setView("write"); };

      setPoems(prev => [newPoem, ...prev]);
      showToast("She'r saqlandi 🌸");
      setView("list");
    }
  };


  // ── SPLASH ────────────────────────────────────────────────────────────────
  if (splash) return (
    <div style={S.splashRoot}>
      <div style={S.splashContent}>
        <div style={S.splashIconWrap}>
          <AppIcon size={100} />
          <div style={S.splashGlow} />
        </div>
        <div style={S.splashTitle}>Qalb oromi</div>
        <div style={S.splashSub}>Dilorom Yusupova ijodi</div>
        <div style={S.splashDots}>
          <span style={{ ...S.dot, animationDelay: "0s" }} />
          <span style={{ ...S.dot, animationDelay: "0.2s" }} />
          <span style={{ ...S.dot, animationDelay: "0.4s" }} />
        </div>
      </div>
      <div style={S.splashDev}>Qalb oromi | 2026</div>
    </div>
  );

  // ── MAIN ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ ...S.root, background: T.rootBg, color: T.text }}>
      {/* BG */}
      <div style={{ ...S.bgGrad, background: T.bgGrad }} />
      <div style={S.bgOrbs}>
        <div style={{ ...S.orb, width: 260, height: 260, top: -80, right: -80, background: "radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 70%)" }} />
        <div style={{ ...S.orb, width: 180, height: 180, bottom: 80, left: -60, background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }} />
      </div>

      {/* TOAST */}
      {toast && <div style={S.toast}>{toast}</div>}

      {/* ── LIST ── */}
      {view === "list" && (
        <div style={S.screen}>
          {/* Header */}
          <div style={{ ...S.appBar, background: T.appBar, borderBottom: `1px solid ${T.border}` }}>
            <div style={S.appBarLeft}>
              <AppIcon size={36} style={{ borderRadius: 10 }} />
              <div>
                <div style={{ ...S.appName, color: T.title }}>Qalb oromi</div>
                <div style={{ ...S.appSub, color: T.sub }}>{poems.length} ta she'r</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ display: "flex", background: T.themeSwitchBg, borderRadius: 12, padding: 3, gap: 2 }}>
                {[["night","🌙"],["day","☀️"],["book","📖"]].map(([t, icon]) => (
                  <button key={t} onClick={() => setTheme(t)} style={{
                    background: theme === t ? T.themeBtnActive : "transparent",
                    border: "none", borderRadius: 9, width: 30, height: 28,
                    cursor: "pointer", fontSize: 15, transition: "background 0.2s",
                  }}>{icon}</button>
                ))}
              </div>
              <button style={S.fab} onClick={openNew}>＋</button>
            </div>
          </div>

          {/* Search */}
          <div style={{ ...S.searchWrap, background: T.inputBg, border: `1.5px solid ${T.border}` }}>
            <span style={S.searchIcon}>🔍</span>
            <input style={{ ...S.searchInput, color: T.text }} placeholder="She'r qidirish..." value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button style={S.clearBtn} onClick={() => setSearch("")}>✕</button>}
          </div>

          {/* Tabs */}
          <div style={S.tabs}>
            {["all", "favorites"].map(t => (
              <button key={t} style={{ ...S.tab, ...(activeTab === t ? S.tabActive : {}) }} onClick={() => setActiveTab(t)}>
                {t === "all" ? "Barcha she'rlar" : "❤️ Sevimlilar"}
              </button>
            ))}
          </div>

          {/* Tag chips */}
          {allTags.length > 0 && (
            <div style={S.tagScroll}>
              <button style={{ ...S.chip, ...(filterTag === null ? S.chipActive : {}) }} onClick={() => setFilterTag(null)}>Barchasi</button>
              {allTags.map(tag => (
                <button key={tag} style={{ ...S.chip, ...(filterTag === tag ? { background: getTagColor(tag) + "33", borderColor: getTagColor(tag), color: getTagColor(tag) } : {}) }} onClick={() => setFilterTag(filterTag === tag ? null : tag)}>
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Cards */}
          <div style={S.cardList}>
            {filtered.length === 0 && (
              <div style={S.empty}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>✦</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "rgba(233,213,255,0.6)" }}>
                  {poems.length === 0 ? "Birinchi she'ringizni\nyozing..." : "She'r topilmadi"}
                </div>
              </div>
            )}
            {filtered.map((poem, i) => (
              <div key={poem.id} style={{ ...S.card, background: T.cardBg, border: `1px solid ${T.border}`, animationDelay: `${i * 0.06}s` }} onClick={() => openRead(poem)}>
                <div style={S.cardTop}>
                  <div style={S.cardDate}>{poem.date}</div>
                  <button style={S.favBtn} onClick={e => { e.stopPropagation(); toggleFav(poem.id); }}>
                    {favorites.includes(poem.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div style={{ ...S.cardTitle, color: T.title }}>{poem.title}</div>
                <div style={{ ...S.cardPreview, color: T.preview }}>{poem.content.split("\n").slice(0, 2).join("\n")}{poem.content.split("\n").length > 2 ? "…" : ""}</div>
                {poem.tags.length > 0 && (
                  <div style={S.cardTagRow}>
                    {poem.tags.slice(0, 3).map(t => (
                      <span key={t} style={{ ...S.cardTagPill, background: getTagColor(t) + "22", color: getTagColor(t), border: `1px solid ${getTagColor(t)}55` }}>#{t}</span>
                    ))}
                  </div>
                )}
                <div style={S.cardArrow}>›</div>
              </div>
            ))}
            <div style={{ height: 24 }} />
          </div>
        </div>
      )}

      {/* ── READ ── */}
      {view === "read" && selected && (
        <div style={S.screen}>
          <div style={{ ...S.navBar, background: T.appBar, borderBottom: `1px solid ${T.border}` }}>
            <button style={{ ...S.navBack, color: T.accent }} onClick={() => setView("list")}>‹</button>
            <div style={S.navTitle}>She'r</div>
            <button style={S.navFav} onClick={() => toggleFav(selected.id)}>
              {favorites.includes(selected.id) ? "❤️" : "🤍"}
            </button>
          </div>
          <div style={{ ...S.readBody, background: T.rootBg }}>
            <div style={{ ...S.readMeta, color: T.sub }}>{selected.date}</div>
            <h1 style={{ ...S.readTitle, color: T.title }}>{selected.title}</h1>
            <div style={{ ...S.readDivider, background: `linear-gradient(90deg, ${T.accent}80, transparent)` }} />
            <pre style={{ ...S.readContent, color: T.readText }}>{selected.content}</pre>
            {selected.tags.length > 0 && (
              <div style={{ ...S.cardTagRow, marginTop: 24 }}>
                {selected.tags.map(t => (
                  <span key={t} style={{ ...S.cardTagPill, background: getTagColor(t) + "22", color: getTagColor(t), border: `1px solid ${getTagColor(t)}55` }}>#{t}</span>
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
        input, textarea, button { font-family: 'Nunito', sans-serif; }
        input::placeholder, textarea::placeholder { color: rgba(240,230,255,0.25); }
        input:focus, textarea:focus { outline: none; border-color: rgba(192,132,252,0.5) !important; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(192,132,252,0.3); border-radius: 10px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.3; transform:scale(0.8); } 50% { opacity:1; transform:scale(1); } }
        @keyframes splashIn { from { opacity:0; transform:scale(0.85) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        @keyframes glowPulse { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.15); } }
      `}</style>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  // Splash
  splashRoot: {
    minHeight: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    background: "linear-gradient(160deg, #0f0720 0%, #1e0b3a 50%, #0f0720 100%)",
    fontFamily: "'Nunito', sans-serif",
  },
  splashContent: { display: "flex", flexDirection: "column", alignItems: "center", animation: "splashIn 0.7s cubic-bezier(.34,1.56,.64,1) both" },
  splashIconWrap: { position: "relative", marginBottom: 28 },
  splashGlow: {
    position: "absolute", inset: -20, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(192,132,252,0.3) 0%, transparent 70%)",
    animation: "glowPulse 2s ease infinite",
  },
  splashTitle: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600,
    color: "#e9d5ff", letterSpacing: 2, marginBottom: 8, textAlign: "center",
  },
  splashSub: { fontSize: 13, color: "rgba(233,213,255,0.45)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 48 },
  splashDots: { display: "flex", gap: 8 },
  dot: { width: 7, height: 7, borderRadius: "50%", background: "#c084fc", display: "inline-block", animation: "pulse 1.2s ease infinite" },
  splashDev: { position: "absolute", bottom: 24, fontSize: 11, color: "rgba(233,213,255,0.2)", letterSpacing: 1 },

  // Root
  root: { minHeight: "100vh", background: "#0f0720", fontFamily: "'Nunito', sans-serif", color: "#f0e6ff", position: "relative", overflowX: "hidden", maxWidth: 480, margin: "0 auto" },
  bgGrad: { position: "fixed", inset: 0, background: "linear-gradient(160deg, #0f0720 0%, #1e0b3a 60%, #0f0720 100%)", zIndex: 0 },
  bgOrbs: { position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" },
  orb: { position: "absolute", borderRadius: "50%" },
  screen: { position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" },

  // Toast
  toast: {
    position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)",
    background: "rgba(192,132,252,0.95)", color: "#1a0a2e", padding: "10px 26px",
    borderRadius: 30, fontWeight: 700, fontSize: 14, zIndex: 9999,
    animation: "toastIn 0.3s ease", boxShadow: "0 4px 24px rgba(192,132,252,0.45)", whiteSpace: "nowrap",
  },

  // AppBar
  appBar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 20px 14px",
    background: "rgba(15,7,32,0.9)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(192,132,252,0.12)",
    position: "sticky", top: 0, zIndex: 50,
  },
  appBarLeft: { display: "flex", alignItems: "center", gap: 12 },
  appName: { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#e9d5ff", letterSpacing: 0.5 },
  appSub: { fontSize: 11, color: "rgba(233,213,255,0.35)", marginTop: 1 },
  // Search  searchWrap: {
    margin: "14px 16px 0", display: "flex", alignItems: "center",
    background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(192,132,252,0.15)",
    borderRadius: 14, padding: "0 14px",
  },
  searchIcon: { fontSize: 14, marginRight: 8, opacity: 0.5 },
  searchInput: {
    flex: 1, background: "none", border: "none", padding: "11px 0",
    color: "#f0e6ff", fontSize: 14, outline: "none",
  },
  clearBtn: { background: "none", border: "none", color: "rgba(240,230,255,0.4)", cursor: "pointer", fontSize: 14, padding: "4px" },

  // Tabs
  tabs: { display: "flex", margin: "14px 16px 0", gap: 8 },
  tab: {
    flex: 1, padding: "9px 0", borderRadius: 12, border: "1.5px solid rgba(192,132,252,0.15)",
    background: "transparent", color: "rgba(240,230,255,0.45)", fontSize: 13, fontWeight: 600, cursor: "pointer",
    transition: "all 0.2s",
  },
  tabActive: { background: "rgba(192,132,252,0.15)", borderColor: "rgba(192,132,252,0.45)", color: "#e9d5ff" },

  // Tags
  tagScroll: {
    display: "flex", overflowX: "auto", gap: 8, padding: "12px 16px",
    scrollbarWidth: "none", msOverflowStyle: "none",
  },
  chip: {
    flexShrink: 0, padding: "5px 14px", borderRadius: 20,
    border: "1.5px solid rgba(192,132,252,0.25)", background: "transparent",
    color: "rgba(240,230,255,0.5)", fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
  chipActive: { background: "rgba(192,132,252,0.2)", borderColor: "#c084fc", color: "#c084fc" },

  // Card list
  cardList: { flex: 1, overflowY: "auto", padding: "8px 16px 0" },
  card: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(192,132,252,0.15)",
    borderRadius: 18, padding: "18px 18px 14px", marginBottom: 12, cursor: "pointer",
    position: "relative", animation: "fadeUp 0.4s ease both",
    transition: "border-color 0.2s, background 0.2s",
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardDate: { fontSize: 10, color: "rgba(240,230,255,0.3)", letterSpacing: 1 },
  favBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 0 },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#e9d5ff", marginBottom: 8 },
  cardPreview: { fontSize: 13, color: "rgba(240,230,255,0.5)", lineHeight: 1.65, whiteSpace: "pre-line", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" },
  cardTagRow: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 },
  cardTagPill: { fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 10 },
  cardArrow: { position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", fontSize: 22, color: "rgba(192,132,252,0.3)" },

  // Empty
  empty: { textAlign: "center", padding: "80px 20px", animation: "fadeUp 0.5s ease" },

  // NavBar
  navBar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 16px",
    background: "rgba(15,7,32,0.9)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(192,132,252,0.12)",
    position: "sticky", top: 0, zIndex: 50,
  },
  navBack: { background: "none", border: "none", color: "#c084fc", fontSize: 30, cursor: "pointer", lineHeight: 1, padding: "0 4px", width: 36 },
  navTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "#e9d5ff" },
  navFav: { background: "none", border: "none", cursor: "pointer", fontSize: 18, width: 36, textAlign: "right" },

  // Read
  readBody: { flex: 1, overflowY: "auto", padding: "28px 24px 100px", animation: "fadeUp 0.35s ease" },
  readMeta: { fontSize: 11, color: "rgba(240,230,255,0.3)", letterSpacing: 1, marginBottom: 10 },
  readTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 600, color: "#e9d5ff", lineHeight: 1.25 },
  readDivider: { height: 1, background: "linear-gradient(90deg, rgba(192,132,252,0.5), transparent)", margin: "20px 0" },
  readContent: { fontFamily: "'Cormorant Garamond', serif", fontSize: 18, lineHeight: 2.1, color: "rgba(240,230,255,0.82)", whiteSpace: "pre-wrap", fontStyle: "italic", fontWeight: 300 },

};
