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

  str: number | null;
  diffStr: number | null;
  currentStr: number | null;

  con: number | null;
  diffCon: number | null;
  currentCon: number | null;

  pow: number | null;
  diffPow: number | null;
  currentPow: number | null;

  dex: number | null;
  diffDex: number | null;
  currentDex: number | null;


  app: number | null;
  diffApp: number | null;
  currentApp: number | null;

  siz: number | null;
  diffSiz: number | null;
  currentSiz: number | null;

  int: number | null;
  diffInt: number | null;
  currentInt: number | null;

  edu: number | null;
  diffEdu: number | null;
  currentEdu: number | null;


  hp: number | null;
  diffHp: number | null;
  currentHp: number | null;

  mp: number | null;
  diffMp: number | null;
  currentMp: number | null;

  san: number | null;
  diffSan: number | null;
  currentSan: number | null;

  sanMax: number | null;
  diffSanMax: number | null;

  idea: number | null;
  diffIdea: number | null;
  currentIdea: number | null;

  luck: number | null;
  diffLuck: number | null;
  currentLuck: number | null;

  knowledge: number | null;
  diffKnowledge: number | null;
  currentKnowledge: number | null;

  skills: Array<skills>;
}

export interface skills {
  skillLabel: string,
  skillVal: number,
  skillDiff: number,
  skillCurrent: number
}