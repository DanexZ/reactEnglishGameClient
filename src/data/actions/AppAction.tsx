import { Comment, Conversation, Event, User, UserDay, UserTest, Word } from "../models";
import { ExamStatus } from "../types/ExamStatus";

export type AppAction =
    | { type: "login"; payload: User }
    | { type: "logout"}
    | { type: "setCurrentScreen"; payload: string }
    | { type: "setCurrentTab"; payload: string }
    | { type: "setWords"; payload: Word[]}
    | { type: "setUserReceivedMessages"; payload: any[]}
    | { type: "setUsers"; payload: User[]}
    | { type: "setUserRanking"; payload: number}
    | { type: "setUserWords"; payload: any[]}
    | { type: "setUserEvents"; payload: { unlockedLevels: Event[], unlockedTests: Event[], unlockedDialogues: Boolean }}
    | { type: "setUserCustomWords"; payload: any[]}
    | { type: "setUserPhrases"; payload: any[]}
    | { type: "setUserTests"; payload: UserTest[]}
    | { type: "setUserDays"; payload: any[]}
    | { type: "setUserEfficiency"; payload: number}
    | { type: "setDialogues"; payload: []}
    | { type: "setPhrases"; payload: []}
    | { type: "setBadges"; payload: []}
    | { type: "setRootaTexts"; payload: []}
    | { type: "hideBottomNav"}
    | { type: "showBottomNav"}
    | { type: "toggleTalkingContainer";}
    | { type: "triggerTalkingContainer";}
    | { type: "cleanTalkingContainerTrigger";}
    | { type: "setTutorialStage"; payload: number}
    | { type: "updateUserPoints"; payload: number}
    | { type: "updateUserLifes"; payload: number}
    | { type: "updateUserLevel"; payload: number}
    | { type: "updateTestWord"; payload: {testInitialIndex: number, word_id: number, status: ExamStatus}}
    | { type: "updateUserTest"; payload: {testInitialIndex: number, status: ExamStatus}}
    | { type: "setUserConversations"; payload: []}
    | { type: "addUserComment"; payload: Comment }
    | { type: "addUserConversation"; payload: Conversation}
    | { type: "addUserWord"; payload: any}
    | { type: "setChosenLevel"; payload: number}
    | { type: "setChosenDialogue"; payload: number}
    | { type: "setStartedTest"; payload: boolean}
    | { type: "updateCurrentUserDay"; payload: UserDay}
    | { type: "activateListeningFeature" }
    | { type: "activateSpeakingFeature" }
    | { type: "deactivateListeningFeature" }
    | { type: "deactivateSpeakingFeature" }
    | { type: "setInterval"; payload: ReturnType<typeof setInterval> }
    | { type: "clearInterval"}
    | { type: "setTimeout"; payload: ReturnType<typeof setTimeout> }
    | { type: "clearTimeout"}
    | { type: "setRecognitionInstance"; payload: any}
    | { type: "addUserWordCorrectness", payload: {initialIndex: number, created_at: string}}
    | { type: "addUserWordMistake", payload: {initialIndex: number, created_at: string}}
    | { type: "setEmailToken", payload: string}
