import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css']
})
export class Experience {

  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;

  readonly experiences = computed<ExperienceItem[]>(() => [
    {
      id: 1,
      role: this.t().exp1_role,
      company: this.t().exp1_company,
      location: 'Ciudad de México, MX',
      startDate: 'Sep 2025',
      endDate: 'Feb 2026',
      current: false,
      description: this.t().exp1_desc,
      tags: ['.NET', 'Angular', 'C#', 'Oracle', 'Java', 'APIs', 'MVC'],
    },
    // ── Agrega aquí tus empleos anteriores siguiendo la misma estructura ──
    {
      id: 2,
      role: 'Support Engineer',
      company: 'SYE Software México',
      location: 'Ciudad de México, MX',
      startDate: 'Ene 2023',
      endDate: 'Jul 2025',
      current: false,
      description: `Soporte y migración de aplicaciones web C# NET a nuevas tecnologías como Angular, NET Core MVC, así como mejoramiento de sitios web utilizando HTML5, CSS3, ES6, Bootstrap. En este tiempo se han logrado mejoras y optimizaciones importantes en procesos y diseños web que benefician al cliente en diversas aplicaciones.`,
      tags: ['.NET', 'Angular', 'C#', 'Oracle','APIs', 'MVC'],
    },
    {
      id: 3,
      role: 'Software Engineer',
      company: 'Softtek México',
      location: 'Ciudad de México, MX',
      startDate: 'Dic 2022',
      endDate: 'Jul 2018',
      current: false,
      description: `Desarrollé aplicaciones web con C#, JavaScript (ES6), LINQ y jQuery, integradas con bases de datos Oracle 11g, logrando una reducción aproximada del 35% en tiempos de respuesta de los sistemas. Brindé soporte a aplicativos en .NET 3.5, 4.0, etc.`,
      tags: ['.NET WebForms', 'C#', 'Oracle', 'Jquery', 'HTML,CSS', 'JavaScript','bootstrap'],
    },
    {
      id: 4,
      role: '.NET Developer',
      company: 'PEMEX México',
      location: 'Poza Rica Veracruz, MX',
      startDate: 'Ago 2012',
      endDate: 'Jun 2018',
      current: false,
      description: `Diseñé y desarrollé una plataforma web para la gestión de contratos, procesos y actividades administrativas en PEMEX, superando en eficiencia y usabilidad a los aplicativos institucionales existentes. Implementé módulos personalizados que optimizaron tiempos de operación y mejoraron la trazabilidad de procesos. Modernicé la interfaz con tecnologías emergentes (HTML5, CSS3, Bootstrap, JavaScript) y frameworks .NET (ASP.NET, MVC, WebForms, C#, VB), además de administrar bases de datos SQL Server para garantizar integridad y seguridad de la información. La solución permitió reducir significativamente los tiempos de generación de reportes y controles, contribuyendo a la transformación digital de las gerencias y coordinaciones.`,
      tags: ['.NET WebForms', 'C#', 'VB', 'SQL-Server','Crystal Reports','DevExpress for Visual Studio', 'Jquery', 'HTML,CSS', 'JavaScript','bootstrap'],
    }
  ]);

  expandedId: number | null = null;

  toggleExpand(id: number): void {
    this.expandedId = this.expandedId === id ? null : id;
  }

  isExpanded(id: number): boolean {
    return this.expandedId === id;
  }
}
