import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';




import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';


import { AppComponent } from './app.component';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { MyPageComponent } from './pages/my-page/my-page.component';
import { CreateCharacterButtonComponent } from './components/create-character-button/create-character-button.component';
import { CreateNewCharacterComponent } from './pages/create-new-character/create-new-character.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    MyPageComponent,
    CreateCharacterButtonComponent,
    CreateNewCharacterComponent,
    ToolbarComponent,
    AlertDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
