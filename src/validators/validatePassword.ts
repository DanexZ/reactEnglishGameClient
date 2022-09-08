export const containsNumber = (str: string) => /\d/.test(str);
export const containsSmallLetter = (str: string) => /[a-z]/.test(str);
export const containsBigLetter = (str: string) => /[A-Z]/.test(str);
export const containsSpecialChar = (str: string) => /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(str);


export type PasswordTestResult = string

export const validatePassword = (password: string): PasswordTestResult => {

    if (!password) return "Hasło nie może być puste";

    if (password.length < 6) return "Minimalna długość hasła to 6 znaków";

    if (password.length > 50) return "Maksymalna długość hasła to 50 znaków";
       
    if (!containsNumber(password)) return "Hasło musi zawierać co najmniej jedną cyfrę";
       
    if (!containsSmallLetter(password)) return "Hasło musi zawierać co najmniej jedną małą literę";

    if (!containsBigLetter(password)) return "Hasło musi zawierać co najmniej jedną dużą literę";

    if (!containsSpecialChar(password)) return "Hasło musi zawierać co najmniej jeden znak specjalny";

    return ""
}