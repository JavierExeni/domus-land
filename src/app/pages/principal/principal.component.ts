import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { ContractTypeComponent } from './components/contract-type/contract-type.component';
import { WeekOffersComponent } from './components/week-offers/week-offers.component';
import { CategoryGridComponent } from './components/category-grid/category-grid.component';
import { SystemService } from '@services/system.service';
import { OurAgentsComponent } from './components/our-agents/our-agents.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [BannerComponent, ContractTypeComponent, WeekOffersComponent, CategoryGridComponent, OurAgentsComponent],
  templateUrl: './principal.component.html',
  styles: ``
})
export class PrincipalComponent implements OnInit{
  systemService = inject(SystemService);

  ngOnInit(): void {
    this.systemService.loadSystemList();
  }
}
