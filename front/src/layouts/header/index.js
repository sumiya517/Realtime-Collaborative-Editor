import React, { useState } from 'react';
import './index.scss';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <header className="l-header">
            <div className="l-header__logo">
                <img src="/icons/logo-small.png" />
            </div>
            <div className="l-header__left">
                <div className="l-header__search-box">
                    <input
                        className="l-header__search-input"
                        type="text"
                        placeholder="Search Workspaces"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <img className="l-header__search-button" src="/icons/search-normal.png" />
                </div>

                <div className='l-header__profile'>
                    <img className='l-header__profile-notification' src="/icons/notification.png" />
                    <img className='l-header__profile-img' src="/icons/profile.png" />
                </div>
            </div>

        </header>
    );
};

export default Header;
