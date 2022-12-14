import { LearningStatus } from "./types/LearningStatus";
import { EventType } from "./types/EventType";
import { ExamStatus } from "./types/ExamStatus";

export interface User {
    id: number
    nick: string
    token: string
    level: number
    lifes: number
    points: number
    words: UserWord[]
    customWords: UserWord[]
    currentlyLearningWords: UserWord[]
    phrases: Phrase[]
    tests: UserTest[]
    days: UserDay[]
    efficiency: number
    ranking: number
    receivedMessages: ReceivedMessage[]
    conversations: Conversation[]
    password: string
    events: UserEvents
}


export interface Word {
    id: number
    name: string
    translations: Translation[]
}


export interface UserWord {
    initialIndex: number
    featureInitialIndex: number
    name: string
    word_id: number
    translations: Translation[]
    mistakes: Mistake[]
    correctnesses: Correctness[]
    power: number
    currentlyLearning: LearningStatus
    created_at: string
}


export interface Sentence {
    id: number
    dialogue_is: number
    speaker: 1 | 2
    name: string
}


export interface Dialogue {
    id: number
    name: string
    sentences: Sentence[]
}


export interface Translation {
    polish: string
}


export interface UserMessage {
    message_id: number
}


export interface UserDay {
    points: number
    words: number
    badges: number
    created_at: string
    updated_at: string
}


export interface UserTest {
    id: number
    initialIndex: number
    status: ExamStatus
    words: TestWord[]
    created_at: string
}


export interface TestWord extends UserWord {
    test_id: number
    word_id: number
    status: ExamStatus
}


export interface Mistake {
    created_at: string
}


export interface Correctness {
    created_at: string
}


export interface Comment {
    conversation_id: number
    content: string
    author_id: number
    created_at: string
}


export interface Conversation {
    id: number
    title: string
    author_id: number
    status: "new" | "open" | "closed"
    created_at: string
    comments: Comment[]
}


export interface Phrase {
    id: number
    user_id: number | null
    name: string
    translations: Translation[]
}


export interface Event {
    type: EventType
}


export interface Badge {
    id: number
    title: string
    description: string
}


export interface RootaText {
    id: number
    content: string
}


export interface UserEvents {
    unlockedLevels: Event[]
    unlockedDialogues: boolean
    unlockedTests: Event[]
}

export interface ReceivedMessage {
    message_id: number
}