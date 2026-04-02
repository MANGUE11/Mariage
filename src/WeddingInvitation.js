import { useState, useEffect, useRef } from "react";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Great+Vibes&family=Josefin+Sans:wght@300;400;500&display=swap";

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B2252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B2252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconLocation = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B2252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconHand = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5E6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-4 0v5"/>
    <path d="M14 10V4a2 2 0 0 0-4 0v6"/>
    <path d="M10 10.5V6a2 2 0 0 0-4 0v8"/>
    <path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  </svg>
);

const IconLoveLetter = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#8B2252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 7l10 7 10-7" stroke="#8B2252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 18c0 0-4-3.5-4-5.5a4 4 0 0 1 8 0c0 2 -4 5.5-4 5.5z" fill="#C9656E"/>
  </svg>
);

export default function WeddingInvitation() {
  const [phase, setPhase] = useState("closed");
  const [formData, setFormData] = useState({ name: "", guests: "1", attending: "yes", message: "" });
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = GOOGLE_FONTS_URL;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setMounted(true), 100);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 500);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleEnvelopeClick = () => {
    if (phase === "closed") {
      setPhase("opening");
      setTimeout(() => setPhase("open"), 1600);
    } else if (phase === "open") {
      setPhase("closing");
      setTimeout(() => setPhase("closed"), 1500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfetti(true);
    setPhase("submitted");
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const envelopeW = isMobile ? 290 : 340;
  const envelopeH = isMobile ? 194 : 227;
  const letterRise = isMobile ? "-218px" : "-315px";

  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 8,
    size: 8 + Math.random() * 14,
    rotation: Math.random() * 360,
    sway: 30 + Math.random() * 80,
  }));

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2 + Math.random() * 3,
    color: ["#8B2252", "#C9656E", "#C4956A", "#FFF8F0", "#D4A574"][Math.floor(Math.random() * 5)],
    size: 4 + Math.random() * 8,
    rotation: Math.random() * 720,
  }));

  return (
    <div style={styles.root}>
      <style>{keyframes}</style>

      {/* Floating petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            ...styles.petal,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--sway": `${p.sway}px`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}

      {/* Confetti */}
      {showConfetti &&
        confettiPieces.map((c) => (
          <div
            key={c.id}
            style={{
              ...styles.confetti,
              left: `${c.left}%`,
              width: c.size,
              height: c.size * 0.6,
              backgroundColor: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              "--rot": `${c.rotation}deg`,
            }}
          />
        ))}

      {/* Hero Section */}
      <div style={{
        ...styles.hero,
        paddingTop: isMobile ? 50 : 70,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(30px)",
        transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        <div style={styles.ornamentTop}>✦</div>
        <p style={styles.saveDate}>SAVE OUR DATE</p>
        <h1 style={styles.names}>Sophia & Amine</h1>
        <div style={styles.dividerWrap}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerHeart}>♥</span>
          <span style={styles.dividerLine} />
        </div>
        <p style={styles.subtitle}>Nous avons l'honneur de vous inviter à célébrer notre union</p>
      </div>

      {/* Envelope */}
      <div style={styles.envelopeSection}>
        <div
          onClick={handleEnvelopeClick}
          style={{
            ...styles.envelopeContainer,
            width: envelopeW,
            cursor: (phase === "closed" || phase === "open") ? "pointer" : "default",
          }}
        >
          {/* Letter that rises out of the envelope */}
          <div style={{
            ...styles.letter,
            left: isMobile ? 10 : 15,
            right: isMobile ? 10 : 15,
            transform: (phase === "open" || phase === "submitted") ? `translateY(${letterRise})` : "translateY(0)",
            opacity: (phase === "open" || phase === "submitted") ? 1 : 0,
            pointerEvents: (phase === "open" || phase === "submitted") ? "none" : "none",
            transition: "transform 2s cubic-bezier(0.22, 1, 0.36, 1) 0.7s, opacity 1s ease 0.5s",
          }}>
            <div style={{
              ...styles.letterInner,
              padding: isMobile ? "20px 14px" : "28px 22px",
            }}>
              <div style={styles.letterOrnament}>❧</div>
              <p style={styles.letterLabel}>NOUS NOUS MARIONS</p>
              <h2 style={{ ...styles.letterNames, fontSize: isMobile ? 28 : 34 }}>Sophia & Amine</h2>
              <div style={styles.letterDivider} />
              <div style={styles.detailRow}>
                <span style={styles.detailIcon}><IconCalendar /></span>
                <div>
                  <p style={styles.detailTitle}>DATE</p>
                  <p style={styles.detailValue}>Samedi 18 Octobre 2026</p>
                </div>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailIcon}><IconClock /></span>
                <div>
                  <p style={styles.detailTitle}>HEURE</p>
                  <p style={styles.detailValue}>15h00 — Cérémonie</p>
                </div>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailIcon}><IconLocation /></span>
                <div>
                  <p style={styles.detailTitle}>LIEU</p>
                  <p style={styles.detailValue}>Riad Palais Sébban, Marrakech</p>
                </div>
              </div>
              <div style={styles.letterFooterOrnament}>❦</div>
            </div>
          </div>

          {/* Envelope body */}
          <div style={{ ...styles.envelopeBody, width: envelopeW, height: envelopeH }}>
            {/* Back flap - opens upward */}
            <div style={{
              ...styles.envelopeFlap,
              transform: (phase === "opening" || phase === "open" || phase === "closing") ? "rotateX(180deg)" : "rotateX(0deg)",
            }} />

            {/* Wax seal - sits at the fold line between flap and body */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 15,
              opacity: phase === "closed" ? 1 : 0,
              transform: phase === "closed"
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -50%) scale(0.1)",
              transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              pointerEvents: "none",
            }}>
              <div style={{
                animation: phase === "closed" ? "pulse 2.5s ease-in-out infinite" : "none",
              }}>
                <div style={{
                  width: isMobile ? 62 : 72,
                  height: isMobile ? 62 : 72,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #EF5350 0%, #C62828 45%, #7B0000 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 24px rgba(139,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35), inset 0 2px 5px rgba(255,255,255,0.18), inset 0 -3px 6px rgba(0,0,0,0.25)",
                  border: "2.5px solid rgba(255,200,100,0.45)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    width: isMobile ? 52 : 60,
                    height: isMobile ? 52 : 60,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }} />
                  <span style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: isMobile ? 19 : 22,
                    color: "rgba(255,245,240,0.95)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                    position: "relative",
                    zIndex: 1,
                  }}>S&A</span>
                </div>
              </div>
            </div>

            {/* Envelope front body */}
            <div style={styles.envelopeFront} />
          </div>

          {(phase === "closed" || phase === "open") && (
            <p style={{
              ...styles.clickHint,
              display: "flex",
              alignItems: "center",
              gap: 6,
              justifyContent: "center",
              opacity: phase === "open" ? 0.7 : 1,
            }}>
              <IconHand />
              {phase === "closed" ? "Cliquez pour ouvrir" : "Cliquez pour refermer"}
            </p>
          )}
        </div>
      </div>

      {/* RSVP Form — appears below, user scrolls to reach it */}
      {(phase === "open" || phase === "submitted") && (
        <div
          ref={formRef}
          style={{
            ...styles.formSection,
            padding: isMobile ? "0 16px 40px" : "0 20px 40px",
            animation: "fadeSlideUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            animationDelay: "2s",
            opacity: 0,
          }}
        >
          {phase === "submitted" ? (
            <div style={{ animation: "scaleIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}>
              <div style={{ ...styles.thankYouCard, padding: isMobile ? "36px 20px" : "50px 36px" }}>
                <div style={{ ...styles.thankYouIcon, display: "flex", justifyContent: "center" }}>
                  <IconLoveLetter />
                </div>
                <h3 style={styles.thankYouTitle}>Merci {formData.name} !</h3>
                <p style={styles.thankYouText}>
                  {formData.attending === "yes"
                    ? "Nous sommes ravis de vous compter parmi nous pour ce jour si spécial. Votre présence rendra cette journée encore plus magique."
                    : "Nous comprenons et nous penserons à vous en ce jour si spécial. Vous serez dans nos cœurs."}
                </p>
                <div style={styles.thankYouOrnament}>— S ♥ A —</div>
              </div>
            </div>
          ) : (
            <>
              <div style={styles.formHeader}>
                <p style={styles.formLabel}>RÉPONDEZ S'IL VOUS PLAÎT</p>
                <h3 style={styles.formTitle}>Confirmez votre présence</h3>
                <div style={styles.formDivider} />
              </div>
              <div style={{ ...styles.formCard, padding: isMobile ? 20 : 30 }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Votre nom complet</label>
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="Prénom et nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div style={{ ...styles.formRow, flexDirection: isMobile ? "column" : "row" }}>
                  <div style={{ ...styles.formGroup, flex: 1 }}>
                    <label style={styles.label}>Nombre d'invités</label>
                    <select
                      style={styles.input}
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    >
                      <option value="1">1 personne</option>
                      <option value="2">2 personnes</option>
                      <option value="3">3 personnes</option>
                      <option value="4">4 personnes</option>
                      <option value="5">5+ personnes</option>
                    </select>
                  </div>
                  <div style={{ ...styles.formGroup, flex: 1 }}>
                    <label style={styles.label}>Présence</label>
                    <select
                      style={styles.input}
                      value={formData.attending}
                      onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    >
                      <option value="yes">J'accepte avec joie</option>
                      <option value="no">Je décline avec regret</option>
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Un petit mot pour les mariés</label>
                  <textarea
                    style={{ ...styles.input, minHeight: 100, resize: "vertical" }}
                    placeholder="Vos vœux, un message d'amour..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  style={styles.submitBtn}
                  disabled={!formData.name.trim()}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 30px rgba(139, 34, 82, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 20px rgba(139, 34, 82, 0.25)";
                  }}
                >
                  Envoyer ma réponse
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>Sophia ♥ Amine — 18.10.2026</p>
      </div>
    </div>
  );
}

const keyframes = `
  @keyframes floatPetal {
    0% { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.6; }
    50% { transform: translateY(50vh) translateX(var(--sway)) rotate(180deg); opacity: 0.4; }
    100% { transform: translateY(105vh) translateX(calc(var(--sway) * -0.5)) rotate(360deg); opacity: 0; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes confettiFall {
    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(var(--rot)); opacity: 0; }
  }
  @keyframes gentleFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  * { box-sizing: border-box; }

  @media (max-width: 500px) {
    input, select, textarea { font-size: 16px !important; }
  }
`;

const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(170deg, #FFF5F5 0%, #FFF0EB 30%, #FFEAEA 60%, #FFF5F0 100%)",
    fontFamily: "'Josefin Sans', 'Cormorant Garant', Georgia, serif",
    color: "#4A1A2E",
    overflowX: "hidden",
    position: "relative",
    paddingBottom: 60,
  },
  petal: {
    position: "fixed",
    borderRadius: "50% 0 50% 50%",
    background: "linear-gradient(135deg, rgba(201,101,110,0.35), rgba(196,149,106,0.2))",
    animation: "floatPetal var(--dur, 8s) ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 0,
  },
  confetti: {
    position: "fixed",
    top: -10,
    borderRadius: 2,
    animation: "confettiFall ease-out forwards",
    pointerEvents: "none",
    zIndex: 1000,
  },
  hero: {
    textAlign: "center",
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
    zIndex: 1,
  },
  ornamentTop: {
    fontSize: 18,
    color: "#C4956A",
    marginBottom: 16,
    letterSpacing: 12,
  },
  saveDate: {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: "clamp(11px, 3vw, 14px)",
    fontWeight: 300,
    letterSpacing: 8,
    color: "#8B2252",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  names: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: "clamp(44px, 10vw, 82px)",
    fontWeight: 400,
    color: "#6B1A3A",
    margin: "0 0 6px 0",
    lineHeight: 1.2,
    textShadow: "1px 2px 4px rgba(107,26,58,0.08)",
  },
  dividerWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    margin: "14px 0 18px",
  },
  dividerLine: {
    display: "inline-block",
    width: 60,
    height: 1,
    background: "linear-gradient(90deg, transparent, #C4956A, transparent)",
  },
  dividerHeart: {
    color: "#C9656E",
    fontSize: 14,
  },
  subtitle: {
    fontFamily: "'Cormorant Garant', serif",
    fontSize: "clamp(15px, 4vw, 17px)",
    fontWeight: 300,
    fontStyle: "italic",
    color: "#8B5E6B",
    maxWidth: 400,
    margin: "0 auto",
    lineHeight: 1.6,
  },

  // Envelope section
  envelopeSection: {
    display: "flex",
    justifyContent: "center",
    padding: "30px 20px 50px",
    position: "relative",
    zIndex: 2,
  },
  envelopeContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  envelopeBody: {
    position: "relative",
    perspective: "800px",
  },
  envelopeFlap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "50%",
    background: "linear-gradient(180deg, #D4A574 0%, #C9967A 100%)",
    borderRadius: "2px 2px 0 0",
    transformOrigin: "top center",
    transition: "transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
    zIndex: 10,
    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  envelopeFront: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(160deg, #F2E0D0 0%, #E8D0BC 50%, #DEC4AE 100%)",
    borderRadius: 4,
    boxShadow: "0 15px 50px rgba(139, 34, 82, 0.15), 0 5px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  // Letter
  letter: {
    position: "absolute",
    top: 20,
    zIndex: 5,
  },
  letterInner: {
    background: "linear-gradient(175deg, #FFFBF7 0%, #FFF8F2 50%, #FFF5ED 100%)",
    borderRadius: 6,
    boxShadow: "0 10px 40px rgba(139, 34, 82, 0.12), 0 2px 10px rgba(0,0,0,0.06)",
    border: "1px solid rgba(196, 149, 106, 0.25)",
    textAlign: "center",
  },
  letterOrnament: {
    fontSize: 22,
    color: "#C4956A",
    marginBottom: 8,
  },
  letterLabel: {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: 11,
    letterSpacing: 5,
    color: "#8B2252",
    fontWeight: 300,
    marginBottom: 4,
  },
  letterNames: {
    fontFamily: "'Great Vibes', cursive",
    fontWeight: 400,
    color: "#6B1A3A",
    margin: "0 0 12px",
  },
  letterDivider: {
    width: 50,
    height: 1,
    background: "linear-gradient(90deg, transparent, #C4956A, transparent)",
    margin: "0 auto 16px",
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textAlign: "left",
    marginBottom: 12,
    padding: "0 8px",
  },
  detailIcon: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  detailTitle: {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: 10,
    letterSpacing: 3,
    color: "#8B2252",
    fontWeight: 500,
    marginBottom: 2,
  },
  detailValue: {
    fontFamily: "'Cormorant Garant', serif",
    fontSize: 15,
    color: "#4A1A2E",
    fontWeight: 500,
    lineHeight: 1.3,
  },
  letterFooterOrnament: {
    fontSize: 18,
    color: "#C4956A",
    marginTop: 10,
  },

  clickHint: {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: 12,
    color: "#8B5E6B",
    letterSpacing: 2,
    marginTop: 18,
    animation: "gentleFloat 2s ease-in-out infinite",
    fontWeight: 300,
  },

  // Form
  formSection: {
    maxWidth: 520,
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },
  formHeader: {
    textAlign: "center",
    marginBottom: 24,
  },
  formLabel: {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: 11,
    letterSpacing: 6,
    color: "#8B2252",
    fontWeight: 300,
    marginBottom: 6,
  },
  formTitle: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: "clamp(30px, 8vw, 36px)",
    color: "#6B1A3A",
    margin: 0,
    fontWeight: 400,
  },
  formDivider: {
    width: 50,
    height: 1,
    background: "linear-gradient(90deg, transparent, #C4956A, transparent)",
    margin: "12px auto 0",
  },
  formCard: {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: 12,
    boxShadow: "0 10px 40px rgba(139, 34, 82, 0.08)",
    border: "1px solid rgba(196, 149, 106, 0.2)",
  },
  formGroup: {
    marginBottom: 18,
  },
  formRow: {
    display: "flex",
    gap: 16,
  },
  label: {
    display: "block",
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: 11,
    letterSpacing: 2,
    color: "#8B2252",
    fontWeight: 400,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontFamily: "'Cormorant Garant', serif",
    fontSize: 16,
    color: "#4A1A2E",
    background: "rgba(255,248,240,0.8)",
    border: "1px solid rgba(196, 149, 106, 0.3)",
    borderRadius: 8,
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    padding: "14px 32px",
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 4,
    textTransform: "uppercase",
    color: "#FFF5F0",
    background: "linear-gradient(135deg, #8B2252 0%, #A02860 50%, #8B2252 100%)",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
    boxShadow: "0 4px 20px rgba(139, 34, 82, 0.25)",
    marginTop: 8,
  },

  // Thank you
  thankYouCard: {
    textAlign: "center",
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(10px)",
    borderRadius: 16,
    boxShadow: "0 15px 50px rgba(139, 34, 82, 0.1)",
    border: "1px solid rgba(196, 149, 106, 0.2)",
  },
  thankYouIcon: {
    marginBottom: 16,
  },
  thankYouTitle: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: "clamp(32px, 8vw, 40px)",
    color: "#6B1A3A",
    margin: "0 0 14px",
    fontWeight: 400,
  },
  thankYouText: {
    fontFamily: "'Cormorant Garant', serif",
    fontSize: "clamp(16px, 4vw, 18px)",
    color: "#8B5E6B",
    lineHeight: 1.7,
    maxWidth: 380,
    margin: "0 auto 22px",
    fontWeight: 400,
  },
  thankYouOrnament: {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: 14,
    letterSpacing: 4,
    color: "#C4956A",
    fontWeight: 300,
  },

  // Footer
  footer: {
    textAlign: "center",
    padding: "30px 20px",
    position: "relative",
    zIndex: 1,
  },
  footerText: {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: 12,
    letterSpacing: 4,
    color: "#C4956A",
    fontWeight: 300,
  },
};
