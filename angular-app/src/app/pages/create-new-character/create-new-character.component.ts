import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Character, CharacterClipboardData, firestoreCharacter } from 'src/app/characters';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/dialogs/alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FirebaseClientService } from 'src/app/services/firebase-client.service';



@Component({
  selector: 'app-create-new-character',
  templateUrl: './create-new-character.component.html',
  styleUrls: ['./create-new-character.component.scss']
})
export class CreateNewCharacterComponent {
  
  commandTmp: string = "============能力値============\nCCB<={SAN} 【SAN値チェック】\nCCB<={Idea} 【アイデア】\nCCB<={Luck} 【幸運】\nCCB<={Knowledge} 【知識】\n \n===========能力値*5===========\nCCB<=({STR}*5) 【STR】\nCCB<=({CON}*5) 【CON】\nCCB<=({POW}*5) 【POW】\nCCB<=({DEX}*5) 【DEX】\nCCB<=({APP}*5) 【APP】\nCCB<=({SIZ}*5) 【SIZ】\nCCB<=({INT}*5) 【INT】\nCCB<=({EDU}*5) 【EDU】\n \n============技能値============\n";

  imageFile!: File;

  backgroundImageStyle = {'background-image':`url("")`};
  isContainImg: boolean = false;


  name: string = '';
  memo: string = '';
  externalUrl: string = '';
  color: string = '#ffffff';
  isSecred: boolean = false;

  

  
  str!: number;
  diffStr!: number;
  currentStr!:number

  con!: number;
  diffCon!: number;
  currentCon!: number;

  pow!: number;
  diffPow!: number;
  currentPow!: number;

  dex!: number;
  diffDex!: number;
  currentDex!: number;

  
  app!: number;
  diffApp!: number;
  currentApp!: number;

  siz!: number;
  diffSiz!: number;
  currentSiz!: number;

  int!: number;
  diffInt!: number;
  currentInt!: number;

  edu!: number;
  diffEdu!: number;
  currentEdu!: number;


  hp!: number;
  diffHp!: number;
  currentHp!: number;

  mp!: number;
  diffMp!: number;
  currentMp!: number;

  san!: number;
  diffSan! :number;
  currentSan!: number;
  
  sanMax:number = 99;
  diffSanMax!: number;

  idea!: number;
  diffIdea!: number;
  currentIdea!: number;

  luck!: number;
  diffLuck!: number;
  currentLuck!: number;

  knowledge!: number;
  diffKnowledge!: number;
  currentKnowledge!: number;

