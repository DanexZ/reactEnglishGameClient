import { User } from "./models";

export const initialUser: User = {
    id: Number(localStorage.getItem("englishGame_id")) || 0,
    nick: localStorage.getItem("englishGame_nick") || "",
    token: localStorage.getItem("englishGame_token") || "",
    level: Number(localStorage.getItem("englishGame_level")) || 0,
    lifes: Number(localStorage.getItem('englishGame_lifes')) || 3,
    points: Number(localStorage.getItem("englishGame_points")) || 0,
    password: localStorage.getItem("englishGame_userHash") || "",
    words: [],
    customWords: [],
    currentlyLearningWords: [],
    phrases: [],
    tests: [],
    days: [],
    receivedMessages: [],
    conversations: [],
    efficiency: 0,
    ranking: 1,
    events: {
        unlockedLevels: [{type: "unlocked_level"}],
        unlockedTests: [],
        unlockedDialogues: false
    }
}