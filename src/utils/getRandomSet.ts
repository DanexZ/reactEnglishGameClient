import { shuffleList } from "./shuffleList"

export const getRandomSet = (set: any[], number: number) => {

    shuffleList(set);

    const list: any[] = [];

    for (let i=0; i<number; i++) list.push(set[i])

    return list
}