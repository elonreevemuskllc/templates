/**
 * Traductions multilingues pour les landing pages
 * FR = Français, IT = Italien, ES = Espagnol, DE = Allemand, NL = Néerlandais, EN = Anglais, PT = Portugais, RU = Russe
 */

export type Language = 'FR' | 'IT' | 'ES' | 'DE' | 'NL' | 'EN' | 'PT' | 'RU' | 'LT' | 'RO' | 'PL';

// Mapping pays → symbole monétaire
export const CURRENCY_SYMBOLS: Record<string, string> = {
  // Zone Euro
  'FR': '€', 'BE': '€', 'IT': '€', 'ES': '€', 'DE': '€', 'NL': '€', 
  'AT': '€', 'PT': '€', 'GR': '€', 'IE': '€', 'FI': '€', 'LU': '€',
  'MT': '€', 'CY': '€', 'SI': '€', 'SK': '€', 'EE': '€', 'LV': '€', 'LT': '€',
  // DOM-TOM français
  'GF': '€', 'GP': '€', 'MQ': '€', 'RE': '€', 'YT': '€', 'MF': '€', 'BL': '€',
  'PM': '€', 'WF': '€', 'PF': '€', 'NC': '€', 'TF': '€',
  // UK
  'GB': '£',
  // USA
  'US': '$',
  // Canada
  'CA': '$',
  // Suisse
  'CH': 'CHF',
  // Pologne
  'PL': 'zł',
  // Autres pays
  'OTHER': '€' // Par défaut
};

// Fonction pour obtenir le symbole monétaire selon le pays
export function getCurrencySymbol(country?: string): string {
  if (!country) return '€';
  return CURRENCY_SYMBOLS[country] || CURRENCY_SYMBOLS['OTHER'];
}

export interface Translation {
  // Page Title (browser tab)
  page_title: string;
  
  // FAQ Title
  faq_title: string;
  
  // FAQ Questions
  faq_access_question: string;
  faq_access_answer: string;
  faq_bonus_question: string;
  faq_bonus_answer: string;
  faq_withdraw_question: string;
  faq_withdraw_answer: string;
  faq_games_question: string;
  faq_games_answer: string;
  faq_reliable_question: string;
  faq_reliable_answer: string;
  faq_what_game_question: string;
  faq_what_game_answer: string;
  faq_age_question: string;
  faq_age_answer: string;
  faq_deposit_question: string;
  faq_deposit_answer: string;
  faq_support_question: string;
  faq_support_answer: string;
  
  // Boutons et actions
  cta_button: string;
  cta_button_mobile: string;
  
  // Bonus banner
  bonus_title: string;
  bonus_subtitle: string;
  bonus_percentage: string;
  bonus_how_it_works: string;
  bonus_deposit: string;
  bonus_receive: string;
  bonus_automatic: string;
  bonus_claim: string;
  bonus_welcome_offer: string;
  
  // Footer
  footer_become_affiliate: string;
  
  // Testimonials
  testimonials_title: string;
  testimonials_recent_gains: string;
}

