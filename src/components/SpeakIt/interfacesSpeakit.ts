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

export interface ISpeakitState {
    inProgress: boolean,
    roundWordArray: IWordWithSuccess[],
    result: boolean,
    microphoneOn: boolean

}

export interface ISpeakitAction {
    type: string,
    payload: ISpeakitState
}
