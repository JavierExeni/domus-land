import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CityService } from '@services/city.service';
import { UserService } from '@services/user.service';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, switchMap } from 'rxjs';
import { EmptyListMessageComponent } from 'src/app/components/empty-list-message/empty-list-message.component';
import { SkeletonComponent } from 'src/app/components/skeleton/skeleton.component';
import { USER_TYPE } from 'src/app/types';
import { CardAgentComponent } from './card-agent/card-agent.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-list-agents',
  standalone: true,
  imports: [
    CommonModule,
    EmptyListMessageComponent,
    SkeletonComponent,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    CardAgentComponent,
    PaginatorModule,
  ],
  templateUrl: './list-agents.component.html',
  styles: ``,
})
export class ListAgentsComponent {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  cityService = inject(CityService);

  formSearch = this.fb.group({
    full_name: [''],
    city_id: [null],
    role: USER_TYPE.AGENTE,
  });

  first: number = 0;
  rows: number = 20;

  ngOnInit(): void {
    this.userService.loadPublicEmployeeByRoleList(USER_TYPE.AGENTE);
    this.formSearch.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          return this.userService.getPublicEmployeeByRoleList(
            value.role!,
            value.full_name!,
            parseInt(value.city_id!)
          );
        })
      )
      .subscribe();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.rows = event.rows!;
    const page = event.page! + 1;
    this.userService.loadPublicEmployeeByRoleList(USER_TYPE.AGENTE, '', page);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
