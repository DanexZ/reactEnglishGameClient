export const getDaysInMonth = (year: number, month: number, date?:string) => {

    if (date) {
        year = new Date(date).getFullYear();
        month = new Date(date).getMonth();
    }
    
    return new Date(year, month, 0).getDate();
};