import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit {

  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;

  readonly currentYear = new Date().getFullYear();
  readonly githubUrl   = 'https://github.com/Zavcorp';
  readonly linkedinUrl = 'https://linkedin.com/in/adrianzavaleta23';

  visitCount = signal<number>(0);

  ngOnInit(): void {
    this.trackVisit();
  }

  /**
   * Contador de visitas globales usando localStorage.
   *
   * Para hacerlo verdaderamente global (compartido entre visitantes)
   * necesitarías un backend o servicio externo como:
   *   - Firebase Realtime Database
   *   - Supabase
   *   - Un endpoint en tu API .NET
   *
   * Por ahora cuenta visitas únicas por sesión/dispositivo.
   * Para integrar un contador real, reemplaza esta lógica
   * con una llamada a tu API o Firebase.
   */
  private trackVisit(): void {
    try {
      const KEY       = 'az_portfolio_visits';
      const SESSION   = 'az_portfolio_visited_this_session';

      // Leer visitas acumuladas
      const stored = localStorage.getItem(KEY);
      let count    = stored ? parseInt(stored, 10) : 0;

      // Solo cuenta una vez por sesión de navegador
      const alreadyCounted = sessionStorage.getItem(SESSION);
      if (!alreadyCounted) {
        count++;
        localStorage.setItem(KEY, count.toString());
        sessionStorage.setItem(SESSION, '1');
      }

      this.animateCounter(count);
    } catch {
      // localStorage puede no estar disponible (modo privado, etc.)
      this.visitCount.set(0);
    }
  }

  /** Animación de conteo numérico al cargar */
  private animateCounter(target: number): void {
    if (target === 0) { this.visitCount.set(0); return; }

    const duration = 1200;
    const start    = performance.now();
    const from     = Math.max(0, target - Math.min(target, 30));

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current  = Math.round(from + (target - from) * eased);
      this.visitCount.set(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  scrollTo(fragment: string): void {
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
