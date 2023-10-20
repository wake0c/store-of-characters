import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseClientService {

  constructor(
    private storage: Storage,
    private auth: Auth
  ) {}

  login() {

  }

  uploadImgFile(imgFile: File) {
    const storageRef = ref(this.storage, `imgs/${imgFile.name}`);
    uploadBytesResumable(storageRef, imgFile).then(()=> {
      console.log('Uploaded a blob or file!');
    });
  }
}
