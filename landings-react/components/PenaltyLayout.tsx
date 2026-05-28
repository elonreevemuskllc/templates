import React, { useState, useEffect, useRef } from 'react';
import {
  Gift, ExternalLink, Send, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight, CheckCircle2, Clock, CreditCard,
  Gamepad2, HelpCircle, Lock, Phone, PiggyBank, Plus, Wallet, TrendingUp,
} from 'lucide-react';
import { fireSpártaPixelForUrl, fireAprilPixelForUrl } from '../utils/linkManager';
import { affiliateTelegramUrl } from '../utils/affiliateTelegramUrl';
import haptics from '../utils/haptics';
import useScrollHaptics from '../hooks/useScrollHaptics';

interface PenaltyLayoutProps {
  currentLink: string;
  name: string;
  photo?: string;
  telegramContact?: string;
}

/* ─── Galaxy Background (canvas particles) ─── */
const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#10b981', '#fbbf24', '#8b5cf6', '#ec4899', '#3b82f6', '#06b6d4'];

    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 12 + Math.random() * 8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

/* ─── Profile Section ─── */
const PenaltyProfile: React.FC<{ name: string; photo?: string }> = ({ name, photo }) => {
  void photo;
  return (
  <div className="w-full flex flex-col items-center text-center mb-8 px-4 relative z-10">
    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
      {name}
    </h1>
  </div>
  );
};

/* ─── Bonus Banner ─── */
const PenaltyBonusBanner: React.FC<{ link: string }> = ({ link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    data-ftd-link
    onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); }}
    className="block w-full max-w-md mx-auto mb-6 rounded-xl overflow-hidden cursor-pointer
      bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#8b5cf6]
      hover:from-[#a78bfa] hover:via-[#60a5fa] hover:to-[#a78bfa]
      transform transition-all duration-300 hover:scale-[1.02]
      hover:shadow-2xl hover:shadow-purple-500/50 group"
  >
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <img
        src="https://i.ibb.co/XfqgQ3wC/DIELS-MK.png"
        alt=""
        className="w-full h-auto relative"
        style={{ animation: 'penaltyPulseGlow 2s ease-in-out infinite' }}
      />
    </div>
    <div className="p-5 flex items-center">
      <div className="bg-white/20 rounded-full p-2 mr-3">
        <Gift size={20} className="text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-bold text-white tracking-tight">OFFRE DE BIENVENUE 🎁</h3>
        <p className="text-white/90 text-sm font-medium">
          💝 Exemple: Déposez 10€ et recevez gratuitement 20€ ! ✨ Ton argent est doublé automatiquement 💰
        </p>
      </div>
      <ExternalLink size={14} className="text-white/80" />
    </div>
  </a>
);

/* ─── Testimonials Carousel ─── */
const testimonialData = [
  { image: 'https://i.ibb.co/xStwhC5Q/photo-2026-02-13-20-52-15.jpg', gain: '245€ ✨', date: 'Il y a 15min' },
  { image: 'https://i.ibb.co/sd0gyZ24/photo-2026-02-13-20-52-24.jpg', gain: '543€ ✨', date: 'Il y a 30min' },
  { image: 'https://i.ibb.co/0yVgWDm9/photo-2026-02-13-20-52-07.jpg', gain: '200€ ✨', date: 'Il y a 45min' },
  { image: 'https://i.ibb.co/bMVY3TPk/IMG-5935.png', gain: '200€ ✨', date: 'Il y a 2h' },
];

const PenaltyTestimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const next = () => setActive(i => (i + 1) % testimonialData.length);
  const prev = () => setActive(i => (i - 1 + testimonialData.length) % testimonialData.length);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
        Gains Récents 💸
      </h2>
      <div className="relative h-[680px]">
        {/* Nav buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-[#1a1d29]/80 backdrop-blur-md
            border border-purple-500/20 rounded-full p-2 hover:bg-[#2d1b4e]/80 transition-all
            shadow-xl shadow-purple-500/20"
          style={{ left: '-12px' }}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-[#1a1d29]/80 backdrop-blur-md
            border border-purple-500/20 rounded-full p-2 hover:bg-[#2d1b4e]/80 transition-all
            shadow-xl shadow-purple-500/20"
          style={{ right: '-12px' }}
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        {testimonialData.map((t, i) => (
          <div
            key={i}
            className={`absolute w-full transition-all duration-300 transform ${
              i === active ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
            }`}
          >
            <div className="bg-[#1a1d29]/80 backdrop-blur-md border border-purple-500/20 rounded-xl p-4 shadow-xl shadow-purple-500/20">
              <div className="relative pb-[180%]">
                <img src={t.image} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[32px]" />
              </div>
              <div className="flex justify-between items-center mt-4 px-2">
                <span className="text-green-400 font-bold text-xl">{t.gain}</span>
                <span className="text-sm text-gray-300">{t.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonialData.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? 'w-4 h-2 bg-purple-500 shadow-lg shadow-purple-500/50'
                : 'w-2 h-2 bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── FAQ Accordion ─── */
const faqItems = [
  { q: "Y'a un bonus si je dépose ?", a: "**Oui !** Ton premier dépôt est **doublé automatiquement**. Par exemple, si tu déposes 10€, tu reçois 10€ de bonus, soit **20€ pour jouer**. C'est appliqué instantanément.", icon: Plus },
  { q: "Est-ce qu'on peut retirer l'argent ?", a: "**Oui, bien sûr.** Tu peux retirer tes gains à tout moment. Les retraits sont traités sous **24 à 48h** selon la méthode choisie (virement, crypto, etc.).", icon: Wallet },
  { q: "Où sont les jeux ?", a: "Une fois inscrit, tu accèdes directement au **lobby** avec tous les jeux disponibles : machines à sous, crash games, roulette, blackjack… Il y en a des centaines.", icon: Gamepad2 },
  { q: "C'est fiable ?", a: "**Oui.** La plateforme est **licenciée** et régulée. Des milliers de joueurs l'utilisent chaque jour. Tes données et ton argent sont protégés par un **cryptage SSL**.", icon: Lock },
  { q: "C'est quoi exactement le jeu ?", a: "C'est une **plateforme de jeux en ligne** (casino). Tu peux jouer à des **jeux de hasard** comme des machines à sous, des crash games (comme Aviator), de la roulette, du blackjack, et plein d'autres.", icon: HelpCircle },
  { q: "Est-ce que ça marche sur téléphone ?", a: "**Oui, parfaitement.** Le site est optimisé pour mobile, que tu sois sur **iPhone ou Android**. Pas besoin de télécharger d'application.", icon: Phone },
  { q: "Est-ce que je peux tester sans déposer ?", a: "Certains jeux sont disponibles en **mode démo** pour les essayer gratuitement. Mais pour jouer avec de l'argent réel et profiter du bonus, un **dépôt minimum** est nécessaire.", icon: CheckCircle2 },
  { q: "C'est quoi le minimum pour jouer ?", a: "Le dépôt minimum est de **10€**. Avec le bonus de bienvenue, ça te fait **20€ pour commencer** à jouer.", icon: CreditCard },
  { q: "Je trouve pas le bouton pour jouer, il est où ?", a: "Clique sur le **bouton violet** en bas de la page ou sur la **bannière bonus** plus haut. Ça t'emmène directement sur la page d'inscription où tu pourras créer ton compte en **30 secondes**.", icon: Clock },
  { q: "Si c'était vraiment rentable, tout le monde serait riche, non ?", a: "C'est du **jeu de hasard**, pas un investissement garanti. Certains gagnent, d'autres perdent. L'important c'est de **jouer responsablement** et de ne miser que ce qu'on peut se permettre de perdre. Le bonus te donne juste un **avantage de départ**.", icon: PiggyBank },
];

const PenaltyFAQItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  Icon: React.FC<{ size?: number; className?: string }>;
}> = ({ question, answer, isOpen, onClick, Icon }) => {
  const rendered = answer.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>');
  return (
    <div className="mb-3">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 bg-[#1a1d29]/80 backdrop-blur-md
          border border-purple-500/20 rounded-xl hover:bg-[#2d1b4e]/80
          shadow-xl shadow-purple-500/10 transition-all duration-300"
      >
        <div className="flex items-center flex-1 text-left">
          <div className="bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] rounded-full p-2 mr-3 shadow-lg shadow-purple-500/50">
            <Icon size={16} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-white">{question}</span>
        </div>
        {isOpen ? <ChevronUp size={18} className="text-purple-400 ml-2 flex-shrink-0" /> : <ChevronDown size={18} className="text-purple-400 ml-2 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="p-5 bg-[#1a1d29]/60 backdrop-blur-md rounded-lg mt-2 border border-purple-500/10">
          <p className="text-sm text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: rendered }} />
        </div>
      )}
    </div>
  );
};

const PenaltyFAQ: React.FC<{ link: string }> = ({ link }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
        Questions Fréquentes ❓
      </h2>
      {faqItems.map((item, i) => (
        <PenaltyFAQItem
          key={i}
          question={item.q}
          answer={item.a}
          isOpen={openIdx === i}
          onClick={() => setOpenIdx(openIdx === i ? null : i)}
          Icon={item.icon}
        />
      ))}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        data-ftd-link
        onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); }}
        className="w-full bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#8b5cf6] text-white font-bold
          py-4 px-6 rounded-xl text-center text-lg shadow-2xl shadow-purple-500/50
          hover:shadow-purple-500/70 transition-all duration-300 hover:scale-[1.02]
          flex items-center justify-center mt-8"
      >
        COMMENCER A JOUER 🎮
      </a>
    </div>
  );
};

