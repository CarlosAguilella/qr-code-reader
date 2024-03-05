import React from "react";

import './header.css';

function Header() {
    return (
        <div className="header">
            <div className='header-title flex-center'>
                <p className="flex-space-between">
                    <span>🛡️</span>
                    <span>AJUNTAMENT DE LES ALQUERIES</span>
                </p>
            </div>
            <div className='header-subtitle flex-end'>
                <p className="flex-space-between">
                    <span>CONTROLLER</span>
                    <span>👤</span>
                </p>
            </div>
        </div>
    );
}

export default Header;
