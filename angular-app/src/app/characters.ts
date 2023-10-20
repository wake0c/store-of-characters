export interface CharacterClipboardData {
  kind: "character";
  data: Partial<Character>;
}

export interface Character {
  name: string,
  memo: string;
  initiative: number;
  externalUrl: string;
  status: {
    label: string;
    value: number;
    max: number;
  }[];
  params: { label: string; value: string }[];
  iconUrl: string | null; // [!]
  faces: { iconUrl: string | null; label: string }[]; // [!]
  x: number; // [!]
  y: number; // [!]
  angle: number;
  width: number;
  height: number;
  active: boolean; // [!]
  secret: boolean;
  invisible: boolean;
  hideStatus: boolean;
  color: string;
  commands: string;
  owner: string | null;
};

export interface status {
  init: number;
  diff: number;
  current: number;
}

export interface firestoreCharacter {
  name: string;
  memo: string;
  externalUrl: string;
  color: string;
  isSecred: boolean;

  str: number;
  diffStr: number;
  currentStr:number

  con: number;
  diffCon: number;
  currentCon: number;

  pow: number;
  diffPow: number;
  currentPow: number;

  dex: number;
  diffDex: number;
  currentDex: number;

  
  app: number;
  diffApp: number;
  currentApp: number;

  siz: number;
  diffSiz: number;
  currentSiz: number;

  int: number;
  diffInt: number;
  currentInt: number;

  edu: number;
  diffEdu: number;
  currentEdu: number;


  hp: number;
  diffHp: number;
  currentHp: number;

  mp: number;
  diffMp: number;
  currentMp: number;

  san: number;
  diffSan :number;
  currentSan: number;
  
  sanMax:number;
  diffSanMax: number;

  idea: number;
  diffIdea: number;
  currentIdea: number;

  luck: number;
  diffLuck: number;
  currentLuck: number;

  knowledge: number;
  diffKnowledge: number;
  currentKnowledge: number;

  skills: any;
}