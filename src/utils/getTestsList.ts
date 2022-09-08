import { UserTest } from "../data/models";

export const getTestsList = (level: number, tests: UserTest[]) => tests.filter((test: UserTest) => test.words.length === (level*2)+4);
