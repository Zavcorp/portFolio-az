import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'es' | 'en';

export interface Translations {
  // ── Navbar ──────────────────────────────────────────
  nav_home: string;
  nav_about: string;
  nav_projects: string;
  nav_skills: string;
  nav_experience: string;
  nav_contact: string;
  nav_hire: string;

  // ── Hero ─────────────────────────────────────────────
  hero_available: string;
  hero_tagline: string;
  hero_btn_projects: string;
  hero_btn_cv: string;
  hero_find_me: string;

  // ── About ────────────────────────────────────────────
  about_tag: string;
  about_title1: string;
  about_title2: string;
  about_bio_title: string;
  about_bio1: string;
  about_bio2: string;
  about_bio3: string;
  about_learning: string;
  about_label1: string;
  about_label2: string;
  about_label3: string;
  about_label4: string;
  about_stat1_label: string;
  about_stat2_label: string;
  about_stat3_label: string;
  about_stat4_label: string;
  about_filter_all: string;

  // ── Projects ─────────────────────────────────────────
  projects_tag: string;
  projects_title1: string;
  projects_title2: string;
  projects_subtitle: string;
  projects_live: string;
  projects_coming: string;
  projects_btn_demo: string;
  projects_btn_gh: string;
  projects_wip: string;
  projects_cta_text: string;
  projects_cta_btn: string;
  projects_soon_title: string;
  projects_soon_desc1: string;
  projects_soon_desc2: string;
  // project descriptions
  proj1_desc: string;
  proj2_desc: string;
  proj3_desc: string;

  // ── Experience ───────────────────────────────────────
  exp_tag: string;
  exp_title1: string;
  exp_title2: string;
  exp_subtitle: string;
  exp_present: string;
  exp_current_badge: string;
  // Softtek description
  exp1_role: string;
  exp1_company: string;
  exp1_desc: string;

  // ── Contact ──────────────────────────────────────────
  contact_tag: string;
  contact_title1: string;
  contact_title2: string;
  contact_subtitle: string;
  contact_email_lbl: string;
  contact_phone_lbl: string;
  contact_loc_lbl: string;
  contact_loc_val: string;
  contact_avail_title: string;
  contact_avail_sub: string;
  form_title: string;
  form_name: string;
  form_name_ph: string;
  form_email: string;
  form_email_ph: string;
  form_subject: string;
  form_subject_ph: string;
  form_message: string;
  form_message_ph: string;
  form_submit: string;
  form_sending: string;
  form_success_title: string;
  form_success_sub: string;
  form_send_another: string;
  form_err_required: string;
  form_err_email: string;

  // ── Footer ───────────────────────────────────────────
  footer_tagline: string;
  footer_visits: string;
  footer_copy: string;
  footer_top: string;
}

