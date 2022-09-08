import { round } from "./round";

export const calculateUserEfficiency = (userWords: any[]) => {

    let efficiency = 0;
    let sum = 0;
    
    if( userWords.length > 0 ) {

        for(let i=0; i<userWords.length; i++){
            sum = sum + userWords[i].power;
        };

        efficiency = sum / userWords.length;
        efficiency = round(efficiency, 2);

        if( efficiency === 100 ) efficiency = 100;

    } else {
        efficiency = 0;
    }

    return efficiency
}   