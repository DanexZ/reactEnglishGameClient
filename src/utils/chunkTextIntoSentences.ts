import { prepareText } from "./prepareText"

export const chunkTextIntoSentences = (text: string): string[] => {
    return prepareText(text).split("+");
}