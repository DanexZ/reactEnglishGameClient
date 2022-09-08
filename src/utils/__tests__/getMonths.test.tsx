import { getMonths } from "../getMonths";

const day1 = {
    points: 0,
    words: 0,
    badges: 0,
    created_at: "2022-08-05"
}

const day2 = {
    points: 0,
    words: 0,
    badges: 0,
    created_at: "2022-09-01"
}

const day3 = {
    points: 0,
    words: 0,
    badges: 0,
    created_at: "2022-09-02"
}



test('testing getMonths', () => {

    const userDays = [day1];
    
    const months = getMonths(userDays);

    expect(months).toStrictEqual([
        { 
            formatedName: "August 2022",
            days: [day1]
        }
    ]);
  
});


test('testing getMonths', () => {


    const userDays = [day1, day2]
    
    const months = getMonths(userDays);

    expect(months).toStrictEqual([
        {
            formatedName: "August 2022",
            days: [day1]
        },
        {
            formatedName: "September 2022",
            days: [day2]
        }
    ]);
  
});


test('testing getMonths', () => {


    const userDays = [day1, day2, day3]
    
    const months = getMonths(userDays);

    expect(months).toStrictEqual([
        {
            formatedName: "August 2022",
            days: [day1]
        },
        {
            formatedName: "September 2022",
            days: [day2, day3]
        }
    ]);
  
});