import { UserWord } from "../models"

export interface WordsPageState {
    learningWords: UserWord[]
    inputChosenWords: number
    trainedWord: UserWord | null
    trainWord: boolean
    listening: boolean
    listeningRepetitions: number
}