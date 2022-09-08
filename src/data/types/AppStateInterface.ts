import { User } from "../models"

export default interface AppStateInterface {
    isLogged: Boolean
    flashMessages: string[]
    user: User 
    users: User[]
    currentScreen: string
    currentTab: string
    words: any[]
    dialogues: any[]
    phrases: []
    badges: []
    showBottomNav: Boolean
    showTalkingContainer: Boolean
    tutorialStage: number
    RootaTexts: {id:number, content:string}[]
    chosenLevel: number
    chosenDialogue: number
    listening: boolean
    speaking: boolean
    startedTest: boolean
    interval: ReturnType<typeof setInterval>
    timeout: ReturnType<typeof setTimeout>
    recognition: any
}