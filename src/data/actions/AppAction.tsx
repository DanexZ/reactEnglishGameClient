import { Badge, Comment, Conversation, Dialogue, Event, Phrase, ReceivedMessage, RootaText, User, UserDay, UserTest, UserWord, Word } from "../models";
import { ExamStatus } from "../types/ExamStatus";
import { LearningStatus } from "../types/LearningStatus";

export type AppAction =
    | { type: "login"; payload: User }
    | { type: "logout"}
    | { type: "setCurrentScreen"; payload: string }
    | { type: "setCurrentTab"; payload: string }
    | { type: "setWords"; payload: Word[]}
    | { type: "setUserReceivedMessages"; payload: ReceivedMessage[]}
    | { type: "setUsers"; payload: User[]}
    | { type: "setUserRanking"; payload: number}
    | { type: "setUserWords"; payload: UserWord[]}
    | { type: "setUserCurrentlyLearningWords"; payload: UserWord[]}
    | { type: "swapUserWord"; payload: UserWord}
    | { type: "setUserEvents"; payload: { unlockedLevels: Event[], unlockedTests: Event[], unlockedDialogues: boolean }}
    | { type: "setUserCustomWords"; payload: UserWord[]}
    | { type: "setUserPhrases"; payload: Phrase[]}
    | { type: "setUserTests"; payload: UserTest[]}
    | { type: "setUserDays"; payload: UserDay[]}
    | { type: "setUserEfficiency"; payload: number}
    | { type: "setDialogues"; payload: Dialogue[]}
    | { type: "setPhrases"; payload: Phrase[]}
    | { type: "setBadges"; payload: Badge[]}
    | { type: "setRootaTexts"; payload: RootaText[]}
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
    | { type: "setUserConversations"; payload: Conversation[]}
    | { type: "addUserComment"; payload: Comment }
    | { type: "addUserConversation"; payload: Conversation}
    | { type: "addUserWord"; payload: UserWord}
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
