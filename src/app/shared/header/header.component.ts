import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  links: any = [];
  isMobileMenuActive = false;

  ngOnInit(): void {
    this.links = this.getLinks();
  }

  getLinks() {
    return [
      { url: '/', label: 'Home' },
      { url: '/list', label: 'Movies' },
      { url: '/tv-shows', label: 'TV Shows' },
      { url: '/genres', label: 'Genres' }
    ];
  }

  toggleMenu() {
    this.isMobileMenuActive = !this.isMobileMenuActive;
  }
}
