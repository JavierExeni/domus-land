import { Routes } from '@angular/router';
import { propertyAgentResolver, propertyResolver, propertyUserResolver } from './resolvers/property-resolver.resolver';
import { agentResolver } from './resolvers/agent-resolver.resolver';

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
  {
    path: 'agentes/:id',
    loadComponent: () =>
      import('./pages/agent/detail-agent/detail-agent.component').then(
        (c) => c.DetailAgentComponent
      ),
    resolve: {
      agent: agentResolver,
    },
  },
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
  {
    path: 'propiedades/categoria/:category',
    loadComponent: () =>
      import('./pages/property/list-properties/list-properties.component').then(
        (c) => c.ListPropertiesComponent
      ),
  },
  {
    path: 'propiedades/tipo/:type',
    loadComponent: () =>
      import('./pages/property/list-properties/list-properties.component').then(
        (c) => c.ListPropertiesComponent
      ),
  },
  {
    path: 'propiedades/:id/:agentId',
    loadComponent: () =>
      import('./pages/property/detail-property/detail-property.component').then(
        (c) => c.DetailPropertyComponent
      ),
    resolve: {
      property: propertyResolver,
      agent: propertyAgentResolver
    },
  },
  {
    path: 'propiedades/:id/:userId/:agentId',
    loadComponent: () =>
      import('./pages/property/detail-property/detail-property.component').then(
        (c) => c.DetailPropertyComponent
      ),
    resolve:{
      property : propertyResolver,
      user: propertyUserResolver,
      agent: propertyAgentResolver
    }
  },
  // {
  //   path: 'propiedades/requerimiento/:id/:userId',
  //   loadComponent: () =>
  //     import(
  //       './pages/property/detail-property/detail-property.component'
  //     ).then((c) => c.PropertiesByRequirementComponent),
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];
