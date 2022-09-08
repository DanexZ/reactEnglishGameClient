export const getProgressBarColor = (power: number): string => {

    if ( power >= 80 ) return "rgb(102, 238, 57)";
    if ( power >= 40 && power < 80 ) return "rgb(243, 190, 45)";

    return "rgb(218, 0, 0)";
}