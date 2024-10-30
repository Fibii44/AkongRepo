import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Ensure to import FontAwesomeIcon
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 

const Topbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="topbar">
            <div className="search-container">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                    className="search-input" // Optional class for styling
                />
            </div>

            <div className="user-info">
                <div className="profile">
                    <img src="path/to/your/image.png" alt="Profile" />
                </div>
                <div className="user-details">
                    <span className="name" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                        Si Feby
                    </span>
                    <span className="role">Admin</span>
                </div>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li>Profile</li>
                            <li>Settings</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topbar;
