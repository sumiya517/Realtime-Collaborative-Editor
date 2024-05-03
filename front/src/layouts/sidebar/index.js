import React, { useState } from 'react';
import './index.scss';

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState('Dashboard');

    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
    };

    return (
        <nav className="l-sidebar">
            <ul className="l-sidebar__list">
                <li
                    className={`l-sidebar__item ${selectedItem === 'Dashboard' && 'l-sidebar__item--selected'} `}
                    onClick={() => handleItemClick('Dashboard')}
                >
                    <img src='/icons/dashboard-icon.png' />
                </li>
                <li
                    className={`l-sidebar__item ${selectedItem === 'Add-Workshop' && 'l-sidebar__item--selected'} `}
                    onClick={() => handleItemClick('Add-Workshop')}
                >
                    <img src='/icons/add-dashboard-icon.png' />
                </li>
                <li
                    className={`l-sidebar__item ${selectedItem === 'Settings' && 'l-sidebar__item--selected'} `}
                    onClick={() => handleItemClick('Settings')}
                >
                    <img src='/icons/settings.png' />
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
