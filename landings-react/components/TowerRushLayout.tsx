import React, { useState, useEffect } from 'react';
import FakeLive from './FakeLive';
import { ExternalLink, Gift, TrendingUp, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2, Clock, CreditCard, Gamepad2, HelpCircle, Lock, Phone, PiggyBank, Plus, Wallet, AlertCircle } from 'lucide-react';
import { getTranslation, Translation } from '../translations';
import type { Language } from '../translations';
import { getCurrentAffiliate } from '../config/affiliates';
import { isTikTokInAppBrowser, fireSpártaPixelForUrl, fireAprilPixelForUrl } from '../utils/linkManager';
import { affiliateTelegramUrl } from '../utils/affiliateTelegramUrl';
import haptics from '../utils/haptics';
import useScrollHaptics from '../hooks/useScrollHaptics';
import taapitLinks from '../config/taapit-links.json';

const TOWER_DEFAULT_WELCOME_OFFER_IMAGE =
  'https://i.ibb.co/C3NQRkVh/8d242072-0118-4598-a67d-4154a75387a4.png';
const TOWER_DEFAULT_BACKGROUND_IMAGE =
  'https://i.ibb.co/GfgqTtnN/17af49b5-5a2b-459a-9bc5-009146588b4d.png';

/** Style 3D des gros boutons CTA (bannière, FAQ, sticky) */
type TowerChunkCtaSpec = {
  background: string;
  color: string;
  textShadow: string;
  normalBox: string;
  pressedBox: string;
  borderBottom: string;
};

const TOWER_CHUNK_CTA_BLUE: TowerChunkCtaSpec = {
  background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
  color: '#ffffff',
  textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
  normalBox: '0 5px 0 #0D47A1, 0 6px 10px rgba(0,0,0,0.4)',
  pressedBox: '0 2px 0 #0D47A1, 0 3px 6px rgba(0,0,0,0.4)',
  borderBottom: '3px solid #0D47A1',
};

const TOWER_CHUNK_CTA_ORANGE: TowerChunkCtaSpec = {
  background: 'linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)',
  color: '#ffffff',
  textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
  normalBox: '0 5px 0 #CC6600, 0 6px 12px rgba(0,0,0,0.4)',
  pressedBox: '0 2px 0 #CC6600, 0 3px 8px rgba(0,0,0,0.4)',
  borderBottom: '3px solid #CC6600',
};

function towerChunkCtaFromFillHex(hex: string): TowerChunkCtaSpec {
  const n = hex.replace(/^#/, '').toLowerCase();
  // Orange pêche (megablock) vs jaune : ombres / dégradé assortis
  const orangeish = n === 'ffad54';
  const edge = orangeish ? '#c2410c' : '#9a8208';
  const gradEnd = orangeish ? '#f97316' : '#dbc117';
  return {
    background: `linear-gradient(135deg, ${hex} 0%, ${gradEnd} 100%)`,
    color: '#1a1a1a',
    textShadow: '0 1px 0 rgba(255,255,255,0.35)',
    normalBox: `0 5px 0 ${edge}, 0 6px 12px rgba(0,0,0,0.4)`,
    pressedBox: `0 2px 0 ${edge}, 0 3px 8px rgba(0,0,0,0.4)`,
    borderBottom: `3px solid ${edge}`,
  };
}

const trackFakeLiveEvent = (slug: string, event: 'view' | 'cta_click', hasFakeLive: boolean) => {
  try {
    new Image().src = `/fl-track?s=${slug}&e=${event}&fl=${hasFakeLive ? 1 : 0}&_=${Date.now()}`;
  } catch (_) {}
};

interface TowerRushLayoutProps {
  currentLink: string;
  name: string;
  photo?: string;
  lang?: Language;
  telegramContact?: string;
  showFakeLive?: boolean;
  /** Image bannière offre de bienvenue (défaut = Tower Rush classique) */
  welcomeOfferImage?: string;
  /** Fond de page plein écran (défaut = Tower Rush classique) */
  backgroundImageUrl?: string;
  /** Couleur de remplissage des gros CTA (#hex), ex. megablock */
  towerCtaFillHex?: string;
  welcomeOfferStyle?: 'default' | 'blueWhite';
}

// ── Profile ────────────────────────────────────────────────────────────────

const TowerProfile: React.FC<{ name: string; photo?: string }> = ({ name, photo }) => (
  <div className="w-full flex flex-col items-center text-center px-4">
    {false && photo && (
      <div
        className="relative h-20 w-20 md:h-24 md:w-24 rounded-full p-1 mb-2 shadow-lg bg-white"
        style={{ boxShadow: '0 10px 20px rgba(25, 118, 210, 0.3)' }}
      >
        <img
          src={photo}
          alt="Profile"
          className="w-full h-full object-cover rounded-full object-center"
        />
      </div>
    )}
    <h1
      className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg"
      style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}
    >
      {name}
    </h1>
  </div>
);

