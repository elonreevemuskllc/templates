import React, { useEffect, useRef, useState } from 'react';

interface ChatMessage {
  id: number;
  username: string;
  text: string;
  timestamp: number;
  color: string;
}

const CHAT_MESSAGES: ChatMessage[] = [
  { id: 1,  username: 'mathieu_97',     text: 'c\'est quoi le jeu là 👀',                          timestamp: 3,   color: '#60a5fa' },
  { id: 2,  username: 'ines.lft',       text: 'LIVE 🔥🔥',                                          timestamp: 5,   color: '#f472b6' },
  { id: 3,  username: 'kev_gaming',     text: 'J\'ai essayé hier, j\'ai gagné 80€',                 timestamp: 9,   color: '#34d399' },
  { id: 4,  username: 'user_2847',      text: 'c\'est gratuit ?',                                   timestamp: 13,  color: '#a78bfa' },
  { id: 5,  username: 'tim_off',        text: '🎁 10€ offerts sans dépôt via le lien en bio !',     timestamp: 15,  color: '#f59e0b' },
  { id: 6,  username: 'rayan.off_',     text: 'j\'ai reçu les 10€ direct',                          timestamp: 19,  color: '#60a5fa' },
  { id: 7,  username: 'laurine_xx',     text: 'le lien c\'est où ?',                                timestamp: 22,  color: '#f472b6' },
  { id: 8,  username: 'tim_off',        text: '👆 lien dans la bio, clique sur Linktree',           timestamp: 24,  color: '#f59e0b' },
  { id: 9,  username: 'seb_31',         text: 'c\'est arnaque ce truc non?',                        timestamp: 28,  color: '#94a3b8' },
  { id: 10, username: 'amandine.rv',    text: 'non j\'utilise depuis 2 semaines, c\'est légit',     timestamp: 30,  color: '#34d399' },
  { id: 11, username: 'kev_gaming',     text: 'J\'ai fait x4 sur Tower Rush 💰',                    timestamp: 35,  color: '#34d399' },
  { id: 12, username: 'user_5521',      text: 'on peut retirer directement ?',                      timestamp: 40,  color: '#a78bfa' },
  { id: 13, username: 'tim_off',        text: 'Oui virement Revolut/bank sous 24h ✅',              timestamp: 42,  color: '#f59e0b' },
  { id: 14, username: 'djibril_tkt',    text: '🔥🔥🔥',                                             timestamp: 47,  color: '#60a5fa' },
  { id: 15, username: 'noemie_paris',   text: 'j\'ai eu mes 10€ en 5 min !!',                       timestamp: 52,  color: '#f472b6' },
  { id: 16, username: 'user_9034',      text: 'link bio testé c\'est ouf',                          timestamp: 58,  color: '#a78bfa' },
  { id: 17, username: 'marco.btz',      text: 'ca marche aussi sur iPhone ?',                       timestamp: 63,  color: '#60a5fa' },
  { id: 18, username: 'tim_off',        text: 'iPhone Android tout fonctionne 📱',                  timestamp: 65,  color: '#f59e0b' },
  { id: 19, username: 'sofia_mk',       text: 'je tente 👇',                                        timestamp: 70,  color: '#f472b6' },
  { id: 20, username: 'axel.lbd',       text: 'j\'ai mis 20€ j\'en suis à 60€ 😭😭',               timestamp: 76,  color: '#34d399' },
  { id: 21, username: 'user_1147',      text: 'lien en bio !!!',                                    timestamp: 82,  color: '#a78bfa' },
  { id: 22, username: 'camille_off',    text: '🔥 j\'y vais',                                       timestamp: 87,  color: '#f472b6' },
  { id: 23, username: 'yacine_93',      text: 'c\'est le même que la semaine dernière ?',            timestamp: 93,  color: '#60a5fa' },
  { id: 24, username: 'tim_off',        text: 'Oui toujours dispo, offre limitée ⏳',               timestamp: 95,  color: '#f59e0b' },
  { id: 25, username: 'lucie.frr',      text: 'je viens de recevoir mon virement 💸',               timestamp: 102, color: '#34d399' },
  { id: 26, username: 'user_3382',      text: 'wooooah',                                            timestamp: 107, color: '#a78bfa' },
  { id: 27, username: 'mehdi_bsk',      text: 'ça bug pas chez vous ?',                             timestamp: 113, color: '#60a5fa' },
  { id: 28, username: 'amandine.rv',    text: 'non nickel de mon côté',                             timestamp: 115, color: '#34d399' },
  { id: 29, username: 'tim_off',        text: '🎯 Rappel : 10€ gratuits → lien en bio',             timestamp: 120, color: '#f59e0b' },
  { id: 30, username: 'user_6671',      text: '👏👏👏',                                             timestamp: 125, color: '#a78bfa' },
];

