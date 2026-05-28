import React, { useState, useEffect } from 'react';
import {
  Gift,
  Send,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Gamepad2,
  HelpCircle,
  Lock,
  Phone,
  PiggyBank,
  Plus,
  Wallet,
} from 'lucide-react';
import { fireSpártaPixelForUrl, fireAprilPixelForUrl } from '../utils/linkManager';
import { affiliateTelegramUrl } from '../utils/affiliateTelegramUrl';
import haptics from '../utils/haptics';
import useScrollHaptics from '../hooks/useScrollHaptics';

/** Aligné sur https://github.com/elonreevemuskllc/ninjacrash (App + composants) + tracking / haptics landing */

interface NinjaCrashLayoutProps {
  currentLink: string;
  name: string;
  photo?: string;
  bio?: string;
  telegramContact?: string;
}

const trackCta = (link: string) => {
  haptics.heavy();
  fireSpártaPixelForUrl(link);
  fireAprilPixelForUrl(link);
};

/** Même règle que ProfileSection.tsx / bot (placeholder exemple → pas d’image) */
const isPlaceholderPhoto = (url: string) =>
  !url || /\/xxx\/photo\.jpg$/i.test(url) || /image\.pngphoto\.jpg$/i.test(url);

/** Fond + theme-color iOS (évite le bleu global index.html) */
const NINJA_THEME_STYLE_ID = 'ninjacrash-ios-theme';
const NINJA_THEME_COLOR = '#6b3a3e';

const ProfileSection: React.FC<{ name: string; bio: string; photo?: string }> = ({ name, bio, photo }) => {
  const showPhoto = false; // photos masquées globalement
  void photo; void isPlaceholderPhoto;
  return (
  <div className="w-full flex flex-col items-center text-center px-4">
    {showPhoto ? (
    <div
      className="relative h-20 w-20 md:h-24 md:w-24 rounded-full p-1 mb-4 shadow-lg bg-white"
      style={{ boxShadow: '0 10px 20px rgba(255, 107, 107, 0.4)' }}
    >
      <img
        src={photo}
        alt="Profile"
        loading="lazy"
        className="w-full h-full object-cover rounded-full object-center"
      />
    </div>
    ) : null}
    <h1
      className="text-3xl md:text-4xl font-extrabold text-white mb-2"
      style={{ textShadow: '0 2px 14px rgba(0,0,0,0.35)' }}
    >
      {name}
    </h1>
    {bio ? (
      <p className="text-white max-w-md text-base md:text-lg font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.25)' }}>
        {bio}
      </p>
    ) : null}
  </div>
  );
};

interface BonusBannerProps {
  title: string;
  description: string;
  link: string;
  isPrimary?: boolean;
}

