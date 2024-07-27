import { NgClass, UpperCasePipe, NgIf } from '@angular/common';
import { afterRender, Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SystemService } from '@services/system.service';
import { InitFilterFormComponent } from './components/init-filter-form/init-filter-form.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterLink, InitFilterFormComponent, UpperCasePipe, NgClass, NgIf],
  templateUrl: './banner.component.html',
  styles: `
    @media (min-width: 1024px) {
        .close-modal {
          display: none;
        }

        .banner-container {
          filter: brightness(65%);
          overflow: hidden;
          position: relative;
          will-change: transform;
        }
      }
  `,
})
export class BannerComponent {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateParallax();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  systemService = inject(SystemService);
  openFilter = false;

  private ticking = false;

  constructor() {
    afterRender(() => {
      this.onWindowScroll();
    });
  }

  updateParallax() {
    const parallaxImage = document.querySelector(
      '.parallax-img'
    ) as HTMLElement;
    if (parallaxImage) {
      const scrolled = window.pageYOffset;
      const speed = 0.25;
      parallaxImage.style.transform = `translateY(${scrolled * speed}px)`;
    }
  }
}