// ── Bonus Banner ───────────────────────────────────────────────────────────

const TowerBonusBanner: React.FC<{
  link: string;
  t: Translation;
  welcomeOfferImage: string;
  towerCtaFillHex?: string;
  welcomeOfferStyle?: 'default' | 'blueWhite';
}> = ({ link, t, welcomeOfferImage, towerCtaFillHex, welcomeOfferStyle }) => {
  const chunkCta = towerCtaFillHex ? towerChunkCtaFromFillHex(towerCtaFillHex) : TOWER_CHUNK_CTA_BLUE;
  const bw = welcomeOfferStyle === 'blueWhite';
  return (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); }}
    className="w-full max-w-md mx-auto block group"
  >
    <div
      className="relative rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] shadow-2xl animate-pulse-glow"
      style={
        bw
          ? {
              background: 'linear-gradient(165deg, #f0f9ff 0%, #ffffff 42%, #e0f2fe 100%)',
              boxShadow:
                '0 12px 40px rgba(37, 99, 235, 0.12), 0 0 0 2px rgba(255, 255, 255, 1), 0 0 0 3px rgba(147, 197, 253, 0.45)',
            }
          : {
              background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
              boxShadow: '0 8px 30px rgba(25, 118, 210, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.3)',
            }
      }
    >
      <div
        className="absolute inset-0 z-10"
        style={
          bw
            ? {
                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.65) 0%, transparent 40%, rgba(219, 234, 254, 0.5) 100%)',
                boxShadow: 'inset 0 0 50px 24px rgba(255, 255, 255, 0.35)',
              }
            : {
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6))',
                boxShadow:
                  'inset 0 0 40px 10px rgba(25, 118, 210, 0.2), inset 0 0 60px 15px rgba(66, 165, 245, 0.15), inset 0 0 80px 20px rgba(33, 150, 243, 0.35)',
              }
        }
      />
      <img
        src={welcomeOfferImage}
        alt=""
        className="w-full h-40 md:h-48 object-cover object-center"
        style={{
          filter: bw
            ? 'drop-shadow(0 6px 24px rgba(59, 130, 246, 0.22)) saturate(1.02)'
            : 'drop-shadow(0 0 40px rgba(25, 118, 210, 0.6)) drop-shadow(0 0 80px rgba(66, 165, 245, 0.4)) drop-shadow(0 0 120px rgba(33, 150, 243, 0.3))',
        }}
      />
      <div
        className={
          bw
            ? 'relative z-20 p-4 md:p-6 bg-gradient-to-t from-white via-white/97 to-transparent'
            : 'relative z-20 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent'
        }
      >
        <div className="flex items-start gap-2 md:gap-3 mb-3">
          <div
            className={
              bw
                ? 'bg-sky-100/90 backdrop-blur-sm rounded-full p-2 md:p-3 ring-2 ring-white shadow-sm'
                : 'bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3'
            }
          >
            <Gift size={20} className={`md:w-6 md:h-6 ${bw ? 'text-sky-600' : 'text-white'}`} />
          </div>
          <div className="flex-1">
            <h3
              className={`text-lg md:text-xl font-black tracking-tight mb-1 ${bw ? 'text-slate-900' : 'text-white'}`}
              style={
                bw
                  ? { textShadow: '0 1px 0 rgba(255,255,255,0.9)' }
                  : { textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }
              }
            >
              {t.bonus_welcome_offer}
            </h3>
            <div
              className={`flex items-center gap-2 text-xs md:text-sm font-semibold mb-2 ${
                bw ? 'text-sky-800' : 'text-white/90'
              }`}
            >
              <TrendingUp size={14} className="md:w-4 md:h-4" />
              <span>{t.bonus_percentage}</span>
            </div>
          </div>
        </div>

        <div
          className={
            bw
              ? 'bg-white/85 backdrop-blur-md rounded-xl p-3 md:p-4 mb-3 md:mb-4 border border-sky-200/90 shadow-inner shadow-sky-100/80'
              : 'bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 mb-3 md:mb-4 border border-white/20'
          }
        >
          <p
            className={`text-xs md:text-sm font-bold mb-2 flex items-center gap-2 ${
              bw ? 'text-slate-800' : 'text-white'
            }`}
          >
            <span className="text-xl md:text-2xl">💝</span>
            {t.bonus_how_it_works}
          </p>
          <p className={`text-xs md:text-sm leading-relaxed ${bw ? 'text-slate-700' : 'text-white/95'}`}>
            <span className="font-bold" style={{ color: bw ? '#1d4ed8' : '#F4B400' }}>
              {t.bonus_deposit}
            </span>{' '}
            →
            <span className="font-bold" style={{ color: bw ? '#0d9488' : '#90EE90' }}>
              {' '}
              {t.bonus_receive}
            </span>
            <br />
            <span className={`text-xs ${bw ? 'text-slate-500' : 'text-white/80'}`}>{t.bonus_automatic}</span>
          </p>
        </div>

        <div
          className="flex items-center justify-center gap-2 px-4 py-3 font-black"
          style={{
            background: chunkCta.background,
            borderRadius: '14px',
            boxShadow: chunkCta.normalBox,
            borderBottom: chunkCta.borderBottom,
            color: chunkCta.color,
            textShadow: chunkCta.textShadow,
            transform: 'translateY(0)',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(3px)';
            e.currentTarget.style.boxShadow = chunkCta.pressedBox;
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = chunkCta.normalBox;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = chunkCta.normalBox;
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'translateY(3px)';
            e.currentTarget.style.boxShadow = chunkCta.pressedBox;
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = chunkCta.normalBox;
          }}
        >
          <span className="text-base md:text-lg">{t.cta_button_mobile.replace('🎮 ', '').toUpperCase()}</span>
        </div>
      </div>
    </div>
  </a>
  );
};

