export interface SelectItem {
  box: number;
  word: string;
  platform: string;
}

export interface FunctionItem {
  value: string;
  color: string;
}

export interface Player {
  id: string;
  name: string;
  map?: string;
  score?: number;
  played?:number[]
}
