import { containsNumber, containsSpecialChar } from "./validatePassword";


export const validatePhrase = (phrase: string): string => {

    if (!phrase) return "Nie podano wyrażenia";

    if (containsNumber(phrase) || containsSpecialChar(phrase)) return "Wyrażenia składają się z liter";

    if (phrase.length < 6) return "Zbyt kórtkie";

    if (!phrase.includes(" ")) return "Podaj wyrażenie a nie pojedyncze słówko";

    return ""
}