const BonusBanner: React.FC<BonusBannerProps> = ({ title, description, link, isPrimary = false }) => {
  if (isPrimary) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCta(link)}
        className="w-full max-w-md mx-auto block group"
      >
        <div
          className="relative rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
            boxShadow: '0 8px 30px rgba(255, 107, 107, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.3)',
          }}
        >
          <div className="relative w-full overflow-hidden rounded-t-2xl">
            <img
              src="https://i.ibb.co/pvBLrsW2/2d494fa7-5d2f-4db9-b905-e90176a7510b.png"
              alt=""
              loading="lazy"
              className="block w-full h-40 md:h-48 object-cover object-center rounded-t-2xl"
            />
            <div
              className="absolute inset-0 z-10 pointer-events-none rounded-t-2xl"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.45))',
                boxShadow:
                  'inset 0 0 40px 10px rgba(255, 107, 107, 0.2), inset 0 0 60px 15px rgba(255, 142, 83, 0.15), inset 0 0 80px 20px rgba(255, 107, 107, 0.35)',
              }}
            />
          </div>
          <div className="relative z-20 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-start gap-2 md:gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3">
                <Gift size={20} className="text-white md:w-6 md:h-6" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg md:text-xl font-black text-white tracking-tight mb-1"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}
                >
                  {title}
                </h3>
                <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm font-semibold mb-2">
                  <TrendingUp size={14} className="md:w-4 md:h-4" />
                  <span>100% de Bonus</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 mb-3 md:mb-4 border border-white/20">
              <p className="text-white text-xs md:text-sm font-bold mb-2 flex items-center gap-2">
                <span className="text-xl md:text-2xl">💝</span>
                Comment ça marche ?
              </p>
              <p className="text-white/95 text-xs md:text-sm leading-relaxed">
                <span className="font-bold" style={{ color: '#F4B400' }}>
                  Déposez 10€
                </span>{' '}
                →
                <span className="font-bold" style={{ color: '#90EE90' }}>
                  {' '}
                  Recevez 20€
                </span>
                <br />
                <span className="text-xs text-white/80">Votre argent est automatiquement doublé !</span>
              </p>
            </div>
            <div
              className="flex items-center justify-center gap-2 bg-white text-center px-4 py-3 group-hover:bg-white transition-all font-black"
              style={{
                background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                borderRadius: '14px',
                boxShadow: '0 5px 0 #991B1B, 0 6px 10px rgba(0,0,0,0.4)',
                transform: 'translateY(0)',
                transition: 'all 0.2s ease',
                borderBottom: '3px solid #991B1B',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(2px)';
                e.currentTarget.style.boxShadow = '0 3px 0 #991B1B, 0 4px 8px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 0 #991B1B, 0 6px 10px rgba(0,0,0,0.4)';
              }}
            >
              <span className="text-base md:text-lg">JOUER MAINTENANT</span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta(link)}
      className="w-full max-w-[200px] mx-auto mb-6 overflow-hidden transform transition-all duration-200 py-1"
      style={{
        background: 'linear-gradient(135deg, #E53935 0%, #FF6F61 100%)',
        borderRadius: '12px',
        boxShadow: '0 4px 0 #B71C1C, 0 6px 12px rgba(0,0,0,0.4)',
        borderBottom: '3px solid #B71C1C',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02) translateY(1px)';
        e.currentTarget.style.boxShadow = '0 3px 0 #B71C1C, 0 5px 10px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 0 #B71C1C, 0 6px 12px rgba(0,0,0,0.4)';
      }}
    >
      <div className="px-4 flex items-center">
        <div className="bg-white/20 rounded-full p-2 mr-2">
          <Send size={16} className="text-white" />
        </div>
        <div className="flex-1 mr-2">
          <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
          <p className="text-white/90 text-xs font-medium">{description}</p>
        </div>
      </div>
    </a>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, icon }) => (
  <div className="mb-3">
    <button
      type="button"
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
          style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
            boxShadow: '0 3px 6px rgba(255, 107, 107, 0.4)',
          }}
        >
          {icon}
        </div>
        <span className="font-bold text-slate-900 text-xs md:text-sm leading-tight">{question}</span>
      </div>
      {isOpen ? (
        <ChevronUp className="text-slate-700 flex-shrink-0 ml-2" size={18} />
      ) : (
        <ChevronDown className="text-slate-700 flex-shrink-0 ml-2" size={18} />
      )}
    </button>
    {isOpen && (
      <div className="p-3 md:p-4 bg-white/90 backdrop-blur-sm rounded-lg mt-2 shadow-inner">
        <div
          className="text-slate-800 leading-relaxed whitespace-pre-wrap font-medium text-xs md:text-sm"
          dangerouslySetInnerHTML={{
            __html: answer.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>'),
          }}
          style={{ textShadow: '0 1px 2px rgba(255,255,255,0.1)' }}
        />
      </div>
    )}
  </div>
);

