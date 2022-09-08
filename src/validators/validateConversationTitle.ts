export const validateConversationTitle = (txt: string): string => {

    if (!txt) return "To pole nie może być puste";

    if (txt.length < 4) return "Tytuł jest zbyt krótki";

    return ""
}