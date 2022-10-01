import { AppStateInterface } from "../types/AppStateInterface";
import { AppAction } from "../actions/AppAction";
import { SCREEN_NAMES } from "../constants";
import { calculateEfficiency } from "../../utils/calculateEfficiency";


export const appReducer = (draftState: AppStateInterface, action: AppAction) => {

    let wordIndex;

    switch (action.type) {

        case "login":
            draftState.user = action.payload;
            draftState.isLogged = true;
            draftState.currentScreen = SCREEN_NAMES.GAMEMENU;
            break;

        case "logout":
            draftState.isLogged = false;
            draftState.currentScreen = SCREEN_NAMES.NOTLOGGED;
            break;

        case "setCurrentScreen":
            draftState.currentScreen = action.payload;
            break;

        case "setCurrentTab":
            draftState.currentTab = action.payload;
            break;

        case "setWords":
            draftState.words = [...action.payload];
            break;

        case "setUsers":
            draftState.users = [...action.payload];
            break;

        case "setUserWords":
            draftState.user.words = action.payload;
            break;

        case "setUserEvents":
            draftState.user.events = action.payload;
            break;

        case "setUserCustomWords":
            draftState.user.customWords = action.payload;
            break;

        case "setUserCurrentlyLearningWords":
            draftState.user.currentlyLearningWords = action.payload;
            break;

        case "swapUserWord":
            
            for (let i=0; i<draftState.user.words.length; i++) {

                if (action.payload.word_id === draftState.user.words[i].word_id) {
                    draftState.user.words[i] = action.payload;
                    break;
                }
            }

            for (let i=0; i<draftState.user.currentlyLearningWords.length; i++) {

                if (action.payload.word_id === draftState.user.currentlyLearningWords[i].word_id) {
                    draftState.user.currentlyLearningWords[i] = action.payload;
                    break;
                }
            }

            for (let i=0; i<draftState.user.customWords.length; i++) {

                if (action.payload.word_id === draftState.user.customWords[i].word_id) {
                    draftState.user.customWords[i] = action.payload;
                    break;
                }
            }
            
            break;

        case "setUserConversations":
            draftState.user.conversations = action.payload;
            break;

        case "addUserConversation":
            draftState.user.conversations.push(action.payload);
            break;

        case "addUserComment":

            for (let i=0; i<draftState.user.conversations.length; i++) {

                const conversation = draftState.user.conversations[i];

                if (conversation.id === action.payload.conversation_id) {
                    conversation.comments.push(action.payload);
                    break;
                } 
            }

            break;

        case "addUserWord":
            draftState.user.words.push(action.payload);
            break;

        case "setUserTests":
            draftState.user.tests = [...action.payload];
            break;

        case "setUserDays":
            draftState.user.days = [...action.payload];
            break;

        case "setUserPhrases":
            draftState.user.phrases = [...action.payload];
            break;

        case "setUserReceivedMessages":
            draftState.user.receivedMessages = [...action.payload];
            break;

        case "setDialogues":
            draftState.dialogues = [...action.payload];
            break;

        case "setUserEfficiency":
            draftState.user.efficiency = action.payload;
            break;

        case "setUserRanking":
            draftState.user.ranking = action.payload;
            break;

        case "setPhrases":
            draftState.phrases = action.payload;
            break;

        case "setBadges":
            draftState.badges = action.payload;
            break;

        case "setRootaTexts":
            draftState.RootaTexts = action.payload;
            break;

        case "showBottomNav":
            draftState.showBottomNav = true;
            break;

        case "hideBottomNav":
            draftState.showBottomNav = false;
            break;

        case "toggleTalkingContainer":
            draftState.showTalkingContainer = !draftState.showTalkingContainer;
            break;

        case "setTutorialStage":
            draftState.tutorialStage = action.payload;
            break;

        case "updateUserPoints":
            draftState.user.points = draftState.user.points + action.payload;
            break;

        case "updateUserLifes":
            draftState.user.lifes = action.payload;
            break;

        case "updateUserLevel":
            draftState.user.level = action.payload;
            break;

        case "updateTestWord":

            for (let i=0; i<draftState.user.tests[action.payload.testInitialIndex].words.length; i++) {
                const specyficWord = draftState.user.tests[action.payload.testInitialIndex].words[i];

                if (specyficWord.word_id === action.payload.word_id) {
                    specyficWord.status = action.payload.status;
                    break
                }
            }

            break;

        case "updateUserTest": 
            draftState.user.tests[action.payload.testInitialIndex].status = action.payload.status;
            break;

        case "setChosenLevel":
            draftState.chosenLevel = action.payload;
            break;

        case "setChosenDialogue":
            draftState.chosenDialogue = action.payload;
            break;

        case "setStartedTest":
            draftState.startedTest = action.payload;
            break;

        case "updateCurrentUserDay":
            draftState.user.days[draftState.user.days.length - 1] = action.payload;
            break;

        case "activateListeningFeature":
            draftState.listening = true;
            break;

        case "activateSpeakingFeature":
            draftState.speaking = true;
            break;

        case "deactivateListeningFeature":
            draftState.listening = false;
            break;

        case "deactivateSpeakingFeature":
            draftState.speaking = false;
            break;

        case "setInterval":
            draftState.interval = action.payload;
            break;

        case "clearInterval":
            clearInterval(draftState.interval);
            break;

        case "setTimeout":
            draftState.timeout = action.payload;
            break;

        case "clearTimeout":
            clearTimeout(draftState.timeout);
            break;

        case "setRecognitionInstance":
            draftState.recognition = action.payload;
            break;

        case "setEmailToken":
            draftState.emailToken = action.payload;
            break;

        case "addUserWordCorrectness":

            wordIndex = action.payload.initialIndex;

            draftState.user.words[wordIndex].correctnesses.push({created_at: action.payload.created_at});
            draftState.user.words[wordIndex].power = calculateEfficiency(draftState.user.words[wordIndex].correctnesses.length, draftState.user.words[wordIndex].mistakes.length);

            break;

        case "addUserWordMistake":

            wordIndex = action.payload.initialIndex;

            draftState.user.words[wordIndex].mistakes.push({created_at: action.payload.created_at});
            draftState.user.words[wordIndex].power = calculateEfficiency(draftState.user.words[wordIndex].correctnesses.length, draftState.user.words[wordIndex].mistakes.length);

            break;
            
        default:
            return draftState;
    }
}