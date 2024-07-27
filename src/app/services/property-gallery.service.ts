import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyGalleryService {
  http = inject(HttpClient);

  baseUrl = `${environment.BASE_URL}properties/`;

  downloadSingleWaterMarkImage(id: number) {
    const url = `${this.baseUrl}property-gallery/${id}/single-download-water/`;
    let params = new HttpParams();
    params = params.set('onlyActive', 'false');
    return this.http.get(url, {
      responseType: 'blob',
      params: params,
    });
  }

  downloadSingleOriginalImage(id: number) {
    const url = `${this.baseUrl}property-gallery/${id}/single-download-original/`;
    let params = new HttpParams();
    params = params.set('onlyActive', 'false');
    return this.http.get(url, {
      responseType: 'blob',
      params: params,
    });
  }

  downloadbulkImages(id: number) {
    const url = `${this.baseUrl}property-gallery/${id}/bulk-download/`;
    let params = new HttpParams();
    params = params.set('onlyActive', 'false');
    return this.http.get(url, {
      responseType: 'blob',
      params: params,
    });
  }
}
