import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { CharacterClipboardData, firestoreCharacter } from '../characters';


@Injectable({
  providedIn: 'root'
})
export class FirebaseClientService {
  private _statusTmp!: CharacterClipboardData;

  constructor(
    private storage: Storage,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  login() {

  }

  uploadImgFile(imgFile: File) {
    const storageRef = ref(this.storage, `imgs/${imgFile.name}`);
    uploadBytesResumable(storageRef, imgFile).then(()=> {
      console.log('Uploaded a blob or file!');
    });
  }

  async insertCharacter(character: firestoreCharacter, status: CharacterClipboardData) {
    this._statusTmp = status;
    addDoc(collection(this.firestore,'characters'),<firestoreCharacter>character);
  }
  
  get statusTmp(): CharacterClipboardData{
    return this._statusTmp;
  }
  
}
