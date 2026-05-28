// Haptic feedback pour mobile web
// Technique exacte de WebHaptics (haptics.lochie.me) :
// - Android  : navigator.vibrate()
// - iOS      : <input type="checkbox" switch=""> caché → label.click()
//              L'attribut "switch" (Apple) déclenche le Taptic Engine nativement

class HapticsEngine {
  private hapticLabel: HTMLLabelElement | null = null;
  private domReady = false;

  private get vibrateSupported() {
    return typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
  }

  private ensureDOM() {
    if (this.domReady || typeof document === 'undefined') return;
    const id = 'haptic-switch-input';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('switch', '');
    input.id = id;
    input.style.cssText = 'all:initial;appearance:auto;display:none;';

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.style.display = 'none';
    label.appendChild(input);
    document.body.appendChild(label);

    this.hapticLabel = label;
    this.domReady = true;
  }

  private fire(pattern: number | number[]) {
    if (this.vibrateSupported) {
      navigator.vibrate(pattern);
    } else {
      // iOS : click sur le switch caché → Taptic Engine
      this.ensureDOM();
      this.hapticLabel?.click();
    }
  }

  /** Clic léger — scroll / section */
  light() { this.fire(10); }

  /** Clic moyen — swipe */
  medium() { this.fire(20); }

  /** Clic fort — bouton CTA */
  heavy() { this.fire([30, 10, 30]); }
}

const haptics = new HapticsEngine();
export default haptics;