// ── Testimonials ───────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { image: 'https://i.ibb.co/xStwhC5Q/photo-2026-02-13-20-52-15.jpg', gain: '245€', date: 'Il y a 15min' },
  { image: 'https://i.ibb.co/sd0gyZ24/photo-2026-02-13-20-52-24.jpg', gain: '543€', date: 'Il y a 30min' },
  { image: 'https://i.ibb.co/0yVgWDm9/photo-2026-02-13-20-52-07.jpg', gain: '200€', date: 'Il y a 45min' },
  { image: 'https://i.ibb.co/zWZYndnr/image.png', gain: '500€', date: 'Il y a 1h' },
  { image: 'https://i.ibb.co/bMVY3TPk/IMG-5935.png', gain: '200€', date: 'Il y a 2h' },
];

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const TowerTestimonials: React.FC<{ title: string }> = ({ title }) => {
  const [items] = useState(() => shuffle(TESTIMONIALS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => setCurrentIndex((p) => (p + 1) % items.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + items.length) % items.length);

  return (
    <div className="w-full max-w-md mx-auto mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-black text-white mb-6 text-center drop-shadow-lg">
        {title}
      </h2>

      <div className="relative h-[560px] md:h-[680px]">
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 shadow-lg shadow-slate-900/30 z-10"
          style={{ left: '-12px' }}
        >
          <ChevronLeft size={20} className="text-slate-700" />
        </button>

        {items.map((t, i) => (
          <div
            key={i}
            className={`absolute w-full transition-all duration-300 transform ${
              i === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-2xl shadow-slate-900/30">
              <div className="relative pb-[160%] md:pb-[170%] mb-3">
                <img
                  src={t.image}
                  alt={`Gain de ${t.gain}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex justify-between items-center">
                <div
                  className="font-black text-lg md:text-xl"
                  style={{
                    background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  +{t.gain}
                </div>
                <div className="text-xs md:text-sm text-slate-600 font-semibold">{t.date}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Next */}
        <button
          onClick={next}
          className="absolute top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 shadow-lg shadow-slate-900/30 z-10"
          style={{ right: '-12px' }}
        >
          <ChevronRight size={20} className="text-slate-700" />
        </button>
      </div>

      <div className="flex justify-center items-center mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full mx-1 transition-all duration-300 ${i === currentIndex ? 'w-4' : 'w-2'}`}
            style={{ background: i === currentIndex ? 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)' : '#94A3B8' }}
          />
        ))}
      </div>
    </div>
  );
};

// ── FAQ ────────────────────────────────────────────────────────────────────

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  iconBg?: React.CSSProperties;
  hasImage?: boolean;
  imageUrl?: string;
}

const TowerFAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, icon, iconBg, hasImage, imageUrl }) => (
  <div className="mb-3">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 md:p-3.5 bg-white/95 backdrop-blur-sm text-left transition-all duration-200"
      style={{
        borderRadius: '12px',
        boxShadow: '0 3px 0 #D0D0D0, 0 5px 10px rgba(0,0,0,0.3)',
        borderBottom: '3px solid #D0D0D0',
      }}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div
          className="rounded-full p-1.5 md:p-2 mr-2 md:mr-2.5 shadow-md flex-shrink-0"
          style={iconBg || {
            background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
            boxShadow: '0 3px 6px rgba(25, 118, 210, 0.4)',
          }}
        >
          {icon}
        </div>
        <span className="font-bold text-slate-800 text-xs md:text-sm leading-tight">{question}</span>
      </div>
      {isOpen ? (
        <ChevronUp className="text-slate-700 flex-shrink-0 ml-2" size={18} />
      ) : (
        <ChevronDown className="text-slate-700 flex-shrink-0 ml-2" size={18} />
      )}
    </button>
    {isOpen && (
      <div className="p-3 md:p-4 bg-white/90 backdrop-blur-sm rounded-lg mt-2 shadow-inner">
        {hasImage && imageUrl && (
          <div className="mb-3 flex justify-center">
            <img src={imageUrl} alt="Problème d'accès" className="max-w-[120px] md:max-w-[150px] h-auto rounded-lg shadow-md" loading="eager" />
          </div>
        )}
        <div
          className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium text-xs md:text-sm"
          dangerouslySetInnerHTML={{
            __html: answer.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>'),
          }}
          style={{ textShadow: '0 1px 2px rgba(255,255,255,0.1)' }}
        />
      </div>
    )}
  </div>
);

const FR_ONLY_FAQS = [
  { question: "Ça marche sur téléphone ?", answer: "📱 **100% compatible mobile !**\n\n✨ Optimisé pour votre téléphone\n🚀 **Interface fluide** et intuitive\n💫 Pas besoin d'ordinateur\n\n**Tout se fait depuis votre téléphone** en quelques clics ! 🎯", icon: <Phone size={20} className="text-white drop-shadow-sm" /> },
  { question: "Je peux essayer sans déposer ?", answer: "🔍 **Voici comment ça marche :**\n\n✅ **Explorer le site** : Gratuit\n🎮 **Accès aux jeux** : Après le dépôt\n💎 **Dépôt minimum** : 20€\n\n⭐ **Notre conseil :** Commencez avec le minimum pour essayer !", icon: <CheckCircle2 size={20} className="text-white drop-shadow-sm" /> },
  { question: "C'est quoi le minimum pour jouer ?", answer: "💫 **Commencez avec seulement 20€ !**\n\n> 🎯 **Parfait pour essayer**\n> 🎁 Bonus **doublé automatiquement**\n> ⭐ Accès à **tous les jeux**\n\n✨ Pas besoin de mettre plus pour la première fois !", icon: <CreditCard size={20} className="text-white drop-shadow-sm" /> },
  { question: "Je ne trouve pas le bouton pour jouer, où est-il ?", answer: "🎮 **Très simple à trouver :**\n\n> 📱 Faites défiler jusqu'en **bas de la page**\n> 🎯 Cliquez sur le bouton **\"Commencer à jouer\"**\n> ⚡ Le mini-jeu se lance **instantanément**\n\n✨ Et c'est parti pour jouer ! 🎲", icon: <Clock size={20} className="text-white drop-shadow-sm" /> },
  { question: "Si c'était vraiment rentable, tout le monde serait riche, non ?", answer: "💬 **Pas vraiment.**\n\nCeux qui perdent, ce sont souvent ceux qui s'emballent et parient tout leur solde en un seul coup.\nOui, vous pouvez gagner beaucoup en une seconde…\n\n💥 **Mais vous pouvez aussi tout perdre d'un coup.**\n\n🎯 **Les joueurs qui s'en sortent bien sont ceux qui :**\n\n✅ gèrent leur budget\n✅ savent quand s'arrêter\n✅ exploitent les bonus intelligemment\n\n📌 **Donc non, ce n'est pas une arnaque.**\nMais si vous jouez comme un fou, vous aurez les résultats d'un fou.\n\n**Jouez intelligemment. Pas comme un fou, jouez exactement comme dans la vidéo de mon Tutoriel ci-dessus.** 🧠💸", icon: <PiggyBank size={20} className="text-white drop-shadow-sm" /> },
];

function getTowerFAQs(t: Translation, lang: string) {
  const faqs = [];

  // Question d'accès en premier (FR uniquement) — lien Taapit si TikTok in-app, sinon Mystake direct
  if (lang === 'FR' && t.faq_access_question) {
    const affiliate = getCurrentAffiliate();
    const taapitMystakeLink: string | null = (taapitLinks as Record<string, string>)[affiliate?.slug || ''] || null;
    const mystakeLink = `https://checkwinmid.com/visit/?bta=36610&nci=5678&afp=z${affiliate?.slug || 'unknown'}`;
    const accessLink = (isTikTokInAppBrowser() && taapitMystakeLink) ? taapitMystakeLink : mystakeLink;
    faqs.push({
      question: t.faq_access_question,
      answer: t.faq_access_answer.replace('MYSTAKE_LINK', accessLink),
      icon: <AlertCircle size={20} className="text-white drop-shadow-sm" />,
      iconBg: { background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)', boxShadow: '0 3px 6px rgba(220, 38, 38, 0.4)' },
      hasImage: true,
      imageUrl: "https://i.ibb.co/JFwrd7C8/IMG-1587.png"
    });
  }

  if (t.faq_bonus_question) faqs.push({ question: t.faq_bonus_question, answer: t.faq_bonus_answer, icon: <Plus size={20} className="text-white drop-shadow-sm" /> });
  if (t.faq_withdraw_question) faqs.push({ question: t.faq_withdraw_question, answer: t.faq_withdraw_answer, icon: <Wallet size={20} className="text-white drop-shadow-sm" /> });
  if (t.faq_games_question) faqs.push({ question: t.faq_games_question, answer: t.faq_games_answer, icon: <Gamepad2 size={20} className="text-white drop-shadow-sm" /> });
  if (t.faq_reliable_question) faqs.push({ question: t.faq_reliable_question, answer: t.faq_reliable_answer, icon: <Lock size={20} className="text-white drop-shadow-sm" /> });
  if (t.faq_what_game_question) faqs.push({ question: t.faq_what_game_question, answer: t.faq_what_game_answer, icon: <HelpCircle size={20} className="text-white drop-shadow-sm" /> });
  if (t.faq_age_question) faqs.push({ question: t.faq_age_question, answer: t.faq_age_answer, icon: <CheckCircle2 size={20} className="text-white drop-shadow-sm" /> });
  if (t.faq_deposit_question) faqs.push({ question: t.faq_deposit_question, answer: t.faq_deposit_answer, icon: <CreditCard size={20} className="text-white drop-shadow-sm" /> });
  if (t.faq_support_question) faqs.push({ question: t.faq_support_question, answer: t.faq_support_answer, icon: <Phone size={20} className="text-white drop-shadow-sm" /> });
  if (lang === 'FR') faqs.push(...FR_ONLY_FAQS);
  return faqs;
}

const TowerFAQ: React.FC<{ link: string; t: Translation; lang: string; towerCtaFillHex?: string }> = ({
  link,
  t,
  lang,
  towerCtaFillHex,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = getTowerFAQs(t, lang);
  const chunkCta = towerCtaFillHex ? towerChunkCtaFromFillHex(towerCtaFillHex) : TOWER_CHUNK_CTA_BLUE;

  return (
    <div className="w-full max-w-md mx-auto">
      <h2
        className="text-2xl md:text-3xl font-black text-white mb-6 text-center"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)', color: '#FFF4E0' }}
      >
        {t.faq_title}
      </h2>

      {faqs.map((faq, index) => (
        <TowerFAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
          icon={faq.icon}
          iconBg={(faq as any).iconBg}
          hasImage={(faq as any).hasImage}
          imageUrl={(faq as any).imageUrl}
        />
      ))}

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); }}
        className="w-full font-black py-4 md:py-5 px-6 text-center text-lg md:text-xl flex items-center justify-center mt-8"
        style={{
          background: chunkCta.background,
          borderRadius: '14px',
          boxShadow: chunkCta.normalBox,
          borderBottom: chunkCta.borderBottom,
          color: chunkCta.color,
          textShadow: chunkCta.textShadow,
          transform: 'translateY(0)',
          transition: 'transform 0.1s ease, box-shadow 0.1s ease',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(3px)';
          e.currentTarget.style.boxShadow = chunkCta.pressedBox;
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = chunkCta.normalBox;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = chunkCta.normalBox;
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.transform = 'translateY(3px)';
          e.currentTarget.style.boxShadow = chunkCta.pressedBox;
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = chunkCta.normalBox;
        }}
      >
        {t.cta_button}
      </a>
    </div>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────────

