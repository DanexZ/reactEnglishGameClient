import { containsNumber, containsSpecialChar } from "./validatePassword";


export const validateTranslation = (translation: string): string => {

    if (!translation) return "Nie podano tłumaczenia";

    if (containsNumber(translation) || containsSpecialChar(translation)) return "Tłumaczenie zawiera nie potrzebne znaki";

    if (translation.length < 3) return "Tłumaczenie zbyt krótkie";

    return ""
}