export const enum LetterState {
  INITIAL = 0,
  CORRECT = "correct",
  PRESENT = "present",
  ABSENT = "absent",
}

export interface Tile {
  letter: string;
  state: LetterState;
}

export interface Position {
  x: number;
  y: number;
}
