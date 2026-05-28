import React, { useState } from 'react';
import { ExternalLink, Gift, Send, TrendingUp, ChevronDown, ChevronUp, CheckCircle2, Clock, CreditCard, Gamepad2, HelpCircle, Lock, Phone, PiggyBank, Plus, Wallet, AlertCircle } from 'lucide-react';
import { getCurrentAffiliate } from '../config/affiliates';
import { isTikTokInAppBrowser, fireSpártaPixelForUrl, fireAprilPixelForUrl } from '../utils/linkManager';
import { affiliateTelegramUrl } from '../utils/affiliateTelegramUrl';
import haptics from '../utils/haptics';
import useScrollHaptics from '../hooks/useScrollHaptics';
import taapitLinks from '../config/taapit-links.json';

interface ChickenLayoutProps {
  currentLink: string;
  name: string;
  telegramContact?: string;
}

// ── Profile ────────────────────────────────────────────────────────────────

const ChickenProfile: React.FC<{ name: string }> = ({ name }) => (
  <div className="w-full flex flex-col items-center text-center mb-4 px-4">
    <h1
      className="text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-lg"
      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
    >
      {name}
    </h1>
  </div>
);

// ── Bonus Banner ───────────────────────────────────────────────────────────

const ChickenBonusBanner: React.FC<{ link: string }> = ({ link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); }}
    className="w-full max-w-md mx-auto mb-4 block group"
  >
    <div
      className="relative rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
        boxShadow: '0 8px 30px rgba(25, 118, 210, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.3)',
      }}
    >
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6))',
          boxShadow:
            'inset 0 0 40px 10px rgba(25, 118, 210, 0.2), inset 0 0 60px 15px rgba(66, 165, 245, 0.15), inset 0 0 80px 20px rgba(33, 150, 243, 0.35)',
        }}
      />

      <img
        src="https://i.ibb.co/7dHPnW9G/17cbd975-704e-4ffc-9db8-b477246b8b58.png"
        alt=""
        className="w-full h-48 object-cover object-center"
        style={{
          filter:
            'drop-shadow(0 0 40px rgba(25, 118, 210, 0.6)) drop-shadow(0 0 80px rgba(66, 165, 245, 0.4)) drop-shadow(0 0 120px rgba(33, 150, 243, 0.3))',
        }}
      />

      <div className="relative z-20 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Gift size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3
              className="text-xl font-black text-white tracking-tight mb-1"
              style={{
                textShadow:
                  '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.5)',
              }}
            >
              OFFRE DE BIENVENUE 🎁
            </h3>
            <div className="flex items-center gap-2 text-white/90 text-sm font-semibold mb-2">
              <TrendingUp size={16} />
              <span>100% de Bonus</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/20">
          <p className="text-white text-sm font-bold mb-2 flex items-center gap-2">
            <span className="text-2xl">💝</span>
            Comment ça marche ?
          </p>
          <p className="text-white/95 text-sm leading-relaxed">
            <span className="font-bold" style={{ color: '#F4B400' }}>Déposez 10€</span> →
            <span className="font-bold" style={{ color: '#90EE90' }}> Recevez 20€</span>
            <br />
            <span className="text-xs text-white/80">Votre argent est automatiquement doublé !</span>
          </p>
        </div>

        <div
          className="flex items-center justify-between bg-white/95 backdrop-blur-sm px-4 py-3 group-hover:bg-white transition-all"
          style={{
            borderRadius: '14px',
            boxShadow: '0 5px 0 #1565C0, 0 6px 10px rgba(0,0,0,0.4), 0 0 0 3px rgba(25, 118, 210, 0.3)',
            borderBottom: '3px solid #1565C0',
          }}
        >
          <span
            className="font-black text-base"
            style={{
              color: '#1976D2',
              textShadow: '-1px -1px 0 #FFF4E0, 1px -1px 0 #FFF4E0, -1px 1px 0 #FFF4E0, 1px 1px 0 #FFF4E0',
            }}
          >
            JOUER
          </span>
          <ExternalLink size={18} style={{ color: '#1976D2' }} />
        </div>
      </div>
    </div>
  </a>
);

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

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, icon, iconBg, hasImage, imageUrl }) => (
  <div className="mb-3">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 bg-white/95 backdrop-blur-sm text-left transition-all duration-200"
      style={{
        borderRadius: '12px',
        boxShadow: '0 3px 0 #D0D0D0, 0 5px 10px rgba(0,0,0,0.3)',
        borderBottom: '3px solid #D0D0D0',
      }}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div
          className="rounded-full p-1.5 mr-2.5 shadow-md flex-shrink-0"
          style={iconBg || {
            background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
            boxShadow: '0 3px 6px rgba(25, 118, 210, 0.4)',
          }}
        >
          {icon}
        </div>
        <span className="font-bold text-slate-800 text-sm leading-tight">{question}</span>
      </div>
      {isOpen ? <ChevronUp className="text-slate-700 flex-shrink-0 ml-2" size={18} /> : <ChevronDown className="text-slate-700 flex-shrink-0 ml-2" size={18} />}
    </button>
    {isOpen && (
      <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg mt-2 shadow-inner">
        {hasImage && imageUrl && (
          <div className="mb-3 flex justify-center">
            <img src={imageUrl} alt="Problème d'accès" className="max-w-[120px] sm:max-w-[150px] h-auto rounded-lg shadow-md" loading="eager" />
          </div>
        )}
        <div
          className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium text-sm"
          dangerouslySetInnerHTML={{
            __html: answer.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>'),
          }}
          style={{ textShadow: '0 1px 2px rgba(255,255,255,0.1)' }}
        />
      </div>
    )}
  </div>
);

