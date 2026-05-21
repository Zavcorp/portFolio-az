import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  signal,
  computed,
  inject
} from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface NavLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})

export class Navbar implements OnInit, OnDestroy {

  private readonly translationService = inject(TranslationService);
  readonly t    = this.translationService.t;
  readonly lang = this.translationService.lang;

  readonly initials = 'AZ';
  readonly fullName = 'Adrian Zavaleta';

  // Reactive nav links — update automatically when language switches
  readonly navLinks = computed<NavLink[]>(() => [
    { label: this.t().nav_home,       fragment: 'home' },
    { label: this.t().nav_about,      fragment: 'about' },
    { label: this.t().nav_experience, fragment: 'experience' },
    { label: this.t().nav_projects,   fragment: 'projects' },
    { label: this.t().nav_contact,    fragment: 'contact' },
  ]);

  // Reactive state
  isNavHidden   = signal(false);
  isMobileOpen  = signal(false);
  activeSection = signal('home');

  lastScrollY: number = 0;
  private scrollTimer: any;
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.translationService.init();
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    clearTimeout(this.scrollTimer);
  }

  toggleLang(): void {
    this.translationService.toggle();
  }

  // ── Scroll behaviour ──────────────────────────────────────────────────────

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentY = window.scrollY;

    // Hide navbar when scrolling down past 80px, show when scrolling up
    if (currentY > 80) {
      this.isNavHidden.set(currentY > this.lastScrollY);
    } else {
      this.isNavHidden.set(false);
    }

    this.lastScrollY = currentY;
  }

  // ── Active section tracking ───────────────────────────────────────────────

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    // Observe sections after DOM is ready
    setTimeout(() => {
      this.navLinks().forEach(link => {
        const el = document.getElementById(link.fragment);
        if (el) this.observer.observe(el);
      });
    }, 300);
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  scrollTo(fragment: string): void {
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu after navigating
    this.isMobileOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.isMobileOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileOpen.set(false);
  }

  isActive(fragment: string): boolean {
    return this.activeSection() === fragment;
  }
}
