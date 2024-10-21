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
  map?: {
    character: string;
    map: SelectItem[];
  };
  score?: number;
  played?: number[];
}
