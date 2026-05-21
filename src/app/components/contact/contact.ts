import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string;
  ariaLabel: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {

  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;

  readonly contactInfo = computed<ContactInfo[]>(() => [
    {
      icon: 'email',
      label: this.t().contact_email_lbl,
      value: '###########',
      href: '',
      ariaLabel: 'Enviar email a Adrian Zavaleta',
    },
    {
      icon: 'phone',
      label: this.t().contact_phone_lbl,
      value: '+52 55 9164 1018',
      href: 'https://wa.me/525591641018',
      ariaLabel: 'Contactar por WhatsApp',
    },
    {
      icon: 'location',
      label: this.t().contact_loc_lbl,
      value: this.t().contact_loc_val,
      href: 'https://maps.google.com/?q=Ciudad+de+Mexico',
      ariaLabel: 'Ver en Google Maps',
    },
  ]);

  // Form fields
  formName = '';
  formEmail = '';
  formSubject = '';
  formMessage = '';

  formStatus = signal<FormStatus>('idle');
  formError = signal('');

  // ── Submit ────────────────────────────────────────────────────────────────
  async onSubmit(): Promise<void> {
    if (!this.formName || !this.formEmail || !this.formMessage) {
      this.formError.set('required');
      return;
    }

    if (!this.isValidEmail(this.formEmail)) {
      this.formError.set('email');
      return;
    }

    this.formError.set('');
    this.formStatus.set('sending');

    // Abre el cliente de email nativo con los datos del formulario
    // Para envío real, integra EmailJS, Formspree o un endpoint propio
    try {
      const subject = encodeURIComponent(this.formSubject || `Contacto desde portfolio — ${this.formName}`);
      const body = encodeURIComponent(
        `Nombre: ${this.formName}\nEmail: ${this.formEmail}\n\n${this.formMessage}`
      );
      window.location.href = `mailto:zavcorp23@gmail.com?subject=${subject}&body=${body}`;

      // Simulate short delay then show success
      await this.delay(800);
      this.formStatus.set('success');
      this.resetForm();
    } catch {
      this.formStatus.set('error');
    }
  }

  resetForm(): void {
    this.formName = '';
    this.formEmail = '';
    this.formSubject = '';
    this.formMessage = '';
  }

  resetStatus(): void {
    this.formStatus.set('idle');
    this.formError.set('');
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