const FAQ: React.FC<{ link: string }> = ({ link }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Y a-t-il un bonus si je dépose ?',
      answer:
        "💬 **Oui, et c'est automatique.**\nDès que vous déposez **au moins 10€**, votre dépôt est **doublé instantanément** — **pas besoin de code promo.**\n\n> 🔥 Vous déposez 20€ ➝ vous jouez avec 40€\n> 💸 Vous déposez 100€ ➝ vous jouez directement avec 200€\n\n✅ Le bonus **x2 est garanti** à chaque dépôt, quel que soit le montant.\nEt si vous jouez juste après, vous avez souvent aussi un petit bonus surprise 🎉",
      icon: <Plus size={20} className="text-white drop-shadow-sm" />,
    },
    {
      question: "Peut-on retirer l'argent ?",
      answer:
        '💬 **Bien sûr !**\n\nDès que vous avez gagné, vous pouvez retirer sur votre compte bancaire et vous recevrez sous **2 jours** sur votre compte comme un virement classique. 💳\n\n✨ **Simple et rapide :**\n> 🏦 Demande de retrait\n> ⏱️ Traitement sous 2h\n> 💸 Virement sur votre compte',
      icon: <Wallet size={20} className="text-white drop-shadow-sm" />,
    },
    {
      question: 'Où sont les jeux ?',
      answer:
        '🎮 Une fois inscrit et connecté, et fait votre **premier dépôt** :\n\n> 🎲 Accès aux **mini-jeux exclusifs**\n> 🎯 **Interface intuitive**\n> 🌟 **Bonus spéciaux** débloqués\n\n⚡ Tout est **instantané** après votre dépôt !',
      icon: <Gamepad2 size={20} className="text-white drop-shadow-sm" />,
    },
    {
      question: "C'est fiable ?",
      answer:
        "🔒 **Absolument sûr et certifié !**\n\n✅ Site de jeu **officiellement certifié**\n✅ Actif dans **plusieurs pays**\n✅ **Paiements sécurisés**\n\n🎯 Notre philosophie :\n> 💫 Vous déposez\n> 🎮 Vous jouez\n> 💸 Vous retirez\n\n**Simple. Sans complications.** ✨",
      icon: <Lock size={20} className="text-white drop-shadow-sm" />,
    },
    {
      question: "C'est quoi exactement le jeu ?",
      answer:
        '🎮 **Mini-jeu ultra rapide et simple :**\n\n> ⚡ Il suffit de **quelques clics**\n> 💫 Possibilité de **doubler instantanément**\n> 🔥 Le même jeu que vous voyez sur **TikTok** et **Insta** !',
      icon: <HelpCircle size={20} className="text-white drop-shadow-sm" />,
    },
    {
      question: 'Ça marche sur téléphone ?',
      answer:
        "📱 **100% compatible mobile !**\n\n✨ Optimisé pour votre téléphone\n🚀 **Interface fluide** et intuitive\n💫 Pas besoin d'ordinateur\n\n**Tout se fait depuis votre téléphone** en quelques clics ! 🎯",
      icon: <Phone size={20} className="text-white drop-shadow-sm" />,
    },
    {
      question: 'Je peux essayer sans déposer ?',
      answer:
        "🔍 **Voici comment ça marche :**\n\n✅ **Explorer le site** : Gratuit\n🎮 **Accès aux jeux** : Après le dépôt\n💎 **Dépôt minimum** : 20€\n\n⭐ **Notre conseil :** Commencez avec le minimum pour essayer !",
      icon: <CheckCircle2 size={20} className="text-white drop-shadow-sm" />,
    },
    {
      question: "C'est quoi le minimum pour jouer ?",
      answer:
        '💫 **Commencez avec seulement 20€ !**\n\n> 🎯 **Parfait pour essayer**\n> 🎁 Bonus **doublé automatiquement**\n> ⭐ Accès à **tous les jeux**\n\n✨ Pas besoin de mettre plus pour la première fois !',
      icon: <CreditCard size={20} className="text-white drop-shadow-sm" />,
    },
    {
      question: "Je ne trouve pas le bouton pour jouer, où est-il ?",
      answer:
        '🎮 **Très simple à trouver :**\n\n> 📱 Faites défiler jusqu\'en **bas de la page**\n> 🎯 Cliquez sur le bouton **"Commencer à jouer"**\n> ⚡ Le mini-jeu se lance **instantanément**\n\n✨ Et c\'est parti pour jouer ! 🎲',
      icon: <Clock size={20} className="text-white drop-shadow-sm" />,
    },
    {
      question: "Si c'était vraiment rentable, tout le monde serait riche, non ?",
      answer:
        '💬 **Pas vraiment.**\n\nCeux qui perdent, ce sont souvent ceux qui s\'emballent et parient tout leur solde en un seul coup.\nOui, vous pouvez gagner beaucoup en une seconde…\n\n💥 **Mais vous pouvez aussi tout perdre d\'un coup.**\n\n🎯 **Les joueurs qui s\'en sortent bien sont ceux qui :**\n\n✅ gèrent leur budget\n✅ savent quand s\'arrêter\n✅ exploitent les bonus intelligemment\n\n📌 **Donc non, ce n\'est pas une arnaque.**\nMais si vous jouez comme un fou, vous aurez les résultats d\'un fou.\n\n**Jouez intelligemment. Pas comme un fou, jouez exactement comme dans la vidéo de mon Tutoriel ci-dessus.** 🧠💸',
      icon: <PiggyBank size={20} className="text-white drop-shadow-sm" />,
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <h2
        className="text-2xl md:text-3xl font-black mb-6 text-center"
        style={{
          color: '#FFF8F0',
          textShadow: '0 2px 16px rgba(0,0,0,0.28)',
        }}
      >
        Questions Fréquentes ❓
      </h2>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => {
            haptics.light();
            setOpenIndex(openIndex === index ? null : index);
          }}
          icon={faq.icon}
        />
      ))}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCta(link)}
        className="w-full text-white font-black py-4 md:py-5 px-6 text-center text-lg md:text-xl flex items-center justify-center mt-8 transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
          borderRadius: '14px',
          boxShadow: '0 5px 0 #991B1B, 0 6px 12px rgba(0,0,0,0.4)',
          borderBottom: '3px solid #991B1B',
          textShadow: '0 1px 2px rgba(0,0,0,0.25)',
          transform: 'translateY(0)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(2px)';
          e.currentTarget.style.boxShadow = '0 3px 0 #991B1B, 0 4px 10px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 5px 0 #991B1B, 0 6px 12px rgba(0,0,0,0.4)';
        }}
      >
        COMMENCER À JOUER 🎮
      </a>
    </div>
  );
};

