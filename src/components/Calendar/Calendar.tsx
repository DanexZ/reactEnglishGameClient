import React, { useEffect, useState } from "react";
import { getDaysInMonth } from "../../utils/date/getDaysInMonth";
import "./Calendar.scss";

interface Props {
    months: any[]
    currentMonth: any
    currentMonthIndex: number
    setCurrentMonthIndex: Function
    setCurrentDay: Function
    setDisplayMonthSummary: Function
}

const Calendar = ({months, currentMonth, currentMonthIndex, setCurrentMonthIndex, setCurrentDay, setDisplayMonthSummary}: Props) => {

    const [days, setDays]: any = useState([]);

    useEffect(() => {

        const showDay = (day: any) => {
            setCurrentDay(day);
            setDisplayMonthSummary(false);
        }

        const newDays = [];

        const daysInMonth = getDaysInMonth(1, 1, currentMonth.days[0].created_at);

        for (let i=0; i<daysInMonth; i++) {

            let day: any;

            for (let m=0; m<currentMonth.days.length; m++) {
                if (i+1 === new Date(currentMonth.days[m].created_at).getDate()) {
                    day = currentMonth.days[m];
                    break;
                }
            }

            let occursActivity = false;

            if (day) if (day.points || day.words || day.badges) occursActivity = true;

            newDays.push(
                <li key={`${8}-${i}`} className={(occursActivity) ? "action" : ''}  onClick={() => (day) ? showDay(day) : {} } >
                    <span>{i+1}</span>
                    {occursActivity && <img src="/images/correct.png" alt="correct" />}
                </li>
            )
        }

        setDays(newDays);


    }, [currentMonth]);


    
    const switchMonth = (direction: string) => {

        if (direction === "previous") setCurrentMonthIndex((prev: number) => prev - 1);
        if (direction === "next") setCurrentMonthIndex((prev: number) => prev + 1);

        setDisplayMonthSummary(true);
    }


    return (
        <div className="calendar-container">
            {currentMonthIndex > 0 && <img className="previous" onClick={() => switchMonth("previous")} src="images/navigate1.png" alt="arrow switching"/>}

            <div className="calendar">
                <h2 onClick={() => setDisplayMonthSummary(true)}>{currentMonth.formatedName}</h2>

                <ul className="header">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>

                <ul className="days">
                    {days}
                </ul>
            </div>

            {currentMonthIndex < months.length - 1 && <img className="next" onClick={() => switchMonth("next")} src="images/navigate1.png" alt="switching arrow" />}
        </div>
    )
}

export default Calendar