const TowerFooter: React.FC<{ t: Translation; telegramContact?: string }> = ({ t, telegramContact }) => (
  <footer className="w-full text-center py-6 mt-6">
    <a
      href={affiliateTelegramUrl(telegramContact)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(255,255,255,0.35)',
        color: 'white',
        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      }}
    >
      {t.footer_become_affiliate}
    </a>
  </footer>
);

// ── Sticky Button ──────────────────────────────────────────────────────────

/** Pixels de scroll (ou swipe) avant d’afficher le sticky — évite de masquer le haut de page au chargement */
const STICKY_REVEAL_AFTER_SCROLL_PX = 100;

const TowerStickyButton: React.FC<{
  link: string;
  t: Translation;
  slug?: string;
  hasFakeLive?: boolean;
  towerCtaFillHex?: string;
}> = ({ link, t, slug, hasFakeLive, towerCtaFillHex }) => {
  const chunkCta = towerCtaFillHex ? towerChunkCtaFromFillHex(towerCtaFillHex) : TOWER_CHUNK_CTA_ORANGE;
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setStickyVisible(y >= STICKY_REVEAL_AFTER_SCROLL_PX);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
  <div
    className={`fixed bottom-6 md:bottom-8 left-0 right-0 z-50 px-4 pointer-events-none transition-all duration-300 ease-out ${
      stickyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}
    aria-hidden={!stickyVisible}
  >
    <div className={`max-w-lg mx-auto ${stickyVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); if (slug) trackFakeLiveEvent(slug, 'cta_click', !!hasFakeLive); }}
          className="block w-full font-black py-3.5 md:py-4 px-5 text-center text-base md:text-lg"
          style={{
            background: chunkCta.background,
            borderRadius: '14px',
            boxShadow: chunkCta.normalBox,
            borderBottom: chunkCta.borderBottom,
            color: chunkCta.color,
            textShadow: chunkCta.textShadow,
            transform: 'translateY(0)',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(3px)';
            e.currentTarget.style.boxShadow = chunkCta.pressedBox;
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = chunkCta.normalBox;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = chunkCta.normalBox;
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'translateY(3px)';
            e.currentTarget.style.boxShadow = chunkCta.pressedBox;
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = chunkCta.normalBox;
          }}
      >
        {t.cta_button}
      </a>
    </div>
  </div>
  );
};