interface TestimonialProps {
  image: string;
  gain: string;
  date: string;
  isActive: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({ image, gain, date, isActive }) => (
  <div
    className={`absolute inset-x-0 top-0 w-full transition-all duration-300 transform ${
      isActive ? 'z-10 opacity-100 translate-x-0' : 'z-0 pointer-events-none opacity-0 translate-x-4'
    }`}
  >
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-2xl shadow-slate-900/30">
      <div className="relative pb-[160%] md:pb-[170%] mb-3">
        <img
          src={image}
          alt={`Gain de ${gain}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="flex justify-between items-center">
        <div
          className="font-black text-lg md:text-xl"
          style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          +{gain}
        </div>
        <div className="text-xs md:text-sm text-slate-600 font-semibold">{date}</div>
      </div>
    </div>
  </div>
);

const NavigationDot: React.FC<{ active: boolean; onClick: () => void }> = ({ active, onClick }) => (
  <button
    type="button"
    onClick={() => {
      haptics.light();
      onClick();
    }}
    className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${active ? 'w-4' : ''}`}
    style={{
      background: active ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' : '#94A3B8',
    }}
  />
);

const NavigationButton: React.FC<{ direction: 'prev' | 'next'; onClick: () => void }> = ({
  direction,
  onClick,
}) => (
  <button
    type="button"
    onClick={() => {
      haptics.light();
      onClick();
    }}
    className="absolute top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2
    hover:bg-white transition-all duration-300 shadow-lg shadow-slate-900/30"
    style={{ [direction === 'prev' ? 'left' : 'right']: '8px' }}
  >
    {direction === 'prev' ? (
      <ChevronLeft size={20} className="text-slate-700" />
    ) : (
      <ChevronRight size={20} className="text-slate-700" />
    )}
  </button>
);

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    { image: 'https://i.ibb.co/bMVY3TPk/IMG-5935.png', gain: '200€', date: 'Il y a 2h' },
    { image: 'https://i.ibb.co/V0j0BbF9/IMG-5914.jpg', gain: '140€', date: 'Il y a 46min' },
    { image: 'https://i.ibb.co/qYWJC0LT/IMG-5936.png', gain: '184€', date: 'Il y a 35min' },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8 md:mb-12 relative z-0 isolate">
      <h2
        className="text-2xl md:text-3xl font-black mb-6 text-center"
        style={{
          color: '#FFF8F0',
          textShadow: '0 2px 16px rgba(0,0,0,0.28)',
        }}
      >
        Gains Récents 💸
      </h2>
      {/*
        Hauteur mini = image (~160% de la largeur de carte) + pied de carte + paddings.
        Avant: h-[540px] trop bas → les slides en absolute débordaient par-dessus la FAQ.
      */}
      <div className="relative min-h-[760px] md:min-h-[820px] overflow-hidden rounded-2xl">
        <NavigationButton direction="prev" onClick={() => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length)} />
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} isActive={index === currentIndex} />
        ))}
        <NavigationButton direction="next" onClick={() => setCurrentIndex((p) => (p + 1) % testimonials.length)} />
      </div>
      <div className="flex justify-center items-center mt-4">
        {testimonials.map((_, index) => (
          <NavigationDot
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const Footer: React.FC<{ telegramContact?: string }> = ({ telegramContact }) => {
  const tg = affiliateTelegramUrl(telegramContact);
  return (
    <footer className="w-full text-center py-8">
      <a
        href={tg}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => haptics.light()}
        className="inline-block px-4 py-2 text-xs text-white/80 hover:text-white transition-colors drop-shadow-md"
      >
        Devenir affilié
      </a>
    </footer>
  );
};

const StickyButton: React.FC<{ link: string }> = ({ link }) => (
  <div className="fixed bottom-6 md:bottom-8 left-0 right-0 z-50 px-4 pointer-events-none">
    <div className="max-w-lg mx-auto pointer-events-auto">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCta(link)}
        className="block w-full text-white font-black py-3.5 md:py-4 px-5 text-center text-base md:text-lg transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
          borderRadius: '14px',
          boxShadow: '0 5px 0 #991B1B, 0 6px 12px rgba(0,0,0,0.4)',
          borderBottom: '3px solid #991B1B',
          textShadow: '0 1px 2px rgba(0,0,0,0.25)',
          transform: 'translateY(0)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(2px)';
          e.currentTarget.style.boxShadow = '0 3px 0 #991B1B, 0 4px 10px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 5px 0 #991B1B, 0 6px 12px rgba(0,0,0,0.4)';
        }}
      >
        🎮 JOUER MAINTENANT
      </a>
    </div>
  </div>
);

