export interface IWord {
    id: string;
    group: string;
    page: string;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
    _id?: string;
    userWord?: {
        difficulty?: string;
        optional?: { study?: boolean; delete?: boolean; won?: number; lost?: number };
    };
}

export interface IWordWithSuccess extends IWord {
    success: boolean
}

export interface ISavannahState {
    inProgress: boolean,
    attempt: number,
    gameWordArray: IWordWithSuccess[],
    roundWordArray: IWordWithSuccess[],
    result: boolean

}

export interface ISavannahAction {
    type: string,
    payload: ISavannahState
}
