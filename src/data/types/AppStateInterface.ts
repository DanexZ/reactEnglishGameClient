import { Badge, Dialogue, Phrase, RootaText, User, Word } from "../models"

export interface AppStateInterface {
    isLogged: boolean
    flashMessages: string[]
    user: User 
    users: User[]
    currentScreen: string
    currentTab: string
    words: Word[]
    dialogues: Dialogue[]
    phrases: Phrase[]
    badges: Badge[]
    showBottomNav: boolean
    showTalkingContainer: boolean
    tutorialStage: number
    RootaTexts: RootaText[]
    chosenLevel: number
    chosenDialogue: number
    listening: boolean
    speaking: boolean
    startedTest: boolean
    interval: ReturnType<typeof setInterval>
    timeout: ReturnType<typeof setTimeout>
    recognition: any,
    emailToken: string
}