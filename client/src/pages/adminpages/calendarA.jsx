import React, { useState } from 'react';
import Sidebar from '../../component/adminbar/sidebar';
import Topbar from '../../component/adminbar/topbar';
import Calendar from '../../component/calendar/calendar'; // Adjust path if needed


const CalendarA = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="dashboard-container">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} activePage="calendar" />
            <div className="content">
                <Topbar />
                <div className="calendar-section">
                    <Calendar /> {/* Calendar component integration */}
                </div>
            </div>
        </div>
    );
};

export default CalendarA;
