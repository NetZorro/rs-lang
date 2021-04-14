import {IWord} from "Entities";

export interface IFinishPage{
  stats: any,
}
export interface IAudioCallGameWords {
  hiddenWord: IWord,
  fiveRandom: Array<IWord>,
  stats: IStats
  selected: IWord | undefined,
  setSelected: any,
}
export interface IStats {
  success: number
  fail: number
}