// ── Deposit Tutorial ────────────────────────────────────────────────────────

interface TowerDepositTutorialProps {
  headerText?: string;
  cardTitle?: string;
  footerText?: string;
}

const YOUTUBE_VIDEO_ID = 'ST4tQplpJm8';

const TowerDepositTutorial: React.FC<TowerDepositTutorialProps> = ({
  cardTitle = 'Tutoriel : Comment déposer et jouer',
}) => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <div style={{ width: '60%', maxWidth: '220px', margin: '0 auto' }}>
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.15), rgba(66, 165, 245, 0.1))',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ padding: '5px 6px 2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontSize: '9px' }}>🎯</span>
          <h3
            style={{ fontSize: '8px', fontWeight: 700, color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.6)', margin: 0, lineHeight: 1.2 }}
          >
            {cardTitle}
          </h3>
        </div>
        <div style={{ padding: '0 4px 4px' }}>
          <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '6px', overflow: 'hidden', cursor: playing ? undefined : 'pointer', background: '#000' }}
            onClick={() => !playing && setPlaying(true)}
          >
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=1&controls=1&playsinline=1`}
                title="Tutoriel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '6px' }}
              />
            ) : (
              <>
                <img
                  src={`https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                  alt="Tutoriel"
                  loading="lazy"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.25)',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,0,0,0.9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}>
                    <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '10px 0 10px 18px', borderColor: 'transparent transparent transparent white', marginLeft: 3 }} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Layout ────────────────────────────────────────────────────────────

