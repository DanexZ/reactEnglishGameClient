export const validateMessage = (txt: string): string => {

    if (!txt) return "To pole nie może być puste";

    if (txt.length < 15) return "Zbyt krótka wiadomość";

    return ""
}