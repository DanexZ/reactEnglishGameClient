export const validateConfirmField = (value1: string, value2: string): string => {

    let chank = '';

    for (let i=0; i<value2.length; i++) chank += value1.charAt(i);

    if (chank !== value2) return "Pola nie są zgodne";

    return ""
}