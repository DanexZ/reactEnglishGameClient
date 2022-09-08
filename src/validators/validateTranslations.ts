import { validateTranslation } from "./validateTranslation"

export const validateTranslations = (str: string): string => {

    const translations = str.split(",");

    console.log(translations);

    for (let i=0; i< translations.length; i++) {

        const resultMsg = validateTranslation(translations[i]);

        if (resultMsg) return resultMsg
    }

    return ""
}