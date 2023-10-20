import { Component } from '@angular/core';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent {
  stetasStr: string;
  constructor(
    private firebaseClientService: FirebaseClientService,

  ) {
    this.stetasStr = JSON.stringify(firebaseClientService.statusTmp);
  }

  copyStetas() {
    navigator.clipboard.writeText(this.stetasStr);
  }

}
