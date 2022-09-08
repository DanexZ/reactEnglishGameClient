export class DateCompare {
    date1
    date2

    constructor(date1: string | Date, date2: string | Date) {
        this.date1 = new Date(date1);
        this.date2 = new Date(date2);
    }


    isTheSameDay = () => {
    
        return ( 
            this.date1.getFullYear() === this.date2.getFullYear() && 
            this.date1.getMonth() === this.date2.getMonth() && 
            this.date1.getDay() === this.date2.getDay() 
        )
    }

    isTheSameMonth = () => {
        
        return ( 
            this.date1.getFullYear() === this.date2.getFullYear() && 
            this.date1.getMonth() === this.date2.getMonth()
        )
    }
}