const ES: Translations = {
  // Navbar
  nav_home: 'Inicio',
  nav_about: 'Sobre mí',
  nav_projects: 'Proyectos',
  nav_skills: 'Habilidades',
  nav_experience: 'Experiencia',
  nav_contact: 'Contacto',
  nav_hire: 'Contrátame',

  // Hero
  hero_available: 'Disponible para proyectos',
  hero_tagline: 'Construyo interfaces que enamoran — y las escalo hacia el backend.',
  hero_btn_projects: 'Ver proyectos',
  hero_btn_cv: 'Descargar CV',
  hero_find_me: 'find me on',

  // About
  about_tag: '// sobre mí',
  about_title1: 'Quién soy &',
  about_title2: 'qué construyo',
  about_bio_title: 'Bio',
  about_bio1: 'Desarrollador web con experiencia en .NET, C#, HTML, CSS y JavaScript.',
  about_bio2: 'Apasionado por entregar software de alta calidad y aprender constantemente nuevas tecnologías.',
  about_bio3: 'Actualmente cursando una maestría en DevOps y Cloud, expandiendo mi stack hacia Angular, React, AWS y Azure.',
  about_learning: '// actualmente aprendiendo',

  about_label1: 'Maestría',
  about_label2: 'Licenciatura',
  about_label3: 'Idiomas',
  about_label4: 'Certificaciones/Cursos',

  about_stat1_label: 'Desarrollo y Operaciones de Software - UNIR México (2024-Cursando)',
  about_stat2_label: 'Ingeniería en Sistemas Computacionales - ITSPR(2006-2011)',
  about_stat3_label: 'Español nativo, Inglés (B1)',
  about_stat4_label: 'Scrum Fundamentals ID 924314, Udemy P-SQL, Udemy Git, Udemy.net',
  about_filter_all: 'Todos',

  // Projects
  projects_tag: '// proyectos',
  projects_title1: 'Lo que he',
  projects_title2: 'construido',
  projects_subtitle: 'Una selección de proyectos reales desplegados en producción.',
  projects_live: 'Live',
  projects_coming: 'Coming soon',
  projects_btn_demo: 'Live Demo',
  projects_btn_gh: 'GitHub',
  projects_wip: 'En construcción...',
  projects_cta_text: '¿Tienes un proyecto en mente?',
  projects_cta_btn: 'Hablemos',
  projects_soon_title: 'Próximo proyecto',
  projects_soon_desc1: 'Un nuevo proyecto está en camino. Vuelve pronto para ver las novedades.',
  projects_soon_desc2: 'Explorando nuevas ideas y tecnologías. Stay tuned.',
  proj1_desc: 'Simulador de precios de autos que permite calcular costos, mensualidades y comparar opciones de financiamiento de forma interactiva.',
  proj2_desc: 'Aplicación para buscar y explorar GIFs animados usando la API de Giphy, con búsqueda en tiempo real y diseño responsivo.',
  proj3_desc: 'Plataforma de ranking para DJs con sistema de votación, perfiles de artistas y visualización de estadísticas en tiempo real.',

  // Experience
  exp_tag: '// experiencia',
  exp_title1: 'Trayectoria',
  exp_title2: 'profesional',
  exp_subtitle: 'Mi historial laboral — del más reciente al más antiguo.',
  exp_present: 'Presente',
  exp_current_badge: 'Actual',
  exp1_role: 'Senior Software Developer Engineer',
  exp1_company: 'Softtek México',
  exp1_desc: 'Brindo soporte a aplicaciones en .NET WebForms, MVC y proyectos Angular, asegurando continuidad operativa y resolución de incidencias en sistemas legacy. Lidero migraciones de aplicaciones desde C# .NET hacia Angular, .NET Core y Java, mejorando rendimiento, escalabilidad y seguridad. Gestiono bases de datos Oracle y desarrollo servicios web y APIs para integrar plataformas críticas. Actualmente en proceso de aprendizaje y adopción de Java para futuras migraciones estratégicas.',

  // Contact
  contact_tag: '// contacto',
  contact_title1: 'Hablemos de tu',
  contact_title2: 'próximo proyecto',
  contact_subtitle: 'Estoy disponible para proyectos freelance, oportunidades laborales y colaboraciones. No dudes en escribirme.',
  contact_email_lbl: 'Email',
  contact_phone_lbl: 'WhatsApp',
  contact_loc_lbl: 'Ubicación',
  contact_loc_val: 'Ciudad de México, MX',
  contact_avail_title: 'Disponible para trabajar',
  contact_avail_sub: 'Respondo en menos de 24 horas',
  form_title: 'Envíame un mensaje',
  form_name: 'Nombre *',
  form_name_ph: 'Tu nombre',
  form_email: 'Email *',
  form_email_ph: 'tu@email.com',
  form_subject: 'Asunto',
  form_subject_ph: '¿En qué puedo ayudarte?',
  form_message: 'Mensaje *',
  form_message_ph: 'Cuéntame sobre tu proyecto o idea...',
  form_submit: 'Enviar mensaje',
  form_sending: 'Enviando...',
  form_success_title: '¡Mensaje enviado!',
  form_success_sub: 'Gracias por escribirme. Te responderé pronto.',
  form_send_another: 'Enviar otro mensaje',
  form_err_required: 'Por favor completa todos los campos requeridos.',
  form_err_email: 'Por favor ingresa un email válido.',

  // Footer
  footer_tagline: 'Frontend Developer · Ciudad de México',
  footer_visits: 'visitas registradas',
  footer_copy: 'Hecho con',
  footer_top: 'Volver arriba',
};

