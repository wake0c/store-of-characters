import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { SecondPageComponent } from './pages/second-page/second-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/firstpage',
    pathMatch: 'full'
  },
  {
    path: 'home',
    children: [
      {
        path: 'firstpage',
        component: FirstPageComponent
      },
      {
        path: 'secondpage',
        component: SecondPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
