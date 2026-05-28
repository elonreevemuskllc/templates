/**
 * URL Telegram « devenir affilié » : handle, @handle, t.me/… ou URL https complète.
 */
export function affiliateTelegramUrl(telegramContact?: string | null): string {
  let raw = (telegramContact ?? 'leon_aprilftd').trim();
  if (!raw) return 'https://t.me/leon_aprilftd';
  raw = raw.replace(/^@/, '');
  const tmeMatch = raw.match(/^https?:\/\/(?:t\.me|telegram\.me)\/([^/?#]+)/i);
  if (tmeMatch) return `https://t.me/${tmeMatch[1]}`;
  if (/^https?:\/\//i.test(raw)) return raw;
  const handle = raw.replace(/^t\.me\//i, '').split(/[/?#]/)[0];
  return `https://t.me/${handle || 'leon_aprilftd'}`;
}