const NinjaCrashLayout: React.FC<NinjaCrashLayoutProps> = ({ currentLink, name, photo, bio = '', telegramContact }) => {
  useScrollHaptics();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root');
    const prevHtmlStyle = html.getAttribute('style');
    const prevBodyStyle = body.getAttribute('style');
    const prevRootStyle = root?.getAttribute('style') ?? null;

    let themeMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    const createdThemeMeta = !themeMeta;
    const prevThemeColor = themeMeta?.getAttribute('content');
    if (!themeMeta) {
      themeMeta = document.createElement('meta');
      themeMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeMeta);
    }
    themeMeta.setAttribute('content', NINJA_THEME_COLOR);

    const styleEl = document.createElement('style');
    styleEl.id = NINJA_THEME_STYLE_ID;
    styleEl.textContent = `
      html {
        background: ${NINJA_THEME_COLOR} !important;
      }
      body {
        background: transparent !important;
      }
      body::before {
        background: linear-gradient(165deg, #7a4549 0%, #5c3538 35%, #4a2c30 70%, #3d2528 100%) !important;
      }
    `;
    document.head.appendChild(styleEl);

    if (root) {
      root.style.background = 'transparent';
      root.style.minHeight = '100vh';
    }

    return () => {
      styleEl.remove();
      if (createdThemeMeta) {
        themeMeta?.remove();
      } else if (themeMeta) {
        if (prevThemeColor) themeMeta.setAttribute('content', prevThemeColor);
        else themeMeta.removeAttribute('content');
      }
      if (prevHtmlStyle !== null) html.setAttribute('style', prevHtmlStyle);
      else html.removeAttribute('style');
      if (prevBodyStyle !== null) body.setAttribute('style', prevBodyStyle);
      else body.removeAttribute('style');
      if (root) {
        if (prevRootStyle !== null) root.setAttribute('style', prevRootStyle);
        else root.removeAttribute('style');
      }
    };
  }, []);

  const primaryBonus = {
    title: 'OFFRE DE BIENVENUE 🎁',
    description: "Votre argent est automatiquement doublé lors de l'inscription !",
    link: currentLink,
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center relative"
      style={{ backgroundColor: '#5c3538' }}
    >
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/ninjacrash-repo-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: '1',
        }}
      />
      <div className="w-full max-w-lg mx-auto py-6 md:py-8 px-4 flex flex-col items-center pb-28 gap-8 md:gap-12 relative z-10">
        <div data-haptic className="w-full">
          <ProfileSection name={name} bio={bio} photo={photo} />
        </div>
        <div data-haptic className="w-full">
          <BonusBanner
            title={primaryBonus.title}
            description={primaryBonus.description}
            link={primaryBonus.link}
            isPrimary={true}
          />
        </div>
        <div data-haptic className="w-full">
          <Testimonials />
        </div>
        <div data-haptic className="w-full relative z-10">
          <FAQ link={currentLink} />
        </div>
        <Footer telegramContact={telegramContact} />
      </div>
      <StickyButton link={currentLink} />
    </div>
  );
};

export default NinjaCrashLayout;
