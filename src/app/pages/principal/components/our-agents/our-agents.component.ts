import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '@services/user.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-our-agents',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './our-agents.component.html',
  styles: ``,
})
export class OurAgentsComponent {
  userService = inject(UserService);

  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    this.userService.loadAllPublicEmployeeList();
  }
}
