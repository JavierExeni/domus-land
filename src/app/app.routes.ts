import { Routes } from '@angular/router';
import { propertyResolver } from './resolvers/property-resolver.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/principal/principal.component').then(
        (c) => c.PrincipalComponent
      ),
  },
  {
    path: 'agentes',
    loadComponent: () =>
      import('./pages/agent/list-agents/list-agents.component').then(
        (c) => c.ListAgentsComponent
      ),
  },
  // {
  //   path: 'agentes/:id',
  //   loadComponent: () =>
  //     import('./pages/detail-agent/detail-agent.component').then(
  //       (c) => c.DetailAgentComponent
  //     ),
  // },
  // {
  //   path: 'proyectos',
  //   loadComponent: () =>
  //     import('./pages/list-projects/list-projects.component').then(
  //       (c) => c.ListProjectsComponent
  //     ),
  // },
  {
    path: 'propiedades',
    loadComponent: () =>
      import('./pages/property/list-properties/list-properties.component').then(
        (c) => c.ListPropertiesComponent
      ),
  },
  // {
  //   path: 'propiedades/categoria/:category',
  //   loadComponent: () =>
  //     import('./pages/list-properties/list-properties.component').then(
  //       (c) => c.ListPropertiesComponent
  //     ),
  // },
  // {
  //   path: 'propiedades/tipo/:type',
  //   loadComponent: () =>
  //     import('./pages/list-properties/list-properties.component').then(
  //       (c) => c.ListPropertiesComponent
  //     ),
  // },
  {
    path: 'propiedades/:id',
    loadComponent: () =>
      import('./pages/property/detail-property/detail-property.component').then(
        (c) => c.DetailPropertyComponent
      ),
    resolve: {
      property: propertyResolver,
    },
  },
  // },
  // {
  //   path: 'propiedades/:id/:userId',
  //   loadComponent: () =>
  //     import('./pages/detail-property/detail-property.component').then(
  //       (c) => c.DetailPropertyComponent
  //     ),
  //   resolve:{
  //     property : PropertyResolver
  //   }
  // },
  // {
  //   path: 'propiedades/requerimiento/:id/:userId',
  //   loadComponent: () =>
  //     import(
  //       './pages/properties-by-requirement/properties-by-requirement.component'
  //     ).then((c) => c.PropertiesByRequirementComponent),
  // },
  // {
  //   path : 'contacto',
  //   loadComponent: () =>
  //     import('./pages/contact/contact.component').then(
  //       (c) => c.ContactComponent
  //     ),
  // },
  // {
  //   path : 'vender-propiedad',
  //   loadComponent: () =>
  //     import('./pages/contact-sell-property/contact-sell-property.component').then(
  //       (c) => c.ContactSellPropertyComponent
  //     ),
  // }
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];