export const translations: Record<Language, Translation> = {
  FR: {
    // Page Title
    page_title: "10€ + 10€ offert",
    
    // FAQ Title
    faq_title: "❓ Questions Fréquentes",
    
    // FAQ FR
    faq_access_question: "Je ne peux pas accéder au site ?",
    faq_access_answer: "🚫 **Si vous ne pouvez pas accéder au site**, pas de panique !\n\n💡 Vous pouvez essayer avec ce lien alternatif :\n\n👉 <a href=\"MYSTAKE_LINK\" target=\"_blank\" style=\"color: #f59e0b; font-weight: bold; text-decoration: underline;\">CLIQUEZ ICI</a>\n\n✅ Ce lien fonctionne **24/7** dans tous les pays !",
    faq_bonus_question: "Y'a un bonus si je dépose ?",
    faq_bonus_answer: "💬 **Oui, et c'est automatique.**\nDès que tu déposes **au moins 10€**, ton dépôt est **doublé instantanément** — **pas besoin de code promo.**\n\n> 🔥 Tu déposes 20€ ➝ tu joues avec 40€\n> 💸 Tu déposes 100€ ➝ tu joues direct avec 200€\n\n✅ Le bonus **x2 est garanti** à chaque dépôt, peu importe le montant.\nEt si tu joues dans la foulée, t'as même souvent un petit bonus surprise 🎉",
    
    faq_withdraw_question: "Est-ce qu'on peut retirer l'argent ?",
    faq_withdraw_answer: "💬 **Bien sûr !**\n\nDès que t'as gagné, tu peux retirer sur ton compte bancaire et tu recevras en **2 jours** sur ton compte bancaire comme un virement classique. 💳\n\n✨ **Simple et rapide :**\n> 🏦 Demande de retrait\n> ⏱️ Traitement sous 2h\n> 💸 Virement sur ton compte",
    
    faq_games_question: "Où sont les jeux ?",
    faq_games_answer: "🎮 Une fois inscrit et connecté, et que ton **premier dépôt** sera fait :\n\n> 🎲 Accès aux **mini-jeux exclusifs**\n> 🎯 **Interface intuitive**\n> 🌟 **Bonus spéciaux** débloqués\n\n⚡ Tout est **instantané** après ton dépôt !",
    
    faq_reliable_question: "C'est fiable ?",
    faq_reliable_answer: "🔒 **Absolument sûr et certifié !**\n\n✅ Site de jeu **officiellement certifié**\n✅ Actif dans **plusieurs pays**\n✅ **Paiements sécurisés**\n\n🎯 Notre philosophie :\n> 💫 Tu déposes\n> 🎮 Tu joues\n> 💸 Tu retires\n\n**Simple. Sans prise de tête.** ✨",
    
    faq_what_game_question: "C'est quoi exactement le jeu ?",
    faq_what_game_answer: "🎯 C'est un site de **mini-jeux en ligne** avec de l'argent réel.\n\n> 🎰 Des mini-jeux simples et fun\n> 💰 Mise minimale à partir de **0.20€**\n> 🎁 Bonus automatique à chaque dépôt\n\n⚡ **Tu déposes, tu joues, tu retires** — c'est aussi simple que ça !",
    
    faq_age_question: "Faut avoir quel âge ?",
    faq_age_answer: "🆔 Il faut avoir **au moins 18 ans**.\n\n> ✅ Une pièce d'identité sera demandée lors du premier retrait\n> 🔒 C'est pour respecter la loi et protéger les mineurs\n\n💡 Si t'as moins de 18 ans, reviens quand tu seras majeur ! 😊",
    
    faq_deposit_question: "Comment déposer ?",
    faq_deposit_answer: "💳 **Super facile !**\n\n> 1️⃣ Clique sur le bouton **\"Jouer maintenant\"**\n> 2️⃣ Inscris-toi en 30 secondes\n> 3️⃣ Choisis ton montant (minimum 10€)\n> 4️⃣ Paie par **carte bancaire**\n\n⚡ Et hop, ton compte est **crédité instantanément** avec le **bonus x2** !",
    
    faq_support_question: "Et si j'ai un problème ?",
    faq_support_answer: "🆘 **Support disponible 24/7 !**\n\n> 💬 Chat en direct sur le site\n> 📧 Email de support\n> ⚡ Réponse en moins de 2h\n\n✅ L'équipe est **réactive et française** — tu seras jamais laissé sans réponse !",
    
    // Boutons
    cta_button: "🎮 Jouer maintenant",
    cta_button_mobile: "Jouer",
    
    // Bonus
    bonus_title: "🎁 BONUS EXCLUSIF",
    bonus_subtitle: "Ton premier dépôt doublé automatiquement !",
    bonus_percentage: "100% de Bonus",
    bonus_how_it_works: "Comment ça marche ?",
    bonus_deposit: "Déposez 10€",
    bonus_receive: "Recevez 20€",
    bonus_automatic: "Ton argent est doublé automatiquement !",
    bonus_claim: "RÉCLAMER MON BONUS",
    bonus_welcome_offer: "OFFRE DE BIENVENUE 🎁",
    
    // Footer
    footer_become_affiliate: "💼 Devenir affilié",
    
    // Témoignages
    testimonials_title: "💬 Ils ont essayé, ils adorent !",
    testimonials_recent_gains: "Gains Récents 💸"
  },
  
  IT: {
    // Page Title
    page_title: "10€ + 10€ bonus",
    
    // FAQ Title
    faq_title: "❓ Domande Frequenti",
    
    // FAQ IT
    faq_access_question: "",
    faq_access_answer: "",
    faq_bonus_question: "C'è un bonus se deposito?",
    faq_bonus_answer: "💬 **Sì, ed è automatico.**\nAppena depositi **almeno 10€**, il tuo deposito viene **raddoppiato istantaneamente** — **nessun codice promo necessario.**\n\n> 🔥 Depositi 20€ ➝ giochi con 40€\n> 💸 Depositi 100€ ➝ giochi direttamente con 200€\n\n✅ Il bonus **x2 è garantito** ad ogni deposito, qualunque sia l'importo.\nE se giochi subito, spesso ottieni anche un piccolo bonus sorpresa 🎉",
    
    faq_withdraw_question: "Posso ritirare i soldi?",
    faq_withdraw_answer: "💬 **Certo!**\n\nAppena hai vinto, puoi ritirare sul tuo conto bancario e riceverai in **2 giorni** sul tuo conto bancario come un bonifico classico. 💳\n\n✨ **Semplice e veloce:**\n> 🏦 Richiesta di prelievo\n> ⏱️ Elaborazione in 2h\n> 💸 Bonifico sul tuo conto",
    
    faq_games_question: "Dove sono i giochi?",
    faq_games_answer: "🎮 Una volta iscritto e connesso, e fatto il tuo **primo deposito**:\n\n> 🎲 Accesso ai **mini-giochi esclusivi**\n> 🎯 **Interfaccia intuitiva**\n> 🌟 **Bonus speciali** sbloccati\n\n⚡ Tutto è **istantaneo** dopo il tuo deposito!",
    
    faq_reliable_question: "È affidabile?",
    faq_reliable_answer: "🔒 **Assolutamente sicuro e certificato!**\n\n✅ Sito di gioco **ufficialmente certificato**\n✅ Attivo in **diversi paesi**\n✅ **Pagamenti sicuri**\n\n🎯 La nostra filosofia:\n> 💫 Depositi\n> 🎮 Giochi\n> 💸 Ritiri\n\n**Semplice. Senza complicazioni.** ✨",
    
    faq_what_game_question: "Cos'è esattamente il gioco?",
    faq_what_game_answer: "🎯 È un sito di **mini-giochi online** con soldi veri.\n\n> 🎰 Mini-giochi semplici e divertenti\n> 💰 Puntata minima da **0.20€**\n> 🎁 Bonus automatico ad ogni deposito\n\n⚡ **Depositi, giochi, ritiri** — è così semplice!",
    
    faq_age_question: "Quanti anni bisogna avere?",
    faq_age_answer: "🆔 Devi avere **almeno 18 anni**.\n\n> ✅ Un documento d'identità sarà richiesto al primo prelievo\n> 🔒 È per rispettare la legge e proteggere i minori\n\n💡 Se hai meno di 18 anni, torna quando sarai maggiorenne! 😊",
    
    faq_deposit_question: "Come deposito?",
    faq_deposit_answer: "💳 **Super facile!**\n\n> 1️⃣ Clicca sul pulsante **\"Gioca ora\"**\n> 2️⃣ Iscriviti in 30 secondi\n> 3️⃣ Scegli il tuo importo (minimo 10€)\n> 4️⃣ Paga con **carta di credito**\n\n⚡ Et voilà, il tuo conto è **accreditato istantaneamente** con il **bonus x2**!",
    
    faq_support_question: "E se ho un problema?",
    faq_support_answer: "🆘 **Supporto disponibile 24/7!**\n\n> 💬 Chat dal vivo sul sito\n> 📧 Email di supporto\n> ⚡ Risposta in meno di 2h\n\n✅ Il team è **reattivo e professionale** — non sarai mai lasciato senza risposta!",
    
    // Pulsanti
    cta_button: "🎮 Gioca ora",
    cta_button_mobile: "Gioca",
    
    // Bonus
    bonus_title: "🎁 BONUS ESCLUSIVO",
    bonus_subtitle: "Il tuo primo deposito raddoppiato automaticamente!",
    bonus_percentage: "100% di Bonus",
    bonus_how_it_works: "Come funziona?",
    bonus_deposit: "Depositi 10€",
    bonus_receive: "Ricevi 20€",
    bonus_automatic: "I tuoi soldi vengono raddoppiati automaticamente!",
    bonus_claim: "RICHIEDI IL MIO BONUS",
    bonus_welcome_offer: "OFFERTA DI BENVENUTO 🎁",
    
    // Footer
    footer_become_affiliate: "💼 Diventa affiliato",
    
    // Testimonianze
    testimonials_title: "💬 L'hanno provato, lo adorano!",
    testimonials_recent_gains: "Vincite Recenti 💸"
  },
  
  ES: {
    // Page Title
    page_title: "10€ + 10€ de bono",
    
    // FAQ Title
    faq_title: "❓ Preguntas Frecuentes",
    
    // FAQ ES
    faq_access_question: "",
    faq_access_answer: "",
    faq_bonus_question: "¿Hay un bono si deposito?",
    faq_bonus_answer: "💬 **Sí, y es automático.**\nEn cuanto deposites **al menos 10€**, tu depósito se **duplica instantáneamente** — **no necesitas código promo.**\n\n> 🔥 Depositas 20€ ➝ juegas con 40€\n> 💸 Depositas 100€ ➝ juegas directamente con 200€\n\n✅ El bono **x2 está garantizado** en cada depósito, sea cual sea el importe.\nY si juegas enseguida, a menudo obtienes incluso un pequeño bono sorpresa 🎉",
    
    faq_withdraw_question: "¿Puedo retirar el dinero?",
    faq_withdraw_answer: "💬 **¡Por supuesto!**\n\nEn cuanto hayas ganado, puedes retirar a tu cuenta bancaria y recibirás en **2 días** en tu cuenta bancaria como una transferencia clásica. 💳\n\n✨ **Simple y rápido:**\n> 🏦 Solicitud de retiro\n> ⏱️ Procesamiento en 2h\n> 💸 Transferencia a tu cuenta",
    
    faq_games_question: "¿Dónde están los juegos?",
    faq_games_answer: "🎮 Una vez registrado y conectado, y hecho tu **primer depósito**:\n\n> 🎲 Acceso a **mini-juegos exclusivos**\n> 🎯 **Interfaz intuitiva**\n> 🌟 **Bonos especiales** desbloqueados\n\n⚡ ¡Todo es **instantáneo** después de tu depósito!",
    
    faq_reliable_question: "¿Es fiable?",
    faq_reliable_answer: "🔒 **¡Absolutamente seguro y certificado!**\n\n✅ Sitio de juego **oficialmente certificado**\n✅ Activo en **varios países**\n✅ **Pagos seguros**\n\n🎯 Nuestra filosofía:\n> 💫 Depositas\n> 🎮 Juegas\n> 💸 Retiras\n\n**Simple. Sin complicaciones.** ✨",
    
    faq_what_game_question: "¿Qué es exactamente el juego?",
    faq_what_game_answer: "🎯 Es un sitio de **mini-juegos online** con dinero real.\n\n> 🎰 Mini-juegos simples y divertidos\n> 💰 Apuesta mínima desde **0.20€**\n> 🎁 Bono automático en cada depósito\n\n⚡ **Depositas, juegas, retiras** — ¡es así de simple!",
    
    faq_age_question: "¿Qué edad hay que tener?",
    faq_age_answer: "🆔 Debes tener **al menos 18 años**.\n\n> ✅ Se pedirá un documento de identidad en el primer retiro\n> 🔒 Es para respetar la ley y proteger a los menores\n\n💡 Si tienes menos de 18 años, ¡vuelve cuando seas mayor de edad! 😊",
    
    faq_deposit_question: "¿Cómo deposito?",
    faq_deposit_answer: "💳 **¡Súper fácil!**\n\n> 1️⃣ Haz clic en el botón **\"Jugar ahora\"**\n> 2️⃣ Regístrate en 30 segundos\n> 3️⃣ Elige tu importe (mínimo 10€)\n> 4️⃣ Paga con **tarjeta bancaria**\n\n⚡ ¡Y listo, tu cuenta se **acredita instantáneamente** con el **bono x2**!",
    
    faq_support_question: "¿Y si tengo un problema?",
    faq_support_answer: "🆘 **¡Soporte disponible 24/7!**\n\n> 💬 Chat en vivo en el sitio\n> 📧 Email de soporte\n> ⚡ Respuesta en menos de 2h\n\n✅ El equipo es **reactivo y profesional** — ¡nunca te dejarán sin respuesta!",
    
    // Botones
    cta_button: "🎮 Jugar ahora",
    cta_button_mobile: "Jugar",
    
    // Bonus
    bonus_title: "🎁 BONO EXCLUSIVO",
    bonus_subtitle: "¡Tu primer depósito duplicado automáticamente!",
    bonus_percentage: "100% de Bono",
    bonus_how_it_works: "¿Cómo funciona?",
    bonus_deposit: "Depositas 10€",
    bonus_receive: "Recibes 20€",
    bonus_automatic: "¡Tu dinero se duplica automáticamente!",
    bonus_claim: "RECLAMAR MI BONO",
    bonus_welcome_offer: "OFERTA DE BIENVENIDA 🎁",
    
    // Footer
    footer_become_affiliate: "💼 Hazte afiliado",
    
    // Testimonios
    testimonials_title: "💬 ¡Lo probaron, les encanta!",
    testimonials_recent_gains: "Ganancias Recientes 💸"
  },
  
  DE: {
    // Page Title
    page_title: "10€ + 10€ Bonus",
    
    // FAQ Title
    faq_title: "❓ Häufig gestellte Fragen",
    
    // FAQ DE
    faq_access_question: "",
    faq_access_answer: "",
    faq_bonus_question: "Gibt es einen Bonus, wenn ich einzahle?",
    faq_bonus_answer: "💬 **Ja, und er ist automatisch.**\nSobald du **mindestens 10€** einzahlst, wird deine Einzahlung **sofort verdoppelt** — **kein Promo-Code nötig.**\n\n> 🔥 Du zahlst 20€ ein ➝ du spielst mit 40€\n> 💸 Du zahlst 100€ ein ➝ du spielst direkt mit 200€\n\n✅ Der **x2 Bonus ist garantiert** bei jeder Einzahlung, egal wie hoch.\nUnd wenn du sofort spielst, bekommst du oft sogar einen kleinen Überraschungsbonus 🎉",
    
    faq_withdraw_question: "Kann ich das Geld abheben?",
    faq_withdraw_answer: "💬 **Natürlich!**\n\nSobald du gewonnen hast, kannst du auf dein Bankkonto abheben und erhältst in **2 Tagen** das Geld auf deinem Bankkonto wie eine klassische Überweisung. 💳\n\n✨ **Einfach und schnell:**\n> 🏦 Auszahlungsantrag\n> ⏱️ Bearbeitung in 2h\n> 💸 Überweisung auf dein Konto",
    
    faq_games_question: "Wo sind die Spiele?",
    faq_games_answer: "🎮 Sobald du registriert und angemeldet bist und deine **erste Einzahlung** getätigt hast:\n\n> 🎲 Zugang zu **exklusiven Mini-Spielen**\n> 🎯 **Intuitive Benutzeroberfläche**\n> 🌟 **Spezielle Boni** freigeschaltet\n\n⚡ Alles ist **sofort** nach deiner Einzahlung verfügbar!",
    
    faq_reliable_question: "Ist es zuverlässig?",
    faq_reliable_answer: "🔒 **Absolut sicher und zertifiziert!**\n\n✅ **Offiziell zertifizierte** Spielseite\n✅ Aktiv in **mehreren Ländern**\n✅ **Sichere Zahlungen**\n\n🎯 Unsere Philosophie:\n> 💫 Du zahlst ein\n> 🎮 Du spielst\n> 💸 Du hebst ab\n\n**Einfach. Ohne Stress.** ✨",
    
    faq_what_game_question: "Was ist das Spiel genau?",
    faq_what_game_answer: "🎯 Es ist eine Seite mit **Online-Minispielen** mit echtem Geld.\n\n> 🎰 Einfache und unterhaltsame Mini-Spiele\n> 💰 Mindesteinsatz ab **0,20€**\n> 🎁 Automatischer Bonus bei jeder Einzahlung\n\n⚡ **Du zahlst ein, du spielst, du hebst ab** — so einfach ist das!",
    
    faq_age_question: "Wie alt muss man sein?",
    faq_age_answer: "🆔 Du musst **mindestens 18 Jahre alt** sein.\n\n> ✅ Ein Ausweis wird bei der ersten Auszahlung verlangt\n> 🔒 Das dient der Einhaltung des Gesetzes und dem Schutz Minderjähriger\n\n💡 Wenn du unter 18 bist, komm wieder wenn du volljährig bist! 😊",
    
    faq_deposit_question: "Wie zahle ich ein?",
    faq_deposit_answer: "💳 **Super einfach!**\n\n> 1️⃣ Klicke auf den Button **\"Jetzt spielen\"**\n> 2️⃣ Registriere dich in 30 Sekunden\n> 3️⃣ Wähle deinen Betrag (mindestens 10€)\n> 4️⃣ Bezahle per **Kreditkarte**\n\n⚡ Und schon ist dein Konto **sofort aufgeladen** mit dem **x2 Bonus**!",
    
    faq_support_question: "Was, wenn ich ein Problem habe?",
    faq_support_answer: "🆘 **Support 24/7 verfügbar!**\n\n> 💬 Live-Chat auf der Seite\n> 📧 Support-E-Mail\n> ⚡ Antwort in weniger als 2h\n\n✅ Das Team ist **reaktiv und professionell** — du wirst nie ohne Antwort gelassen!",
    
    // Buttons
    cta_button: "🎮 Jetzt spielen",
    cta_button_mobile: "Spielen",
    
    // Bonus
    bonus_title: "🎁 EXKLUSIVER BONUS",
    bonus_subtitle: "Deine erste Einzahlung wird automatisch verdoppelt!",
    bonus_percentage: "100% Bonus",
    bonus_how_it_works: "Wie funktioniert es?",
    bonus_deposit: "Zahle 10€ ein",
    bonus_receive: "Erhalte 20€",
    bonus_automatic: "Dein Geld wird automatisch verdoppelt!",
    bonus_claim: "MEINEN BONUS EINFORDERN",
    bonus_welcome_offer: "WILLKOMMENSANGEBOT 🎁",
    
    // Footer
    footer_become_affiliate: "💼 Partner werden",
    
    // Testimonials
    testimonials_title: "💬 Sie haben es ausprobiert, sie lieben es!",
    testimonials_recent_gains: "Aktuelle Gewinne 💸"
  },
  
  NL: {
    // Page Title
    page_title: "10€ + 10€ bonus",
    
    // FAQ Title
    faq_title: "❓ Veelgestelde Vragen",
    
    // FAQ NL
    faq_access_question: "",
    faq_access_answer: "",
    faq_bonus_question: "Is er een bonus als ik stort?",
    faq_bonus_answer: "💬 **Ja, en het is automatisch.**\nZodra je **minstens 10€** stort, wordt je storting **onmiddellijk verdubbeld** — **geen promocode nodig.**\n\n> 🔥 Je stort 20€ ➝ je speelt met 40€\n> 💸 Je stort 100€ ➝ je speelt direct met 200€\n\n✅ De **x2 bonus is gegarandeerd** bij elke storting, ongeacht het bedrag.\nEn als je meteen speelt, krijg je vaak zelfs een kleine verrassingsbonus 🎉",
    
    faq_withdraw_question: "Kan ik het geld opnemen?",
    faq_withdraw_answer: "💬 **Natuurlijk!**\n\nZodra je gewonnen hebt, kun je opnemen naar je bankrekening en ontvang je binnen **2 dagen** het geld op je bankrekening als een klassieke overschrijving. 💳\n\n✨ **Simpel en snel:**\n> 🏦 Opnameaanvraag\n> ⏱️ Verwerking binnen 2u\n> 💸 Overschrijving naar je rekening",
    
    faq_games_question: "Waar zijn de spellen?",
    faq_games_answer: "🎮 Zodra je geregistreerd en ingelogd bent, en je **eerste storting** hebt gedaan:\n\n> 🎲 Toegang tot **exclusieve mini-games**\n> 🎯 **Intuïtieve interface**\n> 🌟 **Speciale bonussen** vrijgespeeld\n\n⚡ Alles is **onmiddellijk** beschikbaar na je storting!",
    
    faq_reliable_question: "Is het betrouwbaar?",
    faq_reliable_answer: "🔒 **Absoluut veilig en gecertificeerd!**\n\n✅ **Officieel gecertificeerde** spelsite\n✅ Actief in **verschillende landen**\n✅ **Veilige betalingen**\n\n🎯 Onze filosofie:\n> 💫 Je stort\n> 🎮 Je speelt\n> 💸 Je neemt op\n\n**Simpel. Zonder gedoe.** ✨",
    
    faq_what_game_question: "Wat is het spel precies?",
    faq_what_game_answer: "🎯 Het is een site met **online mini-games** met echt geld.\n\n> 🎰 Simpele en leuke mini-games\n> 💰 Minimale inzet vanaf **0,20€**\n> 🎁 Automatische bonus bij elke storting\n\n⚡ **Je stort, je speelt, je neemt op** — zo simpel is het!",
    
    faq_age_question: "Hoe oud moet je zijn?",
    faq_age_answer: "🆔 Je moet **minstens 18 jaar oud** zijn.\n\n> ✅ Een identiteitsbewijs wordt gevraagd bij de eerste opname\n> 🔒 Dit is om de wet te respecteren en minderjarigen te beschermen\n\n💡 Als je jonger dan 18 bent, kom terug als je meerderjarig bent! 😊",
    
    faq_deposit_question: "Hoe stort ik?",
    faq_deposit_answer: "💳 **Super makkelijk!**\n\n> 1️⃣ Klik op de knop **\"Nu spelen\"**\n> 2️⃣ Registreer je in 30 seconden\n> 3️⃣ Kies je bedrag (minimum 10€)\n> 4️⃣ Betaal met **creditcard**\n\n⚡ En klaar, je account wordt **onmiddellijk bijgeschreven** met de **x2 bonus**!",
    
    faq_support_question: "En als ik een probleem heb?",
    faq_support_answer: "🆘 **Support 24/7 beschikbaar!**\n\n> 💬 Live chat op de site\n> 📧 Support e-mail\n> ⚡ Antwoord binnen 2u\n\n✅ Het team is **reactief en professioneel** — je wordt nooit zonder antwoord gelaten!",
    
    // Knoppen
    cta_button: "🎮 Nu spelen",
    cta_button_mobile: "Spelen",
    
    // Bonus
    bonus_title: "🎁 EXCLUSIEVE BONUS",
    bonus_subtitle: "Je eerste storting wordt automatisch verdubbeld!",
    bonus_percentage: "100% Bonus",
    bonus_how_it_works: "Hoe werkt het?",
    bonus_deposit: "Stort 10€",
    bonus_receive: "Ontvang 20€",
    bonus_automatic: "Je geld wordt automatisch verdubbeld!",
    bonus_claim: "MIJN BONUS CLAIMEN",
    bonus_welcome_offer: "WELKOMSTAANBIEDING 🎁",
    
    // Footer
    footer_become_affiliate: "💼 Word partner",
    
    // Testimonials
    testimonials_title: "💬 Ze hebben het geprobeerd, ze zijn er dol op!",
    testimonials_recent_gains: "Recente Winsten 💸"
  },
  
  EN: {
    // Page Title
    page_title: "10€ + 10€ bonus",
    
    // FAQ Title
    faq_title: "❓ Frequently Asked Questions",
    
    // FAQ EN
    faq_access_question: "",
    faq_access_answer: "",
    faq_bonus_question: "Is there a bonus if I deposit?",
    faq_bonus_answer: "💬 **Yes, and it's automatic.**\nAs soon as you deposit **at least 10€**, your deposit is **instantly doubled** — **no promo code needed.**\n\n> 🔥 You deposit 20€ ➝ you play with 40€\n> 💸 You deposit 100€ ➝ you play directly with 200€\n\n✅ The **x2 bonus is guaranteed** on every deposit, no matter the amount.\nAnd if you play right away, you often get a little surprise bonus too 🎉",
    
    faq_withdraw_question: "Can I withdraw the money?",
    faq_withdraw_answer: "💬 **Of course!**\n\nAs soon as you've won, you can withdraw to your bank account and you'll receive it in **2 days** on your bank account like a classic transfer. 💳\n\n✨ **Simple and fast:**\n> 🏦 Withdrawal request\n> ⏱️ Processing within 2h\n> 💸 Transfer to your account",
    
    faq_games_question: "Where are the games?",
    faq_games_answer: "🎮 Once registered and logged in, and your **first deposit** is made:\n\n> 🎲 Access to **exclusive mini-games**\n> 🎯 **Intuitive interface**\n> 🌟 **Special bonuses** unlocked\n\n⚡ Everything is **instant** after your deposit!",
    
    faq_reliable_question: "Is it reliable?",
    faq_reliable_answer: "🔒 **Absolutely safe and certified!**\n\n✅ **Officially certified** gaming site\n✅ Active in **several countries**\n✅ **Secure payments**\n\n🎯 Our philosophy:\n> 💫 You deposit\n> 🎮 You play\n> 💸 You withdraw\n\n**Simple. No hassle.** ✨",
    
    faq_what_game_question: "What exactly is the game?",
    faq_what_game_answer: "🎯 It's an **online mini-games** site with real money.\n\n> 🎰 Simple and fun mini-games\n> 💰 Minimum bet from **0.20€**\n> 🎁 Automatic bonus on every deposit\n\n⚡ **You deposit, you play, you withdraw** — it's that simple!",
    
    faq_age_question: "How old do you have to be?",
    faq_age_answer: "🆔 You must be **at least 18 years old**.\n\n> ✅ An ID will be requested on the first withdrawal\n> 🔒 It's to comply with the law and protect minors\n\n💡 If you're under 18, come back when you're of age! 😊",
    
    faq_deposit_question: "How do I deposit?",
    faq_deposit_answer: "💳 **Super easy!**\n\n> 1️⃣ Click on the **\"Play now\"** button\n> 2️⃣ Register in 30 seconds\n> 3️⃣ Choose your amount (minimum 10€)\n> 4️⃣ Pay by **credit card**\n\n⚡ And boom, your account is **instantly credited** with the **x2 bonus**!",
    
    faq_support_question: "What if I have a problem?",
    faq_support_answer: "🆘 **Support available 24/7!**\n\n> 💬 Live chat on the site\n> 📧 Support email\n> ⚡ Response in less than 2h\n\n✅ The team is **responsive and professional** — you'll never be left without an answer!",
    
    // Buttons
    cta_button: "🎮 Play now",
    cta_button_mobile: "Play",
    
    // Bonus
    bonus_title: "🎁 EXCLUSIVE BONUS",
    bonus_subtitle: "Your first deposit automatically doubled!",
    bonus_percentage: "100% Bonus",
    bonus_how_it_works: "How does it work?",
    bonus_deposit: "Deposit 10€",
    bonus_receive: "Receive 20€",
    bonus_automatic: "Your money is automatically doubled!",
    bonus_claim: "CLAIM MY BONUS",
    bonus_welcome_offer: "WELCOME OFFER 🎁",
    
    // Footer
    footer_become_affiliate: "💼 Become an affiliate",
    
    // Testimonials
    testimonials_title: "💬 They tried it, they love it!",
    testimonials_recent_gains: "Recent Wins 💸"
  },
  
  PT: {
    // Page Title
    page_title: "10€ + 10€ bónus",
    
    // FAQ Title
    faq_title: "❓ Perguntas Frequentes",
    
    // FAQ PT
    faq_access_question: "",
    faq_access_answer: "",
    faq_bonus_question: "Há um bónus se eu depositar?",
    faq_bonus_answer: "💬 **Sim, e é automático.**\nAssim que depositares **pelo menos 10€**, o teu depósito é **duplicado instantaneamente** — **não precisas de código promocional.**\n\n> 🔥 Depositas 20€ ➝ jogas com 40€\n> 💸 Depositas 100€ ➝ jogas diretamente com 200€\n\n✅ O bónus **x2 é garantido** em cada depósito, seja qual for o valor.\nE se jogares de imediato, recebes frequentemente até um pequeno bónus surpresa 🎉",
    
    faq_withdraw_question: "Posso levantar o dinheiro?",
    faq_withdraw_answer: "💬 **Claro!**\n\nAssim que ganhares, podes levantar para a tua conta bancária e receberás em **2 dias** na tua conta bancária como uma transferência clássica. 💳\n\n✨ **Simples e rápido:**\n> 🏦 Pedido de levantamento\n> ⏱️ Processamento em 2h\n> 💸 Transferência para a tua conta",
    
    faq_games_question: "Onde estão os jogos?",
    faq_games_answer: "🎮 Assim que estiveres registado e ligado, e o teu **primeiro depósito** estiver feito:\n\n> 🎲 Acesso a **mini-jogos exclusivos**\n> 🎯 **Interface intuitiva**\n> 🌟 **Bónus especiais** desbloqueados\n\n⚡ Tudo é **instantâneo** após o teu depósito!",
    
    faq_reliable_question: "É fiável?",
    faq_reliable_answer: "🔒 **Absolutamente seguro e certificado!**\n\n✅ Site de jogo **oficialmente certificado**\n✅ Ativo em **vários países**\n✅ **Pagamentos seguros**\n\n🎯 A nossa filosofia:\n> 💫 Depositas\n> 🎮 Jogas\n> 💸 Levantas\n\n**Simples. Sem complicações.** ✨",
    
    faq_what_game_question: "O que é exatamente o jogo?",
    faq_what_game_answer: "🎯 É um site de **mini-jogos online** com dinheiro real.\n\n> 🎰 Mini-jogos simples e divertidos\n> 💰 Aposta mínima a partir de **0,20€**\n> 🎁 Bónus automático em cada depósito\n\n⚡ **Depositas, jogas, levantas** — é assim tão simples!",
    
    faq_age_question: "Que idade é necessária?",
    faq_age_answer: "🆔 É necessário ter **pelo menos 18 anos**.\n\n> ✅ Um documento de identidade será pedido no primeiro levantamento\n> 🔒 É para respeitar a lei e proteger os menores\n\n💡 Se tens menos de 18 anos, volta quando fores maior de idade! 😊",
    
    faq_deposit_question: "Como deposito?",
    faq_deposit_answer: "💳 **Super fácil!**\n\n> 1️⃣ Clica no botão **\"Jogar agora\"**\n> 2️⃣ Regista-te em 30 segundos\n> 3️⃣ Escolhe o teu valor (mínimo 10€)\n> 4️⃣ Paga com **cartão de crédito**\n\n⚡ E pronto, a tua conta é **creditada instantaneamente** com o **bónus x2**!",
    
    faq_support_question: "E se tiver um problema?",
    faq_support_answer: "🆘 **Suporte disponível 24/7!**\n\n> 💬 Chat ao vivo no site\n> 📧 Email de suporte\n> ⚡ Resposta em menos de 2h\n\n✅ A equipa é **reativa e profissional** — nunca ficarás sem resposta!",
    
    // Botões
    cta_button: "🎮 Jogar agora",
    cta_button_mobile: "Jogar",
    
    // Bónus
    bonus_title: "🎁 BÓNUS EXCLUSIVO",
    bonus_subtitle: "O teu primeiro depósito duplicado automaticamente!",
    bonus_percentage: "100% de Bónus",
    bonus_how_it_works: "Como funciona?",
    bonus_deposit: "Depositas 10€",
    bonus_receive: "Recebes 20€",
    bonus_automatic: "O teu dinheiro é duplicado automaticamente!",
    bonus_claim: "RECLAMAR O MEU BÓNUS",
    bonus_welcome_offer: "OFERTA DE BOAS-VINDAS 🎁",
    
    // Footer
    footer_become_affiliate: "💼 Tornar-me afiliado",
    
    // Testimonials
    testimonials_title: "💬 Eles experimentaram, adoram!",
    testimonials_recent_gains: "Ganhos Recentes 💸"
  },
  
  RU: {
    // Page Title
    page_title: "10€ + 10€ бонус",
    
    // FAQ Title
    faq_title: "❓ Часто задаваемые вопросы",
    
    // FAQ RU
    faq_access_question: "",
    faq_access_answer: "",
    faq_bonus_question: "Есть ли бонус при депозите?",
    faq_bonus_answer: "💬 **Да, и он автоматический.**\nКак только вы внесете **минимум 10€**, ваш депозит **мгновенно удваивается** — **промокод не нужен.**\n\n> 🔥 Вы вносите 20€ ➝ играете с 40€\n> 💸 Вы вносите 100€ ➝ играете сразу с 200€\n\n✅ Бонус **x2 гарантирован** на каждый депозит, независимо от суммы.\nА если играете сразу, часто получаете еще небольшой бонус-сюрприз 🎉",
    
    faq_withdraw_question: "Могу ли я вывести деньги?",
    faq_withdraw_answer: "💬 **Конечно!**\n\nКак только вы выиграли, можете вывести на свой банковский счет и получите деньги через **2 дня** на свой банковский счет как классический перевод. 💳\n\n✨ **Просто и быстро:**\n> 🏦 Запрос на вывод\n> ⏱️ Обработка за 2ч\n> 💸 Перевод на ваш счет",
    
    faq_games_question: "Где игры?",
    faq_games_answer: "🎮 Как только зарегистрируетесь и войдете, и сделаете свой **первый депозит**:\n\n> 🎲 Доступ к **эксклюзивным мини-играм**\n> 🎯 **Интуитивный интерфейс**\n> 🌟 **Специальные бонусы** разблокированы\n\n⚡ Все **мгновенно** после вашего депозита!",
    
    faq_reliable_question: "Это надежно?",
    faq_reliable_answer: "🔒 **Абсолютно безопасно и сертифицировано!**\n\n✅ **Официально сертифицированный** игровой сайт\n✅ Активен в **нескольких странах**\n✅ **Безопасные платежи**\n\n🎯 Наша философия:\n> 💫 Вы вносите\n> 🎮 Вы играете\n> 💸 Вы выводите\n\n**Просто. Без проблем.** ✨",
    
    faq_what_game_question: "Что это за игра?",
    faq_what_game_answer: "🎯 Это сайт с **онлайн мини-играми** на реальные деньги.\n\n> 🎰 Простые и веселые мини-игры\n> 💰 Минимальная ставка от **0,20€**\n> 🎁 Автоматический бонус на каждый депозит\n\n⚡ **Вносите, играете, выводите** — вот так просто!",
    
    faq_age_question: "Сколько лет должно быть?",
    faq_age_answer: "🆔 Вам должно быть **минимум 18 лет**.\n\n> ✅ Удостоверение личности потребуется при первом выводе\n> 🔒 Это для соблюдения закона и защиты несовершеннолетних\n\n💡 Если вам меньше 18, возвращайтесь когда станете совершеннолетним! 😊",
    
    faq_deposit_question: "Как внести депозит?",
    faq_deposit_answer: "💳 **Супер легко!**\n\n> 1️⃣ Нажмите кнопку **\"Играть сейчас\"**\n> 2️⃣ Зарегистрируйтесь за 30 секунд\n> 3️⃣ Выберите сумму (минимум 10€)\n> 4️⃣ Оплатите **кредитной картой**\n\n⚡ И готово, ваш счет **мгновенно пополнен** с **бонусом x2**!",
    
    faq_support_question: "Что если у меня проблема?",
    faq_support_answer: "🆘 **Поддержка доступна 24/7!**\n\n> 💬 Онлайн-чат на сайте\n> 📧 Email поддержки\n> ⚡ Ответ менее чем за 2ч\n\n✅ Команда **отзывчивая и профессиональная** — вы никогда не останетесь без ответа!",
    
    // Кнопки
    cta_button: "🎮 Играть сейчас",
    cta_button_mobile: "Играть",
    
    // Бонус
    bonus_title: "🎁 ЭКСКЛЮЗИВНЫЙ БОНУС",
    bonus_subtitle: "Ваш первый депозит автоматически удваивается!",
    bonus_percentage: "100% Бонус",
    bonus_how_it_works: "Как это работает?",
    bonus_deposit: "Вносите 10€",
    bonus_receive: "Получаете 20€",
    bonus_automatic: "Ваши деньги автоматически удваиваются!",
    bonus_claim: "ПОЛУЧИТЬ МОЙ БОНУС",
    bonus_welcome_offer: "ПРИВЕТСТВЕННОЕ ПРЕДЛОЖЕНИЕ 🎁",
    
    // Footer
    footer_become_affiliate: "💼 Стать партнером",
    
    // Отзывы
    testimonials_title: "💬 Они попробовали, им понравилось!",
    testimonials_recent_gains: "Недавние Выигрыши 💸"
  },
  
  LT: {
    // Page Title
    page_title: "10€ + 10€ bonusas",
    
    // FAQ Title
    faq_title: "❓ Dažnai Užduodami Klausimai",
    
    // FAQ LT
    faq_access_question: "Negaliu patekti į svetainę?",
    faq_access_answer: "🚫 **Jei negalite patekti į svetainę**, nesijaudinkite!\n\n💡 Galite bandyti su šia alternatyvia nuoroda:\n\n👉 <a href=\"MYSTAKE_LINK\" target=\"_blank\" style=\"color: #f59e0b; font-weight: bold; text-decoration: underline;\">SPAUSKITE ČIA</a>\n\n✅ Ši nuoroda veikia **24/7** visose šalyse!",
    faq_bonus_question: "Ar yra bonusas, jei įnešu?",
    faq_bonus_answer: "💬 **Taip, ir tai automatinis.**\nKai tik įnešite **bent 10€**, jūsų indėlis **iš karto padvigubinamas** — **promo kodas nereikalingas.**\n\n> 🔥 Įnešate 20€ ➝ žaidžiate su 40€\n> 💸 Įnešate 100€ ➝ iš karto žaidžiate su 200€\n\n✅ **x2 bonusas garantuojamas** kiekvieno įnešimo metu, nesvarbu kokia suma.\nO jei žaidžiate iš karto, dažnai gausite dar mažą siurprizo bonusą 🎉",
    
    faq_withdraw_question: "Ar galiu išsiimti pinigus?",
    faq_withdraw_answer: "💬 **Žinoma!**\n\nKai tik laimėsite, galite išsiimti į savo banko sąskaitą ir gausite per **2 dienas** į savo banko sąskaitą kaip įprastą pavedimą. 💳\n\n✨ **Paprasta ir greita:**\n> 🏦 Išėmimo prašymas\n> ⏱️ Apdorojimas per 2 val\n> 💸 Pavedimas į jūsų sąskaitą",
    
    faq_games_question: "Kur yra žaidimai?",
    faq_games_answer: "🎮 Kai užsiregistruosite ir prisijungsite, ir atliksite savo **pirmą įnašą**:\n\n> 🎲 Prieiga prie **ekskluzyvių mini žaidimų**\n> 🎯 **Intuityvi sąsaja**\n> 🌟 **Specialūs bonusai** atrakinti\n\n⚡ Viskas **akimirksniu** po jūsų įnešimo!",
    
    faq_reliable_question: "Ar tai patikima?",
    faq_reliable_answer: "🔒 **Visiškai saugu ir sertifikuota!**\n\n✅ **Oficialiai sertifikuota** žaidimų svetainė\n✅ Aktyvi **keliose šalyse**\n✅ **Saugūs mokėjimai**\n\n🎯 Mūsų filosofija:\n> 💫 Jūs įnešate\n> 🎮 Jūs žaidžiate\n> 💸 Jūs išimate\n\n**Paprasta. Be streso.** ✨",
    
    faq_what_game_question: "Kas tiksliai yra šis žaidimas?",
    faq_what_game_answer: "🎯 Tai **internetinių mini žaidimų** svetainė su tikrais pinigais.\n\n> 🎰 Paprasti ir smagūs mini žaidimai\n> 💰 Minimalus statymas nuo **0,20€**\n> 🎁 Automatinis bonusas kiekvieno įnešimo metu\n\n⚡ **Įnešate, žaidžiate, išimate** — taip paprasta!",
    
    faq_age_question: "Koks turi būti amžius?",
    faq_age_answer: "🆔 Turite būti **bent 18 metų**.\n\n> ✅ Asmens tapatybės dokumentas bus paprašytas pirmojo išėmimo metu\n> 🔒 Tai skirta laikytis įstatymo ir apsaugoti nepilnamečius\n\n💡 Jei jums mažiau nei 18, grįžkite kai būsite pilnametis! 😊",
    
    faq_deposit_question: "Kaip įnešti?",
    faq_deposit_answer: "💳 **Labai lengva!**\n\n> 1️⃣ Paspauskite mygtuką **\"Žaisti dabar\"**\n> 2️⃣ Užsiregistruokite per 30 sekundžių\n> 3️⃣ Pasirinkite sumą (minimum 10€)\n> 4️⃣ Mokėkite **banko kortele**\n\n⚡ Ir viskas, jūsų sąskaita **iš karto papildoma** su **x2 bonusu**!",
    
    faq_support_question: "O jei turiu problemą?",
    faq_support_answer: "🆘 **Palaikymas prieinamas 24/7!**\n\n> 💬 Tiesioginis pokalbis svetainėje\n> 📧 Palaikymo el. paštas\n> ⚡ Atsakymas per mažiau nei 2 val\n\n✅ Komanda **reaguoja ir profesionali** — niekada nebūsite palikti be atsakymo!",
    
    // Mygtukai
    cta_button: "🎮 Žaisti dabar",
    cta_button_mobile: "Žaisti",
    
    // Bonusas
    bonus_title: "🎁 EKSKLUZYVUS BONUSAS",
    bonus_subtitle: "Jūsų pirmas įnešimas automatiškai padvigubinamas!",
    bonus_percentage: "100% Bonusas",
    bonus_how_it_works: "Kaip tai veikia?",
    bonus_deposit: "Įnešti 10€",
    bonus_receive: "Gauti 20€",
    bonus_automatic: "Jūsų pinigai padvigubinami automatiškai!",
    bonus_claim: "GAUTI SAVO BONUSĄ",
    bonus_welcome_offer: "SVEIKINAMASIS PASIŪLYMAS 🎁",
    
    // Footer
    footer_become_affiliate: "💼 Tapti partneriu",
    
    // Atsiliepimai
    testimonials_title: "💬 Jie išbandė, jiems patinka!",
    testimonials_recent_gains: "Naujausi Laimėjimai 💸"
  },

  RO: {
    page_title: "10€ + 10€ cadou",

    faq_title: "❓ Întrebări Frecvente",

    faq_access_question: "Nu pot accesa site-ul?",
    faq_access_answer: "🚫 **Dacă nu poți accesa site-ul**, fără panică!\n\n💡 Poți încerca cu acest link alternativ:\n\n👉 <a href=\"MYSTAKE_LINK\" target=\"_blank\" style=\"color: #f59e0b; font-weight: bold; text-decoration: underline;\">CLICK AICI</a>\n\n✅ Acest link funcționează **24/7** în toate țările!",
    faq_bonus_question: "Există un bonus dacă depun?",
    faq_bonus_answer: "💬 **Da, și este automat.**\nDe îndată ce depui **cel puțin 10€**, depozitul tău este **dublat instantaneu** — **fără cod promoțional.**\n\n> 🔥 Depui 20€ ➝ joci cu 40€\n> 💸 Depui 100€ ➝ joci direct cu 200€\n\n✅ **Bonusul x2 este garantat** la fiecare depunere, indiferent de sumă.\nȘi dacă joci imediat, deseori primești și un mic bonus surpriză 🎉",

    faq_withdraw_question: "Se pot retrage banii?",
    faq_withdraw_answer: "💬 **Bineînțeles!**\n\nDe îndată ce ai câștigat, poți retrage în contul tău bancar și vei primi în **2 zile** ca un transfer bancar clasic. 💳\n\n✨ **Simplu și rapid:**\n> 🏦 Cerere de retragere\n> ⏱️ Procesare în 2 ore\n> 💸 Transfer în contul tău",

    faq_games_question: "Unde sunt jocurile?",
    faq_games_answer: "🎮 Odată înregistrat și conectat, și după ce ai făcut **prima depunere**:\n\n> 🎲 Acces la **mini-jocuri exclusive**\n> 🎯 **Interfață intuitivă**\n> 🌟 **Bonusuri speciale** deblocate\n\n⚡ Totul este **instantaneu** după depunerea ta!",

    faq_reliable_question: "Este de încredere?",
    faq_reliable_answer: "🔒 **Absolut sigur și certificat!**\n\n✅ Site de jocuri **certificat oficial**\n✅ Activ în **mai multe țări**\n✅ **Plăți securizate**\n\n🎯 Filosofia noastră:\n> 💫 Depui\n> 🎮 Joci\n> 💸 Retragi\n\n**Simplu. Fără bătăi de cap.** ✨",

    faq_what_game_question: "Ce este exact acest joc?",
    faq_what_game_answer: "🎯 Este un site de **mini-jocuri online** cu bani reali.\n\n> 🎰 Mini-jocuri simple și distractive\n> 💰 Miză minimă de la **0,20€**\n> 🎁 Bonus automat la fiecare depunere\n\n⚡ **Depui, joci, retragi** — e atât de simplu!",

    faq_age_question: "Ce vârstă trebuie să ai?",
    faq_age_answer: "🆔 Trebuie să ai **cel puțin 18 ani**.\n\n> ✅ Un document de identitate va fi cerut la prima retragere\n> 🔒 Este pentru a respecta legea și a proteja minorii\n\n💡 Dacă ai sub 18 ani, revino când vei fi major! 😊",

    faq_deposit_question: "Cum depun?",
    faq_deposit_answer: "💳 **Super ușor!**\n\n> 1️⃣ Apasă pe butonul **\"Joacă acum\"**\n> 2️⃣ Înregistrează-te în 30 de secunde\n> 3️⃣ Alege suma (minimum 10€)\n> 4️⃣ Plătește cu **cardul bancar**\n\n⚡ Și gata, contul tău este **creditat instantaneu** cu **bonusul x2**!",

    faq_support_question: "Și dacă am o problemă?",
    faq_support_answer: "🆘 **Suport disponibil 24/7!**\n\n> 💬 Chat live pe site\n> 📧 Email de suport\n> ⚡ Răspuns în mai puțin de 2 ore\n\n✅ Echipa este **reactivă și profesionistă** — nu vei fi niciodată lăsat fără răspuns!",

    cta_button: "🎮 Joacă acum",
    cta_button_mobile: "Joacă",

    bonus_title: "🎁 BONUS EXCLUSIV",
    bonus_subtitle: "Prima ta depunere dublată automat!",
    bonus_percentage: "100% Bonus",
    bonus_how_it_works: "Cum funcționează?",
    bonus_deposit: "Depune 10€",
    bonus_receive: "Primești 20€",
    bonus_automatic: "Banii tăi sunt dublați automat!",
    bonus_claim: "REVENDICĂ BONUSUL MEU",
    bonus_welcome_offer: "OFERTĂ DE BINE VENIT 🎁",

    footer_become_affiliate: "💼 Devino afiliat",

    testimonials_title: "💬 Ei au încercat, le-a plăcut!",
    testimonials_recent_gains: "Câștiguri Recente 💸"
  },

  PL: {
    page_title: "10€ + 10€ bonus",

    faq_title: "❓ Często Zadawane Pytania",

    faq_access_question: "Nie mogę wejść na stronę?",
    faq_access_answer: "🚫 **Jeśli nie możesz wejść na stronę**, bez paniki!\n\n💡 Możesz spróbować tego alternatywnego linku:\n\n👉 <a href=\"MYSTAKE_LINK\" target=\"_blank\" style=\"color: #f59e0b; font-weight: bold; text-decoration: underline;\">KLIKNIJ TUTAJ</a>\n\n✅ Ten link działa **24/7** we wszystkich krajach!",
    faq_bonus_question: "Czy jest bonus, jeśli wpłacę?",
    faq_bonus_answer: "💬 **Tak, i to automatycznie.**\nGdy tylko wpłacisz **co najmniej 10€**, Twoja wpłata jest **natychmiast podwajana** — **bez kodu promocyjnego.**\n\n> 🔥 Wpłacasz 20€ ➝ grasz z 40€\n> 💸 Wpłacasz 100€ ➝ grasz od razu z 200€\n\n✅ Bonus **x2 jest gwarantowany** przy każdej wpłacie, niezależnie od kwoty.\nA jeśli grasz od razu, często dostajesz jeszcze mały bonus niespodziankę 🎉",

    faq_withdraw_question: "Czy mogę wypłacić pieniądze?",
    faq_withdraw_answer: "💬 **Oczywiście!**\n\nGdy tylko wygrasz, możesz wypłacić na swoje konto bankowe i otrzymasz w **2 dni** przelew jak zwykły transfer. 💳\n\n✨ **Prosto i szybko:**\n> 🏦 Wniosek o wypłatę\n> ⏱️ Realizacja w ciągu 2h\n> 💸 Przelew na Twoje konto",

    faq_games_question: "Gdzie są gry?",
    faq_games_answer: "🎮 Po rejestracji i zalogowaniu oraz dokonaniu **pierwszej wpłaty**:\n\n> 🎲 Dostęp do **ekskluzywnych mini-gier**\n> 🎯 **Intuicyjny interfejs**\n> 🌟 **Specjalne bonusy** odblokowane\n\n⚡ Wszystko **natychmiast** po Twojej wpłacie!",

    faq_reliable_question: "Czy to jest wiarygodne?",
    faq_reliable_answer: "🔒 **Absolutnie bezpieczne i certyfikowane!**\n\n✅ **Oficjalnie certyfikowana** strona do gry\n✅ Aktywna w **wielu krajach**\n✅ **Bezpieczne płatności**\n\n🎯 Nasza filozofia:\n> 💫 Wpłacasz\n> 🎮 Grasz\n> 💸 Wypłacasz\n\n**Prosto. Bez stresu.** ✨",

    faq_what_game_question: "Co to dokładnie za gra?",
    faq_what_game_answer: "🎯 To strona z **mini-grami online** za prawdziwe pieniądze.\n\n> 🎰 Proste i zabawne mini-gry\n> 💰 Minimalna stawka od **0,20€**\n> 🎁 Automatyczny bonus przy każdej wpłacie\n\n⚡ **Wpłacasz, grasz, wypłacasz** — tak to proste!",

    faq_age_question: "Ile trzeba mieć lat?",
    faq_age_answer: "🆔 Musisz mieć **co najmniej 18 lat**.\n\n> ✅ Dokument tożsamości będzie wymagany przy pierwszej wypłacie\n> 🔒 Aby przestrzegać prawa i chronić nieletnich\n\n💡 Jeśli masz mniej niż 18 lat, wróć gdy będziesz pełnoletni! 😊",

    faq_deposit_question: "Jak wpłacić?",
    faq_deposit_answer: "💳 **Super łatwe!**\n\n> 1️⃣ Kliknij przycisk **\"Graj teraz\"**\n> 2️⃣ Zarejestruj się w 30 sekund\n> 3️⃣ Wybierz kwotę (minimum 10€)\n> 4️⃣ Zapłać **kartą bankową**\n\n⚡ I gotowe, Twoje konto jest **natychmiast zasilone** z **bonusem x2**!",

    faq_support_question: "Co jeśli mam problem?",
    faq_support_answer: "🆘 **Wsparcie dostępne 24/7!**\n\n> 💬 Czat na żywo na stronie\n> 📧 E-mail wsparcia\n> ⚡ Odpowiedź w mniej niż 2h\n\n✅ Zespół jest **reaktywny i profesjonalny** — nigdy nie zostaniesz bez odpowiedzi!",

    cta_button: "🎮 Graj teraz",
    cta_button_mobile: "Graj",

    bonus_title: "🎁 EKSKLUZYWNY BONUS",
    bonus_subtitle: "Twoja pierwsza wpłata automatycznie podwojona!",
    bonus_percentage: "100% Bonus",
    bonus_how_it_works: "Jak to działa?",
    bonus_deposit: "Wpłać 10€",
    bonus_receive: "Otrzymaj 20€",
    bonus_automatic: "Twoje pieniądze są automatycznie podwajane!",
    bonus_claim: "ODBIERZ MÓJ BONUS",
    bonus_welcome_offer: "OFERTA POWITALNA 🎁",

    footer_become_affiliate: "💼 Zostań partnerem",

    testimonials_title: "💬 Wypróbowali, uwielbiają!",
    testimonials_recent_gains: "Ostatnie Wygrane 💸"
  }
};