const FAQS = [
  {
    question: "Y a-t-il un bonus si je dépose ?",
    answer: "💬 **Oui, et c'est automatique.**\nDès que vous déposez **au moins 10€**, votre dépôt est **doublé instantanément** — **pas besoin de code promo.**\n\n> 🔥 Vous déposez 20€ ➝ vous jouez avec 40€\n> 💸 Vous déposez 100€ ➝ vous jouez directement avec 200€\n\n✅ Le bonus **x2 est garanti** à chaque dépôt, quel que soit le montant.\nEt si vous jouez juste après, vous avez souvent aussi un petit bonus surprise 🎉",
    icon: <Plus size={20} className="text-white drop-shadow-sm" />,
  },
  {
    question: "Peut-on retirer l'argent ?",
    answer: "💬 **Bien sûr !**\n\nDès que vous avez gagné, vous pouvez retirer sur votre compte bancaire et vous recevrez sous **2 jours** sur votre compte comme un virement classique. 💳\n\n✨ **Simple et rapide :**\n> 🏦 Demande de retrait\n> ⏱️ Traitement sous 2h\n> 💸 Virement sur votre compte",
    icon: <Wallet size={20} className="text-white drop-shadow-sm" />,
  },
  {
    question: "Où sont les jeux ?",
    answer: "🎮 Une fois inscrit et connecté, et fait votre **premier dépôt** :\n\n> 🎲 Accès aux **mini-jeux exclusifs**\n> 🎯 **Interface intuitive**\n> 🌟 **Bonus spéciaux** débloqués\n\n⚡ Tout est **instantané** après votre dépôt !",
    icon: <Gamepad2 size={20} className="text-white drop-shadow-sm" />,
  },
  {
    question: "C'est fiable ?",
    answer: "🔒 **Absolument sûr et certifié !**\n\n✅ Site de jeu **officiellement certifié**\n✅ Actif dans **plusieurs pays**\n✅ **Paiements sécurisés**\n\n🎯 Notre philosophie :\n> 💫 Vous déposez\n> 🎮 Vous jouez\n> 💸 Vous retirez\n\n**Simple. Sans complications.** ✨",
    icon: <Lock size={20} className="text-white drop-shadow-sm" />,
  },
  {
    question: "C'est quoi exactement le jeu ?",
    answer: "🎮 **Mini-jeu ultra rapide et simple :**\n\n> ⚡ Il suffit de **quelques clics**\n> 💫 Possibilité de **doubler instantanément**\n> 🔥 Le même jeu que vous voyez sur **TikTok** et **Insta** !",
    icon: <HelpCircle size={20} className="text-white drop-shadow-sm" />,
  },
  {
    question: "Ça marche sur téléphone ?",
    answer: "📱 **100% compatible mobile !**\n\n✨ Optimisé pour votre téléphone\n🚀 **Interface fluide** et intuitive\n💫 Pas besoin d'ordinateur\n\n**Tout se fait depuis votre téléphone** en quelques clics ! 🎯",
    icon: <Phone size={20} className="text-white drop-shadow-sm" />,
  },
  {
    question: "Je peux essayer sans déposer ?",
    answer: "🔍 **Voici comment ça marche :**\n\n✅ **Explorer le site** : Gratuit\n🎮 **Accès aux jeux** : Après le dépôt\n💎 **Dépôt minimum** : 20€\n\n⭐ **Notre conseil :** Commencez avec le minimum pour essayer !",
    icon: <CheckCircle2 size={20} className="text-white drop-shadow-sm" />,
  },
  {
    question: "C'est quoi le minimum pour jouer ?",
    answer: "💫 **Commencez avec seulement 20€ !**\n\n> 🎯 **Parfait pour essayer**\n> 🎁 Bonus **doublé automatiquement**\n> ⭐ Accès à **tous les jeux**\n\n✨ Pas besoin de mettre plus pour la première fois !",
    icon: <CreditCard size={20} className="text-white drop-shadow-sm" />,
  },
  {
    question: "Je ne trouve pas le bouton pour jouer, où est-il ?",
    answer: "🎮 **Très simple à trouver :**\n\n> 📱 Faites défiler jusqu'en **bas de la page**\n> 🎯 Cliquez sur le bouton **\"Commencer à jouer\"**\n> ⚡ Le mini-jeu se lance **instantanément**\n\n✨ Et c'est parti pour jouer ! 🎲",
    icon: <Clock size={20} className="text-white drop-shadow-sm" />,
  },
  {
    question: "Si c'était vraiment rentable, tout le monde serait riche, non ?",
    answer: "💬 **Pas vraiment.**\n\nCeux qui perdent, ce sont souvent ceux qui s'emballent et parient tout leur solde en un seul coup.\nOui, vous pouvez gagner beaucoup en une seconde…\n\n💥 **Mais vous pouvez aussi tout perdre d'un coup.**\n\n🎯 **Les joueurs qui s'en sortent bien sont ceux qui :**\n\n✅ gèrent leur budget\n✅ savent quand s'arrêter\n✅ exploitent les bonus intelligemment\n\n📌 **Donc non, ce n'est pas une arnaque.**\nMais si vous jouez comme un fou, vous aurez les résultats d'un fou.\n\n**Jouez intelligemment. Pas comme un fou, jouez exactement comme dans la vidéo de mon Tutoriel ci-dessus.** 🧠💸",
    icon: <PiggyBank size={20} className="text-white drop-shadow-sm" />,
  },
];

