import { UserWord } from "../models"

export default interface WordsPageState {
    learningWords: UserWord[]
    inputChosenWords: number
    trainedWord: UserWord | null
    trainWord: boolean
    listening: boolean
    listeningRepetitions: number
}