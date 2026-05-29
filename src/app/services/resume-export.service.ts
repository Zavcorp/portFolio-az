import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { TranslationService } from './translation.service';

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  black: [0, 0, 0] as [number, number, number],
  darkGray: [50, 50, 50] as [number, number, number],
  midGray: [80, 80, 80] as [number, number, number],
  lightGray: [120, 120, 120] as [number, number, number],
  rule: [200, 200, 200] as [number, number, number],
};

// ── Resume data ────────────────────────────────────────────────────────────

const PERSONAL = {
  name: 'Adrian Zavaleta',
  title: 'Desarrollador Web · Ingeniero en Sistemas Computacionales',
  phone: '+52 55 9164 1018',
  email: 'zavcorp23@gmail.com',
  location: 'Ciudad de México, MX',
  linkedin: 'linkedin.com/in/adrianzavaleta23',
  github: 'github.com/Zavcorp',
};

const BIO = [
  'Desarrollador web con experiencia en .NET, C#, HTML, CSS y JavaScript.',
  'Apasionado por entregar software de alta calidad y aprender constantemente nuevas tecnologías.',
  'Actualmente cursando una maestría en DevOps y Cloud, expandiendo mi stack hacia Angular, React, AWS y Azure.',
];

const SKILLS: { category: string; items: string[] }[] = [
  { category: 'Front-End', items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind', 'Angular', 'React'] },
  { category: 'Back-End', items: ['C# / .NET', 'ASP.NET WebForms', 'MVC', 'Web API', 'Web Services', 'SQL Server', 'Oracle'] },
  { category: 'Cloud', items: ['AWS (básico)', 'Azure (básico)'] },
  { category: 'CI/CD', items: ['Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'CI/CD'] },
  { category: 'DevOps', items: ['Scrum', 'Kanban', 'Terraform', 'Ansible', 'Elastic Search'] },
  { category: 'Herramientas', items: ['Visual Studio 2022', 'SQL Server Management Studio', 'Postman', 'Jira', 'Figma', 'Docker Desktop'] },
];

const EXPERIENCE: {
  role: string; company: string; location: string;
  start: string; end: string; description: string; tags: string[];
}[] = [
    {
      role: 'Senior Software Developer Engineer',
      company: 'Softtek México',
      location: 'Ciudad de México, MX',
      start: 'Sep 2025',
      end: 'Feb 2026',
      description: 'Brindo soporte a aplicaciones en .NET WebForms, MVC y proyectos Angular, asegurando continuidad operativa y resolución de incidencias en sistemas legacy. Lidero migraciones de aplicaciones desde C# .NET hacia Angular, .NET Core y Java, mejorando rendimiento, escalabilidad y seguridad. Gestiono bases de datos Oracle y desarrollo servicios web y APIs para integrar plataformas críticas.',
      tags: ['.NET', 'Angular', 'C#', 'Oracle', 'Java', 'APIs', 'MVC'],
    },
    {
      role: 'Support Engineer',
      company: 'SYE Software México',
      location: 'Ciudad de México, MX',
      start: 'Ene 2023',
      end: 'Jul 2025',
      description: 'Soporte y migración de aplicaciones web C# .NET a nuevas tecnologías como Angular, .NET Core MVC. Mejoramiento de sitios web utilizando HTML5, CSS3, ES6 y Bootstrap. Optimizaciones importantes en procesos y diseños web que benefician al cliente en diversas aplicaciones.',
      tags: ['.NET', 'Angular', 'C#', 'Oracle', 'APIs', 'MVC'],
    },
    {
      role: 'Software Engineer',
      company: 'Softtek México',
      location: 'Ciudad de México, MX',
      start: 'Jul 2018',
      end: 'Dic 2022',
      description: 'Desarrollé aplicaciones web con C#, JavaScript (ES6), LINQ y jQuery, integradas con bases de datos Oracle 11g, logrando una reducción aproximada del 35% en tiempos de respuesta. Brindé soporte a aplicativos en .NET 3.5, 4.0 y superiores.',
      tags: ['.NET WebForms', 'C#', 'Oracle', 'jQuery', 'HTML/CSS', 'JavaScript', 'Bootstrap'],
    },
    {
      role: '.NET Developer',
      company: 'PEMEX México',
      location: 'Poza Rica, Veracruz, MX',
      start: 'Ago 2012',
      end: 'Jun 2018',
      description: 'Diseñé y desarrollé una plataforma web para la gestión de contratos, procesos y actividades administrativas en PEMEX. Implementé módulos que optimizaron tiempos de operación y mejoraron la trazabilidad de procesos. Administré bases de datos SQL Server para garantizar integridad y seguridad de la información.',
      tags: ['.NET WebForms', 'C#', 'VB', 'SQL Server', 'Crystal Reports', 'jQuery', 'Bootstrap'],
    },
  ];

const PROJECTS: { title: string; description: string; tags: string[]; url: string }[] = [
  {
    title: 'CarPriceSimulator',
    description: 'Simulador de precios de autos que permite calcular costos, mensualidades y comparar opciones de financiamiento de forma interactiva.',
    tags: ['Angular', 'TypeScript', 'CSS'],
    url: 'https://carpricesimulator.netlify.app/',
  },
  {
    title: 'GifsApp',
    description: 'Aplicación para buscar y explorar GIFs animados usando la API de Giphy, con búsqueda en tiempo real y diseño responsivo.',
    tags: ['Angular', 'Giphy API', 'TypeScript'],
    url: 'https://gifapp1.netlify.app/',
  },
  {
    title: 'Demo Tienda E-commerce',
    description: 'Demo de tienda e-commerce con catálogo de productos, carrito de compras y proceso de checkout simulado.',
    tags: ['Angular', 'TypeScript', 'CSS'],
    url: 'https://ecommerceunir.netlify.app/',
  },
];

const EDUCATION: { degree: string; institution: string; period: string }[] = [
  { degree: 'Maestría en Desarrollo y Operaciones de Software', institution: 'UNIR México', period: '2024 – Cursando' },
  { degree: 'Ingeniería en Sistemas Computacionales', institution: 'ITSPR', period: '2006 – 2011' },
];

const LANGUAGES = 'Español (nativo) · Inglés (B1)';

const CERTIFICATIONS = [
  'Scrum Fundamentals Certified — ID 924314',
  'Udemy: PL/SQL Oracle',
  'Udemy: Git & GitHub',
  'Udemy: .NET Core MVC',
];

// ── Page geometry ──────────────────────────────────────────────────────────
const PAGE_W = 210;  // A4 mm
const PAGE_H = 297;
const MARGIN = 18;
const CONTENT = PAGE_W - MARGIN * 2;

@Injectable({ providedIn: 'root' })
export class ResumeExportService {

  constructor(private translationService: TranslationService) { }

  exportPDF(): void {
    const isEn = this.translationService.lang() === 'en';
    const t = this.translationService.t();

    const currentPersonal = isEn ? {
      ...PERSONAL,
      title: 'Web Developer · Computer Systems Engineer',
      location: 'Mexico City, MX'
    } : PERSONAL;

    const currentBio = isEn ? [t.about_bio1, t.about_bio2, t.about_bio3] : BIO;

    const currentSkills = isEn ? SKILLS.map(s => s.category === 'Herramientas' ? { ...s, category: 'Tools' } : s) : SKILLS;

    const currentExp = isEn ? [
      { ...EXPERIENCE[0], role: t.exp1_role, company: t.exp1_company, description: t.exp1_desc },
      { ...EXPERIENCE[1], role: t.exp2_role, company: t.exp2_company, description: t.exp2_desc },
      { ...EXPERIENCE[2], role: t.exp3_role, company: t.exp3_company, description: t.exp3_desc },
      { ...EXPERIENCE[3], role: t.exp4_role, company: t.exp4_company, description: t.exp4_desc },
    ] : EXPERIENCE;

    const currentEdu = isEn ? [
      { degree: "Master's in Software Development and Operations", institution: 'UNIR México', period: '2024 – Ongoing' },
      { degree: 'Computer Systems Engineering', institution: 'ITSPR', period: '2006 – 2011' },
    ] : EDUCATION;

    const currentLangs = isEn ? 'Spanish (Native) · English (B1)' : LANGUAGES;
    const currentCerts = CERTIFICATIONS;

    const sectionAbout = isEn ? 'ABOUT ME' : 'ACERCA DE MÍ';
    const sectionSkills = isEn ? 'SKILLS' : 'HABILIDADES';
    const sectionExp = isEn ? 'EXPERIENCE' : 'EXPERIENCIA';
    const sectionEdu = isEn ? 'EDUCATION' : 'EDUCACIÓN';
    const sectionLangs = isEn ? 'LANGUAGES & CERTIFICATIONS' : 'IDIOMAS Y CURSOS ';

    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    let y = MARGIN;

    // ── helpers ──────────────────────────────────────────────────────────
    const newPageIfNeeded = (needed: number) => {
      if (y + needed > PAGE_H - MARGIN) {
        doc.addPage();
        y = MARGIN;
      }
    };

    const setColor = (rgb: [number, number, number]) =>
      doc.setTextColor(...rgb);

    const rule = (yPos: number, color: [number, number, number] = C.rule) => {
      doc.setDrawColor(...color);
      doc.setLineWidth(0.25);
      doc.line(MARGIN, yPos, PAGE_W - MARGIN, yPos);
    };

    const sectionHeader = (title: string) => {
      newPageIfNeeded(14);
      y += 5;
      setColor(C.black);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(title, MARGIN, y);
      y += 2;
      rule(y, C.rule);
      y += 4;
    };

    const wrappedText = (
      text: string,
      x: number,
      startY: number,
      maxWidth: number,
      lineHeight: number,
      color: [number, number, number] = C.darkGray,
    ): number => {
      setColor(color);
      const lines = doc.splitTextToSize(text, maxWidth);
      for (const line of lines) {
        newPageIfNeeded(lineHeight);
        doc.text(line, x, startY);
        startY += lineHeight;
      }
      return startY;
    };

    // ──────────────────────────────────────────────────────────────────────
    // HEADER
    // ──────────────────────────────────────────────────────────────────────
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    setColor(C.black);
    doc.text(currentPersonal.name, MARGIN, y);
    y += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setColor(C.darkGray);
    doc.text(currentPersonal.title, MARGIN, y);
    y += 6;

    // Contact row
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    setColor(C.midGray);
    const contactLine = [
      currentPersonal.phone,
      currentPersonal.email,
      currentPersonal.location,
      currentPersonal.linkedin,
      currentPersonal.github,
    ].join('  |  ');
    const contactLines = doc.splitTextToSize(contactLine, CONTENT);
    doc.text(contactLines, MARGIN, y);
    y += contactLines.length * 4.5 + 2;

    // Rule line removed as requested

    // ──────────────────────────────────────────────────────────────────────
    // ABOUT ME
    // ──────────────────────────────────────────────────────────────────────
    sectionHeader(sectionAbout);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const bioText = currentBio.join(' ');
    y = wrappedText(bioText, MARGIN, y, CONTENT, 5, C.darkGray);

    // ──────────────────────────────────────────────────────────────────────
    // SKILLS
    // ──────────────────────────────────────────────────────────────────────
    sectionHeader(sectionSkills);
    const labelW = 32;
    for (const group of currentSkills) {
      newPageIfNeeded(7);
      // Category label
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      setColor(C.midGray);
      doc.text(group.category, MARGIN, y);
      // Items
      doc.setFont('helvetica', 'normal');
      setColor(C.darkGray);
      const itemsText = group.items.join(', ');
      const itemLines = doc.splitTextToSize(itemsText, CONTENT - labelW);
      doc.text(itemLines, MARGIN + labelW, y);
      y += itemLines.length * 5;
    }

    // ──────────────────────────────────────────────────────────────────────
    // EXPERIENCE
    // ──────────────────────────────────────────────────────────────────────
    sectionHeader(sectionExp);

    for (const exp of currentExp) {
      newPageIfNeeded(20);

      // Role + company
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      setColor(C.black);
      doc.text(exp.role, MARGIN, y);

      // Date (right-aligned)
      const dateStr = `${exp.start} – ${exp.end}`;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      setColor(C.lightGray);
      const dateW = doc.getTextWidth(dateStr);
      doc.text(dateStr, PAGE_W - MARGIN - dateW, y);
      y += 4.5;

      // Company + location
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      setColor(C.midGray);
      doc.text(`${exp.company}  ·  ${exp.location}`, MARGIN, y);
      y += 5;

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      y = wrappedText(exp.description, MARGIN + 3, y, CONTENT - 3, 4.5, C.darkGray);

      // Tags
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      setColor(C.lightGray);
      newPageIfNeeded(5);
      doc.text(`Skills: ${exp.tags.join(', ')}`, MARGIN + 3, y);
      y += 7;
    }

    // ──────────────────────────────────────────────────────────────────────
    // PROJECTS
    // ──────────────────────────────────────────────────────────────────────
    // sectionHeader('PROYECTOS');

    // for (const proj of PROJECTS) {
    //   newPageIfNeeded(16);

    //   doc.setFont('helvetica', 'bold');
    //   doc.setFontSize(9.5);
    //   setColor(C.black);
    //   doc.text(proj.title, MARGIN, y);

    //   doc.setFont('helvetica', 'normal');
    //   doc.setFontSize(8.5);
    //   setColor(C.lightGray);
    //   const techStr = proj.tags.join(', ');
    //   const techW = doc.getTextWidth(techStr);
    //   doc.text(techStr, PAGE_W - MARGIN - techW, y);
    //   y += 4.5;

    //   doc.setFont('helvetica', 'normal');
    //   doc.setFontSize(8.5);
    //   y = wrappedText(proj.description, MARGIN + 3, y, CONTENT - 3, 4.5, C.darkGray);

    //   doc.setFont('helvetica', 'italic');
    //   doc.setFontSize(8);
    //   setColor(C.lightGray);
    //   newPageIfNeeded(5);
    //   doc.text(proj.url, MARGIN + 3, y);
    //   y += 7;
    // }

    // ──────────────────────────────────────────────────────────────────────
    // EDUCATION
    // ──────────────────────────────────────────────────────────────────────
    if (isEn) {
      doc.addPage();
      y = MARGIN;
    }
    sectionHeader(sectionEdu);

    for (const edu of currentEdu) {
      newPageIfNeeded(10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      setColor(C.black);
      doc.text(edu.degree, MARGIN, y);

      const periodW = doc.getTextWidth(edu.period);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      setColor(C.lightGray);
      doc.text(edu.period, PAGE_W - MARGIN - periodW, y);
      y += 4.5;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      setColor(C.midGray);
      doc.text(edu.institution, MARGIN + 3, y);
      y += 7;
    }

    // ──────────────────────────────────────────────────────────────────────
    // LANGUAGES & CERTIFICATIONS
    // ──────────────────────────────────────────────────────────────────────
    sectionHeader(sectionLangs);

    newPageIfNeeded(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    setColor(C.darkGray);
    doc.text(currentLangs, MARGIN, y);
    y += 6;

    for (const cert of currentCerts) {
      newPageIfNeeded(5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      setColor(C.darkGray);
      doc.text(`· ${cert}`, MARGIN + 3, y);
      y += 5;
    }

    // ── Save ───────────────────────────────────────────────────────────────
    doc.save(isEn ? 'Adrian-Zavaleta-Resume-EN.pdf' : 'Adrian-Zavaleta-Resume-ES.pdf');
  }
}
