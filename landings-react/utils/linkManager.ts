// ========================================
// SYSTÈME DE FAILOVER MULTI-DOMAINES
// ========================================
import { getCurrentAffiliate } from '../config/affiliates';
import taapitLinks from '../config/taapit-links.json';

// Domaines miroirs (en ordre de priorité)
const MIRROR_DOMAINS = [
  'jeutiktok.fr',      // Domaine principal
  'jeutiktok.net',     // Backup 1
  'jeutiktok.io',      // Backup 2
  'jeutiktok.com',     // Backup 3 (à configurer si vous les avez)
];

// API endpoint : même origine que la landing (ex. sab.jeutiktok.fr/api) pour éviter CORS
const API_URL = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL)
  ? (import.meta as any).env.VITE_API_URL
  : '/api';

// Timeouts géoloc : alignés avec resolveIpGeo (serveur, ip-api) — ville/pays fiables avant fallback FR
const GEO_CLIENT_TIMEOUT_MS = 4000;
const LANDING_DATA_FETCH_TIMEOUT_MS = 2500; // Fail-open Shogun si tracking-server ne répond pas vite
/** Aligné sur main.tsx — 1er JSON landing-data pour éviter un 2e round-trip au mount React */
const LANDING_DATA_BOOTSTRAP_KEY = '__landing_data_bootstrap_v1';
const LANDING_DATA_BOOTSTRAP_MAX_AGE_MS = 90_000;

// Clé API pour ipapi.co
const IPAPI_KEY = 'M3ZmorMRHUNe7BNL3Feg2Y4DJ4k5RMYZvyi5m7kf0ul7MlJPDq';

