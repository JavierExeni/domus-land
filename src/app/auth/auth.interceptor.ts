import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { PersistanceService } from '@services/persistance.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const platformId = inject(PLATFORM_ID);
  if(isPlatformBrowser(platformId)){
    const persistanceService = inject(PersistanceService);
    const token = persistanceService.get('accessToken');
    const isLoginRequest = request.url.endsWith('/token');
    request = isLoginRequest
      ? request
      : request.clone({
          setHeaders: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
    return next(request);
  }
  return next(request);
};
