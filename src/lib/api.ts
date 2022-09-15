import axios from "axios";
import Alert from "./Alert";
import { TestWord, UserDay } from "../data/models";
import { ExamStatus } from "../data/types/ExamStatus";
import { EventType } from "../data/types/EventType";
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

export interface RequestHandler {
    next?: Function,
    errorHandler?: Function
}


const get = (url: string, token: string, requestHandler: RequestHandler) => {

    axios.get(url, {
        headers: {
            "Authorization": token
        } 
    })

    .then(({data}) => { 
        if (requestHandler.next) requestHandler.next(data) 
    })

    .catch((e) => {
        if (requestHandler.errorHandler) return requestHandler.errorHandler(e.toString());
        new Alert("error", e.toString());
    });
}


const post = (url: string, data: any, requestHandler: RequestHandler, token?: string) => {

    axios.post(
        url,
        data,
        {
            headers: {
                "Authorization": (token) ? token : ''
            }
        },
    )

    .then(({data}) => {
        if (requestHandler.next) requestHandler.next(data)
    })

    .catch((e) => {
        if (requestHandler.errorHandler) return requestHandler.errorHandler(e.toString());
        new Alert("error", e.toString())
    })
}



export const checkAsyncEmail = 
    (email: string, requestHandler: RequestHandler) => get(`/doesEmailExist/${email}`, "", requestHandler);

export const checkAsyncUsername = 
    (username: string, requestHandler: RequestHandler) => get(`/doesUsernameExist/${username}`, "", requestHandler);

export const getAsyncUserWords =
    (user_id: number, token: string, requestHandler: RequestHandler) => get(`/user_words/${user_id}`, token, requestHandler);

export const getAsyncUserEvents =
    (user_id: number, token: string, requestHandler: RequestHandler) => get(`/userEvents/${user_id}`, token, requestHandler);

export const getAsyncUserPhrases = 
    (user_id: number, token: string, requestHandler: RequestHandler) => get(`/phrases/${user_id}`, token, requestHandler);
    
export const getAsyncUserDays = 
    (user_id: number, token: string, requestHandler: RequestHandler) => get(`/userDays/${user_id}`, token, requestHandler);

export const getAsyncUserWord = 
    (user_id: number, word_id: number, token: string, requestHandler: RequestHandler) => get(`/userWord/${user_id}/${word_id}`, token, requestHandler);

export const getAsyncUserMessages = 
    (user_id: number, token: string, requestHandler: RequestHandler) => get(`/userMessages/${user_id}`, token, requestHandler);

export const getAsyncUserTests =
    (user_id: number, token: string, requestHandler: RequestHandler) => get(`/user_tests/${user_id}`, token, requestHandler);

export const getAsyncWords =
    (token: string, requestHandler: RequestHandler) => get('/words', token, requestHandler);

export const getAsyncUsers =
    (token: string, requestHandler: RequestHandler) => get('/users', token, requestHandler);

export const getAsyncPhrases = 
    (token: string, requestHandler: RequestHandler) => get('/phrases', token, requestHandler);

export const getAsyncDialogues = 
    (token: string, requestHandler: RequestHandler) => get('/dialogues', token, requestHandler);

export const getAsyncBadges = 
    (token: string, requestHandler: RequestHandler) => get('/badges', token, requestHandler);

export const getAsyncRootaMessages = 
    (token: string, requestHandler: RequestHandler) => get('/RootaMessages', token, requestHandler);

export const getAsyncConversations = 
    (author_id: number, token: string, requestHandler: RequestHandler) => get(`/conversations/${author_id}`, token, requestHandler);




export const loginAsync = 
    (login: string, password: string, requestHandler: RequestHandler) => post("/login", {login, password}, requestHandler);

export const resetAsyncPassword = 
    (email: string, requestHandler: RequestHandler) => post("/resetPassword", { email }, requestHandler);

export const changeAsyncPassword = 
    (email_token: string, password: string, user_id: number, requestHandler: RequestHandler) => post("/changePassword", { email_token, password, user_id }, requestHandler);