// Cache pour le domaine actif
const ACTIVE_DOMAIN_KEY = 'active_mirror_domain';
const DOMAIN_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Vérifier si un domaine est accessible
const checkDomainHealth = async (domain: string): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout
    
    const response = await fetch(`https://${domain}/`, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-cache'
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Note: Les fonctions de failover getActiveDomain et autoRedirectToMirror 
// seront réactivées une fois tous les domaines backup configurés

// Fallback principal : Shogun (fail-open casino si l'API tracking est lente/down)
// Utilisé quand l'API liens est indisponible ou timeout
const SHOGUN_WITH_AFP = (afp: string) =>
  `https://checkwinmid.com/visit/?bta=36610&nci=5678&afp=${encodeURIComponent(afp)}`;

// MyStake force-redirigé vers Shogun (plus jamais MyStake — utilisateur a explicitement banni MyStake)
// Le nom MYSTAKE_WITH_SUB1 est gardé pour compat mais retourne désormais une URL Shogun.
const MYSTAKE_WITH_SUB1 = (sub1: string) => 
  `https://checkwinmid.com/visit/?bta=36610&nci=5678&afp=${sub1}`;

// Note: getFRProvider supprimée - la gestion des providers FR est maintenant 
// dans tracking-server.cjs et la DB (affiliate_links)

// Cache du pays de l'utilisateur (24h)
const COUNTRY_CACHE_KEY = 'user_country_cache';
const COUNTRY_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures

interface LocationCache {
  country: string;
  city?: string;
  region?: string;
  regionCode?: string;
  district?: string;
  zip?: string;
  timestamp: number;
}

// Récupérer la localisation depuis le cache (si valide)
const getCachedLocation = (detailed = false): LocationCache | null => {
  try {
    const cached = localStorage.getItem(COUNTRY_CACHE_KEY);
    if (!cached) return null;
    
    const data: LocationCache = JSON.parse(cached);
    const now = Date.now();
    
    // Vérifier si le cache est encore valide (< 24h)
    if (now - data.timestamp < COUNTRY_CACHE_DURATION) {
      // En mode "détaillé", on veut des infos fines (zip/district/regionCode)
      // pour les règles geo ciblées (ex: département 66).
      if (detailed && data.country === 'FR' && !data.zip && !data.district && !data.regionCode) {
        return null;
      }
      console.log('✅ Localisation depuis cache:', data);
      return data;
    }
    
    // Cache expiré, le supprimer
    localStorage.removeItem(COUNTRY_CACHE_KEY);
    return null;
  } catch (error) {
    return null;
  }
};

// Sauvegarder la localisation dans le cache
const setCachedLocation = (
  country: string,
  city?: string,
  region?: string,
  regionCode?: string,
  district?: string,
  zip?: string
): void => {
  try {
    const data: LocationCache = {
      country,
      city,
      region,
      regionCode,
      district,
      zip,
      timestamp: Date.now()
    };
    localStorage.setItem(COUNTRY_CACHE_KEY, JSON.stringify(data));
    console.log('💾 Localisation mise en cache:', data);
  } catch (error) {
    console.error('Erreur sauvegarde cache localisation:', error);
  }
};

// Promise partagée pour éviter les appels en double (race condition)
let _pendingLocationPromise: Promise<LocationCache> | null = null;

// Détection de la localisation via notre propre serveur (évite la latence browser→ipapi.co)
const getUserLocation = async (detailed = false): Promise<LocationCache> => {
  // 1. Vérifier le cache d'abord
  const cachedLocation = getCachedLocation(detailed);
  if (cachedLocation) {
    return cachedLocation;
  }
  
  // 2. Si un appel est déjà en cours, réutiliser la même promesse
  if (_pendingLocationPromise) {
    return _pendingLocationPromise;
  }
  
  // 3. Appel via notre API serveur (~50-300ms) au lieu d'ipapi.co direct (~3-5s côté browser)
  _pendingLocationPromise = (async () => {
    try {
      console.log('🌍 Détection de la localisation via serveur...');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.warn(`⏱️ Timeout géoloc serveur dépassé (${GEO_CLIENT_TIMEOUT_MS / 1000}s) - fallback vers FR`);
      }, GEO_CLIENT_TIMEOUT_MS);
      
      const geoUrl = detailed ? `${API_URL}/geolocate?detailed=1` : `${API_URL}/geolocate`;
      const response = await fetch(geoUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      const backend = typeof data.geoBackend === 'string' ? data.geoBackend : null;
      const geoMsSrv = typeof data.geoMs === 'number' ? data.geoMs : null;
      const mm = typeof data.geoMaxMindMs === 'number' ? ` · MaxMind ${data.geoMaxMindMs}ms` : '';
      const detail =
        backend != null && geoMsSrv != null
          ? `[${backend}] ${geoMsSrv}ms${mm}`
          : `serveur sans geoBackend/geoMs → redémarre tracking-server`;
      console.log(
        `%c⚡ Géo%c ${detail} · /geolocate`,
        'color:#38bdf8;font-weight:700',
        'color:inherit;font-weight:400',
        { country: data.country, city: data.city }
      );
      const country = data.country || 'FR';
      const city = data.city || null;
      const region = data.region || null;
      const regionCode = data.regionCode || null;
      const district = data.district || null;
      const zip = data.zip || null;
      
      setCachedLocation(country, city, region, regionCode, district, zip);
      return { country, city, region, regionCode, district, zip, timestamp: Date.now() };
    } catch (error) {
      const name = error instanceof Error ? error.name : '';
      const msg = error instanceof Error ? error.message : String(error);
      const benign =
        name === 'AbortError' ||
        /aborted|NetworkError|Failed to fetch|Load failed|cancel/i.test(msg);
      if (!benign) console.error('❌ Erreur géoloc serveur:', error);
      return { country: 'FR', timestamp: Date.now() };
    } finally {
      _pendingLocationPromise = null;
    }
  })();
  
  return _pendingLocationPromise;
};

// Pour compatibilité avec l'ancien code
const getUserCountry = async (): Promise<string> => {
  const location = await getUserLocation();
  return location.country;
};

// Extraction du nom de la landing depuis le hostname
const getLandingName = (): string => {
  const hostname = window.location.hostname;
  
  // Pour dev local
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('aff') || 'test';
  }
  
  // Pour production (aligné avec getCurrentSubdomain : minuscules pour la DB affiliate_links)
  const parts = hostname.split('.');
  if (parts.length >= 3) {
    return parts[0].toLowerCase();
  }
  
  return 'main';
};