// Mapping pays → langue d'interface
const COUNTRY_TO_LANG: Record<string, Language> = {
  // Francophone
  FR: 'FR', BE: 'FR', CH: 'FR', MC: 'FR', LU: 'FR',
  CI: 'FR', SN: 'FR', CM: 'FR', MG: 'FR', ML: 'FR', BF: 'FR', NE: 'FR',
  TD: 'FR', GN: 'FR', RW: 'FR', BJ: 'FR', TG: 'FR', CD: 'FR', CG: 'FR',
  GA: 'FR', DJ: 'FR', KM: 'FR', HT: 'FR', RE: 'FR', GP: 'FR', MQ: 'FR',
  GF: 'FR', YT: 'FR', NC: 'FR', PF: 'FR', WF: 'FR', PM: 'FR', BL: 'FR', MF: 'FR',
  // Italien
  IT: 'IT',
  // Hispanophone
  ES: 'ES', MX: 'ES', AR: 'ES', CO: 'ES', CL: 'ES', PE: 'ES', VE: 'ES',
  EC: 'ES', GT: 'ES', CU: 'ES', BO: 'ES', DO: 'ES', HN: 'ES', PY: 'ES',
  SV: 'ES', NI: 'ES', CR: 'ES', PA: 'ES', UY: 'ES', PR: 'ES',
  // Germanophone
  DE: 'DE', AT: 'DE',
  // Néerlandophone
  NL: 'NL',
  // Lusophone
  PT: 'PT', BR: 'PT', AO: 'PT', MZ: 'PT',
  // Russe
  RU: 'RU', BY: 'RU', KZ: 'RU', KG: 'RU',
  // Lituanien
  LT: 'LT',
  // Roumain
  RO: 'RO', MD: 'RO',
  // Polonais
  PL: 'PL',
  // Anglophone
  GB: 'EN', US: 'EN', CA: 'EN', AU: 'EN', NZ: 'EN', IE: 'EN', ZA: 'EN',
  NG: 'EN', GH: 'EN', KE: 'EN', IN: 'EN', PH: 'EN', SG: 'EN',
};

