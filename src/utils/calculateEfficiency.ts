import { round } from "./round";

export const calculateEfficiency = (correctnesses: number, mistakes: number) => {

    const sum = correctnesses + mistakes;

    let wordPower = 100;

    if (mistakes) wordPower = round((correctnesses / sum) * 100);

    return wordPower;
}