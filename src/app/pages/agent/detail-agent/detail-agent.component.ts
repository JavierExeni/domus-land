import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PropertyService } from '@services/property.service';
import { UserService } from '@services/user.service';
import { concatMap, tap } from 'rxjs';
import { Employee } from 'src/app/types';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { EmptyListMessageComponent } from 'src/app/components/empty-list-message/empty-list-message.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SkeletonComponent } from 'src/app/components/skeleton/skeleton.component';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { PropertyCardComponent } from '../../property/list-properties/components/property-card/property-card.component';
import { SidebarModule } from 'primeng/sidebar';
import { PropertyFilterFormComponent } from '../../property/list-properties/components/property-filter-form/property-filter-form.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@Component({
  selector: 'app-detail-agent',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ReactiveFormsModule,
    ContactFormComponent,
    EmptyListMessageComponent,
    SkeletonModule,
    SkeletonComponent,
    TooltipModule,
    PaginatorModule,
    DialogModule,
    PropertyCardComponent,
    NgIf,
    NgFor,
    // UserFormComponent,
    SidebarModule,
    PropertyFilterFormComponent,
  ],
  templateUrl: './detail-agent.component.html',
  styles: ``,
})
export class DetailAgentComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  // authService = inject(AuthService);
  propertyService = inject(PropertyService);

  agent!: Employee;

  editModal = false;
  sidebarFilters = false;

  first: number = 0;
  rows: number = 10;

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        tap(({ agent }) => (this.agent = agent)),
        concatMap(() =>
          this.propertyService.filteredProperties(
            { agent: this.agent.id },
            null
          )
        )
      )
      .subscribe();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    const page = event.page + 1;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (this.propertyService.filter_agents_property()) {
      this.propertyService
        .filteredProperties(
          {
            ...this.propertyService.filter_agents_property(),
            agent: this.agent.id,
          },
          page
        )
        .subscribe();
    } else {
      this.propertyService
        .filteredProperties({ agent: this.agent.id }, page)
        .subscribe();
    }
  }
}
