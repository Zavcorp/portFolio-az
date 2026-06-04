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
      role: this.t().exp2_role,
      company: this.t().exp2_company,
      location: 'Ciudad de México, MX',
      startDate: 'Ene 2023',
      endDate: 'Jul 2025',
      current: false,
      description: this.t().exp2_desc,
      tags: ['.NET', 'Angular', 'C#', 'Oracle', 'APIs', 'MVC'],
    },
    {
      id: 3,
      role: this.t().exp3_role,
      company: this.t().exp3_company,
      location: 'Ciudad de México, MX',
      startDate: 'Jul 2018',
      endDate: 'Dic 2022',
      current: false,
      description: this.t().exp3_desc,
      tags: ['.NET WebForms', 'C#', 'Oracle', 'Jquery', 'HTML,CSS', 'JavaScript', 'bootstrap'],
    },
    {
      id: 4,
      role: this.t().exp4_role,
      company: this.t().exp4_company,
      location: 'Poza Rica Veracruz, MX',
      startDate: 'Ago 2012',
      endDate: 'Jun 2018',
      current: false,
      description: this.t().exp4_desc,
      tags: ['.NET WebForms', 'C#', 'VB', 'SQL-Server', 'Crystal Reports', 'DevExpress for Visual Studio', 'Jquery', 'HTML,CSS', 'JavaScript', 'bootstrap'],
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
