import { UserDay, UserTest, UserWord } from "../data/models";
import { DateCompare } from "./date/DateCompare";

export interface UserMonth {
    formatedName: string
    days: Day[]
    points: number
    words: number
    mistakes: number
    correctnesses: number
    failedTests: number
    passedTests: number
}

export interface Day extends UserDay {
    mistakes: number,
    correctnesses: number
    failedTests: number
    passedTests: number
}

export const getMonths = (userDays: UserDay[], userWords: UserWord[], userTests: UserTest[]) => {

    const months: UserMonth[] = [];

    userDays.forEach( (userDay) => {

        const day: Day = {
            ...userDay,
            mistakes: 0,
            correctnesses: 0,
            failedTests: 0,
            passedTests: 0
        }

        const dayDate = new Date(day.created_at);

        const dayYear = dayDate.getFullYear();
        const dayMonth = dayDate.getMonth() + 1;

        const monthName = getMonthName(dayMonth);
        const formatedName = `${monthName} ${dayYear}`;

        userWords.forEach((word) => {

            word.mistakes.forEach((mistake) => {
                const mistakeDate = new Date(mistake.created_at);

                const dateCompare = new DateCompare(dayDate, mistakeDate);

                if (dateCompare.isTheSameDay()) day.mistakes++
            });

            word.correctnesses.forEach((correctness) => {
                const correctnessDate = new Date(correctness.created_at);

                const dateDompare = new DateCompare(dayDate, correctnessDate);

                if (dateDompare.isTheSameDay()) day.correctnesses++
            });
        });

        userTests.forEach((test) => {

            const testDate = new Date(test.created_at);

            const dateDompare = new DateCompare(dayDate, testDate);

            if (dateDompare.isTheSameDay()) {

                if (test.status === "failed") day.failedTests++
                if (test.status === "passed") day.passedTests++
            }
            
        })


        const alreadyContains = months.some((month) => month.formatedName === formatedName);

        if (!alreadyContains) {

            months.push({
                formatedName,
                days: [day],
                points: day.points,
                words: day.words,
                mistakes: day.mistakes,
                correctnesses: day.correctnesses,
                failedTests: day.failedTests,
                passedTests: day.passedTests
            });

        } else {

            months.forEach((month) => {
                if (month.formatedName === formatedName) {
                    month.points += day.points;
                    month.words += day.words;
                    month.mistakes += day.mistakes;
                    month.correctnesses += day.correctnesses;
                    month.failedTests += day.failedTests;
                    month.passedTests += day.passedTests;
                    month.days.push(day);
                }
            })
        }

    });

    return months

}

const getMonthName = (nr: number) => {
    if (nr === 1) return "January";
    if (nr === 2) return "February";
    if (nr === 3) return "March";
    if (nr === 4) return "April";
    if (nr === 5) return "May";
    if (nr === 6) return "June";
    if (nr === 7) return "July";
    if (nr === 8) return "August";
    if (nr === 9) return "September";
    if (nr === 10) return "October";
    if (nr === 11) return "November";
    return "December"
}