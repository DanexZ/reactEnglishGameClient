export const round = (number: number, decimals:number=2) => {
    
    return Math.round(number * Math.pow(10, decimals))/Math.pow(10, decimals)
}