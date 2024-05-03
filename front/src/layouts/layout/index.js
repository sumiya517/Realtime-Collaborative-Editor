import React from 'react';
import './index.scss';
import Header from '../header';
import Sidebar from '../sidebar';
const Layout = ({ children }) => {

    return (
        <nav className="l-layout">
            <Header />
            <Sidebar />
            <div className="l-layout__container">
                {children}
            </div>
        </nav>
    );
};

export default Layout;
