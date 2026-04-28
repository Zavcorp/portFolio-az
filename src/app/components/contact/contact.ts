import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  readonly contactInfo: ContactInfo[] = [
    {
      icon: 'email',
      label: 'Email',
      value: 'zavcorp23@gmail.com',
      href: 'mailto:zavcorp23@gmail.com',
      ariaLabel: 'Enviar email a Adrian Zavaleta',
    },
    {
      icon: 'phone',
      label: 'WhatsApp',
      value: '+52 55 9164 1018',
      href: 'https://wa.me/525591641018',
      ariaLabel: 'Contactar por WhatsApp',
    },
    {
      icon: 'location',
      label: 'Ubicación',
      value: 'Ciudad de México, MX',
      href: 'https://maps.google.com/?q=Ciudad+de+Mexico',
      ariaLabel: 'Ver en Google Maps',
    },
  ];

  // Form fields
  formName    = '';
  formEmail   = '';
  formSubject = '';
  formMessage = '';

  formStatus = signal<FormStatus>('idle');
  formError  = signal('');

  // ── Submit ────────────────────────────────────────────────────────────────
  async onSubmit(): Promise<void> {
    if (!this.formName || !this.formEmail || !this.formMessage) {
      this.formError.set('Por favor completa todos los campos requeridos.');
      return;
    }

    if (!this.isValidEmail(this.formEmail)) {
      this.formError.set('Por favor ingresa un email válido.');
      return;
    }

    this.formError.set('');
    this.formStatus.set('sending');

    // Abre el cliente de email nativo con los datos del formulario
    // Para envío real, integra EmailJS, Formspree o un endpoint propio
    try {
      const subject = encodeURIComponent(this.formSubject || `Contacto desde portfolio — ${this.formName}`);
      const body    = encodeURIComponent(
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
    this.formName    = '';
    this.formEmail   = '';
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
