import React, { useState } from 'react';
import haptics from '../utils/haptics';
import { fireSpártaPixelForUrl, fireAprilPixelForUrl } from '../utils/linkManager';
import useScrollHaptics from '../hooks/useScrollHaptics';
import { affiliateTelegramUrl } from '../utils/affiliateTelegramUrl';
import type { Theme } from '../config/themes';

interface GeneralLayoutProps {
  currentLink: string;
  name: string;
  photo?: string;
  telegramContact?: string;
  theme: Theme;
  landingSlug: string;
  disableFakeGames?: boolean;
}

/** HTML « fake game » (/public/*.html) ; si absent, clic = lien casino direct. */
type GeneralGameDef = {
  id: number;
  name: string;
  image: string;
  color: string;
  fakeGamePath?: string | null;
};

function buildGameCardHref(game: GeneralGameDef, slug: string, casinoLink: string, disableFakeGames?: boolean): string {
  if (disableFakeGames || !game.fakeGamePath) return casinoLink;
  const land = encodeURIComponent((slug || '').trim() || 'unknown');
  const to = encodeURIComponent(casinoLink || '');
  return `${game.fakeGamePath}?landing=${land}&to=${to}`;
}

/** Ordre des faux jeux en tête pour general-dark (aligné sur fakeGamePath). */
const GENERAL_DARK_FAKE_GAME_ORDER: string[] = [
  '/megablock-game.html',
  '/tower-rush-game.html',
  '/chicken-road-game.html',
  '/piano-game.html',
];

function sortGamesFakeFirstForGeneralDark(games: GeneralGameDef[]): GeneralGameDef[] {
  return [...games].sort((a, b) => {
    const aFake = !!a.fakeGamePath;
    const bFake = !!b.fakeGamePath;
    if (aFake !== bFake) return aFake ? -1 : 1;
    if (!aFake && !bFake) return a.id - b.id;
    const ia = GENERAL_DARK_FAKE_GAME_ORDER.indexOf(a.fakeGamePath || '');
    const ib = GENERAL_DARK_FAKE_GAME_ORDER.indexOf(b.fakeGamePath || '');
    const ra = ia === -1 ? 999 : ia;
    const rb = ib === -1 ? 999 : ib;
    if (ra !== rb) return ra - rb;
    return a.id - b.id;
  });
}

// ── Game data ───────────────────────────────────────────────────────────────

const GAMES: GeneralGameDef[] = [
  {
    id: 1,
    name: 'MEGA BLOCK',
    image: 'https://i.ibb.co/Y47c6h2v/io-megablock.webp',
    color: '#E63946',
    fakeGamePath: '/megablock-game.html',
  },
  {
    id: 2,
    name: 'TOWER RUSH',
    image: 'https://i.ibb.co/6J1HxDtK/39386-1.webp',
    color: '#3b82f6',
    fakeGamePath: '/tower-rush-game.html',
  },
  {
    id: 3,
    name: 'CHICKEN ROAD 2',
    image: 'https://i.ibb.co/yFDnZR3N/a97e3a25-7e23-4673-8313-18221451f6a2.png',
    color: '#90EE90',
    fakeGamePath: '/chicken-road-game.html',
  },
  {
    id: 4,
    name: 'PLAY ME',
    image: 'https://i.ibb.co/F4spQzcH/50942.webp',
    color: '#7c3aed',
    fakeGamePath: '/piano-game.html',
  },
  {
    id: 5,
    name: 'PENALTY SHOOTOUT',
    image: 'https://i.ibb.co/d4DQTMfS/c8ffab43-2048-4684-8355-aa938b710394.png',
    color: '#FFD700',
    fakeGamePath: null,
  },
  {
    id: 6,
    name: 'NINJA CRASH',
    image: 'https://i.ibb.co/23WRwN7Y/photo-2026-04-02-18-22-18.jpg',
    color: '#1a0a0a',
    fakeGamePath: null,
  },
];

// ── Game Card ───────────────────────────────────────────────────────────────

interface GameCardProps {
  game: typeof GAMES[number];
  href: string;
  pixelUrl: string;
  sober?: boolean;
}