export const checkAsyncWord = 
    (user_id: number, word: string, token: string, requestHandler: RequestHandler) => post(`/word/${word}`, { user_id }, requestHandler, token);

export const checkAsyncPhrase = 
    (user_id: number, phrase: string, token: string, requestHandler: RequestHandler) => post(`/phrase/${phrase}`, { user_id }, requestHandler, token);

export const registerAsyncAccount = 
    (nick: string, email: string, password: string, requestHandler: RequestHandler) => post("/register", {nick, email, password}, requestHandler);

export const addAsyncUserPhrase = 
    (user_id: number, name: string, translation: string, token: string, requestHandler: RequestHandler) => post("/addPhrase", {user_id, name, translation}, requestHandler, token);

export const addAsyncUserWord = 
    (user_id: number, word_id: number, token: string, requestHandler: RequestHandler) => post("/addUserWord", {user_id, word_id}, requestHandler, token);

export const addAsyncUserCustomWord = 
    (user_id: number, word: string, translations: string, token: string, requestHandler: RequestHandler) => post("/addUserCustomWord", {user_id, word, translations}, requestHandler, token);

export const addAsyncUserMessage = 
    (user_id: number, message_id: number, token: string, requestHandler: RequestHandler) => post("/addUserMessage", {user_id, message_id}, requestHandler, token);

export const addAsyncCorrectness = 
    (user_id: number, word_id: number, token: string, requestHandler: RequestHandler) => post("/addCorrectness", {user_id, word_id}, requestHandler, token);

export const addAsyncUserEvent = 
    (user_id: number, type: EventType, token: string, requestHandler: RequestHandler) => post("/addUserEvent", {user_id, type}, requestHandler, token);

export const addAsyncComment = 
    (author_id: number, conversation_id: number, comment: string, token: string, requestHandler: RequestHandler) => post("/addComment", {author_id, conversation_id, comment}, requestHandler, token);

export const addAsyncMistake = 
    (user_id: number, word_id: number, token: string, requestHandler: RequestHandler) => post("/addMistake", {user_id, word_id}, requestHandler, token);

export const updateAsyncUserPoints = 
    (user_id: number, points: number, token: string, requestHandler: RequestHandler) => post("/updateUserPoints", {user_id, points}, requestHandler, token);

export const updateAsyncUserLifes = 
    (user_id: number, lifes: number, token: string, requestHandler: RequestHandler) => post("/updateUserLifes", {user_id, lifes}, requestHandler, token);

export const updateAsyncUserLevel = 
    (user_id: number, level: number, token: string, requestHandler: RequestHandler) => post("/updateUserLevel", {user_id, level}, requestHandler, token);

export const saveAsyncUserDay = 
    (day: UserDay, token: string, requestHandler: RequestHandler) => post("/saveUserDay", {day}, requestHandler, token);

export const createAsyncUserTest = 
    (user_id: number, token: string, requestHandler: RequestHandler) => post("/createUserTest", {user_id}, requestHandler, token);

export const createAsyncTestWords = 
    (test_id: number, words: TestWord[], token: string, requestHandler: RequestHandler) => post("/createTestWords", {test_id, words}, requestHandler, token);

export const createAsyncConversation = 
    (author_id: number, title: string, comment: string, token: string, requestHandler: RequestHandler) => post("/createConversation", {author_id, title, comment}, requestHandler, token);

export const updateAsyncTestWord = 
    (test_id: number, word_id:number, status: ExamStatus, token: string, requestHandler: RequestHandler) => post("/updateTestWord", {test_id, word_id, status}, requestHandler, token);

export const updateAsyncUserTest = 
    (test_id: number, status: ExamStatus, token: string, requestHandler: RequestHandler) => post("/updateUserTest", {test_id, status}, requestHandler, token);

export const deleteAsyncPhrase = 
    (user_id: number, phrase_id: number, password: string, token: string, requestHandler: RequestHandler) => post("/deletePhrase", {user_id, password, phrase_id}, requestHandler, token);

export const deleteAsyncWord = 
    (user_id: number, word_id: number, password: string, token: string, requestHandler: RequestHandler) => post("/deleteWord", {user_id, password, word_id}, requestHandler, token);