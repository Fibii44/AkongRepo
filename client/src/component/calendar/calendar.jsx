import React, { useState } from 'react';
import './calendar.css';

const Calendar = () => {
    const [events, setEvents] = useState([
        { id: 1, date: '2024-10-02', name: 'General Assembly', color: '#ff9aa2' },
        { id: 2, date: '2024-10-11', name: 'Figma UI Training', color: '#a2c8ff' },
        { id: 3, date: '2024-10-11', name: 'Gender and Development', color: '#a3f7a7' },
        { id: 4, date: '2024-10-14', name: 'COT Faculty Team Building', color: '#ffbf80' },
        { id: 5, date: '2024-10-15', name: 'Mentoring Program', color: '#ff99ff' },
        { id: 6, date: '2024-10-28', name: 'Staff Training', color: '#a2c8ff' },
    ]);

    const [currentView, setCurrentView] = useState('month');
    const [currentDate, setCurrentDate] = useState(new Date()); // Set to today's date
    const today = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getEventsForDay = (date) => {
        return events.filter(event => event.date === date);
    };

    const renderViewButtons = () => (
        <div style={{ display: 'flex' }}>
            <button className={`button ${currentView === 'week' ? 'active' : ''}`} onClick={() => setCurrentView('week')}>Week</button>
            <button className={`button ${currentView === 'month' ? 'active' : ''}`} onClick={() => setCurrentView('month')}>Month</button>
            <button className={`button ${currentView === 'year' ? 'active' : ''}`} onClick={() => setCurrentView('year')}>Year</button>
        </div>
    );

    // Month View
    const renderMonthView = () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = endOfMonth.getDate();
        const firstDayOfWeek = startOfMonth.getDay();

        const daysFromPrevMonth = Array.from(
            { length: firstDayOfWeek },
            (_, i) => new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), -(firstDayOfWeek - i))
        );

        const daysThisMonth = Array.from({ length: daysInMonth }, (_, i) => new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i + 1));

        const daysFromNextMonth = Array.from(
            { length: (7 - (daysInMonth + firstDayOfWeek) % 7) % 7 },
            (_, i) => new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, i + 1)
        );

        const allDays = [...daysFromPrevMonth, ...daysThisMonth, ...daysFromNextMonth];

        return (
            <>
                <div className="calendar-header">
                    <h2>{startOfMonth.toLocaleString('default', { month: 'long' })} {startOfMonth.getFullYear()}</h2>
                    {renderViewButtons()}
                </div>
                <div className="calendar-grid">
                    {daysOfWeek.map(day => (
                        <div key={day} className="calendar-day-header">{day}</div>
                    ))}
                    {allDays.map((date, index) => {
                        const formattedDate = date.toISOString().split('T')[0];
                        const dayNumber = date.getDate();
                        const eventsForDay = getEventsForDay(formattedDate);
                        const isToday = date.toDateString() === today.toDateString();

                        return (
                            <div key={index} className="calendar-day" style={isToday ? { border: '2px solid blue' } : {}}>
                                <div className="date-number" style={{ opacity: date.getMonth() !== currentDate.getMonth() ? 0.5 : 1 }}>
                                    {dayNumber}
                                </div>
                                {eventsForDay.map(event => (
                                    <div key={event.id} className="event" style={{ backgroundColor: event.color }}>
                                        {event.name}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    // Week View
    const renderWeekView = () => {
        const startOfWeek = new Date(currentDate);
        const dayOfWeek = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Adjust to the previous Sunday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get to Saturday

        const weekHeader = startOfWeek.getMonth() === endOfWeek.getMonth() 
            ? `Week of ${startOfWeek.toLocaleString('default', { month: 'long' })} ${startOfWeek.getDate()}, ${startOfWeek.getFullYear()}` 
            : `Week of ${startOfWeek.toLocaleString('default', { month: 'long' })} ${startOfWeek.getDate()} - ${endOfWeek.toLocaleString('default', { month: 'long' })} ${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;

        return (
            <>
                <div className="calendar-header">
                    <h2>{weekHeader}</h2>
                    {renderViewButtons()}
                </div>
                <div className="calendar-grid">
                    {daysOfWeek.map(day => (
                        <div key={day} className="calendar-day-header">{day}</div>
                    ))}
                    {Array.from({ length: 7 }, (_, index) => {
                        const date = new Date(startOfWeek);
                        date.setDate(startOfWeek.getDate() + index);
                        const formattedDate = date.toISOString().split('T')[0];
                        const dayNumber = date.getDate();
                        const eventsForDay = getEventsForDay(formattedDate);
                        const isToday = date.toDateString() === today.toDateString();

                        return (
                            <div key={index} className={`calendar-day ${isToday ? 'highlight' : ''}`}>
                                <div className="date-number" style={{ opacity: date.getMonth() !== currentDate.getMonth() ? 0.5 : 1 }}>
                                    {dayNumber}
                                </div>
                                {eventsForDay.map(event => (
                                    <div key={event.id} className="event" style={{ backgroundColor: event.color }}>
                                        {event.name}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

  // Year View
const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(currentDate.getFullYear(), i, 1));
    const weeksInMonth = months.map(month => {
        const weeks = [];
        const startOfMonth = new Date(month);
        const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0); 
        let week = [];

       
        for (let i = 0; i < startOfMonth.getDay(); i++) {
            const prevMonthDate = new Date(month.getFullYear(), month.getMonth(), -(startOfMonth.getDay() - i));
            week.push(prevMonthDate); 
        }

       
        for (let day = 1; day <= endOfMonth.getDate(); day++) {
            const date = new Date(month.getFullYear(), month.getMonth(), day);
            week.push(date);

      
            if (date.getDay() === 6) {
                weeks.push(week);
                week = [];
            }
        }

       
        const nextMonthStartDay = (7 - endOfMonth.getDay() - 1);
        for (let i = 1; i <= nextMonthStartDay; i++) {
            const nextMonthDate = new Date(month.getFullYear(), month.getMonth() + 1, i);
            week.push(nextMonthDate); 
        }

        
        if (week.length > 0) {
            weeks.push(week);
        }
        
        return weeks;
    });

    return (
        <>
            <div className="calendar-header">
                <h2>{currentDate.getFullYear()}</h2>
                {renderViewButtons()}
            </div>
            <div className="calendar-year-grid">
                {months.map((month, index) => (
                    <div key={index} className="calendar-month-year">
                        <div className="month-name">{month.toLocaleString('default', { month: 'long' })}</div>
                        <div className="week-headers-year">
                            {daysOfWeek.map(day => (
                                <div key={day} className="calendar-day-header-year">{day.charAt(0)}</div>
                            ))}
                        </div>
                        {weeksInMonth[index].map((week, weekIndex) => (
                            <div key={weekIndex} className="week-year">
                                {week.map((date, dateIndex) => {
                                    const formattedDate = date ? date.toISOString().split('T')[0] : null;
                                    const eventsForDay = date ? getEventsForDay(formattedDate) : [];
                                    
                                    return (
                                        <div key={dateIndex} className="calendar-day-year">
                                            <div className="date-number-year" style={{ opacity: date && date.getMonth() !== month.getMonth() ? 0.5 : 1 }}>
                                                {date ? date.getDate() : ''}
                                            </div>
                                            {eventsForDay.map(event => (
                                                <div key={event.id} className="event-year" style={{ backgroundColor: event.color }}>
                                                    {event.name}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};


    const renderCalendar = () => {
        switch (currentView) {
            case 'month':
                return renderMonthView();
            case 'week':
                return renderWeekView();
            case 'year':
                return renderYearView();
            default:
                return renderMonthView();
        }
    };

    return (
        <div className="calendar-container">
            {renderCalendar()}
        </div>
    );
};

export default Calendar;