const AFFILIATE_OVERRIDES: Record<string, Partial<Translation>> = {
  ibrabsjeu: {
    page_title: "20€ + 20€ offert",
    bonus_deposit: "Déposez 20€",
    bonus_receive: "Recevez 40€",
    bonus_automatic: "Ton argent est doublé automatiquement !",
    faq_bonus_answer: "💬 **Oui, et c'est automatique.**\nDès que tu déposes **au moins 20€**, ton dépôt est **doublé instantanément** — **pas besoin de code promo.**\n\n> 🔥 Tu déposes 20€ ➝ tu joues avec 40€\n> 💸 Tu déposes 100€ ➝ tu joues direct avec 200€\n\n✅ Le bonus **x2 est garanti** à chaque dépôt, peu importe le montant.\nEt si tu joues dans la foulée, t'as même souvent un petit bonus surprise 🎉",
    faq_deposit_answer: "💳 **Super facile !**\n\n> 1️⃣ Clique sur le bouton **\"Jouer maintenant\"**\n> 2️⃣ Inscris-toi en 30 secondes\n> 3️⃣ Choisis ton montant (minimum 20€)\n> 4️⃣ Paie par **carte bancaire**\n\n⚡ Et hop, ton compte est **crédité instantanément** avec le **bonus x2** !",
  },
};

