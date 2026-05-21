import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeExportService } from '../../services/resume-export.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements OnInit, AfterViewInit, OnDestroy {

  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;

  constructor(private resumeExport: ResumeExportService) {}

  // ── Personal data ─────────────────────────────────────────────────────────
  readonly name = 'Adrian Zavaleta';
  readonly tagline = 'Construyo interfaces que enamoran — y las escalo hacia el backend.';
  readonly githubUrl = 'https://github.com/Zavcorp';
  readonly linkedinUrl = 'https://linkedin.com/in/adrianzavaleta23';
  readonly cvUrl = 'assets/cv/adrian-zavaleta-cv.pdf'; // ← sube tu PDF aquí
  readonly profileImg = 'assets/images/ProfileAZ.png';         // ← copia Profile.jpg aquí

  // ── Glitch typing state ───────────────────────────────────────────────────
  readonly fullTitle = 'Frontend Developer';
  displayedTitle = '';

  private glitchChars = '!<>-_\\/[]{}—=+*^?#░▒▓';
  private titleInterval: any;
  private glitchInterval: any;
  private glitchTimeout: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.startGlitchDecode(), 700);
  }

  ngOnDestroy(): void {
    clearInterval(this.titleInterval);
    clearInterval(this.glitchInterval);
    clearTimeout(this.glitchTimeout);
  }

  // ── Glitch decode animation ───────────────────────────────────────────────
  private startGlitchDecode(): void {
    const target = this.fullTitle;
    let iteration = 0;

    this.titleInterval = setInterval(() => {
      this.displayedTitle = target
        .split('')
        .map((char, idx) => {
          if (char === ' ') return '\u00A0';
          if (idx < Math.floor(iteration)) return target[idx];
          return this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
        })
        .join('');

      if (iteration >= target.length) {
        clearInterval(this.titleInterval);
        this.displayedTitle = target;
        this.scheduleGlitch();
      }
      iteration += 0.5;
    }, 45);
  }

  private scheduleGlitch(): void {
    const delay = 3500 + Math.random() * 3500;
    this.glitchTimeout = setTimeout(() => this.triggerGlitchBurst(), delay);
  }

  private triggerGlitchBurst(): void {
    let ticks = 0;
    this.glitchInterval = setInterval(() => {
      if (ticks >= 8) {
        clearInterval(this.glitchInterval);
        this.displayedTitle = this.fullTitle;
        this.scheduleGlitch();
        return;
      }
      const corrupted = this.fullTitle.split('').map((c, i) => {
        if (c === ' ') return '\u00A0';
        return Math.random() < 0.3
          ? this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)]
          : c;
      }).join('');
      this.displayedTitle = ticks % 2 === 0 ? corrupted : this.fullTitle;
      ticks++;
    }, 55);
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  scrollToProjects(): void {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  exportResumePDF(): void {
    this.resumeExport.exportPDF();
  }
}

