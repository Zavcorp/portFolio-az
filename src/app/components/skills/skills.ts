import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TechItem {
  name: string;
  category: string;
  level: number;
  color: string;
}

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})

export class Skills {

  readonly techStack: TechItem[] = [
    { name: 'JavaScript', category: 'Frontend',  level: 4, color: '#fbbf24' },
    { name: 'TypeScript', category: 'Frontend',  level: 2, color: '#60a5fa' },
    { name: 'HTML & CSS', category: 'Frontend',  level: 5, color: '#f87171' },
    { name: 'Bootstrap/Tailwind', category: 'Frontend',  level: 2, color: '#f87171' },
    { name: 'Angular',    category: 'Framework', level: 3, color: '#2dd4bf' },
    { name: 'React',      category: 'Framework', level: 1, color: '#67e8f9' },
    { name: 'C# / .NET',  category: 'Backend',   level: 4, color: '#a78bfa' },
    { name: 'Web Services / Web API',  category: 'Backend',   level: 2, color: '#a78bfa' },
    { name: 'Github',     category: 'CI/CD',  level: 2, color: '#fb923c' },
    { name: 'AWS',        category: 'Cloud',     level: 1, color: '#fb923c' },
    { name: 'Azure',      category: 'Cloud',     level: 1, color: '#38bdf8' },
    { name: 'DevOps',     category: 'DevOps',     level: 1, color: '#4ade80' },
    { name: 'SQL',        category: 'Database',  level: 3, color: '#e879f9' },
    { name: 'Oracle',      category: 'Database',  level: 2, color: '#e879f9' },
  ];

  readonly filterTabs = ['All', 'Frontend', 'Backend', 'Framework', 'Cloud', 'Database',];
  activeFilter = 'All';

  get filteredStack(): TechItem[] {
    if (this.activeFilter === 'All') return this.techStack;
    return this.techStack.filter(t => t.category === this.activeFilter);
  }

  setFilter(cat: string): void {
    this.activeFilter = cat;
  }

  levelArray(n: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }
}
