import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { MyPageComponent } from './pages/my-page/my-page.component';
import { CreateNewCharacterComponent } from './pages/create-new-character/create-new-character.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/create-new-character',
    pathMatch: 'full'
  },
  {
    path: 'home',
    children: [
      {
        path: 'character-list',
        component: CharacterListComponent
      },
      {
        path: 'my-page',
        component: MyPageComponent
      },
      {
        path: 'create-new-character',
        component: CreateNewCharacterComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