const normalizeGeoText = (value?: string | null): string => {
  if (!value || typeof value !== 'string') return '';
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

const isPyreneesOrientales66 = (location: LocationCache): boolean => {
  if (location.country !== 'FR') return false;

  const region = normalizeGeoText(location.region);
  const district = normalizeGeoText(location.district);
  const city = normalizeGeoText(location.city);
  const regionCode = normalizeGeoText(location.regionCode);
  const zip = String(location.zip || '').trim();

  if (region.includes('pyrenees-orientales') || district.includes('pyrenees-orientales')) {
    return true;
  }

  if (regionCode === '66' || regionCode === 'fr-66') {
    return true;
  }

  if (zip.startsWith('66')) {
    return true;
  }

  // Fallback ville principale du 66 quand les APIs ne renvoient pas le département.
  if (city.includes('perpignan')) {
    return true;
  }

  return false;
};

// Détecter si on est dans le browser in-app TikTok
export const isTikTokInAppBrowser = (): boolean => {
  try {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('musical_ly') || ua.includes('bytedancewebview') || ua.includes('tiktok') || ua.includes('musically');
  } catch {
    return false;
  }
};

// Vérifier si le lien est une offre MyStake
const isMystakeOffer = (url: string | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.toLowerCase().includes('affiliatemystake.com');
};

// Détecter si c'est un bot Snapchat
const isSnapchatBot = (): boolean => {
  try {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Liste des patterns de bots Snapchat
    const snapchatBotPatterns = [
      'snapchat',
      'snap',
      'snapprefetch',
      'snappreview',
      'bot',
      'crawler',
      'spider',
      'preview',
      'scraper',
      'facebookexternalhit', // Facebook aussi pour être safe
      'whatsapp',
    ];
    
    // Vérifier si le user agent contient un des patterns
    const isBot = snapchatBotPatterns.some(pattern => userAgent.includes(pattern));
    
    if (isBot) {
      console.log('🤖 Bot détecté:', userAgent);
    }
    
    return isBot;
  } catch (error) {
    console.error('Erreur détection bot:', error);
    return false; // En cas d'erreur, ne pas bloquer
  }
};

// Logger une redirection Paris / Issy dans la DB
const logParisRedirect = async (
  landing: string,
  originalOffer: string,
  reason: string,
  cityLabel?: string | null
): Promise<void> => {
  try {
    const city = cityLabel && String(cityLabel).trim() ? String(cityLabel).trim() : 'Paris';
    await fetch(`${API_URL}/paris-redirect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        landing,
        city,
        original_offer: originalOffer,
        redirected_to: 'MyStake',
        reason
      })
    });
  } catch (error) {
    // Silencieux, ne pas bloquer la redirection
    console.warn('Impossible de logger la redirection Paris:', error);
  }
};

// Récupérer les liens depuis la DB pour une landing+pays
// Timeout 2s par appel : si le serveur ne répond pas, on retourne [] et on utilise le lien statique
const getLinksFromDB = async (landing: string, country: string): Promise<any[]> => {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${API_URL}/affiliate-links/${landing}/${country}`, {
      signal: controller.signal
    });
    clearTimeout(timer);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    // Timeout ou erreur réseau → fallback silencieux
    return [];
  }
};

// Timeout global 3s pour éviter les blocages (réduit de 6s → 3s grâce au cache serveur)
const API_LINKS_MAX_MS = 3000;

// Sélection aléatoire basée sur les poids (%)
const selectLinkByWeight = (links: any[]): string => {
  const totalWeight = links.reduce((sum, link) => sum + link.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const link of links) {
    random -= link.weight;
    if (random <= 0) {
      return link.url;
    }
  }
  
  return links[0]?.url || '';
};

// Extraction du tracking code depuis le lien original (sub1 ou utm_campaign selon l'offre)
const extractSub1FromLink = (link: string): string | null => {
  try {
    const url = new URL(link);
    // Winbeatz / NHL / Rodeo utilisent sub1
    const sub1 = url.searchParams.get('sub1');
    if (sub1) return sub1;
    // Sparta / MyStake utilisent utm_campaign
    const utmCampaign = url.searchParams.get('utm_campaign');
    if (utmCampaign) return utmCampaign;
    return null;
  } catch {
    return null;
  }
};

/** Identifiant affilié pour le pixel Utopia — tous fournisseurs (afp, sub1, utm_campaign). */
function extractTrackingCodeForUtopiaPixel(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const bad = (s: string) => !s || s === 'null' || s === 'undefined';
  try {
    const u = new URL(url);
    const afp = u.searchParams.get('afp');
    if (!bad(afp || '')) return afp;
    const sub1 = u.searchParams.get('sub1');
    if (!bad(sub1 || '')) return sub1;
    const utm = u.searchParams.get('utm_campaign');
    if (!bad(utm || '')) return utm;
  } catch {
    for (const re of [/[?&]afp=([^&]+)/, /[?&]sub1=([^&]+)/, /[?&]utm_campaign=([^&]+)/]) {
      const m = url.match(re);
      if (m) {
        try {
          const v = decodeURIComponent(m[1]);
          if (!bad(v)) return v;
        } catch {
          if (!bad(m[1])) return m[1];
        }
      }
    }
  }
  return null;
}

// Vérifier si le lien est une offre NHL (Spin Granny)
const isNHLOffer = (url: string | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.toLowerCase().includes('nhlv1trk.com') && url.toLowerCase().includes('b5rmcsr');
};

// Vérifier si le lien est une offre Winbeatz
const isWinbeatzOffer = (url: string | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.toLowerCase().includes('np8rv9f5nm.com') || url.toLowerCase().includes('winbeatz');
};

// Vérifier si le lien est une offre Rodeo
const isRodeoOffer = (url: string | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.toLowerCase().includes('blmb6g2') || url.toLowerCase().includes('rodeo');
};

// Vérifier si le lien est une offre Sparta
const isSpartaOffer = (url: string | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.toLowerCase().includes('spartaaffiliates.com');
};

const isShogunOffer = (url: string | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.toLowerCase().includes('shogunaffiliates.com') || url.toLowerCase().includes('checkwinmid.com');
};

// Vérifier si on est dans la plage horaire "heures de bureau" pour Paris
export const isParisBusinessHours = (): boolean => {
  const now = new Date();
  const parisTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  
  const day = parisTime.getDay(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi
  const hour = parisTime.getHours();
  
  // Weekend (samedi=6, dimanche=0) → pas heures de bureau
  if (day === 0 || day === 6) {
    return false;
  }
  
  // Lundi à vendredi : vérifier si entre 6h et 18h
  // 18h jusqu'à 6h du matin = pas heures de bureau
  // 6h à 18h = heures de bureau
  return hour >= 6 && hour < 18;
};

/** Paris + Issy-les-Moulineaux : même règle (offres NHL / Winbeatz / etc. + heures de bureau). */
const isParisAreaRestrictedCity = (city: string | null | undefined): boolean => {
  if (!city || typeof city !== 'string') return false;
  let n = city.toLowerCase();
  try {
    n = n.normalize('NFD').replace(/\p{M}/gu, '');
  } catch {
    /* ignore */
  }
  if (n.includes('paris')) return true;
  const compact = n.replace(/[\s-]+/g, '');
  return compact.includes('issy') && compact.includes('moulineaux');
};

// URL Spin Granny = format correct (BC4SXG3/B5RMCSR). L'ancien nhlv1trk.com/click?pid=1256&offer_id=886 n'existe pas.
const getSpinGrannyUrl = (sub1: string) => `https://www.nhlv1trk.com/BC4SXG3/B5RMCSR/?sub1=${sub1}`;

// Vérifier si le split Spin Granny est activé
const isSpinGrannySplitEnabled = (): boolean => {
  try {
    const enabled = localStorage.getItem('spinGrannySplitEnabled');
    return enabled !== 'false'; // Actif par défaut si pas défini
  } catch {
    return true; // Actif par défaut
  }
};

// Seuil (ms) au-delà duquel on envoie une alerte perf
const PERF_ALERT_THRESHOLD_MS = 7000; // Notif seulement si > 7s (géo peut monter à ~4s)

// Envoyer une alerte perf au backend (fire-and-forget)
const reportSlowLoad = (landing: string, totalMs: number, ipapiMs: number | null, dbMs: number | null, country: string, city?: string | null): void => {
  try {
    fetch(`${API_URL}/perf-alert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ landing, totalMs, ipapiMs, dbMs, country, city, threshold: PERF_ALERT_THRESHOLD_MS })
    }).catch(() => {});
  } catch (_) {}
};

// Fonction principale de gestion des liens
export const getLinkBasedOnCountry = async (originalLink?: string | null): Promise<{url: string; parisRedirected: boolean; telegramContact?: string | null}> => {
  const landing = getLandingName();
  const fallbackSub1 = landing ? `z${landing}` : 'unknown';
  const safeLink = originalLink && String(originalLink).trim() ? originalLink : '';
  const _t0 = Date.now();
  try {

    let location: LocationCache;
    let links: any[];
    let ipapiMs: number;
    let dbMs: number;

    // Endpoint combiné : géoloc + liens en 1 seul round-trip (serveur répond en <5ms,
    // le timeout couvre uniquement la latence réseau mobile)
    const _t1 = Date.now();
    let usedCombined = false;
    try {
      const applyCombinedPayload = (data: any, source: 'bootstrap' | 'network') => {
        if (!data || !data.country) throw new Error('invalid response');
        const tRound = Date.now() - _t1;
        if (source === 'bootstrap') {
          console.log(
            `%c⚡ Géo%c bootstrap (main.tsx) · réponse réutilisée · ${tRound}ms`,
            'color:#38bdf8;font-weight:700',
            'color:inherit;font-weight:400',
            { country: data.country, city: data.city, fromCache: data.fromCache }
          );
        } else {
          const backend = typeof data.geoBackend === 'string' ? data.geoBackend : null;
          const geoMsSrv = typeof data.geoMs === 'number' ? data.geoMs : null;
          const mm =
            typeof data.geoMaxMindMs === 'number' ? ` · MaxMind ${data.geoMaxMindMs}ms` : '';
          const detail =
            backend != null && geoMsSrv != null
              ? `[${backend}] ${geoMsSrv}ms${mm}`
              : `serveur sans geoBackend/geoMs → redémarre tracking-server (npm build déjà OK côté front)`;
          console.log(
            `%c⚡ Géo%c ${detail} · landing-data ${tRound}ms`,
            'color:#38bdf8;font-weight:700',
            'color:inherit;font-weight:400',
            { country: data.country, city: data.city, fromCache: data.fromCache }
          );
        }
        location = {
          country: data.country,
          city: data.city || null,
          region: data.region || null,
          regionCode: data.regionCode || null,
          district: data.district || null,
          zip: data.zip || null,
          timestamp: Date.now()
        };
        setCachedLocation(location.country, location.city || null, location.region || null, location.regionCode || null, location.district || null, location.zip || null);
        links = Array.isArray(data.links) ? data.links : [];
        usedCombined = true;
        if (data.telegramContact) {
          (getLinkBasedOnCountry as any)._lastTelegramContact = data.telegramContact;
        } else {
          (getLinkBasedOnCountry as any)._lastTelegramContact = null;
        }
      };

      let bootPayload: any = null;
      try {
        const raw = sessionStorage.getItem(LANDING_DATA_BOOTSTRAP_KEY);
        if (raw) {
          const boot = JSON.parse(raw);
          const age = Date.now() - (boot.ts || 0);
          if (
            boot &&
            age >= 0 &&
            age < LANDING_DATA_BOOTSTRAP_MAX_AGE_MS &&
            String(boot.landing || '').toLowerCase() === String(landing || '').toLowerCase() &&
            boot.payload &&
            boot.payload.country
          ) {
            bootPayload = boot.payload;
          }
        }
      } catch (_) {}

      if (bootPayload) {
        applyCombinedPayload(bootPayload, 'bootstrap');
        try { sessionStorage.removeItem(LANDING_DATA_BOOTSTRAP_KEY); } catch (_) {}
      } else {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), LANDING_DATA_FETCH_TIMEOUT_MS);
        const resp = await fetch(`${API_URL}/landing-data/${encodeURIComponent(landing || 'unknown')}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await resp.json();
        applyCombinedPayload(data, 'network');
      }
    } catch (_) {
      // Le réseau est trop lent pour le combined → on utilise directement le fallback Shogun
      // (l'ancien système à 2 appels re-tentait le MÊME réseau lent → doublait le temps total)
      console.warn('⚡ Combined endpoint échoué — fallback Shogun immédiat');
      const cachedLoc = getCachedLocation();
      location = cachedLoc || { country: 'FR', timestamp: Date.now() };
      links = [];
    }
    const combinedMs = Date.now() - _t1;
    ipapiMs = combinedMs;
    dbMs = usedCombined ? 0 : combinedMs;

    console.log('📍 Localisation détectée:', { country: location.country, city: location.city, landing, combined: usedCombined });

    if (landing === 'luna' && isPyreneesOrientales66(location)) {
      const blockUrl = 'https://www.musicca.com/fr/piano?3acfhjk4adgj5adgj';
      console.log('🚫 Luna bloquée pour Pyrénées-Orientales (66) → redirection Musicca');
      window.location.href = blockUrl;
      return { url: blockUrl, parisRedirected: false };
    }
    
    if ((landing === 'helias' || landing === 'heliass') && location.country === 'US') {
      console.log('🇺🇸 IP US détectée pour Helias → Redirection vers safe page (piano virtuel)');
      window.location.href = 'https://tidou.fr/2-4-ans/recreatifs/313-piano-virtuel';
      return {url: 'https://tidou.fr/2-4-ans/recreatifs/313-piano-virtuel', parisRedirected: false};
    }

    const BBTO_SAFE = 'https://tidou.fr/2-4-ans/recreatifs/313-piano-virtuel';
    if (landing === 'bbto') {
      if (location.country === 'US') {
        console.log('🇺🇸 IP US détectée pour bbto → safe page');
        window.location.href = BBTO_SAFE;
        return { url: BBTO_SAFE, parisRedirected: false };
      }
      try {
        const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
        if (ua.length > 10 && !/Mobile|Android|iPhone|iPad/i.test(ua)) {
          console.log('🖥️ Desktop détecté pour bbto → safe page');
          window.location.href = BBTO_SAFE;
          return { url: BBTO_SAFE, parisRedirected: false };
        }
      } catch (_) {}
    }
    
    const FR_BE_CH = ['FR', 'BE', 'CH'];
    const isFrenchSpeakingCountry = FR_BE_CH.includes(location.country);
    if (landing === 'bigmeech' || landing === 'bigmech') {
      if (location.country === 'US') {
        console.log('🇺🇸 IP US détectée pour bigmeech → Redirection vers safe page');
        window.location.href = 'https://tidou.fr/2-4-ans/recreatifs/313-piano-virtuel';
        return {url: 'https://tidou.fr/2-4-ans/recreatifs/313-piano-virtuel', parisRedirected: false};
      }
      if (!isFrenchSpeakingCountry && isSnapchatBot()) {
        console.log('🤖 Bot détecté (hors FR/BE/CH) pour bigmeech → Redirection vers safe page');
        window.location.href = 'https://tidou.fr/2-4-ans/recreatifs/313-piano-virtuel';
        return {url: 'https://tidou.fr/2-4-ans/recreatifs/313-piano-virtuel', parisRedirected: false};
      }
    }
    
    // RÈGLE PARIS / ISSY : forcer MyStake en heures de bureau pour offres NHL (Spin Granny), Winbeatz et Rodeo
    if (links.length > 0 && location.country === 'FR' && location.city && isParisAreaRestrictedCity(location.city)) {
      // Vérifier si le lien de la DB est NHL, Winbeatz ou Rodeo
      const selectedLink = selectLinkByWeight(links);
      const isNHL = isNHLOffer(selectedLink);
      const isWinbeatz = isWinbeatzOffer(selectedLink);
      const isRodeo = isRodeoOffer(selectedLink);
      const isSparta = isSpartaOffer(selectedLink);
      const isShogun = isShogunOffer(selectedLink);

      if (isNHL || isWinbeatz || isRodeo || isSparta || isShogun) {
        const isBusinessHours = isParisBusinessHours();
        const offerName = isNHL ? 'NHL (Spin Granny)' : isWinbeatz ? 'Winbeatz' : isRodeo ? 'Rodeo' : isShogun ? 'Shogun' : 'Sparta';
        console.log(`🗼 Paris / Issy détecté (${location.city}) + offre ${offerName}`);

        if (isBusinessHours) {
          // Lundi-vendredi 6h-18h : FORCER MyStake
          const sub1 = extractSub1FromLink(selectedLink);
          if (sub1 && sub1 !== 'null' && sub1 !== 'undefined') {
            console.log(`⚠️ Heures de bureau Paris / Issy (lun-ven 6h-18h) + ${offerName} → MyStake forcé`);

            logParisRedirect(landing, offerName, 'Business hours - Lun-Ven 6h-18h', location.city);

            return { url: MYSTAKE_WITH_SUB1(sub1), parisRedirected: true };
          }
        } else {
          // Weekend ou soirée/nuit : liens spécifiques FR-PARIS (même segment que Paris)
          console.log(`🎉 Weekend ou soirée + ${offerName} → cherche liens FR-PARIS`);
          const parisLinks = await getLinksFromDB(landing, 'FR-PARIS');

          if (parisLinks.length > 0) {
            console.log('✅ Liens FR-PARIS trouvés:', parisLinks.length);
            return { url: selectLinkByWeight(parisLinks), parisRedirected: false };
          }
          console.log(`ℹ️ Pas de liens FR-PARIS → ${offerName} normal`);
          return { url: selectedLink, parisRedirected: false };
        }
      }
    }
    
    // Helper : finalise le résultat, log le chrono et envoie une alerte si trop lent
    const finish = (result: {url: string; parisRedirected: boolean}): {url: string; parisRedirected: boolean; telegramContact?: string | null} => {
      const totalMs = Date.now() - _t0;
      console.log(`⏱️ getLinkBasedOnCountry – ${totalMs}ms (ipapi: ${ipapiMs}ms, db: ${dbMs}ms)`);
      if (totalMs >= PERF_ALERT_THRESHOLD_MS) {
        console.warn(`🐌 CHARGEMENT LENT détecté : ${totalMs}ms pour ${landing}`);
        reportSlowLoad(landing, totalMs, ipapiMs, dbMs, location.country, location.city);
      }
      return { ...result, telegramContact: (getLinkBasedOnCountry as any)._lastTelegramContact ?? null };
    };
    
    // 📱 Récupérer le lien Taapit→Mystake depuis le fichier centralisé taapit-links.json
    const taapitMystakeLink: string | null = (taapitLinks as Record<string, string>)[landing] || null;

    // Si on a des liens dans la DB, les utiliser
    if (links.length > 0) {
      console.log('✅ Liens trouvés pour', location.country, ':', links.length);
      let url = selectLinkByWeight(links);
      // Smartlinks reste parfois bloqué sur "Redirecting..." → remplacer par MyStake (sub1 conservé)
      if (url && url.includes('smartlinks.aprilftd.com')) {
        const sub1 = extractSub1FromLink(url) || fallbackSub1;
        url = MYSTAKE_WITH_SUB1(sub1);
      }
      // 🎯 RÈGLE TIKTOK : browser in-app TikTok + MyStake + affilié a un taapitMystakeLink → passer par Taapit
      if (taapitMystakeLink && isMystakeOffer(url) && isTikTokInAppBrowser()) {
        console.log('📱 TikTok in-app + MyStake → redirection via Taapit:', taapitMystakeLink);
        return finish({url: taapitMystakeLink, parisRedirected: false});
      }
      return finish({url: url, parisRedirected: false});
    }
    
    // FALLBACK : Shogun — utilisé si API timeout ou pas de lien configuré
    const afp = (safeLink ? extractSub1FromLink(safeLink) : null) || fallbackSub1;
    const fallbackUrl = SHOGUN_WITH_AFP(afp);
    console.warn('⚠️ Fallback Shogun utilisé pour', landing, '→', fallbackUrl);
    return finish({url: fallbackUrl, parisRedirected: false});
  } catch (error) {
    const totalMs = Date.now() - _t0;
    console.error('Erreur getLinkBasedOnCountry:', error);
    if (totalMs >= PERF_ALERT_THRESHOLD_MS) {
      reportSlowLoad(landing, totalMs, null, null, 'unknown');
    }
    return {url: safeLink || SHOGUN_WITH_AFP(fallbackSub1), parisRedirected: false};
  }
};

// Détecte le nom de l'offre casino depuis l'URL de destination
function detectOfferFromUrl(url: string): string {
  if (!url) return 'Unknown';
  if (url.includes('mystake') || url.includes('affiliatemystake')) return 'MyStake';
  if (url.includes('nhlv1trk') && url.includes('BLMB6G2')) return 'Rodeo';
  if (url.includes('nhlv1trk') && url.includes('B5RMCSR')) return 'Spin Granny';
  if (url.includes('nhlv1trk') && url.includes('BLSTPDG')) return 'Spinogrino';
  if (url.includes('nhlv1trk') && url.includes('BNBJ7GN')) return 'GT.bet';
  if (url.includes('nhlv1trk') && url.includes('BQ8NN6C')) return 'Slott';
  if (url.includes('nhlv1trk') && url.includes('BHK7DSD')) return 'NHL US';
  if (url.includes('nhlv1trk') && url.includes('BPK89TT')) return 'GT.bet';
  if (url.includes('nhlv1trk') && url.includes('CG2R5SL')) return 'NHL TR';
  if (url.includes('nhlv1trk') && url.includes('CCTN9FW')) return 'NHL AU/PT';
  if (url.includes('np8rv9f5nm') && url.includes('BPCNQXF')) return 'Spinmania';
  if (url.includes('np8rv9f5nm') && url.includes('BNX6S9Z')) return 'Winbeatz';
  if (url.includes('np8rv9f5nm')) return 'Winbeatz';
  if (url.includes('shogunaffiliates') || url.includes('checkwinmid') || url.includes('wynixio')) return 'Shogun';
  if (url.includes('spartaaffiliates')) return 'Sparta';
  if (url.includes('rqfv4z8v') && url.includes('BRQC68K')) return 'LepraSpin';
  if (url.includes('rqfv4z8v') && url.includes('C14BKQ5')) return 'BonusKong';
  if (url.includes('smartlinks.aprilftd')) return 'Smartlink April';
  return 'Other';
}

// À appeler sur le onClick des boutons CTA (pas au chargement de la page)
// Envoie le hit Utopia pour tout fournisseur (MyStake, Sparta, NHL, Rodeo, Winbeatz, liens DB, Taapit → slug en secours).
export const fireSpártaPixelForUrl = (url: string): void => {
  const code =
    extractTrackingCodeForUtopiaPixel(url) || getCurrentAffiliate()?.slug || '';
  if (!code || code === 'null' || code === 'undefined') return;
  const offer = detectOfferFromUrl(url);
  fetch(`${API_URL}/sparta-pixel?afp=${encodeURIComponent(code)}&offer=${encodeURIComponent(offer)}`, {
    keepalive: true,
  }).catch(() => {});
};

// À appeler sur le onClick des boutons CTA — pixel AprilFTD avec dédup localStorage
export const fireAprilPixelForUrl = (url: string): void => {
  try {
    const afp = extractTrackingCodeForUtopiaPixel(url) || getCurrentAffiliate()?.slug || '';
    if (!afp || afp === 'null' || afp === 'undefined') return;

    const today = new Date().toISOString().split('T')[0];
    const dedupKey = `april_click_${afp}_${today}`;

    if (localStorage.getItem(dedupKey)) return;

    localStorage.setItem(dedupKey, '1');
    const offer = detectOfferFromUrl(url);
    fetch(
      `${API_URL}/april-pixel?afp=${encodeURIComponent(afp)}&tracking_code=${encodeURIComponent(afp)}&offer=${encodeURIComponent(offer)}`,
      { keepalive: true }
    ).catch(() => {});
  } catch (_) {}
};

export default getLinkBasedOnCountry;

// Pas de préchargement à l’import : avec redirection immédiate vers le smartlink, le fetch
// /api/geolocate était annulé à la navigation → NetworkError bruyant dans la console.
// La géoloc part quand getLinkBasedOnCountry (ou un écran avec ?landing=1) en a besoin.
