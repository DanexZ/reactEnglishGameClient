

export const validateEmail = (email: string): string => {

    if (!email) return "E-mail nie może być pusty";

    if (!/^\S+@\S+$/.test(email)) return "Wprowadź poprawny e-mail";

    return ""
}