export function countryToLang(country?: string): Language {
  if (!country) return 'FR';
  return COUNTRY_TO_LANG[country.toUpperCase()] || 'EN';
}

// Helper function pour obtenir la traduction
export function getTranslation(lang?: Language): Translation {
  // Si pas de langue définie, retourner français par défaut
  if (!lang || !translations[lang]) {
    return translations.FR;
  }
  return translations[lang];
}

// Helper function pour adapter les montants à la devise du pays
export function adaptCurrencyInText(text: string, country?: string): string {
  const currencySymbol = getCurrencySymbol(country);
  
  // Si c'est déjà des euros, pas besoin de changer
  if (currencySymbol === '€') {
    return text;
  }
  
  // Remplacer tous les € par le symbole approprié
  // Garder les montants identiques pour UK (£) et US/CA ($)
  // Pour CHF, ajouter "CHF" après le montant
  if (currencySymbol === 'CHF') {
    // Remplacer "10€" par "10 CHF"
    return text.replace(/(\d+)€/g, '$1 CHF');
  }
  
  // Pour zł, mettre le symbole après le montant
  if (currencySymbol === 'zł') {
    return text.replace(/(\d+)€/g, '$1 zł');
  }

  // Pour £ et $, remplacer simplement le symbole
  return text.replace(/€/g, currencySymbol);
}

