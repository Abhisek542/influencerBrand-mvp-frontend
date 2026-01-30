import { Routes } from '@angular/router';
import { Authlayout } from './features/auth/authlayout/authlayout';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { roleGuard } from './core/guards/role.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
      path: 'influencer',
      canActivate:[roleGuard,authGuard],
      data: { roles: ['INFLUENCER'] },
      loadChildren: () =>
        import('./features/influencer/influencer.routes').then((m) => m.INFLUENCER_ROUTES),
    },
    {
      path: 'brand',
      canActivate:[roleGuard,authGuard],
      data: { roles: ['BRAND'] },
      loadChildren: () =>
        import('./features/brand/brand.routes').then((m) => m.BRAND_ROUTES),
    },

    {
      path: 'auth',
      component:Authlayout,
      children:[
        {path:'login', component:Login},
        {path:'register',component:Register},
        {path:'', redirectTo:'login', pathMatch:'full'},
      ]

    },

    {
      path: '',
      redirectTo: 'brand',
      pathMatch: 'full',
    },

    {

    }
];
