import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import emailjs from '@emailjs/browser';

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

    try {
      const serviceId = 'service_dgt4jhm';
      const templateId = 'msj_contacto_cv';
      const publicKey = 'sQYUU4FPaNev9LZxU';

      const templateParams = {
        from_name: this.formName,
        from_email: this.formEmail,
        to_email: 'zavcorp23@gmail.com',
        subject: this.formSubject || `Contacto desde portfolio — ${this.formName}`,
        message: this.formMessage,
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      });

      this.formStatus.set('success');
      this.resetForm();
    } catch (error) {
      this.formStatus.set('error');
      console.error('Error enviando email:', error);
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