/* ─── Footer ─── */
const PenaltyFooter: React.FC<{ telegramContact?: string }> = ({ telegramContact }) => (
  <div className="w-full text-center py-8 relative z-10">
    <a
      href={affiliateTelegramUrl(telegramContact)}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 text-xs text-gray-400 hover:text-purple-400 transition-colors"
    >
      Devenir affilié
    </a>
  </div>
);

/* ─── Sticky Button ─── */
const PenaltyStickyButton: React.FC<{ link: string }> = ({ link }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 p-3 pb-4 bg-gradient-to-t from-[#0f1318] via-[#0f1318]/95 to-transparent">
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-ftd-link
      onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); }}
      className="block w-full max-w-md mx-auto bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#8b5cf6]
        hover:from-[#a78bfa] hover:via-[#60a5fa] hover:to-[#a78bfa]
        text-white text-center font-bold py-4 rounded-xl text-lg
        shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70
        transition-all duration-300 hover:scale-[1.02]
        flex items-center justify-center gap-2"
    >
      <Gift size={20} />
      RÉCUPÉRER MON BONUS
    </a>
  </div>
);

/* ─── Main Layout ─── */
const PenaltyLayout: React.FC<PenaltyLayoutProps> = ({ currentLink, name, photo, telegramContact }) => {
  useScrollHaptics();

  return (
    <>
      <style>{`
        @keyframes penaltyPulseGlow {
          0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(96,165,250,0.5), 0 0 40px rgba(244,114,182,0.3); }
          50% { opacity: 0.8; box-shadow: 0 0 30px rgba(96,165,250,0.8), 0 0 60px rgba(244,114,182,0.6); }
        }
      `}</style>
      <GalaxyBackground />
      <div className="min-h-screen bg-gradient-to-br from-[#0f1318] via-[#1a1d29] to-[#2d1b4e] flex flex-col items-center relative overflow-hidden">
        <div className="w-full max-w-lg mx-auto py-10 px-4 flex flex-col items-center relative z-10 pb-24">
          <div data-haptic className="w-full">
            <PenaltyProfile name={name} photo={photo} />
          </div>
          <div data-haptic className="w-full">
            <PenaltyBonusBanner link={currentLink} />
          </div>
          <div data-haptic className="w-full">
            <PenaltyTestimonials />
          </div>
          <div data-haptic className="w-full">
            <PenaltyFAQ link={currentLink} />
          </div>
          <PenaltyFooter telegramContact={telegramContact} />
        </div>
        <PenaltyStickyButton link={currentLink} />
      </div>
    </>
  );
};

export default PenaltyLayout;
