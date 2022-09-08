import { containsNumber, containsSpecialChar } from "./validatePassword";


export const validateWord = (word: string): string => {

    if (!word) return "Nie podano słówka";

    if (containsNumber(word) || containsSpecialChar(word)) return "Słówko może składać się tylko z liter";

    if (word.length < 3) return "Zbyt kórtkie";

    if (word.includes(" ")) return "Usuń spację";

    return ""
}