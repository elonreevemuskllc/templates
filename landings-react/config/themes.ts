export type ThemeType = 'tower-rush' | 'megablock' | 'jeu-piano' | 'penalty' | 'chicken' | 'general' | 'general-dark' | 'general-sober' | 'ninja-crash';

export interface Theme {
  id: ThemeType;
  name: string;
  colors: {
    // Gradient principal du fond
    backgroundGradient: string;
    // Gradient du banner principal (remplace orange/amber)
    primaryGradient: string;
    primaryGradientHover: string;
    // Couleurs d'accentuation
    shadowColor: string;
    glowColors: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    // Bouton sticky
    stickyButtonGradient: string;
    // Texte CTA
    ctaTextColor: string;
  };
  images: {
    welcomeOfferImage: string;
  };
  // Image de fond optionnelle (remplace le gradient si définie)
  backgroundImage?: string;
  /** Remplissage des gros CTA (layout TowerRush) — ex. megablock */
  towerCtaFillHex?: string;
  /** Style carte offre de bienvenue (layout TowerRush) */
  welcomeOfferStyle?: 'default' | 'blueWhite';
}

export const themes: Record<ThemeType, Theme> = {
  'tower-rush': {
    id: 'tower-rush',
    name: 'Tower Rush',
    colors: {
      backgroundGradient: 'from-sky-400 via-blue-400 to-blue-500',
      primaryGradient: 'from-amber-500 via-orange-500 to-yellow-400',
      primaryGradientHover: 'from-amber-300 hover:to-orange-400',
      shadowColor: 'shadow-cyan-400/40 hover:shadow-cyan-400/60',
      glowColors: {
        primary: 'rgba(251, 191, 36, 0.6)',  // amber
        secondary: 'rgba(249, 115, 22, 0.4)', // orange
        tertiary: 'rgba(14, 165, 233, 0.3)',  // sky
      },
      stickyButtonGradient: 'from-orange-400 to-orange-600',
      ctaTextColor: 'text-orange-600',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/C3NQRkVh/8d242072-0118-4598-a67d-4154a75387a4.png',
    },
  },
  'megablock': {
    id: 'megablock',
    name: 'Mega Block',
    colors: {
      backgroundGradient: 'from-sky-400 via-blue-400 to-blue-500',
      primaryGradient: 'from-amber-500 via-orange-500 to-yellow-400',
      primaryGradientHover: 'from-amber-300 hover:to-orange-400',
      shadowColor: 'shadow-cyan-400/40 hover:shadow-cyan-400/60',
      glowColors: {
        primary: 'rgba(251, 191, 36, 0.6)',
        secondary: 'rgba(249, 115, 22, 0.4)',
        tertiary: 'rgba(14, 165, 233, 0.3)',
      },
      stickyButtonGradient: 'from-orange-400 to-orange-600',
      ctaTextColor: 'text-orange-600',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/C5JWpyp3/image.png',
    },
    backgroundImage: 'https://i.ibb.co/vxWrGG6C/585c80a8-a7ae-4137-96b9-4cae3d7ce4fd.png',
    towerCtaFillHex: '#FFAD54',
    welcomeOfferStyle: 'blueWhite',
  },
  'jeu-piano': {
    id: 'jeu-piano',
    name: 'Jeu du Piano',
    colors: {
      backgroundGradient: 'from-purple-400 via-violet-400 to-purple-500',
      primaryGradient: 'from-purple-400 via-violet-500 to-purple-300',
      primaryGradientHover: 'from-purple-300 hover:to-violet-400',
      shadowColor: 'shadow-purple-400/40 hover:shadow-purple-400/60',
      glowColors: {
        primary: 'rgba(192, 132, 252, 0.6)',  // purple-400
        secondary: 'rgba(167, 139, 250, 0.4)', // violet-400
        tertiary: 'rgba(216, 180, 254, 0.3)',  // purple-300
      },
      stickyButtonGradient: 'from-violet-400 to-violet-600',
      ctaTextColor: 'text-violet-600',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/fGtmfBnG/b96e931a-3b33-4880-8f55-e1a7847b44ed.png',
    },
  },
  'penalty': {
    id: 'penalty',
    name: 'Penalty (Galaxie)',
    colors: {
      // Fond sombre avec dégradé galactique
      backgroundGradient: 'from-[#0f1318] via-[#1a1d29] to-[#2d1b4e]',
      // Gradient violet-bleu pour les boutons
      primaryGradient: 'from-[#8b5cf6] via-[#3b82f6] to-[#8b5cf6]',
      primaryGradientHover: 'from-[#a78bfa] via-[#60a5fa] to-[#a78bfa]',
      // Ombre violette lumineuse
      shadowColor: 'shadow-purple-500/50 hover:shadow-purple-500/70',
      glowColors: {
        primary: 'rgba(139, 92, 246, 0.6)',  // violet-500
        secondary: 'rgba(59, 130, 246, 0.4)', // blue-500
        tertiary: 'rgba(167, 139, 250, 0.3)', // violet-400
      },
      stickyButtonGradient: 'from-[#8b5cf6] to-[#3b82f6]',
      ctaTextColor: 'text-purple-400',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/XfqgQ3wC/DIELS-MK.png',
    },
  },
  'chicken': {
    id: 'chicken',
    name: 'Chicken 🐔',
    colors: {
      // Fond bleu marine (fallback si l'image ne charge pas)
      backgroundGradient: 'from-[#1a2a4a] via-[#283655] to-[#1a2a4a]',
      // Gradient bleu ciel pour les boutons
      primaryGradient: 'from-[#1976D2] via-[#42A5F5] to-[#1976D2]',
      primaryGradientHover: 'from-[#1565C0] via-[#1976D2] to-[#1565C0]',
      // Ombre bleue
      shadowColor: 'shadow-blue-500/50 hover:shadow-blue-500/70',
      glowColors: {
        primary: 'rgba(25, 118, 210, 0.6)',   // #1976D2
        secondary: 'rgba(66, 165, 245, 0.4)', // #42A5F5
        tertiary: 'rgba(13, 71, 161, 0.3)',   // #0D47A1
      },
      stickyButtonGradient: 'from-[#1976D2] to-[#42A5F5]',
      ctaTextColor: 'text-blue-600',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/7dHPnW9G/17cbd975-704e-4ffc-9db8-b477246b8b58.png',
    },
    backgroundImage: '/chicken-bg.png',
  },
  'general': {
    id: 'general',
    name: 'Général 🎮',
    colors: {
      backgroundGradient: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
      primaryGradient: 'from-[#FF8C00] via-[#FFA500] to-[#FF8C00]',
      primaryGradientHover: 'from-[#FF6600] via-[#FF8C00] to-[#FF6600]',
      shadowColor: 'shadow-orange-500/50 hover:shadow-orange-500/70',
      glowColors: {
        primary: 'rgba(255, 140, 0, 0.6)',
        secondary: 'rgba(255, 165, 0, 0.4)',
        tertiary: 'rgba(204, 102, 0, 0.3)',
      },
      stickyButtonGradient: 'from-[#FF8C00] to-[#FFA500]',
      ctaTextColor: 'text-orange-500',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/chCd4FgR/d3996ede-ba73-4978-9cc5-d81cc4a35b05.png',
    },
    backgroundImage: 'https://i.ibb.co/chCd4FgR/d3996ede-ba73-4978-9cc5-d81cc4a35b05.png',
  },
  'general-dark': {
    id: 'general-dark',
    name: 'Général sombre 🌙',
    colors: {
      backgroundGradient: 'from-[#050508] via-[#0c0f18] to-[#121826]',
      primaryGradient: 'from-[#22d3ee] via-[#6366f1] to-[#a855f7]',
      primaryGradientHover: 'from-[#67e8f9] hover:to-[#818cf8]',
      shadowColor: 'shadow-cyan-500/40 hover:shadow-violet-500/50',
      glowColors: {
        primary: 'rgba(34, 211, 238, 0.45)',
        secondary: 'rgba(99, 102, 241, 0.35)',
        tertiary: 'rgba(168, 85, 247, 0.25)',
      },
      stickyButtonGradient: 'from-[#0891b2] to-[#4f46e5]',
      ctaTextColor: 'text-cyan-100',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/chCd4FgR/d3996ede-ba73-4978-9cc5-d81cc4a35b05.png',
    },
    backgroundImage: 'https://i.ibb.co/chCd4FgR/d3996ede-ba73-4978-9cc5-d81cc4a35b05.png',
  },
  'general-sober': {
    id: 'general-sober',
    name: 'Général sobre',
    colors: {
      backgroundGradient: 'from-slate-950 via-slate-900 to-slate-950',
      primaryGradient: 'from-slate-600 via-slate-500 to-slate-600',
      primaryGradientHover: 'from-slate-500 hover:to-slate-400',
      shadowColor: 'shadow-slate-900/50',
      glowColors: {
        primary: 'rgba(148, 163, 184, 0.15)',
        secondary: 'rgba(100, 116, 139, 0.12)',
        tertiary: 'rgba(71, 85, 105, 0.1)',
      },
      stickyButtonGradient: 'from-slate-100 to-slate-200',
      ctaTextColor: 'text-slate-900',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/chCd4FgR/d3996ede-ba73-4978-9cc5-d81cc4a35b05.png',
    },
  },
  'chicken': {
    id: 'chicken',
    name: 'Chicken Road',
    colors: {
      backgroundGradient: 'from-yellow-400 via-orange-400 to-red-500',
      primaryGradient: 'from-amber-500 via-orange-500 to-yellow-400',
      primaryGradientHover: 'from-amber-300 hover:to-orange-400',
      shadowColor: 'shadow-orange-400/40 hover:shadow-orange-400/60',
      glowColors: {
        primary: 'rgba(251, 191, 36, 0.6)',
        secondary: 'rgba(249, 115, 22, 0.4)',
        tertiary: 'rgba(239, 68, 68, 0.3)',
      },
      stickyButtonGradient: 'from-orange-400 to-orange-600',
      ctaTextColor: 'text-orange-600',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/C3NQRkVh/8d242072-0118-4598-a67d-4154a75387a4.png',
    },
  },
  'ninja-crash': {
    id: 'ninja-crash',
    name: 'Ninja Crash 🥷',
    colors: {
      backgroundGradient: 'from-[#0f0a1a] via-[#1a1a2e] to-[#16213e]',
      primaryGradient: 'from-[#ff4444] via-[#ff6600] to-[#ff8800]',
      primaryGradientHover: 'from-[#ff2222] via-[#ff4444] to-[#ff6600]',
      shadowColor: 'shadow-red-500/50 hover:shadow-red-500/70',
      glowColors: {
        primary: 'rgba(255, 68, 68, 0.6)',
        secondary: 'rgba(255, 136, 0, 0.4)',
        tertiary: 'rgba(255, 102, 0, 0.3)',
      },
      stickyButtonGradient: 'from-[#ff4444] to-[#ff6600]',
      ctaTextColor: 'text-red-500',
    },
    images: {
      welcomeOfferImage: 'https://i.ibb.co/pvBLrsW2/2d494fa7-5d2f-4db9-b905-e90176a7510b.png',
    },
    backgroundImage: '/ninjacrash-repo-bg.png',
  },
};

/**
 * Récupère le thème pour un affilié
 * @param themeId - L'identifiant du thème ('tower-rush' ou 'jeu-piano')
 * @returns Le thème demandé, ou Tower Rush par défaut
 * 
 * GARANTIES DE SÉCURITÉ :
 * 1. Si themeId est undefined → Tower Rush
 * 2. Si themeId est null → Tower Rush
 * 3. Si themeId est invalide → Tower Rush
 * 4. En cas d'erreur quelconque → Tower Rush
 */
export const getTheme = (themeId?: ThemeType): Theme => {
  try {
    // Si pas de themeId ou themeId vide, retourner Tower Rush
    if (!themeId) {
      return themes['tower-rush'];
    }
    
    return themes[themeId] || themes['tower-rush'];
  } catch (error) {
    console.warn('⚠️ Erreur lors de la récupération du thème, utilisation de Tower Rush par défaut', error);
    return themes['tower-rush'];
  }
};
