export const SCREEN_NAMES = {
    NOTLOGGED: "NotLoggedScreen",
    LOGGING: "LoggingScreen",
    REGISTER: "RegisterScreen",
    GAMEMENU: "GameMenuScreen",
    SETTINGS: "SettingsScreen",
    GAME_INDEX: "GameStartingSreen",
    DATA_LOADER: "DataLoadingScreen",
    PP: "pp"
};


export const PAGES = {
    NONE: "None",
    COLLECT: "Collect",
    DIALOGUES: "Dialogues",
    DIARY: "Diary",
    WORDS: "Words",
    ADD_CUSTOM_WORD: "Add new word",
    USER_WORDS: "Custom Words",
    TESTS: "Tests",
    PHRASES: "Phrases",
    ADD_CUSTOM_PHRASE: "Add new phrase",
    USER_PHRASES: "Custom phrases",
    RANKING: "Ranking",
    PREFERENCES: "Preferences",
    SUPPORT: "Support"
}


export const LANGS = {
    US: "en-US",
    PL: "pl-PL"
}


export const TYPING_SPEED = 44;


export const DATA_LOADING_RANDOM_MESSAGES = [
    "Wraz z wyższymi levelami stawiane przed Tobą wymagania rosną.",
    "Za poprawną wymowę otrzymujesz punkty, które liczą się do globalnego rankingu.",
    'Podczas "memory exercises" możesz zdobywać dodatkowe serduszka za nabijanie wysokich combo.',
    "Do testów potrzebnych do odblokowania następnego levelu liczone są testy zdane na aktualnym levelu."
];


export const SOUNDS = {
  
    OOT_SECRET_MONO: {
        src: ["/sounds/OOT_Secret_Mono.ogg"],
        volume: 1,
    },
    
    SMB_1_UP: {
        src: ['/sounds/smb_1-up.ogg'],
        volume: 0.5,
    },
    
    LOZ_GET_ITEM: {
        src: ['/sounds/LOZ_Get_Item.ogg'],
        volume: 1,
    },
    
    OOT_FANFARE_SMALLITEM: {
        src: ['/sounds/OOT_Fanfare_SmallItem.ogg'],
        volume: 0.8,
      },
    
    OOT_GET_Rupee: {
        src: ['/sounds/OOT_Get_Rupee.ogg'],
        volume: 1,
      },
    
    SMB_POWERUP: {
        src: ['/sounds/smb_powerup.ogg'],
        volume: 0.1,
      },
    
    SMB_OVER: {
        src: ['/sounds/smb_over.ogg'],
        volume: 1,
    },
    
    OOT_FANFARE_HEARTCONTAINER: {
        src: ['/sounds/OOT_Fanfare_HeartContainer.ogg'],
        volume: 1,
    },
    
    OOT_GET_HEART: {
        src: ['/sounds/OOT_Get_Heart.ogg'],
        volume: 1,
    },
    
    OOT_HURT1: {
        src: ['/sounds/OOT_Hurt1.ogg'],
        volume: 1,
    },
    
    OOT_ERROR: {
        src: ['/sounds/OOT_Error.ogg'],
        volume: 1,
    },
    
    OOT_DIALOGUE_NEXT: {
        src: ['/sounds/OOT_Dialogue_Next.ogg'],
        volume: 1,
    },
    
    OOT_DIALOGUE_DONE: {
        src: ['/sounds/OOT_Dialogue_Done.ogg'],
        volume: 1,
    },
    
    SMB_COIN: {
        src: ['/sounds/smb_coin.ogg'],
        volume: 0.2,
    },
    
    OOT_NAVI_HEY5: {
        src: ['/sounds/OOT_Navi_Hey5.ogg'],
        volume: 1,
    },
    
    OOT_FANFARE_ITEM: {
        src: ['/sounds/OOT_Fanfare_Item.ogg'],
        volume: 0.8,
    }
}


export const ANIMATIONS = {

    ADDING_POINTS: {
        duration: 2000
    },

    TALKING_CONTAINER_ROLLING: {
        duration: 400
    },

    TIME_COUNTING: {
        name: "countingAnime",
        duration: 300
    }
}

export const TIMING_CALLBACKS = {
    LISTEN_SENTENCES: 2000
}


export const TOP100 = [
    'the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it', 'he', 'was', 'for', 'on',
    'are', 'as', 'with', 'his', 'thay', 'I', 'at', 'be', 'this', 'have', 'from', 'or', 'one',
    'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'say',
    'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'will', 'up', 'other',
    'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make',
    'like', 'him', 'into', 'time', 'has', 'look', 'two', 'more', 'write', 'go', 'see', 'number',
    'no', 'way', 'could', 'people', 'my', 'than', 'first', 'water', 'been', 'call', 'who',
    'oil', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'make', 'may',
    'part'
];


export const messagesStartingCollectingWords = [
    "Hi. Welcome back! How are you today? Ready for new words? So, let's get started!",
    "Hey, it's time to get new words!",
    "Some words are difficult to pronounce for a Pole. Do you want to know a secret? For these cases there is a special function that increases tolerance for errors. Ok, let's go.",
    "Hey, head's up. To speak and understand English, you only need to learn three thousands words. It is not much for you!",
    "You're right. Hurry up to discover the picture in the words tab!",
    "Do you think robots can be sexy?",
    "Good to see you."
];


export const messagesStartingTrainingDialogue = [

    [
        `Ok, don't waste your time. Let's practice speaking!`,
        `More practice! Bigger muscles! Follow me honey.`,
        `More practice! Bigger muscles! More money! Yeah, follow me.`,
        `For every correct sentence you will get 10 points. Happy? Me too, let's train.`,
        `Good to see you back. How your english speaking muscles? Ready for workout? So let's go.`
    ],

    [
        `Ok, now let's play roles. Do you guess what I mean? Yes, I will say the blue sentences first and you will say
         the red and then we will exchange. Let's get started.`,
        `Ok, the roles play! I start.`

    ],

    [
        `Excellent! Now I speak red so you start!`,
        `Hey, you're pretty good. Changing roles!`,
        `Now I'm red you blue.`
    ],

    [
        `Great, that's it! Well maybe we would train with another dialogue now?`,
        `And we finished! What about try another one?`,
        `Piece of good work! We can go train to the next one if you like!`
    ]
];


export const rootaRepeatLines = [
    "Wrong.",
    "No. Say like me.",
    "Try again.",
    "No, listen: ",
    "Uncorrect. Repeat after me.",
    "No, look.",
    "Open your ears!"
]