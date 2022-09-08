import { UserWord, Word } from "../data/models";
import { shuffleList } from "./shuffleList";

export const randomizeWords = (words: Word[], userWords: UserWord[], remainingWords: number) => {

    shuffleList(words);
    const randomList: Word[] = [];

    words.forEach((word) => {
        let acquired = false;

        userWords.forEach((userWord) => {
            if(userWord.word_id === word.id) acquired = true
        });

        if(!acquired && randomList.length < remainingWords) randomList.push(word)

    });

    return randomList
}