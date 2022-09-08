interface Props {
    date: string | Date
    format?: "pl" | "ang"
    separator?: "-" | "/"
    showTime?: Boolean
    addDays?: number
}

export const getDate = ({date, format, separator="/", showTime, addDays}: Props) => {

    date = new Date(date);

    if(addDays && addDays > 0) {
        const day = 1000 * 60 * 60 * 24 * addDays;
        date = new Date(date.getTime() + day);
    }

    const yyyy = date.getFullYear();
    let MM: number | string = date.getMonth() + 1;
    let dd: number | string = date.getDate();
    let hh: number | string = date.getHours();
    let mm: number | string = date.getMinutes();
    let ss: number | string = date.getSeconds();

    if (MM < 10) MM = "0" + MM;
    if (dd < 10) dd = "0" + dd;
    if (hh < 10) hh = "0" + hh;
    if (mm < 10) mm = "0" + mm;
    if (ss < 10) ss = "0" + ss;

    let time = "";
    if(showTime) time = ` ${hh}:${mm}:${ss}`;

    if (format === "ang") return `${yyyy}${separator}${MM}${separator}${dd}${time}`;
    
    return `${dd}${separator}${MM}${separator}${yyyy}${time}`;
};