export const containsOnlyLetersAndNumbers = (str: string) => /^([a-zA-Z0-9]+)$/.test(str)


export const validateUserName = (userName: string): string => {

    if (!userName) return "Nazwa użytkownika nie może być pusta";

    if (!containsOnlyLetersAndNumbers(userName)) return "Nick może zawierać tylko litery i cyfry";

    if (userName.length < 3) return "Nick musi składać się z co najmniej 3 znaków";

    if (userName.length > 20) return "Nick może składać z maksymalnie 20 znaków";

    userName = userName.toLocaleLowerCase().trim();
    if (userName === "admin" || userName === "moneyu") return "Nick zawiera zastrzeżone słowo";

    return ""
}