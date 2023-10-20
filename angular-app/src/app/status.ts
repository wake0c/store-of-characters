import { Character, CharacterClipboardData } from "./characters";

let a: CharacterClipboardData = {
  "kind":"character",
  "data":<Character> {
     "name":"栗原さん",
      "initiative":14,
      "externalUrl":"",
      "iconUrl":null,
      "color":"#ad5a48",
      "secret":false,
      "commands":"CCB<={SAN} 【SAN値チェック】\nCCB<=70 【アイデア】\nCCB<=85 【幸運】\nCCB<=85 【知識】\nCCB<=70 【目星】\nCCB<=49 【応急手当】\nCCB<=50 【重機械操作】\nCCB<=50 【コンピュータ】\nCCB<=60 【経理】\nCCB<=50 【オカルト】\nCCB<=60 【地質学】\nCCB<=60 【物理学】\nCCB<=55 【心理学】\nCCB<=60 【法律】",
      "status":[
        {
          "label":"HP",
          "value":8,
          "max":8
        },
       {
          "label":"MP",
          "value":17,
          "max":17
        }, 
        {
          "label":"SAN",
          "value":85,
          "max":99
        }
      ]
  }
}