const ChickenFAQ: React.FC<{ link: string }> = ({ link }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const affiliate = getCurrentAffiliate();
  const taapitMystakeLink: string | null = (taapitLinks as Record<string, string>)[affiliate?.slug || ''] || null;
  const mystakeLink = `https://checkwinmid.com/visit/?bta=36610&nci=5678&afp=z${affiliate?.slug || 'unknown'}`;
  const accessLink = (isTikTokInAppBrowser() && taapitMystakeLink) ? taapitMystakeLink : mystakeLink;
  const ACCESS_FAQ = {
    question: "Je ne peux pas accéder au site ?",
    answer: `🚫 **Si vous ne pouvez pas accéder au site**, pas de panique !\n\n💡 Vous pouvez essayer avec ce lien alternatif :\n\n👉 <a href="${accessLink}" target="_blank" style="color: #f59e0b; font-weight: bold; text-decoration: underline;">CLIQUEZ ICI</a>\n\n✅ Ce lien fonctionne **24/7** dans tous les pays !`,
    icon: <AlertCircle size={20} className="text-white drop-shadow-sm" />,
    iconBg: { background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)', boxShadow: '0 3px 6px rgba(220, 38, 38, 0.4)' } as React.CSSProperties,
    hasImage: true,
    imageUrl: "https://i.ibb.co/JFwrd7C8/IMG-1587.png"
  };
  const allFaqs = [ACCESS_FAQ, ...FAQS];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2
        className="text-2xl font-black text-white mb-5 text-center"
        style={{
          textShadow: '-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, 0 5px 10px rgba(0,0,0,0.6)',
          color: '#FFF4E0',
        }}
      >
        Questions Fréquentes ❓
      </h2>

      {allFaqs.map((faq, index) => (
        <FAQItem
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
        className="w-full text-white font-black py-5 px-6 text-center text-xl flex items-center justify-center mt-8 transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
          borderRadius: '18px',
          boxShadow: '0 6px 0 #0D47A1, 0 10px 20px rgba(0,0,0,0.5)',
          borderBottom: '5px solid #0D47A1',
          textShadow:
            '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.7)',
        }}
      >
        COMMENCER À JOUER 🎮
      </a>
    </div>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────────

const ChickenFooter: React.FC<{ telegramContact?: string }> = ({ telegramContact }) => (
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
      💼 Devenir affilié
    </a>
  </footer>
);

// ── Sticky Button ──────────────────────────────────────────────────────────

const ChickenStickyButton: React.FC<{ link: string }> = ({ link }) => (
  <div className="fixed bottom-8 left-0 right-0 z-50 px-4 pointer-events-none">
    <div className="max-w-lg mx-auto pointer-events-auto">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => { haptics.heavy(); fireSpártaPixelForUrl(link); fireAprilPixelForUrl(link); }}
        className="block w-full text-white font-black py-3 px-5 text-center text-base transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
          borderRadius: '14px',
          boxShadow: '0 5px 0 #0D47A1, 0 6px 12px rgba(0,0,0,0.4)',
          borderBottom: '3px solid #0D47A1',
          textShadow:
            '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 3px 6px rgba(0,0,0,0.6)',
        }}
      >
        🎮 JOUER MAINTENANT
      </a>
    </div>
  </div>
);

// ── Main Layout ────────────────────────────────────────────────────────────

const ChickenLayout: React.FC<ChickenLayoutProps> = ({ currentLink, name, telegramContact }) => {
  useScrollHaptics();
  return (
  <div
    className="min-h-screen flex flex-col items-center"
    style={{
      backgroundImage: 'url(/chicken-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundColor: '#283655',
    }}
  >
    <div className="w-full max-w-lg mx-auto py-4 px-4 flex flex-col items-center pb-24">
      <ChickenProfile name={name} />
      <div data-haptic className="w-full"><ChickenBonusBanner link={currentLink} /></div>
      <div data-haptic className="w-full"><ChickenFAQ link={currentLink} /></div>
      <ChickenFooter telegramContact={telegramContact} />
    </div>
    <ChickenStickyButton link={currentLink} />
  </div>
  );
};

export default ChickenLayout;
