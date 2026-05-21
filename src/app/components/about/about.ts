import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface TechItem {
  name: string;
  category: string;
  level: number;
  color: string;
  icon: string;
}

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {

  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;
  readonly lang = this.translationService.lang;

  // Bio lines joined into newline-separated string for template split
  readonly bio = computed(() =>
    `${this.t().about_bio1}\n${this.t().about_bio2}\n${this.t().about_bio3}`
  );

  readonly stats = computed<Stat[]>(() => [
    { value: this.t().about_label1, label: this.t().about_stat1_label },
    { value: this.t().about_label2, label: this.t().about_stat2_label },
    { value: this.t().about_label3, label: this.t().about_stat3_label },
    { value: this.t().about_label4, label: this.t().about_stat4_label, suffix: ' +' },
  ]);

  // readonly stats: Stat[] = [
  //   { value: 'Maestría', label: 'Desarrollo y Operaciones de Software - UNIR México (2024-Cursando)' },
  //   { value: 'Licenciatura', label: 'Ingeniería en Sistemas Computacionales - ITSPR(2006-2011)' },
  //   { value: 'Idiomas', label: 'Español nativo, Inglés (B1)' },
  //   { value: 'Certificaciones/Cursos', label: 'Scrum Fundamentals ID 924314, Udemy P-SQL, Udemy Git, Udemy.net', suffix: ' +' },
  // ];

  readonly techStack: TechItem[] = [
    { name: 'JavaScript', category: 'Frontend', level: 4, color: '#fbbf24', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', category: 'Frontend', level: 2, color: '#60a5fa', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'HTML', category: 'Frontend', level: 5, color: '#f87171', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS', category: 'Frontend', level: 5, color: '#f87171', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'Bootstrap', category: 'Frontend', level: 2, color: '#f87171', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Tailwind', category: 'Frontend', level: 2, color: '#f87171', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Angular', category: 'Framework', level: 3, color: '#2dd4bf', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
    { name: 'React', category: 'Framework', level: 1, color: '#67e8f9', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'C# / .NET', category: 'Backend', level: 4, color: '#a78bfa', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
    { name: 'Web Services / Web API', category: 'Backend', level: 2, color: '#a78bfa', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg' },
    { name: 'Github', category: 'CI/CD', level: 2, color: '#fb923c', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'AWS', category: 'Cloud', level: 1, color: '#fb923c', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Azure', category: 'Cloud', level: 1, color: '#38bdf8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
    { name: 'DevOps', category: 'DevOps', level: 1, color: '#4ade80', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' },
    { name: 'SQL', category: 'Database', level: 3, color: '#e879f9', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' },
    { name: 'Oracle', category: 'Database', level: 2, color: '#e879f9', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
  ];

  // 'All' is a sentinel kept in English internally; only its display label is translated
  readonly filterTabs = ['All', 'Frontend', 'Backend', 'Framework', 'Cloud', 'Database'];
  activeFilter = 'All';

  get filteredStack(): TechItem[] {
    if (this.activeFilter === 'All') return this.techStack;
    return this.techStack.filter(t => t.category === this.activeFilter);
  }

  get groupedStack(): { category: string, items: TechItem[] }[] {
    const categories = this.filterTabs.filter(tab => tab !== 'All');
    return categories.map(cat => ({
      category: cat,
      items: this.techStack.filter(t => t.category === cat)
    })).filter(group => group.items.length > 0);
  }

  get filteredGroupedStack(): { category: string, items: TechItem[] }[] {
    if (this.activeFilter === 'All') return this.groupedStack;
    return this.groupedStack.filter(g => g.category === this.activeFilter);
  }

  setFilter(cat: string): void {
    this.activeFilter = cat;
  }

  levelArray(n: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }
}
