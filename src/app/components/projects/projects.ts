import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'live' | 'coming-soon';
  featured?: boolean;
  gradient: string;
  icon: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects {

  private readonly translationService = inject(TranslationService);
  readonly t = this.translationService.t;

  readonly projects = computed<Project[]>(() => [
    {
      id: 1,
      title: 'CarPriceSimulator',
      description: this.t().proj1_desc,
      tags: ['Angular', 'TypeScript', 'CSS'],
      liveUrl: 'https://carpricesimulator.netlify.app/',
      githubUrl: 'https://github.com/Zavcorp/CarPriceSimulator',
      status: 'live',
      gradient: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(96,165,250,0.1))',
      icon: '🚗',
    },
    {
      id: 2,
      title: 'GifsApp',
      description: this.t().proj2_desc,
      tags: ['Angular', 'Giphy API', 'TypeScript'],
      liveUrl: 'https://gifapp1.netlify.app/',
      githubUrl: 'https://github.com/Zavcorp',
      status: 'live',
      gradient: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(248,113,113,0.1))',
      icon: '🎬',
    },
    {
      id: 3,
      title: 'Demo Tienda E-commerce',
      description: this.t().proj3_desc,
      tags: ['Angular', 'TypeScript', 'CSS'],
      liveUrl: 'https://ecommerceunir.netlify.app/',
      githubUrl: 'https://github.com/Zavcorp/angular-ecommerce-demo-UNIR',
      status: 'live',
      gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(232,121,249,0.1))',
      icon: '🛒',
    },
    {
      id: 4,
      title: this.t().projects_soon_title,
      description: this.t().projects_soon_desc1,
      tags: ['Por definir'],
      status: 'coming-soon',
      gradient: 'linear-gradient(135deg, rgba(74,222,128,0.08), rgba(56,189,248,0.08))',
      icon: '⚡',
    },
    {
      id: 5,
      title: this.t().projects_soon_title,
      description: this.t().projects_soon_desc2,
      tags: ['Por definir'],
      status: 'coming-soon',
      gradient: 'linear-gradient(135deg, rgba(56,189,248,0.08), rgba(109,40,217,0.08))',
      icon: '🚀',
    },
    {
      id: 6,
      title: this.t().projects_soon_title,
      description: this.t().projects_soon_desc2,
      tags: ['Por definir'],
      status: 'coming-soon',
      gradient: 'linear-gradient(135deg, rgba(56,189,248,0.08), rgba(109,40,217,0.08))',
      icon: '🚀',
    },
  ]);

  openUrl(url: string): void {
    window.open(url, '_blank', 'noopener noreferrer');
  }

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
