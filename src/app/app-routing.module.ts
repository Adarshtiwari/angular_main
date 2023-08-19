import { canActivatechildGuard } from './Guard/can-activatechild.guard';
import { authGuard } from './Guard/auth.guard';
import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: 'Home',

    children: [
      { path: '', component: HomeComponent },
      {
        path: '', canActivateChild: [canActivatechildGuard],

        children: [
          { path: 'User', component: UserComponent }
        ]

      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