const EN: Translations = {
  // Navbar
  nav_home: 'Home',
  nav_about: 'About',
  nav_projects: 'Projects',
  nav_skills: 'Skills',
  nav_experience: 'Experience',
  nav_contact: 'Contact',
  nav_hire: 'Hire me',

  // Hero
  hero_available: 'Available for projects',
  hero_tagline: 'I build interfaces people love — and scale them to the backend.',
  hero_btn_projects: 'View projects',
  hero_btn_cv: 'Download CV',
  hero_find_me: 'find me on',

  // About
  about_tag: '// about me',
  about_title1: 'Who I am &',
  about_title2: 'what I build',
  about_bio_title: 'Bio',
  about_bio1: 'Web developer with experience in .NET, C#, HTML, CSS and JavaScript.',
  about_bio2: 'Passionate about delivering high-quality software and constantly learning new technologies.',
  about_bio3: 'Currently pursuing a Master\'s degree in DevOps and Cloud, expanding my stack with Angular, React, AWS and Azure.',
  about_learning: '// currently learning',
  about_label1: 'Master\'s degree',
  about_label2: 'Bachelor\'s degree',
  about_label3: 'Languages',
  about_label4: 'Certifications/Courses',

  about_stat1_label: 'Software Development and Operations - UNIR México (2024-Ongoing)',
  about_stat2_label: 'Computer Science (2006-2011)',
  about_stat3_label: 'Spanish Native, English B2',
  about_stat4_label: 'Scrum Fundamentals ID 924314, Udemy P-SQL, Udemy Git, Udemy.net ',
  about_filter_all: 'All',

  // Projects
  projects_tag: '// projects',
  projects_title1: 'What I\'ve',
  projects_title2: 'built',
  projects_subtitle: 'A selection of real projects deployed in production.',
  projects_live: 'Live',
  projects_coming: 'Coming soon',
  projects_btn_demo: 'Live Demo',
  projects_btn_gh: 'GitHub',
  projects_wip: 'Under construction...',
  projects_cta_text: 'Have a project in mind?',
  projects_cta_btn: 'Let\'s talk',
  projects_soon_title: 'Upcoming project',
  projects_soon_desc1: 'A new project is on the way. Check back soon for updates.',
  projects_soon_desc2: 'Exploring new ideas and technologies. Stay tuned.',
  proj1_desc: 'Car price simulator to calculate costs, monthly payments and compare financing options interactively.',
  proj2_desc: 'App to search and explore animated GIFs using the Giphy API, with real-time search and responsive design.',
  proj3_desc: 'DJ ranking platform with a voting system, artist profiles and real-time statistics visualization.',

  // Experience
  exp_tag: '// experience',
  exp_title1: 'Professional',
  exp_title2: 'timeline',
  exp_subtitle: 'My work history — from most recent to earliest.',
  exp_present: 'Present',
  exp_current_badge: 'Current',
  exp1_role: 'Senior Software Developer Engineer',
  exp1_company: 'Softtek México',
  exp1_desc: 'Provide support for applications in .NET WebForms, MVC and Angular projects, ensuring operational continuity and incident resolution in legacy systems. Lead application migrations from C# .NET to Angular, .NET Core and Java, improving performance, scalability and security. Manage Oracle databases and develop web services and APIs to integrate critical platforms. Currently learning and adopting Java for future strategic migrations.',

  // Contact
  contact_tag: '// contact',
  contact_title1: 'Let\'s talk about your',
  contact_title2: 'next project',
  contact_subtitle: 'I\'m available for freelance projects, job opportunities and collaborations. Feel free to reach out.',
  contact_email_lbl: 'Email',
  contact_phone_lbl: 'WhatsApp',
  contact_loc_lbl: 'Location',
  contact_loc_val: 'Mexico City, MX',
  contact_avail_title: 'Available for work',
  contact_avail_sub: 'I respond within 24 hours',
  form_title: 'Send me a message',
  form_name: 'Name *',
  form_name_ph: 'Your name',
  form_email: 'Email *',
  form_email_ph: 'you@email.com',
  form_subject: 'Subject',
  form_subject_ph: 'How can I help you?',
  form_message: 'Message *',
  form_message_ph: 'Tell me about your project or idea...',
  form_submit: 'Send message',
  form_sending: 'Sending...',
  form_success_title: 'Message sent!',
  form_success_sub: 'Thanks for reaching out. I\'ll get back to you soon.',
  form_send_another: 'Send another message',
  form_err_required: 'Please fill in all required fields.',
  form_err_email: 'Please enter a valid email address.',

  // Footer
  footer_tagline: 'Full Stack Developer · Mexico City',
  footer_visits: 'registered visits',
  footer_copy: 'Made with',
  footer_top: 'Back to top',
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private _lang = signal<Lang>('es');

  readonly lang = this._lang.asReadonly();

  readonly t = computed(() => {
    return this._lang() === 'es' ? ES : EN;
  });

  toggle(): void {
    this._lang.update(l => l === 'es' ? 'en' : 'es');
    // Persist preference
    try { localStorage.setItem('az_lang', this._lang()); } catch { }
  }

  setLang(lang: Lang): void {
    this._lang.set(lang);
    try { localStorage.setItem('az_lang', lang); } catch { }
  }

  init(): void {
    try {
      const saved = localStorage.getItem('az_lang') as Lang | null;
      if (saved === 'en' || saved === 'es') this._lang.set(saved);
    } catch { }
  }
}