  skillForms: FormGroup = this.fb.group({
    skills: this.fb.array([
      this.fb.group({
        skillLabel: <string[]>['',Validators.required],
        skillVal: <number | null[]>[null, Validators.required],
        skillDiff: <number | null[]>[null, Validators.required],
        skillCurrent: <number | null[]>[null, Validators.required],
      })
    ])
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private firestore: Firestore = inject(Firestore),
    private firebaseClientService: FirebaseClientService,
    ){
      this.calStatus();
    }

  //=======================================自動計算=======================================-
  calStatus() {
    this.sanMax =this.diffSanMax? 99 - this.diffSanMax : 99;
    
    this.currentStr = this.diffStr? this.str + this.diffStr: this.str;
    this.currentCon = this.diffCon? this.con + this.diffCon: this.con;
    this.currentPow = this.diffPow? this.pow + this.diffPow: this.pow;
    this.currentDex = this.diffDex? this.dex + this.diffDex: this.dex;
    
    this.currentApp = this.diffApp? this.app + this.diffApp: this.app;
    this.currentSiz = this.diffSiz? this.siz + this.diffSiz: this.siz;
    this.currentInt = this.diffInt? this.int + this.diffInt: this.int;
    this.currentEdu = this.diffEdu? this.edu + this.diffEdu: this.edu;
    
    this.hp = Math.ceil((this.currentCon + this.currentSiz)/2);
    this.mp = this.pow;
    this.san = this.pow*5;
    this.idea = this.int*5;
    this.luck = this.pow*5;
    this.knowledge = this.edu*5;

    this.currentHp = this.diffHp? this.hp + this.diffHp: this.hp;
    this.currentMp = this.diffMp? this.mp + this.diffMp: this.mp;
    this.currentSan = this.diffSan? this.san + this.diffSan: this.san;
    this.currentIdea = this.diffIdea? this.idea + this.diffIdea: this.idea;
    this.currentLuck = this.diffLuck? this.luck + this.diffLuck: this.luck;
    this.currentKnowledge = this.diffKnowledge? this.knowledge + this.diffKnowledge: this.knowledge;

  }



  //=============================リアクティブフォーム（技能）============================
  get skillForm(): FormGroup {
    return this.fb.group({
      skillLabel: <string[]>['',Validators.required],
      skillVal: <number | null[]>[null, Validators.required],
      skillDiff: <number | null[]>[null, Validators.required],
      skillCurrent: <number | null[]>[null, Validators.required],
    });
  }

  get skills(): FormArray {
    return this.skillForms.get('skills') as FormArray;
  }

  addSkillForm(idx?: number){
    if(!idx) {
      this.skills.push(this.skillForm);
      return;
    } 
    this.skills.insert(idx+1,this.skillForm);
  }

  removeSkillForm(idx: number) {
    if(!this.skills.value[idx].skillLabel) {
      this.skills.removeAt(idx);
      return;
    }
    let result = confirm(`${this.skills.value[idx].skillLabel}を本当に削除しますか?`);
    if(!result) return;
    this.skills.removeAt(idx);

    ////-----------------------------AngularMaterialでダイアログ実装-----------------------------
    // const dialogRef = this.dialog.open(AlertDialogComponent, {
    //   data: { text: this.skills.value[idx].skillLabel },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if(!result) return;
    //   this.skills.removeAt(idx);
    // });
  }
  //------リアクティブフォーム内での計算------
  changeSkillForm(idx: number) {
    this.skills.value[idx].skillCurrent = this.skills.value[idx].skillVal + this.skills.value[idx].skillDiff;
    console.log(this.skills.value[idx].skillCurrent);
  }













//====================================画像挿入=========================================
  onChangeInput(evt:any) {
    const file = evt.target.files[0]? evt.target.files[0] : evt.dataTransfer.files[0];
    if (!file) return;
    this.imageFile = file;

    this.backgroundImageStyle = {'background-image':`url("${URL.createObjectURL(file)}")`};
    this.isContainImg = true;

  }

  dragOver(event:DragEvent){
    event.preventDefault();
  }

  drop(event:any){
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;
    this.imageFile = file;

    console.log(URL.createObjectURL(file));
    this.backgroundImageStyle = {'background-image':`url("${URL.createObjectURL(file)}")`};
    this.isContainImg = true;
  }















  uplodeFile() {
    console.log(this.skills.value);
    for(let skill of this.skills.getRawValue()) {
      const skillStr: string = `CCB<=${skill.skillCurrent} 【${skill.skillLabel}】\n`;
      this.commandTmp += skillStr;
    }

    const character:firestoreCharacter = {
      name: this.name,
      memo: this.memo,
      externalUrl: this.externalUrl,
      color: this.color,
      isSecred: this.isSecred,

      str: this.str,
      diffStr: this.diffStr,
      currentStr: this.currentStr,
      con: this.con,
      diffCon: this.diffCon,
      currentCon: this.currentCon,
      pow: this.pow,
      diffPow: this.diffPow,
      currentPow: this.currentPow,
      dex: this.dex,
      diffDex: this.diffDex,
      currentDex: this.currentDex,
      app: this.app,
      diffApp: this.diffApp,
      currentApp: this.currentApp,
      siz: this.siz,
      diffSiz: this.diffSiz,
      currentSiz: this.currentSiz,
      int: this.int,
      diffInt: this.diffInt,
      currentInt: this.currentInt,
      edu: this.edu,
      diffEdu: this.diffEdu,
      currentEdu: this.currentEdu,
      hp: this.hp,
      diffHp: this.diffHp,
      currentHp: this.currentHp,
      mp: this.mp,
      diffMp: this.diffMp,
      currentMp: this.currentMp,
      san: this.san,
      diffSan: this.diffSan,
      currentSan: this.currentSan,
      sanMax: this.sanMax,
      diffSanMax: this.diffSanMax,
      idea: this.idea,
      diffIdea: this.diffIdea,
      currentIdea: this.currentIdea,
      luck: this.luck,
      diffLuck: this.diffLuck,
      currentLuck: this.currentLuck,
      knowledge: this.knowledge,
      diffKnowledge: this.diffKnowledge,
      currentKnowledge: this.currentKnowledge,

      skills: this.skills.value,
    }
    
    let status: CharacterClipboardData= {
      "kind":"character",
      "data":<Character> {
        name: this.name,
        memo: this.memo,
        initiative: this.dex,
        externalUrl: this.externalUrl,
        iconUrl: null,//外部リンク適用負荷
        color: this.color,
        secret: this.isSecred,
        status: [{
          label: "HP",
          value: this.currentHp,
          max: this.hp,
        },{
          label: "MP",
          value: this.currentMp,
          max: this.mp,
        },{
          label: "SAN",
          value: this.san,
          max: this.sanMax,
        }],
        params: [{
          label: "STR",
          value: String(this.currentStr)
        },{
          label: "CON",
          value: String(this.currentCon)
        },{
          label: "POW",
          value: String(this.currentPow)
        },{
          label: "DEX",
          value: String(this.currentDex)
        },{
          label: "APP",
          value: String(this.currentApp)
        },{
          label: "SIZ",
          value: String(this.currentSiz)
        },{
          label: "INT",
          value: String(this.currentInt)
        },{
          label: "EDU",
          value: String(this.currentEdu)
        },{
          label: "Idea",
          value: String(this.currentIdea)
        },{
          label: "Luck",
          value: String(this.currentLuck)
        },{
          label: "Knowledge",
          value: String(this.currentKnowledge)
        },],
        faces: [{
          iconUrl: "",//外部リンク適用負荷
          label: "aaaaa"
        },],
        x: 0,//デフォルト値
        y: 0,//デフォルト値
        angle: 0,
        width: 6,
        height: 0,
        active: false,//デフォルト値
        invisible: false,
        hideStatus: false,
        commands: this.commandTmp,
        owner: null
      }
    }
    this.firebaseClientService.insertCharacter(character, status);
    console.log(JSON.stringify(status));
    this.router.navigateByUrl('home/character-ditail');
  }
  
}

