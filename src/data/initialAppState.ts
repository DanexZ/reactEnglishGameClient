import { AppStateInterface } from "./types/AppStateInterface";
import { initialUser } from "./initialUser";
import { PAGES } from "./constants";
import { SCREEN_NAMES } from "./constants";

export const initialAppState: AppStateInterface = {
    isLogged: Boolean(localStorage.getItem("englishGame_token")),
    flashMessages: [],
    user: initialUser,
    users: [],
    currentScreen: (Boolean(localStorage.getItem("englishGame_token"))) ? SCREEN_NAMES.GAMEMENU : SCREEN_NAMES.NOTLOGGED,
    currentTab: PAGES.NONE,
    words: [],
    dialogues: [],
    badges: [],
    phrases: [],
    showBottomNav: true,
    showTalkingContainer: false,
    tutorialStage: 0,
    RootaTexts: [],
    chosenLevel: 0,
    chosenDialogue: 0,
    listening: false,
    speaking: false,
    startedTest: false,
    interval: setInterval(() => {}),
    timeout: setTimeout(() => {}),
    recognition: null,
    emailToken: ""
};