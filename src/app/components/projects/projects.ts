import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  readonly projects: Project[] = [
    {
      id: 1,
      title: 'CarPriceSimulator',
      description: 'Simulador de precios de autos que permite calcular costos, mensualidades y comparar opciones de financiamiento de forma interactiva.',
      tags: ['Angular', 'TypeScript', 'CSS'],
      liveUrl: 'https://carpricesimulator.netlify.app/',
      githubUrl: 'https://github.com/Zavcorp/CarPriceSimulator', // ← actualiza con el repo real
      status: 'live',
      //featured: true,
      gradient: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(96,165,250,0.1))',
      icon: '🚗',
    },
    {
      id: 2,
      title: 'GifsApp',
      description: 'Aplicación para buscar y explorar GIFs animados usando la API de Giphy, con búsqueda en tiempo real y diseño responsivo.',
      tags: ['Angular', 'Giphy API', 'TypeScript'],
      liveUrl: 'https://gifapp1.netlify.app/',
      githubUrl: 'https://github.com/Zavcorp', // ← actualiza con el repo real
      status: 'live',
      gradient: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(248,113,113,0.1))',
      icon: '🎬',
    },
    {
      id: 3,
      title: 'Demo Tienda E-commerce',
      description: 'Demo de tienda e-commerce con catálogo de productos, carrito de compras y proceso de checkout simulado.',
      tags: ['Angular', 'TypeScript', 'CSS'],
      liveUrl: 'https://ecommerceunir.netlify.app/',
      githubUrl: 'https://github.com/Zavcorp/angular-ecommerce-demo-UNIR', // ← actualiza con el repo real
      status: 'live',
      gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(232,121,249,0.1))',
      icon: '🛒',
    },
    // {
    //   id: 3,
    //   title: 'RankingDjs',
    //   description: 'Plataforma de ranking para DJs con sistema de votación, perfiles de artistas y visualización de estadísticas en tiempo real.',
    //   tags: ['Angular', 'TypeScript', 'CSS'],
    //   liveUrl: 'https://ecommerceunir.netlify.app/',
    //   githubUrl: 'https://github.com/Zavcorp', // ← actualiza con el repo real
    //   status: 'live',
    //   gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(232,121,249,0.1))',
    //   icon: '🎧',
    // },
    {
      id: 4,
      title: 'Próximo proyecto',
      description: 'Un nuevo proyecto está en camino. Vuelve pronto para ver las novedades.',
      tags: ['Por definir'],
      status: 'coming-soon',
      gradient: 'linear-gradient(135deg, rgba(74,222,128,0.08), rgba(56,189,248,0.08))',
      icon: '⚡',
    },
    {
      id: 5,
      title: 'Próximo proyecto',
      description: 'Explorando nuevas ideas y tecnologías. Stay tuned.',
      tags: ['Por definir'],
      status: 'coming-soon',
      gradient: 'linear-gradient(135deg, rgba(56,189,248,0.08), rgba(109,40,217,0.08))',
      icon: '🚀',
    },
    {
      id: 6,
      title: 'Próximo proyecto',
      description: 'Explorando nuevas ideas y tecnologías. Stay tuned.',
      tags: ['Por definir'],
      status: 'coming-soon',
      gradient: 'linear-gradient(135deg, rgba(56,189,248,0.08), rgba(109,40,217,0.08))',
      icon: '🚀',
    },
  ];

  openUrl(url: string): void {
    window.open(url, '_blank', 'noopener noreferrer');
  }

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
