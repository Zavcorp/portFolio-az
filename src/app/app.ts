import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contact } from "./components/contact/contact";
import { Navbar } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { About } from "./components/about/about";
import { Projects } from "./components/projects/projects";
import { Footer } from "./components/footer/footer";
import { Skills } from "./components/skills/skills";
import { Experience } from "./components/experience/experience";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Contact, Navbar, Hero, About, Projects, Footer, Skills, Experience],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portFolio-az');
}
