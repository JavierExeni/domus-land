import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';

enum CITY {
  SANTA_CRUZ,
  LA_PAZ,
  TARIJA,
  COCHABAMBA,
  ORURO,
  SUCRE,
  BENI,
  POTOSI,
  PANDO,
}

@Component({
  selector: 'app-bolivia-map',
  standalone: true,
  imports: [],
  templateUrl: './bolivia-map.component.html',
  styles: [
    `
      .no-selected {
        filter: brightness(0) saturate(100%) invert(81%) sepia(23%)
          saturate(7154%) hue-rotate(189deg) brightness(90%) contrast(98%);
      }

      .selected {
        filter: brightness(0) saturate(100%) invert(17%) sepia(16%)
          saturate(2344%) hue-rotate(170deg) brightness(95%) contrast(86%);
        stroke: white;
      }

      path {
        cursor: pointer;
      }

      #city_name {
        font-size: 20px;
        color: #1e3a58;
        border-bottom: 1px solid #1e3a58;
        text-align: center;
        margin-bottom: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BoliviaMapComponent),
      multi: true,
    },
  ],
})
export class BoliviaMapComponent {
  @ViewChild('tooltip') tooltip!: ElementRef;

  @ViewChild('santCruz', { static: false }) santCruz!: ElementRef;
  @ViewChild('laPaz', { static: false }) laPaz!: ElementRef;
  @ViewChild('tarija', { static: false }) tarija!: ElementRef;
  @ViewChild('cochabamba', { static: false }) cochabamba!: ElementRef;
  @ViewChild('oruro', { static: false }) oruro!: ElementRef;
  @ViewChild('sucre', { static: false }) sucre!: ElementRef;
  @ViewChild('pando', { static: false }) pando!: ElementRef;
  @ViewChild('potosi', { static: false }) potosi!: ElementRef;
  @ViewChild('beni', { static: false }) beni!: ElementRef;

  cdRef = inject(ChangeDetectorRef);

  SANTA_CRUZ: CITY = CITY.SANTA_CRUZ;
  LA_PAZ: CITY = CITY.LA_PAZ;
  TARIJA: CITY = CITY.TARIJA;
  COCHABAMBA: CITY = CITY.COCHABAMBA;
  ORURO: CITY = CITY.ORURO;
  SUCRE: CITY = CITY.SUCRE;
  BENI: CITY = CITY.BENI;
  POTOSI: CITY = CITY.POTOSI;
  PANDO: CITY = CITY.PANDO;

  hasCity: boolean = false;

  city_name: string = 'Santa Cruz de la Sierra';

  onChange?: (v: string) => void;

  onTouched?: () => void;

  value: string | null = null;

  ngAfterViewInit(): void {
    this.loadCity(this.SANTA_CRUZ);
  }

  loadCity(city: CITY) {
    this.deselectionMap();

    switch (city) {
      case CITY.SANTA_CRUZ:
        this.city_name = 'Santa Cruz de la Sierra';
        this.value = this.city_name;
        this.onTouched?.();
        this.onChange?.(this.city_name);
        this.santCruz.nativeElement.setAttribute('fill', '#ecc27d');
        break;
      case CITY.LA_PAZ:
        this.city_name = 'La Paz';
        this.value = this.city_name;
        this.onTouched?.();
        this.onChange?.(this.city_name);
        this.laPaz.nativeElement.setAttribute('fill', '#ecc27d');
        break;
      case CITY.COCHABAMBA:
        this.city_name = 'Cochabamba';
        this.value = this.city_name;
        this.onTouched?.();
        this.onChange?.(this.city_name);
        this.cochabamba.nativeElement.setAttribute('fill', '#ecc27d');
        break;
      case CITY.TARIJA:
        this.city_name = 'Tarija';
        this.value = this.city_name;
        this.onTouched?.();
        this.onChange?.(this.city_name);
        this.tarija.nativeElement.setAttribute('fill', '#ecc27d');
        break;
      case CITY.BENI:
        this.city_name = 'Beni';
        this.value = this.city_name;
        this.onTouched?.();
        this.onChange?.(this.city_name);
        this.beni.nativeElement.setAttribute('fill', '#ecc27d');
        break;
      case CITY.ORURO:
        this.city_name = 'Oruro';
        this.value = this.city_name;
        this.onTouched?.();
        this.onChange?.(this.city_name);
        this.oruro.nativeElement.setAttribute('fill', '#ecc27d');
        break;
      case CITY.PANDO:
        this.city_name = 'Pando';
        this.value = this.city_name;
        this.onTouched?.();
        this.onChange?.(this.city_name);
        this.pando.nativeElement.setAttribute('fill', '#ecc27d');
        break;
      case CITY.POTOSI:
        this.city_name = 'Potosí';
        this.value = this.city_name;
        this.onTouched?.();
        this.onChange?.(this.city_name);
        this.potosi.nativeElement.setAttribute('fill', '#ecc27d');
        break;
      case CITY.SUCRE:
        this.city_name = 'Sucre';
        this.value = this.city_name;
        this.onTouched?.();
        this.onChange?.(this.city_name);
        this.sucre.nativeElement.setAttribute('fill', '#ecc27d');
        break;
    }

    this.hasCity = true;
  }

  deselectionMap() {
    this.santCruz.nativeElement.setAttribute('fill', '#1e3a58');
    this.laPaz.nativeElement.setAttribute('fill', '#1e3a58');
    this.cochabamba.nativeElement.setAttribute('fill', '#1e3a58');
    this.tarija.nativeElement.setAttribute('fill', '#1e3a58');
    this.beni.nativeElement.setAttribute('fill', '#1e3a58');
    this.oruro.nativeElement.setAttribute('fill', '#1e3a58');
    this.pando.nativeElement.setAttribute('fill', '#1e3a58');
    this.potosi.nativeElement.setAttribute('fill', '#1e3a58');
    this.sucre.nativeElement.setAttribute('fill', '#1e3a58');
  }

  writeValue(value: string | null): void {
    this.value = value;
    this.cdRef.markForCheck();
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
}
