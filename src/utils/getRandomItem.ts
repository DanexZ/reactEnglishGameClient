import { randomNumber } from "./randomNumber"

export const getRandomItem = (arr: any[]) => {
    const randomIndex = randomNumber(0, arr.length);

    return arr[randomIndex]
}