const GeneralGameCard: React.FC<GameCardProps> = ({ game, href, pixelUrl, sober }) => {
  if (sober) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          haptics.heavy();
          fireSpártaPixelForUrl(pixelUrl);
          fireAprilPixelForUrl(pixelUrl);
        }}
        className="group block rounded-2xl overflow-hidden border border-white/10 bg-slate-900/25 transition-colors duration-200 hover:border-white/20 hover:bg-slate-900/40 active:scale-[0.98]"
        style={{ aspectRatio: '1' }}
      >
        <div className="relative h-full w-full min-h-[120px]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.88] transition-opacity duration-200 group-hover:opacity-100"
            style={{ backgroundImage: `url(${game.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-2 py-2.5 md:py-3">
            <p className="text-center text-[10px] sm:text-xs font-medium text-white/95 tracking-wide uppercase leading-snug">
              {game.name}
            </p>
          </div>
        </div>
      </a>
    );
  }

  return (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(pixelUrl); fireAprilPixelForUrl(pixelUrl); }}
    className="group relative rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 active:scale-95 block"
    style={{
      aspectRatio: '1',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2), inset 0 -2px 8px rgba(0,0,0,0.15)',
    }}
  >
    {/* Color background */}
    <div
      className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
      style={{
        background: `linear-gradient(135deg, ${game.color} 0%, ${game.color}dd 100%)`,
      }}
    />

    {/* Game image */}
    <div
      className="absolute inset-0 bg-cover bg-center transition-all duration-500 opacity-80 group-hover:opacity-95 group-hover:scale-110"
      style={{
        backgroundImage: `url(${game.image})`,
        filter: 'brightness(1.1) contrast(1.05)',
      }}
    />

    {/* Bottom gradient overlay */}
    <div
      className="absolute inset-0 transition-opacity duration-500"
      style={{
        background:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.75) 100%)',
      }}
    />

    {/* Inner border glow */}
    <div
      className="absolute inset-0 rounded-3xl transition-all duration-500"
      style={{
        boxShadow: 'inset 0 0 40px rgba(255,255,255,0.1)',
        border: '2px solid rgba(255,255,255,0.2)',
      }}
    />

    {/* Hover shimmer */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Game name label */}
    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center transform transition-all duration-500 translate-y-1 group-hover:translate-y-0">
      <div className="backdrop-blur-sm bg-black/20 rounded-xl p-1.5 md:p-2 border border-white/20">
        <h3
          className="text-xs md:text-sm lg:text-base font-black tracking-wider leading-tight uppercase transform transition-all duration-500 group-hover:scale-105"
          style={{
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)',
            WebkitTextStroke: '0.5px rgba(0,0,0,0.4)',
            letterSpacing: '0.03em',
          }}
        >
          {game.name}
        </h3>
      </div>
    </div>

    {/* Play icon on hover */}
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12">
      <div className="bg-white/90 backdrop-blur-sm rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center shadow-lg">
        <svg className="w-3 h-3 md:w-4 md:h-4 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      </div>
    </div>
  </a>
  );
};

// ── Creator Profile ─────────────────────────────────────────────────────────

const GeneralProfile: React.FC<{ name: string; photo?: string; avatarRingClass: string; sober?: boolean }> = ({
  name,
  photo,
  avatarRingClass,
  sober,
}) => (
  <div className="flex flex-col items-center mb-4 md:mb-6">
    <div
      className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 bg-white ${avatarRingClass} ${
        sober ? 'border-2 shadow-none' : 'border-4 shadow-2xl'
      }`}
    >
      {false && photo ? (
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center ${
            sober ? 'bg-slate-700' : 'bg-gradient-to-br from-blue-400 to-purple-500'
          }`}
        >
          <span className={`text-white ${sober ? 'text-3xl font-semibold' : 'text-4xl font-black'}`}>
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
    <h1
      className={
        sober
          ? 'text-xl md:text-2xl font-medium text-slate-100 mb-1 tracking-tight'
          : 'text-2xl md:text-3xl font-bold text-white mb-2'
      }
      style={sober ? undefined : { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
    >
      {name}
    </h1>
  </div>
);

// ── Game Grid ───────────────────────────────────────────────────────────────

const GeneralGameGrid: React.FC<{
  slug: string;
  casinoLink: string;
  sober?: boolean;
  /** general-dark : faux jeux (.html) en premier (Mega Block → Tower Rush → Chicken → …). */
  prioritizeFakeGames?: boolean;
  disableFakeGames?: boolean;
}> = ({ slug, casinoLink, sober, prioritizeFakeGames, disableFakeGames }) => {
  const games =
    prioritizeFakeGames && !disableFakeGames ? sortGamesFakeFirstForGeneralDark(GAMES) : GAMES;

  return (
  <div className="w-full">
    {/* Header */}
    <div className={`text-center ${sober ? 'mb-5 mt-1' : 'mb-6 mt-2'}`}>
      {sober ? (
        <h2 className="text-slate-400 text-xs sm:text-sm font-medium tracking-[0.28em] uppercase">
          👇 Jeux 👇
        </h2>
      ) : (
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-wide"
          style={{
            color: '#FFFFFF',
            textShadow: '4px 4px 0px rgba(0,0,0,0.4), 2px 2px 0px rgba(0,0,0,0.2)',
            WebkitTextStroke: '2px rgba(0,0,0,0.3)',
          }}
        >
          👇 JEUX 👇
        </h2>
      )}
    </div>

    {/* Grid */}
    <div className={`grid grid-cols-2 sm:grid-cols-2 mb-8 px-1 max-w-lg mx-auto ${sober ? 'gap-2.5 md:gap-3' : 'gap-3 md:gap-4'}`}>
      {games.map((game) => (
        <GeneralGameCard
            key={game.id}
            game={game}
            href={buildGameCardHref(game, slug, casinoLink, disableFakeGames)}
            pixelUrl={casinoLink}
            sober={sober}
          />
      ))}
    </div>
  </div>
  );
};

// ── Sticky Button ───────────────────────────────────────────────────────────

const GeneralStickyButton: React.FC<{ link: string; stickyStyle: 'orange' | 'cyan' | 'sober' }> = ({
  link,
  stickyStyle,
}) => {
  const [pressed, setPressed] = useState(false);

  if (stickyStyle === 'sober') {
    return (
      <div className="fixed bottom-6 md:bottom-8 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="max-w-lg mx-auto pointer-events-auto">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); }}
            className={`block w-full text-center py-3.5 md:py-4 px-6 text-base md:text-lg font-semibold text-slate-900 bg-slate-100 rounded-xl border border-slate-200/90 ${
              pressed ? 'shadow-sm translate-y-px' : 'shadow-md'
            } transition-transform duration-100`}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            onTouchStart={() => setPressed(true)}
            onTouchEnd={() => setPressed(false)}
          >
            Jouer maintenant
          </a>
        </div>
      </div>
    );
  }

  const palette =
    stickyStyle === 'cyan'
      ? {
          bg: 'linear-gradient(135deg, #0891b2 0%, #4f46e5 100%)',
          shadowHi: '0 5px 0 #0e7490, 0 6px 12px rgba(0,0,0,0.45)',
          shadowLo: '0 2px 0 #0e7490, 0 3px 8px rgba(0,0,0,0.4)',
          borderBottom: '3px solid #0e7490',
        }
      : {
          bg: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)',
          shadowHi: '0 5px 0 #CC6600, 0 6px 12px rgba(0,0,0,0.4)',
          shadowLo: '0 2px 0 #CC6600, 0 3px 8px rgba(0,0,0,0.4)',
          borderBottom: '3px solid #CC6600',
        };

  return (
    <div className="fixed bottom-6 md:bottom-8 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); }}
          className="block w-full text-white font-black py-4 md:py-5 px-6 text-center text-lg md:text-xl"
          style={{
            background: palette.bg,
            borderRadius: '14px',
            boxShadow: pressed ? palette.shadowLo : palette.shadowHi,
            borderBottom: palette.borderBottom,
            textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
            transform: pressed ? 'translateY(3px)' : 'translateY(0)',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
        >
          🎮 JOUER MAINTENANT
        </a>
      </div>
    </div>
  );
};

// ── Footer ──────────────────────────────────────────────────────────────────

const GeneralAffiliateFooter: React.FC<{ telegramContact?: string; sober?: boolean }> = ({
  telegramContact,
  sober,
}) => (
  <footer className="w-full text-center py-6 mt-2">
    <a
      href={affiliateTelegramUrl(telegramContact)}
      target="_blank"
      rel="noopener noreferrer"
      className={
        sober
          ? 'inline-flex items-center gap-2 text-sm font-medium text-slate-400 border-b border-slate-600 pb-0.5 hover:text-slate-200 transition-colors'
          : 'inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95'
      }
      style={
        sober
          ? undefined
          : {
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: 'white',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }
      }
    >
      💼 Devenir affilié
    </a>
  </footer>
);

// ── Main Layout ─────────────────────────────────────────────────────────────

const GeneralLayout: React.FC<GeneralLayoutProps> = ({
  currentLink,
  name,
  photo,
  telegramContact,
  theme,
  landingSlug,
  disableFakeGames,
}) => {
  useScrollHaptics();
  const isSober = theme.id === 'general-sober';
  const isDark = theme.id === 'general-dark';
  const bgUrl = theme.backgroundImage || 'https://i.ibb.co/chCd4FgR/d3996ede-ba73-4978-9cc5-d81cc4a35b05.png';
  const avatarRing = isSober ? 'border-slate-600' : isDark ? 'border-cyan-400/50' : 'border-white';

  return (
  <div className="min-h-screen relative overflow-x-hidden">
    {isSober ? (
      <div
        className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        aria-hidden
      />
    ) : (
      <>
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {isDark ? (
          <div
            className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/65 via-black/50 to-slate-950/80"
            aria-hidden
          />
        ) : null}
      </>
    )}

    {/* Content */}
    <div className="relative z-10 w-full max-w-3xl mx-auto px-3 md:px-4 py-6 md:py-8 pb-28">
      <GeneralProfile name={name} photo={photo} avatarRingClass={avatarRing} sober={isSober} />
      <div data-haptic>
        <GeneralGameGrid
          slug={landingSlug}
          casinoLink={currentLink}
          sober={isSober}
          prioritizeFakeGames={theme.id === 'general-dark'}
          disableFakeGames={disableFakeGames}
        />
      </div>
      <GeneralAffiliateFooter telegramContact={telegramContact} sober={isSober} />
    </div>

    <GeneralStickyButton
      link={currentLink}
      stickyStyle={isSober ? 'sober' : isDark ? 'cyan' : 'orange'}
    />
  </div>
  );
};

export default GeneralLayout;
