export interface IWord {
    id: string,
    group: number,
    page: number,
    word: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textExample: string,
    transcription: string,
    wordTranslate: string,
    textMeaningTranslate: string,
    textExampleTranslate: string,
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