const AFFILIATES_WITH_DEPOSIT_TUTORIAL = ['ibrabsjeu', 'loic', 'victor'];

const TUTORIAL_CONFIG: Record<string, TowerDepositTutorialProps> = {
  loic:   { cardTitle: 'Tutoriel - Comment gagner facilement' },
  victor: { cardTitle: 'Tutoriel - Comment gagner facilement' },
};

const TowerRushLayout: React.FC<TowerRushLayoutProps> = ({
  currentLink,
  name,
  photo,
  lang,
  telegramContact,
  showFakeLive,
  welcomeOfferImage,
  backgroundImageUrl,
  towerCtaFillHex,
  welcomeOfferStyle,
}) => {
  const offerImageSrc = welcomeOfferImage ?? TOWER_DEFAULT_WELCOME_OFFER_IMAGE;
  const pageBackgroundSrc = backgroundImageUrl ?? TOWER_DEFAULT_BACKGROUND_IMAGE;
  const baseT = getTranslation(lang);
  const affiliate = getCurrentAffiliate();
  const slug = affiliate?.slug || '';
  const overrides = AFFILIATE_OVERRIDES[slug];
  const t = overrides ? { ...baseT, ...overrides } : baseT;
  const showDepositTuto = (!lang || lang === 'FR') && AFFILIATES_WITH_DEPOSIT_TUTORIAL.includes(slug);

  useScrollHaptics();

  useEffect(() => {
    trackFakeLiveEvent(slug, 'view', !!showFakeLive);
  }, [slug, showFakeLive]);
  return (
  <div
    className="min-h-screen flex flex-col items-center relative"
    style={{ backgroundColor: '#87CEEB' }}
  >
    {/* Image de fond avec opacité */}
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: `url(${pageBackgroundSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: '0.85',
      }}
    />

    <div className="w-full max-w-lg mx-auto py-3 md:py-4 px-4 flex flex-col items-center pb-28 gap-4 md:gap-6 relative z-10">
      <TowerProfile name={name} photo={photo} />
      {showDepositTuto && <TowerDepositTutorial {...(TUTORIAL_CONFIG[slug] || {})} />}
      {showFakeLive && <FakeLive currentLink={currentLink} />}
      <div data-haptic className="w-full">
        <TowerBonusBanner
          link={currentLink}
          t={t}
          welcomeOfferImage={offerImageSrc}
          towerCtaFillHex={towerCtaFillHex}
          welcomeOfferStyle={welcomeOfferStyle}
        />
      </div>
      {(!lang || lang === 'FR') && <div data-haptic className="w-full"><TowerTestimonials title={t.testimonials_recent_gains} /></div>}
      <div data-haptic className="w-full">
        <TowerFAQ link={currentLink} t={t} lang={lang || 'FR'} towerCtaFillHex={towerCtaFillHex} />
      </div>
      <TowerFooter t={t} telegramContact={telegramContact} />
    </div>

    <TowerStickyButton
      link={currentLink}
      t={t}
      slug={slug}
      hasFakeLive={showFakeLive}
      towerCtaFillHex={towerCtaFillHex}
    />
  </div>
  );
};

export default TowerRushLayout;