const FLOATING_EMOJIS = ['❤️', '🔥', '💰', '🎮', '💸', '👑', '😍', '🚀'];

interface FloatingEmoji { id: number; emoji: string; }
interface FakeLiveProps { currentLink: string; }

const PHOTO = 'https://i.ibb.co/Dg5Jg6pf/a9c6d5c087f7810e5e32b63ce9a99752-tplv-tiktokx-cropcenter-1080-1080.jpg';

const STORAGE_KEY = 'fl_video_pos';

const FakeLive: React.FC<FakeLiveProps> = ({ currentLink }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [viewers, setViewers] = useState(1247);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [emojiCounter, setEmojiCounter] = useState(0);
  const [elapsed, setElapsed] = useState(() => {
    try { return Math.floor(parseFloat(localStorage.getItem(STORAGE_KEY) || '0')); } catch { return 0; }
  });
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  // Lazy load: only start loading when visible, then autoplay muted + restore position
  useEffect(() => {
    const container = containerRef.current;
    const v = videoRef.current;
    if (!container || !v) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.src = '/vid/live-tower-compressed.mp4?v=2';
          v.muted = true;
          v.load();

          const saved = parseFloat(localStorage.getItem(STORAGE_KEY) || '0');
          if (saved > 0) {
            const seekAndPlay = () => {
              v.currentTime = saved;
              v.play().catch(() => {});
            };
            if (v.readyState >= 1) seekAndPlay();
            else v.addEventListener('loadedmetadata', seekAndPlay, { once: true });
          } else {
            v.play().catch(() => {});
          }

          v.addEventListener('playing', () => setVideoReady(true), { once: true });
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Persist video position to localStorage every 2s
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const i = setInterval(() => {
      if (!v.paused && v.currentTime > 0) {
        try { localStorage.setItem(STORAGE_KEY, String(v.currentTime)); } catch {}
      }
    }, 2000);
    return () => clearInterval(i);
  }, []);

  // Chat timer
  useEffect(() => {
    const i = setInterval(() => {
      setElapsed(e => {
        const next = e + 1;
        setVisibleMessages(CHAT_MESSAGES.filter(m => m.timestamp <= (next % 130)).slice(-10));
        return next;
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [visibleMessages]);

  // Viewers fluctuation
  useEffect(() => {
    const i = setInterval(() => setViewers(p => Math.max(800, p + Math.floor(Math.random() * 7) - 2)), 3500);
    return () => clearInterval(i);
  }, []);

  // Floating emojis
  useEffect(() => {
    const i = setInterval(() => {
      if (Math.random() > 0.4) {
        const e: FloatingEmoji = { id: emojiCounter, emoji: FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)] };
        setEmojiCounter(c => c + 1);
        setFloatingEmojis(p => [...p.slice(-6), e]);
        setTimeout(() => setFloatingEmojis(p => p.filter(x => x.id !== e.id)), 2500);
      }
    }, 1200);
    return () => clearInterval(i);
  }, [emojiCounter]);

  return (
    <div ref={containerRef} style={{ width: 280, flexShrink: 0, fontFamily: '-apple-system, system-ui, sans-serif' }}>
      <div style={{ width: 280, height: 430, borderRadius: 12, overflow: 'hidden', position: 'relative', background: '#111' }}>

        {/* Poster affiché tant que la vidéo n'est pas prête */}
        {!videoReady && (
          <img
            src="/vid/live-poster.jpg"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {/* Vidéo — src est injecté dynamiquement par l'IntersectionObserver */}
        <video
          ref={videoRef}
          playsInline
          loop
          preload="none"
          poster="/vid/live-poster.jpg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', opacity: videoReady ? 1 : 0, transition: 'opacity 0.3s' }}
        />

        {/* Tap pour toggle mute */}
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer' }}
          onClick={toggleMute}
        />

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 11,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 45%, rgba(0,0,0,0.75) 100%)',
        }} />

        {/* TOP BAR */}
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ position: 'relative' }}>
              <img src={PHOTO} alt="avatar" style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid #fff', objectFit: 'cover' }} />
              <LiveDot />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 12, textShadow: '0 1px 3px rgba(0,0,0,0.8)', lineHeight: 1.2 }}>tim_off</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <LiveBadge />
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>{viewers.toLocaleString('fr-FR')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton mute/unmute */}
        <div
          onClick={toggleMute}
          style={{
            position: 'absolute', top: 48, right: 10, zIndex: 15,
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 14,
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </div>

        {/* Emojis flottants */}
        <div style={{ position: 'absolute', right: 10, bottom: 110, top: 60, overflow: 'hidden', pointerEvents: 'none', width: 36, zIndex: 12 }}>
          {floatingEmojis.map(e => (
            <div key={e.id} style={{ position: 'absolute', right: 0, bottom: 0, fontSize: 20, animation: 'floatUp 2.5s ease-out forwards' }}>
              {e.emoji}
            </div>
          ))}
        </div>

        {/* Chat */}
        <div style={{ position: 'absolute', left: 0, right: 44, bottom: 44, maxHeight: 140, overflow: 'hidden', padding: '0 10px', zIndex: 12 }}>
          <div ref={chatRef} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {visibleMessages.map(msg => (
              <div key={msg.id} style={{
                display: 'inline-flex', alignItems: 'baseline', gap: 4,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                borderRadius: 20, padding: '2px 8px', maxWidth: '95%',
                animation: 'fadeInUp 0.25s ease',
              }}>
                <span style={{ color: msg.color, fontWeight: 700, fontSize: 10, whiteSpace: 'nowrap' }}>{msg.username}</span>
                <span style={{ color: 'rgba(255,255,255,0.93)', fontSize: 10 }}>{msg.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Barre de saisie */}
        <div style={{ position: 'absolute', left: 10, right: 10, bottom: 10, display: 'flex', alignItems: 'center', gap: 8, zIndex: 15 }}>
          <div
            onClick={() => alert("Vous n'êtes pas connecté")}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
              borderRadius: 20, padding: '6px 12px', color: 'rgba(255,255,255,0.6)', fontSize: 11,
              cursor: 'pointer',
            }}
          >
            Ajouter un commentaire...
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-130px) scale(0.4); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const LiveBadge: React.FC = () => {
  const [on, setOn] = useState(true);
  useEffect(() => { const i = setInterval(() => setOn(v => !v), 900); return () => clearInterval(i); }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: '#FE2C55', borderRadius: 3, padding: '1px 5px' }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', opacity: on ? 1 : 0.25, transition: 'opacity 0.2s' }} />
      <span style={{ color: '#fff', fontWeight: 800, fontSize: 9, letterSpacing: 1 }}>LIVE</span>
    </div>
  );
};

const LiveDot: React.FC = () => (
  <div style={{
    position: 'absolute', bottom: 0, right: 0,
    width: 10, height: 10, borderRadius: '50%',
    background: '#FE2C55', border: '1.5px solid #fff',
  }} />
);

export default FakeLive;
